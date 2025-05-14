import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../../SiteContext';
import SiteLayout from '../../layout/SiteLayout';
import { Link } from 'wouter';

export default function NessDevArchPage() {
  const { siteConfig } = useSite();
  const { language, t } = useI18n();
  
  // Buscar conteúdo da página específico para o serviço
  const { data: pageContent, isLoading, error } = useQuery({
    queryKey: ['/api/content/services/devarch', language, siteConfig.code],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/content/services/devarch?lang=${language}&site=${siteConfig.code}`);
        if (!res.ok) throw new Error('Failed to fetch content');
        return res.json();
      } catch (error) {
        console.error("Error fetching content:", error);
        return null;
      }
    }
  });
  
  // Conteúdo padrão caso não haja conteúdo específico no banco de dados
  const defaultContent = {
    pt: {
      title: 'n.DevArch',
      description: 'fundamentos sólidos para desenvolvimento com arquitetura e IA',
      intro: 'o n.DevArch da ness cria bases sólidas para o desenvolvimento de software com foco em arquitetura moderna, integrando inteligência artificial para elevar a qualidade, eficiência e escalabilidade dos sistemas.',
      sections: [
        {
          title: 'arquitetura moderna',
          content: 'concepção de arquiteturas escaláveis e resilientes utilizando padrões como microserviços, event-driven e serverless, adaptadas às necessidades específicas de cada negócio.'
        },
        {
          title: 'infraestrutura como código',
          content: 'automação da configuração e provisionamento de ambientes, garantindo consistência e reprodutibilidade em todo o ciclo de desenvolvimento.'
        },
        {
          title: 'integração com IA',
          content: 'implementação de componentes de inteligência artificial para otimização de processos, tomada de decisões e automação avançada dentro dos sistemas desenvolvidos.'
        },
        {
          title: 'pipeline de entrega contínua',
          content: 'configuração de pipelines automatizados com integração, testes e entrega contínuas para garantir rapidez e confiabilidade nas atualizações de software.'
        }
      ],
      features: [
        {
          title: 'padrões de design',
          content: 'implementação de padrões consagrados e emergentes que garantem sistemas manuteníveis, flexíveis e facilmente adaptáveis a novas necessidades.'
        },
        {
          title: 'modernização de legacy',
          content: 'estratégias para modernizar gradualmente sistemas legados sem interrupções operacionais, incluindo abordagens como strangler pattern e refatoração incremental.'
        },
        {
          title: 'qualidade de código',
          content: 'práticas e ferramentas para garantir a qualidade e consistência do código, incluindo revisão automatizada, análise estática e cobertura de testes.'
        }
      ],
      benefits: [
        'redução do tempo de desenvolvimento',
        'maior adaptabilidade a mudanças',
        'integração nativa com IA',
        'escalabilidade garantida'
      ],
      cta: {
        title: 'precisa de uma base sólida para seus projetos de software?',
        button: 'vamos conversar'
      }
    },
    en: {
      title: 'n.DevArch',
      description: 'solid foundations for development with architecture and AI',
      intro: 'ness\'s n.DevArch creates solid foundations for software development focusing on modern architecture, integrating artificial intelligence to elevate the quality, efficiency, and scalability of systems.',
      sections: [
        {
          title: 'modern architecture',
          content: 'conception of scalable and resilient architectures using patterns such as microservices, event-driven, and serverless, adapted to the specific needs of each business.'
        },
        {
          title: 'infrastructure as code',
          content: 'automation of environment configuration and provisioning, ensuring consistency and reproducibility throughout the development cycle.'
        },
        {
          title: 'AI integration',
          content: 'implementation of artificial intelligence components for process optimization, decision making, and advanced automation within developed systems.'
        },
        {
          title: 'continuous delivery pipeline',
          content: 'configuration of automated pipelines with continuous integration, testing, and delivery to ensure speed and reliability in software updates.'
        }
      ],
      features: [
        {
          title: 'design patterns',
          content: 'implementation of established and emerging patterns that ensure systems are maintainable, flexible, and easily adaptable to new needs.'
        },
        {
          title: 'legacy modernization',
          content: 'strategies to gradually modernize legacy systems without operational interruptions, including approaches such as strangler pattern and incremental refactoring.'
        },
        {
          title: 'code quality',
          content: 'practices and tools to ensure code quality and consistency, including automated review, static analysis, and test coverage.'
        }
      ],
      benefits: [
        'reduced development time',
        'greater adaptability to changes',
        'native integration with AI',
        'guaranteed scalability'
      ],
      cta: {
        title: 'need a solid foundation for your software projects?',
        button: 'let\'s talk'
      }
    },
    es: {
      title: 'n.DevArch',
      description: 'fundamentos sólidos para desarrollo con arquitectura e IA',
      intro: 'el n.DevArch de ness crea bases sólidas para el desarrollo de software con enfoque en arquitectura moderna, integrando inteligencia artificial para elevar la calidad, eficiencia y escalabilidad de los sistemas.',
      sections: [
        {
          title: 'arquitectura moderna',
          content: 'concepción de arquitecturas escalables y resilientes utilizando patrones como microservicios, event-driven y serverless, adaptadas a las necesidades específicas de cada negocio.'
        },
        {
          title: 'infraestructura como código',
          content: 'automatización de la configuración y aprovisionamiento de entornos, garantizando consistencia y reproducibilidad en todo el ciclo de desarrollo.'
        },
        {
          title: 'integración con IA',
          content: 'implementación de componentes de inteligencia artificial para optimización de procesos, toma de decisiones y automatización avanzada dentro de los sistemas desarrollados.'
        },
        {
          title: 'pipeline de entrega continua',
          content: 'configuración de pipelines automatizados con integración, pruebas y entrega continuas para garantizar rapidez y confiabilidad en las actualizaciones de software.'
        }
      ],
      features: [
        {
          title: 'patrones de diseño',
          content: 'implementación de patrones consagrados y emergentes que garantizan sistemas mantenibles, flexibles y fácilmente adaptables a nuevas necesidades.'
        },
        {
          title: 'modernización de legacy',
          content: 'estrategias para modernizar gradualmente sistemas heredados sin interrupciones operacionales, incluyendo enfoques como strangler pattern y refactorización incremental.'
        },
        {
          title: 'calidad de código',
          content: 'prácticas y herramientas para garantizar la calidad y consistencia del código, incluyendo revisión automatizada, análisis estático y cobertura de pruebas.'
        }
      ],
      benefits: [
        'reducción del tiempo de desarrollo',
        'mayor adaptabilidad a cambios',
        'integración nativa con IA',
        'escalabilidad garantizada'
      ],
      cta: {
        title: '¿necesita una base sólida para sus proyectos de software?',
        button: 'vamos a conversar'
      }
    }
  };
  
  // Conteúdo a ser exibido (do banco de dados ou padrão)
  const content = pageContent?.content ? JSON.parse(pageContent.content) : defaultContent[language];
  
  // Definir o título da página com base no conteúdo
  const pageTitle = pageContent?.metaTitle || `${content.title} - ${siteConfig.metadata?.defaultTitle}`;
  const pageDescription = pageContent?.metaDescription || content.description;
  
  if (isLoading) {
    return (
      <SiteLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#00ade0]"></div>
        </div>
      </SiteLayout>
    );
  }
  
  // Formatação do nome do serviço com estilo e ponto azul
  const formatServiceName = (name: string) => {
    if (name.startsWith('n.')) {
      return (
        <span className="font-['Montserrat'] font-normal">
          n<span className="text-[#00ade0]">.</span>{name.substring(2)}
        </span>
      );
    }
    return <span className="font-['Montserrat'] font-normal">{name}</span>;
  };
  
  return (
    <SiteLayout
      title={pageTitle}
      description={pageDescription}
      ogImage={pageContent?.ogImage}
      canonicalUrl={`https://${siteConfig.domain}/services/devarch`}
    >
      {/* Hero Section */}
      <section className="intro bg-[#121212] relative flex items-center justify-center" style={{ minHeight: "60vh" }}>
        <div className="container mx-auto px-4 z-10">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-['Montserrat'] font-normal mb-6 text-white">
              {formatServiceName(content.title)}
            </h1>
            <p className="text-xl md:text-2xl font-['Montserrat'] font-light mb-8 max-w-4xl mx-auto text-white lowercase">
              {content.description}
            </p>
          </div>
        </div>
      </section>
      
      {/* Intro Section */}
      <section className="conteudo bg-white" style={{ padding: "4rem 0" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              {content.intro}
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Features */}
      <section className="conteudo bg-gray-50" style={{ padding: "4rem 0" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-['Montserrat'] font-normal mb-12 text-center lowercase">
              {language === 'pt' && 'pilares técnicos'}
              {language === 'en' && 'technical pillars'}
              {language === 'es' && 'pilares técnicos'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {content.sections.map((section: any, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-['Montserrat'] font-medium mb-4 text-gray-800 lowercase">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Diferenciais */}
      <section className="conteudo bg-white" style={{ padding: "4rem 0" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-['Montserrat'] font-normal mb-12 text-center lowercase">
              {language === 'pt' && 'metodologias'}
              {language === 'en' && 'methodologies'}
              {language === 'es' && 'metodologías'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.features.map((feature: any, index: number) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-['Montserrat'] font-medium mb-4 text-gray-800 lowercase">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefícios */}
      <section className="conteudo bg-gray-50" style={{ padding: "4rem 0" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-['Montserrat'] font-normal mb-10 text-center lowercase">
              {language === 'pt' && 'benefícios'}
              {language === 'en' && 'benefits'}
              {language === 'es' && 'beneficios'}
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4">
              {content.benefits.map((benefit: string, index: number) => (
                <div key={index} className="bg-white px-5 py-3 rounded-full shadow-sm">
                  <span className="text-gray-700 text-sm lowercase">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="conteudo bg-[#121212] text-white" style={{ padding: "4rem 0", minHeight: "400px" }}>
        <div className="container mx-auto px-4 flex items-center justify-center h-full">
          <div className="text-center max-w-3xl">
            <h2 className="text-2xl font-['Montserrat'] font-normal mb-8">
              {content.cta.title}
            </h2>
            <Link href="/site/ness/contact" className="inline-block bg-[#00ade0] hover:bg-[#0095c4] text-white py-3 px-8 font-normal transition duration-300 rounded-sm font-['Montserrat'] lowercase">
              {content.cta.button}
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}