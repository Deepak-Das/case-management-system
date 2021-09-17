const express = require('express');
const cors = require('cors');

const userRoutes = require('../routes/user.routes');
const { AppError } = require('../utils/AppError');
const { handleErrors } = require('../middlewares/errors');

module.exports = (app) => {
  app.use(cors({ origin: true }));
  app.use(express.json());
  app.use('/api/users', userRoutes);

  // Catch all middleware for unavailable routes
  app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  // Error handler middleware
  app.use(handleErrors);
};
