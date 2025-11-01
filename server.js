// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config();

// const app = express();

// // ====== Middleware ======
// app.use(cors());
// app.use(express.json());

// // Serve uploaded files statically
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // ====== Connect MongoDB Atlas ======
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log("✅ MongoDB Atlas connected successfully!"))
//   .catch(err => console.error("❌ MongoDB connection error:", err));

// // ====== Import Routes ======
// const authRoutes = require('./routes/auth');
// const documentRoutes = require('./routes/documents');
// const uploadRoutes = require('./routes/upload');

// // ====== Use Routes ======
// app.use('/api/auth', authRoutes);
// app.use('/api/documents', documentRoutes);
// app.use('/api/upload', uploadRoutes);

// // ====== Health Check ======
// app.get('/health', (req, res) => {
//   res.json({
//     status: 'OK',
//     message: 'Server is running',
//     timestamp: new Date().toISOString()
//   });
// });

// // ====== Default Route ======
// app.get('/', (req, res) => {
//   res.send('🚀 DocuScan AI Backend is running...');
// });

// // ====== Start Server ======
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });



// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// const { exec } = require('child_process'); // 🔹 Added for GitHub auto deployment
// require('dotenv').config();

// const app = express();

// // ====== Middleware ======
// app.use(cors());
// app.use(express.json());

// // Serve uploaded files statically
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // ====== Connect MongoDB Atlas ======
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log("✅ MongoDB Atlas connected successfully!"))
//   .catch(err => console.error("❌ MongoDB connection error:", err));

// // ====== Import Routes ======
// const authRoutes = require('./routes/auth');
// const documentRoutes = require('./routes/documents');
// const uploadRoutes = require('./routes/upload');

// // ====== Use Routes ======
// app.use('/api/auth', authRoutes);
// app.use('/api/documents', documentRoutes);
// app.use('/api/upload', uploadRoutes);

// // ====== Health Check ======
// app.get('/health', (req, res) => {
//   res.json({
//     status: 'OK',
//     message: 'Server is running',
//     timestamp: new Date().toISOString()
//   });
// });

// // ====== GitHub Webhook for Auto Deployment ======
// app.post('/github-webhook', (req, res) => {
//   try {
//     exec('bash ~/deploy.sh', (error, stdout, stderr) => {
//       if (error) {
//         console.error(`❌ Deployment error: ${error.message}`);
//         return res.status(500).send('Deployment failed');
//       }
//       console.log('✅ Deployment Output:', stdout);
//       res.status(200).send('Deployed successfully');
//     });
//   } catch (err) {
//     console.error('❌ Error executing webhook:', err);
//     res.status(500).send('Error executing webhook');
//   }
// });

// // ====== Default Route ======
// app.get('/', (req, res) => {
//   res.send('🚀 DocuScan AI Backend is running...');
// });

// // ====== Start Server ======
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// console.log("🚀 Auto deploy test success!");








const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { exec } = require('child_process'); // 🔹 For GitHub auto deployment
require('dotenv').config();

const app = express();

// ====== Middleware ======
app.use(cors());
// 🔹 Allow large JSON payloads for GitHub Webhook
app.use(express.json({ limit: '10mb', type: 'application/json' }));
app.use(express.urlencoded({ extended: true }));

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

// ====== GitHub Webhook for Auto Deployment ======
// ====== GitHub Webhook for Auto Deployment ======
app.post('/github-webhook', express.json({ verify: (req, res, buf) => req.rawBody = buf.toString() }), (req, res) => {
  console.log("🪝 Webhook triggered!");

  try {
    exec('bash ~/deploy.sh', (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Deployment error: ${error.message}`);
        return res.status(500).send('Deployment failed');
      }
      console.log('✅ Deployment Output:', stdout);
      res.status(200).send('Deployed successfully');
    });
  } catch (err) {
    console.error('❌ Error executing webhook:', err);
    res.status(500).send('Error executing webhook');
  }
});

// (Optional GET for testing)
app.get('/github-webhook', (req, res) => {
  res.send("✅ GitHub Webhook route is active — send POST requests here!");
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

console.log("🚀 Auto deploy test success!");
console.log("🚀 Auto deploy test success!");
