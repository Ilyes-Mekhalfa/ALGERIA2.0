import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
// import { initSocket } from "./socket/socket.js";

//process Error Handling
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

//load environment variables
dotenv.config({path : './.env'})

//connecting to mongoDB

mongoose.connect(process.env.DATABASE_URL)
  .then(() =>{
    console.log('connected to database✅✅✅✅');
    
  })
  .catch(err =>{
    console.log('❌❌❌❌❌❌❌❌❌failed to connect to database💥 :' , err);
    
  })

//creating server
const port = process.env.PORT || 8000;

// Create http server and keep reference for graceful shutdown
// (if you need socket.io, uncomment initSocket usage)
const server = http.createServer(app);
// const io = initSocket(server);

server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});


//unhandled rejection
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! shutting down...');
  console.log(err.name, err.message);
  if (typeof server !== 'undefined' && server && typeof server.close === 'function') {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});