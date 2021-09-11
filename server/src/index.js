require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { db } = require('./config/firestore');

const app = express();

app.use(cors({ origin: true }));

app.get('/api/users', async (req, res) => {
  const snapshot = await db.collection('users').get();

  const users = [];

  for (const doc of snapshot.docs) {
    users.push(doc.data());
  }

  res.json(users);
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[server]: http://localhost:${port}`);
});
