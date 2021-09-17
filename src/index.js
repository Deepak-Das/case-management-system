const path = require('path');
require('dotenv').config({
  path: path.resolve(process.cwd(), 'src', 'config', '.env'),
});
const express = require('express');
const cors = require('cors');
const { userService } = require('./services/user.service');
const { AppError } = require('./utils/AppError');
const handleErrors = require('./middlewares/errors');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/api/users', async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
});

app.get('/api/users/:id', async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// Catch all middleware for unavailable routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handler middleware
app.use(handleErrors);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`[server]: http://localhost:${port}`);
});
