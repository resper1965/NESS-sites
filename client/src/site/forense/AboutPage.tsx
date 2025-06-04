import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/common/SEOHead';
import SiteLayout from '@/site/layout/SiteLayout';
import { Content } from '@shared/schema';
import { useSite } from '@/site/SiteContext';
import { localizedContent } from './translations/about';

export default function ForenseAboutPage() {
  const { t, language } = useI18n();
  const { siteConfig } = useSite();
  
  // Fetch about content
  const { data: content, isLoading } = useQuery<Content>({
    queryKey: [`/api/content/about?lang=${language}&site=${siteConfig.code}`],
  });


  const defaultContent = {
    title: localizedContent[language].title,
    heroTitle: localizedContent[language].heroTitle,
    heroSubtitle: localizedContent[language].heroSubtitle,
    manifesto: localizedContent[language].manifesto,
    values: localizedContent[language].values,
    timeline: localizedContent[language].timeline,
    timelineEvents: localizedContent[language].timelineEvents,
    cta: localizedContent[language].cta
  };

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "forense.io",
    "url": "https://www.forense.io",
    "logo": "https://www.forense.io/logo.png",
    "foundingDate": "2014",
    "description": "Soluções especializadas em forense digital, análise e validação de evidências digitais para contextos legais.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Paulista, 1000",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "postalCode": "01310-100",
      "addressCountry": "BR"
    }
  };

  // Conteúdo principal da página
  const PageContent = () => (
    <>
      <SEOHead 
        title={`${defaultContent.title} | ${siteConfig.name}`}
        description={
          language === 'pt' 
            ? "Conheça a história da forense.io, divisão especializada da NESS em análise e validação de evidências digitais para contextos legais."
            : language === 'en'
              ? "Learn about forense.io's history, NESS's specialized division in analysis and validation of digital evidence for legal contexts."
              : "Conozca la historia de forense.io, división especializada de NESS en análisis y validación de evidencias digitales para contextos legales."
        }
        canonicalUrl="/site/forense/about"
        structuredData={structuredData}
      />
      
      <main>
        {/* Hero Section com fundo escuro */}
        <section className="intro text-white bg-[#0d1117] relative overflow-hidden flex items-center" style={{ minHeight: "60vh" }}>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="mb-6 lowercase">
                forense<span className="text-[#00ade0]">.</span>io
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {defaultContent.heroTitle}
              </p>
            </div>
          </div>
        </section>
        
        {/* Sobre a forense.io Section */}
        <section className="conteudo bg-white" style={{ padding: "4rem 0" }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-gray-800 mb-4 lowercase">
                {language === 'pt' && <>sobre a forense<span className="text-[#00ade0]">.</span>io</>}
                {language === 'en' && <>about forense<span className="text-[#00ade0]">.</span>io</>}
                {language === 'es' && <>sobre forense<span className="text-[#00ade0]">.</span>io</>}
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto mb-10">
                {language === 'pt' && "convertemos complexidade técnica em resultados judiciais concretos"}
                {language === 'en' && "turning technical complexity into concrete judicial results"}
                {language === 'es' && "convertimos complejidad técnica en resultados judiciales concretos"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-[#0d1117] p-8 rounded-lg shadow-md">
                <h3 className="mb-4 text-white lowercase">
                  {language === 'pt' && 'expertise forense'}
                  {language === 'en' && 'forensic expertise'}
                  {language === 'es' && 'experiencia forense'}
                  <span className="text-[#00ade0]">.</span>
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {language === 'pt' && 'nossa equipe combina conhecimento técnico avançado com compreensão profunda dos requisitos legais, garantindo que cada evidência coletada seja juridicamente válida e tecnicamente robusta.'}
                  {language === 'en' && 'our team combines advanced technical knowledge with deep understanding of legal requirements, ensuring that each piece of evidence collected is legally valid and technically robust.'}
                  {language === 'es' && 'nuestro equipo combina conocimiento técnico avanzado con comprensión profunda de los requisitos legales, garantizando que cada evidencia recolectada sea jurídicamente válida y técnicamente robusta.'}
                </p>
              </div>
              
              <div className="bg-[#0d1117] p-8 rounded-lg shadow-md">
                <h3 className="mb-4 text-white lowercase">
                  {language === 'pt' && 'tecnologia avançada'}
                  {language === 'en' && 'advanced technology'}
                  {language === 'es' && 'tecnología avanzada'}
                  <span className="text-[#00ade0]">.</span>
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {language === 'pt' && 'utilizamos ferramentas e metodologias proprietárias desenvolvidas ao longo de anos para recuperar, analisar e validar evidências digitais com o mais alto padrão de precisão do mercado.'}
                  {language === 'en' && 'we use proprietary tools and methodologies developed over years to recover, analyze and validate digital evidence with the highest standard of precision in the market.'}
                  {language === 'es' && 'utilizamos herramientas y metodologías propietarias desarrolladas a lo largo de años para recuperar, analizar y validar evidencias digitales con el más alto estándar de precisión del mercado.'}
                </p>
              </div>
              
              <div className="bg-[#0d1117] p-8 rounded-lg shadow-md">
                <h3 className="mb-4 text-white lowercase">
                  {language === 'pt' && 'resultados concretos'}
                  {language === 'en' && 'concrete results'}
                  {language === 'es' && 'resultados concretos'}
                  <span className="text-[#00ade0]">.</span>
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {language === 'pt' && 'nosso trabalho vai além da simples coleta de dados - transformamos evidências técnicas em narrativas claras e defensáveis que sustentam decisões judiciais e corporativas.'}
                  {language === 'en' && 'our work goes beyond simple data collection - we transform technical evidence into clear and defensible narratives that support judicial and corporate decisions.'}
                  {language === 'es' && 'nuestro trabajo va más allá de la simple recolección de datos - transformamos evidencias técnicas en narrativas claras y defendibles que sustentan decisiones judiciales y corporativas.'}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="conteudo bg-gray-900 text-white" style={{ padding: "4rem 0" }}>
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-12 lowercase text-white">{defaultContent.values.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="bg-gray-800 p-8 rounded-sm border-l-2 border-[#00ade0]">
                <h3 className="mb-4 lowercase text-white">
                  {defaultContent.values.vision.title}
                </h3>
                <p className="text-gray-300 lowercase">
                  {defaultContent.values.vision.text}
                </p>
              </div>
              
              {/* Mission */}
              <div className="bg-gray-800 p-8 rounded-sm border-l-2 border-[#00ade0]">
                <h3 className="mb-4 lowercase text-white">
                  {defaultContent.values.mission.title}
                </h3>
                <p className="text-gray-300 lowercase">
                  {defaultContent.values.mission.text}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Timeline Section */}
        <section className="conteudo bg-gray-50" style={{ padding: "4rem 0" }}>
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-12 lowercase">
              {defaultContent.timeline}
            </h2>
            
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Linha do tempo vertical */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-[#00ade0] opacity-50"></div>
                
                {/* Eventos na linha do tempo */}
                {Object.entries(defaultContent.timelineEvents).map(([year, description], index) => (
                  <div key={year} className={`flex mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="w-1/2 px-6">
                      <div className={`${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        <span className="text-gray-900 text-2xl font-medium">
                          {year.includes('.') ? year.split('.')[0] : year}
                          {year.includes('.') && <span className="text-[#00ade0] text-sm">.{year.split('.')[1]}</span>}
                        </span>
                        <p className="mt-2 text-gray-700 lowercase">
                          {description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#00ade0] rounded-full mt-1"></div>
                    
                    <div className="w-1/2 px-6"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="contato bg-[#0d1117] text-white flex items-center" style={{ minHeight: "400px" }}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-8 lowercase">
              {language === 'pt' 
                ? <>quer saber mais sobre a <span className="font-normal">forense<span className="text-[#00ade0]">.</span>io</span>?</> 
                : language === 'en'
                  ? <>want to know more about <span className="font-normal">forense<span className="text-[#00ade0]">.</span>io</span>?</>
                  : <>¿quieres saber más sobre <span className="font-normal">forense<span className="text-[#00ade0]">.</span>io</span>?</>
              }
            </h2>
            <a
              href={`/site/forense/contact`}
              className="inline-block bg-[#00ade0] hover:bg-opacity-90 text-white py-3 px-8 rounded lowercase transition duration-300"
            >
              {defaultContent.cta.button}
            </a>
          </div>
        </section>
      </main>
    </>
  );

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00ade0]"></div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}