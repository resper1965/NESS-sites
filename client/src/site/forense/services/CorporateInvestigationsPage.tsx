import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../../SiteContext';
import SiteLayout from '../../layout/SiteLayout';

export default function ForenseCorporateInvestigationsPage() {
  const { siteConfig } = useSite();
  const { language } = useI18n();
  
  // Buscar conteúdo da página específico para o serviço
  const { data: pageContent, isLoading } = useQuery({
    queryKey: ['/api/content/services/corporate-investigations', language, siteConfig.code],
    queryFn: async () => {
      const res = await fetch(`/api/content/services/corporate-investigations?lang=${language}&site=${siteConfig.code}`);
      if (!res.ok) throw new Error('Failed to fetch content');
      return res.json();
    }
  });
  
  // Conteúdo padrão caso não haja conteúdo específico no banco de dados
  const defaultContent = {
    pt: {
      title: 'investigações.corporativas',
      description: 'análise forense digital em casos empresariais',
      intro: 'nosso serviço de investigações corporativas fornece análises forenses digitais detalhadas para identificar, documentar e resolver questões internas envolvendo violações de políticas, fraudes, vazamento de dados e outras ameaças à integridade empresarial.',
      sections: [
        {
          title: 'fraudes internas',
          content: 'investigamos suspeitas de fraudes financeiras, desvios, manipulação de dados e outras atividades ilícitas no ambiente corporativo, coletando e analisando evidências digitais de forma a preservar sua integridade para possíveis ações administrativas ou judiciais.'
        },
        {
          title: 'uso indevido de recursos',
          content: 'identificamos e documentamos casos de uso indevido de recursos corporativos, incluindo violações de propriedade intelectual, uso não autorizado de sistemas e apropriação de informações confidenciais, aplicando métodos forenses que respeitam a privacidade e as leis trabalhistas.'
        },
        {
          title: 'vazamento de informações',
          content: 'rastreamos a origem de vazamentos de dados confidenciais ou proprietários, analisando registros de sistemas, comunicações corporativas e dispositivos, para identificar responsáveis e fortalecer medidas preventivas contra novos incidentes.'
        },
        {
          title: 'verificações de compliance',
          content: 'realizamos auditorias forenses para verificar a conformidade com políticas internas e regulamentações setoriais, identificando vulnerabilidades e fornecendo recomendações para fortalecer os controles e a segurança corporativa.'
        }
      ],
      cta: {
        title: 'precisa de uma investigação corporativa discreta e eficaz?',
        button: 'entre em contato'
      }
    },
    en: {
      title: 'corporate.investigations',
      description: 'digital forensic analysis in corporate cases',
      intro: 'our corporate investigations service provides detailed digital forensic analyses to identify, document, and resolve internal issues involving policy violations, fraud, data leaks, and other threats to corporate integrity.',
      sections: [
        {
          title: 'internal fraud',
          content: 'we investigate suspicions of financial fraud, embezzlement, data manipulation, and other illicit activities in the corporate environment, collecting and analyzing digital evidence in a way that preserves its integrity for possible administrative or legal actions.'
        },
        {
          title: 'misuse of resources',
          content: 'we identify and document cases of corporate resource misuse, including intellectual property violations, unauthorized system use, and appropriation of confidential information, applying forensic methods that respect privacy and labor laws.'
        },
        {
          title: 'information leakage',
          content: 'we track the origin of confidential or proprietary data leaks by analyzing system logs, corporate communications, and devices to identify responsible parties and strengthen preventive measures against new incidents.'
        },
        {
          title: 'compliance verifications',
          content: 'we conduct forensic audits to verify compliance with internal policies and industry regulations, identifying vulnerabilities and providing recommendations to strengthen corporate controls and security.'
        }
      ],
      cta: {
        title: 'need a discreet and effective corporate investigation?',
        button: 'contact us'
      }
    },
    es: {
      title: 'investigaciones.corporativas',
      description: 'análisis forense digital en casos empresariales',
      intro: 'nuestro servicio de investigaciones corporativas proporciona análisis forenses digitales detallados para identificar, documentar y resolver problemas internos que involucran violaciones de políticas, fraudes, filtración de datos y otras amenazas a la integridad empresarial.',
      sections: [
        {
          title: 'fraudes internos',
          content: 'investigamos sospechas de fraudes financieros, desvíos, manipulación de datos y otras actividades ilícitas en el entorno corporativo, recopilando y analizando evidencias digitales de forma que preserve su integridad para posibles acciones administrativas o judiciales.'
        },
        {
          title: 'uso indebido de recursos',
          content: 'identificamos y documentamos casos de uso indebido de recursos corporativos, incluyendo violaciones de propiedad intelectual, uso no autorizado de sistemas y apropiación de información confidencial, aplicando métodos forenses que respetan la privacidad y las leyes laborales.'
        },
        {
          title: 'filtración de información',
          content: 'rastreamos el origen de filtraciones de datos confidenciales o propietarios, analizando registros de sistemas, comunicaciones corporativas y dispositivos, para identificar responsables y fortalecer medidas preventivas contra nuevos incidentes.'
        },
        {
          title: 'verificaciones de compliance',
          content: 'realizamos auditorías forenses para verificar el cumplimiento de políticas internas y regulaciones sectoriales, identificando vulnerabilidades y proporcionando recomendaciones para fortalecer los controles y la seguridad corporativa.'
        }
      ],
      cta: {
        title: '¿necesita una investigación corporativa discreta y eficaz?',
        button: 'contáctenos'
      }
    }
  };
  
  // Escolher o conteúdo baseado na linguagem atual
  const content = defaultContent[language] || defaultContent.en;
  
  // Definir o título da página e metadados
  const pageTitle = pageContent?.metaTitle || `${content.title} | forense.io`;
  const pageDescription = pageContent?.metaDescription || content.description;
  
  // Schema.org estruturado para SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": content.title,
    "description": content.description,
    "provider": {
      "@type": "Organization",
      "name": "forense.io",
      "url": `https://${siteConfig.domain}`
    },
    "serviceType": "Corporate Investigations"
  };
  
  if (isLoading) {
    return (
      <SiteLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#00ade0]"></div>
        </div>
      </SiteLayout>
    );
  }
  
  return (
    <SiteLayout
      title={pageTitle}
      description={pageDescription}
      canonicalUrl={`https://${siteConfig.domain}/services/corporate-investigations`}
      structuredData={structuredData}
    >
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 text-white bg-[#0d1117] relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-['Montserrat'] font-normal mb-6 lowercase">
                investigações<span className="text-[#00ade0]">.</span>corporativas
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {content.description}
              </p>
            </div>
          </div>
        </section>
        
        {/* Intro Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-base mx-auto text-gray-700 lowercase">
                <p className="text-lg leading-relaxed mb-6">
                  {content.intro}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Service Details */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {content.sections.map((section, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-['Montserrat'] text-gray-800 mb-4 lowercase">
                      <span className="text-[#00ade0]">●</span> {section.title}
                    </h3>
                    <p className="text-gray-700 text-sm">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-[#0d1117] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-['Montserrat'] font-normal mb-8 lowercase">
              {content.cta.title}
            </h2>
            <a
              href={`/site/forense/contact`}
              className="inline-block bg-[#00ade0] hover:bg-opacity-90 text-white py-3 px-8 rounded lowercase transition duration-300"
            >
              {content.cta.button}
            </a>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}