import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/common/SEOHead';
import SiteLayout from '@/site/layout/SiteLayout';
import { Content } from '@shared/schema';
import { useSite } from '@/site/SiteContext';
import aboutTranslations from './translations/about';

export default function TrustnessAboutPage() {
  const { t, language } = useI18n();
  const { siteConfig } = useSite();
  
  // Fetch about content
  const { data: content, isLoading } = useQuery<Content>({
    queryKey: [`/api/content/about?lang=${language}&site=${siteConfig.code}`],
  });


  const defaultContent = aboutTranslations[language];

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "trustness.",
    "url": "https://www.trustness.com.br",
    "logo": "https://www.trustness.com.br/logo.png",
    "foundingDate": "2016",
    "description": "Consultoria especializada em segurança da informação, privacidade e conformidade regulatória.",
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
            ? "Conheça a história da trustness, consultoria especializada em segurança da informação, privacidade e conformidade regulatória."
            : language === 'en'
              ? "Learn about trustness's history, a specialized consulting firm in information security, privacy, and regulatory compliance."
              : "Conozca la historia de trustness, consultoría especializada en seguridad de la información, privacidad y conformidad regulatoria."
        }
        canonicalUrl="/site/trustness/about"
        structuredData={structuredData}
      />
      
      <main>
        {/* Hero Section com estilo padronizado */}
        <section 
          className="intro text-white bg-[#0b1016] relative flex items-center"
          style={{ minHeight: "60vh" }}
        >
          {/* Overlay para garantir contraste com o texto */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-['Montserrat'] font-normal mb-6 lowercase">
                trustness<span className="text-[var(--primary-color)]">.</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {defaultContent.heroSubtitle}
              </p>
            </div>
          </div>
        </section>
        
        {/* Manifesto Section */}
        <section className="conteudo bg-gray-50" style={{ padding: "4rem 0" }}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-['Montserrat'] font-normal text-2xl md:text-3xl mb-6 text-center lowercase">
                <span className="font-normal">
                  {language === 'pt' ? 'somos a' : language === 'es' ? 'somos' : 'we are'}
                </span> <span className="text-black font-normal">trustness<span className="text-[var(--primary-color)]">.</span></span>
              </h2>
              
              <div className="prose prose-base mx-auto text-gray-700 lowercase">
                <p className="mb-6 text-center font-light tracking-wide text-lg">
                  {defaultContent.manifesto.p1.replace(' • ', ' ') 
                    .split(' • ')
                    .map((item, index, arr) => (
                      <>
                        {item}
                        {index < arr.length - 1 && <span className="text-[var(--primary-color)]"> • </span>}
                      </>
                    ))
                  }
                </p>
                
                <p className="mb-4 text-center text-lg">
                  {defaultContent.manifesto.p3}
                </p>
                
                <h4 className="mt-8 text-center font-light text-md">
                  {defaultContent.manifesto.p4}
                </h4>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="conteudo bg-[#1a1a22] text-white" style={{ padding: "4rem 0" }}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-['Montserrat'] font-normal text-center mb-12 lowercase text-white">{defaultContent.values.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Vision */}
              <div className="bg-[#21212b] p-8 rounded-sm border-l-2 border-[var(--primary-color)]">
                <h3 className="text-xl font-['Montserrat'] font-normal mb-4 lowercase text-white">
                  {defaultContent.values.vision.title}
                </h3>
                <p className="text-gray-300 lowercase">
                  {defaultContent.values.vision.text}
                </p>
              </div>
              
              {/* Mission */}
              <div className="bg-[#21212b] p-8 rounded-sm border-l-2 border-[var(--primary-color)]">
                <h3 className="text-xl font-['Montserrat'] font-normal mb-4 lowercase text-white">
                  {defaultContent.values.mission.title}
                </h3>
                <p className="text-gray-300 lowercase">
                  {defaultContent.values.mission.text}
                </p>
              </div>
              
              {/* Values */}
              <div className="bg-[#21212b] p-8 rounded-sm border-l-2 border-[var(--primary-color)]">
                <h3 className="text-xl font-['Montserrat'] font-normal mb-4 lowercase text-white">
                  {defaultContent.values.values.title}
                </h3>
                <p className="text-gray-300 lowercase mb-3">
                  {defaultContent.values.values.p1}
                </p>
                <p className="text-gray-300 lowercase mb-3">
                  {defaultContent.values.values.p2}
                </p>
                {defaultContent.values.values.p3 && (
                  <p className="text-gray-300 lowercase mb-3">
                    {defaultContent.values.values.p3}
                  </p>
                )}
                {defaultContent.values.values.p4 && (
                  <p className="text-gray-300 lowercase">
                    {defaultContent.values.values.p4}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Timeline Section */}
        <section className="conteudo bg-gray-50" style={{ padding: "4rem 0" }}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-['Montserrat'] font-normal text-center mb-12 lowercase">
              {defaultContent.timeline}
            </h2>
            
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Linha do tempo vertical */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-[var(--primary-color)] opacity-50"></div>
                
                {/* Eventos na linha do tempo */}
                {Object.entries(defaultContent.timelineEvents).map(([year, description], index) => (
                  <div key={year} className={`flex mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="w-1/2 px-6">
                      <div className={`${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        <span className="text-2xl font-['Montserrat'] font-medium text-gray-900">
                          {year.includes('.') ? year.split('.')[0] : year}
                          {year.includes('.') && <span className="text-[var(--primary-color)] text-sm">.{year.split('.')[1]}</span>}
                        </span>
                        <p className="mt-2 text-gray-700 lowercase">
                          {description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[var(--primary-color)] rounded-full mt-1"></div>
                    
                    <div className="w-1/2 px-6"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="contato bg-[#1a1a22] text-white flex items-center" style={{ minHeight: "400px" }}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-['Montserrat'] font-normal mb-8 lowercase">
              {language === 'pt' 
                ? <>quer saber mais sobre a <span className="font-normal">trustness<span className="text-[var(--primary-color)]">.</span></span>?</> 
                : language === 'en'
                  ? <>want to know more about <span className="font-normal">trustness<span className="text-[var(--primary-color)]">.</span></span>?</>
                  : <>¿quieres saber más sobre <span className="font-normal">trustness<span className="text-[var(--primary-color)]">.</span></span>?</>
              }
            </h2>
            
            <a 
              href="/site/trustness/contact" 
              className="inline-block bg-[var(--primary-color)] hover:bg-opacity-90 text-white py-3 px-8 rounded lowercase transition duration-300"
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
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[var(--primary-color)]"></div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout
      title={`${defaultContent.title} | ${siteConfig.name}`}
      description={
        language === 'pt' 
          ? "Conheça a história da trustness, consultoria especializada em segurança da informação, privacidade e conformidade regulatória."
          : language === 'en'
            ? "Learn about trustness's history, a specialized consulting firm in information security, privacy, and regulatory compliance."
            : "Conozca la historia de trustness, consultoría especializada en seguridad de la información, privacidad y conformidad regulatoria."
      }
      ogImage={content?.ogImage ? content.ogImage : undefined}
      canonicalUrl={`https://${siteConfig.domain}/about`}
    >
      <PageContent />
    </SiteLayout>
  );
}