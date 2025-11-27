// Example of how to use KafkaConsumer in your services
const KafkaConsumer = require('@microservices/shared/services/kafka.consumer');
const kafkaTopics = require('@microservices/shared/constants/kafka-topics');
const logger = require('@microservices/shared/utils/logger');

// Initialize consumer
const kafkaConsumer = new KafkaConsumer('notification-service-group');

// Start listening to events
const startConsumer = async () => {
  try {
    // Subscribe to topics
    await kafkaConsumer.subscribe([
      kafkaTopics.USER_CREATED,
      kafkaTopics.USER_UPDATED,
      kafkaTopics.ORDER_CREATED
    ], { fromBeginning: false });

    // Define message handler
    const onMessage = async (message) => {
      const { key, value, topic } = message;
      
      logger.info(`Processing message from ${topic}: ${key}`);
      
      switch (topic) {
        case kafkaTopics.USER_CREATED:
          await handleUserCreated(value);
          break;
        case kafkaTopics.USER_UPDATED:
          await handleUserUpdated(value);
          break;
        case kafkaTopics.ORDER_CREATED:
          await handleOrderCreated(value);
          break;
        default:
          logger.warn(`Unknown topic: ${topic}`);
      }
    };

    // Start consuming
    await kafkaConsumer.run(onMessage);
  } catch (error) {
    logger.error('Error starting consumer:', error);
    process.exit(1);
  }
};

const handleUserCreated = async (userData) => {
  logger.info('Handling USER_CREATED event:', userData);
  // Send welcome email, update cache, etc.
};

const handleUserUpdated = async (userData) => {
  logger.info('Handling USER_UPDATED event:', userData);
  // Update related data, send notification, etc.
};

const handleOrderCreated = async (orderData) => {
  logger.info('Handling ORDER_CREATED event:', orderData);
  // Process order, send confirmation, etc.
};

// Start consumer when service starts
startConsumer().catch(error => {
  logger.error('Failed to start consumer:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('Shutting down consumer...');
  await kafkaConsumer.stop();
  await kafkaConsumer.disconnect();
  process.exit(0);
});

module.exports = { startConsumer };
