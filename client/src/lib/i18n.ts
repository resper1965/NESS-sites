import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

/**
 * Define idiomas suportados pela plataforma
 * pt: Português
 * en: Inglês
 * es: Espanhol
 */
export type Language = 'pt' | 'en' | 'es';

/**
 * Define estrutura de traduções
 * TranslationRecord: Mapeamento de chaves para strings traduzidas
 * TranslationsMap: Mapeamento de idiomas para seus respectivos registros de tradução
 */
type TranslationRecord = Record<string, string>;
type TranslationsMap = Record<Language, TranslationRecord>;

/**
 * Contexto de internacionalização
 * Fornece funcionalidades para tradução e gerenciamento de idiomas
 */
interface I18nContextType {
  /** Idioma atual selecionado */
  language: Language;
  /** Função para mudar o idioma atual */
  setLanguage: (lang: Language) => void;
  /** Função para traduzir uma chave para o idioma atual */
  t: (key: string) => string;
  /** Indica se traduções estão carregando */
  isLoading: boolean;
}

const DEFAULT_LANGUAGE: Language = 'en';

// Initial basic translations
const translations: TranslationsMap = {
  pt: {
    'nav.home': 'Início',
    'nav.about': 'Quem Somos',
    'nav.services': 'O Que Fazemos',
    'nav.jobs': 'Vagas',
    'nav.news': 'Notícias',
    'nav.contact': 'Contato',
    'nav.login': 'Entrar',
    'menu.home': 'Início',
    'menu.about': 'Quem Somos',
    'menu.services': 'O Que Fazemos',
    'menu.jobs': 'Vagas',
    'menu.news': 'Notícias',
    'menu.contact': 'Contato',
    'lang.pt': 'Português',
    'lang.en': 'English',
    'lang.es': 'Español',
    'home.hero.title': 'força invisível\nresultados visíveis',
    'home.hero.subtitle': 'Especialistas em inovação tecnológica, automação de processos, infraestrutura de TI, cibersegurança e arquitetura de software.',
    'home.hero.cta1': 'conheça nossos serviços',
    'home.hero.cta2': 'fale com a gente',
    'about.title': 'Quem Somos',
    'services.title': 'O Que Fazemos',
    'jobs.title': 'Vagas Abertas',
    'news.title': 'Últimas Notícias',
    'contact.title': 'Entre em Contato',
    'footer.rights': 'Todos os direitos reservados',
    'footer.description': 'Desde 1991, fornecemos soluções empresariais de alta qualidade com foco em cibersegurança, infraestrutura e arquitetura de software.',
    'footer.quickLinks': 'Links Rápidos',
    'footer.solutions': 'Soluções',
    'footer.contact': 'Contato',
    'footer.address': 'Av. Paulista, 1000, São Paulo, SP',
    'footer.privacy': 'Privacidade',
    'footer.terms': 'Termos',
    'footer.cookies': 'Cookies',
    'footer.login': 'Login',
    
    // Textos de páginas de serviço
    'forense.service.digital': 'forense digital',
    'forense.service.legal': 'suporte legal',
    'forense.service.corporate': 'investigações corporativas',
    'forense.cta.title': 'precisa de um serviço especializado?',
    'forense.cta.button': 'entre em contato',
    'forense.digital.title': 'o que é',
    'forense.digital.why': 'por que a forense digital é essencial',
    'forense.digital.description1': 'a forense digital é uma disciplina que combina elementos da ciência da computação e da investigação criminal para coletar, analisar e preservar evidências digitais seguindo protocolos específicos que garantem sua validade legal.',
    'forense.digital.description2': 'na forense dot io, aplicamos metodologias forenses robustas para extrair, documentar e interpretar dados digitais que podem ser decisivos em processos judiciais, investigações corporativas e auditorias de segurança.',
    'forense.digital.description3': 'nossa abordagem científica assegura que cada evidência digital seja tratada com o rigor técnico e a conformidade legal necessários para ser considerada válida perante os tribunais e órgãos reguladores.',
    
    // Itens da lista "why digital forensics is essential"
    'forense.digital.evidence.title': 'evidências incontestáveis',
    'forense.digital.evidence.desc': 'produção de provas digitais que resistem a questionamentos técnicos e jurídicos',
    'forense.digital.reconstruction.title': 'reconstrução factual',
    'forense.digital.reconstruction.desc': 'análise cronológica de eventos digitais para estabelecer sequências precisas de ações',
    'forense.digital.recovery.title': 'recuperação de dados ocultos',
    'forense.digital.recovery.desc': 'acesso a informações deletadas, ocultas ou corrompidas que seriam inacessíveis por meios convencionais',
    
    // Ambientes de coleta digital
    'forense.digital.environments.title': 'ambientes de coleta digital',
    'forense.digital.corporate.title': 'ambientes corporativos',
    'forense.digital.corporate.desc': 'análise de computadores, servidores, e dispositivos móveis corporativos, mantendo a discrição e minimizando interrupções nas operações empresariais.',
    'forense.digital.personal.title': 'dispositivos pessoais',
    'forense.digital.personal.desc': 'recuperação e análise de dados de smartphones, tablets e computadores pessoais, com atenção especial à privacidade e aos aspectos legais da coleta.',
    'forense.digital.cloud.title': 'armazenamento em nuvem',
    'forense.digital.cloud.desc': 'extração forense de dados armazenados em serviços de nuvem, incluindo e-mails, documentos, redes sociais, sites e backups, seguindo protocolos legais para acesso autorizado.',
    
    // Metodologias forenses
    'forense.digital.methodologies.title': 'metodologias forenses',
    'forense.digital.methodologies.desc': 'utilizamos protocolos rigorosos que garantem a admissibilidade jurídica das evidências coletadas, respeitando normas nacionais e internacionais. nossa abordagem inclui:',
    'forense.digital.frameworks.title': 'frameworks adotados',
    'forense.digital.specialized.title': 'serviços especializados',
    
    // Itens de metodologia
    'forense.digital.method.documentation': 'documentação precisa de cada etapa da coleta e cadeia de custódia',
    'forense.digital.method.tools': 'utilização de ferramentas forenses homologadas internacionalmente',
    'forense.digital.method.techniques': 'técnicas não destrutivas que preservam a integridade dos dados',
    'forense.digital.method.analysis': 'análise de dados em ambiente isolado e controlado',
    
    // Frameworks
    'forense.digital.framework.acpo': 'acpo guidelines',
    'forense.digital.framework.acpo.desc': 'princípios para manipulação de evidências digitais reconhecidos internacionalmente',
    'forense.digital.framework.iso': 'iso/iec 27037',
    'forense.digital.framework.iso.desc': 'diretrizes para identificação, coleta e preservação de evidências digitais',
    'forense.digital.framework.nist': 'nist guidelines',
    'forense.digital.framework.nist.desc': 'padrões técnicos para forensics digital e investigações cibernéticas',
    'forense.legal.title': 'o que é suporte legal?',
    'forense.legal.why': 'por que o suporte legal é essencial',
    'forense.legal.desc': 'consultoria técnica especializada em evidências digitais',
    'forense.legal.intro': 'fornecemos suporte técnico especializado para a área legal.',
    'forense.legal.division': 'nossa divisão de suporte legal oferece serviços especializados em consultoria legal e técnica para casos envolvendo evidências digitais, proporcionando clareza e base científica para argumentos legais.',
    
    // Categorias de serviço
    'forense.legal.section.title': 'serviços de consultoria técnica',
    'forense.legal.section.desc': 'oferecemos suporte técnico especializado para profissionais e instituições da área legal em casos que envolvam evidências digitais.',
    
    // Serviço de análise técnica
    'forense.legal.analysis.title': 'análise técnica imparcial',
    'forense.legal.analysis.desc': 'avaliamos evidências digitais com metodologia científica e neutralidade, sem envolvimento nos aspectos jurídicos do caso.',
    
    // Serviço de tradução de conceitos
    'forense.legal.translation.title': 'tradução de conceitos',
    'forense.legal.translation.desc': 'convertemos conceitos técnicos complexos em linguagem acessível, facilitando a compreensão por profissionais de diversas áreas.',
    
    // Serviço de padrões internacionais
    'forense.legal.standards.title': 'padrões internacionais',
    'forense.legal.standards.desc': 'utilizamos metodologias reconhecidas globalmente para garantir que nossas análises atendam aos mais altos padrões técnicos.',
    
    // Categorias específicas de serviços
    'forense.legal.strategy.title': 'consultoria estratégica',
    'forense.legal.strategy.desc': 'orientação especializada em casos e litígios envolvendo evidências digitais, ajudando a formular estratégias legais eficazes baseadas em fundamentos técnicos sólidos.',
    'forense.legal.assistance.title': 'assistência técnica processual',
    'forense.legal.assistance.desc': 'suporte técnico especializado para o desenvolvimento e defesa de teses jurídicas, incluindo análise crítica de argumentos e metodologias opostas para identificar inconsistências e falhas.',
    'forense.legal.clarification.title': 'esclarecimentos em audiências',
    'forense.legal.clarification.desc': 'apresentação de análises técnicas forenses em tribunais, contribuindo para uma compreensão clara de elementos técnicos pelo judiciário e desmistificando conceitos complexos.',
    
    // Metodologia
    'forense.legal.methodology.title': 'nossa metodologia',
    'forense.legal.methodology.analysis': 'análise preliminar',
    'forense.legal.methodology.analysis.desc': 'avaliamos minuciosamente os documentos, relatórios e evidências disponíveis, identificando pontos críticos e oportunidades estratégicas. essa fase estabelece as bases para uma consultoria eficaz e direcionada aos objetivos do cliente.',
    'forense.legal.methodology.planning': 'planejamento estratégico',
    'forense.legal.methodology.planning.desc': 'desenvolvemos uma estratégia personalizada que integra aspectos jurídicos e técnicos, estabelecendo uma linha de atuação clara e fundamentada. cada ação é meticulosamente planejada para maximizar o impacto positivo no caso.',
    'forense.legal.methodology.execution': 'execução técnica',
    'forense.legal.methodology.execution.desc': 'implementamos as estratégias definidas com rigor científico e precisão técnica, garantindo que cada informação apresentada seja verificável e sustentável. toda a atividade é documentada seguindo padrões internacionais.',
    'forense.legal.methodology.communication': 'comunicação eficaz',
    'forense.legal.methodology.communication.desc': 'traduzimos conceitos técnicos complexos em linguagem acessível e persuasiva, apropriada para o contexto jurídico. nossas apresentações são estruturadas para transmitir clareza e convicção, facilitando o entendimento por todos os envolvidos.',
    
    // Benefícios
    'forense.legal.benefits.title': 'benefícios do nosso suporte legal',
    'forense.legal.benefits.argumentation': 'argumentação robusta',
    'forense.legal.benefits.argumentation.desc': 'fortalecemos argumentos jurídicos com embasamento técnico sólido, aumentando sua credibilidade e poder de persuasão perante os tribunais e demais autoridades.',
    'forense.legal.benefits.vulnerabilities': 'identificação de vulnerabilidades',
    'forense.legal.benefits.vulnerabilities.desc': 'analisamos criticamente as evidências e argumentos técnicos apresentados pela parte contrária, identificando falhas metodológicas e inconsistências que podem ser exploradas estrategicamente.',
    'forense.legal.benefits.clarity': 'clareza técnica',
    'forense.legal.benefits.clarity.desc': 'facilitamos o entendimento de questões técnicas complexas por parte de juízes, advogados e demais envolvidos no processo, evitando mal-entendidos e interpretações equivocadas.',
    'forense.legal.benefits.advantage': 'vantagem competitiva',
    'forense.legal.benefits.advantage.desc': 'proporcionamos um diferencial estratégico em casos complexos, onde o domínio do aspecto técnico das evidências digitais pode ser decisivo para o resultado final do processo.',
    'forense.corporate.title': 'o que são investigações corporativas?',
    'forense.corporate.why': 'por que as investigações corporativas são essenciais',
    'forense.corporate.desc': 'investigações e auditoria digital para ambientes corporativos',

    // Jobs page
    'jobs.seo.description': 'Explore as oportunidades de carreira na ness. e junte-se a nossa equipe de especialistas em tecnologia.',
    'jobs.hero.subtitle': 'Junte-se à nossa equipe de especialistas e construa uma carreira de sucesso em tecnologia.',
    'jobs.filters.all': 'Todas as vagas',
    'jobs.filters.remote': 'Remotas',
    'jobs.filters.office': 'Presenciais',
    'jobs.filters.hybrid': 'Híbridas',
    'jobs.viewDetails': 'Ver detalhes e candidatar-se',
    'jobs.noJobs.title': 'Nenhuma vaga encontrada',
    'jobs.noJobs.description': 'Não há vagas disponíveis com os filtros selecionados.',
    'jobs.benefits.title': 'Benefícios de trabalhar conosco',
    'jobs.benefit1.title': 'Desenvolvimento profissional',
    'jobs.benefit1.desc': 'Investimos continuamente no desenvolvimento técnico e pessoal através de treinamentos, certificações e mentorias.',
    'jobs.benefit2.title': 'Ambiente colaborativo',
    'jobs.benefit2.desc': 'Trabalhamos em equipes multidisciplinares onde a colaboração e o compartilhamento de conhecimento são incentivados.',
    'jobs.benefit3.title': 'Flexibilidade e equilíbrio',
    'jobs.benefit3.desc': 'Oferecemos horários flexíveis, modelo híbrido e iniciativas que promovem o equilíbrio entre vida pessoal e profissional.',

    // Contact page
    'contact.seo.description': 'Entre em contato com nossa equipe para saber mais sobre nossos serviços de tecnologia e segurança.',
    'contact.hero.prefix': 'Entre em',
    'contact.hero.highlight': 'contato',
    'contact.hero.text': 'Estamos prontos para ajudar sua empresa a atingir novos patamares de segurança e eficiência operacional. Converse com nossos especialistas hoje.',
    'contact.form.title': 'Envie sua mensagem',
    'contact.form.name': 'Nome completo *',
    'contact.form.email': 'E-mail *',
    'contact.form.company': 'Empresa *',
    'contact.form.phone': 'Telefone *',
    'contact.form.subject': 'Assunto *',
    'contact.form.message': 'Mensagem *',
    'contact.form.verification': 'Verificação *',
    'contact.form.security': 'Verificação de Segurança',
    'contact.form.notRobot': 'Não sou um robô',
    'contact.form.protected': 'Protegido por reCAPTCHA -',
    'contact.form.privacy': 'Privacidade',
    'contact.form.terms': 'Termos',
    'contact.form.submit': 'Enviar mensagem',
    'contact.form.sending': 'Enviando...',
    'contact.toast.verify.title': 'Verificação necessária',
    'contact.toast.verify.desc': 'Por favor, complete a verificação de captcha antes de enviar o formulário.',
    'contact.toast.success.title': 'Mensagem enviada',
    'contact.toast.success.desc': 'Agradecemos o seu contato. Responderemos em breve.',
    'contact.toast.error.title': 'Erro ao enviar mensagem',
    'contact.toast.error.desc': 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.',
    'contact.info.title': 'Informações de Contato',
    'contact.info.office': 'Escritório',
    'contact.info.phones': 'Telefones',
    'contact.info.email': 'E-mail',
    'contact.info.hours': 'Horário de Atendimento',
    'contact.info.weekdays': 'Segunda - Sexta:',
    'contact.info.emergency': 'Suporte Emergencial:',
    'contact.info.follow': 'Siga-nos',
    'contact.map.title': 'Mapa de Localização',
    'contact.map.placeholder': 'Em um site real, um mapa interativo seria carregado aqui.',

    // News page
    'news.seo.description': 'Fique por dentro das últimas notícias e atualizações da ness. e do mundo da tecnologia.',
    'news.hero.subtitle': 'Fique por dentro das novidades sobre nossa empresa e o mercado de tecnologia.',
    'news.filters.all': 'Todas as notícias',
    'news.filters.company': 'Empresa',
    'news.filters.technology': 'Tecnologia',
    'news.filters.events': 'Eventos',
    'news.noNews.title': 'Nenhuma notícia encontrada',
    'news.noNews.description': 'Não há notícias disponíveis com o filtro selecionado.',
    'news.readMore': 'Leia mais',
    'news.newsletter.title': 'Assine nossa newsletter',
    'news.newsletter.desc': 'Receba as últimas novidades e artigos exclusivos diretamente em seu e-mail.',
    'news.newsletter.placeholder': 'Seu e-mail',
    'news.newsletter.subscribe': 'Assinar',
    'news.newsletter.privacy': 'Respeitamos sua privacidade. Você pode cancelar a inscrição a qualquer momento.',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'What We Do',
    'nav.jobs': 'Jobs',
    'nav.news': 'News',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'menu.home': 'Home',
    'menu.about': 'About Us',
    'menu.services': 'What We Do',
    'menu.jobs': 'Jobs',
    'menu.news': 'News',
    'menu.contact': 'Contact',
    'lang.pt': 'Português',
    'lang.en': 'English',
    'lang.es': 'Español',
    'home.hero.title': 'invisible strength\nvisible results',
    'home.hero.subtitle': 'Experts in technological innovation, process automation, IT infrastructure, cybersecurity, and software architecture.',
    'home.hero.cta1': 'discover our services',
    'home.hero.cta2': 'contact us',
    'about.title': 'About Us',
    'services.title': 'What We Do',
    'jobs.title': 'Open Positions',
    'news.title': 'Latest News',
    'contact.title': 'Contact Us',
    'footer.rights': 'All rights reserved',
    'footer.description': 'Since 1991, we provide high quality business solutions focused on cybersecurity, infrastructure and software architecture.',
    'footer.quickLinks': 'Quick Links',
    'footer.solutions': 'Solutions',
    'footer.contact': 'Contact',
    'footer.address': 'Av. Paulista, 1000, São Paulo, SP',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookies',
    'footer.login': 'Login',
    
    // Service page texts
    'forense.service.digital': 'digital forensics',
    'forense.service.legal': 'legal support',
    'forense.service.corporate': 'corporate investigations',
    'forense.cta.title': 'need specialized services?',
    'forense.cta.button': 'contact us',
    'forense.digital.title': 'what is',
    'forense.digital.why': 'why digital forensics is essential',
    'forense.digital.description1': 'digital forensics is a discipline that combines elements of computer science and criminal investigation to collect, analyze and preserve digital evidence following specific protocols that ensure its legal validity.',
    'forense.digital.description2': 'at forense dot io, we apply robust forensic methodologies to extract, document and interpret digital data that can be decisive in legal proceedings, corporate investigations and security audits.',
    'forense.digital.description3': 'our scientific approach ensures that each piece of digital evidence is treated with the technical rigor and legal compliance necessary to be considered valid before courts and regulatory bodies.',
    
    // Items in the "why digital forensics is essential" list
    'forense.digital.evidence.title': 'indisputable evidence',
    'forense.digital.evidence.desc': 'production of digital evidence that withstands technical and legal challenges',
    'forense.digital.reconstruction.title': 'factual reconstruction',
    'forense.digital.reconstruction.desc': 'chronological analysis of digital events to establish precise sequences of actions',
    'forense.digital.recovery.title': 'hidden data recovery',
    'forense.digital.recovery.desc': 'access to deleted, hidden, or corrupted information that would be inaccessible by conventional means',
    
    // Digital collection environments
    'forense.digital.environments.title': 'digital collection environments',
    'forense.digital.corporate.title': 'corporate environments',
    'forense.digital.corporate.desc': 'analysis of computers, servers, and corporate mobile devices, maintaining discretion and minimizing disruptions to business operations.',
    'forense.digital.personal.title': 'personal devices',
    'forense.digital.personal.desc': 'recovery and analysis of data from smartphones, tablets, and personal computers, with special attention to privacy and legal aspects of collection.',
    'forense.digital.cloud.title': 'cloud storage',
    'forense.digital.cloud.desc': 'forensic extraction of data stored in cloud services, including emails, documents, social networks, websites, and backups, following legal protocols for authorized access.',
    
    // Forensic methodologies
    'forense.digital.methodologies.title': 'forensic methodologies',
    'forense.digital.methodologies.desc': 'we use rigorous protocols that ensure the legal admissibility of collected evidence, respecting national and international standards. our approach includes:',
    'forense.digital.frameworks.title': 'adopted frameworks',
    'forense.digital.specialized.title': 'specialized services',
    
    // Methodology items
    'forense.digital.method.documentation': 'precise documentation of each collection step and chain of custody',
    'forense.digital.method.tools': 'use of internationally certified forensic tools',
    'forense.digital.method.techniques': 'non-destructive techniques that preserve data integrity',
    'forense.digital.method.analysis': 'data analysis in an isolated and controlled environment',
    
    // Frameworks
    'forense.digital.framework.acpo': 'acpo guidelines',
    'forense.digital.framework.acpo.desc': 'internationally recognized principles for handling digital evidence',
    'forense.digital.framework.iso': 'iso/iec 27037',
    'forense.digital.framework.iso.desc': 'guidelines for identification, collection, and preservation of digital evidence',
    'forense.digital.framework.nist': 'nist guidelines',
    'forense.digital.framework.nist.desc': 'technical standards for digital forensics and cyber investigations',
    'forense.legal.title': 'what is legal support?',
    'forense.legal.why': 'why legal support is essential',
    'forense.legal.desc': 'specialized technical consulting for digital evidence',
    'forense.legal.intro': 'we provide specialized technical support for the legal field.',
    'forense.legal.division': 'our legal support division offers specialized services in legal and technical consulting for cases involving digital evidence, providing clarity and scientific basis for legal arguments.',
    
    // Service categories
    'forense.legal.section.title': 'technical consulting services',
    'forense.legal.section.desc': 'we offer specialized technical support for professionals and institutions in the legal field in cases involving digital evidence.',
    
    // Technical analysis service
    'forense.legal.analysis.title': 'impartial technical analysis',
    'forense.legal.analysis.desc': 'we evaluate digital evidence with scientific methodology and neutrality, without involvement in the legal aspects of the case.',
    
    // Concept translation service
    'forense.legal.translation.title': 'concept translation',
    'forense.legal.translation.desc': 'we convert complex technical concepts into accessible language, facilitating understanding by professionals from various fields.',
    
    // International standards service
    'forense.legal.standards.title': 'international standards',
    'forense.legal.standards.desc': 'we use globally recognized methodologies to ensure that our analyses meet the highest technical standards.',
    
    // Specific service categories
    'forense.legal.strategy.title': 'strategic consulting',
    'forense.legal.strategy.desc': 'specialized guidance in cases and litigation involving digital evidence, helping to formulate effective legal strategies based on solid technical foundations.',
    'forense.legal.assistance.title': 'procedural technical assistance',
    'forense.legal.assistance.desc': 'specialized technical support for the development and defense of legal theses, including critical analysis of opposing arguments and methodologies to identify inconsistencies and flaws.',
    'forense.legal.clarification.title': 'court clarifications',
    'forense.legal.clarification.desc': 'presentation of forensic technical analyses in courts, contributing to a clear understanding of technical elements by the judiciary and demystifying complex concepts.',
    
    // Methodology
    'forense.legal.methodology.title': 'our methodology',
    'forense.legal.methodology.analysis': 'preliminary analysis',
    'forense.legal.methodology.analysis.desc': 'we thoroughly evaluate the available documents, reports, and evidence, identifying critical points and strategic opportunities. this phase establishes the foundations for effective consulting directed at the client\'s objectives.',
    'forense.legal.methodology.planning': 'strategic planning',
    'forense.legal.methodology.planning.desc': 'we develop a personalized strategy that integrates legal and technical aspects, establishing a clear and well-founded line of action. each action is meticulously planned to maximize the positive impact on the case.',
    'forense.legal.methodology.execution': 'technical execution',
    'forense.legal.methodology.execution.desc': 'we implement defined strategies with scientific rigor and technical precision, ensuring that each piece of information presented is verifiable and sustainable. all activity is documented following international standards.',
    'forense.legal.methodology.communication': 'effective communication',
    'forense.legal.methodology.communication.desc': 'we translate complex technical concepts into accessible and persuasive language, appropriate for the legal context. our presentations are structured to convey clarity and conviction, facilitating understanding by all involved.',
    
    // Benefits
    'forense.legal.benefits.title': 'benefits of our legal support',
    'forense.legal.benefits.argumentation': 'robust argumentation',
    'forense.legal.benefits.argumentation.desc': 'we strengthen legal arguments with solid technical foundation, increasing their credibility and persuasive power before courts and other authorities.',
    'forense.legal.benefits.vulnerabilities': 'vulnerability identification',
    'forense.legal.benefits.vulnerabilities.desc': 'we critically analyze evidence and technical arguments presented by the opposing party, identifying methodological flaws and inconsistencies that can be strategically exploited.',
    'forense.legal.benefits.clarity': 'technical clarity',
    'forense.legal.benefits.clarity.desc': 'we facilitate the understanding of complex technical issues by judges, lawyers, and others involved in the process, avoiding misunderstandings and misinterpretations.',
    'forense.legal.benefits.advantage': 'competitive advantage',
    'forense.legal.benefits.advantage.desc': 'we provide a strategic differential in complex cases, where mastery of the technical aspect of digital evidence can be decisive for the final outcome of the process.',
    'forense.corporate.title': 'what are corporate investigations?',
    'forense.corporate.why': 'why corporate investigations are essential',
    'forense.corporate.desc': 'investigations and digital auditing for corporate environments',

    // Jobs page
    'jobs.seo.description': 'Explore career opportunities at ness. and join our team of technology experts.',
    'jobs.hero.subtitle': 'Join our team of experts and build a successful career in technology.',
    'jobs.filters.all': 'All jobs',
    'jobs.filters.remote': 'Remote',
    'jobs.filters.office': 'On-site',
    'jobs.filters.hybrid': 'Hybrid',
    'jobs.viewDetails': 'View details and apply',
    'jobs.noJobs.title': 'No jobs found',
    'jobs.noJobs.description': 'There are no jobs matching the selected filters.',
    'jobs.benefits.title': 'Benefits of working with us',
    'jobs.benefit1.title': 'Professional development',
    'jobs.benefit1.desc': 'We continuously invest in technical and personal development through trainings, certifications and mentoring.',
    'jobs.benefit2.title': 'Collaborative environment',
    'jobs.benefit2.desc': 'We work in multidisciplinary teams where collaboration and knowledge sharing are encouraged.',
    'jobs.benefit3.title': 'Flexibility and balance',
    'jobs.benefit3.desc': 'We offer flexible hours, a hybrid model and initiatives that promote work-life balance.',

    // Contact page
    'contact.seo.description': 'Get in touch with our team to learn more about our technology and security services.',
    'contact.hero.prefix': 'Get in',
    'contact.hero.highlight': 'touch',
    'contact.hero.text': 'We are ready to help your company reach new levels of security and operational efficiency. Talk to our specialists today.',
    'contact.form.title': 'Send your message',
    'contact.form.name': 'Full name *',
    'contact.form.email': 'E-mail *',
    'contact.form.company': 'Company *',
    'contact.form.phone': 'Phone *',
    'contact.form.subject': 'Subject *',
    'contact.form.message': 'Message *',
    'contact.form.verification': 'Verification *',
    'contact.form.security': 'Security Check',
    'contact.form.notRobot': "I'm not a robot",
    'contact.form.protected': 'Protected by reCAPTCHA -',
    'contact.form.privacy': 'Privacy',
    'contact.form.terms': 'Terms',
    'contact.form.submit': 'Send message',
    'contact.form.sending': 'Sending...',
    'contact.toast.verify.title': 'Verification required',
    'contact.toast.verify.desc': 'Please complete the captcha verification before submitting the form.',
    'contact.toast.success.title': 'Message sent',
    'contact.toast.success.desc': 'Thank you for contacting us. We will respond soon.',
    'contact.toast.error.title': 'Error sending message',
    'contact.toast.error.desc': 'An error occurred while sending your message. Please try again.',
    'contact.info.title': 'Contact Information',
    'contact.info.office': 'Office',
    'contact.info.phones': 'Phones',
    'contact.info.email': 'E-mail',
    'contact.info.hours': 'Service Hours',
    'contact.info.weekdays': 'Monday - Friday:',
    'contact.info.emergency': 'Emergency Support:',
    'contact.info.follow': 'Follow us',
    'contact.map.title': 'Location Map',
    'contact.map.placeholder': 'At a real site, an interactive map would be loaded here.',

    // News page
    'news.seo.description': 'Stay up to date with the latest ness. news and technology updates.',
    'news.hero.subtitle': 'Keep up with news about our company and the technology market.',
    'news.filters.all': 'All news',
    'news.filters.company': 'Company',
    'news.filters.technology': 'Technology',
    'news.filters.events': 'Events',
    'news.noNews.title': 'No news found',
    'news.noNews.description': 'There are no news items matching the selected filter.',
    'news.readMore': 'Read more',
    'news.newsletter.title': 'Subscribe to our newsletter',
    'news.newsletter.desc': 'Receive the latest news and exclusive articles directly in your inbox.',
    'news.newsletter.placeholder': 'Your e-mail',
    'news.newsletter.subscribe': 'Subscribe',
    'news.newsletter.privacy': 'We respect your privacy. You can unsubscribe at any time.',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Quiénes Somos',
    'nav.services': 'Qué Hacemos',
    'nav.jobs': 'Empleos',
    'nav.news': 'Noticias',
    'nav.contact': 'Contacto',
    'nav.login': 'Ingresar',
    'menu.home': 'Inicio',
    'menu.about': 'Quiénes Somos',
    'menu.services': 'Qué Hacemos',
    'menu.jobs': 'Empleos',
    'menu.news': 'Noticias',
    'menu.contact': 'Contacto',
    'lang.pt': 'Português',
    'lang.en': 'English',
    'lang.es': 'Español',
    'home.hero.title': 'fuerza invisible\nresultados visibles',
    'home.hero.subtitle': 'Expertos en innovación tecnológica, automatización de procesos, infraestructura de TI, ciberseguridad y arquitectura de software.',
    'home.hero.cta1': 'conozca nuestros servicios',
    'home.hero.cta2': 'hable con nosotros',
    'about.title': 'Quiénes Somos',
    'services.title': 'Qué Hacemos',
    'jobs.title': 'Posiciones Abiertas',
    'news.title': 'Últimas Noticias',
    'contact.title': 'Contáctenos',
    'footer.rights': 'Todos los derechos reservados',
    'footer.description': 'Desde 1991, brindamos soluciones empresariales de alta calidad con enfoque en ciberseguridad, infraestructura y arquitectura de software.',
    'footer.quickLinks': 'Enlaces Rápidos',
    'footer.solutions': 'Soluciones',
    'footer.contact': 'Contacto',
    'footer.address': 'Av. Paulista, 1000, São Paulo, SP',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos',
    'footer.cookies': 'Cookies',
    'footer.login': 'Ingresar',
    
    // Textos de páginas de servicio
    'forense.service.digital': 'forense digital',
    'forense.service.legal': 'soporte legal',
    'forense.service.corporate': 'investigaciones corporativas',
    'forense.cta.title': '¿necesita un servicio especializado?',
    'forense.cta.button': 'contáctenos',
    'forense.digital.title': '¿qué es',
    'forense.digital.why': 'por qué el forense digital es esencial',
    'forense.digital.description1': 'el forense digital es una disciplina que combina elementos de la ciencia de la computación y la investigación criminal para recopilar, analizar y preservar evidencias digitales siguiendo protocolos específicos que garantizan su validez legal.',
    'forense.digital.description2': 'en forense dot io, aplicamos metodologías forenses robustas para extraer, documentar e interpretar datos digitales que pueden ser decisivos en procesos judiciales, investigaciones corporativas y auditorías de seguridad.',
    'forense.digital.description3': 'nuestro enfoque científico asegura que cada evidencia digital sea tratada con el rigor técnico y la conformidad legal necesarios para ser considerada válida ante tribunales y organismos reguladores.',
    
    // Elementos de la lista "por qué el forense digital es esencial"
    'forense.digital.evidence.title': 'evidencias irrefutables',
    'forense.digital.evidence.desc': 'producción de pruebas digitales que resisten cuestionamientos técnicos y jurídicos',
    'forense.digital.reconstruction.title': 'reconstrucción factual',
    'forense.digital.reconstruction.desc': 'análisis cronológico de eventos digitales para establecer secuencias precisas de acciones',
    'forense.digital.recovery.title': 'recuperación de datos ocultos',
    'forense.digital.recovery.desc': 'acceso a información eliminada, oculta o corrompida que sería inaccesible por medios convencionales',
    
    // Ambientes de recolección digital
    'forense.digital.environments.title': 'ambientes de recolección digital',
    'forense.digital.corporate.title': 'ambientes corporativos',
    'forense.digital.corporate.desc': 'análisis de computadoras, servidores y dispositivos móviles corporativos, manteniendo la discreción y minimizando interrupciones en las operaciones empresariales.',
    'forense.digital.personal.title': 'dispositivos personales',
    'forense.digital.personal.desc': 'recuperación y análisis de datos de smartphones, tablets y computadoras personales, con especial atención a la privacidad y los aspectos legales de la recolección.',
    'forense.digital.cloud.title': 'almacenamiento en la nube',
    'forense.digital.cloud.desc': 'extracción forense de datos almacenados en servicios en la nube, incluyendo correos electrónicos, documentos, redes sociales, sitios web y respaldos, siguiendo protocolos legales para acceso autorizado.',
    
    // Metodologías forenses
    'forense.digital.methodologies.title': 'metodologías forenses',
    'forense.digital.methodologies.desc': 'utilizamos protocolos rigurosos que garantizan la admisibilidad jurídica de las evidencias recolectadas, respetando normas nacionales e internacionales. nuestro enfoque incluye:',
    'forense.digital.frameworks.title': 'frameworks adoptados',
    'forense.digital.specialized.title': 'servicios especializados',
    
    // Elementos de metodología
    'forense.digital.method.documentation': 'documentación precisa de cada etapa de la recolección y cadena de custodia',
    'forense.digital.method.tools': 'utilización de herramientas forenses homologadas internacionalmente',
    'forense.digital.method.techniques': 'técnicas no destructivas que preservan la integridad de los datos',
    'forense.digital.method.analysis': 'análisis de datos en ambiente aislado y controlado',
    
    // Frameworks
    'forense.digital.framework.acpo': 'acpo guidelines',
    'forense.digital.framework.acpo.desc': 'principios para manipulación de evidencias digitales reconocidos internacionalmente',
    'forense.digital.framework.iso': 'iso/iec 27037',
    'forense.digital.framework.iso.desc': 'directrices para identificación, recolección y preservación de evidencias digitales',
    'forense.digital.framework.nist': 'nist guidelines',
    'forense.digital.framework.nist.desc': 'estándares técnicos para forense digital e investigaciones cibernéticas',
    'forense.legal.title': '¿qué es soporte legal?',
    'forense.legal.why': 'por qué el soporte legal es esencial',
    'forense.legal.desc': 'consultoría técnica especializada en evidencias digitales',
    'forense.legal.intro': 'proporcionamos soporte técnico especializado para el área legal.',
    'forense.legal.division': 'nuestra división de soporte legal ofrece servicios especializados en consultoría legal y técnica para casos que involucran evidencias digitales, proporcionando claridad y base científica para argumentos legales.',
    
    // Categorías de servicio
    'forense.legal.section.title': 'servicios de consultoría técnica',
    'forense.legal.section.desc': 'ofrecemos soporte técnico especializado para profesionales e instituciones del área legal en casos que involucren evidencias digitales.',
    
    // Servicio de análisis técnico
    'forense.legal.analysis.title': 'análisis técnico imparcial',
    'forense.legal.analysis.desc': 'evaluamos evidencias digitales con metodología científica y neutralidad, sin involucramiento en los aspectos jurídicos del caso.',
    
    // Servicio de traducción de conceptos
    'forense.legal.translation.title': 'traducción de conceptos',
    'forense.legal.translation.desc': 'convertimos conceptos técnicos complejos en lenguaje accesible, facilitando la comprensión por profesionales de diversas áreas.',
    
    // Servicio de estándares internacionales
    'forense.legal.standards.title': 'estándares internacionales',
    'forense.legal.standards.desc': 'utilizamos metodologías reconocidas globalmente para garantizar que nuestros análisis cumplan con los más altos estándares técnicos.',
    
    // Categorías específicas de servicios
    'forense.legal.strategy.title': 'consultoría estratégica',
    'forense.legal.strategy.desc': 'orientación especializada en casos y litigios que involucran evidencias digitales, ayudando a formular estrategias legales efectivas basadas en fundamentos técnicos sólidos.',
    'forense.legal.assistance.title': 'asistencia técnica procesal',
    'forense.legal.assistance.desc': 'soporte técnico especializado para el desarrollo y defensa de tesis jurídicas, incluyendo análisis crítico de argumentos y metodologías opuestas para identificar inconsistencias y fallas.',
    'forense.legal.clarification.title': 'aclaraciones en audiencias',
    'forense.legal.clarification.desc': 'presentación de análisis técnicos forenses en tribunales, contribuyendo a una comprensión clara de elementos técnicos por parte del poder judicial y desmitificando conceptos complejos.',
    
    // Metodología
    'forense.legal.methodology.title': 'nuestra metodología',
    'forense.legal.methodology.analysis': 'análisis preliminar',
    'forense.legal.methodology.analysis.desc': 'evaluamos minuciosamente los documentos, informes y evidencias disponibles, identificando puntos críticos y oportunidades estratégicas. esta fase establece las bases para una consultoría eficaz y dirigida a los objetivos del cliente.',
    'forense.legal.methodology.planning': 'planificación estratégica',
    'forense.legal.methodology.planning.desc': 'desarrollamos una estrategia personalizada que integra aspectos jurídicos y técnicos, estableciendo una línea de acción clara y fundamentada. cada acción es meticulosamente planificada para maximizar el impacto positivo en el caso.',
    'forense.legal.methodology.execution': 'ejecución técnica',
    'forense.legal.methodology.execution.desc': 'implementamos las estrategias definidas con rigor científico y precisión técnica, garantizando que cada información presentada sea verificable y sostenible. toda la actividad es documentada siguiendo estándares internacionales.',
    'forense.legal.methodology.communication': 'comunicación eficaz',
    'forense.legal.methodology.communication.desc': 'traducimos conceptos técnicos complejos en lenguaje accesible y persuasivo, apropiado para el contexto jurídico. nuestras presentaciones están estructuradas para transmitir claridad y convicción, facilitando el entendimiento por todos los involucrados.',
    
    // Beneficios
    'forense.legal.benefits.title': 'beneficios de nuestro soporte legal',
    'forense.legal.benefits.argumentation': 'argumentación robusta',
    'forense.legal.benefits.argumentation.desc': 'fortalecemos argumentos jurídicos con fundamentación técnica sólida, aumentando su credibilidad y poder de persuasión ante los tribunales y demás autoridades.',
    'forense.legal.benefits.vulnerabilities': 'identificación de vulnerabilidades',
    'forense.legal.benefits.vulnerabilities.desc': 'analizamos críticamente las evidencias y argumentos técnicos presentados por la parte contraria, identificando fallas metodológicas e inconsistencias que pueden ser explotadas estratégicamente.',
    'forense.legal.benefits.clarity': 'claridad técnica',
    'forense.legal.benefits.clarity.desc': 'facilitamos el entendimiento de cuestiones técnicas complejas por parte de jueces, abogados y demás involucrados en el proceso, evitando malentendidos e interpretaciones equivocadas.',
    'forense.legal.benefits.advantage': 'ventaja competitiva',
    'forense.legal.benefits.advantage.desc': 'proporcionamos un diferencial estratégico en casos complejos, donde el dominio del aspecto técnico de las evidencias digitales puede ser decisivo para el resultado final del proceso.',
    'forense.corporate.title': '¿qué son investigaciones corporativas?',
    'forense.corporate.why': 'por qué las investigaciones corporativas son esenciales',
    'forense.corporate.desc': 'investigaciones y auditoría digital para entornos corporativos',

    // Jobs page
    'jobs.seo.description': 'Explore las oportunidades de carrera en ness. y únase a nuestro equipo de expertos en tecnología.',
    'jobs.hero.subtitle': 'Únete a nuestro equipo de especialistas y construye una carrera exitosa en tecnología.',
    'jobs.filters.all': 'Todas las vacantes',
    'jobs.filters.remote': 'Remotas',
    'jobs.filters.office': 'Presenciales',
    'jobs.filters.hybrid': 'Híbridas',
    'jobs.viewDetails': 'Ver detalles y postularse',
    'jobs.noJobs.title': 'No se encontraron vacantes',
    'jobs.noJobs.description': 'No hay vacantes disponibles con los filtros seleccionados.',
    'jobs.benefits.title': 'Beneficios de trabajar con nosotros',
    'jobs.benefit1.title': 'Desarrollo profesional',
    'jobs.benefit1.desc': 'Invertimos continuamente en el desarrollo técnico y personal a través de capacitaciones, certificaciones y mentorías.',
    'jobs.benefit2.title': 'Ambiente colaborativo',
    'jobs.benefit2.desc': 'Trabajamos en equipos multidisciplinarios donde se fomenta la colaboración y el intercambio de conocimiento.',
    'jobs.benefit3.title': 'Flexibilidad y equilibrio',
    'jobs.benefit3.desc': 'Ofrecemos horarios flexibles, modelo híbrido e iniciativas que promueven el equilibrio entre vida personal y profesional.',

    // Contact page
    'contact.seo.description': 'Póngase en contacto con nuestro equipo para obtener más información sobre nuestros servicios de tecnología y seguridad.',
    'contact.hero.prefix': 'Ponte en',
    'contact.hero.highlight': 'contacto',
    'contact.hero.text': 'Estamos listos para ayudar a su empresa a alcanzar nuevos niveles de seguridad y eficiencia operativa. Hable con nuestros especialistas hoy mismo.',
    'contact.form.title': 'Envíe su mensaje',
    'contact.form.name': 'Nombre completo *',
    'contact.form.email': 'Correo electrónico *',
    'contact.form.company': 'Empresa *',
    'contact.form.phone': 'Teléfono *',
    'contact.form.subject': 'Asunto *',
    'contact.form.message': 'Mensaje *',
    'contact.form.verification': 'Verificación *',
    'contact.form.security': 'Verificación de Seguridad',
    'contact.form.notRobot': 'No soy un robot',
    'contact.form.protected': 'Protegido por reCAPTCHA -',
    'contact.form.privacy': 'Privacidad',
    'contact.form.terms': 'Términos',
    'contact.form.submit': 'Enviar mensaje',
    'contact.form.sending': 'Enviando...',
    'contact.toast.verify.title': 'Se requiere verificación',
    'contact.toast.verify.desc': 'Complete la verificación de captcha antes de enviar el formulario.',
    'contact.toast.success.title': 'Mensaje enviado',
    'contact.toast.success.desc': 'Gracias por contactarnos. Responderemos pronto.',
    'contact.toast.error.title': 'Error al enviar el mensaje',
    'contact.toast.error.desc': 'Ocurrió un error al enviar su mensaje. Por favor, inténtelo nuevamente.',
    'contact.info.title': 'Información de Contacto',
    'contact.info.office': 'Oficina',
    'contact.info.phones': 'Teléfonos',
    'contact.info.email': 'Correo electrónico',
    'contact.info.hours': 'Horario de Atención',
    'contact.info.weekdays': 'Lunes - Viernes:',
    'contact.info.emergency': 'Soporte de Emergencia:',
    'contact.info.follow': 'Síguenos',
    'contact.map.title': 'Mapa de Ubicación',
    'contact.map.placeholder': 'En un sitio real, aquí se cargaría un mapa interactivo.',

    // News page
    'news.seo.description': 'Manténgase al día con las últimas noticias de ness. y las novedades de tecnología.',
    'news.hero.subtitle': 'Mantente informado sobre nuestra empresa y el mercado de tecnología.',
    'news.filters.all': 'Todas las noticias',
    'news.filters.company': 'Empresa',
    'news.filters.technology': 'Tecnología',
    'news.filters.events': 'Eventos',
    'news.noNews.title': 'No se encontraron noticias',
    'news.noNews.description': 'No hay noticias disponibles con el filtro seleccionado.',
    'news.readMore': 'Leer más',
    'news.newsletter.title': 'Suscríbete a nuestro boletín',
    'news.newsletter.desc': 'Recibe las últimas novedades y artículos exclusivos directamente en tu correo.',
    'news.newsletter.placeholder': 'Tu correo electrónico',
    'news.newsletter.subscribe': 'Suscribirse',
    'news.newsletter.privacy': 'Respetamos tu privacidad. Puedes cancelar la suscripción en cualquier momento.',
  }
};

