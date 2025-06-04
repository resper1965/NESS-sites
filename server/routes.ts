import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { ContentService } from "./content-service";
import { SiteCode, SITE_CODES } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes and middleware
  setupAuth(app);

  // Initialize content service
  const contentService = new ContentService(storage);

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

  const httpServer = createServer(app);
  return httpServer;
}
