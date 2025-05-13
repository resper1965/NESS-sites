import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/common/SEOHead';
import SiteLayout from '@/site/layout/SiteLayout';
import { Content } from '@shared/schema';
import { useSite } from '@/site/SiteContext';

export default function ForenseAboutPage() {
  const { t, language } = useI18n();
  const { siteConfig } = useSite();
  
  // Fetch about content
  const { data: content, isLoading } = useQuery<Content>({
    queryKey: [`/api/content/about?lang=${language}&site=${siteConfig.code}`],
  });

  // Content translations for different languages
  const localizedContent = {
    pt: {
      title: "quem somos",
      heroTitle: "na forense.io, traduzimos a complexidade técnica em clareza, combinando confiança com décadas de experiência",
      heroSubtitle: "expertise avançada em análise, recuperação e validação de evidências digitais",
      manifesto: {
        main: "somos forense.io.",
        p1: "precisão • integridade • resultados",
        p2: "traduzimos complexidade técnica em clareza.",
        p3: "combinamos experiência digital e foco jurídico para transformar evidências em resultados.",
        p4: "expertise técnica com visão estratégica."
      },
      values: {
        title: "nossos valores",
        vision: {
          title: "nossa visão",
          text: "nossa visão é ser reconhecidos como o parceiro confiável e inovador na resolução de questões legais relacionadas aos ambientes digitais."
        },
        mission: {
          title: "nossa missão",
          text: "a missão da forense.io é prover soluções eficazes e abrangentes em forense digital, auxiliando nossos clientes na obtenção de resultados precisos e justos no contexto legal."
        },
        values: {
          title: "nossos princípios",
          p1: "confiabilidade: demonstramos compromisso com a precisão e integridade em todos os processos de análise forense que realizamos.",
          p2: "inovação técnica: aplicamos as metodologias e ferramentas mais avançadas para garantir resultados confiáveis e relevantes.",
          p3: "objetividade: mantemos rigor metodológico e abordagem científica em todas as análises, garantindo resultados imparciais.",
          p4: "confidencialidade: protegemos com o mais alto nível de segurança as informações sensíveis dos nossos clientes."
        }
      },
      timeline: "nossa trajetória",
      timelineEvents: {
        "2014": "início do desenvolvimento de metodologias de forense digital dentro da estrutura da ness.",
        "2017": "criação da divisão especializada em forense digital com time dedicado.",
        "2018": "primeiras parcerias com escritórios de advocacia para análise de evidências digitais.",
        "2020": "desenvolvimento de tecnologias proprietárias de preservação e validação de evidências digitais.",
        "2021": "consolidação da marca forense.io como unidade independente de negócios da ness.",
        "2023": "expansão do portfólio de serviços forenses e crescimento das operações em todo o Brasil.",
        "2024": "implementação de laboratório avançado de análise forense digital.",
        "2025": "reconhecimento como referência nacional em forense digital e integração de inteligência artificial nas análises."
      },
      cta: {
        title: "quer saber mais sobre a forense.io?",
        button: "fale conosco"
      }
    },
    en: {
      title: "about us",
      heroTitle: "at forense.io, we translate technical complexity into clarity, combining trust with decades of experience",
      heroSubtitle: "advanced expertise in analyzing, recovering and validating digital evidence",
      manifesto: {
        main: "we are forense.io.",
        p1: "precision • integrity • results",
        p2: "we translate technical complexity into clarity.",
        p3: "we combine digital expertise and legal focus to transform evidence into results.",
        p4: "technical expertise with strategic vision."
      },
      values: {
        title: "our values",
        vision: {
          title: "our vision",
          text: "our vision is to be recognized as the trusted and innovative partner in resolving legal issues related to digital environments."
        },
        mission: {
          title: "our mission",
          text: "forense.io's mission is to provide effective and comprehensive digital forensic solutions, helping our clients achieve accurate and fair results in legal contexts."
        },
        values: {
          title: "our principles",
          p1: "reliability: we demonstrate commitment to accuracy and integrity in all forensic analysis processes we perform.",
          p2: "technical innovation: we apply the most advanced methodologies and tools to ensure reliable and relevant results.",
          p3: "objectivity: we maintain methodological rigor and scientific approach in all analyses, ensuring impartial results.",
          p4: "confidentiality: we protect our clients' sensitive information with the highest level of security."
        }
      },
      timeline: "our journey",
      timelineEvents: {
        "2014": "initial development of digital forensic methodologies within the ness structure.",
        "2017": "creation of the division specialized in digital forensics with a dedicated team.",
        "2018": "first partnerships with law firms for digital evidence analysis.",
        "2020": "development of proprietary technologies for digital evidence preservation and validation.",
        "2021": "consolidation of the forense.io brand as an independent business unit of ness.",
        "2023": "expansion of forensic services portfolio and growth of operations throughout Brazil.",
        "2024": "implementation of advanced digital forensic analysis laboratory.",
        "2025": "recognition as a national reference in digital forensics and integration of artificial intelligence in analyses."
      },
      cta: {
        title: "want to know more about forense.io?",
        button: "contact us"
      }
    },
    es: {
      title: "quiénes somos",
      heroTitle: "en forense.io, traducimos la complejidad técnica en claridad, combinando confianza con décadas de experiencia",
      heroSubtitle: "experiencia avanzada en análisis, recuperación y validación de evidencias digitales",
      manifesto: {
        main: "somos forense.io.",
        p1: "precisión • integridad • resultados",
        p2: "traducimos complejidad técnica en claridad.",
        p3: "combinamos experiencia digital y enfoque jurídico para transformar evidencias en resultados.",
        p4: "experiencia técnica con visión estratégica."
      },
      values: {
        title: "nuestros valores",
        vision: {
          title: "nuestra visión",
          text: "nuestra visión es ser reconocidos como el socio confiable e innovador en la resolución de cuestiones legales relacionadas con los entornos digitales."
        },
        mission: {
          title: "nuestra misión",
          text: "la misión de forense.io es proporcionar soluciones eficaces y completas en forense digital, ayudando a nuestros clientes a obtener resultados precisos y justos en el contexto legal."
        },
        values: {
          title: "nuestros principios",
          p1: "confiabilidad: demostramos compromiso con la precisión e integridad en todos los procesos de análisis forense que realizamos.",
          p2: "innovación técnica: aplicamos las metodologías y herramientas más avanzadas para garantizar resultados confiables y relevantes.",
          p3: "objetividad: mantenemos rigor metodológico y enfoque científico en todos los análisis, garantizando resultados imparciales.",
          p4: "confidencialidad: protegemos con el más alto nivel de seguridad la información sensible de nuestros clientes."
        }
      },
      timeline: "nuestra trayectoria",
      timelineEvents: {
        "2014": "inicio del desarrollo de metodologías de forense digital dentro de la estructura de ness.",
        "2017": "creación de la división especializada en forense digital con equipo dedicado.",
        "2018": "primeras asociaciones con despachos de abogados para análisis de evidencias digitales.",
        "2020": "desarrollo de tecnologías propietarias de preservación y validación de evidencias digitales.",
        "2021": "consolidación de la marca forense.io como unidad independiente de negocios de ness.",
        "2023": "expansión del portafolio de servicios forenses y crecimiento de las operaciones en todo Brasil.",
        "2024": "implementación de laboratorio avanzado de análisis forense digital.",
        "2025": "reconocimiento como referencia nacional en forense digital e integración de inteligencia artificial en los análisis."
      },
      cta: {
        title: "¿quieres saber más sobre forense.io?",
        button: "contáctanos"
      }
    }
  };

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
        <section className="pt-32 pb-20 text-white bg-[#0d1117] relative">
          {/* Aqui não adicionamos mais imagem de hero conforme solicitado anteriormente */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-['Montserrat'] font-normal mb-6 lowercase">
                forense<span className="text-[#00ade0]">.</span>io
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {defaultContent.heroTitle}
              </p>
            </div>
          </div>
        </section>
        
        {/* Sobre a forense.io Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-['Montserrat'] font-normal text-gray-800 mb-4 lowercase">
                sobre a forense<span className="text-[#00ade0]">.</span>io
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto mb-10">
                convertemos complexidade técnica em resultados judiciais concretos
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-[#0d1117] p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-['Montserrat'] font-normal mb-4 text-white lowercase">
                  expertise forense<span className="text-[#00ade0]">.</span>
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  nossa equipe combina conhecimento técnico avançado com compreensão profunda dos requisitos legais, garantindo que cada evidência coletada seja juridicamente válida e tecnicamente robusta.
                </p>
              </div>
              
              <div className="bg-[#0d1117] p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-['Montserrat'] font-normal mb-4 text-white lowercase">
                  tecnologia avançada<span className="text-[#00ade0]">.</span>
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  utilizamos ferramentas e metodologias proprietárias desenvolvidas ao longo de anos para recuperar, analisar e validar evidências digitais com o mais alto padrão de precisão do mercado.
                </p>
              </div>
              
              <div className="bg-[#0d1117] p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-['Montserrat'] font-normal mb-4 text-white lowercase">
                  resultados concretos<span className="text-[#00ade0]">.</span>
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  nosso trabalho vai além da simples coleta de dados - transformamos evidências técnicas em narrativas claras e defensáveis que sustentam decisões judiciais e corporativas.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-['Montserrat'] font-normal text-center mb-12 lowercase text-white">{defaultContent.values.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="bg-gray-800 p-8 rounded-sm border-l-2 border-[#00ade0]">
                <h3 className="text-xl font-['Montserrat'] font-normal mb-4 lowercase text-white">
                  {defaultContent.values.vision.title}
                </h3>
                <p className="text-gray-300 lowercase">
                  {defaultContent.values.vision.text}
                </p>
              </div>
              
              {/* Mission */}
              <div className="bg-gray-800 p-8 rounded-sm border-l-2 border-[#00ade0]">
                <h3 className="text-xl font-['Montserrat'] font-normal mb-4 lowercase text-white">
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
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-['Montserrat'] font-normal text-center mb-12 lowercase">
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
        <section className="py-20 bg-gray-50 text-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-['Montserrat'] font-normal mb-8 lowercase">
              {language === 'pt' 
                ? <>quer saber mais sobre a <span className="font-normal">forense<span className="text-[#00ade0]">.</span>io</span>?</> 
                : language === 'en'
                  ? <>want to know more about <span className="font-normal">forense<span className="text-[#00ade0]">.</span>io</span>?</>
                  : <>¿quieres saber más sobre <span className="font-normal">forense<span className="text-[#00ade0]">.</span>io</span>?</>
              }
            </h2>
            <a
              href={`/site/forense/contact`}
              className="inline-block bg-[#006699] hover:bg-opacity-90 text-white py-3 px-8 rounded lowercase transition duration-300"
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