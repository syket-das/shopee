const app = require('./app');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary');

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

// Setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server is running at http://localhost:${process.env.PORT || 5000} in ${
      process.env.NODE_ENV
    } mode`
  );
});

// Handle Unhandled Promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down the server due to Unhandled Promise rejection');
  server.close(() => {
    process.exit(1);
  });
});
