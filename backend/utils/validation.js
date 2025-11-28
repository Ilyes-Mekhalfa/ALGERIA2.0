// ==================== middleware/validation.js ====================
import { body, validationResult } from 'express-validator';

// Registration Validation with Sanitization
const validateRegistration = [
  // Username validation
  body('username')
    .trim()                                    // Remove whitespace from start/end
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores')
    .toLowerCase()                             // Convert to lowercase
    .escape(),                                 // Prevent XSS attacks
  
  // Email validation
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()                          // Converts to lowercase, removes dots in Gmail
    .custom((value) => {
      // Additional email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        throw new Error('Invalid email format');
      }
      return true;
    }),
  
  // Password validation
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'),
  
  // Confirm password (optional but recommended)
  body('confirmPassword')
    .optional()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  
  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg,
          value: err.value
        }))
      });
    }
    
    next();
  }
];

// Login Validation
const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }
    
    next();
  }
];

// Update Profile Validation
const validateProfileUpdate = [
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores')
    .toLowerCase()
    .escape(),
  
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters')
    .escape(),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters')
    .escape(),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/)
    .withMessage('Please provide a valid phone number'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }
    
    next();
  }
];

// Product validation
export const validateProductData = (data) => {
  const errors = {};

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.name = 'Product name is required and must be a non-empty string';
  }

  if (!data.description || typeof data.description !== 'string' || data.description.trim().length === 0) {
    errors.description = 'Product description is required and must be a non-empty string';
  }

  if (data.description && data.description.length < 10) {
    errors.description = 'Product description must be at least 10 characters long';
  }

  if (!Number.isFinite(data.price) || data.price <= 0) {
    errors.price = 'Product price is required and must be a positive number';
  }

  if (!Number.isFinite(data.stock) || data.stock < 0) {
    errors.stock = 'Product stock is required and must be a non-negative number';
  }

  return errors;
};

// User validation
export const validateUserData = (data) => {
  const errors = {};

  if (!data.username || typeof data.username !== 'string' || data.username.trim().length < 2) {
    errors.username = 'Username is required and must be at least 2 characters long';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Valid email address is required';
  }

  if (!data.password || data.password.length < 6) {
    errors.password = 'Password is required and must be at least 6 characters long';
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (data.role && !['farmer', 'buyer', 'admin'].includes(data.role)) {
    errors.role = 'Invalid role. Must be farmer, buyer, or admin';
  }

  return errors;
};

// Login validation
export const validateLoginData = (data) => {
  const errors = {};

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Valid email address is required';
  }

  if (!data.password || data.password.length < 6) {
    errors.password = 'Password is required';
  }

  return errors;
};

// Helper to check if validation has errors
export const hasValidationErrors = (errors) => {
  return Object.keys(errors).length > 0;
};

export {
  validateRegistration,
  validateLogin,
  validateProfileUpdate
};