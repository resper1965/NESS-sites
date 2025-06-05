import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/common/SEOHead';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function SecOpsPage() {
  const { t } = useI18n();
  
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "n.SecOps",
    "provider": {
      "@type": "Organization",
      "name": "ness.",
      "url": "https://www.ness.com.br"
    },
    "description": "Serviços avançados de segurança cibernética para proteção contínua contra ameaças digitais e conformidade regulatória",
    "serviceType": "Segurança Cibernética"
  };

  // Serviços oferecidos nesta categoria
  const offerings = [
    {
      title: "Avaliação de Vulnerabilidades",
      description: "Identificação e classificação de vulnerabilidades em sua infraestrutura digital para priorização de ações corretivas e preventivas.",
      icon: "shield-alert"
    },
    {
      title: "SOC como Serviço",
      description: "Centro de Operações de Segurança (SOC) 24x7 para monitoramento contínuo, detecção e resposta a incidentes de segurança em tempo real.",
      icon: "eye"
    },
    {
      title: "Gestão de Identidades",
      description: "Implementação de soluções robustas de gerenciamento de identidades e acessos (IAM) para controle granular e seguro de permissões.",
      icon: "user-check"
    },
    {
      title: "Resposta a Incidentes",
      description: "Equipe especializada em resposta rápida a incidentes de segurança, minimizando impactos e restaurando operações normais.",
      icon: "shield-off"
    }
  ];

  const heroBackground = "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1920&h=1080&q=80";

  return (
    <>
      <SEOHead 
        title="n.SecOps - Serviços Avançados de Segurança Cibernética | ness."
        description="Proteja sua organização contra ameaças digitais com nossos serviços avançados de segurança cibernética, incluindo SOC 24x7, gestão de vulnerabilidades e resposta a incidentes."
        structuredData={structuredData}
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden" style={{ minHeight: '60vh' }}>
          {/* Padrão de Grid */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzM0MTU1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
          
          {/* Linhas Sutis */}
          <div className="absolute top-1/4 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-[#00ade0] to-transparent opacity-40"></div>
          <div className="absolute bottom-1/3 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-[#00ade0] to-transparent opacity-40"></div>
          <div className="absolute top-1/2 left-1/3 w-px h-24 bg-gradient-to-b from-transparent via-[#00ade0] to-transparent opacity-30"></div>
          <div className="absolute bottom-1/4 right-1/3 w-24 h-px bg-gradient-to-r from-transparent via-[#00ade0] to-transparent opacity-30"></div>
          
          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center h-full text-center" style={{ minHeight: '60vh' }}>
            {/* Logo do Serviço */}
            <h1 className="font-['Montserrat'] font-light text-7xl md:text-8xl text-white mb-6 lowercase">
              n<span className="text-[#00ade0]">.</span>SecOps
            </h1>
            
            {/* Tagline */}
            <h2 className="mb-8">
              <div className="font-light text-2xl md:text-3xl text-slate-300 mb-2">
                Tecnologia avançada
              </div>
              <div className="font-normal text-2xl md:text-3xl text-[#00ade0]">
                para resultados extraordinários
              </div>
            </h2>
            
            {/* Parágrafo descritivo */}
            <p className="font-light text-lg text-slate-400 max-w-2xl leading-relaxed">
              Serviços avançados de segurança cibernética para proteção contínua contra ameaças digitais em constante evolução, garantindo a integridade dos seus dados e a continuidade dos negócios.
            </p>
          </div>
        </section>
        
        <section id="details" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-['Montserrat'] text-primary mb-8">Nossa Abordagem</h2>
              
              <p className="text-lg mb-8 text-gray-700">
                Na ness., combinamos tecnologia de ponta, inteligência de ameaças e expertise humana para oferecer proteção abrangente contra os riscos cibernéticos mais sofisticados. Nossa abordagem de segurança em camadas garante que sua organização esteja protegida em todos os níveis.
              </p>
              
              <p className="text-lg mb-12 text-gray-700">
                Compreendemos que cada organização possui desafios únicos de segurança. Por isso, desenvolvemos estratégias personalizadas que se integram perfeitamente aos seus processos de negócio, equilibrando proteção e produtividade.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {offerings.map((offering, index) => (
                  <div key={index} className="bg-neutral p-6 rounded-lg shadow">
                    <h3 className="text-xl font-['Montserrat'] text-primary mb-4">{offering.title}</h3>
                    <p className="text-gray-700">{offering.description}</p>
                  </div>
                ))}
              </div>
              
              <h2 className="text-3xl font-['Montserrat'] text-primary mb-8">Nossos Diferenciais</h2>
              
              <ul className="space-y-6 mb-12">
                <li className="flex items-start">
                  <div className="mr-4 text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Inteligência de Ameaças</h3>
                    <p className="text-gray-700">Vigilância contínua do cenário de ameaças para antecipar e prevenir ataques direcionados.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Equipe Certificada</h3>
                    <p className="text-gray-700">Profissionais com certificações CISSP, CEH, OSCP e outras reconhecidas internacionalmente.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Conformidade Regulatória</h3>
                    <p className="text-gray-700">Expertise em LGPD, ISO 27001, PCI DSS e outras normas e regulamentações.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Automação Avançada</h3>
                    <p className="text-gray-700">Ferramentas de automação de segurança para resposta rápida a ameaças e eficiência operacional.</p>
                  </div>
                </li>
              </ul>
              
              <div className="bg-neutral p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-['Montserrat'] text-primary mb-4">Agende uma avaliação de segurança</h3>
                <p className="text-gray-700 mb-6">
                  Descubra como sua organização está protegida contra as ameaças cibernéticas atuais. Nossa avaliação de segurança identifica vulnerabilidades e fornece um roadmap claro para fortalecer suas defesas.
                </p>
                <a href="/contact" className="bg-accent hover:bg-accent-dark text-white py-3 px-6 rounded-md inline-block transition duration-300">
                  Solicitar Avaliação Gratuita
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
