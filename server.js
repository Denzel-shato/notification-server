const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Load service account from environment variable
const serviceAccountBase64 = process.env.SERVICE_ACCOUNT_BASE64;
if (!serviceAccountBase64) {
  console.error('SERVICE_ACCOUNT_BASE64 environment variable is not set');
  process.exit(1);
}

const serviceAccount = JSON.parse(Buffer.from(serviceAccountBase64, 'base64').toString());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'Notification server is running' });
});

app.post('/listen/:chatId', async (req, res) => {
  const { chatId } = req.params;
  console.log(`📡 Now listening to chat: ${chatId}`);
  res.json({ success: true, chatId });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});