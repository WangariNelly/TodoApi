const ErrorHandler = require('../utils/errorHandler.util');

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    error.message = err.message;

    if (err.name === 'CastError') {
      const message = 'Resource not found';
      error = new ErrorHandler(message, 404);
    }

    res.status(err.statusCode).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

module.exports = errorMiddleware;
