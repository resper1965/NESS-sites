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
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage} 
          alt="Hero background" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(18,18,18,0.1)] to-[rgba(18,18,18,0.3)]"></div>
      </div>
      {/* Overlay para garantir boa legibilidade do texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(18,18,18,0.2)] to-[rgba(18,18,18,0.4)]"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 flex justify-center items-center h-full">
        <div className="hero-main-content text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-['Montserrat'] font-normal mb-6 text-white">
            ness<span className="text-[#00ade0]">.</span>
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl font-['Montserrat'] font-normal mb-4 text-white lowercase">
            {title}
          </p>
        
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto text-white font-['Montserrat'] lowercase">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
            <Link href={ctaUrl1} className="bg-[#00ade0] hover:bg-[#0095c4] text-white py-3 px-8 font-normal transition duration-300 inline-block lowercase rounded-sm font-['Montserrat']">
              {ctaText1}
            </Link>
            <Link href={ctaUrl2} className="bg-transparent border border-[#00ade0] text-white hover:text-[#00ade0] py-3 px-8 font-normal transition duration-300 inline-block lowercase rounded-sm font-['Montserrat']">
              {ctaText2}
            </Link>
          </div>
        </div>
        

      </div>
    </section>
  );
}
