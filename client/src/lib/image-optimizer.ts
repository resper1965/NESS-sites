import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

/**
 * Otimiza uma imagem para melhor performance na web
 * Redimensiona, comprime e salva em formato WebP
 */
export async function optimizeImage(
  inputPath: string, 
  outputPath: string,
  options: {
    width?: number,
    quality?: number,
    format?: 'webp' | 'jpeg' | 'png'
  } = {}
) {
  const { 
    width = 1920, 
    quality = 80,
    format = 'webp'
  } = options;

  try {
    // Verifica se o diretório de saída existe, se não, cria
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Processa a imagem com sharp
    await sharp(inputPath)
      .resize(width)
      .toFormat(format, { quality })
      .toFile(outputPath);

    console.log(`Imagem otimizada salva em: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error('Erro ao otimizar imagem:', error);
    return inputPath; // Retorna o caminho original em caso de erro
  }
}