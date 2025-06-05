import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import localizedContent from './translations/about';
import SEOHead from '@/components/common/SEOHead';
import SiteLayout from '@/site/layout/SiteLayout';
import { Content } from '@shared/schema';
import { useSite } from '@/site/SiteContext';


export default function NessAboutPage() {
  const { t, language } = useI18n();
  const { siteConfig } = useSite();
  
  // Fetch about content
  const { data: content, isLoading } = useQuery<Content>({
    queryKey: [`/api/content/about?lang=${language}`],
  });


  const defaultContent = {
    title: t('about.title'),
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
    "name": "ness.",
    "url": "https://www.ness.com.br",
    "logo": "https://www.ness.com.br/logo.png",
    "foundingDate": "1991",
    "description": "Empresa especializada em serviços de tecnologia, incluindo infraestrutura, segurança cibernética e desenvolvimento de software.",
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
            ? "Conheça a história da ness., empresa com mais de 30 anos de experiência em serviços de tecnologia, infraestrutura e segurança cibernética."
            : language === 'en'
              ? "Learn about ness.'s history, a company with over 30 years of experience in technology services, infrastructure, and cybersecurity."
              : "Conozca la historia de ness., empresa con más de 30 años de experiencia en servicios de tecnología, infraestructura y seguridad cibernética."
        }
        canonicalUrl="/about"
        structuredData={structuredData}
      />
      
      <main>
        {/* Hero Section */}
        <section className="intro bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative flex items-center overflow-hidden" style={{ minHeight: '60vh' }}>
          {/* Padrão de Grid */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzM0MTU1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
          
          {/* Linhas Sutis */}
          <div className="absolute top-1/4 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-[#00ade0] to-transparent opacity-40"></div>
          <div className="absolute bottom-1/3 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-[#00ade0] to-transparent opacity-40"></div>
          <div className="absolute top-1/2 left-1/3 w-px h-24 bg-gradient-to-b from-transparent via-[#00ade0] to-transparent opacity-30"></div>
          <div className="absolute bottom-1/4 right-1/3 w-24 h-px bg-gradient-to-r from-transparent via-[#00ade0] to-transparent opacity-30"></div>
          
          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center h-full text-center">
            {/* Logo */}
            <h1 className="font-['Montserrat'] !font-light !text-7xl md:!text-8xl !text-white mb-6 lowercase">
              quem somos<span className="text-[#00ade0]">.</span>
            </h1>
            
            {/* Tagline */}
            <h2 className="mb-8">
              <div className="font-light text-2xl md:text-3xl text-slate-300 mb-2">
                Transformando Ideias em Soluções Seguras
              </div>
              <div className="font-normal text-2xl md:text-3xl text-[#00ade0]">
                para resultados extraordinários
              </div>
            </h2>
            
            {/* Parágrafo descritivo */}
            <p className="font-light text-lg text-slate-400 max-w-2xl leading-relaxed">
              To understand who we are today, it is important to know our journey.
            </p>
          </div>
        </section>
        
        {/* Manifesto Section */}
        <section className="conteudo bg-gray-50" style={{ padding: "4rem 0" }}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="mb-6 text-center lowercase">
                <span className="font-normal text-[#00ade0]">{language === 'pt' ? 'somos a' : language === 'es' ? 'somos' : 'we are'}</span> <span className="text-black font-normal">ness<span className="text-[#00ade0]">.</span></span>
              </h2>
              
              <div className="prose prose-base mx-auto text-gray-700 lowercase">
                <p className="mb-6 text-center font-light tracking-wide text-lg text-[#2c2c34]">
                  {language === 'pt' 
                    ? <>tecnologia clara <span className="text-[#00ade0]">•</span> estrutura segura <span className="text-[#00ade0]">•</span> propósito real</>
                    : language === 'en'
                      ? <>clear technology <span className="text-[#00ade0]">•</span> secure structure <span className="text-[#00ade0]">•</span> real purpose</>
                      : <>tecnología clara <span className="text-[#00ade0]">•</span> estructura segura <span className="text-[#00ade0]">•</span> propósito real</>
                  }
                </p>
                
                <p className="mb-4 text-center text-lg text-[#2c2c34]">
                  {language === 'pt'
                    ? 'projetamos, conectamos e sustentamos soluções críticas'
                    : language === 'en'
                      ? 'we design, connect and sustain critical solutions'
                      : 'diseñamos, conectamos y sostenemos soluciones críticas'
                  }
                </p>
                
                <h4 className="mt-8 text-center font-light text-md">
                  {language === 'pt'
                    ? 'invisível para quem usa. indispensável para quem confia.'
                    : language === 'en'
                      ? 'invisible to users. indispensable to those who rely on it.'
                      : 'invisible para quien usa. indispensable para quien confía.'
                  }
                </h4>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="conteudo bg-[#2c2c34]" style={{ padding: "4rem 0" }}>
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-12 lowercase text-[#00ade0]">{defaultContent.values.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Vision */}
              <div className="bg-[#38383f] p-8 rounded-sm border-l-2 border-[#00ade0]">
                <h3 className="mb-4 lowercase text-white font-thin">
                  {defaultContent.values.vision.title}
                </h3>
                <p className="text-gray-200 lowercase">
                  {defaultContent.values.vision.text}
                </p>
              </div>
              
              {/* Mission */}
              <div className="bg-[#38383f] p-8 rounded-sm border-l-2 border-[#00ade0]">
                <h3 className="mb-4 lowercase text-white font-thin">
                  {defaultContent.values.mission.title}
                </h3>
                <p className="text-gray-200 lowercase">
                  {defaultContent.values.mission.text}
                </p>
              </div>
              
              {/* Values */}
              <div className="bg-[#38383f] p-8 rounded-sm border-l-2 border-[#00ade0]">
                <h3 className="mb-4 lowercase text-white font-medium">
                  {defaultContent.values.values.title}
                </h3>
                <p className="text-gray-200 lowercase mb-4">
                  {defaultContent.values.values.p1}
                </p>
                <p className="text-gray-200 lowercase">
                  {defaultContent.values.values.p2}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Timeline Section */}
        <section className="conteudo bg-gray-50" style={{ padding: "4rem 0" }}>
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-12 lowercase">{defaultContent.timeline}</h2>
            
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
        <section className="contato bg-[#4d4d4d] text-white flex items-center" style={{ minHeight: "400px" }}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-8 lowercase">
              {language === 'pt' 
                ? <>quer saber mais sobre a <span className="font-normal">ness<span className="text-[#00ade0]">.</span></span>?</> 
                : language === 'en'
                  ? <>want to know more about <span className="font-normal">ness<span className="text-[#00ade0]">.</span></span>?</>
                  : <>¿quieres saber más sobre <span className="font-normal">ness<span className="text-[#00ade0]">.</span></span>?</>
              }
            </h2>
            
            <a 
              href="/site/ness/contact" 
              className="inline-block bg-[#00ade0] hover:bg-opacity-90 text-white py-3 px-8 rounded lowercase transition duration-300"
            >
              {defaultContent.cta.button}
            </a>
          </div>
        </section>
      </main>
    </>
  );

  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
