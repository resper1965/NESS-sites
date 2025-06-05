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
      <section className="intro bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden flex items-center" style={{ minHeight: '60vh' }}>
        {/* Padrão de Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzM0MTU1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        {/* Linhas Sutis */}
        <div className="absolute top-1/4 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-[#00ade0] to-transparent opacity-40"></div>
        <div className="absolute bottom-1/3 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-[#00ade0] to-transparent opacity-40"></div>
        <div className="absolute top-1/2 left-1/3 w-px h-24 bg-gradient-to-b from-transparent via-[#00ade0] to-transparent opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/3 w-24 h-px bg-gradient-to-r from-transparent via-[#00ade0] to-transparent opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center h-full text-center">
          {/* Logo */}
          <h1 className="font-['Montserrat'] font-light text-7xl md:text-8xl text-white mb-6 lowercase">
            forense<span className="text-[#00ade0]">.</span>io
          </h1>
          
          {/* Tagline */}
          <h2 className="mb-8">
            <div className="font-light text-2xl md:text-3xl text-slate-300 mb-2">
              {language === 'pt' && 'Evidências digitais'}
              {language === 'en' && 'Digital evidence'}
              {language === 'es' && 'Evidencias digitales'}
            </div>
            <div className="font-normal text-2xl md:text-3xl text-[#00ade0]">
              {language === 'pt' && 'precisas e confiáveis'}
              {language === 'en' && 'accurate and reliable'}
              {language === 'es' && 'precisas y confiables'}
            </div>
          </h2>
          
          {/* Parágrafo descritivo */}
          <p className="font-light text-lg text-slate-400 max-w-2xl leading-relaxed">
            {language === 'pt' && "Peritos independentes especializados em análise de evidências digitais, perícias computacionais e consultoria forense"}
            {language === 'en' && "Independent experts specialized in digital evidence analysis, computational forensics and forensic consulting"}
            {language === 'es' && "Peritos independientes especializados en análisis de evidencias digitales, pericias computacionales y consultoría forense"}
          </p>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="conteudo bg-white" style={{ padding: "4rem 0" }}>
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16 lowercase">
            {language === 'pt' && <> serviços <span className="text-[#00ade0]">especializados</span></>}
            {language === 'en' && <> specialized <span className="text-[#00ade0]">services</span></>}
            {language === 'es' && <> servicios <span className="text-[#00ade0]">especializados</span></>}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Forense Digital */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col h-full">
              <div className="mb-4 text-center">
                <h3 className="lowercase mb-1">
                  {language === 'pt' && "forense digital"}
                  {language === 'en' && "digital forensics"}
                  {language === 'es' && "forense digital"}
                </h3>
                <p className="text-sm text-gray-500">
                  {language === 'pt' && "coleta e análise de evidências digitais"}
                  {language === 'en' && "collection and analysis of digital evidence"}
                  {language === 'es' && "recolección y análisis de evidencias digitales"}
                </p>
              </div>
              <p className="text-gray-600 text-sm mt-4 mb-6 flex-grow text-center">
                {language === 'pt' && "recuperação e análise de dados digitais, produção e validação de evidências, reexame forense e contraprova de relatórios"}
                {language === 'en' && "recovery and analysis of digital data, production and validation of evidence, forensic review and counter-evidence of reports"}
                {language === 'es' && "recuperación y análisis de datos digitales, producción y validación de evidencias, revisión forense y contraprueba de informes"}
              </p>
              <div className="mt-auto text-center">
                <a href="/site/forense/services/digital-forensics" className="bg-white border border-[#00ade0] text-[#00ade0] hover:bg-[#00ade0] hover:text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-300 inline-flex justify-center">
                  {language === 'pt' && "saiba mais"}
                  {language === 'en' && "learn more"}
                  {language === 'es' && "conocer más"}
                </a>
              </div>
            </div>
            
            {/* Suporte Legal */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col h-full">
              <div className="mb-4 text-center">
                <h3 className="lowercase mb-1">
                  {language === 'pt' && "suporte legal"}
                  {language === 'en' && "legal support"}
                  {language === 'es' && "soporte legal"}
                </h3>
                <p className="text-sm text-gray-500">
                  {language === 'pt' && "consultoria técnica especializada"}
                  {language === 'en' && "specialized technical consulting"}
                  {language === 'es' && "consultoría técnica especializada"}
                </p>
              </div>
              <p className="text-gray-600 text-sm mt-4 mb-6 flex-grow text-center">
                {language === 'pt' && "consultoria estratégica, assistência técnica processual e esclarecimentos técnicos em audiências para profissionais da área jurídica"}
                {language === 'en' && "strategic consulting, technical procedural assistance and technical clarifications in hearings for legal professionals"}
                {language === 'es' && "consultoría estratégica, asistencia técnica procesal y aclaraciones técnicas en audiencias para profesionales del área jurídica"}
              </p>
              <div className="mt-auto text-center">
                <a href="/site/forense/services/legal-support" className="bg-white border border-[#00ade0] text-[#00ade0] hover:bg-[#00ade0] hover:text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-300 inline-flex justify-center">
                  {language === 'pt' && "saiba mais"}
                  {language === 'en' && "learn more"}
                  {language === 'es' && "conocer más"}
                </a>
              </div>
            </div>
            
            {/* Investigações Corporativas */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col h-full">
              <div className="mb-4 text-center">
                <h3 className="lowercase mb-1">
                  {language === 'pt' && "investigações corporativas"}
                  {language === 'en' && "corporate investigations"}
                  {language === 'es' && "investigaciones corporativas"}
                </h3>
                <p className="text-sm text-gray-500">
                  {language === 'pt' && "compliance e segurança empresarial"}
                  {language === 'en' && "compliance and corporate security"}
                  {language === 'es' && "compliance y seguridad empresarial"}
                </p>
              </div>
              <p className="text-gray-600 text-sm mt-4 mb-6 flex-grow text-center">
                {language === 'pt' && "investigações de fraude, monitoramento de ativos digitais, análise de riscos e ameaças, e compliance digital para empresas"}
                {language === 'en' && "fraud investigations, digital asset monitoring, risk and threat analysis, and digital compliance for companies"}
                {language === 'es' && "investigaciones de fraude, monitoreo de activos digitales, análisis de riesgos y amenazas, y compliance digital para empresas"}
              </p>
              <div className="mt-auto text-center">
                <a href="/site/forense/services/corporate-investigations" className="bg-white border border-[#00ade0] text-[#00ade0] hover:bg-[#00ade0] hover:text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-300 inline-flex justify-center">
                  {language === 'pt' && "saiba mais"}
                  {language === 'en' && "learn more"}
                  {language === 'es' && "conocer más"}
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
            <h2 className="mb-6 lowercase">
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
