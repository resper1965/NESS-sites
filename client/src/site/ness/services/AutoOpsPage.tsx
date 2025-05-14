import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../../SiteContext';
import SiteLayout from '../../layout/SiteLayout';
import { Link } from 'wouter';

export default function NessAutoOpsPage() {
  const { siteConfig } = useSite();
  const { language, t } = useI18n();
  
  // Buscar conteúdo da página específico para o serviço
  const { data: pageContent, isLoading, error } = useQuery({
    queryKey: ['/api/content/services/autoops', language, siteConfig.code],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/content/services/autoops?lang=${language}&site=${siteConfig.code}`);
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
      title: 'n.AutoOps',
      description: 'automação inteligente de processos com IA',
      intro: 'o n.AutoOps da ness combina tecnologias de automação com inteligência artificial para transformar processos operacionais, aumentar eficiência e reduzir custos, permitindo que as equipes foquem em atividades estratégicas.',
      sections: [
        {
          title: 'avaliação de processos',
          content: 'análise detalhada do fluxo de trabalho atual para identificar oportunidades de automação, gargalos operacionais e potenciais ganhos de eficiência.'
        },
        {
          title: 'automação inteligente',
          content: 'implementação de soluções de automação potencializadas por IA que podem aprender e se adaptar, executando tarefas complexas com mínima intervenção humana.'
        },
        {
          title: 'orquestração de processos',
          content: 'integração e coordenação de múltiplos sistemas e fluxos de trabalho para criar processos fim-a-fim coesos e eficientes.'
        },
        {
          title: 'monitoramento contínuo',
          content: 'acompanhamento em tempo real dos processos automatizados com análise de desempenho e detecção proativa de problemas.'
        }
      ],
      features: [
        {
          title: 'hyper-automação',
          content: 'abordagem que combina RPA, IA/ML e outras tecnologias avançadas para maximizar o escopo e a profundidade da automação em toda a organização.'
        },
        {
          title: 'processamento cognitivo',
          content: 'capacidade de interpretar dados não estruturados, como texto, imagens e voz, permitindo a automação de tarefas que tradicionalmente requeriam inteligência humana.'
        },
        {
          title: 'análise preditiva',
          content: 'utilização de dados históricos e atuais para prever tendências e comportamentos futuros, otimizando processos antes de problemas ocorrerem.'
        }
      ],
      benefits: [
        'aumento de produtividade e eficiência',
        'redução de erros operacionais',
        'escalabilidade sem aumento proporcional de custos',
        'liberação de recursos para inovação'
      ],
      cta: {
        title: 'pronto para automatizar suas operações com inteligência?',
        button: 'solicite uma avaliação'
      }
    },
    en: {
      title: 'n.AutoOps',
      description: 'intelligent process automation with AI',
      intro: 'ness\'s n.AutoOps combines automation technologies with artificial intelligence to transform operational processes, increase efficiency, and reduce costs, allowing teams to focus on strategic activities.',
      sections: [
        {
          title: 'process assessment',
          content: 'detailed analysis of current workflow to identify automation opportunities, operational bottlenecks, and potential efficiency gains.'
        },
        {
          title: 'intelligent automation',
          content: 'implementation of AI-powered automation solutions that can learn and adapt, executing complex tasks with minimal human intervention.'
        },
        {
          title: 'process orchestration',
          content: 'integration and coordination of multiple systems and workflows to create cohesive and efficient end-to-end processes.'
        },
        {
          title: 'continuous monitoring',
          content: 'real-time tracking of automated processes with performance analysis and proactive problem detection.'
        }
      ],
      features: [
        {
          title: 'hyper-automation',
          content: 'approach that combines RPA, AI/ML, and other advanced technologies to maximize the scope and depth of automation across the organization.'
        },
        {
          title: 'cognitive processing',
          content: 'ability to interpret unstructured data, such as text, images, and voice, allowing for automation of tasks that traditionally required human intelligence.'
        },
        {
          title: 'predictive analytics',
          content: 'utilization of historical and current data to predict future trends and behaviors, optimizing processes before problems occur.'
        }
      ],
      benefits: [
        'increased productivity and efficiency',
        'reduction of operational errors',
        'scalability without proportional cost increase',
        'resource liberation for innovation'
      ],
      cta: {
        title: 'ready to intelligently automate your operations?',
        button: 'request an assessment'
      }
    },
    es: {
      title: 'n.AutoOps',
      description: 'automatización inteligente de procesos con IA',
      intro: 'el n.AutoOps de ness combina tecnologías de automatización con inteligencia artificial para transformar procesos operacionales, aumentar eficiencia y reducir costos, permitiendo que los equipos se enfoquen en actividades estratégicas.',
      sections: [
        {
          title: 'evaluación de procesos',
          content: 'análisis detallado del flujo de trabajo actual para identificar oportunidades de automatización, cuellos de botella operacionales y potenciales ganancias de eficiencia.'
        },
        {
          title: 'automatización inteligente',
          content: 'implementación de soluciones de automatización potenciadas por IA que pueden aprender y adaptarse, ejecutando tareas complejas con mínima intervención humana.'
        },
        {
          title: 'orquestación de procesos',
          content: 'integración y coordinación de múltiples sistemas y flujos de trabajo para crear procesos de extremo a extremo cohesivos y eficientes.'
        },
        {
          title: 'monitoreo continuo',
          content: 'seguimiento en tiempo real de los procesos automatizados con análisis de desempeño y detección proactiva de problemas.'
        }
      ],
      features: [
        {
          title: 'hiper-automatización',
          content: 'enfoque que combina RPA, IA/ML y otras tecnologías avanzadas para maximizar el alcance y la profundidad de la automatización en toda la organización.'
        },
        {
          title: 'procesamiento cognitivo',
          content: 'capacidad de interpretar datos no estructurados, como texto, imágenes y voz, permitiendo la automatización de tareas que tradicionalmente requerían inteligencia humana.'
        },
        {
          title: 'análisis predictivo',
          content: 'utilización de datos históricos y actuales para predecir tendencias y comportamientos futuros, optimizando procesos antes de que ocurran problemas.'
        }
      ],
      benefits: [
        'aumento de productividad y eficiencia',
        'reducción de errores operacionales',
        'escalabilidad sin aumento proporcional de costos',
        'liberación de recursos para innovación'
      ],
      cta: {
        title: '¿listo para automatizar sus operaciones con inteligencia?',
        button: 'solicite una evaluación'
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
      canonicalUrl={`https://${siteConfig.domain}/services/autoops`}
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
              {language === 'pt' && 'componentes essenciais'}
              {language === 'en' && 'essential components'}
              {language === 'es' && 'componentes esenciales'}
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
      
      {/* Tecnologias */}
      <section className="conteudo bg-white" style={{ padding: "4rem 0" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-['Montserrat'] font-normal mb-12 text-center lowercase">
              {language === 'pt' && 'tecnologias avançadas'}
              {language === 'en' && 'advanced technologies'}
              {language === 'es' && 'tecnologías avanzadas'}
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