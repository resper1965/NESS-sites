import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');
const assetsDir = path.join(publicDir, 'assets', 'images');
const optimizedDir = path.join(publicDir, 'assets', 'images', 'optimized');

// Garantir que o diretório de saída existe
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

/**
 * Função para otimizar uma única imagem
 */
async function optimizeImage(inputPath: string, outputPath: string) {
  try {
    await sharp(inputPath)
      .resize(1920) // Largura máxima para fundo de hero
      .webp({ quality: 80 }) // Formato WebP com boa compressão
      .toFile(outputPath);
    
    console.log(`Imagem otimizada: ${outputPath}`);
    
    // Retorna estatísticas sobre os arquivos
    const originalSize = (fs.statSync(inputPath).size / 1024).toFixed(2);
    const optimizedSize = (fs.statSync(outputPath).size / 1024).toFixed(2);
    
    console.log(`Original: ${originalSize} KB, Otimizada: ${optimizedSize} KB`);
  } catch (error) {
    console.error(`Erro ao otimizar ${inputPath}:`, error);
  }
}

/**
 * Otimiza a imagem de fundo do hero da TrustNess
 */
async function optimizeTrustnessHeroBackground() {
  const inputPath = path.join(assetsDir, 'trustness-hero-bg.png');
  const outputPath = path.join(optimizedDir, 'trustness-hero-bg.webp');
  
  if (fs.existsSync(inputPath)) {
    await optimizeImage(inputPath, outputPath);
  } else {
    console.error(`Arquivo não encontrado: ${inputPath}`);
  }
}

// Executar otimização
optimizeTrustnessHeroBackground()
  .then(() => console.log('Otimização de imagens concluída'))
  .catch(error => console.error('Erro durante otimização:', error));
