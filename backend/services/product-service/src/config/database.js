import mongoose from 'mongoose';
import { logger } from '@microservices/shared';

const connectDB = async (uri, serviceName = 'product-service') => {
  try {
    const conn = await mongoose.connect(uri || process.env.MONGODB_URI);
    logger.info(`MongoDB Connected for ${serviceName}: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    logger.error(`MongoDB connection error for ${serviceName}:`, error && error.stack ? error.stack : error);
    process.exit(1);
  }
};

export default connectDB;
