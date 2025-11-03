// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// const { exec } = require('child_process'); // 🔹 For GitHub auto deployment
// require('dotenv').config();

// const app = express();


// // ====== CORS Configuration ======
// const corsOptions = {
//   origin: [
//     'http://localhost:3000',
//     'https://resilient-llama-e70898.netlify.app'
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions)); // ✅ Handle preflight requests


// // 🔹 Allow large JSON payloads for GitHub Webhook
// app.use(express.json({ limit: '10mb', type: 'application/json' }));
// app.use(express.urlencoded({ extended: true }));

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
// // ====== GitHub Webhook for Auto Deployment ======
// app.post('/github-webhook', express.json({ verify: (req, res, buf) => req.rawBody = buf.toString() }), (req, res) => {
//   console.log("🪝 Webhook triggered!");

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

// // (Optional GET for testing)
// app.get('/github-webhook', (req, res) => {
//   res.send("✅ GitHub Webhook route is active — send POST requests here!");
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
// console.log("🚀 Auto deploy test success!");





// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// const { exec } = require('child_process'); // 🔹 For GitHub auto deployment
// require('dotenv').config();

// const app = express();

// // ====== CORS Configuration ======
// const corsOptions = {
//   origin: [
//     'http://localhost:3000',
//     'https://resilient-llama-e70898.netlify.app',
//   ],
//   methods: 'GET,POST,PUT,DELETE,OPTIONS',
//   allowedHeaders: 'Content-Type,Authorization',
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
// // app.options('*', cors(corsOptions));
// app.options(/.*/, cors(corsOptions));



// // ====== Middleware ======
// app.use(express.json({ limit: '10mb', type: 'application/json' }));
// app.use(express.urlencoded({ extended: true }));

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
// app.post(
//   '/github-webhook',
//   express.json({ verify: (req, res, buf) => (req.rawBody = buf.toString()) }),
//   (req, res) => {
//     console.log("🪝 Webhook triggered!");

//     try {
//       exec('bash ~/deploy.sh', (error, stdout, stderr) => {
//         if (error) {
//           console.error(`❌ Deployment error: ${error.message}`);
//           return res.status(500).send('Deployment failed');
//         }
//         console.log('✅ Deployment Output:', stdout);
//         res.status(200).send('Deployed successfully');
//       });
//     } catch (err) {
//       console.error('❌ Error executing webhook:', err);
//       res.status(500).send('Error executing webhook');
//     }
//   }
// );

// // (Optional GET for testing)
// app.get('/github-webhook', (req, res) => {
//   res.send("✅ GitHub Webhook route is active — send POST requests here!");
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




// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// const { exec } = require('child_process');
// require('dotenv').config();

// const app = express();

// // ====== CORS Configuration ======
// const corsOptions = {
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
    
//     const allowedOrigins = [
//       'http://localhost:3000',
//       'https://resilient-llama-e70898.netlify.app',
//       'https://*.netlify.app',
//       process.env.CLIENT_URL
//     ].filter(Boolean);
    
//     // Check if origin matches any allowed origin
//     const isAllowed = allowedOrigins.some(allowedOrigin => {
//       if (allowedOrigin.includes('*')) {
//         const baseDomain = allowedOrigin.replace('*', '');
//         return origin.endsWith(baseDomain);
//       }
//       return origin === allowedOrigin;
//     });
    
//     if (isAllowed) {
//       callback(null, true);
//     } else {
//       console.log('🚫 CORS Blocked Origin:', origin);
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//   credentials: true,
//   optionsSuccessStatus: 200
// };

// // Apply CORS middleware
// app.use(cors(corsOptions));

// // Handle preflight requests for all routes
// app.options('*', (req, res) => {
//   res.header('Access-Control-Allow-Origin', req.headers.origin);
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.status(200).send();
// });

// // ====== Middleware ======
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true }));

// // Serve uploaded files statically (for local development)
// if (process.env.NODE_ENV === 'development') {
//   app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// }

// // ====== Connect MongoDB Atlas ======
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("✅ MongoDB Atlas connected successfully!");
//   } catch (err) {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1);
//   }
// };

// connectDB();

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
//     message: 'DocuScan AI Backend is running',
//     environment: process.env.NODE_ENV,
//     timestamp: new Date().toISOString()
//   });
// });

// // ====== GitHub Webhook for Auto Deployment ======
// app.post(
//   '/github-webhook',
//   express.json({ type: 'application/json' }),
//   (req, res) => {
//     if (process.env.NODE_ENV !== 'production') {
//       return res.status(200).json({ message: 'Webhook received (development mode)' });
//     }

//     console.log("🪝 Webhook triggered!");

//     try {
//       exec('cd ~/docu-scan-ai-backend && git pull && npm install && pm2 restart all', (error, stdout, stderr) => {
//         if (error) {
//           console.error(`❌ Deployment error: ${error.message}`);
//           return res.status(500).json({ error: 'Deployment failed' });
//         }
//         console.log('✅ Deployment Output:', stdout);
//         res.status(200).json({ message: 'Deployed successfully' });
//       });
//     } catch (err) {
//       console.error('❌ Error executing webhook:', err);
//       res.status(500).json({ error: 'Error executing webhook' });
//     }
//   }
// );

// // (Optional GET for testing webhook)
// app.get('/github-webhook', (req, res) => {
//   res.json({ 
//     message: "✅ GitHub Webhook route is active",
//     instruction: "Send POST requests here for auto-deployment"
//   });
// });

// // ====== Default Route ======
// app.get('/', (req, res) => {
//   res.json({
//     message: '🚀 DocuScan AI Backend is running...',
//     version: '1.0.0',
//     environment: process.env.NODE_ENV,
//     endpoints: {
//       auth: '/api/auth',
//       documents: '/api/documents', 
//       upload: '/api/upload',
//       health: '/health'
//     }
//   });
// });

// // ====== Error Handling Middleware ======
// app.use((error, req, res, next) => {
//   console.error('❌ Server Error:', error);
  
//   // CORS error handling
//   if (error.message === 'Not allowed by CORS') {
//     return res.status(403).json({
//       success: false,
//       message: 'CORS: Origin not allowed',
//       allowedOrigins: [
//         'http://localhost:3000',
//         'https://resilient-llama-e70898.netlify.app'
//       ]
//     });
//   }
  
//   res.status(500).json({
//     success: false,
//     message: 'Internal server error',
//     error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
//   });
// });

// // ====== 404 Handler ======
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'API endpoint not found',
//     path: req.originalUrl,
//     availableEndpoints: [
//       '/api/auth/login',
//       '/api/auth/register',
//       '/api/documents',
//       '/api/upload',
//       '/health'
//     ]
//   });
// });

// // ====== Start Server ======
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
//   console.log(`🔗 Health Check: http://localhost:${PORT}/health`);
//   console.log(`✅ CORS Enabled for: localhost:3000, resilient-llama-e70898.netlify.app`);
// });

// module.exports = app;





const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://resilient-llama-e70898.netlify.app'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/upload', require('./routes/upload'));

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'DocuScan AI Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Default Route
app.get('/', (req, res) => {
  res.json({
    message: '🚀 DocuScan AI Backend',
    version: '1.0.0'
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Health: http://localhost:${PORT}/health`);
});