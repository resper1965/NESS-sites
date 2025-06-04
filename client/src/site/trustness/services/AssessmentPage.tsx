import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSite } from '@/site/SiteContext';
import { useI18n } from '@/lib/i18n';
import SiteLayout from '@/site/layout/SiteLayout';
import { useQuery } from '@tanstack/react-query';
import assessmentTranslations from '../translations/services/assessment';

export default function TrustnessAssessmentPage() {
  const { siteConfig } = useSite();
  const { language } = useI18n();
  
  // Consulta o conteúdo da página
  const { data: pageContent } = useQuery({
    queryKey: ['/api/content/services/assessment', language],
    queryFn: () => fetch(`/api/content/services/assessment?language=${language}`).then(res => res.json()),
    enabled: !!language,
  });


  // Usa o conteúdo do banco de dados se disponível, ou o conteúdo padrão
  const defaultContent = assessmentTranslations[language];
  // Meta tags para SEO
  const metaDescription = language === 'pt' 
    ? "Serviços de avaliação de segurança e riscos. Identificamos vulnerabilidades e gaps de conformidade para fortalecer sua postura de segurança."
    : language === 'en'
      ? "Security and risk assessment services. We identify vulnerabilities and compliance gaps to strengthen your security posture."
      : "Servicios de evaluación de seguridad y riesgos. Identificamos vulnerabilidades y brechas de conformidad para fortalecer su postura de seguridad.";

  // Dados estruturados para SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": language === 'pt' ? "Avaliação de Segurança e Riscos" : language === 'en' ? "Security and Risk Assessment" : "Evaluación de Seguridad y Riesgos",
    "provider": {
      "@type": "Organization",
      "name": "Trustness",
      "url": "https://www.trustness.io"
    },
    "description": metaDescription,
    "serviceType": "Security Assessment"
  };

  return (
    <SiteLayout>
      <Helmet>
        <title>
          {language === 'pt' ? 'Avaliação de Segurança | Trustness' : 
           language === 'en' ? 'Security Assessment | Trustness' : 
           'Evaluación de Seguridad | Trustness'}
        </title>
        <meta name="description" content={metaDescription} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <main>
        {/* Hero Section */}
        <section className="intro text-white bg-[#0b1016] relative flex items-center" style={{ minHeight: "60vh" }}>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-['Montserrat'] font-normal mb-6 lowercase">
                <span className="text-[#005fa3]">.</span>assessment
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {defaultContent.heroSubtitle}
              </p>
            </div>
          </div>
        </section>
        
        {/* Description Section */}
        <section className="conteudo bg-white" style={{ padding: "4rem 0" }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 mb-8 lowercase">
                {defaultContent.description}
              </p>
              
              <h2 className="text-2xl font-['Montserrat'] font-normal text-gray-800 mb-6 lowercase">
                {language === 'pt' ? 'o que fazemos' : language === 'en' ? 'what we do' : 'qué hacemos'}
              </h2>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {defaultContent.features?.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#005fa3] mr-2">•</span>
                    <span className="text-gray-700 lowercase">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        
        {/* Methodology Section */}
        <section className="conteudo bg-gray-50" style={{ padding: "4rem 0" }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-['Montserrat'] font-normal text-gray-800 mb-6 text-center lowercase">
                {language === 'pt' ? 'nossa metodologia' : language === 'en' ? 'our methodology' : 'nuestra metodología'}
              </h2>
              
              <p className="text-lg text-gray-700 mb-12 lowercase">
                {defaultContent.methodology}
              </p>
              
              <div className="bg-white p-8 rounded-sm border-l-2 border-[#005fa3] shadow-sm">
                <h3 className="text-xl font-['Montserrat'] font-normal mb-4 lowercase text-gray-800">
                  {language === 'pt' ? 'benefícios' : language === 'en' ? 'benefits' : 'beneficios'}
                </h3>
                
                <ul className="space-y-3">
                  {defaultContent.benefits?.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#005fa3] mr-2">•</span>
                      <span className="text-gray-700 lowercase">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="contato bg-[#1a1a22] text-white flex items-center" style={{ minHeight: "400px" }}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-['Montserrat'] font-normal mb-8 lowercase">
              {language === 'pt' 
                ? <>precisa de uma <span className="text-white">avaliação de segurança</span>?</> 
                : language === 'en'
                  ? <>need a <span className="text-white">security assessment</span>?</>
                  : <>¿necesita una <span className="text-white">evaluación de seguridad</span>?</>
              }
            </h2>
            <a 
              href={language === 'pt' ? "/site/trustness/contact" : language === 'en' ? "/site/trustness/contact" : "/site/trustness/contact"} 
              className="bg-transparent hover:bg-[#00ade0] text-white border border-[#00ade0] hover:border-transparent px-8 py-3 rounded lowercase inline-block transition-colors duration-300"
            >
              {language === 'pt' ? 'fale conosco' : language === 'en' ? 'contact us' : 'contáctenos'}
            </a>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}