import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSite } from '@/site/SiteContext';
import { useI18n } from '@/lib/i18n';
import SiteLayout from '@/site/layout/SiteLayout';
import { useQuery } from '@tanstack/react-query';
import conformityTranslations from '../translations/services/conformity';

export default function TrustnessConformityPage() {
  const { siteConfig } = useSite();
  const { language } = useI18n();
  
  // Consulta o conteúdo da página
  const { data: pageContent } = useQuery({
    queryKey: ['/api/content/services/conformity', language],
    queryFn: () => fetch(`/api/content/services/conformity?language=${language}`).then(res => res.json()),
    enabled: !!language,
  });


  // Usa o conteúdo do banco de dados se disponível, ou o conteúdo padrão
  const defaultContent = conformityTranslations[language];

  // Meta tags para SEO
  const metaDescription = language === 'pt' 
    ? "Serviços de conformidade regulatória em segurança da informação. Adequação a normas ISO 27001, SOC 2, PCI DSS e regulamentos setoriais."
    : language === 'en'
      ? "Regulatory compliance services in information security. Adaptation to ISO 27001, SOC 2, PCI DSS standards and sector regulations."
      : "Servicios de conformidad regulatoria en seguridad de la información. Adecuación a normas ISO 27001, SOC 2, PCI DSS y regulaciones sectoriales.";

  // Dados estruturados para SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": language === 'pt' ? "Conformidade Regulatória" : language === 'en' ? "Regulatory Compliance" : "Conformidad Regulatoria",
    "provider": {
      "@type": "Organization",
      "name": "Trustness",
      "url": "https://www.trustness.io"
    },
    "description": metaDescription,
    "serviceType": "Regulatory Compliance"
  };

  return (
    <SiteLayout>
      <Helmet>
        <title>
          {language === 'pt' ? 'Conformidade Regulatória | Trustness' : 
           language === 'en' ? 'Regulatory Compliance | Trustness' : 
           'Conformidad Regulatoria | Trustness'}
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
                <span className="text-[#005fa3]">.</span>conformity
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
                {language === 'pt' ? 'nossas soluções' : language === 'en' ? 'our solutions' : 'nuestras soluciones'}
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
                {language === 'pt' ? 'nossa abordagem' : language === 'en' ? 'our approach' : 'nuestro enfoque'}
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
                ? <>precisa implementar <span className="text-white">frameworks de conformidade</span>?</> 
                : language === 'en'
                  ? <>need to implement <span className="text-white">compliance frameworks</span>?</>
                  : <>¿necesita implementar <span className="text-white">marcos de conformidad</span>?</>
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