// Helper to detect browser language
export function detectBrowserLanguage(): Language {
  try {
    const browserLang = navigator.language.split('-')[0];
    
    if (browserLang === 'pt' || browserLang === 'en' || browserLang === 'es') {
      return browserLang as Language;
    }
  } catch (error) {
    console.error('Error detecting browser language:', error);
  }
  
  return DEFAULT_LANGUAGE;
}

// Create context
export const I18nContext = createContext<I18nContextType>({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  t: () => '',
  isLoading: false
});

// Provider component
export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize language from browser or localStorage on mount
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang') as Language | null;
      const savedLanguage = localStorage.getItem('language') as Language;
      const detectedLanguage = detectBrowserLanguage();
      
      const finalLanguage = langParam || savedLanguage || detectedLanguage;
      setLanguageState(finalLanguage);
      localStorage.setItem('language', finalLanguage);
    } catch (error) {
      console.error('Error setting language:', error);
      setLanguageState(DEFAULT_LANGUAGE);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Adiciona um evento de popstate para atualizar o idioma quando o usuário navega pelo histórico
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang') as Language | null;
      if (langParam && langParam !== language) {
        setLanguageState(langParam);
        localStorage.setItem('language', langParam);
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [language]);

  // Set language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Atualiza a URL com o novo idioma, mas sem recarregar a página
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.pushState({}, '', url.toString());
  };

  // Translation function
  const t = (key: string): string => {
    if (!translations[language]) return key;
    return translations[language][key] || key;
  };

  const contextValue = {
    language,
    setLanguage,
    t,
    isLoading
  };

  return createElement(I18nContext.Provider, { value: contextValue }, children);
}

// Helper function to create React elements without JSX
function createElement(type: any, props: any, ...children: any[]) {
  return {
    $$typeof: Symbol.for('react.element'),
    type,
    props: { ...props, children: children.length === 1 ? children[0] : children },
    key: null,
    ref: null,
  };
}

// Custom hook to use translations
export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// OpenAI translation API integration
export async function translateWithOpenAI(text: string, targetLanguage: Language): Promise<string> {
  try {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }
    
    console.log(`Would translate "${text}" to ${targetLanguage}`);
    
    // Implementation would call OpenAI API
    // For now, just return the original text
    return text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}
