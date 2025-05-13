import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../../SiteContext';
import SiteLayout from '../../layout/SiteLayout';

export default function ForenseDigitalForensicsPage() {
  const { siteConfig } = useSite();
  const { language } = useI18n();
  
  // Buscar conteúdo da página específico para o serviço
  const { data: pageContent, isLoading } = useQuery({
    queryKey: ['/api/content/services/digital-forensics', language, siteConfig.code],
    queryFn: async () => {
      const res = await fetch(`/api/content/services/digital-forensics?lang=${language}&site=${siteConfig.code}`);
      if (!res.ok) throw new Error('Failed to fetch content');
      return res.json();
    }
  });
  
  // Conteúdo padrão caso não haja conteúdo específico no banco de dados
  const defaultContent = {
    pt: {
      title: 'forense.digital',
      description: 'forense digital e análise de evidências',
      intro: 'nossa divisão de forense digital oferece serviços especializados em coleta, preservação e análise detalhada de evidências digitais, garantindo a integridade dos dados e a validade legal dos resultados obtidos.',
      sections: [
        {
          title: 'coleta e preservação',
          content: 'utilizamos metodologias e ferramentas forenses de última geração para coletar dados de forma segura e preservar a cadeia de custódia, assegurando que as evidências digitais mantenham seu valor probatório em contextos judiciais.'
        },
        {
          title: 'análise de dados',
          content: 'realizamos análises minuciosas de mídias digitais, dispositivos móveis, computadores, redes e sistemas de armazenamento em nuvem para recuperar, identificar e contextualizar informações relevantes.'
        },
        {
          title: 'produção e validação de evidências',
          content: 'recuperação e investigação de material digital para produção de evidências com validade probatória em juízo. elaboramos relatórios técnicos detalhados e laudos periciais que documentam os procedimentos adotados.'
        },
        {
          title: 'reexame forense',
          content: 'revisão técnica de evidências digitais para órgãos públicos e privados, garantindo avaliação imparcial. identificamos possíveis inconsistências ou falhas metodológicas que possam comprometer a validade das conclusões.'
        },
        {
          title: 'contraprova de relatórios',
          content: 'análise independente de relatórios forenses e de inteligência, proporcionando visões alternativas sobre os dados apresentados. oferecemos uma segunda opinião técnica para validar ou contestar conclusões prévias.'
        }
      ],
      cta: {
        title: 'precisa de um serviço especializado em forense digital?',
        button: 'entre em contato'
      }
    },
    en: {
      title: 'forensic.digital',
      description: 'digital forensics and evidence analysis',
      intro: 'our digital forensics division offers specialized services in collection, preservation, and detailed analysis of digital evidence, ensuring data integrity and the legal validity of the obtained results.',
      sections: [
        {
          title: 'collection and preservation',
          content: 'we use state-of-the-art forensic methodologies and tools to securely collect data and preserve the chain of custody, ensuring that digital evidence maintains its probative value in judicial contexts.'
        },
        {
          title: 'data analysis',
          content: 'we conduct thorough analyses of digital media, mobile devices, computers, networks, and cloud storage systems to recover, identify, and contextualize relevant information.'
        },
        {
          title: 'evidence production and validation',
          content: 'recovery and investigation of digital material to produce evidence with probative validity in court. we prepare detailed technical reports and expert opinions that document the procedures adopted.'
        },
        {
          title: 'forensic reexamination',
          content: 'technical review of digital evidence for public and private entities, ensuring impartial evaluation. we identify possible inconsistencies or methodological flaws that may compromise the validity of conclusions.'
        },
        {
          title: 'report counter-evidence',
          content: 'independent analysis of forensic and intelligence reports, providing alternative views on the presented data. we offer a technical second opinion to validate or contest previous conclusions.'
        }
      ],
      cta: {
        title: 'need a specialized digital forensics service?',
        button: 'contact us'
      }
    },
    es: {
      title: 'forense.digital',
      description: 'forense digital y análisis de evidencias',
      intro: 'nuestra división de forense digital ofrece servicios especializados en recolección, preservación y análisis detallado de evidencias digitales, garantizando la integridad de los datos y la validez legal de los resultados obtenidos.',
      sections: [
        {
          title: 'recolección y preservación',
          content: 'utilizamos metodologías y herramientas forenses de última generación para recolectar datos de forma segura y preservar la cadena de custodia, asegurando que las evidencias digitales mantengan su valor probatorio en contextos judiciales.'
        },
        {
          title: 'análisis de datos',
          content: 'realizamos análisis minuciosos de medios digitales, dispositivos móviles, computadoras, redes y sistemas de almacenamiento en la nube para recuperar, identificar y contextualizar información relevante.'
        },
        {
          title: 'producción y validación de evidencias',
          content: 'recuperación e investigación de material digital para producción de evidencias con validez probatoria en juicio. elaboramos informes técnicos detallados y dictámenes periciales que documentan los procedimientos adoptados.'
        },
        {
          title: 'reexamen forense',
          content: 'revisión técnica de evidencias digitales para órganos públicos y privados, garantizando evaluación imparcial. identificamos posibles inconsistencias o fallas metodológicas que puedan comprometer la validez de las conclusiones.'
        },
        {
          title: 'contraprueba de informes',
          content: 'análisis independiente de informes forenses y de inteligencia, proporcionando visiones alternativas sobre los datos presentados. ofrecemos una segunda opinión técnica para validar o contestar conclusiones previas.'
        }
      ],
      cta: {
        title: '¿necesita un servicio especializado en forense digital?',
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
    "serviceType": "Digital Forensics"
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
      canonicalUrl={`https://${siteConfig.domain}/services/digital-forensics`}
      structuredData={structuredData}
    >
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 text-white bg-[#0d1117] relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-['Montserrat'] font-normal mb-6 lowercase">
                forense<span className="text-[#00ade0]">.</span>digital
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