// // firebaseConfig.js
// const { initializeApp } = require("firebase/app");
// const { getStorage } = require("firebase/storage");

// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID,
// };

// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);

// module.exports = { storage };

const admin = require('firebase-admin');
const serviceAccount = require('./yourhr-9537d-firebase-adminsdk-om4u5-5808948a8f.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Make sure the environment variable is set for the bucket
});

const bucket = admin.storage().bucket();

module.exports = { bucket };
