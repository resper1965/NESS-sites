import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../../SiteContext';
import SiteLayout from '../../layout/SiteLayout';
import defaultContent from '../translations/services/autoops';
import { Link } from 'wouter';

export default function NessAutoOpsPage() {
  const { siteConfig } = useSite();
  const { language, t } = useI18n();
  
  // Buscar conteúdo da página específico para o serviço
  const { data: pageContent, isLoading, error } = useQuery({
    queryKey: ['/api/content/services/autoops', language, siteConfig.code],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/content/services/autoops?lang=${language}&site=${siteConfig.code}`);
        if (!res.ok) throw new Error('Failed to fetch content');
        return res.json();
      } catch (error) {
        console.error("Error fetching content:", error);
        return null;
      }
    }
  });
  
  // Conteúdo padrão caso não haja conteúdo específico no banco de dados
  
  // Conteúdo a ser exibido (do banco de dados ou padrão)
  const content = pageContent?.content ? JSON.parse(pageContent.content) : defaultContent[language];
  
  // Definir o título da página com base no conteúdo
  const pageTitle = pageContent?.metaTitle || `${content.title} - ${siteConfig.metadata?.defaultTitle}`;
  const pageDescription = pageContent?.metaDescription || content.description;
  
  if (isLoading) {
    return (
      <SiteLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#00ade0]"></div>
        </div>
      </SiteLayout>
    );
  }
  
  // Formatação do nome do serviço com estilo e ponto azul
  const formatServiceName = (name: string) => {
    if (name.startsWith('n.')) {
      return (
        <span className="font-['Montserrat'] font-normal">
          n<span className="text-[#00ade0]">.</span>{name.substring(2)}
        </span>
      );
    }
    return <span className="font-['Montserrat'] font-normal">{name}</span>;
  };
  
  return (
    <SiteLayout
      title={pageTitle}
      description={pageDescription}
      ogImage={pageContent?.ogImage}
      canonicalUrl={`https://${siteConfig.domain}/services/autoops`}
    >
      {/* Hero Section */}
      <section className="intro bg-hero-gradient relative flex items-center overflow-hidden" style={{ minHeight: '60vh' }}>
        <div className="hero-vignette-right" />
        <div className="container mx-auto px-4 z-10 flex items-center h-full">
          <div className="hero-main-content">
            <h1 className="text-[48px] font-['Montserrat'] font-normal text-white mb-6">
              {formatServiceName(content.title)}
            </h1>
            <p className="text-base leading-6 text-[#F5F5F5] mb-8">
              {content.description}
            </p>
          </div>
        </div>
      </section>
      
      {/* Intro Section */}
      <section className="conteudo bg-white" style={{ padding: "4rem 0" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              {content.intro}
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Features */}
      <section className="conteudo bg-gray-50" style={{ padding: "4rem 0" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-['Montserrat'] font-normal mb-12 text-center lowercase">
              {language === 'pt' && 'componentes essenciais'}
              {language === 'en' && 'essential components'}
              {language === 'es' && 'componentes esenciales'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {content.sections.map((section: any, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-['Montserrat'] font-medium mb-4 text-gray-800 lowercase">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Tecnologias */}
      <section className="conteudo bg-white" style={{ padding: "4rem 0" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-['Montserrat'] font-normal mb-12 text-center lowercase">
              {language === 'pt' && 'tecnologias avançadas'}
              {language === 'en' && 'advanced technologies'}
              {language === 'es' && 'tecnologías avanzadas'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.features.map((feature: any, index: number) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-['Montserrat'] font-medium mb-4 text-gray-800 lowercase">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefícios */}
      <section className="conteudo bg-gray-50" style={{ padding: "4rem 0" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-['Montserrat'] font-normal mb-10 text-center lowercase">
              {language === 'pt' && 'benefícios'}
              {language === 'en' && 'benefits'}
              {language === 'es' && 'beneficios'}
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4">
              {content.benefits.map((benefit: string, index: number) => (
                <div key={index} className="bg-white px-5 py-3 rounded-full shadow-sm">
                  <span className="text-gray-700 text-sm lowercase">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="conteudo bg-[#121212] text-white" style={{ padding: "4rem 0", minHeight: "400px" }}>
        <div className="container mx-auto px-4 flex items-center justify-center h-full">
          <div className="text-center max-w-3xl">
            <h2 className="text-2xl font-['Montserrat'] font-normal mb-8">
              {content.cta.title}
            </h2>
            <Link href="/site/ness/contact" className="inline-block bg-[#00ade0] hover:bg-[#0095c4] text-white py-3 px-8 font-normal transition duration-300 rounded-sm font-['Montserrat'] lowercase">
              {content.cta.button}
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
