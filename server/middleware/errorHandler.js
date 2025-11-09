export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
