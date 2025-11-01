const Document = require('../models/Document');
const fs = require('fs');
const path = require('path');

class DocumentController {
  // Get all documents for user

  async getDocuments(req, res) {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
      const skip = (page - 1) * limit;

      // base query
      let query = { userId: req.user._id };

      // 🔍 if search text is given, use regex on title and extractedText
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { extractedText: { $regex: search, $options: 'i' } }
        ];
      }

      const documents = await Document.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Document.countDocuments(query);

      res.json({
        success: true,
        documents,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching documents',
        error: error.message
      });
    }
  }

  // Get single document
  async getDocument(req, res) {
    try {
      const { id } = req.params;

      const document = await Document.findOne({
        _id: id,
        userId: req.user._id
      });

      if (!document) {
        return res.status(404).json({
          success: false,
          message: 'Document not found'
        });
      }

      res.json({
        success: true,
        document
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching document',
        error: error.message
      });
    }
  }

  // Delete document
  async deleteDocument(req, res) {
    try {
      const { id } = req.params;

      const document = await Document.findOne({
        _id: id,
        userId: req.user._id
      });

      if (!document) {
        return res.status(404).json({
          success: false,
          message: 'Document not found'
        });
      }

      // Delete file from filesystem
      if (fs.existsSync(document.filePath)) {
        fs.unlinkSync(document.filePath);
      }

      // Delete from database
      await Document.findByIdAndDelete(id);

      res.json({
        success: true,
        message: 'Document deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting document',
        error: error.message
      });
    }
  }
}

module.exports = new DocumentController();