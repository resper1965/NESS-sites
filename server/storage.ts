import { 
  users, type User, type InsertUser, 
  jobs, type Job, type InsertJob, 
  news, type News, type InsertNews, 
  contents, type Content, type InsertContent, 
  activityLogs, type ActivityLog, type InsertActivityLog,
  sites, type Site, type InsertSite,
  contentSites, type ContentSite, type InsertContentSite,
  landingPages, type LandingPage, type InsertLandingPage,
  siteSettings, type SiteSetting, type InsertSiteSetting,
  type SiteCode
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import connectPg from "connect-pg-simple";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

// Create memory store for sessions
const MemoryStore = createMemoryStore(session);

// Default content for pages by language
const defaultContent: Record<string, Record<string, Partial<Content>>> = {
  pt: {
    home: {
      title: "Página Inicial",
      description: "Bem-vindo ao nosso site institucional",
      content: "<h1>Bem-vindo à CorpTech</h1><p>Soluções tecnológicas para o seu negócio.</p>"
    },
    about: {
      title: "Quem Somos",
      description: "Conheça nossa história e valores",
      content: "<h1>Sobre a CorpTech</h1><p>Somos uma empresa especializada em soluções tecnológicas.</p>"
    },
    services: {
      title: "O Que Fazemos",
      description: "Conheça nossos serviços e soluções",
      content: "<h1>Nossos Serviços</h1><p>Oferecemos uma ampla gama de serviços tecnológicos.</p>"
    },
    ethics: {
      title: "Código de Ética",
      description: "Nossos princípios e valores éticos",
      content: "<h1>Código de Ética</h1><p>Acreditamos em conduzir nossos negócios com os mais altos padrões éticos.</p>"
    },
    privacy: {
      title: "Política de Segurança e Privacidade",
      description: "Como protegemos seus dados",
      content: "<h1>Política de Privacidade</h1><p>Valorizamos a segurança e privacidade de seus dados.</p>"
    }
  },
  en: {
    home: {
      title: "Home Page",
      description: "Welcome to our institutional website",
      content: "<h1>Welcome to CorpTech</h1><p>Technological solutions for your business.</p>"
    },
    about: {
      title: "About Us",
      description: "Learn about our history and values",
      content: "<h1>About CorpTech</h1><p>We are a company specialized in technological solutions.</p>"
    },
    services: {
      title: "What We Do",
      description: "Discover our services and solutions",
      content: "<h1>Our Services</h1><p>We offer a wide range of technological services.</p>"
    },
    ethics: {
      title: "Code of Ethics",
      description: "Our ethical principles and values",
      content: "<h1>Code of Ethics</h1><p>We believe in conducting our business with the highest ethical standards.</p>"
    },
    privacy: {
      title: "Security and Privacy Policy",
      description: "How we protect your data",
      content: "<h1>Privacy Policy</h1><p>We value the security and privacy of your data.</p>"
    }
  },
  es: {
    home: {
      title: "Página de Inicio",
      description: "Bienvenido a nuestro sitio web institucional",
      content: "<h1>Bienvenido a CorpTech</h1><p>Soluciones tecnológicas para su negocio.</p>"
    },
    about: {
      title: "Quiénes Somos",
      description: "Conozca nuestra historia y valores",
      content: "<h1>Sobre CorpTech</h1><p>Somos una empresa especializada en soluciones tecnológicas.</p>"
    },
    services: {
      title: "Qué Hacemos",
      description: "Descubra nuestros servicios y soluciones",
      content: "<h1>Nuestros Servicios</h1><p>Ofrecemos una amplia gama de servicios tecnológicos.</p>"
    },
    ethics: {
      title: "Código de Ética",
      description: "Nuestros principios y valores éticos",
      content: "<h1>Código de Ética</h1><p>Creemos en conducir nuestros negocios con los más altos estándares éticos.</p>"
    },
    privacy: {
      title: "Política de Seguridad y Privacidad",
      description: "Cómo protegemos sus datos",
      content: "<h1>Política de Privacidad</h1><p>Valoramos la seguridad y privacidad de sus datos.</p>"
    }
  }
};

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User>;
  
  // Site methods
  getSite(code: SiteCode): Promise<Site | undefined>;
  getAllSites(): Promise<Site[]>;
  createSite(site: InsertSite): Promise<Site>;
  updateSite(code: SiteCode, site: Partial<Site>): Promise<Site>;
  
  // Content methods
  getContent(pageId: string, language: string, siteCode?: SiteCode): Promise<Content | undefined>;
  createContent(content: InsertContent): Promise<Content>;
  updateContent(id: number, content: Partial<Content>): Promise<Content>;
  getContentCount(language: string, siteCode?: SiteCode): Promise<number>;
  
  // Content-Site associations
  associateContentToSite(contentId: number, contentType: string, siteCode: SiteCode): Promise<ContentSite>;
  removeContentFromSite(contentId: number, contentType: string, siteCode: SiteCode): Promise<void>;
  getContentSites(contentId: number, contentType: string): Promise<SiteCode[]>;
  
  // Landing Page methods
  getLandingPages(language: string, siteCode?: SiteCode): Promise<LandingPage[]>;
  getLandingPageBySlug(slug: string, language: string, siteCode?: SiteCode): Promise<LandingPage | undefined>;
  getLandingPage(id: number): Promise<LandingPage | undefined>;
  createLandingPage(landingPage: InsertLandingPage): Promise<LandingPage>;
  updateLandingPage(id: number, landingPage: Partial<LandingPage>): Promise<LandingPage>;
  deleteLandingPage(id: number): Promise<void>;
  
  // Job methods
  getJobs(language: string, siteCode?: SiteCode): Promise<Job[]>;
  getFeaturedJobs(language: string, siteCode?: SiteCode): Promise<Job[]>;
  getJob(id: number, language: string): Promise<Job | undefined>;
  getJobBySlug(slug: string, language: string, siteCode?: SiteCode): Promise<Job | undefined>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: number, job: Partial<Job>): Promise<Job>;
  deleteJob(id: number): Promise<void>;
  getJobCount(language: string, siteCode?: SiteCode): Promise<number>;
  
  // News methods
  getNewsItems(language: string, siteCode?: SiteCode): Promise<News[]>;
  getLatestNews(language: string, siteCode?: SiteCode): Promise<News[]>;
  getNewsItem(id: number, language: string, siteCode?: SiteCode): Promise<News | undefined>;
  getNewsBySlug(slug: string, language: string, siteCode?: SiteCode): Promise<News | undefined>;
  createNewsItem(newsItem: InsertNews): Promise<News>;
  updateNewsItem(id: number, newsItem: Partial<News>): Promise<News>;
  deleteNewsItem(id: number): Promise<void>;
  getNewsCount(language: string, siteCode?: SiteCode): Promise<number>;
  
  // Activity logs
  createActivityLog(log: InsertActivityLog): Promise<ActivityLog>;
  getRecentActivities(): Promise<ActivityLog[]>;
  
  // Settings methods
  getSetting(key: string, language: string): Promise<SiteSetting | undefined>;
  getSettings(language: string): Promise<SiteSetting[]>;
  getAllSettings(): Promise<SiteSetting[]>;
  createSetting(setting: InsertSiteSetting): Promise<SiteSetting>;
  updateSetting(key: string, language: string, value: string): Promise<SiteSetting>;
  
  // Session store
  sessionStore: session.SessionStore;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contents: Map<number, Content>;
  private jobsData: Map<number, Job>;
  private newsData: Map<number, News>;
  private activities: Map<number, ActivityLog>;
  private contentSiteLinks: ContentSite[];
  
  sessionStore: session.SessionStore;
  currentId: number;
  contentId: number;
  jobId: number;
  newsId: number;
  activityId: number;

  constructor() {
    this.users = new Map();
    this.contents = new Map();
    this.jobsData = new Map();
    this.newsData = new Map();
    this.activities = new Map();
    this.contentSiteLinks = [];
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // 24h
    });
    
    this.currentId = 1;
    this.contentId = 1;
    this.jobId = 1;
    this.newsId = 1;
    this.activityId = 1;
    
    
    // Initialize with default content
    this.initializeDefaultContent();
    
    // Initialize with sample jobs
    this.initializeSampleJobs();
    
    // Initialize with sample news
    this.initializeSampleNews();
  }

  // Initialize default content for all pages and languages
  private async initializeDefaultContent() {
    const languages = ["pt", "en", "es"];
    const pageIds = ["home", "about", "services", "ethics", "privacy"];
    
    for (const lang of languages) {
      for (const pageId of pageIds) {
        const defaultData = defaultContent[lang][pageId];
        if (defaultData) {
          await this.createContent({
            pageId,
            language: lang,
            title: defaultData.title || "",
            description: defaultData.description || "",
            content: defaultData.content || "",
            metadata: {},
          });
        }
      }
    }
  }

  // Initialize sample jobs
  private async initializeSampleJobs() {
    const sampleJobs = [
      {
        title: "Desenvolvedor Full Stack",
        location: "Remoto - Brasil",
        locationType: "remote",
        type: "Integral",
        summary: "Buscamos um desenvolvedor full stack com experiência em Node.js, React e bancos de dados NoSQL para integrar nossa equipe de produtos digitais.",
        description: "Descrição detalhada da vaga de desenvolvedor full stack.",
        requirements: "Experiência com Node.js, React, MongoDB e AWS.",
        language: "pt",
        active: true,
        tags: [{ name: "Node.js" }, { name: "React" }, { name: "MongoDB" }, { name: "AWS" }],
      },
      {
        title: "Especialista em Segurança da Informação",
        location: "São Paulo, SP",
        locationType: "office",
        type: "Integral",
        summary: "Procuramos um especialista em segurança da informação para implementar e gerenciar soluções de proteção de dados e sistemas para nossos clientes.",
        description: "Descrição detalhada da vaga de especialista em segurança.",
        requirements: "Certificações em segurança, experiência com LGPD e ISO 27001.",
        language: "pt",
        active: true,
        tags: [{ name: "ISO 27001" }, { name: "Pentest" }, { name: "LGPD" }, { name: "Análise de Vulnerabilidades" }],
      }
    ];
    
    for (const job of sampleJobs) {
      await this.createJob(job);
    }
  }

  // Initialize sample news
  private async initializeSampleNews() {
    const sampleNews = [
      {
        title: "Nova parceria estratégica para expansão internacional",
        summary: "Nossa empresa firmou uma parceria estratégica com o grupo internacional TechGlobal para expandir a oferta de soluções em segurança da informação para América Latina.",
        content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.</p>",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        date: "2023-06-15",
        category: "company",
        language: "pt",
        featured: true,
      },
      {
        title: "Lançamento da nova plataforma de analytics",
        summary: "Apresentamos nossa nova plataforma de analytics com inteligência artificial, que permitirá aos clientes obter insights mais precisos e em tempo real sobre seus negócios.",
        content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.</p>",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        date: "2023-06-03",
        category: "technology",
        language: "pt",
        featured: false,
      },
      {
        title: "Participação em evento global de tecnologia",
        summary: "Nossa equipe marcou presença no TechSummit 2023, um dos maiores eventos globais de tecnologia, apresentando nossas soluções inovadoras em segurança digital.",
        content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.</p>",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        date: "2023-05-22",
        category: "events",
        language: "pt",
        featured: false,
      }
    ];
    
    for (const item of sampleNews) {
      await this.createNewsItem(item);
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id,
      isAdmin: insertUser.isAdmin || false,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.getUser(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    
    const updatedUser: User = {
      ...user,
      ...userData,
      id: user.id, // Ensure ID cannot be changed
      createdAt: user.createdAt // Ensure createdAt cannot be changed
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Content methods
  async getContent(pageId: string, language: string, siteCode?: SiteCode): Promise<Content | undefined> {
    const matches = Array.from(this.contents.values()).filter(
      (content) => content.pageId === pageId && content.language === language
    );

    if (siteCode) {
      return matches.find(content =>
        this.contentSiteLinks.some(link =>
          link.contentId === content.id &&
          link.contentType === 'content' &&
          link.siteCode === siteCode
        )
      );
    }

    return matches[0];
  }

  async createContent(content: InsertContent): Promise<Content> {
    const id = this.contentId++;
    const now = new Date();
    const newContent: Content = {
      ...content,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.contents.set(id, newContent);
    return newContent;
  }

  async updateContent(id: number, content: Partial<Content>): Promise<Content> {
    const existing = this.contents.get(id);
    if (!existing) {
      throw new Error(`Content with ID ${id} not found`);
    }
    
    const updated: Content = {
      ...existing,
      ...content,
      updatedAt: new Date()
    };
    
    this.contents.set(id, updated);
    return updated;
  }

  async getContentCount(language: string, siteCode?: SiteCode): Promise<number> {
    let items = Array.from(this.contents.values()).filter(
      (content) => content.language === language
    );

    if (siteCode) {
      items = items.filter(content =>
        this.contentSiteLinks.some(link =>
          link.contentId === content.id &&
          link.contentType === 'content' &&
          link.siteCode === siteCode
        )
      );
    }

    return items.length;
  }

  async associateContentToSite(contentId: number, contentType: string, siteCode: SiteCode): Promise<ContentSite> {
    const link: ContentSite = { contentId, contentType, siteCode };
    this.contentSiteLinks.push(link);
    return link;
  }

  async removeContentFromSite(contentId: number, contentType: string, siteCode: SiteCode): Promise<void> {
    this.contentSiteLinks = this.contentSiteLinks.filter(
      l => !(l.contentId === contentId && l.contentType === contentType && l.siteCode === siteCode)
    );
  }

  async getContentSites(contentId: number, contentType: string): Promise<SiteCode[]> {
    return this.contentSiteLinks
      .filter(l => l.contentId === contentId && l.contentType === contentType)
      .map(l => l.siteCode);
  }

  // Job methods
  async getJobs(language: string, siteCode?: SiteCode): Promise<Job[]> {
    let items = Array.from(this.jobsData.values())
      .filter(job => job.language === language);

    if (siteCode) {
      items = items.filter(job =>
        this.contentSiteLinks.some(link =>
          link.contentId === job.id &&
          link.contentType === 'job' &&
          link.siteCode === siteCode
        )
      );
    }

    return items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getFeaturedJobs(language: string, siteCode?: SiteCode): Promise<Job[]> {
    let items = Array.from(this.jobsData.values())
      .filter(job => job.language === language && job.active);

    if (siteCode) {
      items = items.filter(job =>
        this.contentSiteLinks.some(link =>
          link.contentId === job.id &&
          link.contentType === 'job' &&
          link.siteCode === siteCode
        )
      );
    }

    return items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 4);
  }

  async getJob(id: number, language: string): Promise<Job | undefined> {
    const job = this.jobsData.get(id);
    if (job && job.language === language) {
      return job;
    }
    return undefined;
  }

  async getJobBySlug(slug: string, language: string, _siteCode?: SiteCode): Promise<Job | undefined> {
    return Array.from(this.jobsData.values()).find(
      (job) => job.slug === slug && job.language === language
    );
  }

  async createJob(job: InsertJob): Promise<Job> {
    const id = this.jobId++;
    const now = new Date();
    const newJob: Job = {
      ...job,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.jobsData.set(id, newJob);
    return newJob;
  }

  async updateJob(id: number, job: Partial<Job>): Promise<Job> {
    const existing = this.jobsData.get(id);
    if (!existing) {
      throw new Error(`Job with ID ${id} not found`);
    }
    
    const updated: Job = {
      ...existing,
      ...job,
      updatedAt: new Date()
    };
    
    this.jobsData.set(id, updated);
    return updated;
  }

  async deleteJob(id: number): Promise<void> {
    this.jobsData.delete(id);
  }

  async getJobCount(language: string, siteCode?: SiteCode): Promise<number> {
    let items = Array.from(this.jobsData.values()).filter(
      (job) => job.language === language
    );

    if (siteCode) {
      items = items.filter(job =>
        this.contentSiteLinks.some(link =>
          link.contentId === job.id &&
          link.contentType === 'job' &&
          link.siteCode === siteCode
        )
      );
    }

    return items.length;
  }

  // News methods
  async getNewsItems(language: string, siteCode?: SiteCode): Promise<News[]> {
    let items = Array.from(this.newsData.values())
      .filter(news => news.language === language);

    if (siteCode) {
      items = items.filter(news =>
        this.contentSiteLinks.some(link =>
          link.contentId === news.id &&
          link.contentType === 'news' &&
          link.siteCode === siteCode
        )
      );
    }

    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async getLatestNews(language: string, siteCode?: SiteCode): Promise<News[]> {
    const items = await this.getNewsItems(language, siteCode);
    return items.slice(0, 3);
  }

  async getNewsItem(id: number, language: string, siteCode?: SiteCode): Promise<News | undefined> {
    const newsItem = this.newsData.get(id);
    if (!newsItem || newsItem.language !== language) {
      return undefined;
    }

    if (siteCode) {
      const match = this.contentSiteLinks.some(link =>
        link.contentId === id &&
        link.contentType === 'news' &&
        link.siteCode === siteCode
      );
      if (!match) return undefined;
    }

    return newsItem;
  }

  async getNewsBySlug(slug: string, language: string, _siteCode?: SiteCode): Promise<News | undefined> {
    return Array.from(this.newsData.values()).find(
      (item) => item.slug === slug && item.language === language
    );
  }

  async createNewsItem(newsItem: InsertNews): Promise<News> {
    const id = this.newsId++;
    const now = new Date();
    const newNewsItem: News = {
      ...newsItem,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.newsData.set(id, newNewsItem);
    return newNewsItem;
  }

  async updateNewsItem(id: number, newsItem: Partial<News>): Promise<News> {
    const existing = this.newsData.get(id);
    if (!existing) {
      throw new Error(`News item with ID ${id} not found`);
    }
    
    const updated: News = {
      ...existing,
      ...newsItem,
      updatedAt: new Date()
    };
    
    this.newsData.set(id, updated);
    return updated;
  }

  async deleteNewsItem(id: number): Promise<void> {
    this.newsData.delete(id);
  }

  async getNewsCount(language: string, siteCode?: SiteCode): Promise<number> {
    let items = Array.from(this.newsData.values()).filter(
      (news) => news.language === language
    );

    if (siteCode) {
      items = items.filter(news =>
        this.contentSiteLinks.some(link =>
          link.contentId === news.id &&
          link.contentType === 'news' &&
          link.siteCode === siteCode
        )
      );
    }

    return items.length;
  }

  // Activity logs
  async createActivityLog(log: InsertActivityLog): Promise<ActivityLog> {
    const id = this.activityId++;
    const now = new Date();
    const newLog: ActivityLog = {
      ...log,
      id,
      createdAt: now
    };
    this.activities.set(id, newLog);
    return newLog;
  }

  async getRecentActivities(): Promise<ActivityLog[]> {
    return Array.from(this.activities.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5);
  }
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;
  
  constructor() {
    // Use PostgreSQL session store
    const PostgresSessionStore = connectPg(session);
    
    this.sessionStore = new PostgresSessionStore({
      createTableIfMissing: true,
      tableName: 'sessions',
      conObject: {
        connectionString: process.env.DATABASE_URL,
      }
    });
    
    // Initialize the database with default content
    this.initializeDefaults().catch(err => {
      console.error("Error initializing database:", err);
    });
  }

  // Site methods
  async getSite(code: SiteCode): Promise<Site | undefined> {
    const [site] = await db.select().from(sites).where(eq(sites.code, code));
    return site;
  }
  
  async getAllSites(): Promise<Site[]> {
    return await db.select().from(sites);
  }
  
  async createSite(site: InsertSite): Promise<Site> {
    const [newSite] = await db.insert(sites).values(site).returning();
    return newSite;
  }
  
  async updateSite(code: SiteCode, site: Partial<Site>): Promise<Site> {
    const [updated] = await db.update(sites)
      .set({ ...site, updatedAt: new Date() })
      .where(eq(sites.code, code))
      .returning();
      
    return updated;
  }
  
  // Content-Site associations
  async associateContentToSite(contentId: number, contentType: string, siteCode: SiteCode): Promise<ContentSite> {
    const [result] = await db.insert(contentSites)
      .values({ contentId, contentType, siteCode })
      .returning();
      
    return result;
  }
  
  async removeContentFromSite(contentId: number, contentType: string, siteCode: SiteCode): Promise<void> {
    await db.delete(contentSites)
      .where(and(
        eq(contentSites.contentId, contentId),
        eq(contentSites.contentType, contentType),
        eq(contentSites.siteCode, siteCode)
      ));
  }
  
  async getContentSites(contentId: number, contentType: string): Promise<SiteCode[]> {
    const results = await db.select({ siteCode: contentSites.siteCode })
      .from(contentSites)
      .where(and(
        eq(contentSites.contentId, contentId),
        eq(contentSites.contentType, contentType)
      ));
      
    return results.map(r => r.siteCode);
  }
  
  // Landing Page methods
  async getLandingPages(language: string, siteCode?: SiteCode): Promise<LandingPage[]> {
    let pages;
    
    if (siteCode) {
      // Get landing pages specific to the site
      pages = await db.select().from(landingPages)
        .innerJoin(contentSites, and(
          eq(contentSites.contentId, landingPages.id),
          eq(contentSites.contentType, 'landing_page'),
          eq(contentSites.siteCode, siteCode)
        ))
        .where(eq(landingPages.language, language));
        
      return pages.map(p => p.landing_pages);
    } else {
      // Get generic landing pages
      return await db.select().from(landingPages)
        .where(eq(landingPages.language, language));
    }
  }
  
  async getLandingPageBySlug(slug: string, language: string, siteCode?: SiteCode): Promise<LandingPage | undefined> {
    let page;
    
    if (siteCode) {
      // Get landing page specific to the site
      const [result] = await db.select().from(landingPages)
        .innerJoin(contentSites, and(
          eq(contentSites.contentId, landingPages.id),
          eq(contentSites.contentType, 'landing_page'),
          eq(contentSites.siteCode, siteCode)
        ))
        .where(and(
          eq(landingPages.slug, slug),
          eq(landingPages.language, language)
        ));
        
      page = result ? result.landing_pages : undefined;
    } else {
      // Get generic landing page
      const [result] = await db.select().from(landingPages)
        .where(and(
          eq(landingPages.slug, slug),
          eq(landingPages.language, language)
        ));
        
      page = result;
    }
    
    return page;
  }
  
  async getLandingPage(id: number): Promise<LandingPage | undefined> {
    const [page] = await db.select().from(landingPages).where(eq(landingPages.id, id));
    return page;
  }
  
  async createLandingPage(landingPage: InsertLandingPage): Promise<LandingPage> {
    const [newPage] = await db.insert(landingPages).values(landingPage).returning();
    return newPage;
  }
  
  async updateLandingPage(id: number, landingPage: Partial<LandingPage>): Promise<LandingPage> {
    const [updated] = await db.update(landingPages)
      .set({ ...landingPage, updatedAt: new Date() })
      .where(eq(landingPages.id, id))
      .returning();
      
    return updated;
  }
  
  async deleteLandingPage(id: number): Promise<void> {
    await db.delete(landingPages).where(eq(landingPages.id, id));
  }
  
  // Initialize defaults if needed
  private async initializeDefaults() {
    // Check if users table is empty
    const result = await db.select({ count: users.id }).from(users);
    const usersCount = parseInt(result[0]?.count as unknown as string, 10) || 0;
    
    if (usersCount === 0) {
      // Initialize default content
      await this.initializeDefaultContent();

      // Initialize sample jobs and news
      await this.initializeSampleJobs();
      await this.initializeSampleNews();
    }
  }
  
  // Initialize default content for all pages and languages
  private async initializeDefaultContent() {
    console.log("Initializing default content...");
    const languages = ["pt", "en", "es"];
    const pageIds = ["home", "about", "services", "ethics", "privacy"];
    
    for (const lang of languages) {
      for (const pageId of pageIds) {
        const defaultData = defaultContent[lang][pageId];
        if (defaultData) {
          await this.createContent({
            pageId,
            language: lang,
            title: defaultData.title || "",
            description: defaultData.description || "",
            content: defaultData.content || "",
            metadata: {},
          });
        }
      }
    }
  }
  
  // Initialize sample jobs
  private async initializeSampleJobs() {
    console.log("Initializing sample jobs...");
    const sampleJobs = [
      {
        title: "Desenvolvedor Full Stack",
        location: "Remoto - Brasil",
        locationType: "remote",
        type: "Integral",
        summary: "Buscamos um desenvolvedor full stack com experiência em Node.js, React e bancos de dados NoSQL para integrar nossa equipe de produtos digitais.",
        description: "Descrição detalhada da vaga de desenvolvedor full stack.",
        requirements: "Experiência com Node.js, React, MongoDB e AWS.",
        language: "pt",
        active: true,
        tags: [{ name: "Node.js" }, { name: "React" }, { name: "MongoDB" }, { name: "AWS" }],
      },
      {
        title: "Especialista em Segurança da Informação",
        location: "São Paulo, SP",
        locationType: "office",
        type: "Integral",
        summary: "Procuramos um especialista em segurança da informação para implementar e gerenciar soluções de proteção de dados e sistemas para nossos clientes.",
        description: "Descrição detalhada da vaga de especialista em segurança.",
        requirements: "Certificações em segurança, experiência com LGPD e ISO 27001.",
        language: "pt",
        active: true,
        tags: [{ name: "ISO 27001" }, { name: "Pentest" }, { name: "LGPD" }, { name: "Análise de Vulnerabilidades" }],
      }
    ];
    
    for (const job of sampleJobs) {
      await this.createJob(job);
    }
  }
  
  // Initialize sample news
  private async initializeSampleNews() {
    console.log("Initializing sample news...");
    const sampleNews = [
      {
        title: "Nova parceria estratégica para expansão internacional",
        summary: "Nossa empresa firmou uma parceria estratégica com o grupo internacional TechGlobal para expandir a oferta de soluções em segurança da informação para América Latina.",
        content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.</p>",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        date: "2023-06-15",
        category: "company",
        language: "pt",
        featured: true,
      },
      {
        title: "Lançamento da nova plataforma de analytics",
        summary: "Apresentamos nossa nova plataforma de analytics com inteligência artificial, que permitirá aos clientes obter insights mais precisos e em tempo real sobre seus negócios.",
        content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.</p>",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        date: "2023-06-03",
        category: "technology",
        language: "pt",
        featured: false,
      }
    ];
    
    for (const item of sampleNews) {
      await this.createNewsItem(item);
    }
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    
    return user;
  }
  
  // Content methods
  async getContent(pageId: string, language: string, siteCode?: SiteCode): Promise<Content | undefined> {
    if (siteCode) {
      const [row] = await db
        .select({ content: contents })
        .from(contentSites)
        .innerJoin(contents, eq(contentSites.contentId, contents.id))
        .where(and(
          eq(contentSites.contentType, 'content'),
          eq(contentSites.siteCode, siteCode),
          eq(contents.pageId, pageId),
          eq(contents.language, language),
        ));

      return row?.content;
    }

    const [content] = await db
      .select()
      .from(contents)
      .where(and(
        eq(contents.pageId, pageId),
        eq(contents.language, language),
      ));

    return content;
  }
  
  async createContent(content: InsertContent): Promise<Content> {
    const [newContent] = await db.insert(contents).values(content).returning();
    return newContent;
  }
  
  async updateContent(id: number, content: Partial<Content>): Promise<Content> {
    const [updated] = await db.update(contents)
      .set({ ...content, updatedAt: new Date() })
      .where(eq(contents.id, id))
      .returning();
      
    if (!updated) {
      throw new Error(`Content with ID ${id} not found`);
    }
    
    return updated;
  }
  
  async getContentCount(language: string, siteCode?: SiteCode): Promise<number> {
    let result;
    if (siteCode) {
      result = await db.select({ count: contents.id })
        .from(contentSites)
        .innerJoin(contents, eq(contentSites.contentId, contents.id))
        .where(and(
          eq(contentSites.contentType, 'content'),
          eq(contentSites.siteCode, siteCode),
          eq(contents.language, language)
        ));
    } else {
      result = await db.select({ count: contents.id })
        .from(contents)
        .where(eq(contents.language, language));
    }

    return parseInt(result[0].count as unknown as string, 10) || 0;
  }
  
  // Job methods
  async getJobs(language: string, siteCode?: SiteCode): Promise<Job[]> {
    if (siteCode) {
      const rows = await db.select({ job: jobs })
        .from(jobs)
        .innerJoin(contentSites, and(
          eq(contentSites.contentId, jobs.id),
          eq(contentSites.contentType, 'job'),
          eq(contentSites.siteCode, siteCode)
        ))
        .where(eq(jobs.language, language))
        .orderBy(desc(jobs.createdAt));
      return rows.map(r => r.job ?? r.jobs);
    }

    return await db.select().from(jobs)
      .where(eq(jobs.language, language))
      .orderBy(desc(jobs.createdAt));
  }
  
  async getFeaturedJobs(language: string, siteCode?: SiteCode): Promise<Job[]> {
    if (siteCode) {
      const rows = await db.select({ job: jobs })
        .from(jobs)
        .innerJoin(contentSites, and(
          eq(contentSites.contentId, jobs.id),
          eq(contentSites.contentType, 'job'),
          eq(contentSites.siteCode, siteCode)
        ))
        .where(and(eq(jobs.language, language), eq(jobs.active, true)))
        .orderBy(desc(jobs.createdAt))
        .limit(4);
      return rows.map(r => r.job ?? r.jobs);
    }

    return await db.select().from(jobs)
      .where(and(eq(jobs.language, language), eq(jobs.active, true)))
      .orderBy(desc(jobs.createdAt))
      .limit(4);
  }
  
  async getJob(id: number, language: string): Promise<Job | undefined> {
    const [job] = await db.select().from(jobs)
      .where(and(eq(jobs.id, id), eq(jobs.language, language)));
    return job;
  }

  async getJobBySlug(slug: string, language: string, siteCode?: SiteCode): Promise<Job | undefined> {
    let job;

    if (siteCode) {
      const [result] = await db.select().from(jobs)
        .innerJoin(contentSites, and(
          eq(contentSites.contentId, jobs.id),
          eq(contentSites.contentType, 'job'),
          eq(contentSites.siteCode, siteCode)
        ))
        .where(and(
          eq(jobs.slug, slug),
          eq(jobs.language, language)
        ));

      job = result ? result.jobs : undefined;
    } else {
      const [result] = await db.select().from(jobs)
        .where(and(
          eq(jobs.slug, slug),
          eq(jobs.language, language)
        ));

      job = result;
    }

    return job;
  }
  
  async createJob(job: InsertJob): Promise<Job> {
    const [newJob] = await db.insert(jobs).values(job).returning();
    return newJob;
  }
  
  async updateJob(id: number, job: Partial<Job>): Promise<Job> {
    const [updated] = await db.update(jobs)
      .set({ ...job, updatedAt: new Date() })
      .where(eq(jobs.id, id))
      .returning();
      
    if (!updated) {
      throw new Error(`Job with ID ${id} not found`);
    }
    
    return updated;
  }
  
  async deleteJob(id: number): Promise<void> {
    await db.delete(jobs).where(eq(jobs.id, id));
  }
  
  async getJobCount(language: string, siteCode?: SiteCode): Promise<number> {
    let result;
    if (siteCode) {
      result = await db.select({ count: jobs.id })
        .from(contentSites)
        .innerJoin(jobs, eq(contentSites.contentId, jobs.id))
        .where(and(
          eq(contentSites.contentType, 'job'),
          eq(contentSites.siteCode, siteCode),
          eq(jobs.language, language)
        ));
    } else {
      result = await db.select({ count: jobs.id })
        .from(jobs)
        .where(eq(jobs.language, language));
    }

    return parseInt(result[0].count as unknown as string, 10) || 0;
  }
  
  // News methods
  async getNewsItems(language: string, siteCode?: SiteCode): Promise<News[]> {
    if (siteCode) {
      const rows = await db.select({ item: news })
        .from(news)
        .innerJoin(contentSites, and(
          eq(contentSites.contentId, news.id),
          eq(contentSites.contentType, 'news'),
          eq(contentSites.siteCode, siteCode)
        ))
        .where(eq(news.language, language))
        .orderBy(desc(news.date));
      return rows.map(r => r.item ?? r.news);
    }

    return await db.select().from(news)
      .where(eq(news.language, language))
      .orderBy(desc(news.date));
  }
  
  async getLatestNews(language: string, siteCode?: SiteCode): Promise<News[]> {
    const items = await this.getNewsItems(language, siteCode);
    return items.slice(0, 3);
  }
  
  async getNewsItem(id: number, language: string, siteCode?: SiteCode): Promise<News | undefined> {
    if (siteCode) {
      const [result] = await db.select({ item: news })
        .from(news)
        .innerJoin(contentSites, and(
          eq(contentSites.contentId, news.id),
          eq(contentSites.contentType, 'news'),
          eq(contentSites.siteCode, siteCode)
        ))
        .where(and(eq(news.id, id), eq(news.language, language)));
      return result ? result.item ?? result.news : undefined;
    }

    const [newsItem] = await db.select().from(news)
      .where(and(eq(news.id, id), eq(news.language, language)));
    return newsItem;
  }

  async getNewsBySlug(slug: string, language: string, siteCode?: SiteCode): Promise<News | undefined> {
    let item;

    if (siteCode) {
      const [result] = await db.select().from(news)
        .innerJoin(contentSites, and(
          eq(contentSites.contentId, news.id),
          eq(contentSites.contentType, 'news'),
          eq(contentSites.siteCode, siteCode)
        ))
        .where(and(
          eq(news.slug, slug),
          eq(news.language, language)
        ));

      item = result ? result.news : undefined;
    } else {
      const [result] = await db.select().from(news)
        .where(and(
          eq(news.slug, slug),
          eq(news.language, language)
        ));

      item = result;
    }

    return item;
  }
  
  async createNewsItem(newsItem: InsertNews): Promise<News> {
    const [newNewsItem] = await db.insert(news).values(newsItem).returning();
    return newNewsItem;
  }
  
  async updateNewsItem(id: number, newsItem: Partial<News>): Promise<News> {
    const [updated] = await db.update(news)
      .set({ ...newsItem, updatedAt: new Date() })
      .where(eq(news.id, id))
      .returning();
      
    if (!updated) {
      throw new Error(`News item with ID ${id} not found`);
    }
    
    return updated;
  }
  
  async deleteNewsItem(id: number): Promise<void> {
    await db.delete(news).where(eq(news.id, id));
  }
  
  async getNewsCount(language: string, siteCode?: SiteCode): Promise<number> {
    let result;
    if (siteCode) {
      result = await db.select({ count: news.id })
        .from(contentSites)
        .innerJoin(news, eq(contentSites.contentId, news.id))
        .where(and(
          eq(contentSites.contentType, 'news'),
          eq(contentSites.siteCode, siteCode),
          eq(news.language, language)
        ));
    } else {
      result = await db.select({ count: news.id })
        .from(news)
        .where(eq(news.language, language));
    }

    return parseInt(result[0].count as unknown as string, 10) || 0;
  }
  
  // Activity logs
  async createActivityLog(log: InsertActivityLog): Promise<ActivityLog> {
    const [newLog] = await db.insert(activityLogs).values(log).returning();
    return newLog;
  }
  
  async getRecentActivities(): Promise<ActivityLog[]> {
    return await db.select().from(activityLogs)
      .orderBy(desc(activityLogs.createdAt))
      .limit(5);
  }

  // Settings methods
  async getSetting(key: string, language: string): Promise<SiteSetting | undefined> {
    const [setting] = await db
      .select()
      .from(siteSettings)
      .where(and(eq(siteSettings.key, key), eq(siteSettings.language, language)));
    return setting || undefined;
  }

  async getSettings(language: string): Promise<SiteSetting[]> {
    const settings = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.language, language));
    return settings;
  }

  async getAllSettings(): Promise<SiteSetting[]> {
    const settings = await db
      .select()
      .from(siteSettings)
      .orderBy(siteSettings.key, siteSettings.language);
    return settings;
  }

  async createSetting(setting: InsertSiteSetting): Promise<SiteSetting> {
    const [newSetting] = await db
      .insert(siteSettings)
      .values(setting)
      .returning();
    return newSetting;
  }

  async updateSetting(key: string, language: string, value: string): Promise<SiteSetting> {
    const existingSetting = await this.getSetting(key, language);
    
    if (existingSetting) {
      const [updatedSetting] = await db
        .update(siteSettings)
        .set({ 
          value, 
          updatedAt: new Date() 
        })
        .where(and(eq(siteSettings.key, key), eq(siteSettings.language, language)))
        .returning();
      return updatedSetting;
    } else {
      return await this.createSetting({ key, value, language });
    }
  }
}

// Export a storage instance based on environment
export const storage: IStorage =
  process.env.USE_MEM_STORAGE === 'true' || process.env.NODE_ENV === 'test'
    ? new MemStorage()
    : new DatabaseStorage();
