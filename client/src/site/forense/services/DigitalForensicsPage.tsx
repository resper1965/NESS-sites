import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../../SiteContext';
import SiteLayout from '../../layout/SiteLayout';
import { forenseStyles as styles } from '../styles';
import { defaultContent as translations } from '../translations/services/digital-forensics';

export default function ForenseDigitalForensicsPage() {
  const DotSpan = () => <span className="text-[#00ade0]">.</span>;
  const { siteConfig } = useSite();
  const { language, t } = useI18n();
  
  // Buscar conteúdo da página específico para o serviço
  const { data: pageContent, isLoading } = useQuery({
    queryKey: ['/api/content/services/digital-forensics', language, siteConfig.code],
    queryFn: async () => {
      const res = await fetch(`/api/content/services/digital-forensics?lang=${language}&site=${siteConfig.code}`);
      if (!res.ok) throw new Error('Failed to fetch content');
      return res.json();
    }
  });
  
  // Seleciona o conteúdo de acordo com o idioma atual
  const content = translations[language] || translations.en;
  
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
        <section className="intro flex items-center justify-center text-white bg-[#0d1117] relative overflow-hidden" style={{ minHeight: "60vh" }}>
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
        <section className="conteudo bg-white" style={{ padding: "4rem 0" }}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-10">
                  <h2 className={`${styles.fontSizes.section.title} font-['Montserrat'] font-normal ${styles.colors.text.dark} ${styles.spacing.mb.large} lowercase`}>
                    {t('forense.digital.title')} <span className={styles.colors.primary}>{t('forense.service.digital')}</span>?
                  </h2>
                  <p className={`${styles.colors.text.medium} ${styles.fontSizes.text.regular} ${styles.spacing.mb.medium} leading-relaxed`}>
                    {t('forense.digital.description1')}
                  </p>
                  <p className={`${styles.colors.text.medium} ${styles.fontSizes.text.regular} ${styles.spacing.mb.medium} leading-relaxed`}>
                    {t('forense.digital.description2').replace('forense dot io', 'forense')}<DotSpan />io
                  </p>
                  <p className={`${styles.colors.text.medium} ${styles.fontSizes.text.regular} leading-relaxed`}>
                    {t('forense.digital.description3')}
                  </p>
                </div>
                <div className="md:w-1/2 bg-[#00ade0]/5 rounded-lg p-8 border border-[#00ade0]/20">
                  <h3 className={`${styles.fontSizes.section.subtitle} font-['Montserrat'] font-normal ${styles.colors.text.dark} ${styles.spacing.mb.medium} lowercase`}>
                    {t('forense.digital.why')}
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-[#00ade0] rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-white">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1 lowercase text-sm">{t('forense.digital.evidence.title')}</h4>
                        <p className="text-sm text-gray-600">{t('forense.digital.evidence.desc')}</p>
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
        <section className="conteudo bg-[#0d1117] text-white" style={{ padding: "4rem 0" }}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-['Montserrat'] font-normal mb-12 text-center lowercase">
                {language === 'pt' && <>ambientes de <span className="text-[#00ade0]">coleta digital</span></>}
                {language === 'en' && <>digital <span className="text-[#00ade0]">collection environments</span></>}
                {language === 'es' && <>ambientes de <span className="text-[#00ade0]">recolección digital</span></>}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="border border-gray-800 rounded-lg p-6 bg-gray-900 hover:border-[#00ade0]/50 transition-colors duration-300 flex flex-col h-full">
                  <h3 className="text-lg font-['Montserrat'] font-medium mb-3 lowercase">
                    {language === 'pt' && <>ambientes <span className="text-[#00ade0]">corporativos</span></>}
                    {language === 'en' && <>corporate <span className="text-[#00ade0]">environments</span></>}
                    {language === 'es' && <>ambientes <span className="text-[#00ade0]">corporativos</span></>}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 flex-grow">
                    {language === 'pt' && 'análise de computadores, servidores, e dispositivos móveis corporativos, mantendo a discrição e minimizando interrupções nas operações empresariais.'}
                    {language === 'en' && 'analysis of corporate computers, servers, and mobile devices, maintaining discretion and minimizing disruptions to business operations.'}
                    {language === 'es' && 'análisis de computadoras, servidores y dispositivos móviles corporativos, manteniendo la discreción y minimizando interrupciones en las operaciones empresariales.'}
                  </p>
                  <div className="pt-4 border-t border-gray-800 mt-auto">
                    <div className="flex items-center justify-center text-xs text-[#00ade0]/80">
                      {language === 'pt' && (
                        <>
                          <span>servidores</span>
                          <span className="mx-1">•</span>
                          <span>estações</span>
                          <span className="mx-1">•</span>
                          <span>rede</span>
                        </>
                      )}
                      {language === 'en' && (
                        <>
                          <span>servers</span>
                          <span className="mx-1">•</span>
                          <span>workstations</span>
                          <span className="mx-1">•</span>
                          <span>network</span>
                        </>
                      )}
                      {language === 'es' && (
                        <>
                          <span>servidores</span>
                          <span className="mx-1">•</span>
                          <span>estaciones</span>
                          <span className="mx-1">•</span>
                          <span>red</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-800 rounded-lg p-6 bg-gray-900 hover:border-[#00ade0]/50 transition-colors duration-300 flex flex-col h-full">
                  <h3 className="text-lg font-['Montserrat'] font-medium mb-3 lowercase">
                    {language === 'pt' && <>dispositivos <span className="text-[#00ade0]">pessoais</span></>}
                    {language === 'en' && <>personal <span className="text-[#00ade0]">devices</span></>}
                    {language === 'es' && <>dispositivos <span className="text-[#00ade0]">personales</span></>}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 flex-grow">
                    {language === 'pt' && 'recuperação e análise de dados de smartphones, tablets e computadores pessoais, com atenção especial à privacidade e aos aspectos legais da coleta.'}
                    {language === 'en' && 'recovery and analysis of data from smartphones, tablets, and personal computers, with special attention to privacy and legal aspects of collection.'}
                    {language === 'es' && 'recuperación y análisis de datos de smartphones, tablets y computadoras personales, con atención especial a la privacidad y a los aspectos legales de la recolección.'}
                  </p>
                  <div className="pt-4 border-t border-gray-800 mt-auto">
                    <div className="flex items-center justify-center text-xs text-[#00ade0]/80">
                      <span>smartphones</span>
                      <span className="mx-1">•</span>
                      <span>laptops</span>
                      <span className="mx-1">•</span>
                      <span>tablets</span>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-800 rounded-lg p-6 bg-gray-900 hover:border-[#00ade0]/50 transition-colors duration-300 flex flex-col h-full">
                  <h3 className="text-lg font-['Montserrat'] font-medium mb-3 lowercase">
                    {language === 'pt' && <>armazenamento em <span className="text-[#00ade0]">nuvem</span></>}
                    {language === 'en' && <>cloud <span className="text-[#00ade0]">storage</span></>}
                    {language === 'es' && <>almacenamiento en <span className="text-[#00ade0]">nube</span></>}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 flex-grow">
                    {language === 'pt' && 'extração forense de dados armazenados em serviços de nuvem, incluindo e-mails, documentos, redes sociais, sites e backups, seguindo protocolos legais para acesso autorizado.'}
                    {language === 'en' && 'forensic extraction of data stored in cloud services, including emails, documents, social networks, websites, and backups, following legal protocols for authorized access.'}
                    {language === 'es' && 'extracción forense de datos almacenados en servicios de nube, incluyendo correos electrónicos, documentos, redes sociales, sitios web y copias de seguridad, siguiendo protocolos legales para acceso autorizado.'}
                  </p>
                  <div className="pt-4 border-t border-gray-800 mt-auto">
                    <div className="flex items-center justify-center text-xs text-[#00ade0]/80">
                      <span>AWS</span>
                      <span className="mx-1">•</span>
                      <span>Google Cloud</span>
                      <span className="mx-1">•</span>
                      <span>Azure</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Serviços Especializados */}
        <section className="conteudo bg-white" style={{ padding: "4rem 0" }}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-['Montserrat'] font-normal text-gray-800 mb-10 text-center lowercase">
                {language === 'pt' && <>serviços <span className="text-[#00ade0]">especializados</span></>}
                {language === 'en' && <>specialized <span className="text-[#00ade0]">services</span></>}
                {language === 'es' && <>servicios <span className="text-[#00ade0]">especializados</span></>}
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
        <section className="conteudo bg-gray-50" style={{ padding: "4rem 0" }}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-stretch md:space-x-10">
                <div className="md:w-1/2 mb-10 md:mb-0">
                  <h2 className="text-2xl font-['Montserrat'] font-normal text-gray-800 mb-6 lowercase">
                    {language === 'pt' && <>metodologias <span className="text-[#00ade0]">forenses</span></>}
                    {language === 'en' && <>forensic <span className="text-[#00ade0]">methodologies</span></>}
                    {language === 'es' && <>metodologías <span className="text-[#00ade0]">forenses</span></>}
                  </h2>
                  <p className="text-gray-700 text-sm mb-6">
                    {language === 'pt' && 'utilizamos protocolos rigorosos que garantem a admissibilidade jurídica das evidências coletadas, respeitando normas nacionais e internacionais. nossa abordagem inclui:'}
                    {language === 'en' && 'we use rigorous protocols that ensure the legal admissibility of collected evidence, respecting national and international standards. our approach includes:'}
                    {language === 'es' && 'utilizamos protocolos rigurosos que garantizan la admisibilidad jurídica de las evidencias recolectadas, respetando normas nacionales e internacionales. nuestro enfoque incluye:'}
                  </p>
                  <ul className="space-y-4">
                    <li className="bg-white p-4 rounded-lg border border-gray-200 flex items-start">
                      <span className="text-[#00ade0] text-xl mr-3 leading-6 flex-shrink-0">•</span>
                      <span className="text-gray-700 text-sm">
                        {language === 'pt' && 'documentação precisa de cada etapa da coleta e cadeia de custódia'}
                        {language === 'en' && 'precise documentation of each step of the collection and chain of custody'}
                        {language === 'es' && 'documentación precisa de cada etapa de la recolección y cadena de custodia'}
                      </span>
                    </li>
                    <li className="bg-white p-4 rounded-lg border border-gray-200 flex items-start">
                      <span className="text-[#00ade0] text-xl mr-3 leading-6 flex-shrink-0">•</span>
                      <span className="text-gray-700 text-sm">
                        {language === 'pt' && 'utilização de ferramentas forenses homologadas internacionalmente'}
                        {language === 'en' && 'use of internationally certified forensic tools'}
                        {language === 'es' && 'utilización de herramientas forenses homologadas internacionalmente'}
                      </span>
                    </li>
                    <li className="bg-white p-4 rounded-lg border border-gray-200 flex items-start">
                      <span className="text-[#00ade0] text-xl mr-3 leading-6 flex-shrink-0">•</span>
                      <span className="text-gray-700 text-sm">
                        {language === 'pt' && 'técnicas não destrutivas que preservam a integridade dos dados'}
                        {language === 'en' && 'non-destructive techniques that preserve data integrity'}
                        {language === 'es' && 'técnicas no destructivas que preservan la integridad de los datos'}
                      </span>
                    </li>
                    <li className="bg-white p-4 rounded-lg border border-gray-200 flex items-start">
                      <span className="text-[#00ade0] text-xl mr-3 leading-6 flex-shrink-0">•</span>
                      <span className="text-gray-700 text-sm">
                        {language === 'pt' && 'análise de dados em ambiente isolado e controlado'}
                        {language === 'en' && 'data analysis in an isolated and controlled environment'}
                        {language === 'es' && 'análisis de datos en ambiente aislado y controlado'}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/2 bg-[#0d1117] rounded-lg p-8 text-white flex flex-col">
                  <h3 className="text-xl font-['Montserrat'] font-normal mb-6 lowercase">
                    {language === 'pt' && <>frameworks <span className="text-[#00ade0]">adotados</span></>}
                    {language === 'en' && <>adopted <span className="text-[#00ade0]">frameworks</span></>}
                    {language === 'es' && <>frameworks <span className="text-[#00ade0]">adoptados</span></>}
                  </h3>
                  <div className="space-y-6 flex-grow">
                    <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
                      <h4 className="font-medium text-[#00ade0] mb-2 lowercase">ACPO Guidelines</h4>
                      <p className="text-sm text-gray-300">
                        {language === 'pt' && 'princípios para manipulação de evidências digitais reconhecidos internacionalmente'}
                        {language === 'en' && 'internationally recognized principles for handling digital evidence'}
                        {language === 'es' && 'principios para manipulación de evidencias digitales reconocidos internacionalmente'}
                      </p>
                    </div>
                    <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
                      <h4 className="font-medium text-[#00ade0] mb-2 lowercase">ISO/IEC 27037</h4>
                      <p className="text-sm text-gray-300">
                        {language === 'pt' && 'diretrizes para identificação, coleta e preservação de evidências digitais'}
                        {language === 'en' && 'guidelines for identification, collection, and preservation of digital evidence'}
                        {language === 'es' && 'directrices para identificación, recolección y preservación de evidencias digitales'}
                      </p>
                    </div>
                    <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
                      <h4 className="font-medium text-[#00ade0] mb-2 lowercase">NIST Guidelines</h4>
                      <p className="text-sm text-gray-300">
                        {language === 'pt' && 'padrões técnicos para forensics digital e investigações cibernéticas'}
                        {language === 'en' && 'technical standards for digital forensics and cyber investigations'}
                        {language === 'es' && 'estándares técnicos para forensics digital e investigaciones cibernéticas'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="contato bg-[#0d1117] text-white flex items-center" style={{ minHeight: "400px" }}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-['Montserrat'] font-normal mb-8 lowercase">
              {t('forense.cta.title')}
            </h2>
            <a
              href={`/site/forense/contact`}
              className="inline-block bg-[#00ade0] hover:bg-opacity-90 text-white py-3 px-8 rounded lowercase transition duration-300"
            >
              {t('forense.cta.button')}
            </a>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}