import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../../SiteContext';
import SiteLayout from '../../layout/SiteLayout';

export default function ForenseLegalSupportPage() {
  const { siteConfig } = useSite();
  const { language } = useI18n();
  
  // Buscar conteúdo da página específico para o serviço
  const { data: pageContent, isLoading } = useQuery({
    queryKey: ['/api/content/services/legal-support', language, siteConfig.code],
    queryFn: async () => {
      const res = await fetch(`/api/content/services/legal-support?lang=${language}&site=${siteConfig.code}`);
      if (!res.ok) throw new Error('Failed to fetch content');
      return res.json();
    }
  });
  
  // Conteúdo padrão caso não haja conteúdo específico no banco de dados
  const defaultContent = {
    pt: {
      title: 'suporte.legal',
      description: 'consultoria técnica especializada para suporte jurídico',
      intro: 'nosso serviço de suporte legal fornece assistência técnica especializada para advogados, departamentos jurídicos e tribunais, traduzindo complexidades tecnológicas em linguagem acessível e contribuindo para estratégias jurídicas mais eficazes.',
      sections: [
        {
          title: 'consultoria estratégica',
          content: 'assessoramos advogados e equipes jurídicas na compreensão de aspectos técnicos relevantes para seus casos, identificando pontos críticos e orientando sobre a melhor abordagem para questões tecnológicas complexas.'
        },
        {
          title: 'análise de evidências',
          content: 'realizamos avaliações detalhadas de provas digitais apresentadas em processos, verificando sua autenticidade, integridade e relevância para o caso em questão, além de identificar possíveis manipulações ou inconsistências.'
        },
        {
          title: 'preparação para audiências',
          content: 'preparamos profissionais jurídicos para audiências que envolvam aspectos técnicos, fornecendo briefings detalhados, simplificando conceitos complexos e elaborando perguntas estratégicas para testemunhas ou peritos.'
        },
        {
          title: 'desenvolvimento de teses',
          content: 'colaboramos no desenvolvimento de argumentações técnicas sólidas, baseadas em evidências digitais e em conformidade com os mais rigorosos padrões científicos e jurídicos.'
        }
      ],
      cta: {
        title: 'precisa de suporte técnico para sua estratégia jurídica?',
        button: 'entre em contato'
      }
    },
    en: {
      title: 'legal.support',
      description: 'specialized technical consultancy for legal support',
      intro: 'our legal support service provides specialized technical assistance to lawyers, legal departments, and courts, translating technological complexities into accessible language and contributing to more effective legal strategies.',
      sections: [
        {
          title: 'strategic consultancy',
          content: 'we advise lawyers and legal teams in understanding technical aspects relevant to their cases, identifying critical points, and guiding them on the best approach to complex technological issues.'
        },
        {
          title: 'evidence analysis',
          content: 'we conduct detailed assessments of digital evidence presented in proceedings, verifying their authenticity, integrity, and relevance to the case in question, as well as identifying possible manipulations or inconsistencies.'
        },
        {
          title: 'hearing preparation',
          content: 'we prepare legal professionals for hearings involving technical aspects, providing detailed briefings, simplifying complex concepts, and developing strategic questions for witnesses or experts.'
        },
        {
          title: 'thesis development',
          content: 'we collaborate in developing solid technical arguments, based on digital evidence and in compliance with the most rigorous scientific and legal standards.'
        }
      ],
      cta: {
        title: 'need technical support for your legal strategy?',
        button: 'contact us'
      }
    },
    es: {
      title: 'soporte.legal',
      description: 'consultoría técnica especializada para apoyo jurídico',
      intro: 'nuestro servicio de soporte legal proporciona asistencia técnica especializada a abogados, departamentos jurídicos y tribunales, traduciendo complejidades tecnológicas en lenguaje accesible y contribuyendo a estrategias jurídicas más eficaces.',
      sections: [
        {
          title: 'consultoría estratégica',
          content: 'asesoramos a abogados y equipos jurídicos en la comprensión de aspectos técnicos relevantes para sus casos, identificando puntos críticos y orientando sobre el mejor enfoque para cuestiones tecnológicas complejas.'
        },
        {
          title: 'análisis de evidencias',
          content: 'realizamos evaluaciones detalladas de pruebas digitales presentadas en procesos, verificando su autenticidad, integridad y relevancia para el caso en cuestión, además de identificar posibles manipulaciones o inconsistencias.'
        },
        {
          title: 'preparación para audiencias',
          content: 'preparamos a profesionales jurídicos para audiencias que involucren aspectos técnicos, proporcionando briefings detallados, simplificando conceptos complejos y elaborando preguntas estratégicas para testigos o peritos.'
        },
        {
          title: 'desarrollo de tesis',
          content: 'colaboramos en el desarrollo de argumentaciones técnicas sólidas, basadas en evidencias digitales y en conformidad con los más rigurosos estándares científicos y jurídicos.'
        }
      ],
      cta: {
        title: '¿necesita soporte técnico para su estrategia jurídica?',
        button: 'contáctenos'
      }
    }
  };
  
  // Escolher o conteúdo baseado na linguagem atual
  const content = defaultContent[language] || defaultContent.en;
  
  // Definir o título da página e metadados
  const pageTitle = pageContent?.metaTitle || `${content.title} | forense.io`;
  const pageDescription = pageContent?.metaDescription || content.description;
  
  // Schema.org estruturado para SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": content.title,
    "description": content.description,
    "provider": {
      "@type": "Organization",
      "name": "forense.io",
      "url": `https://${siteConfig.domain}`
    },
    "serviceType": "Legal Support"
  };
  
  if (isLoading) {
    return (
      <SiteLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#00ade0]"></div>
        </div>
      </SiteLayout>
    );
  }
  
  return (
    <SiteLayout
      title={pageTitle}
      description={pageDescription}
      canonicalUrl={`https://${siteConfig.domain}/services/legal-support`}
      structuredData={structuredData}
    >
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 text-white bg-[#0d1117] relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-['Montserrat'] font-normal mb-6 lowercase">
                suporte<span className="text-[#00ade0]">.</span>legal
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {content.description}
              </p>
            </div>
          </div>
        </section>
        
        {/* Intro Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-base mx-auto text-gray-700 lowercase">
                <p className="text-lg leading-relaxed mb-6">
                  {content.intro}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Service Details */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {content.sections.map((section, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-['Montserrat'] text-gray-800 mb-4 lowercase">
                      <span className="text-[#00ade0]">●</span> {section.title}
                    </h3>
                    <p className="text-gray-700 text-sm">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-[#0d1117] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-['Montserrat'] font-normal mb-8 lowercase">
              {content.cta.title}
            </h2>
            <a
              href={`/site/forense/contact`}
              className="inline-block bg-[#00ade0] hover:bg-opacity-90 text-white py-3 px-8 rounded lowercase transition duration-300"
            >
              {content.cta.button}
            </a>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}