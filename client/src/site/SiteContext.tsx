import React, { createContext, useContext, ReactNode } from 'react';

// Define os tipos possíveis de sites
export type SiteCode = 'ness' | 'trustness' | 'forense';

// Tipo para as configurações de site
export interface SiteConfig {
  code: SiteCode;
  name: string;
  domain: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  contactEmail?: string;
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
}

// Default configs para cada site
const siteDefaults: Record<SiteCode, SiteConfig> = {
  ness: {
    code: 'ness',
    name: 'ness.',
    domain: 'ness.com.br',
    primaryColor: '#00ade0',
    metadata: {
      defaultTitle: 'ness. | tecnologia modular para o essencial invisível',
      defaultDescription: 'Soluções modulares de tecnologia para infraestrutura, segurança e privacidade.',
    }
  },
  trustness: {
    code: 'trustness',
    name: 'trustness.',
    domain: 'trustness.com.br',
    primaryColor: '#00ade0',
    metadata: {
      defaultTitle: 'trustness. | consultoria estratégica em privacidade e segurança',
      defaultDescription: 'Consultoria estratégica em privacidade, segurança da informação e compliance.'
    }
  },
  forense: {
    code: 'forense',
    name: 'forense.io',
    domain: 'forense.io',
    primaryColor: '#00ade0',
    metadata: {
      defaultTitle: 'forense.io | resposta a incidentes e perícia digital',
      defaultDescription: 'Unidade especializada em resposta a incidentes, perícia digital e investigação forense.'
    }
  }
};

// Contexto do site
interface SiteContextType {
  siteCode: SiteCode;
  siteConfig: SiteConfig;
}

const SiteContext = createContext<SiteContextType | null>(null);

// Hook para acessar o contexto do site
export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite deve ser usado dentro de um SiteProvider');
  }
  return context;
}

// Provider do site
interface SiteProviderProps {
  children: ReactNode;
  siteCode: SiteCode;
  config?: Partial<SiteConfig>;
}

export function SiteProvider({ children, siteCode, config = {} }: SiteProviderProps) {
  // Mesclar as configurações padrão com as específicas
  const siteConfig: SiteConfig = {
    ...siteDefaults[siteCode],
    ...config
  };
  
  return (
    <SiteContext.Provider value={{ siteCode, siteConfig }}>
      {children}
    </SiteContext.Provider>
  );
}