import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../../SiteContext';
import SiteLayout from '../../layout/SiteLayout';
import { Link } from 'wouter';

export default function NessInfraOpsPage() {
  const { siteConfig } = useSite();
  const { language, t } = useI18n();
  
  // Buscar conteúdo da página específico para o serviço
  const { data: pageContent, isLoading, error } = useQuery({
    queryKey: ['/api/content/services/infraops', language, siteConfig.code],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/content/services/infraops?lang=${language}&site=${siteConfig.code}`);
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
      title: 'n.InfraOps',
      description: 'gestão moderna de infraestrutura com alta disponibilidade',
      intro: 'o n.InfraOps da ness oferece um modelo modular e integrado para gerenciamento de infraestrutura, garantindo operações confiáveis, alta disponibilidade e escalabilidade para ambientes corporativos de qualquer porte.',
      sections: [
        {
          title: 'arquitetura de nuvem',
          content: 'projeto e implementação de infraestruturas otimizadas para ambientes multi-cloud e híbridos, com foco em segurança, desempenho e custo-benefício.'
        },
        {
          title: 'monitoramento contínuo',
          content: 'solução completa de observabilidade que integra métricas, logs e traces para visibilidade total da infraestrutura, com alertas inteligentes e diagnósticos automatizados.'
        },
        {
          title: 'automação de infraestrutura',
          content: 'implementação da infraestrutura como código (IaC) e automação de processos para garantir consistência, governança e agilidade na entrega de recursos.'
        },
        {
          title: 'backup e recuperação',
          content: 'estratégias avançadas de proteção de dados e sistemas com políticas personalizadas de retenção e recuperação rápida em caso de falhas.'
        }
      ],
      features: [
        {
          title: 'abordagem devops',
          content: 'integração de processos e ferramentas para permitir entregas mais rápidas e confiáveis, promovendo colaboração entre desenvolvimento e operações.'
        },
        {
          title: 'gestão de contêineres',
          content: 'soluções completas para orquestração de contêineres com Kubernetes, incluindo segurança, monitoramento e estratégias de implantação.'
        },
        {
          title: 'otimização de recursos',
          content: 'análise contínua do uso de recursos para identificar oportunidades de economia e melhorias de desempenho na infraestrutura.'
        }
      ],
      benefits: [
        'redução de downtime e incidentes operacionais',
        'escalabilidade sob demanda',
        'otimização de custos de infraestrutura',
        'agilidade para inovação'
      ],
      cta: {
        title: 'sua infraestrutura está preparada para os desafios atuais?',
        button: 'converse com nosso time'
      }
    },
    en: {
      title: 'n.InfraOps',
      description: 'modern infrastructure management with high availability',
      intro: 'ness\'s n.InfraOps offers a modular and integrated model for infrastructure management, ensuring reliable operations, high availability, and scalability for corporate environments of any size.',
      sections: [
        {
          title: 'cloud architecture',
          content: 'design and implementation of optimized infrastructures for multi-cloud and hybrid environments, focusing on security, performance, and cost-effectiveness.'
        },
        {
          title: 'continuous monitoring',
          content: 'complete observability solution that integrates metrics, logs, and traces for total infrastructure visibility, with intelligent alerts and automated diagnostics.'
        },
        {
          title: 'infrastructure automation',
          content: 'implementation of infrastructure as code (IaC) and process automation to ensure consistency, governance, and agility in resource delivery.'
        },
        {
          title: 'backup and recovery',
          content: 'advanced data and systems protection strategies with customized retention policies and rapid recovery in case of failures.'
        }
      ],
      features: [
        {
          title: 'devops approach',
          content: 'integration of processes and tools to enable faster and more reliable deliveries, promoting collaboration between development and operations.'
        },
        {
          title: 'container management',
          content: 'complete solutions for container orchestration with Kubernetes, including security, monitoring, and deployment strategies.'
        },
        {
          title: 'resource optimization',
          content: 'continuous analysis of resource usage to identify opportunities for savings and performance improvements in infrastructure.'
        }
      ],
      benefits: [
        'reduction of downtime and operational incidents',
        'on-demand scalability',
        'infrastructure cost optimization',
        'agility for innovation'
      ],
      cta: {
        title: 'is your infrastructure prepared for current challenges?',
        button: 'talk to our team'
      }
    },
    es: {
      title: 'n.InfraOps',
      description: 'gestión moderna de infraestructura con alta disponibilidad',
      intro: 'el n.InfraOps de ness ofrece un modelo modular e integrado para la gestión de infraestructura, garantizando operaciones confiables, alta disponibilidad y escalabilidad para entornos corporativos de cualquier tamaño.',
      sections: [
        {
          title: 'arquitectura de nube',
          content: 'diseño e implementación de infraestructuras optimizadas para entornos multi-cloud e híbridos, con enfoque en seguridad, rendimiento y costo-beneficio.'
        },
        {
          title: 'monitoreo continuo',
          content: 'solución completa de observabilidad que integra métricas, logs y traces para visibilidad total de la infraestructura, con alertas inteligentes y diagnósticos automatizados.'
        },
        {
          title: 'automatización de infraestructura',
          content: 'implementación de infraestructura como código (IaC) y automatización de procesos para garantizar consistencia, gobernanza y agilidad en la entrega de recursos.'
        },
        {
          title: 'backup y recuperación',
          content: 'estrategias avanzadas de protección de datos y sistemas con políticas personalizadas de retención y recuperación rápida en caso de fallos.'
        }
      ],
      features: [
        {
          title: 'enfoque devops',
          content: 'integración de procesos y herramientas para permitir entregas más rápidas y confiables, promoviendo la colaboración entre desarrollo y operaciones.'
        },
        {
          title: 'gestión de contenedores',
          content: 'soluciones completas para orquestación de contenedores con Kubernetes, incluyendo seguridad, monitoreo y estrategias de implementación.'
        },
        {
          title: 'optimización de recursos',
          content: 'análisis continuo del uso de recursos para identificar oportunidades de ahorro y mejoras de rendimiento en la infraestructura.'
        }
      ],
      benefits: [
        'reducción de downtime e incidentes operacionales',
        'escalabilidad bajo demanda',
        'optimización de costos de infraestructura',
        'agilidad para innovación'
      ],
      cta: {
        title: '¿su infraestructura está preparada para los desafíos actuales?',
        button: 'converse con nuestro equipo'
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
      canonicalUrl={`https://${siteConfig.domain}/services/infraops`}
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
              {language === 'pt' && 'soluções'}
              {language === 'en' && 'solutions'}
              {language === 'es' && 'soluciones'}
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
              {language === 'pt' && 'diferenciais'}
              {language === 'en' && 'differentials'}
              {language === 'es' && 'diferenciales'}
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