import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../../SiteContext';
import SiteLayout from '../../layout/SiteLayout';
import { forenseStyles as styles } from '../styles';
import { defaultContent as translations } from '../translations/services/legal-support';

export default function ForenseLegalSupportPage() {
  const DotSpan = () => <span className="text-[#00ade0]">.</span>;
  const { siteConfig } = useSite();
  const { language, t } = useI18n();
  
  // Buscar conteúdo da página específico para o serviço
  const { data: pageContent, isLoading, isError } = useQuery({
    queryKey: ['/api/content/services/legal-support', language, siteConfig.code],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/content/services/legal-support?lang=${language}&site=${siteConfig.code}`);
        if (!res.ok) return null;
        return res.json();
      } catch (error) {
        console.error('Error fetching content:', error);
        return null;
      }
    },
    retry: false
  });
  
  // Conteúdo padrão caso não haja conteúdo específico no banco de dados
  
  // Escolher o conteúdo baseado na linguagem atual
  const content = translations[language] || translations.en;
  
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
        <section className="intro flex items-center justify-center text-white bg-[#0d1117] relative overflow-hidden" style={{ minHeight: "60vh" }}>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className={`${styles.fontSizes.hero.title} font-['Montserrat'] font-normal mb-6 lowercase`}>
                {language === 'pt' && <>suporte<DotSpan />legal</>}
                {language === 'en' && <>legal<DotSpan />support</>}
                {language === 'es' && <>soporte<DotSpan />legal</>}
              </h1>
              <p className={`${styles.fontSizes.hero.subtitle} ${styles.colors.text.light} ${styles.spacing.mb.xl}`}>
                {t('forense.legal.desc')}
              </p>
            </div>
          </div>
        </section>

        {/* Introdução e Visão Geral */}
        <section className="conteudo bg-white border-b border-gray-100" style={{ padding: "4rem 0" }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-16 items-start">
                <div className="w-full">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-['Montserrat'] font-normal mb-6 lowercase">
                      {language === 'pt' && (
                        <>
                          <span className="text-white bg-[#00ade0] px-2 py-1 rounded-sm">consultoria técnica</span>
                          <span className="ml-2">especializada</span>
                        </>
                      )}
                      {language === 'en' && (
                        <>
                          <span className="mr-2">specialized</span>
                          <span className="text-white bg-[#00ade0] px-2 py-1 rounded-sm">technical consulting</span>
                        </>
                      )}
                      {language === 'es' && (
                        <>
                          <span className="text-white bg-[#00ade0] px-2 py-1 rounded-sm">consultoría técnica</span>
                          <span className="ml-2">especializada</span>
                        </>
                      )}
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
        <section className="conteudo bg-gray-50" style={{ padding: "4rem 0" }}>
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
        <section className="conteudo bg-[#0d1117] text-white" style={{ padding: "4rem 0" }}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-['Montserrat'] font-normal mb-16 text-center lowercase">
                {language === 'pt' && (
                  <>
                    nossa <span className="text-white bg-[#00ade0] px-2 py-1 rounded-sm">metodologia</span>
                  </>
                )}
                {language === 'en' && (
                  <>
                    our <span className="text-white bg-[#00ade0] px-2 py-1 rounded-sm">methodology</span>
                  </>
                )}
                {language === 'es' && (
                  <>
                    nuestra <span className="text-white bg-[#00ade0] px-2 py-1 rounded-sm">metodología</span>
                  </>
                )}
              </h2>
              <div className="space-y-10">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="md:w-1/3">
                    <div className="mb-4 flex items-center">
                      <span className="text-4xl font-light text-[#00ade0]">01</span>
                      <div className="ml-4 h-[1px] flex-grow bg-[#00ade0]/30"></div>
                    </div>
                    <h3 className="text-xl font-['Montserrat'] font-normal mb-3 lowercase">
                      {language === 'pt' && <>análise <span className="text-[#00ade0]">preliminar</span></>}
                      {language === 'en' && <>preliminary <span className="text-[#00ade0]">analysis</span></>}
                      {language === 'es' && <>análisis <span className="text-[#00ade0]">preliminar</span></>}
                    </h3>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-gray-300 leading-relaxed">
                      {language === 'pt' && 'avaliamos minuciosamente os documentos, relatórios e evidências disponíveis, identificando pontos críticos e oportunidades estratégicas. essa fase estabelece as bases para uma consultoria eficaz e direcionada aos objetivos do cliente.'}
                      {language === 'en' && 'we thoroughly evaluate the available documents, reports, and evidence, identifying critical points and strategic opportunities. this phase establishes the foundation for effective consulting directed at the client\'s objectives.'}
                      {language === 'es' && 'evaluamos minuciosamente los documentos, informes y evidencias disponibles, identificando puntos críticos y oportunidades estratégicas. esta fase establece las bases para una consultoría eficaz y dirigida a los objetivos del cliente.'}
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
                      {language === 'pt' && <>planejamento <span className="text-[#00ade0]">estratégico</span></>}
                      {language === 'en' && <>strategic <span className="text-[#00ade0]">planning</span></>}
                      {language === 'es' && <>planificación <span className="text-[#00ade0]">estratégica</span></>}
                    </h3>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-gray-300 leading-relaxed">
                      {language === 'pt' && 'desenvolvemos uma estratégia personalizada que integra aspectos jurídicos e técnicos, estabelecendo uma linha de atuação clara e fundamentada. cada ação é meticulosamente planejada para maximizar o impacto positivo no caso.'}
                      {language === 'en' && 'we develop a personalized strategy that integrates legal and technical aspects, establishing a clear and well-founded course of action. each action is meticulously planned to maximize the positive impact on the case.'}
                      {language === 'es' && 'desarrollamos una estrategia personalizada que integra aspectos jurídicos y técnicos, estableciendo una línea de actuación clara y fundamentada. cada acción es meticulosamente planificada para maximizar el impacto positivo en el caso.'}
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
                      {language === 'pt' && <>execução <span className="text-[#00ade0]">técnica</span></>}
                      {language === 'en' && <>technical <span className="text-[#00ade0]">execution</span></>}
                      {language === 'es' && <>ejecución <span className="text-[#00ade0]">técnica</span></>}
                    </h3>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-gray-300 leading-relaxed">
                      {language === 'pt' && 'implementamos as estratégias definidas com rigor científico e precisão técnica, garantindo que cada informação apresentada seja verificável e sustentável. toda a atividade é documentada seguindo padrões internacionais.'}
                      {language === 'en' && 'we implement the defined strategies with scientific rigor and technical precision, ensuring that each piece of information presented is verifiable and sustainable. all activity is documented following international standards.'}
                      {language === 'es' && 'implementamos las estrategias definidas con rigor científico y precisión técnica, garantizando que cada información presentada sea verificable y sostenible. toda la actividad está documentada siguiendo estándares internacionales.'}
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
                      {language === 'pt' && <>comunicação <span className="text-[#00ade0]">eficaz</span></>}
                      {language === 'en' && <>effective <span className="text-[#00ade0]">communication</span></>}
                      {language === 'es' && <>comunicación <span className="text-[#00ade0]">eficaz</span></>}
                    </h3>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-gray-300 leading-relaxed">
                      {language === 'pt' && 'traduzimos conceitos técnicos complexos em linguagem acessível e persuasiva, apropriada para o contexto jurídico. nossas apresentações são estruturadas para transmitir clareza e convicção, facilitando o entendimento por todos os envolvidos.'}
                      {language === 'en' && 'we translate complex technical concepts into accessible and persuasive language, appropriate for the legal context. our presentations are structured to convey clarity and conviction, facilitating understanding by all involved.'}
                      {language === 'es' && 'traducimos conceptos técnicos complejos en lenguaje accesible y persuasivo, apropiado para el contexto jurídico. nuestras presentaciones están estructuradas para transmitir claridad y convicción, facilitando la comprensión por parte de todos los involucrados.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="conteudo bg-gray-50" style={{ padding: "4rem 0" }}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-['Montserrat'] font-normal mb-16 text-center lowercase">
                {language === 'pt' && (
                  <>
                    benefícios do nosso <span className="text-white bg-[#00ade0] px-2 py-1 rounded-sm">suporte à área legal</span>
                  </>
                )}
                {language === 'en' && (
                  <>
                    benefits of our <span className="text-white bg-[#00ade0] px-2 py-1 rounded-sm">technical support for the legal field</span>
                  </>
                )}
                {language === 'es' && (
                  <>
                    beneficios de nuestro <span className="text-white bg-[#00ade0] px-2 py-1 rounded-sm">soporte técnico para el área legal</span>
                  </>
                )}
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
                      {language === 'pt' && <>argumentação <span className="text-[#00ade0]">robusta</span></>}
                      {language === 'en' && <>robust <span className="text-[#00ade0]">argumentation</span></>}
                      {language === 'es' && <>argumentación <span className="text-[#00ade0]">sólida</span></>}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {language === 'pt' && 'fortalecemos argumentos jurídicos com embasamento técnico sólido, aumentando sua credibilidade e poder de persuasão perante os tribunais e demais autoridades.'}
                      {language === 'en' && 'we strengthen legal arguments with solid technical foundation, increasing their credibility and persuasive power before courts and other authorities.'}
                      {language === 'es' && 'fortalecemos argumentos jurídicos con base técnica sólida, aumentando su credibilidad y poder de persuasión ante los tribunales y demás autoridades.'}
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
                      {language === 'pt' && <>identificação de <span className="text-[#00ade0]">vulnerabilidades</span></>}
                      {language === 'en' && <>vulnerability <span className="text-[#00ade0]">identification</span></>}
                      {language === 'es' && <>identificación de <span className="text-[#00ade0]">vulnerabilidades</span></>}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {language === 'pt' && 'analisamos criticamente as evidências e argumentos técnicos apresentados pela parte contrária, identificando falhas metodológicas e inconsistências que podem ser exploradas estrategicamente.'}
                      {language === 'en' && 'we critically analyze evidence and technical arguments presented by the opposing party, identifying methodological flaws and inconsistencies that can be strategically exploited.'}
                      {language === 'es' && 'analizamos críticamente las evidencias y argumentos técnicos presentados por la parte contraria, identificando fallas metodológicas e inconsistencias que pueden ser explotadas estratégicamente.'}
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
                      {language === 'pt' && <>clareza <span className="text-[#00ade0]">técnica</span></>}
                      {language === 'en' && <>technical <span className="text-[#00ade0]">clarity</span></>}
                      {language === 'es' && <>claridad <span className="text-[#00ade0]">técnica</span></>}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {language === 'pt' && 'facilitamos o entendimento de questões técnicas complexas por parte de juízes, advogados e demais envolvidos no processo, evitando mal-entendidos e interpretações equivocadas.'}
                      {language === 'en' && 'we facilitate the understanding of complex technical issues by judges, lawyers, and others involved in the process, avoiding misunderstandings and misinterpretations.'}
                      {language === 'es' && 'facilitamos la comprensión de cuestiones técnicas complejas por parte de jueces, abogados y demás involucrados en el proceso, evitando malentendidos e interpretaciones erróneas.'}
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
                      {language === 'pt' && <>vantagem <span className="text-[#00ade0]">competitiva</span></>}
                      {language === 'en' && <>competitive <span className="text-[#00ade0]">advantage</span></>}
                      {language === 'es' && <>ventaja <span className="text-[#00ade0]">competitiva</span></>}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {language === 'pt' && 'proporcionamos um diferencial estratégico em casos complexos, onde o domínio do aspecto técnico das evidências digitais pode ser decisivo para o resultado final do processo.'}
                      {language === 'en' && 'we provide a strategic advantage in complex cases, where mastery of the technical aspects of digital evidence can be decisive for the final outcome of the process.'}
                      {language === 'es' && 'proporcionamos una ventaja estratégica en casos complejos, donde el dominio del aspecto técnico de las evidencias digitales puede ser decisivo para el resultado final del proceso.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="contato bg-[#00ade0] flex items-center" style={{ minHeight: "400px" }}>
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
