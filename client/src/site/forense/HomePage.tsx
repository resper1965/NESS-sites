import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../SiteContext';
import SiteLayout from '../layout/SiteLayout';

export default function ForenseHomePage() {
  const { siteConfig } = useSite();
  const { language } = useI18n();
  
  // Buscar conteúdo da página inicial específico para o site forense
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
      <section className="pt-32 pb-20 bg-[#0d1117] text-white relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/assets/optimized/forense-hero-bg.webp" 
            alt="Digital forensic concept" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-['Montserrat'] font-normal mb-3 lowercase">
              forense<span className="text-[#00ade0]">.</span>io
            </h1>
            <h2 className="text-xl font-['Montserrat'] font-normal lowercase">
              Digital Forensic Experts
            </h2>
            <p className="text-xl text-gray-300 mt-8 mb-8">
              transformamos a evidência digital em resultados concretos, com precisão e segurança
            </p>
            <div className="flex justify-center">
              <a
                href="/site/forense/contact"
                className="bg-[#00ade0] hover:bg-opacity-90 text-white px-8 py-3 rounded lowercase transition-all duration-300"
              >
                fale conosco
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-['Montserrat'] font-normal text-gray-800 mb-4 lowercase">
              o que fazemos
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              transformamos evidências digitais em resultados concretos para nossos clientes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 - Forense Digital */}
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100">
              <h3 className="text-xl font-['Montserrat'] font-medium text-gray-800 mb-4 lowercase">
                forense<span className="text-[#00ade0]">.</span>digital
              </h3>
              <p className="text-gray-700 text-sm mb-6">
                Perícia avançada para coleta, preservação e análise detalhada de dados. Especialização em Produção e Validação de Evidências, Reexame Forense e Contraprova de Relatórios, assegurando integridade e precisão
              </p>
              <a 
                href="/site/forense/services/digital-forensics" 
                className="text-[#00ade0] hover:text-[#00ade0]/80 inline-flex items-center"
              >
                <span>saiba mais</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            
            {/* Service 2 - Suporte Legal */}
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100">
              <h3 className="text-xl font-['Montserrat'] font-medium text-gray-800 mb-4 lowercase">
                forense<span className="text-[#00ade0]">.</span>legal
              </h3>
              <p className="text-gray-700 text-sm mb-6">
                Consultoria estratégica e assistência técnica em litígios, com foco na elaboração de teses, análise crítica de evidências e preparação eficaz para audiências, garantindo uma representação robusta em questões jurídicas complexas
              </p>
              <a 
                href="/site/forense/services/legal-support" 
                className="text-[#00ade0] hover:text-[#00ade0]/80 inline-flex items-center"
              >
                <span>saiba mais</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            
            {/* Service 3 - Investigações Corporativas */}
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100">
              <h3 className="text-xl font-['Montserrat'] font-medium text-gray-800 mb-4 lowercase">
                forense<span className="text-[#00ade0]">.</span>corp
              </h3>
              <p className="text-gray-700 text-sm mb-6">
                Análise aprofundada e auditorias digitais para resolver incidentes internos, fraudes e uso indevido de recursos, fortalecendo a segurança empresarial e a conformidade regulatória
              </p>
              <a 
                href="/site/forense/services/corporate-investigations" 
                className="text-[#00ade0] hover:text-[#00ade0]/80 inline-flex items-center"
              >
                <span>saiba mais</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-[#1a1a22] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-['Montserrat'] font-normal mb-6 lowercase">
            precisa de análise forense especializada?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            nossa equipe de especialistas está pronta para transformar evidências digitais em resultados concretos para seu caso
          </p>
          <div className="flex justify-center">
            <a
              href="/site/forense/contact"
              className="bg-[#00ade0] hover:bg-opacity-90 text-white px-8 py-4 rounded text-lg lowercase transition-all duration-300"
            >
              fale conosco
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}