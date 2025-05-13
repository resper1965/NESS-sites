import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const optimizeImage = async () => {
  const inputPath = 'public/assets/forense-hero-bg.png';
  const outputDir = 'public/assets/optimized';
  const outputPath = path.join(outputDir, 'forense-hero-bg.webp');
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  try {
    await sharp(inputPath)
      .webp({ quality: 90 })
      .toFile(outputPath);
    
    console.log(`Image optimized and saved to ${outputPath}`);
  } catch (error) {
    console.error('Error optimizing image:', error);
  }
};

optimizeImage();