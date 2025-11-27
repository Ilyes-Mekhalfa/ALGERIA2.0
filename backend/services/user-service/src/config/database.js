const mongoose = require('mongoose');
const { logger } = require('@microservices/shared');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    // Log full error stack where available
    if (logger && typeof logger.error === 'function') {
      logger.error('MongoDB connection error:', error && error.stack ? error.stack : error);
    } else {
      // Fallback to console if logger is not available
      console.error('MongoDB connection error:', error);
    }
    process.exit(1);
  }
};

module.exports = connectDB;