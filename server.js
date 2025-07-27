import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import axios from 'axios';
import path from 'path';
import FormData from 'form-data'; // ✅ Required for file upload to Telegram

dotenv.config();

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer storage config (optional, but more readable)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // ✅ Make sure this folder exists
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Route to handle file uploads
app.post('/upload', upload.single('file'), async (req, res) => {
  const { name, mobile } = req.body;
  const file = req.file;

  // Validate inputs
  if (!file || !name || !mobile) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const caption = `📄 New Resume Uploaded\n👤 Name: ${name}\n📱 Mobile: ${mobile}`;
  const filePath = path.resolve(file.path);

  try {
    const telegramApi = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendDocument`;

    const formData = new FormData();
    formData.append('chat_id', process.env.TELEGRAM_CHAT_ID);
    formData.append('caption', caption);
    formData.append('document', fs.createReadStream(filePath));

    await axios.post(telegramApi, formData, {
      headers: formData.getHeaders(),
    });

    res.json({ message: 'File uploaded and sent to Telegram!' });
  } catch (err) {
    console.error('❌ Error sending to Telegram:', err.message);
    res.status(500).json({ message: 'Telegram upload failed' });
  }
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
