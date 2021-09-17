const { db } = require('../config/firestore');

class UserService {
  constructor() {
    this.userRef = db.collection('users');
  }

  async getAll() {
    const users = [];
    const userSnapshot = await this.userRef.get();

    for (const doc of userSnapshot.docs) {
      const { firstName, lastName } = doc.data();

      users.push({ id: doc.id, firstName, lastName });
    }

    return users;
  }

  async getById(userId) {
    const user = await this.userRef.doc(userId).get();
    if (!user.exists) {
      throw new Error('User not found.');
    }

    return user.data();
  }
}

const userService = new UserService();

module.exports = { userService };
