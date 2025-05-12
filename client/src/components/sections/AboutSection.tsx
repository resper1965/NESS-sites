import { useI18n } from '@/lib/i18n';

interface Value {
  title: string;
  description: string;
  icon: string;
}

interface AboutSectionProps {
  title: string;
  description: string;
  content: string;
  values: Value[];
  image: string;
}

export default function AboutSection({
  title,
  description,
  content,
  values,
  image
}: AboutSectionProps) {
  const { t } = useI18n();
  
  return (
    <section id="about" className="py-20 bg-neutral">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{title}</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-lg max-w-3xl mx-auto text-gray-700">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold text-primary mb-6">Nossa Missão e Valores</h3>
            <p className="text-gray-700 mb-6">
              {content}
            </p>
            
            <div className="space-y-4">
              {values.map((value, index) => (
                <div key={index} className="flex items-start">
                  <div className="mt-1 bg-accent rounded-full p-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-primary">{value.title}</h4>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <img 
              src={image} 
              alt={title} 
              className="rounded-lg shadow-lg w-full h-auto" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
