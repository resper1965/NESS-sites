import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../SiteContext';
import SiteLayout from '../layout/SiteLayout';

export default function NessAboutPage() {
  const { siteConfig } = useSite();
  const { language } = useI18n();
  
  // Buscar conteúdo da página about específico para o site ness
  const { data: pageContent, isLoading } = useQuery({
    queryKey: ['/api/content/about', language, siteConfig.code],
    queryFn: async () => {
      const res = await fetch(`/api/content/about?lang=${language}&site=${siteConfig.code}`);
      if (!res.ok) throw new Error('Failed to fetch content');
      return res.json();
    }
  });
  
  // Definir o título da página com base no conteúdo
  const pageTitle = pageContent?.metaTitle || 'Sobre a ness. | Segurança e Infraestrutura Digital';
  const pageDescription = pageContent?.metaDescription || 'Conheça a ness., empresa especializada em soluções de segurança digital, infraestrutura e desenvolvimento seguro para empresas.';
  
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
      canonicalUrl={`https://${siteConfig.domain}/about`}
    >
      {/* Hero Section */}
      <section className="bg-[var(--secondary-color)] text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-['Montserrat'] font-normal mb-6 lowercase">
              {pageContent?.content?.title || "sobre a ness."}
            </h1>
            <p className="text-xl text-gray-200 mb-6">
              {pageContent?.content?.subtitle || "soluções modulares de segurança digital para empresas que valorizam o invisível"}
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-['Montserrat'] font-normal mb-6 text-gray-800 lowercase">
                {pageContent?.content?.missionTitle || "nossa missão"}
              </h2>
              <div className="prose max-w-none mb-10">
                <p className="text-gray-600">
                  {pageContent?.content?.missionText || 
                    "a ness. é uma empresa de tecnologia focada em tornar a infraestrutura e segurança digital de nossos clientes invisível – pois quando funciona bem, você nem percebe que está lá. nossa missão é permitir que organizações se concentrem em seu negócio principal, enquanto garantimos que sua tecnologia funcione de forma segura, eficiente e confiável."}
                </p>
              </div>
              
              <h2 className="text-3xl font-['Montserrat'] font-normal mb-6 text-gray-800 lowercase">
                {pageContent?.content?.historyTitle || "nossa história"}
              </h2>
              <div className="prose max-w-none mb-10">
                <p className="text-gray-600">
                  {pageContent?.content?.historyText || 
                    "fundada em 2015, a ness. surgiu da necessidade crescente de soluções de segurança e infraestrutura digital que fossem tanto robustas quanto adaptáveis às rápidas mudanças no cenário tecnológico. começamos com um pequeno time de especialistas em segurança e, desde então, expandimos nosso portfólio para incluir uma ampla gama de serviços modulares que podem ser combinados para atender às necessidades específicas de cada cliente."}
                </p>
              </div>
              
              <h2 className="text-3xl font-['Montserrat'] font-normal mb-6 text-gray-800 lowercase">
                {pageContent?.content?.valuesTitle || "nossos valores"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-medium text-gray-800 mb-3 lowercase">segurança por design</h3>
                  <p className="text-gray-600">
                    integramos segurança em cada aspecto de nossos serviços, desde o início.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-medium text-gray-800 mb-3 lowercase">adaptabilidade</h3>
                  <p className="text-gray-600">
                    nossas soluções evoluem continuamente para acompanhar as mudanças tecnológicas.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-medium text-gray-800 mb-3 lowercase">transparência</h3>
                  <p className="text-gray-600">
                    mantemos comunicação clara e honesta com nossos clientes e parceiros.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-medium text-gray-800 mb-3 lowercase">inovação contínua</h3>
                  <p className="text-gray-600">
                    buscamos constantemente novas formas de melhorar e expandir nossas soluções.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div>
              <div className="bg-[#f8f9fa] p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 lowercase">divisões especializadas</h3>
                <ul className="space-y-4">
                  <li>
                    <h4 className="font-medium">trustness<span className="text-[var(--primary-color)]">.</span></h4>
                    <p className="text-gray-600 text-sm">Consultoria estratégica e governança em segurança da informação</p>
                  </li>
                  <li>
                    <h4 className="font-medium">forense<span className="text-[var(--primary-color)]">.</span>io</h4>
                    <p className="text-gray-600 text-sm">Resposta a incidentes e análise forense digital</p>
                  </li>
                  <li>
                    <h4 className="font-medium">n<span className="text-[var(--primary-color)]">.</span>privacy</h4>
                    <p className="text-gray-600 text-sm">Plataforma SaaS para gestão de privacidade e conformidade</p>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8 bg-[#f8f9fa] p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 lowercase">reconhecimentos</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-[var(--primary-color)] mr-2">•</span>
                    <span className="text-gray-600">
                      Top 10 Cybersecurity Companies to Watch - 2023
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-color)] mr-2">•</span>
                    <span className="text-gray-600">
                      Best Security Solutions Provider - Brazil Tech Awards 2022
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-color)] mr-2">•</span>
                    <span className="text-gray-600">
                      Innovation in Digital Infrastructure - 2021
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-['Montserrat'] font-normal mb-12 text-center text-gray-800 lowercase">
            {pageContent?.content?.teamTitle || "nosso time de liderança"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 bg-gray-200">
                {/* Placeholder for team member image */}
              </div>
              <h3 className="text-xl font-medium mb-1">Carla Mendes</h3>
              <p className="text-[var(--primary-color)] mb-3">CEO & Fundadora</p>
              <p className="text-gray-600 text-sm">Especialista em segurança cibernética com mais de 15 anos de experiência no setor.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 bg-gray-200">
                {/* Placeholder for team member image */}
              </div>
              <h3 className="text-xl font-medium mb-1">Rodrigo Alves</h3>
              <p className="text-[var(--primary-color)] mb-3">CTO</p>
              <p className="text-gray-600 text-sm">Engenheiro de software com foco em arquitetura de sistemas seguros e escaláveis.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 bg-gray-200">
                {/* Placeholder for team member image */}
              </div>
              <h3 className="text-xl font-medium mb-1">Marina Sousa</h3>
              <p className="text-[var(--primary-color)] mb-3">Diretora de Operações</p>
              <p className="text-gray-600 text-sm">Especialista em otimização de processos de TI e gestão de equipes técnicas.</p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}