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
      className="hero bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Padrão de Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzM0MTU1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      {/* Linhas Sutis */}
      <div className="absolute top-1/4 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-[#00ade0] to-transparent opacity-40"></div>
      <div className="absolute bottom-1/3 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-[#00ade0] to-transparent opacity-40"></div>
      <div className="absolute top-1/2 left-1/3 w-px h-24 bg-gradient-to-b from-transparent via-[#00ade0] to-transparent opacity-30"></div>
      <div className="absolute bottom-1/4 right-1/3 w-24 h-px bg-gradient-to-r from-transparent via-[#00ade0] to-transparent opacity-30"></div>
      <div className="hero-overlay"></div>
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center h-full text-center">
        {/* Logo */}
        <h1 className="font-['Montserrat'] !font-light !text-7xl md:!text-8xl !text-white mb-6 lowercase">
          ness<span className="text-[#00ade0]">.</span>
        </h1>
        
        {/* Tagline */}
        <h2 className="mb-8">
          <div className="font-light text-2xl md:text-3xl text-slate-300 mb-2">
            Invisible strength
          </div>
          <div className="font-normal text-2xl md:text-3xl text-[#00ade0]">
            visible results
          </div>
        </h2>
        
        {/* Parágrafo descritivo */}
        <p className="font-light text-lg text-slate-400 max-w-2xl leading-relaxed">
          Especialistas em inovação tecnológica, automação de processos, infraestrutura de TI,
          cibersegurança e arquitetura de software.
        </p>
      </div>
    </section>
  );
}
