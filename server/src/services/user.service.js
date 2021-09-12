const { db } = require('../config/firestore');

class UserService {
  async init() {
    this.userRef = db.collection('users');
    this.userSnapshot = await this.userRef.get();
  }

  async getUsers() {
    const users = [];

    for (const doc of this.userSnapshot.docs) {
      const { firstName, lastName } = doc.data();

      users.push({ id: doc.id, firstName, lastName });
    }

    return users;
  }

  async getUserById(userId) {
    const user = await this.userRef.doc(userId).get();
    if (!user.exists) {
      throw new Error('User not found.');
    }

    return user.data();
  }
}

const userService = new UserService();

(async function () {
  await userService.init();
})();

module.exports = { userService };
