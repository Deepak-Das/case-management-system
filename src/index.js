require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { userService } = require('./services/user.service');
const { AppError } = require('./utils/errors');

const app = express();

app.use(cors({ origin: true }));

app.get('/api/users', async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
});

app.get('/api/users/:id', async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);

    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Catch all middleware for unavailable routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handler middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`[server]: http://localhost:${port}`);
});
