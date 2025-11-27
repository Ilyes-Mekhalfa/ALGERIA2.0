# Microservices Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally on `localhost:27017`)
- Kafka (running locally on `localhost:9092`)

## Installation

1. **Install dependencies for all services:**

```bash
# From root directory
cd shared && npm install
cd ../api-gateway && npm install
cd ../services/user-service && npm install
```

2. **Start Kafka** (without Docker):

Kafka requires Java to be installed. Download and set up Kafka from https://kafka.apache.org/downloads

```bash
# Extract Kafka
tar -xzf kafka_2.13-3.x.x.tgz
cd kafka_2.13-3.x.x

# Terminal 1: Start Zookeeper
bin/zookeeper-server-start.sh config/zookeeper.properties

# Terminal 2: Start Kafka Broker
bin/kafka-server-start.sh config/server.properties
```

3. **Start MongoDB:**

```bash
# On Windows with MongoDB installed
mongod

# Or use MongoDB Atlas connection string in .env file
```

## Environment Configuration

The `.env` file in the root directory contains all configuration. Key settings:

- `MONGODB_URI`: MongoDB connection string
- `KAFKA_BROKERS`: Kafka broker addresses (default: `localhost:9092`)
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: API Gateway port (default: 3000)
- `USER_SERVICE_PORT`: User Service port (default: 3001)

## Running the Services

**Terminal 1: API Gateway**
```bash
cd api-gateway
npm run dev
```
API Gateway will run on `http://localhost:3000`

**Terminal 2: User Service**
```bash
cd services/user-service
npm run dev
```
User Service will run on `http://localhost:3001`

## Verifying Setup

1. **Check API Gateway health:**
   ```bash
   curl http://localhost:3000/health
   ```

2. **Check User Service health:**
   ```bash
   curl http://localhost:3001/health
   ```

3. **View Kafka topics (in another Kafka terminal):**
   ```bash
   bin/kafka-topics.sh --bootstrap-server localhost:9092 --list
   ```

## Available Kafka Topics

Topics are automatically created when services start:
- `user.created` - When a user is created
- `user.updated` - When a user is updated
- `user.deleted` - When a user is deleted
- `user.logged.in` - When a user logs in
- `user.logged.out` - When a user logs out
- And more defined in `shared/constants/kafka-topics.js`

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running: `mongod` or start MongoDB service
- Check `MONGODB_URI` in `.env` file

**Kafka Connection Error:**
- Ensure Zookeeper and Kafka broker are running
- Check `KAFKA_BROKERS` in `.env` file
- Verify Kafka is listening on port 9092

**Port Already in Use:**
- Change ports in `.env` file or kill processes using those ports

## File Structure Overview

```
shared/
├── config/
│   ├── database.js      # MongoDB configuration
│   └── kafka.js         # Kafka admin setup
├── services/
│   ├── kafka.producer.js # Kafka message producer
│   └── kafka.consumer.js # Kafka message consumer
└── constants/
    └── kafka-topics.js  # Kafka topic definitions

api-gateway/
└── src/
    └── server.js        # API Gateway entry point

services/user-service/
└── src/
    └── server.js        # User Service entry point
```

## Next Steps

1. Integrate Kafka producer/consumer in your service handlers
2. Publish events when creating/updating/deleting users
3. Subscribe to topics in your services to handle events
4. Add more microservices following the same pattern
