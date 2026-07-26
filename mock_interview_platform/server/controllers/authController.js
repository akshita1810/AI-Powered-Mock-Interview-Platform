const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const getJwtSecret = () => process.env.JWT_SECRET || 'mock_interview_jwt_secret_key_2026';

const generateToken = (id) => {
  return jwt.sign({ id }, getJwtSecret(), { expiresIn: '7d' });
};

// POST /api/auth/signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if MongoDB is connected (readyState === 1)
    if (mongoose.connection.readyState === 1) {
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        return res.status(409).json({ success: false, message: 'Email already registered.' });
      }

      const user = await User.create({ name: name.trim(), email: normalizedEmail, password });
      const token = generateToken(user._id);

      return res.status(201).json({
        success: true,
        message: 'Account created successfully.',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } else {
      // Demo / Fallback mode when MongoDB is not connected
      console.log('[Auth Notice] MongoDB not connected. Operating in Demo Auth Mode.');
      const demoId = 'demo_user_' + Date.now();
      const token = generateToken(demoId);

      return res.status(201).json({
        success: true,
        message: 'Account created in Demo Mode.',
        token,
        user: {
          id: demoId,
          name: name.trim(),
          email: normalizedEmail,
          createdAt: new Date().toISOString(),
        },
      });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Signup error: ' + error.message });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email: normalizedEmail }).select('+password');
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }

      const token = generateToken(user._id);

      return res.status(200).json({
        success: true,
        message: 'Login successful.',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } else {
      // Demo / Fallback mode when MongoDB is not connected
      console.log('[Auth Notice] MongoDB not connected. Operating in Demo Auth Mode.');
      const demoId = 'demo_user_' + Date.now();
      const token = generateToken(demoId);
      const nameFromEmail = normalizedEmail.split('@')[0];

      return res.status(200).json({
        success: true,
        message: 'Login successful (Demo Mode).',
        token,
        user: {
          id: demoId,
          name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
          email: normalizedEmail,
          createdAt: new Date().toISOString(),
        },
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login error: ' + error.message });
  }
};

// GET /api/auth/profile
const getProfile = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      user: {
        id: req.user._id || req.user.id,
        name: req.user.name,
        email: req.user.email,
        createdAt: req.user.createdAt,
      },
    });
  } else {
    res.status(401).json({ success: false, message: 'User profile not found.' });
  }
};

module.exports = {
  signup,
  login,
  getProfile,
};
