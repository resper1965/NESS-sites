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
        {/* Hero Section com novo estilo */}
        <section className="hero">
          {/* Elementos de fundo e conexões */}
          <div className="hero-bg-elements">
            {/* Grade e linhas abstratas */}
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#ffffff" strokeWidth="0.1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
              
              {/* Linhas de conexão */}
              <path d="M20,30 Q40,20 60,40 T90,30" stroke="#00ade0" strokeWidth="0.2" fill="none" opacity="0.3" />
              <path d="M10,50 Q30,60 50,40 T80,50" stroke="#00ade0" strokeWidth="0.2" fill="none" opacity="0.3" />
              <path d="M30,80 Q50,70 70,60 T90,70" stroke="#00ade0" strokeWidth="0.2" fill="none" opacity="0.3" />
            </svg>
          </div>
          
          {/* Nós de conexão */}
          <div className="connection-nodes">
            <div className="node" style={{ top: '20%', left: '10%' }}></div>
            <div className="node" style={{ top: '30%', left: '25%' }}></div>
            <div className="node" style={{ top: '15%', left: '45%' }}></div>
            <div className="node" style={{ top: '25%', left: '65%' }}></div>
            <div className="node" style={{ top: '10%', left: '85%' }}></div>
            <div className="node" style={{ top: '45%', left: '15%' }}></div>
            <div className="node" style={{ top: '55%', left: '35%' }}></div>
            <div className="node" style={{ top: '65%', left: '55%' }}></div>
            <div className="node" style={{ top: '75%', left: '75%' }}></div>
            <div className="node" style={{ top: '85%', left: '25%' }}></div>
            <div className="node" style={{ top: '50%', left: '85%' }}></div>
          </div>
          
          {/* Conteúdo principal */}
          <div className="hero-content">
            <h1>quem somos</h1>
            <p>há 33 anos transformando problemas complexos em soluções modulares.</p>
          </div>
          
          {/* Indicador de rolagem */}
          <div className="scroll-indicator">↓</div>
        </section>
        
        {/* Manifesto Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-['Montserrat'] font-normal text-3xl md:text-4xl mb-8 text-center lowercase">
                <span className="font-normal">somos a</span> <span className="text-black font-normal">ness<span className="text-[#00ade0]">.</span></span>
              </h2>
              
              <div className="prose prose-lg mx-auto text-gray-700 lowercase">
                <p className="mb-6">
                  desde 1991, evoluímos de uma consultoria de infraestrutura de TI para uma plataforma confiável de tecnologia e inovação. entregamos soluções com clareza, segurança e propósito.
                </p>
                
                <p className="mb-6">
                  nossa equipe projeta, implementa, monitora e sustenta operações críticas — sempre com velocidade, ética e uma mentalidade orientada a resultados.
                </p>
                
                <p className="mb-6">
                  somos apaixonados por resolver grandes problemas através da tecnologia e colaboração de longo prazo.
                </p>
                
                <p className="mb-6">
                  acreditamos que o essencial é muitas vezes invisível. e que o impacto real começa com decisões simples e arquiteturas seguras.
                </p>
              </div>
            </div>
          </div>
        </section>
        


        {/* Timeline Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-['Montserrat'] font-normal text-center mb-12 lowercase">nossa trajetória</h2>
            
            <div className="max-w-4xl mx-auto relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#00ade0]/20"></div>
              
              {/* Timeline items */}
              <div className="relative z-10">
                {/* 1991 */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">1991</h3>
                      <p className="text-gray-700 lowercase">a ness. é fundada como tercerização da área de tecnologia de um grande grupo econômico.</p>
                    </div>
                  </div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                </div>
                
                {/* 1992 */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">1992</h3>
                      <p className="text-gray-700 lowercase">atividades de infraestrutura, processamento de dados e BPO.</p>
                    </div>
                  </div>
                </div>
                
                {/* 1998 */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">1998</h3>
                      <p className="text-gray-700 lowercase">início na atividade de infraestrutura em grandes eventos por todo diversos países da europa, américas, africa e ásia.</p>
                    </div>
                  </div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                </div>
                
                {/* 2005 */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2005</h3>
                      <p className="text-gray-700 lowercase">início de serviços de privacidade e segurança digital.</p>
                    </div>
                  </div>
                </div>
                
                {/* 2014 - Lado esquerdo */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2014</h3>
                      <p className="text-gray-700 lowercase">lançamento da divisão de software e processos.</p>
                    </div>
                  </div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                </div>
                
                {/* 2014 - Lado direito - Healthcare */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2014</h3>
                      <p className="text-gray-700 lowercase">incubação de projetos de saúde. NESS Technology healthcare inicia como incubação.</p>
                    </div>
                  </div>
                </div>
                
                {/* 2016 - Trustness */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2016</h3>
                      <p className="text-gray-700 lowercase">incubação da Trustness.</p>
                    </div>
                  </div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                </div>
                
                {/* 2017 - Healthcare BU */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2017</h3>
                      <p className="text-gray-700 lowercase">criação da unidade de negócios NESS Health como Business Unit da NESS.</p>
                    </div>
                  </div>
                </div>
                
                {/* 2018 - Trustness BU */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2018</h3>
                      <p className="text-gray-700 lowercase">Trustness como unidade de negócios.</p>
                    </div>
                  </div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                </div>
                
                {/* 2019 - Healthcare spin-off */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2019</h3>
                      <p className="text-gray-700 lowercase">spin-off da NESS Health da NESS.</p>
                    </div>
                  </div>
                </div>
                
                {/* 2021 - forense.io incubation */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2021</h3>
                      <p className="text-gray-700 lowercase">incubação da forense.io.</p>
                    </div>
                  </div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                </div>
                
                {/* 2022 - forense.io BU */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2022</h3>
                      <p className="text-gray-700 lowercase">forense.io como unidade de negócios.</p>
                    </div>
                  </div>
                </div>
                
                {/* 2025 */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-[#00ade0]">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2025</h3>
                      <p className="text-gray-700 lowercase">estabelecida como uma plataforma modular para transformação digital confiável.</p>
                    </div>
                  </div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-['Montserrat'] font-normal mb-6 lowercase">quer saber mais sobre a <span className="text-black">ness<span className="text-[#00ade0]">.</span></span>?</h2>
            <a href="/contact" className="inline-block bg-[#00ade0] hover:bg-[#00ade0]/90 text-white px-8 py-3 rounded-sm transition duration-300 lowercase">
              fale conosco
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
