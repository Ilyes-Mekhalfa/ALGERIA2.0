const { body, param, query, validationResult } = require('express-validator');

const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  };
};

// Common validation rules
const commonValidations = {
  email: body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  password: body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  
  mongoId: (field = 'id') => param(field)
    .isMongoId()
    .withMessage('Invalid ID format'),
  
  pagination: [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100')
  ]
};

module.exports = { validate, validationResult, body, param, query, commonValidations };