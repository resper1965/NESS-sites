import { Language } from '@/lib/i18n';

const defaultContent: Record<Language, any> = {
    pt: {
      title: 'n.DevArch',
      description: 'fundamentos sólidos para desenvolvimento com arquitetura e IA',
      intro: 'o n.DevArch da ness cria bases sólidas para o desenvolvimento de software com foco em arquitetura moderna, integrando inteligência artificial para elevar a qualidade, eficiência e escalabilidade dos sistemas.',
      sections: [
        {
          title: 'arquitetura moderna',
          content: 'concepção de arquiteturas escaláveis e resilientes utilizando padrões como microserviços, event-driven e serverless, adaptadas às necessidades específicas de cada negócio.'
        },
        {
          title: 'infraestrutura como código',
          content: 'automação da configuração e provisionamento de ambientes, garantindo consistência e reprodutibilidade em todo o ciclo de desenvolvimento.'
        },
        {
          title: 'integração com IA',
          content: 'implementação de componentes de inteligência artificial para otimização de processos, tomada de decisões e automação avançada dentro dos sistemas desenvolvidos.'
        },
        {
          title: 'pipeline de entrega contínua',
          content: 'configuração de pipelines automatizados com integração, testes e entrega contínuas para garantir rapidez e confiabilidade nas atualizações de software.'
        }
      ],
      features: [
        {
          title: 'padrões de design',
          content: 'implementação de padrões consagrados e emergentes que garantem sistemas manuteníveis, flexíveis e facilmente adaptáveis a novas necessidades.'
        },
        {
          title: 'modernização de legacy',
          content: 'estratégias para modernizar gradualmente sistemas legados sem interrupções operacionais, incluindo abordagens como strangler pattern e refatoração incremental.'
        },
        {
          title: 'qualidade de código',
          content: 'práticas e ferramentas para garantir a qualidade e consistência do código, incluindo revisão automatizada, análise estática e cobertura de testes.'
        }
      ],
      benefits: [
        'redução do tempo de desenvolvimento',
        'maior adaptabilidade a mudanças',
        'integração nativa com IA',
        'escalabilidade garantida'
      ],
      cta: {
        title: 'precisa de uma base sólida para seus projetos de software?',
        button: 'vamos conversar'
      }
    },
    en: {
      title: 'n.DevArch',
      description: 'solid foundations for development with architecture and AI',
      intro: 'ness\'s n.DevArch creates solid foundations for software development focusing on modern architecture, integrating artificial intelligence to elevate the quality, efficiency, and scalability of systems.',
      sections: [
        {
          title: 'modern architecture',
          content: 'conception of scalable and resilient architectures using patterns such as microservices, event-driven, and serverless, adapted to the specific needs of each business.'
        },
        {
          title: 'infrastructure as code',
          content: 'automation of environment configuration and provisioning, ensuring consistency and reproducibility throughout the development cycle.'
        },
        {
          title: 'AI integration',
          content: 'implementation of artificial intelligence components for process optimization, decision making, and advanced automation within developed systems.'
        },
        {
          title: 'continuous delivery pipeline',
          content: 'configuration of automated pipelines with continuous integration, testing, and delivery to ensure speed and reliability in software updates.'
        }
      ],
      features: [
        {
          title: 'design patterns',
          content: 'implementation of established and emerging patterns that ensure systems are maintainable, flexible, and easily adaptable to new needs.'
        },
        {
          title: 'legacy modernization',
          content: 'strategies to gradually modernize legacy systems without operational interruptions, including approaches such as strangler pattern and incremental refactoring.'
        },
        {
          title: 'code quality',
          content: 'practices and tools to ensure code quality and consistency, including automated review, static analysis, and test coverage.'
        }
      ],
      benefits: [
        'reduced development time',
        'greater adaptability to changes',
        'native integration with AI',
        'guaranteed scalability'
      ],
      cta: {
        title: 'need a solid foundation for your software projects?',
        button: 'let\'s talk'
      }
    },
    es: {
      title: 'n.DevArch',
      description: 'fundamentos sólidos para desarrollo con arquitectura e IA',
      intro: 'el n.DevArch de ness crea bases sólidas para el desarrollo de software con enfoque en arquitectura moderna, integrando inteligencia artificial para elevar la calidad, eficiencia y escalabilidad de los sistemas.',
      sections: [
        {
          title: 'arquitectura moderna',
          content: 'concepción de arquitecturas escalables y resilientes utilizando patrones como microservicios, event-driven y serverless, adaptadas a las necesidades específicas de cada negocio.'
        },
        {
          title: 'infraestructura como código',
          content: 'automatización de la configuración y aprovisionamiento de entornos, garantizando consistencia y reproducibilidad en todo el ciclo de desarrollo.'
        },
        {
          title: 'integración con IA',
          content: 'implementación de componentes de inteligencia artificial para optimización de procesos, toma de decisiones y automatización avanzada dentro de los sistemas desarrollados.'
        },
        {
          title: 'pipeline de entrega continua',
          content: 'configuración de pipelines automatizados con integración, pruebas y entrega continuas para garantizar rapidez y confiabilidad en las actualizaciones de software.'
        }
      ],
      features: [
        {
          title: 'patrones de diseño',
          content: 'implementación de patrones consagrados y emergentes que garantizan sistemas mantenibles, flexibles y fácilmente adaptables a nuevas necesidades.'
        },
        {
          title: 'modernización de legacy',
          content: 'estrategias para modernizar gradualmente sistemas heredados sin interrupciones operacionales, incluyendo enfoques como strangler pattern y refactorización incremental.'
        },
        {
          title: 'calidad de código',
          content: 'prácticas y herramientas para garantizar la calidad y consistencia del código, incluyendo revisión automatizada, análisis estático y cobertura de pruebas.'
        }
      ],
      benefits: [
        'reducción del tiempo de desarrollo',
        'mayor adaptabilidad a cambios',
        'integración nativa con IA',
        'escalabilidad garantizada'
      ],
      cta: {
        title: '¿necesita una base sólida para sus proyectos de software?',
        button: 'vamos a conversar'
      }
    }
};

export default defaultContent;
