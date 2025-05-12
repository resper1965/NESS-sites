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
      {/* Grid pattern */}
      <div className="grid-panel">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid-pattern-main" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#00ade0" strokeWidth="0.1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-pattern-main)" />
        </svg>
      </div>
      
      {/* 3D cubes */}
      <div className="cube-wrapper">
        <div className="cube">
          <div className="cube-face front"></div>
          <div className="cube-face back"></div>
          <div className="cube-face right"></div>
          <div className="cube-face left"></div>
          <div className="cube-face top"></div>
          <div className="cube-face bottom"></div>
        </div>
        <div className="cube">
          <div className="cube-face front"></div>
          <div className="cube-face back"></div>
          <div className="cube-face right"></div>
          <div className="cube-face left"></div>
          <div className="cube-face top"></div>
          <div className="cube-face bottom"></div>
        </div>
        <div className="cube">
          <div className="cube-face front"></div>
          <div className="cube-face back"></div>
          <div className="cube-face right"></div>
          <div className="cube-face left"></div>
          <div className="cube-face top"></div>
          <div className="cube-face bottom"></div>
        </div>
      </div>
      
      {/* Polygons/Shapes */}
      <div className="polygons">
        <div className="polygon"></div>
        <div className="polygon"></div>
        <div className="polygon"></div>
        <div className="polygon"></div>
      </div>
      
      {/* Data streams */}
      <div className="data-streams">
        <div className="stream"></div>
        <div className="stream"></div>
        <div className="stream"></div>
        <div className="stream"></div>
      </div>
      
      {/* Node points */}
      <div className="node-points">
        <div className="node-point"></div>
        <div className="node-point"></div>
        <div className="node-point"></div>
        <div className="node-point"></div>
        <div className="node-point"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="hero-main-content">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-['Montserrat'] font-normal mb-3">
            ness<span className="text-[#00ade0]">.</span>
          </h1>
          <p className="text-3xl md:text-4xl lg:text-5xl font-['Montserrat'] font-normal mb-6 lowercase">
            {title}
          </p>
        
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
            <Link href={ctaUrl1} className="bg-[#00ade0] hover:bg-[#0095c4] text-white py-3 px-8 font-normal transition duration-300 inline-block lowercase rounded-sm">
              {ctaText1}
            </Link>
            <Link href={ctaUrl2} className="bg-transparent border border-[#00ade0] text-white hover:text-[#00ade0] py-3 px-8 font-normal transition duration-300 inline-block lowercase rounded-sm">
              {ctaText2}
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="scroll-down">↓</div>
      </div>
    </section>
  );
}
