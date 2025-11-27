const KafkaProducer = require('./services/kafka.producer');
const KafkaConsumer = require('./services/kafka.consumer');
const { kafka, initializeKafka, getOrCreateTopics, disconnectKafka } = require('./config/kafka');
const kafkaTopics = require('./constants/kafka-topics');

module.exports = {
  // Middleware
  ...require('./middleware'),
  
  // Utils
  ...require('./utils'),
  
  // Constants
  ...require('./constants'),
  
  // Kafka services
  KafkaProducer,
  KafkaConsumer,
  kafkaTopics,
  
  // Config
  config: {
    database: require('./config/database'),
    kafka: {
      kafka,
      initializeKafka,
      getOrCreateTopics,
      disconnectKafka
    }
  }
};  