import { Link } from 'wouter';
import { useI18n } from '@/lib/i18n';

interface ModularService {
  id: string;
  name: string;
  description: string;
  url: string;
}

interface ServicesSectionProps {
  title?: string;
}

export default function ServicesSection({ title }: ServicesSectionProps) {
  const { t, language } = useI18n();
  
  // Títulos traduzidos para a seção
  const titles = {
    pt: "serviços modulares",
    en: "modular services",
    es: "servicios modulares"
  };
  
  // Texto do botão traduzido
  const buttonText = {
    pt: "saiba mais",
    en: "learn more",
    es: "saber más"
  };
  
  // Descrições traduzidas
  const descriptions = {
    pt: {
      secops: "segurança integrada às operações com monitoramento contínuo.",
      infraops: "gestão moderna de infraestrutura com alta disponibilidade.",
      devarch: "fundamentos sólidos para desenvolvimento com arquitetura e...",
      autoops: "automação inteligente de processos com IA.",
      crisisops: "resposta imediata para incidentes e gestão de crises cibernéticas.",
      privacy: "gestão completa de privacidade para conformidade com LGPD/GDPR."
    },
    en: {
      secops: "integrated security operations with continuous monitoring.",
      infraops: "modern infrastructure management with high availability.",
      devarch: "solid foundations for development with architecture and...",
      autoops: "intelligent process automation with AI.",
      crisisops: "immediate response for incidents and cybernetic crisis management.",
      privacy: "complete privacy management for LGPD/GDPR compliance."
    },
    es: {
      secops: "seguridad integrada a las operaciones con monitoreo continuo.",
      infraops: "gestión moderna de infraestructura con alta disponibilidad.",
      devarch: "fundamentos sólidos para desarrollo con arquitectura y...",
      autoops: "automatización inteligente de procesos con IA.",
      crisisops: "respuesta inmediata para incidentes y gestión de crisis cibernéticas.",
      privacy: "gestión completa de privacidad para conformidad con LGPD/GDPR."
    }
  };
  
  // Lista de serviços modulares
  const modularServices: ModularService[] = [
    {
      id: "secops",
      name: "n.SecOps",
      description: descriptions[language].secops,
      url: "/services/secops"
    },
    {
      id: "infraops",
      name: "n.InfraOps",
      description: descriptions[language].infraops,
      url: "/services/infraops"
    },
    {
      id: "devarch",
      name: "n.DevArch",
      description: descriptions[language].devarch,
      url: "/services/devarch"
    },
    {
      id: "autoops",
      name: "n.AutoOps",
      description: descriptions[language].autoops,
      url: "/services/autoops"
    },
    {
      id: "crisisops",
      name: "n.CrisisOps",
      description: descriptions[language].crisisops,
      url: "/services/crisisops"
    },
    {
      id: "privacy",
      name: "n.Privacy",
      description: descriptions[language].privacy,
      url: "/services/privacy"
    }
  ];
  
  // Função para formatar o título do serviço com apenas o ponto azul
  const formatServiceName = (name: string) => {
    if (name.startsWith('n.')) {
      return (
        <span className="font-['Montserrat'] font-medium text-lg text-gray-800">
          n<span className="text-[#00ade0]">.</span>{name.substring(2)}
        </span>
      );
    }
    return <span className="font-['Montserrat'] font-medium text-lg text-gray-800">{name}</span>;
  };
  
  return (
    <section id="services" className="py-20 bg-[#f9f9f9]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-['Montserrat'] font-normal text-gray-800 mb-8 lowercase">{title || titles[language]}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modularServices.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
            >
              <h3 className="mb-4">
                {formatServiceName(service.name)}
              </h3>
              <p className="text-gray-600 text-sm mb-6 lowercase">
                {service.description}
              </p>
              <div className="text-center">
                <Link 
                  href={service.url} 
                  className="text-gray-600 hover:text-[#00ade0] border border-gray-300 hover:border-[#00ade0] py-2 px-4 text-sm font-normal transition-colors duration-300 inline-block lowercase rounded-sm"
                >
                  {buttonText[language]}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
