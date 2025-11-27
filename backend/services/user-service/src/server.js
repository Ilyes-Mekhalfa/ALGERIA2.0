// Load environment variables
require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/database');
const { initializeKafka, getOrCreateTopics } = require('@microservices/shared/config/kafka');
const kafkaTopics = require('@microservices/shared/constants/kafka-topics');
const userRoutes = require('./routes/user.route');
const { errorHandler } = require('@microservices/shared/middleware/errorHandler');
const logger = require('@microservices/shared/utils/logger');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize services
const initializeServices = async () => {
  try {
    // Connect to Database
    connectDB(process.env.MONGODB_URI, 'user-service');

    // Initialize Kafka
    await initializeKafka();
    
    // Create Kafka topics
    const topics = Object.values(kafkaTopics);
    await getOrCreateTopics(topics);

    logger.info('All services initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize services:', error);
    process.exit(1);
  }
};

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'UP', 
    service: 'user-service',
    timestamp: new Date().toISOString() 
  });
});

// Routes
app.use('/users', userRoutes);

// Error handling
app.use(errorHandler);

// 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });

// Start server
const startServer = async () => {
  try {
    await initializeServices();
    
    app.listen(PORT, () => {
      logger.info(`User Service running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on('SIGINT', () => {
  logger.info('Shutting down gracefully...');
  process.exit(0);
});

module.exports = app;