import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../../SiteContext';
import SiteLayout from '../../layout/SiteLayout';
import { Link } from 'wouter';

export default function NessCrisisOpsPage() {
  const { siteConfig } = useSite();
  const { language, t } = useI18n();
  
  // Buscar conteúdo da página específico para o serviço
  const { data: pageContent, isLoading, error } = useQuery({
    queryKey: ['/api/content/services/crisisops', language, siteConfig.code],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/content/services/crisisops?lang=${language}&site=${siteConfig.code}`);
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
      title: 'n.CrisisOps',
      description: 'resposta imediata para incidentes e gestão de crises cibernéticas',
      intro: 'o n.CrisisOps da ness oferece uma abordagem completa para gerenciamento de incidentes e crises cibernéticas, combinando metodologias estruturadas, equipes especializadas e tecnologias avançadas para minimizar impactos e restaurar operações rapidamente.',
      sections: [
        {
          title: 'resposta a incidentes',
          content: 'equipe dedicada para investigação e contenção de incidentes de segurança em tempo real, com protocolos claros para isolamento de ameaças e recuperação de ambientes comprometidos.'
        },
        {
          title: 'planos de crise',
          content: 'desenvolvimento de estratégias e procedimentos detalhados para gerenciamento de crises, incluindo protocolos de comunicação, matriz de responsabilidades e planos de continuidade de negócios.'
        },
        {
          title: 'simulações e treinamentos',
          content: 'exercícios regulares de simulação de incidentes e crises para preparar equipes internas, testar procedimentos e identificar pontos de melhoria na resposta organizacional.'
        },
        {
          title: 'análise forense digital',
          content: 'capacidade técnica para investigação detalhada de incidentes, coleta e preservação de evidências com validade legal, identificação de vetores de ataque e elaboração de relatórios técnicos.'
        }
      ],
      features: [
        {
          title: 'monitoramento contínuo',
          content: 'vigilância 24x7 de ambientes e sistemas críticos, com detecção antecipada de anomalias e ameaças potenciais antes que se tornem crises.'
        },
        {
          title: 'equipe multidisciplinar',
          content: 'profissionais com experiência em diferentes áreas de segurança, infraestrutura, comunicação e aspectos legais, proporcionando uma resposta abrangente em situações críticas.'
        },
        {
          title: 'gestão de comunicação',
          content: 'estratégias para comunicação eficaz com stakeholders internos e externos durante crises, minimizando danos reputacionais e atendendo requisitos regulatórios.'
        }
      ],
      benefits: [
        'redução do tempo de resposta a incidentes',
        'minimização de impactos operacionais e financeiros',
        'preservação da reputação organizacional',
        'conformidade com requisitos regulatórios'
      ],
      cta: {
        title: 'está preparado para lidar com incidentes críticos?',
        button: 'entre em contato'
      }
    },
    en: {
      title: 'n.CrisisOps',
      description: 'immediate response for incidents and cybernetic crisis management',
      intro: 'ness\'s n.CrisisOps offers a comprehensive approach to incident management and cybernetic crises, combining structured methodologies, specialized teams, and advanced technologies to minimize impacts and quickly restore operations.',
      sections: [
        {
          title: 'incident response',
          content: 'dedicated team for real-time investigation and containment of security incidents, with clear protocols for threat isolation and recovery of compromised environments.'
        },
        {
          title: 'crisis plans',
          content: 'development of detailed strategies and procedures for crisis management, including communication protocols, responsibility matrix, and business continuity plans.'
        },
        {
          title: 'simulations and training',
          content: 'regular incident and crisis simulation exercises to prepare internal teams, test procedures, and identify improvement points in organizational response.'
        },
        {
          title: 'digital forensics',
          content: 'technical capability for detailed incident investigation, collection and preservation of legally valid evidence, identification of attack vectors, and preparation of technical reports.'
        }
      ],
      features: [
        {
          title: 'continuous monitoring',
          content: '24x7 surveillance of critical environments and systems, with early detection of anomalies and potential threats before they become crises.'
        },
        {
          title: 'multidisciplinary team',
          content: 'professionals with experience in different areas of security, infrastructure, communication, and legal aspects, providing a comprehensive response in critical situations.'
        },
        {
          title: 'communication management',
          content: 'strategies for effective communication with internal and external stakeholders during crises, minimizing reputational damage and meeting regulatory requirements.'
        }
      ],
      benefits: [
        'reduced incident response time',
        'minimization of operational and financial impacts',
        'preservation of organizational reputation',
        'compliance with regulatory requirements'
      ],
      cta: {
        title: 'are you prepared to handle critical incidents?',
        button: 'contact us'
      }
    },
    es: {
      title: 'n.CrisisOps',
      description: 'respuesta inmediata para incidentes y gestión de crisis cibernéticas',
      intro: 'el n.CrisisOps de ness ofrece un enfoque completo para la gestión de incidentes y crisis cibernéticas, combinando metodologías estructuradas, equipos especializados y tecnologías avanzadas para minimizar impactos y restaurar operaciones rápidamente.',
      sections: [
        {
          title: 'respuesta a incidentes',
          content: 'equipo dedicado para investigación y contención de incidentes de seguridad en tiempo real, con protocolos claros para aislamiento de amenazas y recuperación de entornos comprometidos.'
        },
        {
          title: 'planes de crisis',
          content: 'desarrollo de estrategias y procedimientos detallados para gestión de crisis, incluyendo protocolos de comunicación, matriz de responsabilidades y planes de continuidad de negocios.'
        },
        {
          title: 'simulaciones y entrenamientos',
          content: 'ejercicios regulares de simulación de incidentes y crisis para preparar equipos internos, probar procedimientos e identificar puntos de mejora en la respuesta organizacional.'
        },
        {
          title: 'análisis forense digital',
          content: 'capacidad técnica para investigación detallada de incidentes, recolección y preservación de evidencias con validez legal, identificación de vectores de ataque y elaboración de informes técnicos.'
        }
      ],
      features: [
        {
          title: 'monitoreo continuo',
          content: 'vigilancia 24x7 de entornos y sistemas críticos, con detección anticipada de anomalías y amenazas potenciales antes de que se conviertan en crisis.'
        },
        {
          title: 'equipo multidisciplinario',
          content: 'profesionales con experiencia en diferentes áreas de seguridad, infraestructura, comunicación y aspectos legales, proporcionando una respuesta integral en situaciones críticas.'
        },
        {
          title: 'gestión de comunicación',
          content: 'estrategias para comunicación eficaz con stakeholders internos y externos durante crisis, minimizando daños reputacionales y atendiendo requisitos regulatorios.'
        }
      ],
      benefits: [
        'reducción del tiempo de respuesta a incidentes',
        'minimización de impactos operacionales y financieros',
        'preservación de la reputación organizacional',
        'conformidad con requisitos regulatorios'
      ],
      cta: {
        title: '¿está preparado para lidiar con incidentes críticos?',
        button: 'contáctenos'
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
      canonicalUrl={`https://${siteConfig.domain}/services/crisisops`}
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
              {language === 'pt' && 'capacidades principais'}
              {language === 'en' && 'main capabilities'}
              {language === 'es' && 'capacidades principales'}
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