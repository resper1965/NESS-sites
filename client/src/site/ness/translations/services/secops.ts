import { Language } from '@/lib/i18n';

const defaultContent: Record<Language, any> = {
    pt: {
      title: 'n.SecOps',
      description: 'segurança integrada às operações com monitoramento contínuo',
      intro: 'Do SOC à resposta a incidentes, sua resiliência começa com a gente.',
      sections: [
        {
          title: 'monitoramento avançado',
          content: 'vigilância contínua de sistemas, redes e aplicações, identificando ameaças em tempo real com análise comportamental e detecção de anomalias para antecipar riscos.'
        },
        {
          title: 'resposta a incidentes',
          content: 'equipe especializada pronta para atuar em caso de incidentes de segurança, com protocolos estruturados para contenção, erradicação e recuperação eficiente.'
        },
        {
          title: 'avaliações de segurança',
          content: 'testes periódicos de penetração, análise de vulnerabilidades e verificação de configurações para identificar e corrigir falhas antes que sejam exploradas.'
        },
        {
          title: 'proteção de endpoints',
          content: 'soluções modulares para proteção de dispositivos finais, desde antimalware avançado até controles de aplicações e prevenção contra vazamento de dados.'
        }
      ],
      features: [
        {
          title: 'tecnologia adaptativa',
          content: 'soluções que evoluem constantemente para acompanhar as mudanças no cenário de ameaças, utilizando machine learning para melhorar continuamente.'
        },
        {
          title: 'integração nativa',
          content: 'ferramentas que se integram perfeitamente à sua infraestrutura existente, sem interromper ou prejudicar operações em andamento.'
        },
        {
          title: 'visibilidade centralizada',
          content: 'painel único de controle que consolida informações de segurança de toda a organização, facilitando o gerenciamento e a tomada de decisões.'
        }
      ],
      benefits: [
        'proteção contínua sem impacto em performance',
        'redução do tempo de resposta a incidentes',
        'adaptação rápida a novas ameaças',
        'visibilidade total do ambiente de TI'
      ],
      cta: {
        title: 'precisa elevar o nível de segurança da sua operação?',
        button: 'fale com um especialista'
      }
    },
    en: {
      title: 'n.SecOps',
      description: 'security integrated into operations with continuous monitoring',
      intro: 'From SOC to incident response, your resilience starts with us.',
      sections: [
        {
          title: 'advanced monitoring',
          content: 'continuous surveillance of systems, networks, and applications, identifying threats in real-time with behavioral analysis and anomaly detection to anticipate risks.'
        },
        {
          title: 'incident response',
          content: 'specialized team ready to act in case of security incidents, with structured protocols for containment, eradication, and efficient recovery.'
        },
        {
          title: 'security assessments',
          content: 'periodic penetration tests, vulnerability analysis, and configuration verification to identify and fix flaws before they are exploited.'
        },
        {
          title: 'endpoint protection',
          content: 'modular solutions for endpoint protection, from advanced anti-malware to application controls and data leak prevention.'
        }
      ],
      features: [
        {
          title: 'adaptive technology',
          content: 'solutions that constantly evolve to keep pace with changes in the threat landscape, using machine learning to continuously improve.'
        },
        {
          title: 'native integration',
          content: 'tools that seamlessly integrate with your existing infrastructure, without disrupting or impairing ongoing operations.'
        },
        {
          title: 'centralized visibility',
          content: 'single control panel that consolidates security information from across the organization, facilitating management and decision-making.'
        }
      ],
      benefits: [
        'continuous protection without performance impact',
        'reduced incident response time',
        'rapid adaptation to new threats',
        'complete visibility of the IT environment'
      ],
      cta: {
        title: 'need to elevate your operation\'s security level?',
        button: 'talk to a specialist'
      }
    },
    es: {
      title: 'n.SecOps',
      description: 'seguridad integrada a las operaciones con monitoreo continuo',
      intro: 'Del SOC a la respuesta a incidentes, su resiliencia comienza con nosotros.',
      sections: [
        {
          title: 'monitoreo avanzado',
          content: 'vigilancia continua de sistemas, redes y aplicaciones, identificando amenazas en tiempo real con análisis comportamental y detección de anomalías para anticipar riesgos.'
        },
        {
          title: 'respuesta a incidentes',
          content: 'equipo especializado listo para actuar en caso de incidentes de seguridad, con protocolos estructurados para contención, erradicación y recuperación eficiente.'
        },
        {
          title: 'evaluaciones de seguridad',
          content: 'pruebas periódicas de penetración, análisis de vulnerabilidades y verificación de configuraciones para identificar y corregir fallas antes de que sean explotadas.'
        },
        {
          title: 'protección de endpoints',
          content: 'soluciones modulares para la protección de dispositivos finales, desde antimalware avanzado hasta controles de aplicaciones y prevención contra fugas de datos.'
        }
      ],
      features: [
        {
          title: 'tecnología adaptativa',
          content: 'soluciones que evolucionan constantemente para acompañar los cambios en el panorama de amenazas, utilizando machine learning para mejorar continuamente.'
        },
        {
          title: 'integración nativa',
          content: 'herramientas que se integran perfectamente a su infraestructura existente, sin interrumpir o perjudicar operaciones en curso.'
        },
        {
          title: 'visibilidad centralizada',
          content: 'panel único de control que consolida información de seguridad de toda la organización, facilitando la gestión y la toma de decisiones.'
        }
      ],
      benefits: [
        'protección continua sin impacto en rendimiento',
        'reducción del tiempo de respuesta a incidentes',
        'adaptación rápida a nuevas amenazas',
        'visibilidad total del entorno de TI'
      ],
      cta: {
        title: '¿necesita elevar el nivel de seguridad de su operación?',
        button: 'hable con un especialista'
      }
    }
};

export default defaultContent;
