import { Language } from '@/lib/i18n';

const localizedHomeContent: Record<Language, { featuredSectionTitle: string; featuredSectionDescription: string }> = {
  pt: {
    featuredSectionTitle: 'tecnologia modular para o essencial invisível',
    featuredSectionDescription:
      'nossas soluções são modulares, escaláveis e atuam nos bastidores — porque o essencial, a estrutura que sustenta tudo, deve funcionar com precisão e ser invisível para quem depende dela.'
  },
  en: {
    featuredSectionTitle: 'modular technology for the invisible essential',
    featuredSectionDescription:
      'our solutions are modular, scalable and work behind the scenes — because the essential structure that supports everything must operate precisely and remain invisible to those who rely on it.'
  },
  es: {
    featuredSectionTitle: 'tecnología modular para lo esencial invisible',
    featuredSectionDescription:
      'nuestras soluciones son modulares, escalables y actúan tras bambalinas — porque lo esencial, la estructura que lo sostiene todo, debe funcionar con precisión y ser invisible para quien depende de ella.'
  }
};

export default localizedHomeContent;
