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

export default function ServicesSection({ title = "serviços modulares" }: ServicesSectionProps) {
  const { t, language } = useI18n();
  
  // Lista de serviços modulares
  const modularServices: ModularService[] = [
    {
      id: "infraops",
      name: "n.InfraOps",
      description: "infraestrutura resiliente com monitoramento 24x7 e resposta imediata",
      url: "/services/infraops"
    },
    {
      id: "secops",
      name: "n.SecOps",
      description: "segurança modular com detecção, resposta e governança contínuas",
      url: "/services/secops"
    },
    {
      id: "devarch",
      name: "n.DevArch",
      description: "desenvolvimento seguro com práticas de SDLC desde o design",
      url: "/services/devarch"
    },
    {
      id: "autoops",
      name: "n.AutoOps",
      description: "automação inteligente para processos operacionais eficientes",
      url: "/services/autoops"
    },
    {
      id: "crisisops",
      name: "n.CrisisOps",
      description: "gestão de crises e incidentes com estrutura, agilidade e rastreabilidade",
      url: "/services/crisisops"
    },
    {
      id: "privacy",
      name: "n.Privacy",
      description: "conformidade regulatória de privacidade com ROPA, DPIA e atendimento a titulares",
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
          <h2 className="text-3xl font-['Montserrat'] font-normal text-gray-800 mb-8 lowercase">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modularServices.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="mb-4">
                {formatServiceName(service.name)}
              </h3>
              <p className="text-gray-600 text-sm mb-6 lowercase">
                {service.description}
              </p>
              <Link 
                href={service.url} 
                className="text-gray-600 hover:text-[#00ade0] border border-gray-300 hover:border-[#00ade0] py-2 px-4 text-sm font-normal transition-colors duration-300 inline-block lowercase"
              >
                saiba mais
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
