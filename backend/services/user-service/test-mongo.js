// Quick MongoDB connection tester
require('dotenv').config();
const connectDB = require('./src/config/database');

(async () => {
  try {
    console.log('Testing MongoDB connection using MONGODB_URI:', process.env.MONGODB_URI ? process.env.MONGODB_URI.replace(/:[^:@]+@/,'://<user>:<pass>@') : 'MONGODB_URI not set');
    const conn = await connectDB();
    console.log('Connection successful:', conn && conn.connection && conn.connection.host);
    process.exit(0);
  } catch (err) {
    console.error('Connection test failed:', err && err.stack ? err.stack : err);
    process.exit(1);
  }
})();