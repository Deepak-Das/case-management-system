const { db } = require('../config/firestore');

const getUsers = async () => {
  const snapshot = await db.collection('users').get();

  const users = [];

  for (const doc of snapshot.docs) {
    const { firstName, lastName } = doc.data();

    users.push({ id: doc.id, firstName, lastName });
  }

  return users;
};

module.exports = { getUsers };
