const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const Document = require('../models/Document');
const ocrService = require('../services/ocrService');

// ==================== AWS S3 Configuration ====================
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// ==================== Multer Local Temp Storage ====================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (allowedMimes.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Invalid file type. Only JPEG, PNG, JPG, and PDF are allowed.'));
  },
});

class UploadController {
  uploadMiddleware = upload.single('document');

  // =============== Handle Upload & Send to S3 ===============
  async handleUpload(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }

      console.log('📤 File received:', {
        originalName: req.file.originalname,
        filename: req.file.filename,
        size: req.file.size,
        type: req.file.mimetype,
      });

      // Upload file to AWS S3
      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.file.filename,
        Body: fs.createReadStream(req.file.path),
        ContentType: req.file.mimetype,
      };

      const command = new PutObjectCommand(uploadParams);
      await s3.send(command);

      // S3 file URL
      const s3Url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${req.file.filename}`;

      // Delete local temp file
      fs.unlinkSync(req.file.path);

      // Save to MongoDB
      const document = new Document({
        title: req.body.title || req.file.originalname,
        filename: req.file.filename,
        originalName: req.file.originalname,
        fileSize: req.file.size,
        fileType: req.file.mimetype,
        fileUrl: s3Url,
        userId: req.user._id,
        ocrStatus: 'processing',
      });

      await document.save();

      // Respond immediately
      res.status(201).json({
        success: true,
        message: 'File uploaded successfully to AWS S3. OCR processing started.',
        document: {
          id: document._id,
          title: document.title,
          fileUrl: document.fileUrl,
          fileSize: document.fileSize,
          fileType: document.fileType,
          ocrStatus: document.ocrStatus,
          createdAt: document.createdAt,
        },
      });

      // Process OCR asynchronously
      this.processOCR(document).catch((err) => {
        console.error('❌ Background OCR processing failed:', err);
      });

    } catch (error) {
      console.error('❌ Upload Error:', error);
      res.status(500).json({
        success: false,
        message: 'Error uploading file',
        error: error.message,
      });
    }
  }

  // =============== OCR Processing ===============
  async processOCR(document) {
    try {
      console.log(`🔄 Starting OCR processing for: ${document.originalName}`);

      document.ocrStatus = 'processing';
      await document.save();

      // Download file temporarily from S3 for OCR
      const tempFilePath = path.join(__dirname, `../temp/${document.filename}`);
      const tempDir = path.dirname(tempFilePath);
      if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

      const response = await axios({
        url: document.fileUrl,
        method: 'GET',
        responseType: 'arraybuffer',
      });

      fs.writeFileSync(tempFilePath, Buffer.from(response.data));

      console.log(`📥 File downloaded locally for OCR: ${tempFilePath}`);

      // Perform OCR on downloaded file
      const ocrResult = await ocrService.extractTextFromDocument(tempFilePath, document.fileType);

      if (ocrResult.success) {
        document.extractedText = ocrResult.text;
        document.ocrStatus = 'completed';
        console.log(`✅ OCR completed for: ${document.originalName}`);
      } else {
        document.extractedText = `OCR Failed: ${ocrResult.error}`;
        document.ocrStatus = 'failed';
        console.error(`❌ OCR failed for: ${document.originalName}`, ocrResult.error);
      }

      await document.save();

      // Delete temp file
      fs.unlinkSync(tempFilePath);
      console.log(`🗑️ Temp file deleted: ${tempFilePath}`);

      console.log(`💾 Document saved with OCR status: ${document.ocrStatus}`);
    } catch (error) {
      console.error(`💥 OCR processing error for document: ${document._id}`, error);
      document.ocrStatus = 'failed';
      document.extractedText = `OCR Error: ${error.message}`;
      await document.save();
    }
  }
}

module.exports = new UploadController();

