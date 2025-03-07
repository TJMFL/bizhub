const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key';
const JWT_EXPIRES_IN = '24h';

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - User object
 */
const registerUser = async (userData) => {
  try {
    console.log(`Registering new user with email: ${userData.email}`);
    const user = new User(userData);
    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    console.log(`User registered successfully: ${userData.email}`);
    return userResponse;
  } catch (error) {
    console.error('Error registering user:', error);
    if (error.code === 11000) {
      // Duplicate key error
      throw new Error('Username or email already exists');
    }
    throw error;
  }
};

/**
 * Login a user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - User object with token
 */
const loginUser = async (email, password) => {
  try {
    console.log(`Attempting login for user: ${email}`);
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`Login failed: User with email ${email} not found`);
      throw new Error('Invalid credentials');
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      console.log(`Login failed: Invalid password for user ${email}`);
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    console.log(`User ${email} logged in successfully`);

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    return { user: userResponse, token };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser
};