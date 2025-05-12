import { Link } from 'wouter';
import { useI18n } from '@/lib/i18n';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText1: string;
  ctaUrl1: string;
  ctaText2: string;
  ctaUrl2: string;
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
  
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage} 
          alt="Hero background" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(18,18,18,0.2)] to-[rgba(18,18,18,0.5)]"></div>
      </div>
      
      {/* Diagonal cut at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-l from-[#2c2c34] to-[#1f1f28] clip-path-polygon"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="flex flex-col">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-['Montserrat'] font-normal text-white mb-3">
            ness<span className="text-[#00ade0]">.</span>
          </h1>
          <p className="text-3xl md:text-4xl lg:text-5xl font-['Montserrat'] font-normal text-white mb-6 lowercase">
            {title}
          </p>
        </div>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
          <Link href={ctaUrl1} className="bg-transparent border border-white hover:bg-white/10 text-white py-3 px-8 font-normal transition duration-300 inline-block lowercase">
            [ {ctaText1} ]
          </Link>
          <Link href={ctaUrl2} className="bg-transparent border border-white hover:bg-white/10 text-white py-3 px-8 font-normal transition duration-300 inline-block lowercase">
            [ {ctaText2} ]
          </Link>
        </div>
        <div className="mt-12">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto animate-bounce">
            <path d="M10 15L3 8H17L10 15Z" fill="white"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
