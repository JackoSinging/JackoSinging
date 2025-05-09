/**
 * Error handling middleware
 * Handles errors in a consistent way across the application
 */

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  
  // Default error status and message
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  // Error response
  res.status(status).json({
    error: {
      message,
      status,
      timestamp: new Date().toISOString()
    }
  });
};

module.exports = errorHandler;