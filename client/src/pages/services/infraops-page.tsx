import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/common/SEOHead';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function InfraOpsPage() {
  const { t } = useI18n();
  
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "n.InfraOps",
    "provider": {
      "@type": "Organization",
      "name": "ness.",
      "url": "https://www.ness.com.br"
    },
    "description": "Serviços de infraestrutura de TI que garantem disponibilidade, escalabilidade e segurança para operações críticas",
    "serviceType": "Infraestrutura de TI"
  };

  // Serviços oferecidos nesta categoria
  const offerings = [
    {
      title: "Infraestrutura como Código",
      description: "Automatização de infraestrutura usando ferramentas como Terraform, Ansible e Pulumi para criar ambientes consistentes, auditáveis e escaláveis.",
      icon: "cloud-code"
    },
    {
      title: "Monitoramento 24x7",
      description: "Monitoramento proativo de toda sua infraestrutura com alertas em tempo real e resposta imediata a incidentes antes que afetem seus negócios.",
      icon: "graph"
    },
    {
      title: "Cloud Gerenciado",
      description: "Gestão de ambientes em nuvem (AWS, Azure, GCP) otimizando custos, performance e segurança para maximizar seu investimento.",
      icon: "cloud"
    },
    {
      title: "Disaster Recovery",
      description: "Planejamento e implementação de estratégias de recuperação de desastres com testes regulares para garantir a continuidade dos negócios.",
      icon: "shield"
    }
  ];

  const heroBackground = "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1920&h=1080&q=80";

  return (
    <>
      <SEOHead 
        title="n.InfraOps - Infraestrutura de TI como Vantagem Estratégica | ness."
        description="Serviços de infraestrutura de TI que garantem disponibilidade, escalabilidade e segurança para suas operações críticas, com monitoramento 24x7 e resposta imediata a incidentes."
        structuredData={structuredData}
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section com imagem escurecida */}
        <section className="relative w-full py-32 overflow-hidden">
          {/* Imagem de fundo escurecida */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-primary/50 mix-blend-multiply z-10"></div>
            <img 
              src={heroBackground} 
              alt="Infraestrutura de TI" 
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          {/* Conteúdo */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl">
              <h1 className=" font-normal text-5xl md:text-6xl text-white mb-8">
                n<span className="text-[#00ade0]">.</span>InfraOps
              </h1>
              <p className="text-xl text-white/90 max-w-3xl">
                Serviços de infraestrutura de TI que garantem disponibilidade, escalabilidade e segurança para suas operações críticas, com monitoramento 24x7 e resposta imediata a incidentes.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a 
                  href="/contact" 
                  className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md transition duration-300"
                >
                  Solicitar Orçamento
                </a>
                <a 
                  href="#details" 
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md transition duration-300"
                >
                  Saiba Mais
                </a>
              </div>
            </div>
          </div>
        </section>
        
        <section id="details" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl  text-primary mb-8">O que oferecemos</h2>
              
              <p className="text-lg mb-8 text-gray-700">
                Na ness., entendemos que uma infraestrutura robusta e bem gerenciada é o alicerce para operações de negócios confiáveis e seguras. Nossa equipe de especialistas em n.InfraOps combina experiência técnica profunda, metodologias comprovadas e ferramentas de ponta para oferecer soluções que transformam sua infraestrutura em uma vantagem competitiva.
              </p>
              
              <p className="text-lg mb-12 text-gray-700">
                Seja para modernizar ambientes legados, migrar para a nuvem ou otimizar operações existentes, temos a expertise para oferecer soluções que se alinham perfeitamente às suas necessidades de negócio.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {offerings.map((offering, index) => (
                  <div key={index} className="bg-neutral p-6 rounded-lg shadow">
                    <h3 className="text-xl  text-primary mb-4">{offering.title}</h3>
                    <p className="text-gray-700">{offering.description}</p>
                  </div>
                ))}
              </div>
              
              <h2 className="text-3xl  text-primary mb-8">Por que escolher a ness.</h2>
              
              <ul className="space-y-6 mb-12">
                <li className="flex items-start">
                  <div className="mr-4 text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Expertise Técnica</h3>
                    <p className="text-gray-700">Equipe com certificações nas principais tecnologias e plataformas de nuvem.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Abordagem Consultiva</h3>
                    <p className="text-gray-700">Trabalhamos próximos aos seus times, entendendo o contexto do negócio para entregar a solução mais adequada.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Suporte 24x7</h3>
                    <p className="text-gray-700">Monitoramento e suporte ininterruptos, garantindo que suas operações críticas nunca parem.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Segurança por Design</h3>
                    <p className="text-gray-700">Implementamos práticas de segurança em todas as camadas da infraestrutura desde o início.</p>
                  </div>
                </li>
              </ul>
              
              <div className="bg-neutral p-8 rounded-lg shadow-md">
                <h3 className="text-2xl  text-primary mb-4">Entre em contato</h3>
                <p className="text-gray-700 mb-6">
                  Pronto para transformar sua infraestrutura em uma vantagem competitiva? Nossa equipe de especialistas está pronta para ajudar.
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