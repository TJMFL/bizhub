const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Business type is required'],
    trim: true
  },
  revenue: {
    type: Number,
    required: [true, 'Revenue is required'],
    min: [0, 'Revenue cannot be negative']
  },
  expenses: {
    type: Number,
    required: [true, 'Expenses are required'],
    min: [0, 'Expenses cannot be negative']
  },
  employees: {
    type: Number,
    required: [true, 'Number of employees is required'],
    min: [1, 'Must have at least 1 employee']
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  performance: {
    type: Number,
    min: 0,
    max: 100,
    default: 75
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Business', businessSchema);