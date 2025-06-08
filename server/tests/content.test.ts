import { describe, it, expect, beforeEach } from 'vitest'
import express from 'express'
import request from 'supertest'
import { registerRoutes } from '../routes'
import { MemStorage } from '../storage'

let app: express.Express

beforeEach(async () => {
  app = express()
  app.use(express.json())
  const store = new MemStorage()
  await registerRoutes(app, store)
})

describe('GET /api/content/:pageId', () => {
  it('returns default home content', async () => {
    const res = await request(app).get('/api/content/home?lang=pt')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('title')
  })
})
