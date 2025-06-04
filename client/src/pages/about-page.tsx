import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';

import SiteLayout from '@/site/layout/SiteLayout';
import { Content } from '@shared/schema';

export default function AboutPage() {
  const { t, language } = useI18n();
  
  // Fetch about content
  const { data: content, isLoading } = useQuery<Content>({
    queryKey: [`/api/content/about?lang=${language}`],
  });

  const heroBackground = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&h=1080&q=80";

  // Content translations for different languages
  const localizedContent = {
    pt: {
      title: "quem somos",
      heroTitle: "quem somos",
      heroSubtitle: "há 33 anos transformando problemas complexos em soluções modulares.",
      manifesto: {
        main: "somos a ness.",
        p1: "desde 1991, evoluímos de uma consultoria de infraestrutura de TI para uma plataforma confiável de tecnologia e inovação. entregamos soluções com clareza, segurança e propósito.",
        p2: "nossa equipe projeta, implementa, monitora e sustenta operações críticas — sempre com velocidade, ética e uma mentalidade orientada a resultados.",
        p3: "somos apaixonados por resolver grandes problemas através da tecnologia e colaboração de longo prazo.",
        p4: "acreditamos que o essencial é muitas vezes invisível. e que o impacto real começa com decisões simples e arquiteturas seguras."
      },
      values: {
        title: "nossos valores",
        vision: {
          title: "nossa visão",
          text: "tornar-se uma referência global em soluções tecnológicas modulares e confiáveis, com um time de alta performance que habilita pessoas e organizações a enfrentarem desafios complexos com segurança, inteligência e velocidade."
        },
        mission: {
          title: "nossa missão",
          text: "expandir o acesso, a eficiência e a qualidade em operações críticas, oferecendo tecnologias que conectam, automatizam e sustentam a transformação digital com clareza e propósito."
        },
        values: {
          title: "nossos valores",
          p1: "obsessão por excelência no atendimento, um compromisso inegociável com pessoas e confiança, e uma cultura de agilidade e melhoria contínua.",
          p2: "buscamos equilibrar lucro, pessoas e impacto de forma sustentável, onde a diversidade do nosso time alimenta a inovação e fortalece nosso ecossistema."
        }
      },
      timeline: "nossa trajetória",
      timelineEvents: {
        "1991": "a ness. é fundada como tercerização da área de tecnologia de um grande grupo econômico.",
        "1992": "atividades de infraestrutura, processamento de dados e BPO.",
        "1998": "início na atividade de infraestrutura em grandes eventos por todo diversos países da europa, américas, africa e ásia.",
        "2005": "início de serviços de privacidade e segurança digital.",
        "2014": "lançamento da divisão de software e processos.",
        "2014.2": "incubação de projetos de saúde. NESS Technology healthcare inicia como incubação.",
        "2016": "incubação da Trustness.",
        "2017": "criação da unidade de negócios NESS Health como Business Unit da NESS.",
        "2018": "Trustness como unidade de negócios.",
        "2019": "spin-off da NESS Health da NESS.",
        "2020": "NESS Health renomeada como IONIC Health, nova sede no Tech-Park SJC, crescimento local com grandes clientes brasileiros da área de saúde.",
        "2021": "incubação da forense.io.",
        "2022": "forense.io como unidade de negócios.",
        "2025": "estabelecida como uma plataforma modular para transformação digital confiável."
      },
      cta: {
        title: "quer saber mais sobre a ness.?",
        button: "fale conosco"
      }
    },
    en: {
      title: "about us",
      heroTitle: "about us",
      heroSubtitle: "33 years transforming complex problems into modular solutions.",
      manifesto: {
        main: "we are ness.",
        p1: "since 1991, we've evolved from an IT infrastructure consultancy into a trusted platform for technology and innovation. we deliver solutions with clarity, security, and purpose.",
        p2: "our team designs, implements, monitors, and sustains critical operations — always with speed, ethics, and a results-driven mindset.",
        p3: "we're passionate about solving big problems through technology and long-term collaboration.",
        p4: "we believe what's essential is often invisible. and that real impact starts with simple decisions and secure architectures."
      },
      values: {
        title: "our values",
        vision: {
          title: "our vision",
          text: "to become a global reference in modular and reliable technological solutions, with a high-performance team that enables people and organizations to face complex challenges with security, intelligence, and speed."
        },
        mission: {
          title: "our mission",
          text: "to expand access, efficiency, and quality in critical operations, offering technologies that connect, automate, and sustain digital transformation with clarity and purpose."
        },
        values: {
          title: "our values",
          p1: "obsession with service excellence, a non-negotiable commitment to people and trust, and a culture of agility and continuous improvement.",
          p2: "we seek to balance profit, people, and impact sustainably, where the diversity of our team fuels innovation and strengthens our ecosystem."
        }
      },
      timeline: "our journey",
      timelineEvents: {
        "1991": "ness. is founded as an outsourced technology department for a large economic group.",
        "1992": "infrastructure activities, data processing, and BPO.",
        "1998": "beginning of infrastructure activities at major events throughout various countries in Europe, Americas, Africa, and Asia.",
        "2005": "initiation of privacy and digital security services.",
        "20141": "launch of the software and processes division.",
        "20142": "healthcare projects incubation. NESS Technology healthcare starts as an incubation project.",
        "2016": "Trustness incubation.",
        "2017": "creation of NESS Health as a NESS Business Unit.",
        "2018": "Trustness as a Business Unit.",
        "2019": "NESS Health spin-off from NESS.",
        "2020": "NESS Health rebranded as IONIC Health, new headquarters at SJC Tech-Park, local growth with major Brazilian healthcare clients.",
        "2021": "forense.io incubation.",
        "2022": "forense.io as a business unit.",
        "2025": "established as a modular platform for reliable digital transformation."
      },
      cta: {
        title: "want to know more about ness.?",
        button: "contact us"
      }
    },
    es: {
      title: "quiénes somos",
      heroTitle: "quiénes somos",
      heroSubtitle: "33 años transformando problemas complejos en soluciones modulares.",
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
        "20141": "lanzamiento de la división de software y procesos.",
        "20142": "incubación de proyectos de salud. NESS Technology healthcare inicia como incubación.",
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

  return (
    <SiteLayout
      title={`${defaultContent.title} | ness.`}
      description={
        language === 'pt'
          ? "Conheça a história da ness., empresa com mais de 30 anos de experiência em serviços de tecnologia, infraestrutura e segurança cibernética."
          : language === 'en'
            ? "Learn about ness.'s history, a company with over 30 years of experience in technology services, infrastructure, and cybersecurity."
            : "Conozca la historia de ness., empresa con más de 30 años de experiencia en servicios de tecnología, infraestructura y seguridad cibernética."
      }
      canonicalUrl="/about"
      structuredData={structuredData}
    >
      <main>
        {/* Hero Section com estilo abstrato geométrico */}
        <section className="hero-abstract">
          {/* Elementos de fundo geométricos */}
          <div className="hero-abstract-bg">
            {/* Grade de fundo */}
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="grid-pattern">
              <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#00ade0" strokeWidth="0.1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
          </div>
          
          {/* Blocos geométricos */}
          <div className="geometric-blocks">
            <div className="block"></div>
            <div className="block"></div>
            <div className="block"></div>
            <div className="block"></div>
            <div className="block"></div>
          </div>
          
          {/* Linhas fluidas */}
          <div className="flowing-lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          
          {/* Pontos de conexão */}
          <div className="connections">
            <div className="connection"></div>
            <div className="connection"></div>
            <div className="connection"></div>
            <div className="connection"></div>
            <div className="connection"></div>
            <div className="connection"></div>
          </div>
          
          {/* Conteúdo principal */}
          <div className="hero-abstract-content">
            <h1>{defaultContent.heroTitle}</h1>
            <p>{defaultContent.heroSubtitle}</p>
          </div>
          
          {/* Indicador de rolagem */}
          <div className="scroll-indicator">↓</div>
        </section>
        
        {/* Manifesto Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-['Montserrat'] font-normal text-3xl md:text-4xl mb-8 text-center lowercase">
                <span className="font-normal">{language === 'pt' ? 'somos a' : language === 'es' ? 'somos' : 'we are'}</span> <span className="text-black font-normal">ness<span className="text-[#00ade0]">.</span></span>
              </h2>
              
              <div className="prose prose-lg mx-auto text-gray-700 lowercase">
                <p className="mb-6">
                  {defaultContent.manifesto.p1}
                </p>
                
                <p className="mb-6">
                  {defaultContent.manifesto.p2}
                </p>
                
                <p className="mb-6">
                  {defaultContent.manifesto.p3}
                </p>
                
                <p className="mb-6">
                  {defaultContent.manifesto.p4}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-['Montserrat'] font-normal text-center mb-12 lowercase">{defaultContent.values.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Vision */}
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-['Montserrat'] font-medium text-[#00ade0] mb-4 lowercase">{defaultContent.values.vision.title}</h3>
                <p className="text-gray-700 lowercase">{defaultContent.values.vision.text}</p>
              </div>
              
              {/* Mission */}
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-['Montserrat'] font-medium text-[#00ade0] mb-4 lowercase">{defaultContent.values.mission.title}</h3>
                <p className="text-gray-700 lowercase">{defaultContent.values.mission.text}</p>
              </div>
              
              {/* Values */}
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-['Montserrat'] font-medium text-[#00ade0] mb-4 lowercase">{defaultContent.values.values.title}</h3>
                <p className="text-gray-700 mb-4 lowercase">{defaultContent.values.values.p1}</p>
                <p className="text-gray-700 lowercase">{defaultContent.values.values.p2}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Timeline Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-['Montserrat'] font-normal text-center mb-12 lowercase">{defaultContent.timeline}</h2>
            
            <div className="max-w-4xl mx-auto relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#00ade0]/20"></div>
              
              {/* Timeline items */}
              <div className="relative z-10">
                {/* 1991 */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">1991</h3>
                      <p className="text-gray-700 lowercase">{defaultContent.timelineEvents[1991]}</p>
                    </div>
                  </div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                </div>
                
                {/* 1992 */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">1992</h3>
                      <p className="text-gray-700 lowercase">{defaultContent.timelineEvents[1992]}</p>
                    </div>
                  </div>
                </div>
                
                {/* 1998 */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">1998</h3>
                      <p className="text-gray-700 lowercase">{defaultContent.timelineEvents[1998]}</p>
                    </div>
                  </div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                </div>
                
                {/* 2005 */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2005</h3>
                      <p className="text-gray-700 lowercase">{defaultContent.timelineEvents[2005]}</p>
                    </div>
                  </div>
                </div>
                
                {/* 2014 - Lado esquerdo */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2014</h3>
                      <p className="text-gray-700 lowercase">{defaultContent.timelineEvents["20141"]}</p>
                    </div>
                  </div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                </div>
                
                {/* 2014 - Lado direito - Healthcare */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2014</h3>
                      <p className="text-gray-700 lowercase">{defaultContent.timelineEvents["20142"]}</p>
                    </div>
                  </div>
                </div>
                
                {/* 2016 - Trustness */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2016</h3>
                      <p className="text-gray-700 lowercase">{defaultContent.timelineEvents["2016"]}</p>
                    </div>
                  </div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                </div>
                
                {/* 2017 - Healthcare BU */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2017</h3>
                      <p className="text-gray-700 lowercase">{defaultContent.timelineEvents["2017"]}</p>
                    </div>
                  </div>
                </div>
                
                {/* 2018 - Trustness BU */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2018</h3>
                      <p className="text-gray-700 lowercase">{defaultContent.timelineEvents["2018"]}</p>
                    </div>
                  </div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                </div>
                
                {/* 2019 - Healthcare spin-off */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2019</h3>
                      <p className="text-gray-700 lowercase">{defaultContent.timelineEvents["2019"]}</p>
                    </div>
                  </div>
                </div>
                
                {/* 2020 - NESS Health rebranded */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2020</h3>
                      <p className="text-gray-700 lowercase">{defaultContent.timelineEvents["2020"]}</p>
                    </div>
                  </div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                </div>
                
                {/* 2021 - forense.io incubation */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2021</h3>
                      <p className="text-gray-700 lowercase">{defaultContent.timelineEvents["2021"]}</p>
                    </div>
                  </div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                </div>
                
                {/* 2022 - forense.io BU */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2022</h3>
                      <p className="text-gray-700 lowercase">{defaultContent.timelineEvents["2022"]}</p>
                    </div>
                  </div>
                </div>
                
                {/* 2025 */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-[#00ade0]">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2025</h3>
                      <p className="text-gray-700 lowercase">{defaultContent.timelineEvents["2025"]}</p>
                    </div>
                  </div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-['Montserrat'] font-normal mb-6 lowercase">{defaultContent.cta.title}</h2>
            <a href="/contact" className="inline-block bg-[#00ade0] hover:bg-[#00ade0]/90 text-white px-8 py-3 rounded-sm transition duration-300 lowercase">
              {defaultContent.cta.button}
            </a>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
