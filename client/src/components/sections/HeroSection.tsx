import { Link } from 'wouter';
import { useI18n } from '@/lib/i18n';
import { getOptimizedImagePath } from '@/lib/image-utils';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  title: string | React.ReactNode;
  subtitle: string;
  ctaText1: string;
  ctaUrl1: string;
  ctaText2?: string;
  ctaUrl2?: string;
  backgroundImage: string;
}

export default function HeroSection({
  title,
  subtitle,
  ctaText1,
  ctaUrl1,
  ctaText2,
  ctaUrl2,
  backgroundImage
}: HeroSectionProps) {
  const { t } = useI18n();
  const [optimizedImage, setOptimizedImage] = useState<string>(backgroundImage);
  
  // Otimiza a imagem de fundo após o componente ser montado
  useEffect(() => {
    setOptimizedImage(getOptimizedImagePath(backgroundImage));
  }, [backgroundImage]);
  
  return (
    <section className="intro relative flex items-center overflow-hidden bg-hero-gradient" style={{ minHeight: '60vh' }}>
      <div className="hero-vignette-right" />

      {/* Content */}
      <div className="container mx-auto px-4 z-10 flex items-center h-full">
        <div className="hero-main-content">
          <h1 className="text-[32px] font-['Montserrat'] font-medium mt-12 mb-6">
            <span className="text-white">ness</span><span className="text-[#00ade0]">.</span>
          </h1>
          <div className="text-[48px] font-['Montserrat'] font-normal text-white">
            {title}
          </div>

          <p className="mt-6 text-base leading-6 text-[#F5F5F5] font-['Montserrat']">
            {subtitle}
          </p>

          {ctaText1 && ctaUrl1 && (
            <div className="flex flex-col sm:flex-row justify-start space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
              <Link href={ctaUrl1} className="bg-[#00ade0] hover:bg-[#0095c4] text-white py-3 px-8 font-normal transition duration-300 inline-block lowercase rounded-sm font-['Montserrat']">
                {ctaText1}
              </Link>
              {ctaText2 && ctaUrl2 && (
                <Link href={ctaUrl2} className="bg-transparent border border-[#00ade0] text-white hover:text-[#00ade0] py-3 px-8 font-normal transition duration-300 inline-block lowercase rounded-sm font-['Montserrat']">
                  {ctaText2}
                </Link>
              )}
            </div>
          )}
        </div>


      </div>
    </section>
  );
}
