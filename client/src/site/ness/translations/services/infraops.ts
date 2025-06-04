import { Language } from '@/lib/i18n';

const defaultContent: Record<Language, any> = {
    pt: {
      title: 'n.InfraOps',
      description: 'gestão moderna de infraestrutura com alta disponibilidade',
      intro: 'o n.InfraOps da ness oferece um modelo modular e integrado para gerenciamento de infraestrutura, garantindo operações confiáveis, alta disponibilidade e escalabilidade para ambientes corporativos de qualquer porte.',
      sections: [
        {
          title: 'arquitetura de nuvem',
          content: 'projeto e implementação de infraestruturas otimizadas para ambientes multi-cloud e híbridos, com foco em segurança, desempenho e custo-benefício.'
        },
        {
          title: 'monitoramento contínuo',
          content: 'solução completa de observabilidade que integra métricas, logs e traces para visibilidade total da infraestrutura, com alertas inteligentes e diagnósticos automatizados.'
        },
        {
          title: 'automação de infraestrutura',
          content: 'implementação da infraestrutura como código (IaC) e automação de processos para garantir consistência, governança e agilidade na entrega de recursos.'
        },
        {
          title: 'backup e recuperação',
          content: 'estratégias avançadas de proteção de dados e sistemas com políticas personalizadas de retenção e recuperação rápida em caso de falhas.'
        }
      ],
      features: [
        {
          title: 'abordagem devops',
          content: 'integração de processos e ferramentas para permitir entregas mais rápidas e confiáveis, promovendo colaboração entre desenvolvimento e operações.'
        },
        {
          title: 'gestão de contêineres',
          content: 'soluções completas para orquestração de contêineres com Kubernetes, incluindo segurança, monitoramento e estratégias de implantação.'
        },
        {
          title: 'otimização de recursos',
          content: 'análise contínua do uso de recursos para identificar oportunidades de economia e melhorias de desempenho na infraestrutura.'
        }
      ],
      benefits: [
        'redução de downtime e incidentes operacionais',
        'escalabilidade sob demanda',
        'otimização de custos de infraestrutura',
        'agilidade para inovação'
      ],
      cta: {
        title: 'sua infraestrutura está preparada para os desafios atuais?',
        button: 'converse com nosso time'
      }
    },
    en: {
      title: 'n.InfraOps',
      description: 'modern infrastructure management with high availability',
      intro: 'ness\'s n.InfraOps offers a modular and integrated model for infrastructure management, ensuring reliable operations, high availability, and scalability for corporate environments of any size.',
      sections: [
        {
          title: 'cloud architecture',
          content: 'design and implementation of optimized infrastructures for multi-cloud and hybrid environments, focusing on security, performance, and cost-effectiveness.'
        },
        {
          title: 'continuous monitoring',
          content: 'complete observability solution that integrates metrics, logs, and traces for total infrastructure visibility, with intelligent alerts and automated diagnostics.'
        },
        {
          title: 'infrastructure automation',
          content: 'implementation of infrastructure as code (IaC) and process automation to ensure consistency, governance, and agility in resource delivery.'
        },
        {
          title: 'backup and recovery',
          content: 'advanced data and systems protection strategies with customized retention policies and rapid recovery in case of failures.'
        }
      ],
      features: [
        {
          title: 'devops approach',
          content: 'integration of processes and tools to enable faster and more reliable deliveries, promoting collaboration between development and operations.'
        },
        {
          title: 'container management',
          content: 'complete solutions for container orchestration with Kubernetes, including security, monitoring, and deployment strategies.'
        },
        {
          title: 'resource optimization',
          content: 'continuous analysis of resource usage to identify opportunities for savings and performance improvements in infrastructure.'
        }
      ],
      benefits: [
        'reduction of downtime and operational incidents',
        'on-demand scalability',
        'infrastructure cost optimization',
        'agility for innovation'
      ],
      cta: {
        title: 'is your infrastructure prepared for current challenges?',
        button: 'talk to our team'
      }
    },
    es: {
      title: 'n.InfraOps',
      description: 'gestión moderna de infraestructura con alta disponibilidad',
      intro: 'el n.InfraOps de ness ofrece un modelo modular e integrado para la gestión de infraestructura, garantizando operaciones confiables, alta disponibilidad y escalabilidad para entornos corporativos de cualquier tamaño.',
      sections: [
        {
          title: 'arquitectura de nube',
          content: 'diseño e implementación de infraestructuras optimizadas para entornos multi-cloud e híbridos, con enfoque en seguridad, rendimiento y costo-beneficio.'
        },
        {
          title: 'monitoreo continuo',
          content: 'solución completa de observabilidad que integra métricas, logs y traces para visibilidad total de la infraestructura, con alertas inteligentes y diagnósticos automatizados.'
        },
        {
          title: 'automatización de infraestructura',
          content: 'implementación de infraestructura como código (IaC) y automatización de procesos para garantizar consistencia, gobernanza y agilidad en la entrega de recursos.'
        },
        {
          title: 'backup y recuperación',
          content: 'estrategias avanzadas de protección de datos y sistemas con políticas personalizadas de retención y recuperación rápida en caso de fallos.'
        }
      ],
      features: [
        {
          title: 'enfoque devops',
          content: 'integración de procesos y herramientas para permitir entregas más rápidas y confiables, promoviendo la colaboración entre desarrollo y operaciones.'
        },
        {
          title: 'gestión de contenedores',
          content: 'soluciones completas para orquestación de contenedores con Kubernetes, incluyendo seguridad, monitoreo y estrategias de implementación.'
        },
        {
          title: 'optimización de recursos',
          content: 'análisis continuo del uso de recursos para identificar oportunidades de ahorro y mejoras de rendimiento en la infraestructura.'
        }
      ],
      benefits: [
        'reducción de downtime e incidentes operacionales',
        'escalabilidad bajo demanda',
        'optimización de costos de infraestructura',
        'agilidad para innovación'
      ],
      cta: {
        title: '¿su infraestructura está preparada para los desafíos actuales?',
        button: 'converse con nuestro equipo'
      }
    }
};

export default defaultContent;
