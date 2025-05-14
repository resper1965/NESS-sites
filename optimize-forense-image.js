import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const optimizeForenseImage = async () => {
  // Caminho da imagem original
  const inputPath = './public/assets/images/forense-hero-bg.png';
  
  // Diretório de saída correto
  const outputDir = './public/assets/images/optimized';
  const outputPath = path.join(outputDir, 'forense-hero-bg.webp');
  
  // Assegurar que o diretório de saída existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  try {
    // Processar e otimizar a imagem
    await sharp(inputPath)
      .resize(1920) // Largura máxima para um hero
      .webp({ quality: 80 }) // Formato WebP com boa compressão
      .toFile(outputPath);
    
    console.log(`Imagem otimizada e salva em ${outputPath}`);
    
    // Estatísticas de tamanho
    const originalSize = (fs.statSync(inputPath).size / 1024).toFixed(2);
    const optimizedSize = (fs.statSync(outputPath).size / 1024).toFixed(2);
    
    console.log(`Tamanho original: ${originalSize} KB`);
    console.log(`Tamanho otimizado: ${optimizedSize} KB`);
    console.log(`Redução: ${((1 - (parseFloat(optimizedSize) / parseFloat(originalSize))) * 100).toFixed(2)}%`);
  } catch (error) {
    console.error('Erro ao otimizar a imagem:', error);
  }
};

optimizeForenseImage();