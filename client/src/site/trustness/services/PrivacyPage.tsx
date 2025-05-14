import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSite } from '@/site/SiteContext';
import { useI18n } from '@/lib/i18n';
import SiteLayout from '@/site/layout/SiteLayout';
import { useQuery } from '@tanstack/react-query';

export default function TrustnessPrivacyPage() {
  const { siteConfig } = useSite();
  const { language } = useI18n();
  
  // Consulta o conteúdo da página
  const { data: pageContent } = useQuery({
    queryKey: ['/api/content/services/privacy', language],
    queryFn: () => fetch(`/api/content/services/privacy?language=${language}`).then(res => res.json()),
    enabled: !!language,
  });

  // Conteúdo padrão em português
  const defaultContentPt = {
    heroTitle: "privacidade e proteção de dados",
    heroSubtitle: "soluções completas para adequação à LGPD e outras regulamentações de proteção de dados",
    description: `Nossa equipe de especialistas em privacidade e proteção de dados ajuda organizações a entenderem 
      e implementarem os requisitos regulatórios, como a LGPD no Brasil e o GDPR na Europa. Desenvolvemos estratégias 
      personalizadas que consideram a cultura organizacional, processos existentes e objetivos de negócio.`,
    features: [
      "adequação à LGPD/GDPR",
      "mapeamento de dados pessoais",
      "avaliação de impacto à proteção de dados (RIPD/DPIA)",
      "implementação de controles de privacidade",
      "gestão de consentimento e direitos dos titulares",
      "resposta a incidentes de privacidade"
    ],
    benefits: [
      "conformidade com legislações de privacidade",
      "redução de riscos legais e reputacionais",
      "processos de privacidade integrados ao negócio",
      "cultura organizacional de privacidade",
      "maior confiança de clientes e parceiros"
    ],
    methodology: "Nossa abordagem de privacy by design integra requisitos de privacidade desde o início dos projetos e processos, garantindo que a proteção de dados seja considerada em todas as etapas e não apenas como uma checagem de conformidade."
  };

  // Conteúdo em inglês
  const defaultContentEn = {
    heroTitle: "privacy and data protection",
    heroSubtitle: "comprehensive solutions for compliance with LGPD and other data protection regulations",
    description: `Our team of privacy and data protection experts helps organizations understand and implement 
      regulatory requirements, such as LGPD in Brazil and GDPR in Europe. We develop customized strategies that 
      consider organizational culture, existing processes, and business objectives.`,
    features: [
      "LGPD/GDPR compliance",
      "personal data mapping",
      "data protection impact assessment (DPIA)",
      "privacy controls implementation",
      "consent and data subject rights management",
      "privacy incident response"
    ],
    benefits: [
      "compliance with privacy regulations",
      "reduced legal and reputational risks",
      "business-integrated privacy processes",
      "organizational privacy culture",
      "increased trust from customers and partners"
    ],
    methodology: "Our privacy by design approach integrates privacy requirements from the beginning of projects and processes, ensuring that data protection is considered at all stages and not just as a compliance check."
  };

  // Conteúdo em espanhol
  const defaultContentEs = {
    heroTitle: "privacidad y protección de datos",
    heroSubtitle: "soluciones completas para la adecuación a la LGPD y otras regulaciones de protección de datos",
    description: `Nuestro equipo de especialistas en privacidad y protección de datos ayuda a las organizaciones a entender 
      e implementar los requisitos regulatorios, como la LGPD en Brasil y el GDPR en Europa. Desarrollamos estrategias 
      personalizadas que consideran la cultura organizacional, los procesos existentes y los objetivos de negocio.`,
    features: [
      "adecuación a LGPD/GDPR",
      "mapeo de datos personales",
      "evaluación de impacto a la protección de datos (DPIA)",
      "implementación de controles de privacidad",
      "gestión de consentimiento y derechos de los titulares",
      "respuesta a incidentes de privacidad"
    ],
    benefits: [
      "conformidad con legislaciones de privacidad",
      "reducción de riesgos legales y reputacionales",
      "procesos de privacidad integrados al negocio",
      "cultura organizacional de privacidad",
      "mayor confianza de clientes y socios"
    ],
    methodology: "Nuestro enfoque de privacy by design integra requisitos de privacidad desde el inicio de los proyectos y procesos, garantizando que la protección de datos sea considerada en todas las etapas y no solo como una verificación de conformidad."
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
    ? "Serviços de privacidade e proteção de dados. Soluções completas para adequação à LGPD e outras regulamentações de proteção de dados."
    : language === 'en'
      ? "Privacy and data protection services. Comprehensive solutions for compliance with LGPD and other data protection regulations."
      : "Servicios de privacidad y protección de datos. Soluciones completas para la adecuación a la LGPD y otras regulaciones de protección de datos.";

  // Dados estruturados para SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": language === 'pt' ? "Privacidade e Proteção de Dados" : language === 'en' ? "Privacy and Data Protection" : "Privacidad y Protección de Datos",
    "provider": {
      "@type": "Organization",
      "name": "Trustness",
      "url": "https://www.trustness.io"
    },
    "description": metaDescription,
    "serviceType": "Data Privacy"
  };

  return (
    <SiteLayout>
      <Helmet>
        <title>
          {language === 'pt' ? 'Privacidade e Proteção de Dados | Trustness' : 
           language === 'en' ? 'Privacy and Data Protection | Trustness' : 
           'Privacidad y Protección de Datos | Trustness'}
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
                <span className="text-[#005fa3]">.</span>privacy
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
                {language === 'pt' ? 'nossos serviços' : language === 'en' ? 'our services' : 'nuestros servicios'}
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
                {language === 'pt' ? 'privacy by design' : language === 'en' ? 'privacy by design' : 'privacy by design'}
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
                ? <>precisa de suporte em <span className="text-white">proteção de dados</span>?</> 
                : language === 'en'
                  ? <>need support with <span className="text-white">data protection</span>?</>
                  : <>¿necesita soporte en <span className="text-white">protección de datos</span>?</>
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