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
      <div className="hero-content ml-[65px] mr-[65px]">
        <h1 className="logo">
          <span className="brand-wordmark">
            <span className="word">ness</span>
            <span className="brand-dot">.</span>
          </span>
        </h1>
        <h2 className="hero-title">
          <span className="title-light">invisible strength</span>
          <br />
          <span className="title-accent">visible results</span>
        </h2>
        <p className="hero-subtitle mt-[20px] mb-[20px]">
          Experts in technological innovation, process automation, IT
          <br />
          infrastructure, cybersecurity, and software architecture.
        </p>
        {/* <a href="#servicos" className="btn btn-primary">Saiba Mais</a> */}
      </div>
    </section>
  );
}
