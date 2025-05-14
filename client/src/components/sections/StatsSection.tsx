import { useI18n } from '@/lib/i18n';
import { getOptimizedImagePath } from '@/lib/image-utils';
import { useEffect, useState } from 'react';

interface Stat {
  value: string;
  label: string;
}

interface StatsSectionProps {
  backgroundImage: string;
  stats: Stat[];
}

export default function StatsSection({
  backgroundImage,
  stats
}: StatsSectionProps) {
  const { t } = useI18n();
  const [optimizedImage, setOptimizedImage] = useState<string>(backgroundImage);
  
  // Otimiza a imagem de fundo após o componente ser montado
  useEffect(() => {
    setOptimizedImage(getOptimizedImagePath(backgroundImage));
  }, [backgroundImage]);
  
  return (
    <section className="relative py-16 text-white">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={optimizedImage} 
          alt="Stats background" 
          className="w-full h-full object-cover" 
          loading="lazy" // Carrega a imagem apenas quando necessário
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(18,18,18,0.7)] to-[rgba(18,18,18,0.8)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
              <p className="text-white opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
