const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'DEVELOPMENT ') {
    console.log('dev error');
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === 'PRODUCTION ') {
    let error = { ...err };
    error.message = err.message;
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors).map((val) => val.message);
      error = new ErrorHandler(message, 400);
    }

    if (error.name === 'CastError') {
      const message = `Resource not found`;
      error = new ErrorHandler(message, 404);
    }

    if (error.code === 11000) {
      const message = `Duplicate  ${Object.keys(error.keyValue)}  entered`;
      error = new ErrorHandler(message, 400);
    }

    if (error.name === 'JsonWebTokenError') {
      const message = `Invalid token`;
      error = new ErrorHandler(message, 401);
    }

    if (error.name === 'TokenExpiredError') {
      const message = `Token expired`;
      error = new ErrorHandler(message, 401);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

// module.exports = (err, req, res, next) => {
//   const error = res.statusCode === 200 ? 500 : res.statusCode;
//   res.status(error).json({
//     success: false,
//     error: err.message,
//     stack: process.env.NODE_ENV === 'PRODUCTION ' ? 'confidential' : err.stack,
//   });
// };
