import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../SiteContext';
import SiteLayout from '../layout/SiteLayout';

export default function TrustnessHomePage() {
  const { siteConfig } = useSite();
  const { language } = useI18n();
  
  // Buscar conteúdo da página inicial específico para o site trustness
  const { data: pageContent, isLoading } = useQuery({
    queryKey: ['/api/content/home', language, siteConfig.code],
    queryFn: async () => {
      const res = await fetch(`/api/content/home?lang=${language}&site=${siteConfig.code}`);
      if (!res.ok) throw new Error('Failed to fetch content');
      return res.json();
    }
  });
  
  // Definir o título da página com base no conteúdo
  const pageTitle = pageContent?.metaTitle || siteConfig.metadata?.defaultTitle;
  const pageDescription = pageContent?.metaDescription || siteConfig.metadata?.defaultDescription;
  
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
      title={pageTitle}
      description={pageDescription}
      ogImage={pageContent?.ogImage}
      canonicalUrl={`https://${siteConfig.domain}`}
    >
      {/* Hero Section */}
      <section 
        className="intro text-white bg-[#0b1016] relative flex items-center"
        style={{ minHeight: "60vh" }}
      >
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 lowercase">
              trustness<span className="text-[#00ade0]">.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {language === 'pt' && (pageContent?.content?.heroSubtitle || 
                'privacidade, segurança da informação e compliance com foco em programas regulatórios e frameworks internacionais')}
              {language === 'en' && (pageContent?.content?.heroSubtitleEn || 
                'privacy, information security and compliance focused on regulatory programs and international frameworks')}
              {language === 'es' && (pageContent?.content?.heroSubtitleEs || 
                'privacidad, seguridad de la información y compliance con foco en programas regulatorios y frameworks internacionales')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#what-we-do"
                className="bg-[#00ade0] hover:bg-opacity-90 text-white px-6 py-3 rounded lowercase"
              >
                {language === 'pt' && 'nossos serviços'}
                {language === 'en' && 'our services'}
                {language === 'es' && 'nuestros servicios'}
              </a>
              <a
                href="/site/trustness/contact"
                className="border border-[#00ade0] text-white hover:bg-white hover:bg-opacity-10 px-6 py-3 rounded lowercase"
              >
                {language === 'pt' && 'fale conosco'}
                {language === 'en' && 'contact us'}
                {language === 'es' && 'contáctenos'}
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Como Atuamos Section - Visual moderno */}
      <section className="conteudo bg-gradient-to-b from-white to-[#f2f8fd] text-gray-800" style={{ padding: "4rem 0" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4 lowercase text-gray-800">
              {language === 'pt' && 'como atuamos'}
              {language === 'en' && 'how we work'}
              {language === 'es' && 'cómo trabajamos'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'pt' && 'programas consultivos em segurança, privacidade e conformidade — personalizados para sua operação'}
              {language === 'en' && 'consultative programs in security, privacy, and compliance — customized for your operation'}
              {language === 'es' && 'programas consultivos en seguridad, privacidad y conformidad — personalizados para su operación'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 max-w-6xl mx-auto">
            {language === 'pt' && (
              <>
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="mb-6">
                    <h3 className="mb-4 text-gray-800">assessment</h3>
                  </div>
                  <p className="mb-4">
                    <span className="text-[#005fa3] font-semibold text-lg block mb-2">você sabe como vai sua segurança?</span>
                    <span className="text-gray-700">
                      na trustness, avaliamos, auditamos e estruturamos práticas que sustentam a segurança, a privacidade e a conformidade regulatória.
                    </span>
                  </p>
                  <p className="text-gray-700">
                    conduzimos assessments com base em frameworks reconhecidos — como NIST, CIS Controls e ISO 27001 — para identificar vulnerabilidades, mapear riscos e traçar caminhos reais rumo à certificação e maturidade operacional.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="mb-6">
                    <h3 className="mb-4 text-gray-800">certificações</h3>
                  </div>
                  <p className="mb-4">
                    <span className="text-[#005fa3] font-semibold text-lg block mb-2">vai se certificar ISO 27001, ou outra certificação?</span>
                    <span className="text-gray-700">
                      atuamos também como auditores externos, avaliando a aderência da organização a normas e requisitos específicos — antes de uma certificação ou como parte de uma estratégia contínua de conformidade.
                    </span>
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 md:col-span-2">
                  <div className="mb-6">
                    <h3 className="mb-4 text-gray-800">privacidade</h3>
                  </div>
                  <p className="mb-4">
                    <span className="text-[#005fa3] font-semibold text-lg block mb-2">precisa se adequar à LGPD, ou outra norma de privacidade?</span>
                    <span className="text-gray-700">
                      conduzimos projetos completos de adequação à LGPD, GDPR, HIPAA e outras regulamentações de privacidade, com mapeamento de dados, implantação de controles e apoio contínuo à gestão.
                    </span>
                  </p>
                  <p className="text-gray-700 mb-3">
                    estruturamos relatórios como ROPA, DPIA e LIA, além de apoiar processos como atendimento a titulares, avaliação de fornecedores e governança da privacidade.
                  </p>
                  <p className="text-gray-700">
                    também atuamos como DPO as a Service, assumindo a função de encarregado de dados da organização — com responsabilidade técnica, legal e estratégica sobre a conformidade e o relacionamento com autoridades e titulares.
                  </p>
                </div>
              </>
            )}
            
            {language === 'en' && (
              <>
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="mb-6">
                    <h3 className="mb-4 text-gray-800">assessment</h3>
                  </div>
                  <p className="mb-4">
                    <span className="text-[#005fa3] font-semibold text-lg block mb-2">do you know how your security is doing?</span>
                    <span className="text-gray-700">
                      at trustness, we assess, audit, and structure practices that support security, privacy, and regulatory compliance.
                    </span>
                  </p>
                  <p className="text-gray-700">
                    we conduct assessments based on recognized frameworks — such as NIST, CIS Controls, and ISO 27001 — to identify vulnerabilities, map risks, and chart real paths toward certification and operational maturity.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="mb-6">
                    <h3 className="mb-4 text-gray-800">certifications</h3>
                  </div>
                  <p className="mb-4">
                    <span className="text-[#005fa3] font-semibold text-lg block mb-2">need ISO 27001 certification or other security standards?</span>
                    <span className="text-gray-700">
                      we also act as external auditors, evaluating the organization's adherence to specific standards and requirements — before certification or as part of an ongoing compliance strategy.
                    </span>
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 md:col-span-2">
                  <div className="mb-6">
                    <h3 className="mb-4 text-gray-800">privacy</h3>
                  </div>
                  <p className="mb-4">
                    <span className="text-[#005fa3] font-semibold text-lg block mb-2">need to comply with GDPR, LGPD or other privacy laws?</span>
                    <span className="text-gray-700">
                      we conduct complete compliance projects for GDPR, LGPD, HIPAA and other privacy regulations, with data mapping, control implementation and continuous management support.
                    </span>
                  </p>
                  <p className="text-gray-700 mb-3">
                    we structure reports such as ROPA, DPIA and LIA, in addition to supporting processes such as data subject requests, vendor assessment and privacy governance.
                  </p>
                  <p className="text-gray-700">
                    we also act as DPO as a Service, assuming the role of data protection officer — with technical, legal and strategic responsibility for compliance and relationships with authorities and data subjects.
                  </p>
                </div>
              </>
            )}
            
            {language === 'es' && (
              <>
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="mb-6">
                    <h3 className="mb-4 text-gray-800">assessment</h3>
                  </div>
                  <p className="mb-4">
                    <span className="text-[#005fa3] font-semibold text-lg block mb-2">¿sabes cómo va tu seguridad?</span>
                    <span className="text-gray-700">
                      en trustness, evaluamos, auditamos y estructuramos prácticas que sustentan la seguridad, la privacidad y el cumplimiento normativo.
                    </span>
                  </p>
                  <p className="text-gray-700">
                    realizamos evaluaciones basadas en marcos reconocidos — como NIST, CIS Controls e ISO 27001 — para identificar vulnerabilidades, mapear riesgos y trazar caminos reales hacia la certificación y madurez operativa.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="mb-6">
                    <h3 className="mb-4 text-gray-800">certificaciones</h3>
                  </div>
                  <p className="mb-4">
                    <span className="text-[#005fa3] font-semibold text-lg block mb-2">¿necesita certificarse en ISO 27001 u otros estándares de seguridad?</span>
                    <span className="text-gray-700">
                      también actuamos como auditores externos, evaluando la adhesión de la organización a normas y requisitos específicos — antes de una certificación o como parte de una estrategia continua de cumplimiento.
                    </span>
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 md:col-span-2">
                  <div className="mb-6">
                    <h3 className="mb-4 text-gray-800">privacidad</h3>
                  </div>
                  <p className="mb-4">
                    <span className="text-[#005fa3] font-semibold text-lg block mb-2">¿necesita cumplir con GDPR, LGPD u otras leyes de privacidad?</span>
                    <span className="text-gray-700">
                      realizamos proyectos completos de adecuación a GDPR, LGPD, HIPAA y otras regulaciones de privacidad, con mapeo de datos, implementación de controles y apoyo continuo a la gestión.
                    </span>
                  </p>
                  <p className="text-gray-700 mb-3">
                    estructuramos informes como ROPA, DPIA y LIA, además de apoyar procesos como atención a titulares, evaluación de proveedores y gobernanza de la privacidad.
                  </p>
                  <p className="text-gray-700">
                    también actuamos como DPO as a Service, asumiendo la función de encargado de protección de datos de la organización — con responsabilidad técnica, legal y estratégica sobre el cumplimiento y la relación con autoridades y titulares.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Services Section - Agora com fundo escuro */}
      <section id="what-we-do" className="conteudo bg-[#1a1a22] text-white" style={{ padding: "4rem 0" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-white mb-8 lowercase">
              {language === 'pt' && 'o que fazemos'}
              {language === 'en' && 'what we do'}
              {language === 'es' && 'lo que hacemos'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Serviço 1 - Assessment */}
            <div className="bg-[#21212b] rounded p-6 border border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <h3 className="mb-4">
                <span className="font-medium text-lg text-white">
                  <span className="text-[#005fa3]">.</span>assessment
                </span>
              </h3>
              <p className="text-gray-300 text-sm mb-6 lowercase">
                avaliações de segurança com base nos frameworks NIST e CIS Controls.
              </p>
              <div className="text-center">
                <a 
                  href="/site/trustness/services/assessment" 
                  className="text-gray-300 hover:text-[#005fa3] border border-gray-700 hover:border-[#005fa3] py-2 px-4 text-sm font-normal transition-colors duration-300 inline-block lowercase rounded-sm"
                >
                  saiba mais
                </a>
              </div>
            </div>
            
            {/* Serviço 2 - Conformity */}
            <div className="bg-[#21212b] rounded p-6 border border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <h3 className="mb-4">
                <span className="font-medium text-lg text-white">
                  <span className="text-[#005fa3]">.</span>conformity
                </span>
              </h3>
              <p className="text-gray-300 text-sm mb-6 lowercase">
                execução de auditorias e adequação a normas como ISO 27001, SOC 2, PCI DSS, HIPAA, LGPD/GDPR e HITRUST.
              </p>
              <div className="text-center">
                <a 
                  href="/site/trustness/services/conformity" 
                  className="text-gray-300 hover:text-[#005fa3] border border-gray-700 hover:border-[#005fa3] py-2 px-4 text-sm font-normal transition-colors duration-300 inline-block lowercase rounded-sm"
                >
                  saiba mais
                </a>
              </div>
            </div>
            
            {/* Serviço 3 - Privacy */}
            <div className="bg-[#21212b] rounded p-6 border border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <h3 className="mb-4">
                <span className="font-medium text-lg text-white">
                  <span className="text-[#005fa3]">.</span>privacy
                </span>
              </h3>
              <p className="text-gray-300 text-sm mb-6 lowercase">
                implementação de controles de privacidade alinhados a padrões regulatórios nacionais e internacionais.
              </p>
              <div className="text-center">
                <a 
                  href="/site/trustness/services/privacy" 
                  className="text-gray-300 hover:text-[#005fa3] border border-gray-700 hover:border-[#005fa3] py-2 px-4 text-sm font-normal transition-colors duration-300 inline-block lowercase rounded-sm"
                >
                  saiba mais
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Clients Section, if available */}
      {pageContent?.content?.clients && (
        <section className="conteudo bg-gray-50" style={{ padding: "4rem 0" }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-gray-800 mb-4 lowercase">
                {pageContent?.content?.clientsSectionTitle || 'clientes'}
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {pageContent?.content?.clientsSectionDescription || 
                  'empresas e organizações que confiam em nossa expertise.'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center opacity-70">
              {pageContent.content.clients.map((client: any, index: number) => (
                <div key={index} className="p-4">
                  {client.logo && (
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="max-h-12 mx-auto grayscale hover:grayscale-0 transition-all" 
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}