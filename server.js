const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// ====== Middleware ======
app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ====== Connect MongoDB Atlas ======
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Atlas connected successfully!"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ====== Import Routes ======
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/documents');
const uploadRoutes = require('./routes/upload');

// ====== Use Routes ======
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/upload', uploadRoutes);

// ====== Health Check ======
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// ====== Default Route ======
app.get('/', (req, res) => {
  res.send('🚀 DocuScan AI Backend is running...');
});

// ====== Start Server ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
