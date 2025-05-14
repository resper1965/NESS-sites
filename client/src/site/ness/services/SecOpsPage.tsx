import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../../SiteContext';
import SiteLayout from '../../layout/SiteLayout';
import { Link } from 'wouter';

export default function NessSecOpsPage() {
  const { siteConfig } = useSite();
  const { language, t } = useI18n();
  
  // Buscar conteúdo da página específico para o serviço
  const { data: pageContent, isLoading, error } = useQuery({
    queryKey: ['/api/content/services/secops', language, siteConfig.code],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/content/services/secops?lang=${language}&site=${siteConfig.code}`);
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
      title: 'n.SecOps',
      description: 'segurança integrada às operações com monitoramento contínuo',
      intro: 'o n.SecOps da ness integra segurança às operações com foco em monitoramento contínuo e resposta imediata, protegendo sua infraestrutura de forma inteligente e adaptativa.',
      sections: [
        {
          title: 'monitoramento avançado',
          content: 'vigilância contínua de sistemas, redes e aplicações, identificando ameaças em tempo real com análise comportamental e detecção de anomalias para antecipar riscos.'
        },
        {
          title: 'resposta a incidentes',
          content: 'equipe especializada pronta para atuar em caso de incidentes de segurança, com protocolos estruturados para contenção, erradicação e recuperação eficiente.'
        },
        {
          title: 'avaliações de segurança',
          content: 'testes periódicos de penetração, análise de vulnerabilidades e verificação de configurações para identificar e corrigir falhas antes que sejam exploradas.'
        },
        {
          title: 'proteção de endpoints',
          content: 'soluções modulares para proteção de dispositivos finais, desde antimalware avançado até controles de aplicações e prevenção contra vazamento de dados.'
        }
      ],
      features: [
        {
          title: 'tecnologia adaptativa',
          content: 'soluções que evoluem constantemente para acompanhar as mudanças no cenário de ameaças, utilizando machine learning para melhorar continuamente.'
        },
        {
          title: 'integração nativa',
          content: 'ferramentas que se integram perfeitamente à sua infraestrutura existente, sem interromper ou prejudicar operações em andamento.'
        },
        {
          title: 'visibilidade centralizada',
          content: 'painel único de controle que consolida informações de segurança de toda a organização, facilitando o gerenciamento e a tomada de decisões.'
        }
      ],
      benefits: [
        'proteção contínua sem impacto em performance',
        'redução do tempo de resposta a incidentes',
        'adaptação rápida a novas ameaças',
        'visibilidade total do ambiente de TI'
      ],
      cta: {
        title: 'precisa elevar o nível de segurança da sua operação?',
        button: 'fale com um especialista'
      }
    },
    en: {
      title: 'n.SecOps',
      description: 'integrated security operations with continuous monitoring',
      intro: 'ness\'s n.SecOps integrates security into operations with a focus on continuous monitoring and immediate response, protecting your infrastructure intelligently and adaptively.',
      sections: [
        {
          title: 'advanced monitoring',
          content: 'continuous surveillance of systems, networks, and applications, identifying threats in real-time with behavioral analysis and anomaly detection to anticipate risks.'
        },
        {
          title: 'incident response',
          content: 'specialized team ready to act in case of security incidents, with structured protocols for containment, eradication, and efficient recovery.'
        },
        {
          title: 'security assessments',
          content: 'periodic penetration tests, vulnerability analysis, and configuration verification to identify and fix flaws before they are exploited.'
        },
        {
          title: 'endpoint protection',
          content: 'modular solutions for endpoint protection, from advanced anti-malware to application controls and data leak prevention.'
        }
      ],
      features: [
        {
          title: 'adaptive technology',
          content: 'solutions that constantly evolve to keep pace with changes in the threat landscape, using machine learning to continuously improve.'
        },
        {
          title: 'native integration',
          content: 'tools that seamlessly integrate with your existing infrastructure, without disrupting or impairing ongoing operations.'
        },
        {
          title: 'centralized visibility',
          content: 'single control panel that consolidates security information from across the organization, facilitating management and decision-making.'
        }
      ],
      benefits: [
        'continuous protection without performance impact',
        'reduced incident response time',
        'rapid adaptation to new threats',
        'complete visibility of the IT environment'
      ],
      cta: {
        title: 'need to elevate your operation\'s security level?',
        button: 'talk to a specialist'
      }
    },
    es: {
      title: 'n.SecOps',
      description: 'seguridad integrada a las operaciones con monitoreo continuo',
      intro: 'el n.SecOps de ness integra seguridad a las operaciones con enfoque en monitoreo continuo y respuesta inmediata, protegiendo su infraestructura de forma inteligente y adaptativa.',
      sections: [
        {
          title: 'monitoreo avanzado',
          content: 'vigilancia continua de sistemas, redes y aplicaciones, identificando amenazas en tiempo real con análisis comportamental y detección de anomalías para anticipar riesgos.'
        },
        {
          title: 'respuesta a incidentes',
          content: 'equipo especializado listo para actuar en caso de incidentes de seguridad, con protocolos estructurados para contención, erradicación y recuperación eficiente.'
        },
        {
          title: 'evaluaciones de seguridad',
          content: 'pruebas periódicas de penetración, análisis de vulnerabilidades y verificación de configuraciones para identificar y corregir fallas antes de que sean explotadas.'
        },
        {
          title: 'protección de endpoints',
          content: 'soluciones modulares para la protección de dispositivos finales, desde antimalware avanzado hasta controles de aplicaciones y prevención contra fugas de datos.'
        }
      ],
      features: [
        {
          title: 'tecnología adaptativa',
          content: 'soluciones que evolucionan constantemente para acompañar los cambios en el panorama de amenazas, utilizando machine learning para mejorar continuamente.'
        },
        {
          title: 'integración nativa',
          content: 'herramientas que se integran perfectamente a su infraestructura existente, sin interrumpir o perjudicar operaciones en curso.'
        },
        {
          title: 'visibilidad centralizada',
          content: 'panel único de control que consolida información de seguridad de toda la organización, facilitando la gestión y la toma de decisiones.'
        }
      ],
      benefits: [
        'protección continua sin impacto en rendimiento',
        'reducción del tiempo de respuesta a incidentes',
        'adaptación rápida a nuevas amenazas',
        'visibilidad total del entorno de TI'
      ],
      cta: {
        title: '¿necesita elevar el nivel de seguridad de su operación?',
        button: 'hable con un especialista'
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
      canonicalUrl={`https://${siteConfig.domain}/services/secops`}
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
              {language === 'pt' && 'recursos principais'}
              {language === 'en' && 'main features'}
              {language === 'es' && 'características principales'}
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
      
      {/* Tecnologia e Diferenciais */}
      <section className="conteudo bg-white" style={{ padding: "4rem 0" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-['Montserrat'] font-normal mb-12 text-center lowercase">
              {language === 'pt' && 'tecnologia e diferenciais'}
              {language === 'en' && 'technology and differentials'}
              {language === 'es' && 'tecnología y diferenciales'}
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