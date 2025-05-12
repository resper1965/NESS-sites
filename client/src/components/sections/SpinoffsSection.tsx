import { Link } from 'wouter';
import { useI18n } from '@/lib/i18n';

interface Spinoff {
  id: string;
  title: string;
  description: string;
  logo: string;
  url: string;
  bgColor: string;
  textColor: string;
}

interface SpinoffsSectionProps {
  title: string;
  description: string;
  spinoffs: Spinoff[];
}

export default function SpinoffsSection({
  title,
  description,
  spinoffs
}: SpinoffsSectionProps) {
  const { t } = useI18n();
  
  return (
    <section id="spinoffs" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{title}</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-lg max-w-3xl mx-auto text-gray-700">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {spinoffs.map((spinoff) => (
            <div 
              key={spinoff.id} 
              className={`p-10 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${spinoff.bgColor}`}
            >
              <div className="flex flex-col h-full">
                <h3 className={`text-2xl font-bold mb-4 ${spinoff.textColor}`}>
                  {spinoff.logo ? (
                    <img src={spinoff.logo} alt={spinoff.title} className="h-10 mb-4" />
                  ) : (
                    <span>{spinoff.title}</span>
                  )}
                </h3>
                <p className={`mb-6 flex-grow ${spinoff.textColor} opacity-90`}>
                  {spinoff.description}
                </p>
                <Link 
                  href={spinoff.url} 
                  className={`inline-flex items-center font-medium ${spinoff.textColor} hover:opacity-80`}
                >
                  {t('services.learnMore')} 
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}