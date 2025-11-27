const { kafka } = require('../config/kafka');
const logger = require('../utils/logger');

class KafkaProducer {
  constructor() {
    this.producer = kafka.producer({
      allowAutoTopicCreation: true,
      maxInFlightRequests: 5,
      compression: 1, // Gzip compression
    });
    this.isConnected = false;
  }

  async connect() {
    try {
      await this.producer.connect();
      this.isConnected = true;
      logger.info('Kafka Producer connected');
    } catch (error) {
      logger.error('Failed to connect Kafka Producer:', error);
      throw error;
    }
  }

  async disconnect() {
    try {
      await this.producer.disconnect();
      this.isConnected = false;
      logger.info('Kafka Producer disconnected');
    } catch (error) {
      logger.error('Error disconnecting Kafka Producer:', error);
      throw error;
    }
  }

  async send(topic, messages) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }

      const result = await this.producer.send({
        topic,
        messages: Array.isArray(messages) ? messages : [messages],
        timeout: 30000,
        compression: 1,
      });

      logger.info(`Message sent to topic ${topic}:`, result);
      return result;
    } catch (error) {
      logger.error(`Error sending message to topic ${topic}:`, error);
      throw error;
    }
  }

  async sendBatch(topicMessages) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }

      const result = await this.producer.sendBatch({
        topicMessages,
        timeout: 30000,
      });

      logger.info('Batch messages sent successfully:', result);
      return result;
    } catch (error) {
      logger.error('Error sending batch messages:', error);
      throw error;
    }
  }
}

module.exports = KafkaProducer;
