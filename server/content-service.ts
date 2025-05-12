import { Content, type InsertContent } from "@shared/schema";
import { IStorage } from "./storage";

export class ContentService {
  private storage: IStorage;

  constructor(storage: IStorage) {
    this.storage = storage;
  }

  /**
   * Get content for a specific page and language
   */
  async getContent(pageId: string, language: string): Promise<Content | undefined> {
    return await this.storage.getContent(pageId, language);
  }

  /**
   * Update content for a specific page and language
   * If content doesn't exist, it will be created
   */
  async updateContent(pageId: string, language: string, content: Partial<Content>): Promise<Content> {
    // First, try to get existing content
    const existing = await this.storage.getContent(pageId, language);
    
    if (existing) {
      // Update existing content
      return await this.storage.updateContent(existing.id, {
        ...content,
        pageId,
        language
      });
    } else {
      // Create new content
      return await this.storage.createContent({
        pageId,
        language,
        title: content.title || pageId,
        description: content.description || "",
        content: content.content || "",
        metadata: content.metadata || {},
      });
    }
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
