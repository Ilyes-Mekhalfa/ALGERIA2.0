const { kafka } = require('../config/kafka');
const logger = require('../utils/logger');

class KafkaConsumer {
  constructor(groupId) {
    this.groupId = groupId;
    this.consumer = kafka.consumer({
      groupId,
      sessionTimeout: 20000,
      heartbeatInterval: 3000,
      rebalanceTimeout: 60000,
    });
    this.isConnected = false;
  }

  async connect() {
    try {
      await this.consumer.connect();
      this.isConnected = true;
      logger.info(`Kafka Consumer connected with groupId: ${this.groupId}`);
    } catch (error) {
      logger.error('Failed to connect Kafka Consumer:', error);
      throw error;
    }
  }

  async disconnect() {
    try {
      await this.consumer.disconnect();
      this.isConnected = false;
      logger.info('Kafka Consumer disconnected');
    } catch (error) {
      logger.error('Error disconnecting Kafka Consumer:', error);
      throw error;
    }
  }

  async subscribe(topics, options = {}) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }

      await this.consumer.subscribe({
        topics: Array.isArray(topics) ? topics : [topics],
        fromBeginning: options.fromBeginning || false,
      });

      logger.info(`Subscribed to topics: ${Array.isArray(topics) ? topics.join(', ') : topics}`);
    } catch (error) {
      logger.error('Error subscribing to topics:', error);
      throw error;
    }
  }

  async run(onMessage, onError = null) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }

      await this.consumer.run({
        autoCommit: true,
        autoCommitInterval: 5000,
        autoCommitThreshold: 1,
        eachMessage: async ({ topic, partition, message }) => {
          try {
            logger.info(`Received message from topic ${topic}, partition ${partition}`);
            
            const parsedMessage = {
              key: message.key ? message.key.toString() : null,
              value: message.value ? JSON.parse(message.value.toString()) : null,
              timestamp: message.timestamp,
              offset: message.offset,
            };

            await onMessage(parsedMessage);
          } catch (error) {
            logger.error('Error processing message:', error);
            if (onError) {
              await onError(error, { topic, partition, message });
            }
          }
        },
      });
    } catch (error) {
      logger.error('Error running Kafka Consumer:', error);
      throw error;
    }
  }

  async stop() {
    try {
      await this.consumer.stop();
      logger.info('Kafka Consumer stopped');
    } catch (error) {
      logger.error('Error stopping Kafka Consumer:', error);
      throw error;
    }
  }
}

module.exports = KafkaConsumer;
