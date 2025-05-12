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
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage} 
          alt="Hero background" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(18,18,18,0.7)] to-[rgba(18,18,18,0.8)]"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          <span className="text-white">{title.split(' ').slice(0, -1).join(' ')} </span>
          <span className="text-accent">{title.split(' ').slice(-1)}</span>
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href={ctaUrl1} className="bg-accent hover:bg-accent-dark text-white py-3 px-8 rounded-md font-medium transition duration-300 inline-block">
            {ctaText1}
          </Link>
          <Link href={ctaUrl2} className="bg-transparent border-2 border-white hover:bg-white hover:text-primary text-white py-3 px-8 rounded-md font-medium transition duration-300 inline-block">
            {ctaText2}
          </Link>
        </div>
      </div>
    </section>
  );
}
