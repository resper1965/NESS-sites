import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../../SiteContext';
import SiteLayout from '../../layout/SiteLayout';
import { forenseStyles as styles } from '../styles';

export default function ForenseCorporateInvestigationsPage() {
  const DotSpan = () => <span className="text-[#00ade0]">.</span>;
  const { siteConfig } = useSite();
  const { language, t } = useI18n();
  
  // Buscar conteúdo da página específico para o serviço
  const { data: pageContent, isLoading, isError } = useQuery({
    queryKey: ['/api/content/services/corporate-investigations', language, siteConfig.code],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/content/services/corporate-investigations?lang=${language}&site=${siteConfig.code}`);
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
  const defaultContent = {
    pt: {
      title: 'investigações.corporativas',
      description: 'investigações e auditoria digital para ambientes corporativos',
      intro: 'nossa divisão de investigações corporativas oferece soluções especializadas para esclarecer incidentes, investigar possíveis fraudes e garantir a integridade dos ativos digitais corporativos, usando metodologias forenses avançadas.',
      sections: [
        {
          title: 'investigação de incidentes',
          content: 'análise detalhada de dados para esclarecer incidentes, violações de políticas internas ou fraudes, permitindo a identificação precisa dos fatos ocorridos através de técnicas forenses avançadas.'
        },
        {
          title: 'auditoria digital',
          content: 'verificação de possíveis usos indevidos de recursos digitais, visando à integridade corporativa e à conformidade com normas internas e externas, usando metodologias não intrusivas.'
        },
        {
          title: 'perícia computacional',
          content: 'exame técnico especializado de dispositivos e sistemas corporativos para a coleta de evidências digitais, preservando a cadeia de custódia e a validade legal das informações recuperadas.'
        }
      ],
      cta: {
        title: 'precisa de investigação digital especializada?',
        button: 'entre em contato'
      }
    },
    en: {
      title: 'corporate.investigations',
      description: 'digital investigations and auditing for corporate environments',
      intro: 'our corporate investigations division offers specialized solutions to clarify incidents, investigate potential fraud, and ensure the integrity of corporate digital assets using advanced forensic methodologies.',
      sections: [
        {
          title: 'incident investigation',
          content: 'detailed data analysis to clarify incidents, internal policy violations, or fraud, allowing precise identification of the facts through advanced forensic techniques.'
        },
        {
          title: 'digital audit',
          content: 'verification of possible misuse of digital resources, aimed at corporate integrity and compliance with internal and external standards, using non-intrusive methodologies.'
        },
        {
          title: 'computer forensics',
          content: 'specialized technical examination of corporate devices and systems for the collection of digital evidence, preserving the chain of custody and legal validity of recovered information.'
        }
      ],
      cta: {
        title: 'need specialized digital investigation?',
        button: 'contact us'
      }
    },
    es: {
      title: 'investigaciones.corporativas',
      description: 'investigaciones y auditoría digital para entornos corporativos',
      intro: 'nuestra división de investigaciones corporativas ofrece soluciones especializadas para esclarecer incidentes, investigar posibles fraudes y garantizar la integridad de los activos digitales corporativos utilizando metodologías forenses avanzadas.',
      sections: [
        {
          title: 'investigación de incidentes',
          content: 'análisis detallado de datos para esclarecer incidentes, violaciones de políticas internas o fraudes, permitiendo la identificación precisa de los hechos ocurridos a través de técnicas forenses avanzadas.'
        },
        {
          title: 'auditoría digital',
          content: 'verificación de posibles usos indebidos de recursos digitales, buscando la integridad corporativa y la conformidad con normas internas y externas, utilizando metodologías no intrusivas.'
        },
        {
          title: 'peritaje computacional',
          content: 'examen técnico especializado de dispositivos y sistemas corporativos para la recolección de evidencias digitales, preservando la cadena de custodia y la validez legal de la información recuperada.'
        }
      ],
      cta: {
        title: '¿necesita una investigación digital especializada?',
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
        <section className="intro flex items-center justify-center text-white bg-[#0d1117] relative overflow-hidden" style={{ minHeight: "60vh" }}>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className={`${styles.fontSizes.hero.title} font-['Montserrat'] font-normal mb-6 lowercase`}>
                {t('forense.service.corporate').split(' ')[0]}<DotSpan />{t('forense.service.corporate').split(' ')[1]}
              </h1>
              <p className={`${styles.fontSizes.hero.subtitle} ${styles.colors.text.light} ${styles.spacing.mb.xl}`}>
                {t('forense.corporate.desc')}
              </p>
            </div>
          </div>
        </section>

        {/* Introdução e Visão Geral */}
        <section className="conteudo bg-white border-b border-gray-100" style={{ padding: "4rem 0" }}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-['Montserrat'] font-normal text-gray-800 mb-6 lowercase">
                  {t('forense.corporate.title')}
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto mb-12">
                  {content.intro}
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-['Montserrat'] font-normal text-gray-800 mb-4 lowercase">
                      {language === 'pt' && (<><span className="text-[#00ade0]">discreta</span> e precisa</>)}
                      {language === 'en' && (<><span className="text-[#00ade0]">discreet</span> and precise</>)}
                      {language === 'es' && (<><span className="text-[#00ade0]">discreta</span> y precisa</>)}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6">
                      {language === 'pt' && 'nossas investigações são conduzidas com máxima discrição e precisão técnica, minimizando impactos nas operações diárias e preservando a confidencialidade em todas as etapas do processo.'}
                      {language === 'en' && 'our investigations are conducted with maximum discretion and technical precision, minimizing impacts on daily operations and preserving confidentiality in all stages of the process.'}
                      {language === 'es' && 'nuestras investigaciones se realizan con máxima discreción y precisión técnica, minimizando el impacto en las operaciones diarias y preservando la confidencialidad en todas las etapas del proceso.'}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {language === 'pt' && 'utilizamos metodologias forenses que asseguram a integridade das evidências digitais, permitindo sua utilização em processos internos ou, quando necessário, em procedimentos legais.'}
                      {language === 'en' && 'we use forensic methodologies that ensure the integrity of digital evidence, allowing its use in internal processes or, when necessary, in legal proceedings.'}
                      {language === 'es' && 'utilizamos metodologías forenses que aseguran la integridad de las evidencias digitales, permitiendo su uso en procesos internos o, cuando sea necesario, en procedimientos legales.'}
                    </p>
                  </div>
                  
                  <div className="border-l border-gray-200 pl-8">
                    <h3 className="text-xl font-['Montserrat'] font-normal text-gray-800 mb-4 lowercase">
                      {language === 'pt' && <>benefícios <span className="text-[#00ade0]">estratégicos</span></>}
                      {language === 'en' && <>strategic <span className="text-[#00ade0]">benefits</span></>}
                      {language === 'es' && <>beneficios <span className="text-[#00ade0]">estratégicos</span></>}
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#00ade0] mt-1.5 mr-2 flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm">
                          {language === 'pt' && 'identificação precisa de incidentes e violações de políticas internas'}
                          {language === 'en' && 'precise identification of incidents and violations of internal policies'}
                          {language === 'es' && 'identificación precisa de incidentes y violaciones de políticas internas'}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#00ade0] mt-1.5 mr-2 flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm">
                          {language === 'pt' && 'preservação adequada de evidências para processos disciplinares ou judiciais'}
                          {language === 'en' && 'proper preservation of evidence for disciplinary or judicial proceedings'}
                          {language === 'es' && 'preservación adecuada de evidencias para procesos disciplinarios o judiciales'}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#00ade0] mt-1.5 mr-2 flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm">
                          {language === 'pt' && 'recuperação de dados deletados ou ocultos relevantes para investigações internas'}
                          {language === 'en' && 'recovery of deleted or hidden data relevant to internal investigations'}
                          {language === 'es' && 'recuperación de datos eliminados u ocultos relevantes para investigaciones internas'}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#00ade0] mt-1.5 mr-2 flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm">
                          {language === 'pt' && 'relatórios técnicos detalhados com linguagem acessível para tomada de decisão'}
                          {language === 'en' && 'detailed technical reports with accessible language for decision making'}
                          {language === 'es' && 'informes técnicos detallados con lenguaje accesible para la toma de decisiones'}
                        </span>
                      </li>
                    </ul>
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
                {language === 'pt' && <>serviços de <span className="text-[#00ade0]">investigação</span></>}
                {language === 'en' && <>investigation <span className="text-[#00ade0]">services</span></>}
                {language === 'es' && <>servicios de <span className="text-[#00ade0]">investigación</span></>}
              </h2>
              <div className="max-w-3xl mx-auto text-center mb-10">
                <p className="text-gray-500 text-sm">
                  {language === 'pt' && 'oferecemos serviços especializados em investigação digital para ambientes corporativos, com foco em detectar e documentar incidentes.'}
                  {language === 'en' && 'we offer specialized digital investigation services for corporate environments, focusing on detecting and documenting incidents.'}
                  {language === 'es' && 'ofrecemos servicios especializados en investigación digital para entornos corporativos, con enfoque en detectar y documentar incidentes.'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Investigação de Incidentes */}
                <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-[#00ade0]/30">
                  <div className="p-8">
                    <h3 className="text-xl font-['Montserrat'] font-normal mb-4 lowercase">
                      {language === 'pt' && <>investigação de <span className="text-[#00ade0]">incidentes</span></>}
                      {language === 'en' && <>incident <span className="text-[#00ade0]">investigation</span></>}
                      {language === 'es' && <>investigación de <span className="text-[#00ade0]">incidentes</span></>}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {content.sections[0].content}
                    </p>
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex justify-center text-xs text-gray-500">
                        <div className="grid grid-cols-3 gap-2 w-full">
                          <span className="text-center">
                            {language === 'pt' && 'fraudes'}
                            {language === 'en' && 'fraud'}
                            {language === 'es' && 'fraudes'}
                          </span>
                          <span className="text-center">
                            {language === 'pt' && 'violações'}
                            {language === 'en' && 'violations'}
                            {language === 'es' && 'violaciones'}
                          </span>
                          <span className="text-center">
                            {language === 'pt' && 'incidentes'}
                            {language === 'en' && 'incidents'}
                            {language === 'es' && 'incidentes'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Auditoria Digital */}
                <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-[#00ade0]/30">
                  <div className="p-8">
                    <h3 className="text-xl font-['Montserrat'] font-normal mb-4 lowercase">
                      {language === 'pt' && <>auditoria <span className="text-[#00ade0]">digital</span></>}
                      {language === 'en' && <>digital <span className="text-[#00ade0]">audit</span></>}
                      {language === 'es' && <>auditoría <span className="text-[#00ade0]">digital</span></>}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {content.sections[1].content}
                    </p>
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex justify-center text-xs text-gray-500">
                        <div className="grid grid-cols-3 gap-2 w-full">
                          <span className="text-center">
                            {language === 'pt' && 'conformidade'}
                            {language === 'en' && 'compliance'}
                            {language === 'es' && 'conformidad'}
                          </span>
                          <span className="text-center">
                            {language === 'pt' && 'integridade'}
                            {language === 'en' && 'integrity'}
                            {language === 'es' && 'integridad'}
                          </span>
                          <span className="text-center">
                            {language === 'pt' && 'verificação'}
                            {language === 'en' && 'verification'}
                            {language === 'es' && 'verificación'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Perícia Computacional */}
                <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-[#00ade0]/30">
                  <div className="p-8">
                    <h3 className="text-xl font-['Montserrat'] font-normal mb-4 lowercase">
                      {language === 'pt' && <>perícia <span className="text-[#00ade0]">computacional</span></>}
                      {language === 'en' && <>computer <span className="text-[#00ade0]">forensics</span></>}
                      {language === 'es' && <>peritaje <span className="text-[#00ade0]">computacional</span></>}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {content.sections[2].content}
                    </p>
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex justify-center text-xs text-gray-500">
                        <div className="grid grid-cols-3 gap-2 w-full">
                          <span className="text-center">
                            {language === 'pt' && 'análise'}
                            {language === 'en' && 'analysis'}
                            {language === 'es' && 'análisis'}
                          </span>
                          <span className="text-center">
                            {language === 'pt' && 'recuperação'}
                            {language === 'en' && 'recovery'}
                            {language === 'es' && 'recuperación'}
                          </span>
                          <span className="text-center">
                            {language === 'pt' && 'documentação'}
                            {language === 'en' && 'documentation'}
                            {language === 'es' && 'documentación'}
                          </span>
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
                {language === 'pt' && <>nossa <span className="text-[#00ade0]">metodologia</span></>}
                {language === 'en' && <>our <span className="text-[#00ade0]">methodology</span></>}
                {language === 'es' && <>nuestra <span className="text-[#00ade0]">metodología</span></>}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                <div className="relative pl-10 md:pl-0">
                  <div className="absolute left-0 top-0 flex items-center justify-center h-8 w-8 rounded-full bg-[#00ade0]/10 text-[#00ade0]">
                    <span className="text-xl font-light">1</span>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-['Montserrat'] font-normal mb-3 lowercase">
                      {language === 'pt' && <>avaliação <span className="text-[#00ade0]">inicial</span></>}
                      {language === 'en' && <>initial <span className="text-[#00ade0]">assessment</span></>}
                      {language === 'es' && <>evaluación <span className="text-[#00ade0]">inicial</span></>}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {language === 'pt' && 'análise preliminar do cenário, definição do escopo da investigação e identificação dos recursos digitais relevantes para o caso. nesta fase, estabelecemos os objetivos e as limitações da investigação.'}
                    {language === 'en' && 'preliminary analysis of the scenario, definition of the investigation scope, and identification of relevant digital resources for the case. in this phase, we establish the objectives and limitations of the investigation.'}
                    {language === 'es' && 'análisis preliminar del escenario, definición del alcance de la investigación e identificación de los recursos digitales relevantes para el caso. en esta fase, establecemos los objetivos y las limitaciones de la investigación.'}
                  </p>
                </div>
                
                <div className="relative pl-10 md:pl-0">
                  <div className="absolute left-0 top-0 flex items-center justify-center h-8 w-8 rounded-full bg-[#00ade0]/10 text-[#00ade0]">
                    <span className="text-xl font-light">2</span>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-['Montserrat'] font-normal mb-3 lowercase">
                      {language === 'pt' && <>coleta <span className="text-[#00ade0]">forense</span></>}
                      {language === 'en' && <>forensic <span className="text-[#00ade0]">collection</span></>}
                      {language === 'es' && <>recolección <span className="text-[#00ade0]">forense</span></>}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {language === 'pt' && 'aquisição de dados digitais usando técnicas forenses que preservam a integridade das evidências. criamos cópias forenses dos dispositivos ou sistemas relevantes seguindo protocolos rigorosos de cadeia de custódia.'}
                    {language === 'en' && 'acquisition of digital data using forensic techniques that preserve the integrity of evidence. we create forensic copies of relevant devices or systems following strict chain of custody protocols.'}
                    {language === 'es' && 'adquisición de datos digitales utilizando técnicas forenses que preservan la integridad de las evidencias. creamos copias forenses de los dispositivos o sistemas relevantes siguiendo protocolos rigurosos de cadena de custodia.'}
                  </p>
                </div>
                
                <div className="relative pl-10 md:pl-0">
                  <div className="absolute left-0 top-0 flex items-center justify-center h-8 w-8 rounded-full bg-[#00ade0]/10 text-[#00ade0]">
                    <span className="text-xl font-light">3</span>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-['Montserrat'] font-normal mb-3 lowercase">
                      {language === 'pt' && <>análise <span className="text-[#00ade0]">técnica</span></>}
                      {language === 'en' && <>technical <span className="text-[#00ade0]">analysis</span></>}
                      {language === 'es' && <>análisis <span className="text-[#00ade0]">técnico</span></>}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {language === 'pt' && 'exame detalhado das evidências coletadas, incluindo a recuperação de arquivos excluídos, análise de logs, histórico de atividades, comunicações digitais e outros elementos relevantes para a investigação.'}
                    {language === 'en' && 'detailed examination of collected evidence, including recovery of deleted files, log analysis, activity history, digital communications, and other elements relevant to the investigation.'}
                    {language === 'es' && 'examen detallado de las evidencias recolectadas, incluyendo la recuperación de archivos eliminados, análisis de registros, historial de actividades, comunicaciones digitales y otros elementos relevantes para la investigación.'}
                  </p>
                </div>
                
                <div className="relative pl-10 md:pl-0">
                  <div className="absolute left-0 top-0 flex items-center justify-center h-8 w-8 rounded-full bg-[#00ade0]/10 text-[#00ade0]">
                    <span className="text-xl font-light">4</span>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-['Montserrat'] font-normal mb-3 lowercase">
                      {language === 'pt' && <>documentação <span className="text-[#00ade0]">e relatório</span></>}
                      {language === 'en' && <>documentation <span className="text-[#00ade0]">and reporting</span></>}
                      {language === 'es' && <>documentación <span className="text-[#00ade0]">e informe</span></>}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {language === 'pt' && 'compilação dos achados em relatório técnico detalhado e compreensível, contendo a metodologia, as evidências encontradas e as conclusões técnicas, apresentadas de forma clara para apoiar a tomada de decisões.'}
                    {language === 'en' && 'compilation of findings into a detailed and comprehensible technical report, containing the methodology, evidence found, and technical conclusions, presented clearly to support decision-making.'}
                    {language === 'es' && 'compilación de hallazgos en un informe técnico detallado y comprensible, que contiene la metodología, las evidencias encontradas y las conclusiones técnicas, presentadas de forma clara para apoyar la toma de decisiones.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Casos de Uso */}
        <section className="conteudo bg-white" style={{ padding: "4rem 0" }}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-['Montserrat'] font-normal mb-16 text-center lowercase">
                casos de <span className="text-[#00ade0]">uso</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-50 rounded-lg p-8 border border-gray-100">
                  <h3 className="text-lg font-['Montserrat'] font-medium mb-4 text-gray-800 lowercase">
                    suspeita de <span className="text-[#00ade0]">fraude interna</span>
                  </h3>
                  <p className="text-gray-600 text-sm">
                    investigação de atividades suspeitas de funcionários, como desvio de recursos, manipulação de dados ou uso indevido de informações corporativas, usando técnicas forenses para recuperar e analisar evidências digitais.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-8 border border-gray-100">
                  <h3 className="text-lg font-['Montserrat'] font-medium mb-4 text-gray-800 lowercase">
                    vazamento de <span className="text-[#00ade0]">informações</span>
                  </h3>
                  <p className="text-gray-600 text-sm">
                    identificação da origem e extensão de incidentes de vazamento de dados confidenciais, determinando como ocorreu o incidente, quais dados foram comprometidos e quem teve acesso às informações.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-8 border border-gray-100">
                  <h3 className="text-lg font-['Montserrat'] font-medium mb-4 text-gray-800 lowercase">
                    {language === 'pt' && <>verificação de <span className="text-[#00ade0]">conformidade</span></>}
                    {language === 'en' && <>compliance <span className="text-[#00ade0]">verification</span></>}
                    {language === 'es' && <>verificación de <span className="text-[#00ade0]">conformidad</span></>}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'pt' && 'avaliação técnica do cumprimento de políticas de segurança da informação e normas regulatórias, identificando possíveis violações e fornecendo recomendações para assegurar a conformidade.'}
                    {language === 'en' && 'technical assessment of compliance with information security policies and regulatory standards, identifying potential violations and providing recommendations to ensure compliance.'}
                    {language === 'es' && 'evaluación técnica del cumplimiento de políticas de seguridad de la información y normas regulatorias, identificando posibles violaciones y proporcionando recomendaciones para asegurar la conformidad.'}
                  </p>
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
                {t('forense.cta.title')}
              </h2>
              <div className="mt-8">
                <a href={`/site/forense/contact`}
                  className="inline-block py-3 px-8 bg-white text-[#00ade0] rounded-md font-medium transition-all hover:shadow-lg hover:bg-gray-50">
                  {t('forense.cta.button')}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}