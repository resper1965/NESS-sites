import React, { createContext, useContext, ReactNode } from 'react';
import { SITE_CODES, type SiteCode } from '@shared/schema';

// Definição das configurações para cada site
interface SiteConfig {
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  // Add mais propriedades conforme necessário
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
    fontFamily: 'Montserrat, sans-serif'
  },
  trustness: {
    name: 'trustness.',
    logo: '/logos/trustness-logo.svg',
    primaryColor: '#005fa3',
    secondaryColor: '#2c2c34',
    fontFamily: 'Montserrat, sans-serif'
  },
  forense: {
    name: 'forense.io',
    logo: '/logos/forense-logo.svg',
    primaryColor: '#2d3e50',
    secondaryColor: '#1abc9c',
    fontFamily: 'Montserrat, sans-serif'
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