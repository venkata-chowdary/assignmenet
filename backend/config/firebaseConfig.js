const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config(); // Load environment variables

// Use path.resolve to construct the absolute path
const serviceAccountPath = path.join(__dirname, process.env.SERVICE_ACC_URL);
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();

module.exports = { bucket };
