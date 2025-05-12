import { pgTable, text, serial, integer, boolean, timestamp, jsonb, primaryKey, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// List of supported sites
export const SITE_CODES = ['ness', 'trustness', 'forense'] as const;
export type SiteCode = typeof SITE_CODES[number];

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  isAdmin: true,
});

// Content table
export const contents = pgTable("contents", {
  id: serial("id").primaryKey(),
  pageId: text("page_id").notNull(),
  language: text("language").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content"),
  metadata: jsonb("metadata"),
  // SEO fields
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  ogImage: text("og_image"),
  canonicalUrl: text("canonical_url"),
  published: boolean("published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertContentSchema = createInsertSchema(contents).pick({
  pageId: true,
  language: true,
  title: true,
  description: true,
  content: true,
  metadata: true,
  metaTitle: true,
  metaDescription: true,
  ogImage: true,
  canonicalUrl: true,
  published: true,
});

// Jobs table
export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 255 }),
  location: text("location").notNull(),
  locationType: text("location_type").notNull(),
  type: text("type").notNull(),
  summary: text("summary").notNull(),
  description: text("description"),
  requirements: text("requirements"),
  language: text("language").notNull(),
  active: boolean("active").default(true),
  tags: jsonb("tags").$type<{ name: string }[]>().default([]),
  // SEO fields
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  ogImage: text("og_image"),
  published: boolean("published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertJobSchema = createInsertSchema(jobs).pick({
  title: true,
  slug: true,
  location: true,
  locationType: true,
  type: true,
  summary: true,
  description: true,
  requirements: true,
  language: true,
  active: true,
  tags: true,
  metaTitle: true,
  metaDescription: true,
  ogImage: true,
  published: true,
});

// News table
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 255 }),
  summary: text("summary").notNull(),
  content: text("content"),
  image: text("image").notNull(),
  date: text("date").notNull(),
  category: text("category").notNull(),
  language: text("language").notNull(),
  featured: boolean("featured").default(false),
  // SEO fields
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  ogImage: text("og_image"),
  published: boolean("published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertNewsSchema = createInsertSchema(news).pick({
  title: true,
  slug: true,
  summary: true,
  content: true,
  image: true,
  date: true,
  category: true,
  language: true,
  featured: true,
  metaTitle: true,
  metaDescription: true,
  ogImage: true,
  published: true,
});

// Activity Logs table
export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id"),
  details: jsonb("details"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertActivityLogSchema = createInsertSchema(activityLogs).pick({
  userId: true,
  action: true,
  entityType: true,
  entityId: true,
  details: true,
});

// Sites table
export const sites = pgTable("sites", {
  code: text("code").primaryKey().$type<SiteCode>(),
  name: text("name").notNull(),
  domain: text("domain").notNull().unique(),
  logo: text("logo"),
  primaryColor: text("primary_color").default("#00ade0"),
  secondaryColor: text("secondary_color"),
  privacyPolicy: text("privacy_policy"),
  termsOfUse: text("terms_of_use"),
  contactEmail: text("contact_email"),
  socialMedia: jsonb("social_media").$type<{
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  }>().default({}),
  metadata: jsonb("metadata").$type<{
    defaultTitle?: string;
    defaultDescription?: string;
    ogImage?: string;
    favicon?: string;
  }>().default({}),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSiteSchema = createInsertSchema(sites).pick({
  code: true,
  name: true,
  domain: true,
  logo: true,
  primaryColor: true,
  secondaryColor: true,
  privacyPolicy: true,
  termsOfUse: true,
  contactEmail: true,
  socialMedia: true,
  metadata: true,
});

// Content-to-Site mapping table
export const contentSites = pgTable("content_sites", {
  contentId: integer("content_id").notNull(),
  contentType: text("content_type").notNull(),
  siteCode: text("site_code").$type<SiteCode>().notNull(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.contentId, table.contentType, table.siteCode] }),
  }
});

export const insertContentSiteSchema = createInsertSchema(contentSites);

// Landing Pages table
export const landingPages = pgTable("landing_pages", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  content: jsonb("content"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  ogImage: text("og_image"),
  published: boolean("published").default(false),
  language: text("language").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertLandingPageSchema = createInsertSchema(landingPages).pick({
  slug: true,
  title: true,
  description: true,
  content: true,
  metaTitle: true,
  metaDescription: true,
  ogImage: true,
  published: true,
  language: true,
});

// Type definitions
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertContent = z.infer<typeof insertContentSchema>;
export type Content = typeof contents.$inferSelect;

export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobs.$inferSelect;

export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;

export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;
export type ActivityLog = typeof activityLogs.$inferSelect;

export type InsertSite = z.infer<typeof insertSiteSchema>;
export type Site = typeof sites.$inferSelect;

export type InsertContentSite = z.infer<typeof insertContentSiteSchema>;
export type ContentSite = typeof contentSites.$inferSelect;

export type InsertLandingPage = z.infer<typeof insertLandingPageSchema>;
export type LandingPage = typeof landingPages.$inferSelect;
