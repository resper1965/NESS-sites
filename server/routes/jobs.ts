import { Router } from "express";
import { storage } from "../storage";
import { SiteCode, SITE_CODES } from "@shared/schema";

const router = Router();

router.get("/jobs", async (req, res) => {
  try {
    const lang = req.query.lang?.toString() || "pt";
    const site = req.query.site?.toString();

    const siteCode = site && (SITE_CODES as readonly string[]).includes(site)
      ? (site as SiteCode)
      : undefined;

    const jobs = await storage.getJobs(lang, siteCode);
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

router.get("/jobs/featured", async (req, res) => {
  try {
    const lang = req.query.lang?.toString() || "pt";
    const site = req.query.site?.toString();

    const siteCode = site && (SITE_CODES as readonly string[]).includes(site)
      ? (site as SiteCode)
      : undefined;

    const jobs = await storage.getFeaturedJobs(lang, siteCode);
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching featured jobs:", error);
    res.status(500).json({ message: "Error fetching featured jobs" });
  }
});

router.get("/jobs/:id", async (req, res) => {
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

router.post("/jobs", async (req, res) => {
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

router.put("/jobs/:id", async (req, res) => {
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

router.delete("/jobs/:id", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { id } = req.params;
    await storage.deleteJob(parseInt(id));

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

router.get("/jobs/applications", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const applications = [
      {
        id: 1,
        jobId: 1,
        name: "Maria Silva",
        email: "maria.silva@email.com",
        phone: "+55 11 99999-9999",
        coverLetter:
          "Tenho grande interesse na vaga de Desenvolvedor React. Possuo 3 anos de experiência com React, TypeScript e Node.js. Trabalhei em projetos de e-commerce e sistemas de gestão.",
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
        coverLetter:
          "Sou desenvolvedor fullstack com foco em React e Python. Tenho experiência em desenvolvimento de APIs REST e integração com bancos de dados.",
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
        coverLetter:
          "Especialista em marketing digital com 5 anos de experiência. Tenho conhecimento em SEO, Google Ads, redes sociais e análise de dados.",
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

router.post("/jobs/apply", async (req, res) => {
  try {
    const { jobId, name, email, phone, coverLetter } = req.body;

    if (!jobId || !name || !email || !coverLetter) {
      return res.status(400).json({ message: "Missing required fields" });
    }

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

router.put("/jobs/applications/:id/status", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "reviewing", "accepted", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedApplication = {
      id: parseInt(id),
      status,
      updatedAt: new Date().toISOString(),
      updatedBy: req.user!.username
    };

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

router.get("/public/jobs", async (req, res) => {
  try {
    const lang = req.query.lang?.toString() || "pt";
    const site = req.query.site?.toString();

    const siteCode = site && (SITE_CODES as readonly string[]).includes(site)
      ? (site as SiteCode)
      : undefined;

    const jobs = await storage.getJobs(lang, siteCode);
    const activeJobs = jobs.filter(job => job.active);

    res.json(activeJobs);
  } catch (error) {
    console.error("Error fetching public jobs:", error);
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

router.get("/public/jobs/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const lang = req.query.lang?.toString() || "pt";
    const site = req.query.site?.toString();

    const siteCode = site && (SITE_CODES as readonly string[]).includes(site)
      ? (site as SiteCode)
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

export default router;
