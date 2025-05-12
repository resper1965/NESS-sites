import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/common/SEOHead';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Content, Service } from '@shared/schema';

interface ServiceItemProps {
  service: Service;
  isEven: boolean;
}

function ServiceItem({ service, isEven }: ServiceItemProps) {
  return (
    <div id={service.id} className="py-16 border-b border-gray-200">
      <div className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
        <div className="w-full md:w-1/2">
          <img 
            src={service.image} 
            alt={service.title} 
            className="rounded-lg shadow-lg w-full h-auto" 
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-primary mb-6">{service.title}</h2>
          <div className="prose prose-lg">
            <div dangerouslySetInnerHTML={{ __html: service.content }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const { t, language } = useI18n();
  
  // Fetch services content
  const { data: content, isLoading } = useQuery<Content>({
    queryKey: [`/api/content/services?lang=${language}`],
  });

  // Fetch services list
  const { data: services } = useQuery<Service[]>({
    queryKey: [`/api/services?lang=${language}`],
  });

  const defaultServices: Service[] = [
    {
      id: 'security',
      title: 'Segurança da Informação',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
      summary: 'Proteja seus dados e sistemas com nossas soluções avançadas de segurança digital',
      content: `
        <p>Oferecemos um conjunto completo de serviços de segurança da informação para proteger sua empresa contra ameaças digitais e garantir a conformidade com regulamentações:</p>
        <ul>
          <li>Avaliação de vulnerabilidades e testes de penetração</li>
          <li>Implementação de frameworks de segurança (ISO 27001, NIST)</li>
          <li>Monitoramento contínuo e resposta a incidentes</li>
          <li>Gestão de identidade e acesso</li>
          <li>Segurança em nuvem e proteção de dados</li>
          <li>Compliance com LGPD, GDPR e outras regulamentações</li>
        </ul>
        <p>Nossa abordagem proativa ajuda a identificar e mitigar riscos antes que se tornem problemas, protegendo seus ativos mais valiosos.</p>
      `
    },
    {
      id: 'digital',
      title: 'Transformação Digital',
      image: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
      summary: 'Modernize seus processos de negócio com tecnologias cloud-first e automação inteligente',
      content: `
        <p>Ajudamos empresas a modernizarem suas operações através de estratégias digitais bem planejadas:</p>
        <ul>
          <li>Consultoria em estratégia digital</li>
          <li>Migração para cloud e implementação de arquiteturas modernas</li>
          <li>Modernização de aplicações legadas</li>
          <li>Automação de processos de negócio</li>
          <li>Integração de sistemas e APIs</li>
          <li>Desenvolvimento de plataformas digitais</li>
        </ul>
        <p>Nossa metodologia combina experiência técnica com visão de negócios para garantir transformações digitais bem-sucedidas e sustentáveis.</p>
      `
    },
    {
      id: 'analytics',
      title: 'Análise de Dados',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
      summary: 'Transforme dados em insights estratégicos com nossas soluções de business intelligence',
      content: `
        <p>Extraia valor real dos seus dados com nossas soluções avançadas de analytics:</p>
        <ul>
          <li>Estratégia de dados e governança</li>
          <li>Implementação de data lakes e data warehouses</li>
          <li>Business intelligence e dashboards personalizados</li>
          <li>Analytics preditivo e modelos de machine learning</li>
          <li>Big data e processamento em tempo real</li>
          <li>Visualização de dados e storytelling</li>
        </ul>
        <p>Nossos especialistas em dados ajudam a transformar informações em insights acionáveis que impulsionam resultados de negócios mensuráveis.</p>
      `
    }
  ];

  return (
    <>
      <SEOHead 
        title={`${t('services.title')} - CorpTech`}
        description="Conheça nossas soluções em segurança da informação, transformação digital e análise de dados para impulsionar seu negócio."
        canonicalUrl="/services"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-primary text-white">
          <div className="container mx-auto px-4 pt-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('services.title')}</h1>
              <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
              <p className="text-xl max-w-3xl mx-auto">
                {content?.description || 'Oferecemos soluções completas para empresas que buscam transformação digital, segurança da informação e eficiência operacional.'}
              </p>
            </div>
          </div>
        </section>
        
        {/* Services List */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="animate-pulse space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="py-16 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="w-full md:w-1/2 h-80 bg-gray-200 rounded-lg"></div>
                      <div className="w-full md:w-1/2">
                        <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>
                        <div className="space-y-4">
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {(services || defaultServices).map((service, index) => (
                  <ServiceItem 
                    key={service.id} 
                    service={service} 
                    isEven={index % 2 === 1} 
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
