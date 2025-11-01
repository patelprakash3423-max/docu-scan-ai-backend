const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const Tesseract = require("tesseract.js");
let pdfParse = require("pdf-parse");

// ✅ Handle ESM import properly
if (pdfParse.default) {
  pdfParse = pdfParse.default;
}

class OCRService {
  // ================= IMAGE OCR =================
  async extractTextFromImage(imagePath) {
    try {
      console.log("🖼️ Extracting text from image:", imagePath);

      if (!fs.existsSync(imagePath)) {
        throw new Error("Image file not found for OCR");
      }

      const { data: { text } } = await Tesseract.recognize(imagePath, "eng");
      return { success: true, text: text.trim() };
    } catch (err) {
      console.error("❌ Image OCR failed:", err.message);
      return { success: false, error: err.message, text: "" };
    }
  }

  // ================= PDF OCR =================
  async extractTextFromPDF(pdfPath) {
    try {
      console.log("📘 Extracting text from PDF:", pdfPath);

      if (!fs.existsSync(pdfPath)) {
        throw new Error("PDF file not found for OCR");
      }

      const dataBuffer = fs.readFileSync(pdfPath);
      const data = await pdfParse(dataBuffer);

      if (data.text && data.text.trim().length > 50) {
        console.log("✅ Text-based PDF detected and parsed successfully");
        return { success: true, text: data.text.trim() };
      } else {
        console.log("⚠️ No text detected — switching to OCR mode for scanned PDF...");
        return await this.extractTextFromScannedPDF(pdfPath);
      }
    } catch (err) {
      console.error("❌ PDF extraction error:", err.message);
      return { success: false, error: err.message, text: "" };
    }
  }

  // ================= SCANNED PDF OCR =================
  async extractTextFromScannedPDF(pdfPath) {
    const popplerPath = "C:\\Users\\poppler-25.07.0\\Library\\bin\\pdftoppm.exe"; // ⚙️ Update path if needed
    const tempDir = path.join(__dirname, "../temp_ocr");

    try {
      if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

      const tempImagePrefix = path.join(tempDir, "page");
      const command = `"${popplerPath}" "${pdfPath}" "${tempImagePrefix}" -png`;
      console.log("⚙️ Running Poppler command:", command);
      execSync(command, { stdio: "ignore" });

      const imageFiles = fs.readdirSync(tempDir).filter(f => f.endsWith(".png"));
      if (imageFiles.length === 0) throw new Error("No PNG pages generated from PDF");

      let extractedText = "";
      for (const img of imageFiles) {
        const imgPath = path.join(tempDir, img);
        console.log(`🔍 Running OCR on ${imgPath}`);
        const { data: { text } } = await Tesseract.recognize(imgPath, "eng");
        extractedText += text + "\n";
      }

      console.log("✅ OCR completed for scanned PDF");
      return { success: true, text: extractedText.trim() };

    } catch (err) {
      console.error("❌ Scanned PDF OCR error:", err.message);
      return { success: false, error: err.message, text: "" };
    } finally {
      if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }

  // ================= MAIN ENTRY POINT =================
  async extractTextFromDocument(filePath, fileType) {
    console.log("📄 Starting OCR for:", filePath, "| Type:", fileType);

    // Wait a moment to ensure file exists (especially after S3 download)
    for (let i = 0; i < 5; i++) {
      if (fs.existsSync(filePath)) break;
      await new Promise(res => setTimeout(res, 500));
    }

    if (!fs.existsSync(filePath)) {
      console.error("❌ File not found at path:", filePath);
      return { success: false, error: "File not found for OCR", text: "" };
    }

    if (fileType.startsWith("image/")) {
      return await this.extractTextFromImage(filePath);
    } else if (fileType === "application/pdf") {
      return await this.extractTextFromPDF(filePath);
    } else {
      return { success: false, error: "Unsupported file type", text: "" };
    }
  }
}

module.exports = new OCRService();
