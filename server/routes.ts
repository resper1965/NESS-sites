import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth, requireAdmin } from "./auth";
import { storage, type IStorage } from "./storage";
import { ContentService } from "./content-service";
import { SiteCode, SITE_CODES } from "@shared/schema";

export async function registerRoutes(app: Express, store: IStorage = storage): Promise<Server> {
  // Setup authentication routes and middleware
  setupAuth(app, store);

  // Initialize content service
  const contentService = new ContentService(store);

  // API Routes
  // =====================================

  // Content Routes
  app.get("/api/content/:pageId", async (req, res) => {
    try {
      const { pageId } = req.params;
      const lang = req.query.lang?.toString() || "pt";
      const site = req.query.site?.toString();
      
      // Verifica se o site é válido
      const siteCode = site && (SITE_CODES as readonly string[]).includes(site) 
        ? site as SiteCode 
        : undefined;
      
      const content = await contentService.getContent(pageId, lang, siteCode);
      
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      
      res.json(content);
    } catch (error) {
      console.error("Error fetching content:", error);
      res.status(500).json({ message: "Error fetching content" });
    }
  });

  app.put("/api/content/:pageId", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { pageId } = req.params;
      const lang = req.query.lang?.toString() || "pt";
      const site = req.query.site?.toString();
      const content = req.body;

      // Verifica se o site é válido
      const siteCode = site && (SITE_CODES as readonly string[]).includes(site) 
        ? site as SiteCode 
        : undefined;

      const result = await contentService.updateContent(pageId, lang, content, siteCode);
      
      // Log activity
      await storage.createActivityLog({
        userId: req.user!.id,
        action: "update",
        entityType: "content",
        entityId: pageId,
        details: { language: lang, site: siteCode }
      });
      
      res.json(result);
    } catch (error) {
      console.error("Error updating content:", error);
      res.status(500).json({ message: "Error updating content" });
    }
  });

  // Jobs Routes
  app.get("/api/jobs", async (req, res) => {
    try {
      const lang = req.query.lang?.toString() || "pt";
      const site = req.query.site?.toString();
      
      // Verifica se o site é válido
      const siteCode = site && (SITE_CODES as readonly string[]).includes(site) 
        ? site as SiteCode 
        : undefined;
      
      const jobs = await storage.getJobs(lang, siteCode);
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ message: "Error fetching jobs" });
    }
  });

  app.get("/api/jobs/featured", async (req, res) => {
    try {
      const lang = req.query.lang?.toString() || "pt";
      const site = req.query.site?.toString();
      
      // Verifica se o site é válido
      const siteCode = site && (SITE_CODES as readonly string[]).includes(site) 
        ? site as SiteCode 
        : undefined;
      
      const jobs = await storage.getFeaturedJobs(lang, siteCode);
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching featured jobs:", error);
      res.status(500).json({ message: "Error fetching featured jobs" });
    }
  });

  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const lang = req.query.lang?.toString() || "pt";
      const job = await storage.getJob(parseInt(id), lang);
      
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      
      res.json(job);
    } catch (error) {
      res.status(500).json({ message: "Error fetching job" });
    }
  });

  app.post("/api/jobs", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const job = req.body;
      const lang = req.query.lang?.toString() || "pt";
      
      const result = await storage.createJob({
        ...job,
        language: lang
      });
      
      // Log activity
      await storage.createActivityLog({
        userId: req.user!.id,
        action: "create",
        entityType: "job",
        entityId: result.id.toString(),
        details: { title: result.title }
      });
      
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error creating job" });
    }
  });

  app.put("/api/jobs/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { id } = req.params;
      const job = req.body;
      const lang = req.query.lang?.toString() || "pt";
      
      const result = await storage.updateJob(parseInt(id), {
        ...job,
        language: lang
      });
      
      // Log activity
      await storage.createActivityLog({
        userId: req.user!.id,
        action: "update",
        entityType: "job",
        entityId: id,
        details: { title: job.title }
      });
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Error updating job" });
    }
  });

  app.delete("/api/jobs/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { id } = req.params;
      await storage.deleteJob(parseInt(id));
      
      // Log activity
      await storage.createActivityLog({
        userId: req.user!.id,
        action: "delete",
        entityType: "job",
        entityId: id
      });
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Error deleting job" });
    }
  });

  // News Routes
  app.get("/api/news", async (req, res) => {
    try {
      const lang = req.query.lang?.toString() || "pt";
      const site = req.query.site?.toString();
      
      // Verifica se o site é válido
      const siteCode = site && (SITE_CODES as readonly string[]).includes(site) 
        ? site as SiteCode 
        : undefined;
      
      const newsItems = await storage.getNewsItems(lang, siteCode);
      res.json(newsItems);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ message: "Error fetching news" });
    }
  });

  app.get("/api/news/latest", async (req, res) => {
    try {
      const lang = req.query.lang?.toString() || "pt";
      const site = req.query.site?.toString();
      
      // Verifica se o site é válido
      const siteCode = site && (SITE_CODES as readonly string[]).includes(site) 
        ? site as SiteCode 
        : undefined;
      
      const newsItems = await storage.getLatestNews(lang, siteCode);
      res.json(newsItems);
    } catch (error) {
      console.error("Error fetching latest news:", error);
      res.status(500).json({ message: "Error fetching latest news" });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const lang = req.query.lang?.toString() || "pt";
      const newsItem = await storage.getNewsItem(parseInt(id), lang);
      
      if (!newsItem) {
        return res.status(404).json({ message: "News item not found" });
      }
      
      res.json(newsItem);
    } catch (error) {
      res.status(500).json({ message: "Error fetching news item" });
    }
  });

  app.post("/api/news", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const newsItem = req.body;
      const lang = req.query.lang?.toString() || "pt";
      
      const result = await storage.createNewsItem({
        ...newsItem,
        language: lang
      });
      
      // Log activity
      await storage.createActivityLog({
        userId: req.user!.id,
        action: "create",
        entityType: "news",
        entityId: result.id.toString(),
        details: { title: result.title }
      });
      
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error creating news item" });
    }
  });

  app.put("/api/news/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { id } = req.params;
      const newsItem = req.body;
      const lang = req.query.lang?.toString() || "pt";
      
      const result = await storage.updateNewsItem(parseInt(id), {
        ...newsItem,
        language: lang
      });
      
      // Log activity
      await storage.createActivityLog({
        userId: req.user!.id,
        action: "update",
        entityType: "news",
        entityId: id,
        details: { title: newsItem.title }
      });
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Error updating news item" });
    }
  });

  app.delete("/api/news/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { id } = req.params;
      await storage.deleteNewsItem(parseInt(id));
      
      // Log activity
      await storage.createActivityLog({
        userId: req.user!.id,
        action: "delete",
        entityType: "news",
        entityId: id
      });
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Error deleting news item" });
    }
  });

  // Translation API Route
  app.post("/api/translate", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const targetLang = req.query.lang?.toString() || "en";
      const content = req.body;
      
      // This is where we would call the OpenAI API to translate the content
      // For now, just return the original content with a note
      const translatedContent = {
        ...content,
        title: `[${targetLang}] ${content.title}`,
        description: content.description ? `[${targetLang}] ${content.description}` : undefined,
        content: content.content ? `[${targetLang}] ${content.content}` : undefined,
      };
      
      // Log activity
      await storage.createActivityLog({
        userId: req.user!.id,
        action: "translate",
        entityType: "content",
        entityId: content.id ? content.id.toString() : undefined,
        details: { 
          sourceLanguage: content.language,
          targetLanguage: targetLang 
        }
      });
      
      res.json(translatedContent);
    } catch (error) {
      res.status(500).json({ message: "Error translating content" });
    }
  });

  // Admin Dashboard Stats
  app.get("/api/stats", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const lang = req.query.lang?.toString() || "pt";
      const site = req.query.site?.toString();
      
      // Verifica se o site é válido
      const siteCode = site && (SITE_CODES as readonly string[]).includes(site) 
        ? site as SiteCode 
        : undefined;
      
      const jobCount = await storage.getJobCount(lang, siteCode);
      const newsCount = await storage.getNewsCount(lang, siteCode);
      const contentCount = await storage.getContentCount(lang, siteCode);
      
      // Mock data for demonstration
      const stats = {
        visitors: 1250,
        pageViews: 4875,
        contentCount,
        jobCount,
        newsCount,
        site: siteCode || 'all'
      };
      
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Error fetching stats" });
    }
  });

  // Admin Activity Logs
  app.get("/api/activities", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const activities = await storage.getRecentActivities();
      res.json(activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      res.status(500).json({ message: "Error fetching activities" });
    }
  });
  
  // Site Routes
  app.get("/api/sites", async (req, res) => {
    try {
      const sites = await storage.getAllSites();
      res.json(sites);
    } catch (error) {
      console.error("Error fetching sites:", error);
      res.status(500).json({ message: "Error fetching sites" });
    }
  });
  
  app.get("/api/sites/:code", async (req, res) => {
    try {
      const { code } = req.params;
      
      // Verifica se o código do site é válido
      if (!(SITE_CODES as readonly string[]).includes(code)) {
        return res.status(400).json({ message: "Invalid site code" });
      }
      
      const site = await storage.getSite(code as SiteCode);
      
      if (!site) {
        return res.status(404).json({ message: "Site not found" });
      }
      
      res.json(site);
    } catch (error) {
      console.error("Error fetching site:", error);
      res.status(500).json({ message: "Error fetching site" });
    }
  });
  
  app.put("/api/sites/:code", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
      const { code } = req.params;
      
      // Verifica se o código do site é válido
      if (!(SITE_CODES as readonly string[]).includes(code)) {
        return res.status(400).json({ message: "Invalid site code" });
      }
      
      const siteData = req.body;
      const result = await storage.updateSite(code as SiteCode, siteData);
      
      // Log activity
      await storage.createActivityLog({
        userId: req.user!.id,
        action: "update",
        entityType: "site",
        entityId: code,
        details: { name: siteData.name }
      });
      
      res.json(result);
    } catch (error) {
      console.error("Error updating site:", error);
      res.status(500).json({ message: "Error updating site" });
    }
  });

  // Contact Routes
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, subject, message, site, language } = req.body;
      
      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Get contact email from site configuration or environment
      const contactEmail = process.env.CONTACT_EMAIL || 'admin@example.com';
      
      // Here you would typically send an email using a service like SendGrid
      // For now, we'll log the contact attempt and return success
      console.log('Contact form submission:', {
        name,
        email,
        phone,
        subject,
        message,
        site,
        language,
        timestamp: new Date().toISOString()
      });

      // Log activity
      await storage.createActivityLog({
        userId: 0, // System user for contact forms
        action: "contact_form",
        entityType: "contact",
        entityId: email,
        details: { name, subject, site }
      });

      res.json({ success: true, message: "Contact form submitted successfully" });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ message: "Error processing contact form" });
    }
  });

  // Admin Contact Info Routes
  app.get("/api/admin/contact-info", async (req, res) => {
    try {
      const site = req.query.site?.toString();
      
      // Return default contact information
      // In a real application, this would be stored in the database
      const contactInfo = {
        email: site === 'ness' ? 'contato@ness.com.br' :
               site === 'trustness' ? 'contato@trustness.com.br' :
               site === 'forense' ? 'contato@forense.io' :
               'contato@ness.com.br',
        phone: '+55 11 4002-8922',
        address: 'São Paulo, Brasil',
        businessHours: 'Segunda a Sexta, 9h às 18h'
      };

      res.json(contactInfo);
    } catch (error) {
      console.error("Error fetching contact info:", error);
      res.status(500).json({ message: "Error fetching contact info" });
    }
  });

  app.put("/api/admin/contact-info", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { site, email, phone, address, businessHours } = req.body;
      
      // In a real application, you would store this in the database
      // For now, we'll just return the updated data
      const updatedContactInfo = {
        email,
        phone,
        address,
        businessHours
      };

      // Log activity
      await storage.createActivityLog({
        userId: req.user!.id,
        action: "update",
        entityType: "contact_info",
        entityId: site || 'general',
        details: { email, phone }
      });

      res.json(updatedContactInfo);
    } catch (error) {
      console.error("Error updating contact info:", error);
      res.status(500).json({ message: "Error updating contact info" });
    }
  });

  // Branding & Templates Routes
  app.get("/api/branding/files", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const category = req.query.category?.toString();
      const type = req.query.type?.toString();
      
      // Mock data - in production, this would come from a database
      const files = [
        {
          id: '1',
          name: 'guideline-colors.pdf',
          category: 'styles',
          type: 'pdf',
          description: 'Primary and neutral color codes for all digital materials',
          version: 'v2.1',
          uploadDate: '2024-01-15',
          uploader: 'Marketing Team',
          isOfficial: true,
          downloadUrl: '/assets/branding/guideline-colors.pdf',
          previewUrl: '/assets/branding/previews/guideline-colors-thumb.png'
        },
        {
          id: '2',
          name: 'typography-guidelines.pdf',
          category: 'styles',
          type: 'pdf',
          description: 'Montserrat font usage guidelines and hierarchy',
          version: 'v1.3',
          uploadDate: '2024-01-10',
          uploader: 'Design Team',
          isOfficial: true,
          downloadUrl: '/assets/branding/typography-guidelines.pdf'
        },
        {
          id: '3',
          name: 'SlideDeck_ness_v1.potx',
          category: 'templates',
          type: 'pptx',
          description: 'Official slide template for internal and client presentations',
          version: 'v1.0',
          uploadDate: '2024-01-12',
          uploader: 'Brand Manager',
          isOfficial: true,
          downloadUrl: '/assets/branding/SlideDeck_ness_v1.potx'
        }
      ];

      let filteredFiles = files;
      
      if (category && category !== 'all') {
        filteredFiles = filteredFiles.filter(file => file.category === category);
      }
      
      if (type && type !== 'all') {
        filteredFiles = filteredFiles.filter(file => file.type === type);
      }

      res.json(filteredFiles);
    } catch (error) {
      console.error("Error fetching branding files:", error);
      res.status(500).json({ message: "Error fetching branding files" });
    }
  });

  app.post("/api/branding/upload", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { category, description, version, fileName, fileType } = req.body;
      
      // Validate required fields
      if (!category || !description || !version || !fileName) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // In production, you would handle file upload here
      const newFile = {
        id: Date.now().toString(),
        name: fileName,
        category,
        type: fileType || 'pdf',
        description,
        version,
        uploadDate: new Date().toISOString().split('T')[0],
        uploader: req.user!.username,
        isOfficial: false, // Requires approval
        downloadUrl: `/assets/branding/${fileName}`,
        previewUrl: fileType === 'pdf' ? `/assets/branding/previews/${fileName}-thumb.png` : undefined
      };

      // Log activity
      await storage.createActivityLog({
        userId: req.user!.id,
        action: "upload",
        entityType: "branding_file",
        entityId: newFile.id,
        details: { fileName, category, version }
      });

      res.status(201).json(newFile);
    } catch (error) {
      console.error("Error uploading branding file:", error);
      res.status(500).json({ message: "Error uploading branding file" });
    }
  });

  app.put("/api/branding/files/:id/approve", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { id } = req.params;
      
      // In production, update the file status in database
      const updatedFile = {
        id,
        isOfficial: true,
        approvedBy: req.user!.username,
        approvedDate: new Date().toISOString()
      };

      // Log activity
      await storage.createActivityLog({
        userId: req.user!.id,
        action: "approve",
        entityType: "branding_file",
        entityId: id,
        details: { action: "approved branding file" }
      });

      res.json(updatedFile);
    } catch (error) {
      console.error("Error approving branding file:", error);
      res.status(500).json({ message: "Error approving branding file" });
    }
  });

  app.delete("/api/branding/files/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { id } = req.params;
      
      // In production, delete the file and move to archive
      // Log activity
      await storage.createActivityLog({
        userId: req.user!.id,
        action: "delete",
        entityType: "branding_file",
        entityId: id,
        details: { action: "deleted branding file" }
      });

      res.json({ success: true, message: "File deleted successfully" });
    } catch (error) {
      console.error("Error deleting branding file:", error);
      res.status(500).json({ message: "Error deleting branding file" });
    }
  });

  app.get("/api/branding/files/:id/versions", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { id } = req.params;
      
      // Mock version history - in production, this would come from database
      const versions = [
        {
          id: `${id}_v2`,
          version: 'v2.1',
          uploadDate: '2024-01-15',
          uploader: 'Marketing Team',
          isActive: true
        },
        {
          id: `${id}_v1`,
          version: 'v2.0',
          uploadDate: '2024-01-10',
          uploader: 'Design Team',
          isActive: false
        }
      ];

      res.json(versions);
    } catch (error) {
      console.error("Error fetching file versions:", error);
      res.status(500).json({ message: "Error fetching file versions" });
    }
  });

  // Jobs Management Routes
  app.get("/api/jobs/applications", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      // Mock applications data - in production, this would come from database
      const applications = [
        {
          id: 1,
          jobId: 1,
          name: "Maria Silva",
          email: "maria.silva@email.com",
          phone: "+55 11 99999-9999",
          coverLetter: "Tenho grande interesse na vaga de Desenvolvedor React. Possuo 3 anos de experiência com React, TypeScript e Node.js. Trabalhei em projetos de e-commerce e sistemas de gestão.",
          resumeUrl: "/uploads/resumes/maria-silva-cv.pdf",
          status: "pending",
          appliedAt: "2024-01-15T10:30:00Z"
        },
        {
          id: 2,
          jobId: 1,
          name: "João Santos",
          email: "joao.santos@email.com",
          phone: "+55 11 88888-8888",
          coverLetter: "Sou desenvolvedor fullstack com foco em React e Python. Tenho experiência em desenvolvimento de APIs REST e integração com bancos de dados.",
          resumeUrl: "/uploads/resumes/joao-santos-cv.pdf",
          status: "reviewing",
          appliedAt: "2024-01-14T14:20:00Z"
        },
        {
          id: 3,
          jobId: 2,
          name: "Ana Costa",
          email: "ana.costa@email.com",
          phone: "+55 11 77777-7777",
          coverLetter: "Especialista em marketing digital com 5 anos de experiência. Tenho conhecimento em SEO, Google Ads, redes sociais e análise de dados.",
          status: "accepted",
          appliedAt: "2024-01-12T09:15:00Z"
        }
      ];

      res.json(applications);
    } catch (error) {
      console.error("Error fetching job applications:", error);
      res.status(500).json({ message: "Error fetching job applications" });
    }
  });

  app.post("/api/jobs/apply", async (req, res) => {
    try {
      const { jobId, name, email, phone, coverLetter } = req.body;
      
      // Validate required fields
      if (!jobId || !name || !email || !coverLetter) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Create new application
      const newApplication = {
        id: Date.now(),
        jobId: parseInt(jobId),
        name,
        email,
        phone,
        coverLetter,
        status: "pending",
        appliedAt: new Date().toISOString()
      };

      // Log activity
      await storage.createActivityLog({
        userId: 0, // System user for job applications
        action: "job_application",
        entityType: "job_application",
        entityId: newApplication.id.toString(),
        details: { jobId, name, email }
      });

      res.status(201).json(newApplication);
    } catch (error) {
      console.error("Error creating job application:", error);
      res.status(500).json({ message: "Error creating job application" });
    }
  });

  app.put("/api/jobs/applications/:id/status", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { id } = req.params;
      const { status } = req.body;
      
      // Validate status
      const validStatuses = ['pending', 'reviewing', 'accepted', 'rejected'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      // Update application status
      const updatedApplication = {
        id: parseInt(id),
        status,
        updatedAt: new Date().toISOString(),
        updatedBy: req.user!.username
      };

      // Log activity
      await storage.createActivityLog({
        userId: req.user!.id,
        action: "update",
        entityType: "job_application",
        entityId: id,
        details: { status, action: "status updated" }
      });

      res.json(updatedApplication);
    } catch (error) {
      console.error("Error updating application status:", error);
      res.status(500).json({ message: "Error updating application status" });
    }
  });

  // Public job listing for candidates
  app.get("/api/public/jobs", async (req, res) => {
    try {
      const lang = req.query.lang?.toString() || "pt";
      const site = req.query.site?.toString();
      
      // Verifica se o site é válido
      const siteCode = site && (SITE_CODES as readonly string[]).includes(site) 
        ? site as SiteCode 
        : undefined;
      
      const jobs = await storage.getJobs(lang, siteCode);
      
      // Filter only active jobs for public API
      const activeJobs = jobs.filter(job => job.active);
      
      res.json(activeJobs);
    } catch (error) {
      console.error("Error fetching public jobs:", error);
      res.status(500).json({ message: "Error fetching jobs" });
    }
  });

  app.get("/api/public/jobs/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const lang = req.query.lang?.toString() || "pt";
      const site = req.query.site?.toString();
      
      // Verifica se o site é válido
      const siteCode = site && (SITE_CODES as readonly string[]).includes(site) 
        ? site as SiteCode 
        : undefined;
      
      const job = await storage.getJobBySlug(slug, lang, siteCode);
      
      if (!job || !job.active) {
        return res.status(404).json({ message: "Job not found" });
      }
      
      res.json(job);
    } catch (error) {
      console.error("Error fetching job:", error);
      res.status(500).json({ message: "Error fetching job" });
    }
  });

  // Settings routes
  app.get("/api/admin/settings", requireAdmin, async (req, res) => {
    try {
      const settings = await storage.getAllSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching settings:", error);
      res.status(500).json({ message: "Error fetching settings" });
    }
  });

  app.post("/api/admin/settings", requireAdmin, async (req, res) => {
    try {
      const { key, value, language } = req.body;
      const setting = await storage.updateSetting(key, language, value);
      
      // Log activity
      await storage.createActivityLog({
        userId: (req.user as any).id,
        action: "updated",
        entityType: "setting",
        entityId: key,
        details: { language, value: value.length > 100 ? value.substring(0, 100) + "..." : value }
      });
      
      res.json(setting);
    } catch (error) {
      console.error("Error updating setting:", error);
      res.status(500).json({ message: "Error updating setting" });
    }
  });

  app.post("/api/admin/settings/translate", requireAdmin, async (req, res) => {
    try {
      const { key, value, targetLanguage } = req.body;
      
      if (!process.env.OPENAI_API_KEY) {
        return res.status(400).json({ message: "OpenAI API key não configurada. Configure OPENAI_API_KEY para usar tradução automática." });
      }
      
      // Usar OpenAI para traduzir o conteúdo
      const OpenAI = require('openai');
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      
      const languageNames = {
        'en': 'inglês',
        'es': 'espanhol',
        'pt': 'português'
      };
      
      const prompt = `Traduza o seguinte texto para ${languageNames[targetLanguage as keyof typeof languageNames]}. Mantenha a formatação e estrutura originais:

${value}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2000,
      });

      const translatedText = response.choices[0].message.content;
      
      if (translatedText) {
        const setting = await storage.updateSetting(key, targetLanguage, translatedText);
        
        // Log activity
        await storage.createActivityLog({
          userId: (req.user as any).id,
          action: "translated",
          entityType: "setting",
          entityId: key,
          details: { targetLanguage, originalLanguage: 'pt' }
        });
        
        res.json(setting);
      } else {
        res.status(500).json({ message: "Erro na tradução" });
      }
    } catch (error) {
      console.error("Error translating setting:", error);
      res.status(500).json({ message: "Error translating setting" });
    }
  });

  // Public settings routes (for frontend consumption)
  app.get("/api/settings/:language", async (req, res) => {
    try {
      const { language } = req.params;
      const settings = await storage.getSettings(language);
      
      // Convert to key-value pairs for easier frontend consumption
      const settingsMap = settings.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as Record<string, string>);
      
      res.json(settingsMap);
    } catch (error) {
      console.error("Error fetching public settings:", error);
      res.status(500).json({ message: "Error fetching settings" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
