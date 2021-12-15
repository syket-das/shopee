const app = require('./app');
const connectDatabase = require('./config/database');

const dotenv = require('dotenv');


// handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});


dotenv.config({ path: 'backend/config/config.env' });

// Connect to database
connectDatabase();



const server = app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server is running at http://localhost:${process.env.PORT || 5000} in ${
      process.env.NODE_ENV
    } mode`
  );
});


// handle un handled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // close server & exit process
    server.close(() => process.exit(1));
    });