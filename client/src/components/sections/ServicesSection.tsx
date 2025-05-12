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
      infraops: "infraestrutura resiliente com monitoramento 24x7 e resposta imediata",
      secops: "segurança modular com detecção, resposta e governança contínuas",
      devarch: "desenvolvimento seguro com práticas de SDLC desde o design",
      autoops: "automação inteligente para processos operacionais eficientes",
      crisisops: "gestão de crises e incidentes com estrutura, agilidade e rastreabilidade",
      privacy: "plataforma SaaS para gestão de privacidade e conformidade com LGPD, GDPR e afins"
    },
    en: {
      infraops: "resilient infrastructure with 24x7 monitoring and immediate response",
      secops: "modular security with continuous detection, response, and governance",
      devarch: "secure development with SDLC practices from design to deployment",
      autoops: "intelligent automation for efficient operational processes",
      crisisops: "crisis and incident management with structure, agility, and traceability",
      privacy: "SaaS platform for privacy management and compliance with GDPR, CCPA, and similar regulations"
    },
    es: {
      infraops: "infraestructura resiliente con monitoreo 24x7 y respuesta inmediata",
      secops: "seguridad modular con detección, respuesta y gobernanza continuas",
      devarch: "desarrollo seguro con prácticas de SDLC desde el diseño",
      autoops: "automatización inteligente para procesos operativos eficientes",
      crisisops: "gestión de crisis e incidentes con estructura, agilidad y trazabilidad",
      privacy: "plataforma SaaS para gestión de privacidad y cumplimiento con LGPD, GDPR y similares"
    }
  };
  
  // Lista de serviços modulares
  const modularServices: ModularService[] = [
    {
      id: "infraops",
      name: "n.InfraOps",
      description: descriptions[language].infraops,
      url: "/services/infraops"
    },
    {
      id: "secops",
      name: "n.SecOps",
      description: descriptions[language].secops,
      url: "/services/secops"
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
  
  // Função para formatar o título do serviço com o ponto colorido
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
