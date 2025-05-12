import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { ContentService } from "./content-service";

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
      const content = await contentService.getContent(pageId, lang);
      
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      
      res.json(content);
    } catch (error) {
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
      const content = req.body;

      const result = await contentService.updateContent(pageId, lang, content);
      
      // Log activity
      await storage.createActivityLog({
        userId: req.user!.id,
        action: "update",
        entityType: "content",
        entityId: pageId,
        details: { language: lang }
      });
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Error updating content" });
    }
  });

  // Jobs Routes
  app.get("/api/jobs", async (req, res) => {
    try {
      const lang = req.query.lang?.toString() || "pt";
      const jobs = await storage.getJobs(lang);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Error fetching jobs" });
    }
  });

  app.get("/api/jobs/featured", async (req, res) => {
    try {
      const lang = req.query.lang?.toString() || "pt";
      const jobs = await storage.getFeaturedJobs(lang);
      res.json(jobs);
    } catch (error) {
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
      const newsItems = await storage.getNewsItems(lang);
      res.json(newsItems);
    } catch (error) {
      res.status(500).json({ message: "Error fetching news" });
    }
  });

  app.get("/api/news/latest", async (req, res) => {
    try {
      const lang = req.query.lang?.toString() || "pt";
      const newsItems = await storage.getLatestNews(lang);
      res.json(newsItems);
    } catch (error) {
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
      
      const jobCount = await storage.getJobCount(lang);
      const newsCount = await storage.getNewsCount(lang);
      const contentCount = await storage.getContentCount(lang);
      
      // Mock data for demonstration
      const stats = {
        visitors: 1250,
        pageViews: 4875,
        contentCount,
        jobCount,
        newsCount
      };
      
      res.json(stats);
    } catch (error) {
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
      res.status(500).json({ message: "Error fetching activities" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
