import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SiteCode, SITE_CODES } from '@shared/schema';

// Tipo para metadados do site
interface SiteMetadata {
  defaultTitle: string;
  defaultDescription: string;
  ogImage?: string;
  favicon?: string;
}

// Tipo para mídias sociais
interface SocialMedia {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
}

// Tipo para configuração do site
interface SiteConfig {
  code: SiteCode;
  name: string;
  domain: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  metadata?: SiteMetadata;
  socialMedia?: SocialMedia;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
}

// Tipo para o contexto do site
interface SiteContextType {
  siteConfig: SiteConfig;
  isLoading: boolean;
  error: Error | null;
}

// Contexto do site
const SiteContext = createContext<SiteContextType>({
  siteConfig: {
    code: 'ness', // Valor padrão
    name: 'ness.',
    domain: 'ness.com.br',
    primaryColor: '#00ade0',
    secondaryColor: '#2f3e4d',
  },
  isLoading: false,
  error: null,
});

// Função para verificar se o código do site é válido
function isValidSiteCode(code: string): code is SiteCode {
  return (SITE_CODES as readonly string[]).includes(code);
}

// Provider do contexto do site
interface SiteProviderProps {
  children: ReactNode;
  siteCode: SiteCode;
}

export function SiteProvider({ children, siteCode }: SiteProviderProps) {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    code: siteCode,
    name: siteCode === 'ness' ? 'ness.' : siteCode === 'trustness' ? 'trustness.' : 'forense.io',
    domain: `${siteCode}.com.br`,
    primaryColor: '#00ade0',
    secondaryColor: '#2f3e4d',
  });

  // Buscar configurações do site da API
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/sites', siteCode],
    queryFn: async () => {
      const res = await fetch(`/api/sites/${siteCode}`);
      if (!res.ok) throw new Error('Failed to fetch site config');
      return res.json();
    },
    // Desabilitar temporariamente enquanto a API não estiver pronta
    enabled: false,
  });

  // Atualizar configuração quando os dados estiverem disponíveis
  useEffect(() => {
    if (data) {
      setSiteConfig(prevConfig => ({
        ...prevConfig,
        ...data,
      }));
    }
  }, [data]);

  // Configurações padrão específicas por site
  useEffect(() => {
    switch (siteCode) {
      case 'ness':
        setSiteConfig(prevConfig => ({
          ...prevConfig,
          name: 'ness.',
          domain: 'ness.com.br',
          primaryColor: '#00ade0',
          secondaryColor: '#2f3e4d',
          metadata: {
            defaultTitle: 'ness. | tecnologia modular para o essencial invisível',
            defaultDescription: 'arquitetura modular de infraestrutura, segurança e desenvolvimento em modelos SaaS e projetos personalizados.',
          },
          contactEmail: 'contato@ness.com.br',
          socialMedia: {
            linkedin: 'https://linkedin.com/company/ness-br',
          }
        }));
        break;
      case 'trustness':
        setSiteConfig(prevConfig => ({
          ...prevConfig,
          name: 'trustness.',
          domain: 'trustness.com.br',
          primaryColor: '#0066cc',
          secondaryColor: '#2c2c34',
          metadata: {
            defaultTitle: 'trustness. | consultoria estratégica em privacidade e segurança',
            defaultDescription: 'consultoria especializada em privacidade, segurança da informação e compliance para programas regulatórios e frameworks internacionais.',
          },
          contactEmail: 'contato@trustness.com.br',
          socialMedia: {
            linkedin: 'https://linkedin.com/company/trustness',
          }
        }));
        break;
      case 'forense':
        setSiteConfig(prevConfig => ({
          ...prevConfig,
          name: 'forense.io',
          domain: 'forense.io',
          primaryColor: '#3366ff',
          secondaryColor: '#1a1a2e',
          metadata: {
            defaultTitle: 'forense.io | resposta a incidentes e perícia digital',
            defaultDescription: 'resposta a incidentes, perícia digital e investigação forense para identificar e remediar violações de segurança.',
          },
          contactEmail: 'contato@forense.io',
          socialMedia: {
            linkedin: 'https://linkedin.com/company/forense-io',
          }
        }));
        break;
    }
  }, [siteCode]);

  return (
    <SiteContext.Provider value={{ siteConfig, isLoading, error }}>
      {children}
    </SiteContext.Provider>
  );
}

// Hook para usar o contexto do site
export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};

export type { SiteCode, SiteConfig };