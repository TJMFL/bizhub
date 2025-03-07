const mongoose = require('mongoose');

const connectDB = async () => {
  // Skip MongoDB connection in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Running in development mode - skipping MongoDB connection');
    return;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Don't exit in development mode
    if (process.env.NODE_ENV !== 'development') {
      process.exit(1);
    }
  }
};

module.exports = { connectDB };