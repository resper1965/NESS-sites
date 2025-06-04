import { getOptimizedImagePath } from '@/lib/image-utils';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  title: string | React.ReactNode;
  subtitle: string;
  backgroundImage?: string;
}

export default function HeroSection({
  title,
  subtitle,
  backgroundImage
}: HeroSectionProps) {
  const [optimizedImage, setOptimizedImage] = useState<string>(backgroundImage || '');
  
  // Otimiza a imagem de fundo após o componente ser montado
  useEffect(() => {
    if (backgroundImage) {
      setOptimizedImage(getOptimizedImagePath(backgroundImage));
    }
  }, [backgroundImage]);
  
  return (
    <section
      className="hero"
      style={{
        backgroundImage: optimizedImage ? `url(${optimizedImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="logo">
          <span className="brand-wordmark">
            <span className="word">ness</span><span className="brand-dot">.</span>
          </span>
        </h1>
        <h2 className="hero-title">
          {typeof title === 'string' ? (
            <>
              <span className="title-light">{title.split('\n')[0]}</span>
              <br />
              <span className="title-accent">{title.split('\n')[1]}</span>
            </>
          ) : (
            title
          )}
        </h2>
        <p className="hero-subtitle">{subtitle}</p>
      </div>
    </section>
  );
}
