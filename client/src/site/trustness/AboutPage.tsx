import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/common/SEOHead';
import SiteLayout from '@/site/layout/SiteLayout';
import { Content } from '@shared/schema';
import { useSite } from '@/site/SiteContext';

export default function TrustnessAboutPage() {
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
      heroTitle: "consultoria especializada em segurança da informação, privacidade e conformidade",
      heroSubtitle: "avaliamos, auditamos e estruturamos práticas de proteção a dados e ativos digitais",
      manifesto: {
        main: "somos trustness.",
        p1: "avaliação criteriosa • estratégias eficazes • resultados duradouros",
        p2: "orientamos organizações pelo caminho da conformidade.",
        p3: "combinamos rigor metodológico e abordagem consultiva para proteger o que importa.",
        p4: "conhecimento técnico com visão estratégica."
      },
      values: {
        title: "nossos valores",
        vision: {
          title: "nossa visão",
          text: "ser referência em consultoria de segurança da informação e privacidade, reconhecida pela excelência técnica e capacidade de traduzir complexidade regulatória em ações práticas e eficazes. fortalecer a cultura de proteção de dados e ativos digitais em organizações de todos os setores."
        },
        mission: {
          title: "nossa missão",
          text: "conduzir organizações ao mais alto nível de maturidade em segurança da informação e privacidade, através de metodologias comprovadas e apoio contínuo. transformar requisitos regulatórios em oportunidades de diferenciação estratégica para nossos clientes."
        },
        values: {
          title: "nossos valores",
          p1: "confiança: base de nossa relação com clientes e parceiros, construída sobre transparência, integridade e entrega consistente de resultados.",
          p2: "excelência técnica: compromisso com o rigor metodológico, atualização constante e aplicação das melhores práticas internacionais.",
          p3: "pragmatismo: foco em soluções aplicáveis à realidade de cada organização, evitando recomendações genéricas ou inviáveis.",
          p4: "confidencialidade: respeito absoluto às informações sensíveis acessadas durante nossos trabalhos, garantindo discrição e proteção."
        }
      },
      timeline: "nossa trajetória",
      timelineEvents: {
        "2016": "incubação da trustness dentro da estrutura da ness.",
        "2017": "primeiros projetos de adequação à ISO 27001 e consultorias em segurança da informação.",
        "2018": "trustness torna-se unidade de negócios independente, com equipe dedicada.",
        "2019": "expansão da atuação para projetos de privacidade e proteção de dados pessoais.",
        "2020": "desenvolvimento de metodologia própria para adequação à LGPD (Lei Geral de Proteção de Dados).",
        "2022": "crescimento do portfólio de clientes em setores regulados (saúde, finanças, seguros).",
        "2023": "fortalecimento das capacidades em cyber risk assessment e privacy by design.",
        "2025": "consolidação como consultoria especializada com atuação nacional e reconhecimento de mercado."
      },
      cta: {
        title: "quer saber mais sobre a trustness?",
        button: "fale conosco"
      }
    },
    en: {
      title: "about us",
      heroTitle: "specialized consulting in information security, privacy and compliance",
      heroSubtitle: "we assess, audit and structure practices to protect data and digital assets",
      manifesto: {
        main: "we are trustness.",
        p1: "thorough assessment • effective strategies • lasting results",
        p2: "we guide organizations through the path of compliance.",
        p3: "we combine methodological rigor and a consultative approach to protect what matters.",
        p4: "technical knowledge with strategic vision."
      },
      values: {
        title: "our values",
        vision: {
          title: "our vision",
          text: "to be a reference in information security and privacy consulting, recognized for technical excellence and the ability to translate regulatory complexity into practical and effective actions. to strengthen the culture of data protection and digital assets in organizations across all sectors."
        },
        mission: {
          title: "our mission",
          text: "to lead organizations to the highest level of maturity in information security and privacy through proven methodologies and continuous support. to transform regulatory requirements into strategic differentiation opportunities for our clients."
        },
        values: {
          title: "our values",
          p1: "trust: the foundation of our relationship with clients and partners, built on transparency, integrity, and consistent delivery of results.",
          p2: "technical excellence: commitment to methodological rigor, constant updating, and application of international best practices.",
          p3: "pragmatism: focus on solutions applicable to the reality of each organization, avoiding generic or unfeasible recommendations.",
          p4: "confidentiality: absolute respect for sensitive information accessed during our work, ensuring discretion and protection."
        }
      },
      timeline: "our journey",
      timelineEvents: {
        "2016": "incubation of trustness within the ness structure.",
        "2017": "first ISO 27001 compliance projects and information security consultancy.",
        "2018": "trustness becomes an independent business unit with dedicated team.",
        "2019": "expansion of activities to privacy and personal data protection projects.",
        "2020": "development of proprietary methodology for compliance with LGPD (Brazilian General Data Protection Law).",
        "2022": "growth of client portfolio in regulated sectors (healthcare, finance, insurance).",
        "2023": "strengthening capabilities in cyber risk assessment and privacy by design.",
        "2025": "consolidation as a specialized consultancy with national presence and market recognition."
      },
      cta: {
        title: "want to know more about trustness?",
        button: "contact us"
      }
    },
    es: {
      title: "quiénes somos",
      heroTitle: "consultoría especializada en seguridad de la información, privacidad y conformidad",
      heroSubtitle: "evaluamos, auditamos y estructuramos prácticas de protección de datos y activos digitales",
      manifesto: {
        main: "somos trustness.",
        p1: "evaluación rigurosa • estrategias eficaces • resultados duraderos",
        p2: "orientamos a organizaciones por el camino de la conformidad.",
        p3: "combinamos rigor metodológico y enfoque consultivo para proteger lo que importa.",
        p4: "conocimiento técnico con visión estratégica."
      },
      values: {
        title: "nuestros valores",
        vision: {
          title: "nuestra visión",
          text: "ser referencia en consultoría de seguridad de la información y privacidad, reconocida por la excelencia técnica y la capacidad de traducir la complejidad regulatoria en acciones prácticas y eficaces. fortalecer la cultura de protección de datos y activos digitales en organizaciones de todos los sectores."
        },
        mission: {
          title: "nuestra misión",
          text: "conducir organizaciones al más alto nivel de madurez en seguridad de la información y privacidad a través de metodologías comprobadas y apoyo continuo. transformar requisitos regulatorios en oportunidades de diferenciación estratégica para nuestros clientes."
        },
        values: {
          title: "nuestros valores",
          p1: "confianza: base de nuestra relación con clientes y socios, construida sobre transparencia, integridad y entrega consistente de resultados.",
          p2: "excelencia técnica: compromiso con el rigor metodológico, actualización constante y aplicación de las mejores prácticas internacionales.",
          p3: "pragmatismo: enfoque en soluciones aplicables a la realidad de cada organización, evitando recomendaciones genéricas o inviables.",
          p4: "confidencialidad: respeto absoluto a las informaciones sensibles accedidas durante nuestros trabajos, garantizando discreción y protección."
        }
      },
      timeline: "nuestra trayectoria",
      timelineEvents: {
        "2016": "incubación de trustness dentro de la estructura de ness.",
        "2017": "primeros proyectos de adecuación a ISO 27001 y consultorías en seguridad de la información.",
        "2018": "trustness se convierte en unidad de negocios independiente, con equipo dedicado.",
        "2019": "expansión de la actuación para proyectos de privacidad y protección de datos personales.",
        "2020": "desarrollo de metodología propia para adecuación a LGPD (Ley General de Protección de Datos de Brasil).",
        "2022": "crecimiento del portafolio de clientes en sectores regulados (salud, finanzas, seguros).",
        "2023": "fortalecimiento de las capacidades en evaluación de riesgo cibernético y privacidad desde el diseño.",
        "2025": "consolidación como consultoría especializada con actuación nacional y reconocimiento de mercado."
      },
      cta: {
        title: "¿quieres saber más sobre trustness?",
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
        {/* Hero Section com fundo escuro e estilo consistente */}
        <section 
          className="pt-32 pb-20 text-white bg-[#0b1016] relative"
          style={{
            backgroundImage: 'url(/assets/images/trustness-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay para garantir contraste com o texto */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-['Montserrat'] font-normal mb-6 lowercase">
                trustness<span className="text-[#005fa3]">.</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {defaultContent.heroSubtitle}
              </p>
            </div>
          </div>
        </section>
        
        {/* Manifesto Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-['Montserrat'] font-normal text-2xl md:text-3xl mb-6 text-center lowercase">
                <span className="font-normal">
                  {language === 'pt' ? 'somos a' : language === 'es' ? 'somos' : 'we are'}
                </span> <span className="text-black font-normal">trustness<span className="text-[#005fa3]">.</span></span>
              </h2>
              
              <div className="prose prose-base mx-auto text-gray-700 lowercase">
                <p className="mb-6 text-center font-light tracking-wide text-lg">
                  {defaultContent.manifesto.p1.replace(' • ', ' ') 
                    .split(' • ')
                    .map((item, index, arr) => (
                      <>
                        {item}
                        {index < arr.length - 1 && <span className="text-[#005fa3]"> • </span>}
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
        <section className="py-20 bg-[#1a1a22] text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-['Montserrat'] font-normal text-center mb-12 lowercase text-white">{defaultContent.values.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Vision */}
              <div className="bg-[#21212b] p-8 rounded-sm border-l-2 border-[#005fa3]">
                <h3 className="text-xl font-['Montserrat'] font-normal mb-4 lowercase text-white">
                  {defaultContent.values.vision.title}
                </h3>
                <p className="text-gray-300 lowercase">
                  {defaultContent.values.vision.text}
                </p>
              </div>
              
              {/* Mission */}
              <div className="bg-[#21212b] p-8 rounded-sm border-l-2 border-[#005fa3]">
                <h3 className="text-xl font-['Montserrat'] font-normal mb-4 lowercase text-white">
                  {defaultContent.values.mission.title}
                </h3>
                <p className="text-gray-300 lowercase">
                  {defaultContent.values.mission.text}
                </p>
              </div>
              
              {/* Values */}
              <div className="bg-[#21212b] p-8 rounded-sm border-l-2 border-[#005fa3]">
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
        <section className="py-20 bg-[#1a1a22] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-['Montserrat'] font-normal mb-8 lowercase">
              {language === 'pt' 
                ? <>quer saber mais sobre a <span className="font-normal">trustness<span className="text-[#005fa3]">.</span></span>?</> 
                : language === 'en'
                  ? <>want to know more about <span className="font-normal">trustness<span className="text-[#005fa3]">.</span></span>?</>
                  : <>¿quieres saber más sobre <span className="font-normal">trustness<span className="text-[#005fa3]">.</span></span>?</>
              }
            </h2>
            
            <a 
              href="/site/trustness/contact" 
              className="inline-block bg-[#005fa3] hover:bg-opacity-90 text-white py-3 px-8 rounded lowercase transition duration-300"
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