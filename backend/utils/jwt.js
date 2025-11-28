import jwt from 'jsonwebtoken';

// Read at function call time (after .env is loaded), with fallbacks
const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET || 'default-secret-key-change-in-production';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  if (!secret || secret === 'default-secret-key-change-in-production') {
    console.warn('⚠️  JWT_SECRET not set in environment; using insecure default');
  }

  return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET || 'default-secret-key-change-in-production';
  return jwt.verify(token, secret);
};

export { generateToken, verifyToken };