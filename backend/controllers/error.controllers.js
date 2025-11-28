export default function errorHandler(err, req, res, next) {
  // Prefer structured logging if available
  if (global && global.logger && typeof global.logger.error === 'function') {
    global.logger.error('Unhandled error', err && (err.stack || err));
  } else if (console && console.error) {
    console.error(err && (err.stack || err));
  }

  const statusCode = err?.statusCode || err?.status || 500;
  const isOperational = err?.isOperational || err?.operational || false;

  const response = {
    success: false,
    error: err?.message || 'Internal Server Error'
  };

  // Only include stack in development or for operational errors when helpful
  if (process.env.NODE_ENV === 'development') {
    response.stack = err?.stack;
  }

  // For non-operational errors, avoid leaking internal details in production
  if (!isOperational && process.env.NODE_ENV === 'production') {
    response.error = 'An unexpected error occurred';
  }

  res.status(Number(statusCode) || 500).json(response);
}
