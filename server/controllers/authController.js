const authService = require('../services/authService');

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const register = async (req, res) => {
  try {
    console.log('Processing registration request');
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      console.log('Registration failed: Missing required fields');
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const user = await authService.registerUser({ username, email, password });
    console.log(`User registered successfully: ${username} (${email})`);

    return res.status(201).json({ user });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(400).json({ error: error.message });
  }
};

/**
 * Login a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const login = async (req, res) => {
  try {
    console.log('Processing login request');
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('Login failed: Missing email or password');
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const data = await authService.loginUser(email, password);
    console.log(`User logged in successfully: ${email}`);

    return res.status(200).json(data);
  } catch (error) {
    console.error('Login error:', error);
    return res.status(401).json({ error: error.message });
  }
};

module.exports = {
  register,
  login
};