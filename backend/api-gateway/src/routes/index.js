const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
// Do this instead:
const { authenticate } = require('@microservices/shared');
const { rateLimiter } = require('../middleware/rateLimiter');
const config = require('../config/service.config');

const router = express.Router();

// Proxy options factory
const createProxyOptions = (target) => ({
  target,
  changeOrigin: true,
  pathRewrite: (path, req) => {
    // Remove /api/{service} prefix
    return path.replace(/^\/api\/[^/]+/, '');
  },
  onError: (err, req, res) => {
    console.error('Proxy Error:', err);
    res.status(503).json({
      error: 'Service Unavailable',
      message: 'The requested service is temporarily unavailable'
    });
  },
  onProxyReq: (proxyReq, req, res) => {
    // Forward user info from JWT
    if (req.user) {
      proxyReq.setHeader('X-User-Id', req.user.id);
      proxyReq.setHeader('X-User-Role', req.user.role);
    }
  }
});

// User Service Routes (Public + Protected)
router.use('/users/register', 
  rateLimiter,
  createProxyMiddleware(createProxyOptions(config.services.userService))
);

router.use('/users/login', 
  rateLimiter,
  createProxyMiddleware(createProxyOptions(config.services.userService))
);

router.use('/users',
  authenticate,
  rateLimiter,
  createProxyMiddleware(createProxyOptions(config.services.userService))
);

// Product Service Routes
router.use('/products',
  rateLimiter,
  createProxyMiddleware(createProxyOptions(config.services.productService))
);

// Order Service Routes (Protected)
router.use('/orders',
  authenticate,
  rateLimiter,
  createProxyMiddleware(createProxyOptions(config.services.orderService))
);

// Transport Service Routes (Protected)
router.use('/transport',
  authenticate,
  rateLimiter,
  createProxyMiddleware(createProxyOptions(config.services.transportService))
);

// Contract Service Routes (Protected)
router.use('/contracts',
  authenticate,
  rateLimiter,
  createProxyMiddleware(createProxyOptions(config.services.contractService))
);

// Notification Service Routes (Protected)
router.use('/notifications',
  authenticate,
  rateLimiter,
  createProxyMiddleware(createProxyOptions(config.services.notificationService))
);

module.exports = router;