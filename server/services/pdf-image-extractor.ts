import pdf2pic from "pdf2pic";
import fs from "fs";
import path from "path";

// Define the PDF file path and output directory
const PDF_PATH = path.join(process.cwd(), "attached_assets", "Eleganz_1756980291927.pdf");
const OUTPUT_DIR = path.join(process.cwd(), "public", "assets", "pdf-images");

export interface ExtractedImage {
  path: string;
  filename: string;
  pageNumber: number;
}

class PDFImageExtractor {
  private extractedImages: ExtractedImage[] = [];
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Ensure output directory exists
      if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
      }

      // Check if PDF exists
      if (!fs.existsSync(PDF_PATH)) {
        console.warn("PDF file not found at:", PDF_PATH);
        this.initialized = true;
        return;
      }

      // Configure pdf2pic options
      const convert = pdf2pic.fromPath(PDF_PATH, {
        density: 100,           // Output resolution DPI
        saveFilename: "eleganza-pdf",
        savePath: OUTPUT_DIR,
        format: "png",
        width: 800,            // Max width
        height: 600            // Max height
      });

      // Extract images from all pages
      console.log("Extracting images from PDF...");
      const results = await convert.bulk(-1); // -1 means all pages

      // Process results
      this.extractedImages = results.map((result, index) => {
        const filename = result.name || `eleganza-pdf.${index + 1}.png`;
        return {
          path: `/assets/pdf-images/${filename}`,
          filename: filename,
          pageNumber: index + 1
        };
      });

      console.log(`Successfully extracted ${this.extractedImages.length} images from PDF`);
      this.initialized = true;

    } catch (error) {
      console.error("Error extracting images from PDF:", error);
      this.initialized = true; // Mark as initialized even on error to prevent retries
    }
  }

  async getExtractedImages(): Promise<ExtractedImage[]> {
    await this.initialize();
    return this.extractedImages;
  }

  async getRandomPDFImage(): Promise<string | null> {
    await this.initialize();
    
    if (this.extractedImages.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * this.extractedImages.length);
    return this.extractedImages[randomIndex].path;
  }

  async getMainBuildingImage(): Promise<string | null> {
    await this.initialize();
    
    if (this.extractedImages.length === 0) {
      return null;
    }

    // Always return page 4 image (main building picture)
    // Page 4 corresponds to index 3 (0-based indexing)
    const page4Index = 3;
    if (this.extractedImages.length > page4Index) {
      return this.extractedImages[page4Index].path;
    }
    
    // Fallback to first image if page 4 doesn't exist
    return this.extractedImages[0].path;
  }

  async getPDFImageByPage(pageNumber: number): Promise<string | null> {
    await this.initialize();
    
    const image = this.extractedImages.find(img => img.pageNumber === pageNumber);
    return image ? image.path : null;
  }

  async getAllPDFImages(): Promise<string[]> {
    await this.initialize();
    return this.extractedImages.map(img => img.path);
  }
}

// Export a singleton instance
export const pdfImageExtractor = new PDFImageExtractor();