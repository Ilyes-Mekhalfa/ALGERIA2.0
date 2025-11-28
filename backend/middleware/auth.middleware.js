import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';
import { isBlacklisted } from '../utils/tokenBlacklist.js';
import { verifyToken } from '../utils/jwt.js';

const authenticate = async (req, res, next) => {
  try {
    // Accept token from common header names, cookie, or query param for flexibility
    let token = null;
    // log minimal header info for debugging
    logger.debug && logger.debug('auth headers:', { hasAuthorization: !!req.headers.authorization, cookieToken: !!(req.cookies && req.cookies.token) });

    // Common header variations
    const authHeader = req.headers.authorization || req.headers.Authorization || req.headers['x-access-token'] || req.headers['token'];
    if (authHeader) {
      if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      } else if (typeof authHeader === 'string') {
        token = authHeader;
      }
    }

    // fallback to cookies or query
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token && req.query && req.query.token) {
      token = req.query.token;
    }

    if (!token) {
      return res.status(401).json({ error: 'Authentication required', message: 'No token provided' });
    }

    if (isBlacklisted(token)) {
      return res.status(401).json({ error: 'Token revoked', message: 'Please login again' });
    }

    // Use shared jwt helper for verification to keep behavior consistent
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Authentication error:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired', message: 'Please login again' });
    }

    return res.status(401).json({ error: 'Invalid token', message: 'Authentication failed' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You do not have permission to access this resource'
      });
    }

    next();
  };
};

export {authenticate, authorize };