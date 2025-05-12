import React, { createContext, useContext, ReactNode } from 'react';
import { SITE_CODES, type SiteCode } from '@shared/schema';

// Definição das configurações para cada site
interface SiteConfig {
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  code: SiteCode;
  domain: string;
  socialMedia?: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
  metadata?: {
    defaultTitle?: string;
    defaultDescription?: string;
    ogImage?: string;
    favicon?: string;
  };
  contactEmail?: string;
}

interface SiteContextType {
  siteCode: SiteCode;
  siteConfig: SiteConfig;
}

// Contexto para gerenciar o site atual
const SiteContext = createContext<SiteContextType | null>(null);

// Hook para acessar o contexto do site
export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
}

// Configurações específicas para cada site
const siteConfigs: Record<SiteCode, SiteConfig> = {
  ness: {
    name: 'ness.',
    logo: '/logos/ness-logo.svg',
    primaryColor: '#00ade0',
    secondaryColor: '#2f3e4d',
    fontFamily: 'Montserrat, sans-serif',
    code: 'ness',
    domain: 'ness.com.br',
    socialMedia: {
      linkedin: 'https://www.linkedin.com/company/ness-tech',
      instagram: 'https://www.instagram.com/ness.tech',
      facebook: 'https://www.facebook.com/ness.tech',
      twitter: 'https://twitter.com/ness_tech',
      youtube: 'https://www.youtube.com/channel/ness'
    },
    metadata: {
      defaultTitle: 'ness. | Soluções de Segurança Digital',
      defaultDescription: 'Soluções de segurança digital para empresas de todos os tamanhos. Protegendo seus dados com tecnologia avançada.',
      ogImage: '/images/ness-og.png',
      favicon: '/favicon-ness.ico'
    },
    contactEmail: 'contato@ness.com.br'
  },
  trustness: {
    name: 'trustness.',
    logo: '/logos/trustness-logo.svg',
    primaryColor: '#005fa3',
    secondaryColor: '#2c2c34',
    fontFamily: 'Montserrat, sans-serif',
    code: 'trustness',
    domain: 'trustness.com.br',
    socialMedia: {
      linkedin: 'https://www.linkedin.com/company/trustness',
      instagram: 'https://www.instagram.com/trustness',
      facebook: 'https://www.facebook.com/trustness',
      twitter: 'https://twitter.com/trustness'
    },
    metadata: {
      defaultTitle: 'trustness. | Consultoria Estratégica em Segurança',
      defaultDescription: 'Consultoria estratégica em segurança da informação para organizações que buscam proteger seus ativos digitais.',
      ogImage: '/images/trustness-og.png',
      favicon: '/favicon-trustness.ico'
    },
    contactEmail: 'contato@trustness.com.br'
  },
  forense: {
    name: 'forense.io',
    logo: '/logos/forense-logo.svg',
    primaryColor: '#2d3e50',
    secondaryColor: '#1abc9c',
    fontFamily: 'Montserrat, sans-serif',
    code: 'forense',
    domain: 'forense.io',
    socialMedia: {
      linkedin: 'https://www.linkedin.com/company/forense-io',
      instagram: 'https://www.instagram.com/forense.io',
      facebook: 'https://www.facebook.com/forense.io'
    },
    metadata: {
      defaultTitle: 'forense.io | Resposta a Incidentes e Análise Forense',
      defaultDescription: 'Serviços especializados em resposta a incidentes e análise forense para identificar e mitigar ameaças digitais.',
      ogImage: '/images/forense-og.png',
      favicon: '/favicon-forense.ico'
    },
    contactEmail: 'contato@forense.io'
  }
};

// Provider para o contexto do site
interface SiteProviderProps {
  children: ReactNode;
  siteCode: SiteCode;
}

export function SiteProvider({ children, siteCode }: SiteProviderProps) {
  const siteConfig = siteConfigs[siteCode];
  
  return (
    <SiteContext.Provider value={{ siteCode, siteConfig }}>
      {children}
    </SiteContext.Provider>
  );
}