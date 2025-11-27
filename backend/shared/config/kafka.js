// ==================== shared/config/kafka.js ====================
const logger = require('../utils/logger');

// Check if Kafka is enabled via environment variable
const KAFKA_ENABLED = process.env.KAFKA_ENABLED === 'true';

let kafka = null;
let admin = null;

// Only initialize Kafka if enabled
if (KAFKA_ENABLED) {
  const { Kafka } = require('kafkajs');
  
  kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID || 'microservices-client',
    brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
    connectionTimeout: 10000,
    requestTimeout: 25000,
    retry: {
      maxRetryTime: 30000,
      initialRetryTime: 100,
      retries: 8,
    },
  });

  admin = kafka.admin();
}

// Initialize Kafka connection (optional)
const initializeKafka = async () => {
  if (!KAFKA_ENABLED) {
    logger.info('Kafka is disabled - skipping connection');
    return null;
  }

  try {
    await admin.connect();
    logger.info('Kafka Admin connected successfully');
    return admin;
  } catch (error) {
    logger.error('Failed to connect Kafka Admin:', error);
    logger.warn('Service will continue without Kafka');
    // DON'T exit - just warn and continue
    return null;
  }
};

// Get or create topics
const getOrCreateTopics = async (topics = []) => {
  if (!KAFKA_ENABLED || !admin) {
    logger.warn('Kafka not available - skipping topic creation');
    return;
  }

  try {
    const existingTopics = await admin.listTopics();
    const topicsToCreate = topics.filter(topic => !existingTopics.includes(topic));

    if (topicsToCreate.length > 0) {
      await admin.createTopics({
        topics: topicsToCreate.map(topic => ({
          topic,
          numPartitions: 1,
          replicationFactor: 1,
        })),
        validateOnly: false,
        timeout: 30000,
      });
      logger.info(`Created topics: ${topicsToCreate.join(', ')}`);
    } else {
      logger.info(`All topics already exist`);
    }
  } catch (error) {
    logger.error('Error managing Kafka topics:', error);
  }
};

// Publish message to Kafka topic
const publishMessage = async (topic, message) => {
  if (!KAFKA_ENABLED || !kafka) {
    logger.warn('Kafka not available - message not published');
    return;
  }

  try {
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    await producer.disconnect();
    logger.info(`Message published to topic: ${topic}`);
  } catch (error) {
    logger.error('Error publishing message to Kafka:', error);
  }
};

// Subscribe to Kafka topic
const subscribeToTopic = async (topic, groupId, callback) => {
  if (!KAFKA_ENABLED || !kafka) {
    logger.warn('Kafka not available - cannot subscribe to topic');
    return;
  }

  try {
    const consumer = kafka.consumer({ groupId });
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const data = JSON.parse(message.value.toString());
          await callback(data);
        } catch (error) {
          logger.error('Error processing Kafka message:', error);
        }
      },
    });

    logger.info(`Subscribed to topic: ${topic} with group: ${groupId}`);
  } catch (error) {
    logger.error('Error subscribing to Kafka topic:', error);
  }
};

// Disconnect Kafka Admin
const disconnectKafka = async () => {
  if (!KAFKA_ENABLED || !admin) {
    return;
  }

  try {
    await admin.disconnect();
    logger.info('Kafka Admin disconnected');
  } catch (error) {
    logger.error('Error disconnecting Kafka Admin:', error);
  }
};

module.exports = {
  kafka,
  admin,
  initializeKafka,
  getOrCreateTopics,
  publishMessage,
  subscribeToTopic,
  disconnectKafka,
  isEnabled: KAFKA_ENABLED,
};
