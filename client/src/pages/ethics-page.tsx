import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/common/SEOHead';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Content } from '@shared/schema';

export default function EthicsPage() {
  const { t, language } = useI18n();
  
  // Fetch ethics content
  const { data: content, isLoading } = useQuery<Content>({
    queryKey: [`/api/content/ethics?lang=${language}`],
  });

  const defaultContent = {
    title: 'Código de Ética',
    content: `
      <div class="prose prose-lg mx-auto">
        <h2>Nosso Compromisso Ético</h2>
        <p>A ness. estabelece este Código de Ética para orientar as condutas e decisões de todos os seus colaboradores, parceiros e fornecedores. Acreditamos que o sucesso sustentável só é possível quando fundamentado em princípios éticos sólidos.</p>
        
        <h2>Princípios Fundamentais</h2>
        <ul>
          <li><strong>Integridade:</strong> Agimos com honestidade e transparência em todas as nossas relações comerciais e institucionais.</li>
          <li><strong>Respeito:</strong> Valorizamos a diversidade e tratamos todas as pessoas com dignidade e consideração.</li>
          <li><strong>Responsabilidade:</strong> Assumimos as consequências de nossas ações e decisões, buscando sempre o melhor resultado para todos os envolvidos.</li>
          <li><strong>Excelência:</strong> Comprometemo-nos com a qualidade e a melhoria contínua em tudo o que fazemos.</li>
          <li><strong>Sustentabilidade:</strong> Conduzimos nossos negócios de forma a preservar o meio ambiente e contribuir positivamente para a sociedade.</li>
        </ul>
        
        <h2>Relacionamento com Clientes</h2>
        <p>Nos comprometemos a:</p>
        <ul>
          <li>Oferecer produtos e serviços de qualidade, que atendam às necessidades dos clientes.</li>
          <li>Fornecer informações claras, precisas e transparentes sobre nossos produtos e serviços.</li>
          <li>Proteger a confidencialidade das informações dos clientes.</li>
          <li>Resolver reclamações e conflitos de forma justa e eficiente.</li>
        </ul>
        
        <h2>Relacionamento com Colaboradores</h2>
        <p>Nos comprometemos a:</p>
        <ul>
          <li>Proporcionar um ambiente de trabalho seguro, saudável e inclusivo.</li>
          <li>Respeitar os direitos humanos e trabalhistas.</li>
          <li>Promover a diversidade e combater qualquer forma de discriminação.</li>
          <li>Investir no desenvolvimento profissional e pessoal dos nossos colaboradores.</li>
          <li>Reconhecer e recompensar o desempenho com base no mérito.</li>
        </ul>
        
        <h2>Relacionamento com Parceiros e Fornecedores</h2>
        <p>Nos comprometemos a:</p>
        <ul>
          <li>Estabelecer relações de negócio justas e transparentes.</li>
          <li>Selecionar parceiros e fornecedores com base em critérios objetivos de qualidade, preço e sustentabilidade.</li>
          <li>Cumprir os acordos e contratos estabelecidos.</li>
          <li>Exigir o cumprimento deste Código de Ética por parte de nossos parceiros e fornecedores.</li>
        </ul>
        
        <h2>Relacionamento com a Sociedade e o Meio Ambiente</h2>
        <p>Nos comprometemos a:</p>
        <ul>
          <li>Cumprir as leis e regulamentos aplicáveis ao nosso negócio.</li>
          <li>Prevenir e minimizar os impactos ambientais decorrentes de nossas operações.</li>
          <li>Contribuir para o desenvolvimento sustentável das comunidades onde atuamos.</li>
          <li>Promover e participar de iniciativas sociais e ambientais.</li>
        </ul>
        
        <h2>Conflitos de Interesse</h2>
        <p>Definimos conflito de interesse como qualquer situação em que os interesses pessoais de um colaborador possam interferir nos interesses da empresa ou de seus clientes. Nestas situações, o colaborador deve:</p>
        <ul>
          <li>Informar imediatamente seu superior hierárquico sobre o potencial conflito.</li>
          <li>Abster-se de participar de decisões relacionadas à situação de conflito.</li>
          <li>Não usar sua posição na empresa para obter vantagens pessoais.</li>
        </ul>
        
        <h2>Combate à Corrupção</h2>
        <p>A ness. repudia veementemente qualquer forma de corrupção. É expressamente proibido a todos os colaboradores, parceiros e fornecedores:</p>
        <ul>
          <li>Oferecer, prometer, dar ou autorizar vantagens indevidas a qualquer pessoa, especialmente a agentes públicos.</li>
          <li>Solicitar ou aceitar vantagens indevidas em troca de influência ou favorecimento.</li>
          <li>Realizar pagamentos de facilitação para agilizar ou garantir a execução de ações de rotina.</li>
        </ul>
        
        <h2>Canal de Denúncias</h2>
        <p>Disponibilizamos um canal confidencial para denúncias de violações deste Código de Ética. Garantimos que não haverá qualquer forma de retaliação contra quem, de boa-fé, reportar violações ou suspeitas de violações.</p>
        
        <h2>Consequências de Violações</h2>
        <p>As violações deste Código de Ética serão analisadas caso a caso e poderão resultar em medidas disciplinares, incluindo advertência, suspensão ou demissão, além das possíveis consequências legais.</p>
        
        <h2>Compromisso da Liderança</h2>
        <p>A liderança da ness. tem o dever de:</p>
        <ul>
          <li>Agir como exemplo no cumprimento deste Código de Ética.</li>
          <li>Assegurar que os colaboradores conheçam e cumpram este Código.</li>
          <li>Promover um ambiente onde as pessoas se sintam confortáveis para relatar preocupações éticas.</li>
          <li>Tomar medidas adequadas quando informados sobre possíveis violações.</li>
        </ul>
        
        <p>Este Código de Ética é um documento vivo, que será regularmente revisado e atualizado para refletir a evolução das nossas práticas e dos desafios que enfrentamos.</p>
      </div>
    `
  };

  return (
    <>
      <SEOHead 
        title={`${content?.title || defaultContent.title} - ness.`}
        description="Conheça o Código de Ética da ness. e nossos princípios fundamentais para a condução de negócios responsáveis e éticos."
        canonicalUrl="/ethics"
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
