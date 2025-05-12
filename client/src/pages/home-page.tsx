import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/common/SEOHead';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import SpinoffsSection from '@/components/sections/SpinoffsSection';
import StatsSection from '@/components/sections/StatsSection';
import { Content } from '@shared/schema';
import heroBackground from '../assets/hero-background.svg';

export default function HomePage() {
  const { t, language } = useI18n();
  
  // Fetch homepage content
  const { data: content, isLoading: contentLoading } = useQuery<Content>({
    queryKey: [`/api/content/home?lang=${language}`],
  });

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ness.",
    "foundingDate": "1991",
    "url": "https://www.ness.com.br",
    "logo": "https://www.ness.com.br/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-11-3456-7890",
      "contactType": "customer service",
      "availableLanguage": ["Portuguese", "English", "Spanish"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Paulista, 1000, Bela Vista",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "postalCode": "01310-100",
      "addressCountry": "BR"
    },
    "sameAs": [
      "https://www.linkedin.com/company/ness-security"
    ]
  };

  const statsProps = {
    backgroundImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600',
    stats: [
      { value: '30+', label: 'Anos de experiência' },
      { value: '200+', label: 'Clientes satisfeitos' },
      { value: '50+', label: 'Especialistas' },
      { value: '98%', label: 'Taxa de renovação' }
    ]
  };

  return (
    <>
      <SEOHead 
        title="ness. - Transformamos Operações Críticas em Vantagem Estratégica"
        description="Desde 1991 fornecendo soluções especializadas em segurança, infraestrutura e operações críticas para empresas que buscam vantagem competitiva através da tecnologia."
        structuredData={structuredData}
      />
      
      <Navbar />
      
      <main>
        <HeroSection 
          title={t('home.hero.title')}
          subtitle={t('home.hero.subtitle')}
          ctaText1={t('home.hero.cta1')}
          ctaUrl1="/services"
          ctaText2={t('home.hero.cta2')}
          ctaUrl2="/contact"
          backgroundImage={heroBackground}
        />
        
        <ServicesSection />
        
        <SpinoffsSection />
        
        <StatsSection 
          backgroundImage={statsProps.backgroundImage}
          stats={statsProps.stats}
        />
      </main>
      
      <Footer />
    </>
  );
}
