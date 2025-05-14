import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSite } from '@/site/SiteContext';
import { useI18n } from '@/lib/i18n';
import SiteLayout from '@/site/layout/SiteLayout';
import { useQuery } from '@tanstack/react-query';

export default function TrustnessConformityPage() {
  const { siteConfig } = useSite();
  const { language } = useI18n();
  
  // Consulta o conteúdo da página
  const { data: pageContent } = useQuery({
    queryKey: ['/api/content/services/conformity', language],
    queryFn: () => fetch(`/api/content/services/conformity?language=${language}`).then(res => res.json()),
    enabled: !!language,
  });

  // Conteúdo padrão em português
  const defaultContentPt = {
    heroTitle: "conformidade regulatória",
    heroSubtitle: "adequação a normas e regulamentos de segurança da informação e governança de dados",
    description: `Nossa equipe de especialistas em conformidade regulatória auxilia organizações a implementarem 
      frameworks de controle alinhados a normas como ISO 27001, SOC 2, PCI DSS e regulamentações setoriais. 
      Trabalhamos para transformar requisitos regulatórios em práticas que adicionem valor real ao negócio.`,
    features: [
      "conformidade com ISO 27001",
      "certificação SOC 2",
      "adequação PCI DSS",
      "atendimento a requisitos setoriais",
      "governança, riscos e compliance (GRC)",
      "programa de continuidade de negócios"
    ],
    benefits: [
      "conformidade demonstrável com padrões reconhecidos",
      "integração da segurança aos processos de negócio",
      "redução de riscos operacionais",
      "vantagem competitiva em mercados regulados",
      "preparação para auditorias de certificação"
    ],
    methodology: "Nossa metodologia de implementação de frameworks de conformidade equilibra o rigor técnico com a praticidade, garantindo que requisitos normativos sejam traduzidos em controles e processos que se adequem à realidade operacional da organização."
  };

  // Conteúdo em inglês
  const defaultContentEn = {
    heroTitle: "regulatory compliance",
    heroSubtitle: "adaptation to information security standards and data governance regulations",
    description: `Our team of regulatory compliance specialists helps organizations implement control 
      frameworks aligned with standards such as ISO 27001, SOC 2, PCI DSS, and sector-specific regulations. 
      We work to transform regulatory requirements into practices that add real value to the business.`,
    features: [
      "ISO 27001 compliance",
      "SOC 2 certification",
      "PCI DSS adaptation",
      "sector-specific requirements",
      "governance, risk, and compliance (GRC)",
      "business continuity program"
    ],
    benefits: [
      "demonstrable compliance with recognized standards",
      "integration of security into business processes",
      "reduced operational risks",
      "competitive advantage in regulated markets",
      "preparation for certification audits"
    ],
    methodology: "Our methodology for implementing compliance frameworks balances technical rigor with practicality, ensuring that normative requirements are translated into controls and processes that fit the operational reality of the organization."
  };

  // Conteúdo em espanhol
  const defaultContentEs = {
    heroTitle: "conformidad regulatoria",
    heroSubtitle: "adecuación a normas y regulaciones de seguridad de la información y gobernanza de datos",
    description: `Nuestro equipo de especialistas en conformidad regulatoria ayuda a las organizaciones a implementar 
      marcos de control alineados con normas como ISO 27001, SOC 2, PCI DSS y regulaciones sectoriales. 
      Trabajamos para transformar requisitos regulatorios en prácticas que agreguen valor real al negocio.`,
    features: [
      "conformidad con ISO 27001",
      "certificación SOC 2",
      "adecuación PCI DSS",
      "atención a requisitos sectoriales",
      "gobernanza, riesgos y compliance (GRC)",
      "programa de continuidad de negocios"
    ],
    benefits: [
      "conformidad demostrable con estándares reconocidos",
      "integración de la seguridad a los procesos de negocio",
      "reducción de riesgos operacionales",
      "ventaja competitiva en mercados regulados",
      "preparación para auditorías de certificación"
    ],
    methodology: "Nuestra metodología de implementación de marcos de conformidad equilibra el rigor técnico con la practicidad, garantizando que los requisitos normativos se traduzcan en controles y procesos que se ajusten a la realidad operativa de la organización."
  };

  // Define o conteúdo localizado com base no idioma
  const localizedContent = {
    pt: defaultContentPt,
    en: defaultContentEn,
    es: defaultContentEs
  };

  // Usa o conteúdo do banco de dados se disponível, ou o conteúdo padrão
  const defaultContent = {
    heroTitle: localizedContent[language]?.heroTitle,
    heroSubtitle: localizedContent[language]?.heroSubtitle,
    description: localizedContent[language]?.description,
    features: localizedContent[language]?.features,
    benefits: localizedContent[language]?.benefits,
    methodology: localizedContent[language]?.methodology
  };

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