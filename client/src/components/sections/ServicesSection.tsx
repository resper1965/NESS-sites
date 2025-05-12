import { Link } from 'wouter';
import { useI18n } from '@/lib/i18n';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  url: string;
}

interface ServicesSectionProps {
  title: string;
  description: string;
  services: Service[];
}

export default function ServicesSection({
  title,
  description,
  services
}: ServicesSectionProps) {
  const { t } = useI18n();
  
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{title}</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-lg max-w-3xl mx-auto text-gray-700">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-neutral rounded-lg p-8 shadow-md transition duration-300 hover:shadow-lg">
              <div className="bg-primary inline-block p-3 rounded-lg mb-6 text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon}></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">{service.title}</h3>
              <p className="text-gray-700 mb-6">
                {service.description}
              </p>
              <Link href={service.url} className="text-accent hover:text-accent-dark font-medium inline-flex items-center">
                {t('services.learnMore')} 
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
