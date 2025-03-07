// Load environment variables
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const basicRoutes = require("./routes/index");
const { connectDB } = require("./config/database");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Pretty-print JSON responses
app.enable('json spaces');
// We want to be consistent with URL paths, so we enable strict routing
app.enable('strict routing');

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

app.on("error", (error) => {
  console.error(`Server error: ${error.message}`);
  console.error(error.stack);
});

// Basic Routes
app.use(basicRoutes);

// Business routes
const businessRoutes = require('./routes/businessRoutes');
app.use('/api/businesses', businessRoutes);

// Auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Mock API routes for development
if (process.env.NODE_ENV === 'development') {
  app.get('/api/businesses', (req, res) => {
    res.json([
      {
        _id: '1',
        name: 'Tech Solutions Inc',
        type: 'Technology',
        revenue: 500000,
        expenses: 300000,
        employees: 25,
        status: 'active',
        performance: 85,
        lastUpdated: '2024-03-20',
        notes: 'Leading tech solutions provider in the region',
        website: 'https://techsolutions.com'
      },
      {
        _id: '2',
        name: 'Green Energy Co',
        type: 'Energy',
        revenue: 750000,
        expenses: 500000,
        employees: 40,
        status: 'active',
        performance: 92,
        lastUpdated: '2024-03-19',
        notes: 'Renewable energy solutions',
        website: 'https://greenenergy.com'
      }
    ]);
  });

  app.get('/api/businesses/analytics', (req, res) => {
    res.json({
      totalRevenue: 1550000,
      totalExpenses: 1000000,
      totalEmployees: 80,
      averagePerformance: 80.67,
      revenueByBusiness: [
        { name: 'Tech Solutions Inc', value: 500000 },
        { name: 'Green Energy Co', value: 750000 }
      ],
      performanceOverTime: [
        { date: '2024-03-15', performance: 75 },
        { date: '2024-03-16', performance: 78 },
        { date: '2024-03-17', performance: 82 },
        { date: '2024-03-18', performance: 80 },
        { date: '2024-03-19', performance: 85 },
        { date: '2024-03-20', performance: 83 }
      ]
    });
  });

  app.post('/api/businesses', (req, res) => {
    res.json({
      business: {
        _id: Math.random().toString(36).substr(2, 9),
        ...req.body,
        performance: Math.floor(Math.random() * 30) + 70,
        lastUpdated: new Date().toISOString().split('T')[0]
      }
    });
  });
}

// If no routes handled the request, it's a 404
app.use((req, res, next) => {
  res.status(404).send("Page not found.");
});

// Error handling
app.use((err, req, res, next) => {
  console.error(`Unhandled application error: ${err.message}`);
  console.error(err.stack);
  res.status(500).send("There was an error serving your request.");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});