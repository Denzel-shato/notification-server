const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('./service-account.json');

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