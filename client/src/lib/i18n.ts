import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

/**
 * Define idiomas suportados pela plataforma
 * pt: Português
 * en: Inglês
 * es: Espanhol
 */
export type Language = 'pt' | 'en' | 'es';

/**
 * Define estrutura de traduções
 * TranslationRecord: Mapeamento de chaves para strings traduzidas
 * TranslationsMap: Mapeamento de idiomas para seus respectivos registros de tradução
 */
type TranslationRecord = Record<string, string>;
type TranslationsMap = Record<Language, TranslationRecord>;

/**
 * Contexto de internacionalização
 * Fornece funcionalidades para tradução e gerenciamento de idiomas
 */
interface I18nContextType {
  /** Idioma atual selecionado */
  language: Language;
  /** Função para mudar o idioma atual */
  setLanguage: (lang: Language) => void;
  /** Função para traduzir uma chave para o idioma atual */
  t: (key: string) => string;
  /** Indica se traduções estão carregando */
  isLoading: boolean;
}

const DEFAULT_LANGUAGE: Language = 'en';

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
    'home.hero.title': 'tecnologia modular para o essencial invisível',
    'home.hero.subtitle': 'há 33 anos desenhando, conectando e sustentando operações críticas com segurança, agilidade e propósito.',
    'home.hero.cta1': 'conheça nossos serviços',
    'home.hero.cta2': 'fale com a gente',
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
    'home.hero.title': 'modular technology for the invisible essential',
    'home.hero.subtitle': '33 years designing, connecting and sustaining critical operations with security, agility and purpose.',
    'home.hero.cta1': 'discover our services',
    'home.hero.cta2': 'contact us',
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
    'home.hero.title': 'tecnología modular para lo esencial invisible',
    'home.hero.subtitle': '33 años diseñando, conectando y sosteniendo operaciones críticas con seguridad, agilidad y propósito.',
    'home.hero.cta1': 'conozca nuestros servicios',
    'home.hero.cta2': 'hable con nosotros',
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
  try {
    const browserLang = navigator.language.split('-')[0];
    
    if (browserLang === 'pt' || browserLang === 'en' || browserLang === 'es') {
      return browserLang as Language;
    }
  } catch (error) {
    console.error('Error detecting browser language:', error);
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
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang') as Language | null;
      const savedLanguage = localStorage.getItem('language') as Language;
      const detectedLanguage = detectBrowserLanguage();
      
      const finalLanguage = langParam || savedLanguage || detectedLanguage;
      setLanguageState(finalLanguage);
      localStorage.setItem('language', finalLanguage);
    } catch (error) {
      console.error('Error setting language:', error);
      setLanguageState(DEFAULT_LANGUAGE);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Adiciona um evento de popstate para atualizar o idioma quando o usuário navega pelo histórico
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang') as Language | null;
      if (langParam && langParam !== language) {
        setLanguageState(langParam);
        localStorage.setItem('language', langParam);
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [language]);

  // Set language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Atualiza a URL com o novo idioma, mas sem recarregar a página
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.pushState({}, '', url.toString());
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
