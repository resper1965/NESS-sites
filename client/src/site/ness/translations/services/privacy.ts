import { Language } from '@/lib/i18n';

const defaultContent: Record<Language, any> = {
    pt: {
      title: 'n.Privacy',
      description: 'gestão completa de privacidade para conformidade com LGPD/GDPR',
      intro: 'o n.Privacy da ness oferece uma abordagem estruturada para governança de privacidade e proteção de dados, ajudando organizações a atenderem requisitos regulatórios como LGPD e GDPR, enquanto transformam privacidade em vantagem competitiva.',
      sections: [
        {
          title: 'diagnóstico e mapeamento',
          content: 'identificação abrangente do fluxo de dados pessoais na organização, avaliação de riscos e lacunas de conformidade, com mapeamento detalhado de processos e sistemas que tratam dados sensíveis.'
        },
        {
          title: 'implementação de controles',
          content: 'desenvolvimento e implementação de políticas, procedimentos e controles técnicos necessários para garantir a privacidade por design e por padrão em todas as operações de tratamento de dados.'
        },
        {
          title: 'automação de privacidade',
          content: 'ferramentas para automatizar processos críticos de privacidade, como gerenciamento de consentimento, atendimento a solicitações de titulares e manutenção de registros de tratamento.'
        },
        {
          title: 'monitoramento contínuo',
          content: 'soluções para acompanhamento permanente da conformidade, detecção de violações de privacidade e gerenciamento de incidentes relacionados a dados pessoais.'
        }
      ],
      features: [
        {
          title: 'consultoria especializada',
          content: 'equipe multidisciplinar com especialistas em direito, tecnologia e governança para auxiliar em todas as etapas do programa de privacidade, desde a concepção até a maturidade.'
        },
        {
          title: 'DPO como serviço',
          content: 'atuação como Encarregado de Dados (DPO) para organizações que necessitam dessa função, gerenciando a interface com titulares, autoridades e demais stakeholders.'
        },
        {
          title: 'capacitação e conscientização',
          content: 'programas de treinamento customizados para diferentes perfis organizacionais, desenvolvendo a cultura de privacidade e reduzindo riscos operacionais.'
        }
      ],
      benefits: [
        'redução de riscos regulatórios e reputacionais',
        'confiança e transparência com clientes',
        'vantagem competitiva por diferenciação',
        'preparação para novas regulamentações'
      ],
      cta: {
        title: 'sua organização está em conformidade com as leis de privacidade?',
        button: 'solicite uma avaliação'
      }
    },
    en: {
      title: 'n.Privacy',
      description: 'complete privacy management for LGPD/GDPR compliance',
      intro: 'ness\'s n.Privacy offers a structured approach to privacy governance and data protection, helping organizations meet regulatory requirements such as LGPD and GDPR, while transforming privacy into a competitive advantage.',
      sections: [
        {
          title: 'diagnosis and mapping',
          content: 'comprehensive identification of personal data flow in the organization, risk assessment and compliance gaps, with detailed mapping of processes and systems that handle sensitive data.'
        },
        {
          title: 'control implementation',
          content: 'development and implementation of policies, procedures, and technical controls necessary to ensure privacy by design and by default in all data processing operations.'
        },
        {
          title: 'privacy automation',
          content: 'tools to automate critical privacy processes, such as consent management, fulfillment of data subject requests, and maintenance of processing records.'
        },
        {
          title: 'continuous monitoring',
          content: 'solutions for permanent compliance monitoring, detection of privacy violations, and management of incidents related to personal data.'
        }
      ],
      features: [
        {
          title: 'specialized consulting',
          content: 'multidisciplinary team with experts in law, technology, and governance to assist in all stages of the privacy program, from conception to maturity.'
        },
        {
          title: 'DPO as a service',
          content: 'acting as Data Protection Officer (DPO) for organizations that need this function, managing the interface with data subjects, authorities, and other stakeholders.'
        },
        {
          title: 'training and awareness',
          content: 'customized training programs for different organizational profiles, developing a privacy culture and reducing operational risks.'
        }
      ],
      benefits: [
        'reduction of regulatory and reputational risks',
        'trust and transparency with customers',
        'competitive advantage through differentiation',
        'preparation for new regulations'
      ],
      cta: {
        title: 'is your organization in compliance with privacy laws?',
        button: 'request an assessment'
      }
    },
    es: {
      title: 'n.Privacy',
      description: 'gestión completa de privacidad para conformidad con LGPD/GDPR',
      intro: 'el n.Privacy de ness ofrece un enfoque estructurado para gobernanza de privacidad y protección de datos, ayudando a organizaciones a atender requisitos regulatorios como LGPD y GDPR, mientras transforman la privacidad en ventaja competitiva.',
      sections: [
        {
          title: 'diagnóstico y mapeo',
          content: 'identificación integral del flujo de datos personales en la organización, evaluación de riesgos y brechas de conformidad, con mapeo detallado de procesos y sistemas que tratan datos sensibles.'
        },
        {
          title: 'implementación de controles',
          content: 'desarrollo e implementación de políticas, procedimientos y controles técnicos necesarios para garantizar la privacidad por diseño y por defecto en todas las operaciones de tratamiento de datos.'
        },
        {
          title: 'automatización de privacidad',
          content: 'herramientas para automatizar procesos críticos de privacidad, como gestión de consentimiento, atención a solicitudes de titulares y mantenimiento de registros de tratamiento.'
        },
        {
          title: 'monitoreo continuo',
          content: 'soluciones para seguimiento permanente de la conformidad, detección de violaciones de privacidad y gestión de incidentes relacionados con datos personales.'
        }
      ],
      features: [
        {
          title: 'consultoría especializada',
          content: 'equipo multidisciplinario con especialistas en derecho, tecnología y gobernanza para auxiliar en todas las etapas del programa de privacidad, desde la concepción hasta la madurez.'
        },
        {
          title: 'DPO como servicio',
          content: 'actuación como Encargado de Datos (DPO) para organizaciones que necesitan esta función, gestionando la interfaz con titulares, autoridades y demás stakeholders.'
        },
        {
          title: 'capacitación y concientización',
          content: 'programas de entrenamiento personalizados para diferentes perfiles organizacionales, desarrollando la cultura de privacidad y reduciendo riesgos operacionales.'
        }
      ],
      benefits: [
        'reducción de riesgos regulatorios y reputacionales',
        'confianza y transparencia con clientes',
        'ventaja competitiva por diferenciación',
        'preparación para nuevas regulaciones'
      ],
      cta: {
        title: '¿su organización está en conformidad con las leyes de privacidad?',
        button: 'solicite una evaluación'
      }
    }
};

export default defaultContent;
