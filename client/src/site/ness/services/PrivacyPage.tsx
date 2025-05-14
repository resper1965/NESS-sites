import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../../SiteContext';
import SiteLayout from '../../layout/SiteLayout';
import { Link } from 'wouter';

export default function NessPrivacyPage() {
  const { siteConfig } = useSite();
  const { language, t } = useI18n();
  
  // Buscar conteúdo da página específico para o serviço
  const { data: pageContent, isLoading, error } = useQuery({
    queryKey: ['/api/content/services/privacy', language, siteConfig.code],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/content/services/privacy?lang=${language}&site=${siteConfig.code}`);
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
      title: 'n.Privacy',
      description: 'gestão completa de privacidade para conformidade com LGPD/GDPR',
      intro: 'o n.Privacy da ness oferece uma abordagem estruturada para governança de privacidade e proteção de dados, ajudando organizações a atenderem requisitos regulatórios como LGPD e GDPR, enquanto transformam privacidade em vantagem competitiva.',
      sections: [
        {
          title: 'diagnóstico e mapeamento',
          content: 'identificação abrangente do fluxo de dados pessoais na organização, avaliação de riscos e lacunas de conformidade, com mapeamento detalhado de processos e sistemas que tratam dados sensíveis.'
        },
        {
          title: 'implementação de controles',
          content: 'desenvolvimento e implementação de políticas, procedimentos e controles técnicos necessários para garantir a privacidade por design e por padrão em todas as operações de tratamento de dados.'
        },
        {
          title: 'automação de privacidade',
          content: 'ferramentas para automatizar processos críticos de privacidade, como gerenciamento de consentimento, atendimento a solicitações de titulares e manutenção de registros de tratamento.'
        },
        {
          title: 'monitoramento contínuo',
          content: 'soluções para acompanhamento permanente da conformidade, detecção de violações de privacidade e gerenciamento de incidentes relacionados a dados pessoais.'
        }
      ],
      features: [
        {
          title: 'consultoria especializada',
          content: 'equipe multidisciplinar com especialistas em direito, tecnologia e governança para auxiliar em todas as etapas do programa de privacidade, desde a concepção até a maturidade.'
        },
        {
          title: 'DPO como serviço',
          content: 'atuação como Encarregado de Dados (DPO) para organizações que necessitam dessa função, gerenciando a interface com titulares, autoridades e demais stakeholders.'
        },
        {
          title: 'capacitação e conscientização',
          content: 'programas de treinamento customizados para diferentes perfis organizacionais, desenvolvendo a cultura de privacidade e reduzindo riscos operacionais.'
        }
      ],
      benefits: [
        'redução de riscos regulatórios e reputacionais',
        'confiança e transparência com clientes',
        'vantagem competitiva por diferenciação',
        'preparação para novas regulamentações'
      ],
      cta: {
        title: 'sua organização está em conformidade com as leis de privacidade?',
        button: 'solicite uma avaliação'
      }
    },
    en: {
      title: 'n.Privacy',
      description: 'complete privacy management for LGPD/GDPR compliance',
      intro: 'ness\'s n.Privacy offers a structured approach to privacy governance and data protection, helping organizations meet regulatory requirements such as LGPD and GDPR, while transforming privacy into a competitive advantage.',
      sections: [
        {
          title: 'diagnosis and mapping',
          content: 'comprehensive identification of personal data flow in the organization, risk assessment and compliance gaps, with detailed mapping of processes and systems that handle sensitive data.'
        },
        {
          title: 'control implementation',
          content: 'development and implementation of policies, procedures, and technical controls necessary to ensure privacy by design and by default in all data processing operations.'
        },
        {
          title: 'privacy automation',
          content: 'tools to automate critical privacy processes, such as consent management, fulfillment of data subject requests, and maintenance of processing records.'
        },
        {
          title: 'continuous monitoring',
          content: 'solutions for permanent compliance monitoring, detection of privacy violations, and management of incidents related to personal data.'
        }
      ],
      features: [
        {
          title: 'specialized consulting',
          content: 'multidisciplinary team with experts in law, technology, and governance to assist in all stages of the privacy program, from conception to maturity.'
        },
        {
          title: 'DPO as a service',
          content: 'acting as Data Protection Officer (DPO) for organizations that need this function, managing the interface with data subjects, authorities, and other stakeholders.'
        },
        {
          title: 'training and awareness',
          content: 'customized training programs for different organizational profiles, developing a privacy culture and reducing operational risks.'
        }
      ],
      benefits: [
        'reduction of regulatory and reputational risks',
        'trust and transparency with customers',
        'competitive advantage through differentiation',
        'preparation for new regulations'
      ],
      cta: {
        title: 'is your organization in compliance with privacy laws?',
        button: 'request an assessment'
      }
    },
    es: {
      title: 'n.Privacy',
      description: 'gestión completa de privacidad para conformidad con LGPD/GDPR',
      intro: 'el n.Privacy de ness ofrece un enfoque estructurado para gobernanza de privacidad y protección de datos, ayudando a organizaciones a atender requisitos regulatorios como LGPD y GDPR, mientras transforman la privacidad en ventaja competitiva.',
      sections: [
        {
          title: 'diagnóstico y mapeo',
          content: 'identificación integral del flujo de datos personales en la organización, evaluación de riesgos y brechas de conformidad, con mapeo detallado de procesos y sistemas que tratan datos sensibles.'
        },
        {
          title: 'implementación de controles',
          content: 'desarrollo e implementación de políticas, procedimientos y controles técnicos necesarios para garantizar la privacidad por diseño y por defecto en todas las operaciones de tratamiento de datos.'
        },
        {
          title: 'automatización de privacidad',
          content: 'herramientas para automatizar procesos críticos de privacidad, como gestión de consentimiento, atención a solicitudes de titulares y mantenimiento de registros de tratamiento.'
        },
        {
          title: 'monitoreo continuo',
          content: 'soluciones para seguimiento permanente de la conformidad, detección de violaciones de privacidad y gestión de incidentes relacionados con datos personales.'
        }
      ],
      features: [
        {
          title: 'consultoría especializada',
          content: 'equipo multidisciplinario con especialistas en derecho, tecnología y gobernanza para auxiliar en todas las etapas del programa de privacidad, desde la concepción hasta la madurez.'
        },
        {
          title: 'DPO como servicio',
          content: 'actuación como Encargado de Datos (DPO) para organizaciones que necesitan esta función, gestionando la interfaz con titulares, autoridades y demás stakeholders.'
        },
        {
          title: 'capacitación y concientización',
          content: 'programas de entrenamiento personalizados para diferentes perfiles organizacionales, desarrollando la cultura de privacidad y reduciendo riesgos operacionales.'
        }
      ],
      benefits: [
        'reducción de riesgos regulatorios y reputacionales',
        'confianza y transparencia con clientes',
        'ventaja competitiva por diferenciación',
        'preparación para nuevas regulaciones'
      ],
      cta: {
        title: '¿su organización está en conformidad con las leyes de privacidad?',
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
      canonicalUrl={`https://${siteConfig.domain}/services/privacy`}
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
              {language === 'pt' && 'soluções de privacidade'}
              {language === 'en' && 'privacy solutions'}
              {language === 'es' && 'soluciones de privacidad'}
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
              {language === 'pt' && 'nossos diferenciais'}
              {language === 'en' && 'our differentials'}
              {language === 'es' && 'nuestros diferenciales'}
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