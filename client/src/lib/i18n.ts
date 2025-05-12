import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define supported languages
export type Language = 'pt' | 'en' | 'es';

// Define translation record structure
type TranslationRecord = Record<string, string>;
type TranslationsMap = Record<Language, TranslationRecord>;

// Translation context
interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

const DEFAULT_LANGUAGE: Language = 'pt';

// Initial basic translations
const translations: TranslationsMap = {
  pt: {
    'nav.home': 'Início',
    'nav.about': 'Quem Somos',
    'nav.services': 'O Que Fazemos',
    'nav.jobs': 'Vagas',
    'nav.news': 'Notícias',
    'nav.contact': 'Contato',
    'nav.login': 'Entrar',
    'lang.pt': 'Português',
    'lang.en': 'English',
    'lang.es': 'Español',
    'home.hero.title': 'Transformamos Operações Críticas em Vantagem Estratégica',
    'home.hero.subtitle': 'Tecnologia e expertise para impulsionar seu negócio com segurança, eficiência e resultados sustentáveis.',
    'home.hero.cta1': 'Conheça nossas soluções',
    'home.hero.cta2': 'Entre em contato',
    'about.title': 'Quem Somos',
    'services.title': 'O Que Fazemos',
    'jobs.title': 'Vagas Abertas',
    'news.title': 'Últimas Notícias',
    'contact.title': 'Entre em Contato',
    'footer.rights': 'Todos os direitos reservados',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'What We Do',
    'nav.jobs': 'Jobs',
    'nav.news': 'News',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'lang.pt': 'Português',
    'lang.en': 'English',
    'lang.es': 'Español',
    'home.hero.title': 'Transforming Critical Operations into Strategic Advantage',
    'home.hero.subtitle': 'Technology and expertise to boost your business with security, efficiency, and sustainable results.',
    'home.hero.cta1': 'Discover our solutions',
    'home.hero.cta2': 'Contact us',
    'about.title': 'About Us',
    'services.title': 'What We Do',
    'jobs.title': 'Open Positions',
    'news.title': 'Latest News',
    'contact.title': 'Contact Us',
    'footer.rights': 'All rights reserved',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Quiénes Somos',
    'nav.services': 'Qué Hacemos',
    'nav.jobs': 'Empleos',
    'nav.news': 'Noticias',
    'nav.contact': 'Contacto',
    'nav.login': 'Ingresar',
    'lang.pt': 'Português',
    'lang.en': 'English',
    'lang.es': 'Español',
    'home.hero.title': 'Transformamos Operaciones Críticas en Ventaja Estratégica',
    'home.hero.subtitle': 'Tecnología y experiencia para impulsar su negocio con seguridad, eficiencia y resultados sostenibles.',
    'home.hero.cta1': 'Conozca nuestras soluciones',
    'home.hero.cta2': 'Contáctenos',
    'about.title': 'Quiénes Somos',
    'services.title': 'Qué Hacemos',
    'jobs.title': 'Posiciones Abiertas',
    'news.title': 'Últimas Noticias',
    'contact.title': 'Contáctenos',
    'footer.rights': 'Todos los derechos reservados',
  }
};

// Helper to detect browser language
export function detectBrowserLanguage(): Language {
  const browserLang = navigator.language.split('-')[0];
  
  if (browserLang === 'pt' || browserLang === 'en' || browserLang === 'es') {
    return browserLang as Language;
  }
  
  return DEFAULT_LANGUAGE;
}

// Create context
export const I18nContext = createContext<I18nContextType>({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  t: () => '',
  isLoading: false
});

// Provider component
export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize language from browser or localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    const detectedLanguage = detectBrowserLanguage();
    
    setLanguageState(savedLanguage || detectedLanguage);
    setIsLoading(false);
  }, []);

  // Set language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Translation function
  const t = (key: string): string => {
    if (!translations[language]) return key;
    return translations[language][key] || key;
  };

  const contextValue = {
    language,
    setLanguage,
    t,
    isLoading
  };

  return createElement(I18nContext.Provider, { value: contextValue }, children);
}

// Helper function to create React elements without JSX
function createElement(type: any, props: any, ...children: any[]) {
  return {
    $$typeof: Symbol.for('react.element'),
    type,
    props: { ...props, children: children.length === 1 ? children[0] : children },
    key: null,
    ref: null,
  };
}

// Custom hook to use translations
export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// OpenAI translation API integration
export async function translateWithOpenAI(text: string, targetLanguage: Language): Promise<string> {
  try {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }
    
    console.log(`Would translate "${text}" to ${targetLanguage}`);
    
    // Implementation would call OpenAI API
    // For now, just return the original text
    return text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}
