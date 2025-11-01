const express = require('express');
const uploadController = require('../controllers/uploadController');
const auth = require('../middleware/auth');
const multer = require('multer');

const router = express.Router();

// All routes require authentication
router.use(auth);

// Upload route
router.post(
  '/',
  uploadController.uploadMiddleware,
  uploadController.handleUpload.bind(uploadController)
);


// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 10MB.'
      });
    }
  }

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  next();
});

module.exports = router;