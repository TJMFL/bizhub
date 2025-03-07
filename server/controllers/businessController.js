const businessService = require('../services/businessService');

// Create a new business
const createBusiness = async (req, res) => {
  try {
    console.log('Creating new business...');
    
    const businessData = req.body;
    const userId = req.user.id;

    if (!businessData) {
      console.error('Business data missing in request');
      return res.status(400).json({ error: 'Business data is required' });
    }

    // Validate required fields
    const requiredFields = ['name', 'type', 'revenue', 'expenses', 'employees'];
    for (const field of requiredFields) {
      if (!businessData[field] && businessData[field] !== 0) {
        console.error(`Missing required field: ${field}`);
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    console.log(`Creating business for user ID: ${userId}`);
    const business = await businessService.createBusiness(businessData, userId);
    console.log(`Business created successfully with ID: ${business._id}`);

    return res.status(201).json({
      business: {
        _id: business._id,
        name: business.name,
        type: business.type,
        revenue: business.revenue,
        expenses: business.expenses,
        employees: business.employees,
        status: business.status,
        performance: business.performance,
        lastUpdated: business.lastUpdated,
        notes: business.notes,
        website: business.website
      }
    });
  } catch (error) {
    console.error('Error creating business:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

module.exports = {
  createBusiness
};