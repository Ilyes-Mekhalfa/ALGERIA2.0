const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/appError');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

const authenticate = (req, res, next) => {
  try {
    // Check for token in Authorization header
    let token = req.headers.authorization?.split(' ')[1];
    
    // Also check for x-user-id from API Gateway
    const userId = req.headers['x-user-id'];
    const userRole = req.headers['x-user-role'];
    
    // If headers from gateway exist, trust them (internal communication)
    if (userId && userRole) {
      req.user = {
        id: userId,
        role: userRole
      };
      return next();
    }
    
    // Otherwise verify JWT token
    if (!token) {
      throw new AppError('Authentication required', 401);
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Token expired', 401));
    }
    next(new AppError('Invalid token', 401));
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('Forbidden: Insufficient permissions', 403));
    }

    next();
  };
};

module.exports = { authenticate, authorize };