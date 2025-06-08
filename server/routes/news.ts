import { Router } from "express";
import { storage } from "../storage";
import { SiteCode, SITE_CODES } from "@shared/schema";

const router = Router();

router.get("/news", async (req, res) => {
  try {
    const lang = req.query.lang?.toString() || "pt";
    const site = req.query.site?.toString();

    const siteCode = site && (SITE_CODES as readonly string[]).includes(site)
      ? (site as SiteCode)
      : undefined;

    const newsItems = await storage.getNewsItems(lang, siteCode);
    res.json(newsItems);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: "Error fetching news" });
  }
});

router.get("/news/latest", async (req, res) => {
  try {
    const lang = req.query.lang?.toString() || "pt";
    const site = req.query.site?.toString();

    const siteCode = site && (SITE_CODES as readonly string[]).includes(site)
      ? (site as SiteCode)
      : undefined;

    const newsItems = await storage.getLatestNews(lang, siteCode);
    res.json(newsItems);
  } catch (error) {
    console.error("Error fetching latest news:", error);
    res.status(500).json({ message: "Error fetching latest news" });
  }
});

router.get("/news/:id", async (req, res) => {
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

router.post("/news", async (req, res) => {
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

router.put("/news/:id", async (req, res) => {
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

router.delete("/news/:id", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { id } = req.params;
    await storage.deleteNewsItem(parseInt(id));

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

export default router;
