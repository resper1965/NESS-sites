import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/common/SEOHead';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Content } from '@shared/schema';

export default function AboutPage() {
  const { t, language } = useI18n();
  
  // Fetch about content
  const { data: content, isLoading } = useQuery<Content>({
    queryKey: [`/api/content/about?lang=${language}`],
  });

  const heroBackground = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&h=1080&q=80";

  const defaultContent = {
    title: t('about.title'),
    content: `
      <div class="prose prose-lg mx-auto">
        <h2>Nossa História</h2>
        <p>Fundada em 1991, a ness. surgiu como uma resposta às crescentes necessidades de serviços tecnológicos avançados no mercado brasileiro. Inicialmente focados em infraestrutura de TI, rapidamente expandimos nossa atuação para incluir cibersegurança, desenvolvimento de software e consultoria em transformação digital.</p>
        
        <p>Ao longo de mais de três décadas de atuação, evoluímos constantemente para acompanhar as mudanças tecnológicas e as necessidades de nossos clientes, mantendo sempre nossa essência de inovação e excelência técnica que nos define desde o primeiro dia.</p>
        
        <h2>Missão</h2>
        <p>Desenvolver e entregar soluções tecnológicas que potencializem os negócios de nossos clientes, garantindo segurança, escalabilidade e inovação, enquanto promovemos um ambiente colaborativo para o crescimento de nossos profissionais.</p>
        
        <h2>Visão</h2>
        <p>Ser reconhecida como referência em serviços tecnológicos de alto valor agregado, destacando-se pela capacidade de antever tendências e implementar soluções que realmente transformam o modo como as organizações operam no mundo digital.</p>
        
        <h2>Valores</h2>
        <ul>
          <li><strong>Excelência Técnica:</strong> Comprometimento com os mais altos padrões de qualidade e eficiência em tudo o que fazemos.</li>
          <li><strong>Inovação Contínua:</strong> Busca constante por novas tecnologias, métodos e soluções que gerem valor real para nossos clientes.</li>
          <li><strong>Integridade:</strong> Transparência e ética em todas as nossas relações e decisões.</li>
          <li><strong>Colaboração:</strong> Valorização do trabalho em equipe e das parcerias de longo prazo com clientes e parceiros.</li>
          <li><strong>Responsabilidade:</strong> Compromisso com o desenvolvimento sustentável e impacto positivo na sociedade.</li>
        </ul>
        
        <h2>Nossa Equipe</h2>
        <p>Nossa equipe é formada por profissionais altamente qualificados e certificados nas principais tecnologias do mercado. A diversidade de experiências e competências nos permite abordar desafios complexos com criatividade e eficiência, sempre buscando as melhores soluções para cada contexto de negócio.</p>
        
        <p>Investimos continuamente no desenvolvimento de nossos talentos, incentivando a inovação, o aprendizado constante e a troca de conhecimentos, criando um ambiente onde ideias são valorizadas e transformadas em soluções concretas.</p>
      </div>
    `
  };

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ness.",
    "url": "https://www.ness.com.br",
    "logo": "https://www.ness.com.br/logo.png",
    "foundingDate": "1991",
    "description": "Empresa especializada em serviços de tecnologia, incluindo infraestrutura, segurança cibernética e desenvolvimento de software.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Paulista, 1000",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "postalCode": "01310-100",
      "addressCountry": "BR"
    }
  };

  return (
    <>
      <SEOHead 
        title={`${defaultContent.title} | ness.`}
        description="Conheça a história da ness., empresa com mais de 30 anos de experiência em serviços de tecnologia, infraestrutura e segurança cibernética."
        canonicalUrl="/about"
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
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&h=1080&q=80" 
              alt="Equipe ness" 
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          {/* Conteúdo */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-['Montserrat'] font-normal text-5xl md:text-6xl text-white mb-6">
                Quem somos
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Há mais de 30 anos transformando desafios tecnológicos em oportunidades de negócio
              </p>
            </div>
          </div>
        </section>
        
        {/* NESS Section */}
        <section className="py-16 bg-gradient-to-b from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-['Montserrat'] font-normal text-3xl md:text-4xl mb-8">
                Transformação, performance e inovação em negócios
              </h2>
              <div className="text-xl text-white/90">
                <p className="mb-6">
                  A NESS é uma empresa brasileira de tecnologia com foco na solução de problemas reais com uso de inovação, transformação e na entrega de resultados com velocidade e segurança.
                </p>
                <p className="mb-6">
                  Ao longo dos últimos 32 anos, nosso time desenha, implementa, suporta, executa, monitora, sustenta e co-gerencia importantes transformações digitais em parceria com nossos clientes.
                </p>
                <p className="font-bold mt-8 text-2xl">
                  Somos a NESS
                </p>
                <p>
                  Apaixonados por resolver grandes problemas através da inovação e transformação digital, com muita tecnologia!
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6 mb-4"></div>
              </div>
            ) : (
              <div 
                className="prose prose-lg mx-auto"
                dangerouslySetInnerHTML={{ 
                  __html: content?.content || defaultContent.content 
                }}
              />
            )}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-['Montserrat'] text-center mb-12">Nossa Trajetória</h2>
            
            <div className="max-w-4xl mx-auto relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>
              
              {/* Timeline items */}
              <div className="relative z-10">
                {/* 1991 */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-primary mb-2">1991</h3>
                      <p className="text-gray-700">Fundação da ness. como uma empresa de consultoria em infraestrutura de TI.</p>
                    </div>
                  </div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                </div>
                
                {/* 1998 */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-primary mb-2">1998</h3>
                      <p className="text-gray-700">Expansão para serviços de segurança cibernética, antecipando as necessidades emergentes do mercado.</p>
                    </div>
                  </div>
                </div>
                
                {/* 2005 */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-primary mb-2">2005</h3>
                      <p className="text-gray-700">Criação da divisão de desenvolvimento de software, ampliando nosso portfólio de soluções.</p>
                    </div>
                  </div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                </div>
                
                {/* 2012 */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-primary mb-2">2012</h3>
                      <p className="text-gray-700">Início das operações de cloud computing e início da transformação de nossos serviços para o modelo atual.</p>
                    </div>
                  </div>
                </div>
                
                {/* 2018 */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-primary mb-2">2018</h3>
                      <p className="text-gray-700">Renovação da marca e reposicionamento para o atual modelo baseado em serviços especializados.</p>
                    </div>
                  </div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                </div>
                
                {/* Hoje */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-accent">
                      <h3 className="text-xl font-medium text-primary mb-2">Hoje</h3>
                      <p className="text-gray-700">Reconhecida como referência em serviços especializados de tecnologia, com foco em n.InfraOps, n.SecOps, n.DevOps e n.CloudOps.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-['Montserrat'] font-normal mb-6">Quer saber mais sobre a ness.?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-lg text-white/90">
              Entre em contato conosco para descobrir como nossos serviços podem ajudar sua empresa a superar desafios tecnológicos e alcançar novos patamares.
            </p>
            <a href="/contact" className="inline-block bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-md transition duration-300">
              Fale Conosco
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
