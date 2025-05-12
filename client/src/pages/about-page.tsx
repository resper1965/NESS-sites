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

  const defaultContent = {
    title: t('about.title'),
    content: `
      <div class="prose prose-lg mx-auto">
        <h2>Nossa História</h2>
        <p>Fundada em 2008, a CorpTech nasceu da visão de criar soluções tecnológicas que realmente transformassem a maneira como as empresas operam. Começamos como uma pequena consultoria especializada em segurança da informação e, ao longo dos anos, expandimos nossa atuação para abranger um portfólio completo de serviços em tecnologia.</p>
        
        <h2>Missão</h2>
        <p>Desenvolver e implementar soluções tecnológicas inovadoras que permitam às empresas operarem com eficiência, segurança e sustentabilidade, gerando valor para clientes, colaboradores e a sociedade.</p>
        
        <h2>Visão</h2>
        <p>Ser reconhecida como a principal referência em transformação digital e segurança da informação na América Latina, liderando a adoção de tecnologias emergentes que impulsionem negócios responsáveis.</p>
        
        <h2>Valores</h2>
        <ul>
          <li><strong>Inovação:</strong> Buscamos constantemente novas soluções e abordagens para desafios complexos.</li>
          <li><strong>Segurança:</strong> Proteger dados e informações é a base de tudo o que fazemos.</li>
          <li><strong>Excelência:</strong> Buscamos os mais altos padrões de qualidade em todos os nossos serviços.</li>
          <li><strong>Colaboração:</strong> Acreditamos no poder do trabalho em equipe e das parcerias de longo prazo.</li>
          <li><strong>Responsabilidade:</strong> Atuamos com ética, transparência e compromisso com a sustentabilidade.</li>
        </ul>
        
        <h2>Nossa Equipe</h2>
        <p>Contamos com mais de 50 especialistas em diversas áreas da tecnologia, incluindo engenheiros de segurança, desenvolvedores, arquitetos de soluções, cientistas de dados e consultores de negócios. Nossa equipe multidisciplinar garante uma abordagem holística para os desafios tecnológicos das empresas.</p>
      </div>
    `
  };

  return (
    <>
      <SEOHead 
        title={`${defaultContent.title} - CorpTech`}
        description="Conheça nossa história, missão, visão e valores. Saiba como a CorpTech se tornou referência em soluções tecnológicas inovadoras."
        canonicalUrl="/about"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-primary text-white">
          <div className="container mx-auto px-4 pt-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{content?.title || defaultContent.title}</h1>
              <div className="w-20 h-1 bg-accent mx-auto"></div>
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
      </main>
      
      <Footer />
    </>
  );
}
