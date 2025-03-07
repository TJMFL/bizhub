const Business = require('../models/Business');

/**
 * Create a new business
 * @param {Object} businessData - Business data object
 * @param {string} userId - User ID who owns the business
 * @returns {Promise<Object>} - Created business object
 */
const createBusiness = async (businessData, userId) => {
  try {
    console.log(`Creating new business for user: ${userId}`);
    
    // Calculate a performance score (placeholder logic)
    const performance = Math.floor(Math.random() * 30) + 70;
    console.log(`Generated performance score: ${performance}`);

    const business = new Business({
      ...businessData,
      userId,
      performance,
      lastUpdated: new Date()
    });

    console.log(`Saving new business: ${business.name}`);
    await business.save();
    console.log(`Business created successfully with ID: ${business._id}`);
    
    return business;
  } catch (error) {
    console.error(`Error creating business:`, error);
    throw new Error(`Error creating business: ${error.message}`);
  }
};

module.exports = {
  createBusiness
};