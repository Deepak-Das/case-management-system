require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getUsers } = require('./services/user.service');

const app = express();

app.use(cors({ origin: true }));

app.get('/api/users', async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`[server]: http://localhost:${port}`);
});
