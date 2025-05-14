import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../SiteContext';
import SiteLayout from '../layout/SiteLayout';

export default function ForenseHomePage() {
  const { siteConfig } = useSite();
  const { language } = useI18n();
  
  // Buscar conteúdo da página inicial específico para o site forense
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
      <section className="intro bg-[#0d1117] text-white relative overflow-hidden flex items-center" style={{ minHeight: "60vh" }}>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-['Montserrat'] font-normal mb-3 lowercase">
              forense<span className="text-[#00ade0]">.</span>io
            </h1>
            <h2 className="text-xl font-['Montserrat'] font-normal lowercase">
              {language === 'pt' && "Especialistas em Forense Digital"}
              {language === 'en' && "Digital Forensic Experts"}
              {language === 'es' && "Expertos en Forense Digital"}
            </h2>
            <p className="text-xl text-gray-300 mt-8 mb-8">
              {language === 'pt' && "transformamos a evidência digital em resultados concretos, com precisão e segurança"}
              {language === 'en' && "transforming digital evidence into concrete results, with precision and security"}
              {language === 'es' && "transformamos la evidencia digital en resultados concretos, con precisión y seguridad"}
            </p>
            <div className="flex justify-center">
              <a
                href="/site/forense/contact"
                className="bg-[#00ade0] hover:bg-opacity-90 text-white px-8 py-3 rounded lowercase transition-all duration-300"
              >
                {language === 'pt' && "fale conosco"}
                {language === 'en' && "contact us"}
                {language === 'es' && "contáctenos"}
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="conteudo bg-white" style={{ padding: "4rem 0" }}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-['Montserrat'] font-normal text-center mb-16 lowercase">
            {language === 'pt' && <> serviços <span className="text-[#00ade0]">especializados</span></>}
            {language === 'en' && <> specialized <span className="text-[#00ade0]">services</span></>}
            {language === 'es' && <> servicios <span className="text-[#00ade0]">especializados</span></>}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Forense Digital */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col h-full">
              <div className="flex mb-4">
                <div className="w-12 h-12 bg-[#00ade0]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#00ade0" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-['Montserrat'] font-normal lowercase mb-1">
                    forense<span className="text-[#00ade0]">.</span>digital
                  </h3>
                  <p className="text-sm text-gray-500">
                    coleta e análise de evidências digitais
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-4 mb-6 flex-grow">
                recuperação e análise de dados digitais, produção e validação de evidências, reexame forense e contraprova de relatórios
              </p>
              <div className="mt-auto text-center">
                <a href="/site/forense/services/digital-forensics" className="bg-white border border-[#00ade0] text-[#00ade0] hover:bg-[#00ade0] hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 inline-flex justify-center">
                  {language === 'pt' && "saiba mais"}
                  {language === 'en' && "learn more"}
                  {language === 'es' && "saber más"}
                </a>
              </div>
            </div>
            
            {/* Suporte Legal */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col h-full">
              <div className="flex mb-4">
                <div className="w-12 h-12 bg-[#00ade0]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#00ade0" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.25 2.25m-10.5-10.5L6.75 4.5m-.75 3.75l3 3-3 3 3 3-3 3m15-18l-3 3 3 3-3 3 3 3" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-['Montserrat'] font-normal lowercase mb-1">
                    suporte<span className="text-[#00ade0]">.</span>legal
                  </h3>
                  <p className="text-sm text-gray-500">
                    consultoria técnica especializada
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-4 mb-6 flex-grow">
                consultoria estratégica, assistência técnica processual e esclarecimentos técnicos em audiências para profissionais da área jurídica
              </p>
              <div className="mt-auto text-center">
                <a href="/site/forense/services/legal-support" className="bg-white border border-[#00ade0] text-[#00ade0] hover:bg-[#00ade0] hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 inline-flex justify-center">
                  {language === 'pt' && "saiba mais"}
                  {language === 'en' && "learn more"}
                  {language === 'es' && "saber más"}
                </a>
              </div>
            </div>
            
            {/* Investigações Corporativas */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col h-full">
              <div className="flex mb-4">
                <div className="w-12 h-12 bg-[#00ade0]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#00ade0" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-['Montserrat'] font-normal lowercase mb-1">
                    investigações<span className="text-[#00ade0]">.</span>corporativas
                  </h3>
                  <p className="text-sm text-gray-500">
                    compliance e segurança empresarial
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-4 mb-6 flex-grow">
                investigações de fraude, monitoramento de ativos digitais, análise de riscos e ameaças, e compliance digital para empresas
              </p>
              <div className="mt-auto text-center">
                <a href="/site/forense/services/corporate-investigations" className="bg-white border border-[#00ade0] text-[#00ade0] hover:bg-[#00ade0] hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 inline-flex justify-center">
                  {language === 'pt' && "saiba mais"}
                  {language === 'en' && "learn more"}
                  {language === 'es' && "saber más"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="contato bg-[#0d1117] text-white flex items-center" style={{ minHeight: "400px" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-['Montserrat'] font-normal mb-6 lowercase">
              {language === 'pt' && <>precisando de <span className="text-[#00ade0]">consultoria especializada</span>?</>}
              {language === 'en' && <>need <span className="text-[#00ade0]">specialized consulting</span>?</>}
              {language === 'es' && <>¿necesita <span className="text-[#00ade0]">consultoría especializada</span>?</>}
            </h2>
            <p className="text-gray-300 mb-10">
              {language === 'pt' && "Entre em contato para uma consulta inicial. Nossa equipe de especialistas está pronta para analisar seu caso e oferecer soluções personalizadas."}
              {language === 'en' && "Contact us for an initial consultation. Our team of experts is ready to analyze your case and offer tailored solutions."}
              {language === 'es' && "Póngase en contacto para una consulta inicial. Nuestro equipo de expertos está listo para analizar su caso y ofrecer soluciones personalizadas."}
            </p>
            <a
              href="/site/forense/contact"
              className="bg-[#00ade0] hover:bg-opacity-90 text-white px-10 py-4 rounded lowercase transition-all duration-300 inline-block"
            >
              {language === 'pt' && "agende uma consulta"}
              {language === 'en' && "schedule a consultation"}
              {language === 'es' && "agendar una consulta"}
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}