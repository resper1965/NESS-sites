import { Link } from 'wouter';
import { useI18n } from '@/lib/i18n';
import { ExternalLink } from 'lucide-react';

interface SpinoffsSectionProps {
  title?: string;
}

export default function SpinoffsSection({ title }: SpinoffsSectionProps) {
  const { t, language } = useI18n();
  
  // Títulos traduzidos para a seção
  const titles = {
    pt: "divisões especializadas",
    en: "specialized divisions",
    es: "divisiones especializadas"
  };
  
  // Texto do botão traduzido
  const buttonText = {
    pt: "saiba mais",
    en: "learn more",
    es: "saber más"
  };
  
  // Descrições traduzidas para as divisões
  const descriptions = {
    pt: {
      trustness: "consultoria estratégica em privacidade, segurança da informação e compliance. foco em programas regulatórios, frameworks internacionais e gestão contínua",
      forense: "unidade especializada em resposta a incidentes, perícia digital e investigação forense. atuação técnica em ambientes corporativos e suporte jurídico"
    },
    en: {
      trustness: "strategic consulting in privacy, information security and compliance. focus on regulatory programs, international frameworks and continuous management",
      forense: "specialized unit in incident response, digital forensics and forensic investigation. technical expertise in corporate environments and legal support"
    },
    es: {
      trustness: "consultoría estratégica en privacidad, seguridad de la información y compliance. enfoque en programas regulatorios, frameworks internacionales y gestión continua",
      forense: "unidad especializada en respuesta a incidentes, peritaje digital e investigación forense. actuación técnica en entornos corporativos y soporte jurídico"
    }
  };
  
  // Divisões especializadas fixas
  const spinoffs = [
    {
      id: "trustness",
      name: "trustness.",
      description: descriptions[language].trustness,
      url: "https://trustness.com.br",
      isExternal: true
    },
    {
      id: "forense",
      name: "forense.io",
      description: descriptions[language].forense,
      url: "https://forense.io",
      isExternal: true
    }
  ];
  
  // Função para formatar nome com o ponto em azul
  const formatName = (name: string) => {
    if (name.includes('.')) {
      const parts = name.split('.');
      return (
        <span className="font-['Montserrat'] font-medium text-xl">
          {parts[0]}
          <span className="text-[#00ade0]">.</span>
          {parts.length > 1 ? parts[1] : ''}
        </span>
      );
    }
    return <span className="font-['Montserrat'] font-medium text-xl">{name}</span>;
  };
  
  return (
    <section id="spinoffs" className="py-20 bg-[#2f3e4d] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-['Montserrat'] font-normal mb-8 lowercase">{title || titles[language]}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {spinoffs.map((spinoff) => (
            <div 
              key={spinoff.id} 
              className="bg-[#2c2c34] border border-[#3a3a45] rounded p-8 shadow-md transition-shadow duration-300 hover:shadow-lg text-center"
            >
              <h3 className="mb-4 lowercase">
                {formatName(spinoff.name)}
              </h3>
              <p className="text-gray-300 text-sm mb-6 lowercase">
                {spinoff.description}
              </p>
              <div className="text-center">
                {spinoff.isExternal ? (
                  <a 
                    href={spinoff.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#00ade0] border border-white hover:border-[#00ade0] py-2 px-4 text-sm font-normal transition-colors duration-300 inline-flex items-center lowercase rounded-sm"
                  >
                    {buttonText[language]}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                ) : (
                  <Link 
                    href={spinoff.url} 
                    className="text-white hover:text-[#00ade0] border border-white hover:border-[#00ade0] py-2 px-4 text-sm font-normal transition-colors duration-300 inline-block lowercase rounded-sm"
                  >
                    {buttonText[language]}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}