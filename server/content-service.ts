import { Content, type InsertContent, type SiteCode } from "@shared/schema";
import { IStorage } from "./storage";

export class ContentService {
  private storage: IStorage;

  constructor(storage: IStorage) {
    this.storage = storage;
  }

  /**
   * Get content for a specific page, language and site
   * If siteCode is not provided, it will return content
   * that is not associated with any specific site
   */
  async getContent(pageId: string, language: string, siteCode?: SiteCode): Promise<Content | undefined> {
    return await this.storage.getContent(pageId, language, siteCode);
  }

  /**
   * Update content for a specific page, language and site
   * If content doesn't exist, it will be created
   * If siteCode is provided, the content will be associated with that site
   */
  async updateContent(pageId: string, language: string, content: Partial<Content>, siteCode?: SiteCode): Promise<Content> {
    // First, try to get existing content
    const existing = await this.storage.getContent(pageId, language, siteCode);
    
    if (existing) {
      // Update existing content
      return await this.storage.updateContent(existing.id, {
        ...content,
        pageId,
        language
      });
    } else {
      // Create new content
      const newContent = await this.storage.createContent({
        pageId,
        language,
        title: content.title || pageId,
        description: content.description || "",
        content: content.content || "",
        metadata: content.metadata || {},
        metaTitle: content.metaTitle || content.title || pageId,
        metaDescription: content.metaDescription || content.description || "",
        ogImage: content.ogImage || "",
        canonicalUrl: content.canonicalUrl || "",
        published: content.published !== undefined ? content.published : true,
      });

      // If siteCode is provided, associate the content with the site
      if (siteCode && newContent.id) {
        await this.storage.associateContentToSite(newContent.id, 'content', siteCode);
      }

      return newContent;
    }
  }

  /**
   * Get all sites that a content is associated with
   */
  async getContentSites(contentId: number): Promise<SiteCode[]> {
    return await this.storage.getContentSites(contentId, 'content');
  }

  /**
   * Associate content with a site
   */
  async associateContentToSite(contentId: number, siteCode: SiteCode): Promise<void> {
    await this.storage.associateContentToSite(contentId, 'content', siteCode);
  }

  /**
   * Remove content from a site
   */
  async removeContentFromSite(contentId: number, siteCode: SiteCode): Promise<void> {
    await this.storage.removeContentFromSite(contentId, 'content', siteCode);
  }

  /**
   * Translate content using OpenAI API
   * This is a placeholder for actual implementation
   */
  async translateContent(content: Content, targetLanguage: string): Promise<Partial<Content>> {
    // In a real implementation, this would call the OpenAI API
    // For now, return a modified version of the content
    return {
      ...content,
      language: targetLanguage,
      title: `[Translated to ${targetLanguage}] ${content.title}`,
      description: content.description ? `[Translated to ${targetLanguage}] ${content.description}` : undefined,
      content: content.content ? `[Translated to ${targetLanguage}] ${content.content}` : undefined,
    };
  }
}
