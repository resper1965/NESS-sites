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
        {/* Hero Section com estilo clean e modular */}
        <section className="relative w-full py-32 overflow-hidden bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 max-w-2xl">
                <h1 className="font-['Montserrat'] font-normal text-5xl md:text-6xl text-black mb-6 lowercase">
                  about us
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                  33 years turning complex problems into modular solutions.
                </p>
                
                {/* Elementos visuais modulares */}
                <div className="flex gap-4 items-center mt-6">
                  <div className="w-16 h-16 bg-[#00ade0] rounded-sm flex items-center justify-center">
                    <div className="w-8 h-8 bg-white"></div>
                  </div>
                  <div className="w-24 h-1 bg-[#00ade0]"></div>
                  <div className="w-12 h-12 border-2 border-[#00ade0] rounded-sm"></div>
                </div>
              </div>
              
              <div className="flex-1 relative">
                {/* Elementos geométricos modulares */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="aspect-square bg-gray-100 border border-gray-200 rounded-sm"></div>
                  <div className="aspect-square bg-[#00ade0]/10 border border-[#00ade0]/30 rounded-sm flex items-center justify-center">
                    <div className="w-1/2 h-1/2 border-2 border-[#00ade0]"></div>
                  </div>
                  <div className="aspect-square bg-gray-100 border border-gray-200 rounded-sm"></div>
                  <div className="aspect-square bg-[#00ade0]/20 border border-[#00ade0]/40 rounded-sm"></div>
                  <div className="aspect-square bg-white border-2 border-[#00ade0] rounded-sm flex items-center justify-center">
                    <div className="w-1/2 h-1/2 bg-[#00ade0]/30"></div>
                  </div>
                  <div className="aspect-square bg-gray-100 border border-gray-200 rounded-sm"></div>
                  <div className="aspect-square bg-gray-100 border border-gray-200 rounded-sm"></div>
                  <div className="aspect-square bg-[#00ade0]/10 border border-[#00ade0]/30 rounded-sm"></div>
                  <div className="aspect-square bg-[#00ade0] rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Manifesto Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-['Montserrat'] font-normal text-3xl md:text-4xl mb-8 text-center lowercase">
                <span className="font-normal">we are</span> <span className="text-black font-normal">ness<span className="text-[#00ade0]">.</span></span>
              </h2>
              
              <div className="prose prose-lg mx-auto text-gray-700 lowercase">
                <p className="mb-6">
                  since 1991, we've evolved from an IT infrastructure consultancy into a trusted platform for technology and innovation. we deliver solutions with clarity, security, and purpose.
                </p>
                
                <p className="mb-6">
                  our team designs, implements, monitors, and sustains critical operations — always with speed, ethics, and a results-driven mindset.
                </p>
                
                <p className="mb-6">
                  we're passionate about solving big problems through technology and long-term collaboration.
                </p>
                
                <p className="mb-6">
                  we believe what's essential is often invisible. and that real impact starts with simple decisions and secure architectures.
                </p>
              </div>
            </div>
          </div>
        </section>
        


        {/* Timeline Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-['Montserrat'] font-normal text-center mb-12 lowercase">our journey</h2>
            
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
                      <p className="text-gray-700 lowercase">ness. is founded as an IT infrastructure consulting firm.</p>
                    </div>
                  </div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                </div>
                
                {/* 1998 */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">1998</h3>
                      <p className="text-gray-700 lowercase">expanded into cybersecurity, anticipating emerging needs.</p>
                    </div>
                  </div>
                </div>
                
                {/* 2005 */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2005</h3>
                      <p className="text-gray-700 lowercase">launched a custom software division to broaden capabilities.</p>
                    </div>
                  </div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                </div>
                
                {/* 2012 */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2012</h3>
                      <p className="text-gray-700 lowercase">cloud computing services begin; transition to service-centric model.</p>
                    </div>
                  </div>
                </div>
                
                {/* 2018 */}
                <div className="mb-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2018</h3>
                      <p className="text-gray-700 lowercase">brand renewal and repositioning around specialized service units.</p>
                    </div>
                  </div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                </div>
                
                {/* 2025 */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                  <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-[#00ade0] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#00ade0]">
                      <h3 className="text-xl font-medium text-[#00ade0] mb-2">2025</h3>
                      <p className="text-gray-700 lowercase">established as a modular platform for reliable digital transformation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-['Montserrat'] font-normal mb-6 lowercase">want to know more about <span className="text-black">ness<span className="text-[#00ade0]">.</span></span>?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-600 lowercase">
              contact us to discover how our services can help your company overcome technological challenges and reach new heights.
            </p>
            <a href="/contact" className="inline-block bg-[#00ade0] hover:bg-[#00ade0]/90 text-white px-8 py-3 rounded-sm transition duration-300 lowercase">
              get in touch
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
