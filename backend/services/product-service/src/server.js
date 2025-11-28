import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/database.js';
import productRoutes from './routes/product.routes.js';
import { errorHandler } from '@microservices/shared';
import logger from '@microservices/shared/utils/logger.js';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Health
app.get('/health', (req, res) => res.status(200).json({ status: 'UP', service: 'product-service' }));

// Routes
app.use('/products', productRoutes);

// error handler (shared)
app.use(errorHandler);

// start
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI, 'product-service');
    app.listen(PORT, () => logger.info(`Product Service running on port ${PORT}`));
  } catch (err) {
    logger.error('Failed to start product service', err);
    process.exit(1);
  }
};

start();

export default app;
