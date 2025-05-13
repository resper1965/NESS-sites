import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../SiteContext';
import SiteLayout from '../layout/SiteLayout';

export default function TrustnessHomePage() {
  const { siteConfig } = useSite();
  const { language } = useI18n();
  
  // Buscar conteúdo da página inicial específico para o site trustness
  const { data: pageContent, isLoading } = useQuery({
    queryKey: ['/api/content/home', language, siteConfig.code],
    queryFn: async () => {
      const res = await fetch(`/api/content/home?lang=${language}&site=${siteConfig.code}`);
      if (!res.ok) throw new Error('Failed to fetch content');
      return res.json();
    }
  });
  
  // Definir o título da página com base no conteúdo
  const pageTitle = pageContent?.metaTitle || siteConfig.metadata?.defaultTitle;
  const pageDescription = pageContent?.metaDescription || siteConfig.metadata?.defaultDescription;
  
  if (isLoading) {
    return (
      <SiteLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[var(--primary-color)]"></div>
        </div>
      </SiteLayout>
    );
  }
  
  return (
    <SiteLayout
      title={pageTitle}
      description={pageDescription}
      ogImage={pageContent?.ogImage}
      canonicalUrl={`https://${siteConfig.domain}`}
    >
      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 text-white bg-[#0b1016] relative"
        style={{
          backgroundImage: 'url(/assets/images/optimized/trustness-hero-bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay para garantir contraste com o texto */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-['Montserrat'] font-normal mb-6 lowercase">
              trustness<span className="text-[#005fa3]">.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {pageContent?.content?.heroSubtitle || 
                'privacidade, segurança da informação e compliance com foco em programas regulatórios e frameworks internacionais'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#services"
                className="bg-[var(--primary-color)] hover:bg-opacity-90 text-white px-6 py-3 rounded lowercase"
              >
                nossos serviços
              </a>
              <a
                href="/contact"
                className="border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:bg-opacity-10 px-6 py-3 rounded lowercase"
              >
                fale conosco
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-20 bg-[#f9f9f9]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-['Montserrat'] font-normal text-gray-800 mb-8 lowercase">
              {pageContent?.content?.servicesSectionTitle || 'serviços'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Serviço 1 - Assessment */}
            <div className="bg-white rounded p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <h3 className="mb-4">
                <span className="font-['Montserrat'] font-medium text-lg text-gray-800">
                  <span className="text-[#005fa3]">.</span>assessment
                </span>
              </h3>
              <p className="text-gray-600 text-sm mb-6 lowercase">
                avaliações de segurança com base nos frameworks NIST e CIS Controls.
              </p>
              <div className="text-center">
                <a 
                  href="/site/trustness/services/assessment" 
                  className="text-gray-600 hover:text-[#005fa3] border border-gray-300 hover:border-[#005fa3] py-2 px-4 text-sm font-normal transition-colors duration-300 inline-block lowercase rounded-sm"
                >
                  saiba mais
                </a>
              </div>
            </div>
            
            {/* Serviço 2 - Conformity */}
            <div className="bg-white rounded p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <h3 className="mb-4">
                <span className="font-['Montserrat'] font-medium text-lg text-gray-800">
                  <span className="text-[#005fa3]">.</span>conformity
                </span>
              </h3>
              <p className="text-gray-600 text-sm mb-6 lowercase">
                execução de auditorias e adequação a normas como ISO 27001, SOC 2, PCI DSS, HIPAA, LGPD/GDPR e HITRUST.
              </p>
              <div className="text-center">
                <a 
                  href="/site/trustness/services/conformity" 
                  className="text-gray-600 hover:text-[#005fa3] border border-gray-300 hover:border-[#005fa3] py-2 px-4 text-sm font-normal transition-colors duration-300 inline-block lowercase rounded-sm"
                >
                  saiba mais
                </a>
              </div>
            </div>
            
            {/* Serviço 3 - Privacy */}
            <div className="bg-white rounded p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <h3 className="mb-4">
                <span className="font-['Montserrat'] font-medium text-lg text-gray-800">
                  <span className="text-[#005fa3]">.</span>privacy
                </span>
              </h3>
              <p className="text-gray-600 text-sm mb-6 lowercase">
                implementação de controles de privacidade alinhados a padrões regulatórios nacionais e internacionais.
              </p>
              <div className="text-center">
                <a 
                  href="/site/trustness/services/privacy" 
                  className="text-gray-600 hover:text-[#005fa3] border border-gray-300 hover:border-[#005fa3] py-2 px-4 text-sm font-normal transition-colors duration-300 inline-block lowercase rounded-sm"
                >
                  saiba mais
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Clients Section, if available */}
      {pageContent?.content?.clients && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-['Montserrat'] font-normal text-gray-800 mb-4 lowercase">
                {pageContent?.content?.clientsSectionTitle || 'clientes'}
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {pageContent?.content?.clientsSectionDescription || 
                  'empresas e organizações que confiam em nossa expertise.'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center opacity-70">
              {pageContent.content.clients.map((client: any, index: number) => (
                <div key={index} className="p-4">
                  {client.logo && (
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="max-h-12 mx-auto grayscale hover:grayscale-0 transition-all" 
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}