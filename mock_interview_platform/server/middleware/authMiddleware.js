const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const getJwtSecret = () => process.env.JWT_SECRET || 'mock_interview_jwt_secret_key_2026';

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. No token provided.',
      });
    }

    const decoded = jwt.verify(token, getJwtSecret());

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(decoded.id)) {
      const user = await User.findById(decoded.id).select('-password');
      if (user) {
        req.user = user;
        return next();
      }
    }

    // Fallback/Demo mode user when DB is offline or for demo user IDs
    req.user = {
      _id: decoded.id,
      id: decoded.id,
      name: 'Demo User',
      email: 'demo@example.com',
    };
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Not authorized. Token failed.',
    });
  }
};

module.exports = { protect };
