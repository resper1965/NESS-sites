/**
 * Utilitário para otimização de imagens
 * 
 * Esta função retorna o caminho otimizado de uma imagem,
 * priorizando o formato WebP quando disponível
 */
export function getOptimizedImagePath(originalPath: string): string {
  // Se já for um caminho WebP, retorna o mesmo
  if (originalPath.endsWith('.webp')) {
    return originalPath;
  }
  
  // Se for uma URL externa, retorna a mesma (não podemos otimizar)
  if (originalPath.startsWith('http')) {
    return originalPath;
  }
  
  // Para imagens locais, vamos tentar usar a versão WebP otimizada
  const pathParts = originalPath.split('.');
  const extension = pathParts[pathParts.length - 1];
  
  // Se for PNG ou JPG/JPEG, tentamos substituir pela versão WebP
  if (['png', 'jpg', 'jpeg'].includes(extension.toLowerCase())) {
    // Verifica o caminho para determinar se é uma imagem que tem versão otimizada
    if (originalPath.includes('/assets/')) {
      // Remove a extensão original
      const basePath = originalPath.substring(0, originalPath.length - extension.length - 1);
      
      // Define qual subdiretório usar para a versão otimizada
      if (originalPath.includes('/assets/images/')) {
        // Para imagens que seguem o padrão usado pelo server/optimize-images.ts
        return `${basePath.replace('/assets/images/', '/assets/images/optimized/')}.webp`;
      } else if (originalPath.includes('/assets/')) {
        // Para imagens que seguem o padrão usado pelo optimize-image.js
        return `${basePath.replace('/assets/', '/assets/optimized/')}.webp`;
      }
    }
  }
  
  // Se não conseguimos otimizar, retorna o caminho original
  return originalPath;
}

/**
 * Verifica se o navegador suporta WebP
 * Pode ser usado para mostrar fallbacks para navegadores antigos
 */
export async function supportsWebP(): Promise<boolean> {
  if (!window || !window.createImageBitmap) return false;
  
  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then(r => r.blob());
  
  return window.createImageBitmap(blob)
    .then(() => true)
    .catch(() => false);
}