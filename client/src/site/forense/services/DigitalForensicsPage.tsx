import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../../SiteContext';
import SiteLayout from '../../layout/SiteLayout';
import { forenseStyles as styles } from '../styles';

export default function ForenseDigitalForensicsPage() {
  const DotSpan = () => <span className="text-[#00ade0]">.</span>;
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
  const ForenseIo = () => (<>forense<DotSpan />io</>);
  const forenseIoText = "forense.io";
  const pageTitle = pageContent?.metaTitle || `${content.title} | ${forenseIoText}`;
  const pageDescription = pageContent?.metaDescription || content.description;
  
  // Schema.org estruturado para SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": content.title,
    "description": content.description,
    "provider": {
      "@type": "Organization",
      "name": forenseIoText,
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
              <h1 className={`${styles.fontSizes.hero.title} font-['Montserrat'] font-normal mb-6 lowercase`}>
                forense<DotSpan />digital
              </h1>
              <p className={`${styles.fontSizes.hero.subtitle} ${styles.colors.text.light} ${styles.spacing.mb.xl}`}>
                {content.description}
              </p>
            </div>
          </div>
        </section>
        
        {/* O que é Forense Digital */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-10">
                  <h2 className={`${styles.fontSizes.section.title} font-['Montserrat'] font-normal ${styles.colors.text.dark} ${styles.spacing.mb.large} lowercase`}>
                    o que é <span className={styles.colors.primary}>forense digital</span>?
                  </h2>
                  <p className={`${styles.colors.text.medium} ${styles.fontSizes.text.regular} ${styles.spacing.mb.medium} leading-relaxed`}>
                    a forense digital é uma disciplina que combina elementos da ciência da computação e da investigação criminal para coletar, analisar e preservar evidências digitais seguindo protocolos específicos que garantem sua validade legal.
                  </p>
                  <p className={`${styles.colors.text.medium} ${styles.fontSizes.text.regular} ${styles.spacing.mb.medium} leading-relaxed`}>
                    na forense<DotSpan />io, aplicamos metodologias forenses robustas para extrair, documentar e interpretar dados digitais que podem ser decisivos em processos judiciais, investigações corporativas e auditorias de segurança.
                  </p>
                  <p className={`${styles.colors.text.medium} ${styles.fontSizes.text.regular} leading-relaxed`}>
                    nossa abordagem científica assegura que cada evidência digital seja tratada com o rigor técnico e a conformidade legal necessários para ser considerada válida perante os tribunais e órgãos reguladores.
                  </p>
                </div>
                <div className="md:w-1/2 bg-[#00ade0]/5 rounded-lg p-8 border border-[#00ade0]/20">
                  <h3 className={`${styles.fontSizes.section.subtitle} font-['Montserrat'] font-normal ${styles.colors.text.dark} ${styles.spacing.mb.medium} lowercase`}>
                    por que a <span className={styles.colors.primary}>forense digital</span> é essencial
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-[#00ade0] rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-white">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1 lowercase text-sm">evidências incontestáveis</h4>
                        <p className="text-sm text-gray-600">produção de provas digitais que resistem a questionamentos técnicos e jurídicos</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#00ade0] rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-white">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1 lowercase text-sm">reconstrução factual</h4>
                        <p className="text-sm text-gray-600">análise cronológica de eventos digitais para estabelecer sequências precisas de ações</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#00ade0] rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-white">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1 lowercase text-sm">recuperação de dados ocultos</h4>
                        <p className="text-sm text-gray-600">acesso a informações deletadas, ocultas ou corrompidas que seriam inacessíveis por meios convencionais</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ambientes de Coleta */}
        <section className="py-20 bg-[#0d1117] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-['Montserrat'] font-normal mb-12 text-center lowercase">
                ambientes de <span className="text-[#00ade0]">coleta digital</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="border border-gray-800 rounded-lg p-6 bg-gray-900 hover:border-[#00ade0]/50 transition-colors duration-300">

                  <h3 className="text-lg font-['Montserrat'] font-medium mb-3 lowercase">
                    ambientes <span className="text-[#00ade0]">corporativos</span>
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    análise de computadores, servidores, e dispositivos móveis corporativos, mantendo a discrição e minimizando interrupções nas operações empresariais.
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-800">
                    <div className="flex items-center text-xs text-[#00ade0]/80">
                      <span className="mr-1">servidores</span>
                      <span className="mx-1">•</span>
                      <span className="mx-1">estações</span>
                      <span className="mx-1">•</span>
                      <span className="ml-1">rede</span>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-800 rounded-lg p-6 bg-gray-900 hover:border-[#00ade0]/50 transition-colors duration-300">
                  <h3 className="text-lg font-['Montserrat'] font-medium mb-3 lowercase">
                    dispositivos <span className="text-[#00ade0]">pessoais</span>
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    recuperação e análise de dados de smartphones, tablets e computadores pessoais, com atenção especial à privacidade e aos aspectos legais da coleta.
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-800">
                    <div className="flex items-center text-xs text-[#00ade0]/80">
                      <span className="mr-1">smartphones</span>
                      <span className="mx-1">•</span>
                      <span className="mx-1">laptops</span>
                      <span className="mx-1">•</span>
                      <span className="ml-1">tablets</span>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-800 rounded-lg p-6 bg-gray-900 hover:border-[#00ade0]/50 transition-colors duration-300">
                  <h3 className="text-lg font-['Montserrat'] font-medium mb-3 lowercase">
                    armazenamento em <span className="text-[#00ade0]">nuvem</span>
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    extração forense de dados armazenados em serviços de nuvem, incluindo e-mails, documentos, redes sociais, sites e backups, seguindo protocolos legais para acesso autorizado.
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-800">
                    <div className="flex items-center text-xs text-[#00ade0]/80">
                      <span className="mr-1">AWS</span>
                      <span className="mx-1">•</span>
                      <span className="mx-1">Google Cloud</span>
                      <span className="mx-1">•</span>
                      <span className="ml-1">Azure</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Serviços Especializados */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-['Montserrat'] font-normal text-gray-800 mb-10 text-center lowercase">
                serviços <span className="text-[#00ade0]">especializados</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {content.sections.map((section, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-[#00ade0] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-white text-lg font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-['Montserrat'] text-gray-800 mb-3 lowercase">
                          {section.title}
                        </h3>
                        <p className="text-gray-700 text-sm">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Metodologias Forenses */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-stretch md:space-x-10">
                <div className="md:w-1/2 mb-10 md:mb-0">
                  <h2 className="text-2xl font-['Montserrat'] font-normal text-gray-800 mb-6 lowercase">
                    metodologias <span className="text-[#00ade0]">forenses</span>
                  </h2>
                  <p className="text-gray-700 text-sm mb-6">
                    utilizamos protocolos rigorosos que garantem a admissibilidade jurídica das evidências coletadas, respeitando normas nacionais e internacionais. nossa abordagem inclui:
                  </p>
                  <ul className="space-y-4">
                    <li className="bg-white p-4 rounded-lg border border-gray-200 flex items-start">
                      <span className="text-[#00ade0] text-xl mr-3 leading-6 flex-shrink-0">•</span>
                      <span className="text-gray-700 text-sm">documentação precisa de cada etapa da coleta e cadeia de custódia</span>
                    </li>
                    <li className="bg-white p-4 rounded-lg border border-gray-200 flex items-start">
                      <span className="text-[#00ade0] text-xl mr-3 leading-6 flex-shrink-0">•</span>
                      <span className="text-gray-700 text-sm">utilização de ferramentas forenses homologadas internacionalmente</span>
                    </li>
                    <li className="bg-white p-4 rounded-lg border border-gray-200 flex items-start">
                      <span className="text-[#00ade0] text-xl mr-3 leading-6 flex-shrink-0">•</span>
                      <span className="text-gray-700 text-sm">técnicas não destrutivas que preservam a integridade dos dados</span>
                    </li>
                    <li className="bg-white p-4 rounded-lg border border-gray-200 flex items-start">
                      <span className="text-[#00ade0] text-xl mr-3 leading-6 flex-shrink-0">•</span>
                      <span className="text-gray-700 text-sm">análise de dados em ambiente isolado e controlado</span>
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/2 bg-[#0d1117] rounded-lg p-8 text-white flex flex-col">
                  <h3 className="text-xl font-['Montserrat'] font-normal mb-6 lowercase">
                    frameworks <span className="text-[#00ade0]">adotados</span>
                  </h3>
                  <div className="space-y-6 flex-grow">
                    <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
                      <h4 className="font-medium text-[#00ade0] mb-2 lowercase">ACPO Guidelines</h4>
                      <p className="text-sm text-gray-300">princípios para manipulação de evidências digitais reconhecidos internacionalmente</p>
                    </div>
                    <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
                      <h4 className="font-medium text-[#00ade0] mb-2 lowercase">ISO/IEC 27037</h4>
                      <p className="text-sm text-gray-300">diretrizes para identificação, coleta e preservação de evidências digitais</p>
                    </div>
                    <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
                      <h4 className="font-medium text-[#00ade0] mb-2 lowercase">NIST Guidelines</h4>
                      <p className="text-sm text-gray-300">padrões técnicos para forensics digital e investigações cibernéticas</p>
                    </div>
                  </div>
                </div>
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