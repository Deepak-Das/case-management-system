const handleErrors = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const handleAsyncErrors = (handler) => (req, res, next) => {
  handler(req, res, next).catch((error) => next(error));
};

module.exports = { handleErrors, handleAsyncErrors };
