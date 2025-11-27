const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async (uri, serviceName) => {
  try {
    const conn = await mongoose.connect(uri || process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    logger.info(`MongoDB Connected for ${serviceName}: ${conn.connection.host}`);
    
    return conn;
  } catch (error) {
    logger.error(`MongoDB connection error for ${serviceName}:`, error);
    process.exit(1);
  }
};

module.exports = { connectDB }; 