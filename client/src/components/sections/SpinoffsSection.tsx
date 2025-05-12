import { Link } from 'wouter';
import { useI18n } from '@/lib/i18n';

interface SpinoffsSectionProps {
  title?: string;
}

export default function SpinoffsSection({ title = "divisões especializadas" }: SpinoffsSectionProps) {
  const { t } = useI18n();
  
  // Divisões especializadas fixas
  const spinoffs = [
    {
      id: "trustness",
      name: "trustness",
      description: "soluções especializadas em segurança e privacidade, protegendo dados sensíveis e garantindo conformidade com regulamentações",
      url: "/spinoffs/trustness"
    },
    {
      id: "forense",
      name: "forense.io",
      description: "serviços avançados de resposta a incidentes, perícia digital e investigação forense para identificar e remediar violações de segurança",
      url: "/spinoffs/forense"
    }
  ];
  
  return (
    <section id="spinoffs" className="py-20 bg-[#2f3e4d] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-['Montserrat'] font-normal mb-8 lowercase">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {spinoffs.map((spinoff) => (
            <div 
              key={spinoff.id} 
              className="bg-[#2c2c34] border border-[#3a3a45] rounded p-8 shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              <h3 className="text-xl font-['Montserrat'] font-medium mb-4 lowercase">
                {spinoff.name}
              </h3>
              <p className="text-gray-300 text-sm mb-6 lowercase">
                {spinoff.description}
              </p>
              <Link 
                href={spinoff.url} 
                className="text-white hover:text-[#00ade0] border border-white hover:border-[#00ade0] py-2 px-4 text-sm font-normal transition-colors duration-300 inline-block lowercase"
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