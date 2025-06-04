/**
 * Estilos normalizados para as páginas da forense.io
 * Usado para manter consistência visual em todas as páginas de serviços.
 */

export const forenseStyles = {
  // Tamanhos de fontes 
  fontSizes: {
    hero: {
      title: "text-3xl md:text-4xl", // Título principal da página
      subtitle: "text-xl" // Subtítulo da página
    },
    section: {
      title: "text-2xl", // Títulos de seção
      subtitle: "text-xl", // Subtítulos de seção
      cardTitle: "text-lg", // Títulos de cards
      cardSubtitle: "text-sm" // Subtítulos em cards
    },
    text: {
      regular: "text-base", // Texto normal
      small: "text-sm", // Texto pequeno
      xs: "text-xs" // Texto muito pequeno (tags, metadados)
    }
  },
  
  // Espaçamentos verticais
  spacing: {
    section: "py-20", // Espaço padrão entre seções
    container: "px-4", // Padding horizontal para containers
    card: "p-8", // Padding interno para cards
    mb: {
      small: "mb-2",
      medium: "mb-4",
      large: "mb-6",
      xl: "mb-8",
      xxl: "mb-12"
    }
  },
  
  // Cores
  colors: {
    primary: "text-[#00ade0]", // Azul primário (forense.io)
    accent: "border-[#00ade0]", // Cor de destaque
    darkBg: "bg-[#0d1117]", // Background escuro
    lightBg: "bg-gray-50", // Background claro
    whiteBg: "bg-white", // Background branco
    text: {
      dark: "text-gray-800", // Texto escuro
      medium: "text-gray-600", // Texto médio
      light: "text-gray-400", // Texto claro
      white: "text-white" // Texto branco
    }
  },
  
  // Estilos de borda
  borders: {
    light: "border border-gray-100", // Borda clara
    medium: "border border-gray-200", // Borda média
    card: "rounded-lg border border-gray-100" // Borda padrão para cards
  }
};
