import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../SiteContext';
import SiteLayout from '../layout/SiteLayout';
import homeTranslations from './translations/home';

// Importando componentes da página existente
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import SpinoffsSection from '@/components/sections/SpinoffsSection';

export default function NessHomePage() {
  const { siteConfig } = useSite();
  const { language } = useI18n();

  const featuredTitleFallback = {
    pt: homeTranslations.pt.featuredSectionTitle,
    en: homeTranslations.en.featuredSectionTitle,
    es: homeTranslations.es.featuredSectionTitle
  };

  const featuredDescFallback = {
    pt: homeTranslations.pt.featuredSectionDescription,
    en: homeTranslations.en.featuredSectionDescription,
    es: homeTranslations.es.featuredSectionDescription
  };
  
  // Buscar conteúdo da página inicial específico para o site ness
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
      <HeroSection 
        title={
          language === 'pt' ? (
            pageContent?.content && JSON.parse(pageContent.content).heroTitle ||
            <>força invisível<br />resultados visíveis</>
          ) :
          language === 'en' ? (
            pageContent?.content && JSON.parse(pageContent.content).heroTitle_en ||
            <>invisible strength<br />visible results</>
          ) :
          language === 'es' ? (
            pageContent?.content && JSON.parse(pageContent.content).heroTitle_es ||
            <>fuerza invisible<br />resultados visibles</>
          ) :
          <>força invisível<br />resultados visíveis</>
        }
        subtitle={
          pageContent?.content && JSON.parse(pageContent.content).heroSubtitle ||
          (language === 'en'
            ? 'Experts in technological innovation, process automation, IT infrastructure, cybersecurity, and software architecture.'
            : language === 'es'
              ? 'Expertos en innovación tecnológica, automatización de procesos, infraestructura de TI, ciberseguridad y arquitectura de software.'
              : 'Especialistas em inovação tecnológica, automação de processos, infraestrutura de TI, cibersegurança e arquitetura de software.')
        }
        backgroundImage="/attached_assets/image_1747186663435.png"
      />
      {/* Services Section */}
      <ServicesSection />
      {/* Spinoffs Section */}
      <SpinoffsSection />
      {/* Additional sections specific to NESS */}
      <section className="conteudo bg-white" style={{ padding: "4rem 0" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-gray-800 mb-4 lowercase text-[40px]">
              {pageContent?.content && JSON.parse(pageContent.content).featuredSectionTitle || featuredTitleFallback[language]}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {pageContent?.content && JSON.parse(pageContent.content).featuredSectionDescription ||
                featuredDescFallback[language]}
            </p>
          </div>
          
          {/* Timeline / História da empresa, se disponível no conteúdo */}
          {pageContent?.content && JSON.parse(pageContent.content).timeline && (
            <div className="mt-16">
              <ul className="relative border-l border-gray-200 ml-3">
                {JSON.parse(pageContent.content).timeline.map((item: any, index: number) => (
                  <li key={index} className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-[var(--primary-color)] rounded-full -left-3 ring-8 ring-white">
                      <span className="text-white text-xs">{item.year}</span>
                    </span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 lowercase">
                      {item.title}
                    </h3>
                    <p className="mb-4 text-base font-normal text-gray-500 lowercase">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
