import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../../SiteContext';
import SiteLayout from '../../layout/SiteLayout';
import { forenseStyles as styles } from '../styles';

export default function ForenseLegalSupportPage() {
  const DotSpan = () => <span className="text-[#00ade0]">.</span>;
  const { siteConfig } = useSite();
  const { language, t } = useI18n();
  
  // Buscar conteúdo da página específico para o serviço
  const { data: pageContent, isLoading } = useQuery({
    queryKey: ['/api/content/services/legal-support', language, siteConfig.code],
    queryFn: async () => {
      const res = await fetch(`/api/content/services/legal-support?lang=${language}&site=${siteConfig.code}`);
      if (!res.ok) throw new Error('Failed to fetch content');
      return res.json();
    }
  });
  
  // Conteúdo padrão caso não haja conteúdo específico no banco de dados
  const defaultContent = {
    pt: {
      title: 'suporte.legal',
      description: 'suporte técnico à área legal em evidências digitais',
      intro: 'nossa divisão de suporte técnico-legal oferece serviços especializados de orientação em casos envolvendo evidências digitais, proporcionando clareza e embasamento científico para profissionais e organizações. não prestamos serviços jurídicos, atuamos no suporte técnico especializado a casos com componentes digitais.',
      sections: [
        {
          title: 'consultoria estratégica',
          content: 'orientação especializada em casos e litígios envolvendo evidências digitais, ajudando na compreensão técnica dos elementos digitais e facilitando a formulação de estratégias eficazes baseadas em fundamentos técnicos sólidos.'
        },
        {
          title: 'assistência técnica processual',
          content: 'apoio técnico especializado para a análise de evidências digitais, incluindo a avaliação crítica dos argumentos e metodologias técnicas adversárias para identificar inconsistências e falhas em laudos e relatórios.'
        },
        {
          title: 'esclarecimentos técnicos em audiências',
          content: 'apresentação de análises técnicas forenses quando solicitado, contribuindo para o entendimento claro dos elementos técnicos digitais e desmistificando conceitos complexos relacionados à tecnologia e evidências digitais.'
        }
      ],
      cta: {
        title: 'precisa de suporte técnico para a área legal em casos com evidências digitais?',
        button: 'entre em contato'
      }
    },
    en: {
      title: 'legal.support',
      description: 'technical support for the legal field on digital evidence',
      intro: 'our technical support division offers specialized services for legal professionals in cases involving digital evidence, providing clarity and scientific basis to support legal arguments. we do not provide legal services, but rather technical expertise for cases with digital components.',
      sections: [
        {
          title: 'strategic consulting',
          content: 'specialized guidance in cases and litigation involving digital evidence, helping to formulate effective legal strategies based on solid technical foundations.'
        },
        {
          title: 'judicial technical assistance',
          content: 'specialized technical support for the development and defense of legal theses, including critical analysis of opposing arguments and methodologies to identify inconsistencies and flaws.'
        },
        {
          title: 'technical clarifications in hearings',
          content: 'presentation of forensic technical analyses in courts, contributing to a clear understanding of technical elements by the judiciary and demystifying complex concepts.'
        }
      ],
      cta: {
        title: 'need specialized legal consulting on digital evidence?',
        button: 'contact us'
      }
    },
    es: {
      title: 'soporte.legal',
      description: 'soporte legal y consultoría especializada en evidencias digitales',
      intro: 'nuestra división de soporte legal ofrece servicios especializados en consultoría jurídica y técnica para casos que involucran evidencias digitales, proporcionando claridad y base científica a los argumentos jurídicos.',
      sections: [
        {
          title: 'consultoría estratégica',
          content: 'orientación especializada en casos y litigios que involucran evidencias digitales, ayudando en la formulación de estrategias jurídicas eficaces basadas en fundamentos técnicos sólidos.'
        },
        {
          title: 'asistencia técnica judicial',
          content: 'apoyo técnico especializado para la elaboración y sustentación de tesis, incluyendo el análisis crítico de los argumentos y metodologías adversarias para identificar inconsistencias y fallas.'
        },
        {
          title: 'aclaraciones técnicas en audiencias',
          content: 'presentación de análisis técnicos forenses en tribunales, contribuyendo a la comprensión clara de los elementos técnicos por parte del poder judicial y desmitificando conceptos complejos.'
        }
      ],
      cta: {
        title: '¿necesita consultoría legal especializada en evidencias digitales?',
        button: 'contáctenos'
      }
    }
  };
  
  // Escolher o conteúdo baseado na linguagem atual
  const content = defaultContent[language] || defaultContent.en;
  
  // Definir o título da página e metadados
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
    "serviceType": "Legal Support"
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
      canonicalUrl={`https://${siteConfig.domain}/services/legal-support`}
      structuredData={structuredData}
    >
      <main>
        {/* Hero Section */}
        <section className="h-[70vh] min-h-[600px] max-h-[800px] flex items-center justify-center text-white bg-[#0d1117] relative overflow-hidden">
          {/* Imagem de fundo otimizada */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/assets/images/optimized/forense-hero-bg.webp" 
              alt="Legal Support" 
              className="w-full h-full object-cover opacity-10" 
              loading="eager"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className={`${styles.fontSizes.hero.title} font-['Montserrat'] font-normal mb-6 lowercase`}>
                {t('forense.service.legal').split(' ')[0]}<DotSpan />{t('forense.service.legal').split(' ')[1]}
              </h1>
              <p className={`${styles.fontSizes.hero.subtitle} ${styles.colors.text.light} ${styles.spacing.mb.xl}`}>
                {t('forense.legal.desc')}
              </p>
            </div>
          </div>
        </section>

        {/* Introdução e Visão Geral */}
        <section className="py-24 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-16 items-start">
                <div className="w-full">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-['Montserrat'] font-normal text-gray-800 mb-6 lowercase">
                      {language === 'pt' && <><span className="text-[#00ade0]">consultoria técnica</span> especializada</>}
                      {language === 'en' && <>specialized <span className="text-[#00ade0]">technical consulting</span></>}
                      {language === 'es' && <><span className="text-[#00ade0]">consultoría técnica</span> especializada</>}
                    </h2>
                    <p className="text-gray-500 max-w-3xl mx-auto">
                      {t('forense.legal.intro')}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 max-w-4xl mx-auto">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {content.intro}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                      <div className="bg-white p-5 rounded-md border border-gray-100 shadow-sm">
                        <h4 className="font-medium text-gray-900 mb-2 lowercase">
                          <div className="h-2 w-2 rounded-full bg-[#00ade0] inline-block mr-2"></div>
                          {t('forense.legal.analysis.title')}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {t('forense.legal.analysis.desc')}
                        </p>
                      </div>
                      
                      <div className="bg-white p-5 rounded-md border border-gray-100 shadow-sm">
                        <h4 className="font-medium text-gray-900 mb-2 lowercase">
                          <div className="h-2 w-2 rounded-full bg-[#00ade0] inline-block mr-2"></div>
                          {t('forense.legal.translation.title')}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {t('forense.legal.translation.desc')}
                        </p>
                      </div>
                      
                      <div className="bg-white p-5 rounded-md border border-gray-100 shadow-sm">
                        <h4 className="font-medium text-gray-900 mb-2 lowercase">
                          <div className="h-2 w-2 rounded-full bg-[#00ade0] inline-block mr-2"></div>
                          {t('forense.legal.standards.title')}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {t('forense.legal.standards.desc')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços Principais */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-['Montserrat'] font-normal text-gray-800 mb-16 text-center lowercase">
                {t('forense.legal.section.title')}
              </h2>
              <div className="max-w-3xl mx-auto text-center mb-10">
                <p className="text-gray-500 text-sm">{t('forense.legal.section.desc')}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Consultoria Estratégica */}
                <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-[#00ade0]/30 flex flex-col h-full">
                  <div className="p-8 flex flex-col h-full">
                    <h3 className="text-xl font-['Montserrat'] font-normal mb-4 lowercase">
                      {language === 'pt' && <>consultoria <span className="text-[#00ade0]">estratégica</span></>}
                      {language === 'en' && <>strategic <span className="text-[#00ade0]">consulting</span></>}
                      {language === 'es' && <>consultoría <span className="text-[#00ade0]">estratégica</span></>}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                      {content.sections[0].content}
                    </p>
                    <div className="mt-auto pt-6 border-t border-gray-100">
                      <div className="flex justify-center text-xs text-[#00ade0]/80">
                        <div className="grid grid-cols-3 gap-2 w-full">
                          {language === 'pt' && (
                            <>
                              <span className="text-center">análise técnica</span>
                              <span className="text-center">avaliação prévia</span>
                              <span className="text-center">viabilidade técnica</span>
                            </>
                          )}
                          {language === 'en' && (
                            <>
                              <span className="text-center">technical analysis</span>
                              <span className="text-center">preliminary assessment</span>
                              <span className="text-center">technical feasibility</span>
                            </>
                          )}
                          {language === 'es' && (
                            <>
                              <span className="text-center">análisis técnico</span>
                              <span className="text-center">evaluación previa</span>
                              <span className="text-center">viabilidad técnica</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Assistência Técnica Processual */}
                <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-[#00ade0]/30 flex flex-col h-full">
                  <div className="p-8 flex flex-col h-full">
                    <h3 className="text-xl font-['Montserrat'] font-normal mb-4 lowercase">
                      {language === 'pt' && <>assistência <span className="text-[#00ade0]">técnica processual</span></>}
                      {language === 'en' && <>procedural <span className="text-[#00ade0]">technical assistance</span></>}
                      {language === 'es' && <>asistencia <span className="text-[#00ade0]">técnica procesal</span></>}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                      {content.sections[1].content}
                    </p>
                    <div className="mt-auto pt-6 border-t border-gray-100">
                      <div className="flex justify-center text-xs text-[#00ade0]/80">
                        <div className="grid grid-cols-3 gap-2 w-full">
                          {language === 'pt' && (
                            <>
                              <span className="text-center">formulação técnica</span>
                              <span className="text-center">contraprovas</span>
                              <span className="text-center">análise de laudo</span>
                            </>
                          )}
                          {language === 'en' && (
                            <>
                              <span className="text-center">technical formulation</span>
                              <span className="text-center">counter-evidence</span>
                              <span className="text-center">report analysis</span>
                            </>
                          )}
                          {language === 'es' && (
                            <>
                              <span className="text-center">formulación técnica</span>
                              <span className="text-center">contrapruebas</span>
                              <span className="text-center">análisis de informe</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Esclarecimentos Técnicos em Audiências */}
                <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-[#00ade0]/30 flex flex-col h-full">
                  <div className="p-8 flex flex-col h-full">
                    <h3 className="text-xl font-['Montserrat'] font-normal mb-4 lowercase">
                      {language === 'pt' && <>esclarecimentos <span className="text-[#00ade0]">em audiências</span></>}
                      {language === 'en' && <>clarification <span className="text-[#00ade0]">in hearings</span></>}
                      {language === 'es' && <>aclaraciones <span className="text-[#00ade0]">en audiencias</span></>}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                      {content.sections[2].content}
                    </p>
                    <div className="mt-auto pt-6 border-t border-gray-100">
                      <div className="flex justify-center text-xs text-[#00ade0]/80">
                        <div className="grid grid-cols-3 gap-2 w-full">
                          {language === 'pt' && (
                            <>
                              <span className="text-center">depoimento técnico</span>
                              <span className="text-center">pareceres</span>
                              <span className="text-center">simplificação técnica</span>
                            </>
                          )}
                          {language === 'en' && (
                            <>
                              <span className="text-center">technical testimony</span>
                              <span className="text-center">expert opinions</span>
                              <span className="text-center">technical simplification</span>
                            </>
                          )}
                          {language === 'es' && (
                            <>
                              <span className="text-center">testimonio técnico</span>
                              <span className="text-center">dictámenes</span>
                              <span className="text-center">simplificación técnica</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metodologia */}
        <section className="py-24 bg-[#0d1117] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-['Montserrat'] font-normal mb-16 text-center lowercase">
                {language === 'pt' && <>nossa <span className="text-[#00ade0]">metodologia</span></>}
                {language === 'en' && <>our <span className="text-[#00ade0]">methodology</span></>}
                {language === 'es' && <>nuestra <span className="text-[#00ade0]">metodología</span></>}
              </h2>
              <div className="space-y-10">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="md:w-1/3">
                    <div className="mb-4 flex items-center">
                      <span className="text-4xl font-light text-[#00ade0]">01</span>
                      <div className="ml-4 h-[1px] flex-grow bg-[#00ade0]/30"></div>
                    </div>
                    <h3 className="text-xl font-['Montserrat'] font-normal mb-3 lowercase">
                      análise <span className="text-[#00ade0]">preliminar</span>
                    </h3>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-gray-300 leading-relaxed">
                      avaliamos minuciosamente os documentos, relatórios e evidências disponíveis, identificando pontos críticos e oportunidades estratégicas. essa fase estabelece as bases para uma consultoria eficaz e direcionada aos objetivos do cliente.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="md:w-1/3">
                    <div className="mb-4 flex items-center">
                      <span className="text-4xl font-light text-[#00ade0]">02</span>
                      <div className="ml-4 h-[1px] flex-grow bg-[#00ade0]/30"></div>
                    </div>
                    <h3 className="text-xl font-['Montserrat'] font-normal mb-3 lowercase">
                      planejamento <span className="text-[#00ade0]">estratégico</span>
                    </h3>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-gray-300 leading-relaxed">
                      desenvolvemos uma estratégia personalizada que integra aspectos jurídicos e técnicos, estabelecendo uma linha de atuação clara e fundamentada. cada ação é meticulosamente planejada para maximizar o impacto positivo no caso.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="md:w-1/3">
                    <div className="mb-4 flex items-center">
                      <span className="text-4xl font-light text-[#00ade0]">03</span>
                      <div className="ml-4 h-[1px] flex-grow bg-[#00ade0]/30"></div>
                    </div>
                    <h3 className="text-xl font-['Montserrat'] font-normal mb-3 lowercase">
                      execução <span className="text-[#00ade0]">técnica</span>
                    </h3>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-gray-300 leading-relaxed">
                      implementamos as estratégias definidas com rigor científico e precisão técnica, garantindo que cada informação apresentada seja verificável e sustentável. toda a atividade é documentada seguindo padrões internacionais.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="md:w-1/3">
                    <div className="mb-4 flex items-center">
                      <span className="text-4xl font-light text-[#00ade0]">04</span>
                      <div className="ml-4 h-[1px] flex-grow bg-[#00ade0]/30"></div>
                    </div>
                    <h3 className="text-xl font-['Montserrat'] font-normal mb-3 lowercase">
                      comunicação <span className="text-[#00ade0]">eficaz</span>
                    </h3>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-gray-300 leading-relaxed">
                      traduzimos conceitos técnicos complexos em linguagem acessível e persuasiva, apropriada para o contexto jurídico. nossas apresentações são estruturadas para transmitir clareza e convicção, facilitando o entendimento por todos os envolvidos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-['Montserrat'] font-normal mb-16 text-center lowercase">
                {language === 'pt' && <>benefícios do nosso <span className="text-[#00ade0]">suporte à área legal</span></>}
                {language === 'en' && <>benefits of our <span className="text-[#00ade0]">technical support for the legal field</span></>}
                {language === 'es' && <>beneficios de nuestro <span className="text-[#00ade0]">soporte técnico para el área legal</span></>}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex">
                  <div className="mr-6">
                    <div className="h-12 w-12 border border-[#00ade0] rounded-full flex items-center justify-center">
                      <div className="h-8 w-8 bg-[#00ade0] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-['Montserrat'] font-medium mb-3 lowercase">
                      argumentação <span className="text-[#00ade0]">robusta</span>
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      fortalecemos argumentos jurídicos com embasamento técnico sólido, aumentando sua credibilidade e poder de persuasão perante os tribunais e demais autoridades.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-6">
                    <div className="h-12 w-12 border border-[#00ade0] rounded-full flex items-center justify-center">
                      <div className="h-8 w-8 bg-[#00ade0] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-['Montserrat'] font-medium mb-3 lowercase">
                      identificação de <span className="text-[#00ade0]">vulnerabilidades</span>
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      analisamos criticamente as evidências e argumentos técnicos apresentados pela parte contrária, identificando falhas metodológicas e inconsistências que podem ser exploradas estrategicamente.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-6">
                    <div className="h-12 w-12 border border-[#00ade0] rounded-full flex items-center justify-center">
                      <div className="h-8 w-8 bg-[#00ade0] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-['Montserrat'] font-medium mb-3 lowercase">
                      clareza <span className="text-[#00ade0]">técnica</span>
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      facilitamos o entendimento de questões técnicas complexas por parte de juízes, advogados e demais envolvidos no processo, evitando mal-entendidos e interpretações equivocadas.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-6">
                    <div className="h-12 w-12 border border-[#00ade0] rounded-full flex items-center justify-center">
                      <div className="h-8 w-8 bg-[#00ade0] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-['Montserrat'] font-medium mb-3 lowercase">
                      vantagem <span className="text-[#00ade0]">competitiva</span>
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      proporcionamos um diferencial estratégico em casos complexos, onde o domínio do aspecto técnico das evidências digitais pode ser decisivo para o resultado final do processo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#00ade0]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-['Montserrat'] font-normal mb-6 text-white lowercase">
                {content.cta.title}
              </h2>
              <div className="mt-8">
                <a href="/contato" 
                  className="inline-block py-3 px-8 bg-white text-[#00ade0] rounded-md font-medium transition-all hover:shadow-lg hover:bg-gray-50">
                  {content.cta.button}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}