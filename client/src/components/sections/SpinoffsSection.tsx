import { Link } from 'wouter';
import { useI18n } from '@/lib/i18n';

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
      trustness: "soluções especializadas em segurança e privacidade, protegendo dados sensíveis e garantindo conformidade com regulamentações",
      forense: "serviços avançados de resposta a incidentes, perícia digital e investigação forense para identificar e remediar violações de segurança"
    },
    en: {
      trustness: "specialized solutions in security and privacy, protecting sensitive data and ensuring compliance with regulations",
      forense: "advanced incident response services, digital forensics and forensic investigation to identify and remediate security breaches"
    },
    es: {
      trustness: "soluciones especializadas en seguridad y privacidad, protegiendo datos sensibles y garantizando el cumplimiento de las regulaciones",
      forense: "servicios avanzados de respuesta a incidentes, peritaje digital e investigación forense para identificar y remediar violaciones de seguridad"
    }
  };
  
  // Divisões especializadas fixas
  const spinoffs = [
    {
      id: "trustness",
      name: "trustness",
      description: descriptions[language].trustness,
      url: "/spinoffs/trustness"
    },
    {
      id: "forense",
      name: "forense.io",
      description: descriptions[language].forense,
      url: "/spinoffs/forense"
    }
  ];
  
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
              <h3 className="text-xl font-['Montserrat'] font-medium mb-4 lowercase">
                {spinoff.name}
              </h3>
              <p className="text-gray-300 text-sm mb-6 lowercase">
                {spinoff.description}
              </p>
              <div className="text-center">
                <Link 
                  href={spinoff.url} 
                  className="text-white hover:text-[#00ade0] border border-white hover:border-[#00ade0] py-2 px-4 text-sm font-normal transition-colors duration-300 inline-block lowercase rounded-sm"
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