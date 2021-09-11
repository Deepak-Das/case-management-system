const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIRESTORE_CREDS);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL:
});

const db = admin.firestore();

module.exports = {
  db,
};
