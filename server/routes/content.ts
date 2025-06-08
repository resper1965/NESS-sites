import { Router } from "express";
import { storage } from "../storage";
import { ContentService } from "../content-service";
import { SiteCode, SITE_CODES } from "@shared/schema";

const router = Router();
const contentService = new ContentService(storage);

router.get("/content/:pageId", async (req, res) => {
  try {
    const { pageId } = req.params;
    const lang = req.query.lang?.toString() || "pt";
    const site = req.query.site?.toString();

    const siteCode = site && (SITE_CODES as readonly string[]).includes(site)
      ? (site as SiteCode)
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

router.put("/content/:pageId", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { pageId } = req.params;
    const lang = req.query.lang?.toString() || "pt";
    const site = req.query.site?.toString();
    const content = req.body;

    const siteCode = site && (SITE_CODES as readonly string[]).includes(site)
      ? (site as SiteCode)
      : undefined;

    const result = await contentService.updateContent(pageId, lang, content, siteCode);

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

export default router;
