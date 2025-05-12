import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/common/SEOHead';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import StatsSection from '@/components/sections/StatsSection';
import JobsSection from '@/components/sections/JobsSection';
import NewsSection from '@/components/sections/NewsSection';
import ContactSection from '@/components/sections/ContactSection';
import { Content, Job, News } from '@shared/schema';

export default function HomePage() {
  const { t, language } = useI18n();
  
  // Fetch homepage content
  const { data: content, isLoading: contentLoading } = useQuery<Content>({
    queryKey: [`/api/content/home?lang=${language}`],
  });

  // Fetch latest jobs
  const { data: jobs, isLoading: jobsLoading } = useQuery<Job[]>({
    queryKey: [`/api/jobs/featured?lang=${language}`],
  });

  // Fetch latest news
  const { data: news, isLoading: newsLoading } = useQuery<News[]>({
    queryKey: [`/api/news/latest?lang=${language}`],
  });

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CorpTech",
    "url": "https://www.empresainstitucional.com",
    "logo": "https://www.empresainstitucional.com/logo.png",
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
      "https://www.linkedin.com/company/corptech",
      "https://www.facebook.com/corptech",
      "https://www.twitter.com/corptech",
      "https://www.instagram.com/corptech"
    ]
  };

  // Default values in case the data is still loading
  const heroProps = content?.hero || {
    title: t('home.hero.title'),
    subtitle: t('home.hero.subtitle'),
    backgroundImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080'
  };

  const aboutProps = content?.about || {
    title: t('about.title'),
    description: 'Somos uma empresa de tecnologia com mais de 15 anos de experiência no mercado, oferecendo soluções inovadoras e sustentáveis.',
    content: 'Desenvolvemos tecnologias que transformam a maneira como as empresas operam, melhorando a eficiência e garantindo a segurança dos dados em todas as operações.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    values: [
      {
        title: 'Inovação constante',
        description: 'Buscamos sempre as melhores soluções tecnológicas para nossos clientes.',
        icon: 'check'
      },
      {
        title: 'Segurança em primeiro lugar',
        description: 'Priorizamos a proteção de dados e a segurança digital em todos os projetos.',
        icon: 'check'
      },
      {
        title: 'Compromisso com resultados',
        description: 'Trabalhamos para entregar soluções que geram resultados mensuráveis.',
        icon: 'check'
      }
    ]
  };

  const servicesProps = content?.services || {
    title: t('services.title'),
    description: 'Oferecemos soluções completas para empresas que buscam transformação digital, segurança da informação e eficiência operacional.',
    services: [
      {
        id: 'security',
        title: 'Segurança da Informação',
        description: 'Proteja seus dados e sistemas com nossas soluções avançadas de segurança digital, incluindo prevenção contra ataques cibernéticos e gestão de vulnerabilidades.',
        icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
        url: '/services#security'
      },
      {
        id: 'digital',
        title: 'Transformação Digital',
        description: 'Modernize seus processos de negócio com tecnologias cloud-first, automação inteligente e integração de sistemas para aumentar a eficiência operacional.',
        icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
        url: '/services#digital'
      },
      {
        id: 'analytics',
        title: 'Análise de Dados',
        description: 'Transforme dados em insights estratégicos com nossas soluções de business intelligence, analytics avançado e desenvolvimento de dashboards personalizados.',
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        url: '/services#analytics'
      }
    ]
  };

  const statsProps = {
    backgroundImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600',
    stats: [
      { value: '15+', label: 'Anos de experiência' },
      { value: '200+', label: 'Clientes satisfeitos' },
      { value: '50+', label: 'Especialistas' },
      { value: '98%', label: 'Taxa de renovação' }
    ]
  };

  // Default empty states for jobs and news
  const jobsContent = {
    title: t('jobs.title'),
    description: 'Junte-se à nossa equipe de especialistas e construa uma carreira de sucesso em tecnologia.',
    jobs: jobs || [],
    viewAllLink: '/jobs'
  };

  const newsContent = {
    title: t('news.title'),
    description: 'Fique por dentro das novidades sobre nossa empresa e o mercado de tecnologia.',
    news: news || [],
    viewAllLink: '/news'
  };

  return (
    <>
      <SEOHead 
        title="CorpTech - Soluções empresariais inovadoras"
        description="Oferecemos soluções empresariais de alta qualidade com foco em inovação, segurança e resultados sustentáveis."
        structuredData={structuredData}
      />
      
      <Navbar />
      
      <main>
        <HeroSection 
          title={heroProps.title}
          subtitle={heroProps.subtitle}
          ctaText1={t('home.hero.cta1')}
          ctaUrl1="#services"
          ctaText2={t('home.hero.cta2')}
          ctaUrl2="#contact"
          backgroundImage={heroProps.backgroundImage}
        />
        
        <AboutSection 
          title={aboutProps.title}
          description={aboutProps.description}
          content={aboutProps.content}
          values={aboutProps.values}
          image={aboutProps.image}
        />
        
        <ServicesSection 
          title={servicesProps.title}
          description={servicesProps.description}
          services={servicesProps.services}
        />
        
        <StatsSection 
          backgroundImage={statsProps.backgroundImage}
          stats={statsProps.stats}
        />
        
        {!jobsLoading && jobs?.length > 0 && (
          <JobsSection 
            title={jobsContent.title}
            description={jobsContent.description}
            jobs={jobsContent.jobs}
            viewAllLink={jobsContent.viewAllLink}
          />
        )}
        
        {!newsLoading && news?.length > 0 && (
          <NewsSection 
            title={newsContent.title}
            description={newsContent.description}
            news={newsContent.news}
            viewAllLink={newsContent.viewAllLink}
          />
        )}
        
        <ContactSection />
      </main>
      
      <Footer />
    </>
  );
}
