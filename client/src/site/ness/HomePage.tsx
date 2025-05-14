import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../SiteContext';
import SiteLayout from '../layout/SiteLayout';

// Importando componentes da página existente
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import SpinoffsSection from '@/components/sections/SpinoffsSection';

export default function NessHomePage() {
  const { siteConfig } = useSite();
  const { language } = useI18n();
  
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
        title={pageContent?.content && JSON.parse(pageContent.content).heroTitle || "tecnologia modular para o essencial invisível"}
        subtitle={pageContent?.content && JSON.parse(pageContent.content).heroSubtitle || "arquitetura modular em infraestrutura, segurança e software para acelerar operações digitais com confiabilidade e velocidade"}
        ctaText1={
          language === 'pt' ? (pageContent?.content && JSON.parse(pageContent.content).ctaText1 || "conheça nossos serviços") :
          language === 'en' ? (pageContent?.content && JSON.parse(pageContent.content).ctaText1_en || "explore our services") :
          language === 'es' ? (pageContent?.content && JSON.parse(pageContent.content).ctaText1_es || "conozca nuestros servicios") :
          "conheça nossos serviços"
        }
        ctaUrl1={pageContent?.content && JSON.parse(pageContent.content).ctaUrl1 || "/site/ness/services"}
        ctaText2={
          language === 'pt' ? (pageContent?.content && JSON.parse(pageContent.content).ctaText2 || "fale conosco") :
          language === 'en' ? (pageContent?.content && JSON.parse(pageContent.content).ctaText2_en || "contact us") :
          language === 'es' ? (pageContent?.content && JSON.parse(pageContent.content).ctaText2_es || "contáctenos") :
          "fale conosco"
        }
        ctaUrl2={pageContent?.content && JSON.parse(pageContent.content).ctaUrl2 || "/site/ness/contact"}
        backgroundImage="/attached_assets/image_1747186663435.png"
      />
      
      {/* Sobre a Ness Section */}
      <section className="conteudo bg-white" style={{ padding: "4rem 0" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-['Montserrat'] font-normal mb-10 text-center lowercase">
              {language === 'pt' && <>sobre a <span className="text-[#00ade0]">ness</span></>}
              {language === 'en' && <>about <span className="text-[#00ade0]">ness</span></>}
              {language === 'es' && <>sobre <span className="text-[#00ade0]">ness</span></>}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {language === 'pt' && <>a <span className="text-[#00ade0]">ness</span> é uma empresa de tecnologia especializada no desenvolvimento de infraestrutura modular que opera nos bastidores. focamos em criar soluções que sejam essenciais mas invisíveis, garantindo que a tecnologia funcione de forma eficiente e confiável.</>}
                  {language === 'en' && <><span className="text-[#00ade0]">ness</span> is a technology company specializing in the development of modular infrastructure that operates behind the scenes. we focus on creating solutions that are essential but invisible, ensuring that technology works efficiently and reliably.</>}
                  {language === 'es' && <><span className="text-[#00ade0]">ness</span> es una empresa de tecnología especializada en el desarrollo de infraestructura modular que opera entre bastidores. nos centramos en crear soluciones que sean esenciales pero invisibles, garantizando que la tecnología funcione de manera eficiente y confiable.</>}
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {language === 'pt' && <>nossa abordagem modular permite a criação de sistemas escaláveis e adaptáveis, personalizados para as necessidades específicas de cada cliente. trabalhamos nos setores de infraestrutura, segurança e desenvolvimento de software, sempre com o compromisso de acelerar as operações digitais com máxima qualidade.</>}
                  {language === 'en' && <>our modular approach allows for the creation of scalable and adaptable systems, customized to the specific needs of each client. we work in the infrastructure, security, and software development sectors, always with the commitment to accelerate digital operations with maximum quality.</>}
                  {language === 'es' && <>nuestro enfoque modular permite la creación de sistemas escalables y adaptables, personalizados para las necesidades específicas de cada cliente. trabajamos en los sectores de infraestructura, seguridad y desarrollo de software, siempre con el compromiso de acelerar las operaciones digitales con máxima calidad.</>}
                </p>
              </div>
              
              <div className="flex justify-center">
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 max-w-md">
                  <h3 className="text-xl font-['Montserrat'] font-medium mb-4 text-gray-800 lowercase">
                    {language === 'pt' && <>nossos <span className="text-[#00ade0]">valores</span></>}
                    {language === 'en' && <>our <span className="text-[#00ade0]">values</span></>}
                    {language === 'es' && <>nuestros <span className="text-[#00ade0]">valores</span></>}
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[#00ade0] mr-2">•</span>
                      <span className="text-gray-700">
                        {language === 'pt' && <>confiabilidade – sistemas estáveis que funcionam sem interrupções</>}
                        {language === 'en' && <>reliability – stable systems that work without interruptions</>}
                        {language === 'es' && <>confiabilidad – sistemas estables que funcionan sin interrupciones</>}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#00ade0] mr-2">•</span>
                      <span className="text-gray-700">
                        {language === 'pt' && <>modularidade – soluções flexíveis e adaptáveis</>}
                        {language === 'en' && <>modularity – flexible and adaptable solutions</>}
                        {language === 'es' && <>modularidad – soluciones flexibles y adaptables</>}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#00ade0] mr-2">•</span>
                      <span className="text-gray-700">
                        {language === 'pt' && <>inovação – contínua evolução tecnológica</>}
                        {language === 'en' && <>innovation – continuous technological evolution</>}
                        {language === 'es' && <>innovación – evolución tecnológica continua</>}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#00ade0] mr-2">•</span>
                      <span className="text-gray-700">
                        {language === 'pt' && <>eficiência – soluções otimizadas para máximo desempenho</>}
                        {language === 'en' && <>efficiency – optimized solutions for maximum performance</>}
                        {language === 'es' && <>eficiencia – soluciones optimizadas para máximo rendimiento</>}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* Spinoffs Section */}
      <SpinoffsSection />
      
      {/* Additional sections specific to NESS */}
      <section className="conteudo bg-white" style={{ padding: "4rem 0" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-['Montserrat'] font-normal text-gray-800 mb-4 lowercase">
              {pageContent?.content && JSON.parse(pageContent.content).featuredSectionTitle || 'tecnologia modular para o essencial invisível'}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {pageContent?.content && JSON.parse(pageContent.content).featuredSectionDescription || 
                'nossas soluções são modulares, escaláveis e atuam nos bastidores — porque o essencial, a estrutura que sustenta tudo, deve funcionar com precisão e ser invisível para quem depende dela.'}
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