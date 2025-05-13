import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
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

  // Content translations for different languages
  const localizedContent = {
    pt: {
      title: "quem somos",
      heroTitle: "modularidade que transforma o complexo em confiável",
      heroSubtitle: "tecnologia invisível que sustenta o essencial desde 1991",
      manifesto: {
        main: "somos a ness.",
        p1: "tecnologia clara. estrutura segura. propósito real.",
        p2: "desde 1991, operando o essencial com precisão.",
        p3: "projetamos, conectamos e sustentamos soluções críticas.",
        p4: "invisível para quem usa. indispensável para quem confia."
      },
      values: {
        title: "nossos valores",
        vision: {
          title: "nossa visão",
          text: "ser reconhecida como uma plataforma confiável em soluções tecnológicas modulares, que sustenta operações críticas com segurança e inteligência. habilitar pessoas e organizações a enfrentarem desafios complexos com clareza, velocidade e propósito. construir com estrutura. operar com confiança. entregar o essencial."
        },
        mission: {
          title: "nossa missão",
          text: "conectar, automatizar e sustentar operações críticas com velocidade e propósito. expandir o acesso, a eficiência e a resiliência por meio de tecnologia confiável e arquitetura clara. transformar a complexidade em soluções simples e seguras."
        },
        values: {
          title: "nossos valores",
          p1: "confiança é nossa estrutura. decidimos com clareza, entregamos com consistência e crescemos com ética. valorizamos pessoas, diversidade e colaboração de longo prazo.",
          p2: "buscamos equilíbrio entre resultado, impacto e evolução contínua. inovamos com responsabilidade. operamos com precisão."
        }
      },
      timeline: "nossa trajetória",
      timelineEvents: {
        "1991": "fundação da ness. como operação terceirizada de tecnologia para um grande grupo econômico.",
        "1992": "início das atividades em infraestrutura, dados e BPO.",
        "1998": "infraestrutura de tecnologia para grandes eventos no Brasil e em diversos países da europa, américas, áfrica e ásia.",
        "2005": "entrada em segurança digital e privacidade.",
        "2014": "lançamento da divisão de software e processos, com projetos iniciais em saúde.",
        "2016": "incubação da trustness.",
        "2017": "criação da unidade de negócios ness health.",
        "2018": "trustness torna-se unidade de negócios.",
        "2019": "spin-off da ness health.",
        "2020": "ness health é renomeada como ionic health e inaugura sede no tech-park sjc.",
        "2021": "incubação da forense.io.",
        "2022": "forense.io torna-se unidade de negócios.",
        "2025": "a ness. se consolida como uma plataforma modular para transformação digital confiável."
      },
      cta: {
        title: "quer saber mais sobre a ness.?",
        button: "fale conosco"
      }
    },
    en: {
      title: "about us",
      heroTitle: "modularity that transforms complexity into reliability",
      heroSubtitle: "invisible technology sustaining the essential since 1991",
      manifesto: {
        main: "we are ness.",
        p1: "clear technology • secure structure • real purpose",
        p2: "operating the essential with precision since 1991.",
        p3: "we design, connect and sustain critical solutions.",
        p4: "invisible to users. indispensable to those who rely on it."
      },
      values: {
        title: "our values",
        vision: {
          title: "our vision",
          text: "to be recognized as a trusted platform for modular technological solutions that sustains critical operations with security and intelligence. to enable people and organizations to face complex challenges with clarity, speed and purpose. build with structure. operate with confidence. deliver the essential."
        },
        mission: {
          title: "our mission",
          text: "to connect, automate and sustain critical operations with speed and purpose. to expand access, efficiency and resilience through reliable technology and clear architecture. to transform complexity into simple and secure solutions."
        },
        values: {
          title: "our values",
          p1: "trust is our structure. we decide with clarity, deliver with consistency and grow with ethics. we value people, diversity and long-term collaboration.",
          p2: "we seek balance between results, impact and continuous evolution. we innovate with responsibility. we operate with precision."
        }
      },
      timeline: "our journey",
      timelineEvents: {
        "1991": "founding of ness. as an outsourced technology operation for a large economic group.",
        "1992": "start of activities in infrastructure, data and BPO.",
        "1998": "technology infrastructure for major events in Brazil and various countries in Europe, Americas, Africa, and Asia.",
        "2005": "entry into digital security and privacy.",
        "2014": "launch of the software and processes division, with initial healthcare projects.",
        "2016": "incubation of trustness.",
        "2017": "creation of the ness health business unit.",
        "2018": "trustness becomes a business unit.",
        "2019": "spin-off of ness health.",
        "2020": "ness health is renamed to ionic health and inaugurates headquarters at tech-park sjc.",
        "2021": "incubation of forense.io.",
        "2022": "forense.io becomes a business unit.",
        "2025": "ness. consolidates as a modular platform for reliable digital transformation."
      },
      cta: {
        title: "want to know more about ness.?",
        button: "contact us"
      }
    },
    es: {
      title: "quiénes somos",
      heroTitle: "modularidad que transforma lo complejo en confiable",
      heroSubtitle: "tecnología invisible que sustenta lo esencial desde 1991",
      manifesto: {
        main: "somos ness.",
        p1: "desde 1991, hemos evolucionado de una consultoría de infraestructura de TI a una plataforma confiable de tecnología e innovación. entregamos soluciones con claridad, seguridad y propósito.",
        p2: "nuestro equipo diseña, implementa, monitorea y mantiene operaciones críticas — siempre con velocidad, ética y una mentalidad orientada a resultados.",
        p3: "nos apasiona resolver grandes problemas a través de la tecnología y la colaboración a largo plazo.",
        p4: "creemos que lo esencial a menudo es invisible. y que el impacto real comienza con decisiones simples y arquitecturas seguras."
      },
      values: {
        title: "nuestros valores",
        vision: {
          title: "nuestra visión",
          text: "convertirse en una referencia global en soluciones tecnológicas modulares y confiables, con un equipo de alto rendimiento que permite a personas y organizaciones enfrentar desafíos complejos con seguridad, inteligencia y velocidad."
        },
        mission: {
          title: "nuestra misión",
          text: "expandir el acceso, la eficiencia y la calidad en operaciones críticas, ofreciendo tecnologías que conectan, automatizan y sustentan la transformación digital con claridad y propósito."
        },
        values: {
          title: "nuestros valores",
          p1: "obsesión por la excelencia en el servicio, un compromiso innegociable con las personas y la confianza, y una cultura de agilidad y mejora continua.",
          p2: "buscamos equilibrar el beneficio, las personas y el impacto de forma sostenible, donde la diversidad de nuestro equipo alimenta la innovación y fortalece nuestro ecosistema."
        }
      },
      timeline: "nuestra trayectoria",
      timelineEvents: {
        "1991": "ness. es fundada como tercerización del área de tecnología de un gran grupo económico.",
        "1992": "actividades de infraestructura, procesamiento de datos y BPO.",
        "1998": "inicio en la actividad de infraestructura en grandes eventos por diversos países de Europa, América, África y Asia.",
        "2005": "inicio de servicios de privacidad y seguridad digital.",
        "2014": "lanzamiento de la división de software y procesos.",
        "2014.2": "incubación de proyectos de salud. NESS Technology healthcare inicia como incubación.",
        "2016": "incubación de Trustness.",
        "2017": "creación de la unidad de negocios NESS Health como Business Unit de NESS.",
        "2018": "Trustness como unidad de negocios.",
        "2019": "spin-off de NESS Health de NESS.",
        "2020": "NESS Health renombrada como IONIC Health, nueva sede en Tech-Park SJC, crecimiento local con grandes clientes brasileños del área de salud.",
        "2021": "incubación de forense.io.",
        "2022": "forense.io como unidad de negocios.",
        "2025": "establecida como una plataforma modular para transformación digital confiable."
      },
      cta: {
        title: "¿quieres saber más sobre ness.?",
        button: "contáctanos"
      }
    }
  };

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
        {/* Hero Section com fundo escuro e estilo consistente */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/assets/images/hero-dark-bg.png" 
              alt="Hero background" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(18,18,18,0.1)] to-[rgba(18,18,18,0.3)]"></div>
          </div>
          
          {/* Overlay para garantir boa legibilidade do texto */}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(18,18,18,0.2)] to-[rgba(18,18,18,0.4)]"></div>
          
          {/* Content */}
          <div className="container mx-auto px-4 z-10 flex justify-center items-center h-full">
            <div className="hero-main-content text-center max-w-4xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-['Montserrat'] font-normal mb-6">
                <span style={{color: "#ffffff"}}>ness</span><span style={{color: "#00ade0"}}>.</span>
              </h1>
              <p className="text-2xl md:text-3xl lg:text-4xl font-['Montserrat'] font-normal mb-6 text-white lowercase tracking-tight">
                {defaultContent.heroTitle}
              </p>
            
              <p className="text-lg md:text-xl lg:text-2xl mb-8 mx-auto text-white font-['Montserrat'] lowercase font-light">
                {defaultContent.heroSubtitle}
              </p>
            </div>
          </div>
        </section>
        
        {/* Manifesto Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-['Montserrat'] font-normal text-2xl md:text-3xl mb-6 text-center lowercase">
                <span className="font-normal">{language === 'pt' ? 'somos a' : language === 'es' ? 'somos' : 'we are'}</span> <span className="text-black font-normal">ness<span className="text-[#00ade0]">.</span></span>
              </h2>
              
              <div className="prose prose-base mx-auto text-gray-700 lowercase">
                <p className="mb-6 text-center font-light tracking-wide text-base">
                  tecnologia clara <span className="text-[#00ade0]">•</span> estrutura segura <span className="text-[#00ade0]">•</span> propósito real
                </p>
                
                <p className="mb-4 text-center">
                  projetamos, conectamos e sustentamos soluções críticas
                </p>
                
                <h4 className="mt-8 text-center font-light text-sm">
                  invisível para quem usa. indispensável para quem confia.
                </h4>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-20 bg-[#2c2c34]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-['Montserrat'] font-normal text-center mb-12 lowercase text-[#00ade0]">{defaultContent.values.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Vision */}
              <div className="bg-[#38383f] p-8 rounded-sm border-l-2 border-[#00ade0]">
                <h3 className="text-xl font-['Montserrat'] font-medium mb-4 lowercase text-white">
                  {defaultContent.values.vision.title}
                </h3>
                <p className="text-gray-200 lowercase">
                  {defaultContent.values.vision.text}
                </p>
              </div>
              
              {/* Mission */}
              <div className="bg-[#38383f] p-8 rounded-sm border-l-2 border-[#00ade0]">
                <h3 className="text-xl font-['Montserrat'] font-medium mb-4 lowercase text-white">
                  {defaultContent.values.mission.title}
                </h3>
                <p className="text-gray-200 lowercase">
                  {defaultContent.values.mission.text}
                </p>
              </div>
              
              {/* Values */}
              <div className="bg-[#38383f] p-8 rounded-sm border-l-2 border-[#00ade0]">
                <h3 className="text-xl font-['Montserrat'] font-medium mb-4 lowercase text-white">
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
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-['Montserrat'] font-normal text-center mb-12 lowercase">{defaultContent.timeline}</h2>
            
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Linha do tempo vertical */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-[#00ade0] opacity-50"></div>
                
                {/* Eventos na linha do tempo */}
                {Object.entries(defaultContent.timelineEvents).map(([year, description], index) => (
                  <div key={year} className={`flex mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="w-1/2 px-6">
                      <div className={`${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        <span className="text-2xl font-['Montserrat'] font-medium text-gray-900">
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
        <section className="py-20 bg-[#2f3e4d] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-['Montserrat'] font-normal mb-8 lowercase">
              {defaultContent.cta.title}
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