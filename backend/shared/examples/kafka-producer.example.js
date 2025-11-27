// Example of how to use KafkaProducer in your controllers
const KafkaProducer = require('@microservices/shared/services/kafka.producer');
const kafkaTopics = require('@microservices/shared/constants/kafka-topics');

const kafkaProducer = new KafkaProducer();

// Example controller function
const createUserExample = async (req, res) => {
  try {
    const userData = req.body;
    
    // Create user in database
    // const user = await User.create(userData);
    
    // Publish event to Kafka
    await kafkaProducer.send(kafkaTopics.USER_CREATED, {
      key: 'user-created',
      value: JSON.stringify({
        userId: 'user-id',
        email: userData.email,
        timestamp: new Date().toISOString(),
        action: 'USER_CREATED'
      })
    });

    res.status(201).json({ 
      message: 'User created successfully',
      data: userData 
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

module.exports = { createUserExample };
