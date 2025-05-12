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

  // Default values in case the data is still loading
  const heroProps = content?.hero || {
    title: "Transformando o mundo através de tecnologia",
    subtitle: "Somos um grande laboratório de tecnologia e processos focado em casos do mundo real. Uma empresa essencialmente orientada à inovar e transformar para resolver problemas e suportar transformações de diversos setores",
    backgroundImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080'
  };

  const servicesProps = content?.services || {
    title: "Nossos Serviços",
    description: 'Transformamos operações críticas em vantagem estratégica para sua empresa através de serviços especializados em segurança e tecnologia.',
    services: [
      {
        id: 'infraops',
        title: 'n.InfraOps',
        description: 'Serviços de infraestrutura de TI que garantem disponibilidade, escalabilidade e segurança para suas operações críticas, com monitoramento 24x7 e resposta imediata a incidentes.',
        icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
        url: '/services#infraops'
      },
      {
        id: 'secops',
        title: 'n.SecOps',
        description: 'Operações de segurança integradas que protegem seus ativos digitais contra ameaças cibernéticas, incluindo monitoramento contínuo, detecção e resposta a incidentes.',
        icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
        url: '/services#secops'
      },
      {
        id: 'devarch',
        title: 'n.DevArch',
        description: 'Desenvolvimento e arquitetura de soluções tecnológicas sob medida, com foco em segurança desde o design, seguindo práticas de DevSecOps e arquitetura zero-trust.',
        icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
        url: '/services#devarch'
      },
      {
        id: 'autoops',
        title: 'n.AutoOps',
        description: 'Automação de processos operacionais que aumentam a eficiência e reduzem erros humanos em ambientes críticos, com integração de ferramentas e fluxos de trabalho inteligentes.',
        icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
        url: '/services#autoops'
      },
      {
        id: 'crisisops',
        title: 'n.CrisisOps',
        description: 'Gerenciamento de crises e resposta a incidentes críticos, com equipes especializadas disponíveis 24x7 para mitigar impactos e garantir a continuidade dos negócios.',
        icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
        url: '/services#crisisops'
      }
    ]
  };

  const spinoffsProps = {
    title: 'Nossas Divisões Especializadas',
    description: 'Conheça nossas unidades de negócio focadas em áreas específicas de segurança e tecnologia.',
    spinoffs: [
      {
        id: 'trustness',
        title: 'trustness',
        description: 'Soluções especializadas em segurança e privacidade, protegendo dados sensíveis e garantindo conformidade com regulamentações como LGPD e GDPR.',
        logo: '',
        url: '/spinoffs/trustness',
        bgColor: 'bg-gray-900',
        textColor: 'text-white'
      },
      {
        id: 'forense',
        title: 'forense.io',
        description: 'Serviços avançados de resposta a incidentes, perícia digital e investigação forense para identificar, conter e remediar violações de segurança.',
        logo: '',
        url: '/spinoffs/forense',
        bgColor: 'bg-primary',
        textColor: 'text-white'
      }
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
          title={heroProps.title}
          subtitle={heroProps.subtitle}
          ctaText1="Conheça nossos serviços"
          ctaUrl1="#services"
          ctaText2="Entre em contato"
          ctaUrl2="/contact"
          backgroundImage={heroProps.backgroundImage}
        />
        
        <ServicesSection 
          title={servicesProps.title}
          description={servicesProps.description}
          services={servicesProps.services}
        />
        
        <SpinoffsSection
          title={spinoffsProps.title}
          description={spinoffsProps.description}
          spinoffs={spinoffsProps.spinoffs}
        />
        
        <StatsSection 
          backgroundImage={statsProps.backgroundImage}
          stats={statsProps.stats}
        />
      </main>
      
      <Footer />
    </>
  );
}
