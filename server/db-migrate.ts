import { db } from './db';
import { sites, contentSites, landingPages } from '@shared/schema';
import { SITE_CODES } from '@shared/schema';

async function migrate() {
  console.log('Starting database migration...');
  
  try {
    // Criar tabela sites se não existir
    await db.execute(`
      CREATE TABLE IF NOT EXISTS sites (
        code TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        domain TEXT NOT NULL UNIQUE,
        logo TEXT,
        primary_color TEXT DEFAULT '#00ade0',
        secondary_color TEXT,
        privacy_policy TEXT,
        terms_of_use TEXT,
        contact_email TEXT,
        social_media JSONB DEFAULT '{}',
        metadata JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Sites table checked.');
    
    // Criar tabela de mapeamento content_sites se não existir
    await db.execute(`
      CREATE TABLE IF NOT EXISTS content_sites (
        content_id INTEGER NOT NULL,
        content_type TEXT NOT NULL,
        site_code TEXT NOT NULL,
        PRIMARY KEY (content_id, content_type, site_code)
      );
    `);
    console.log('Content-sites mapping table checked.');
    
    // Criar tabela landing_pages se não existir
    await db.execute(`
      CREATE TABLE IF NOT EXISTS landing_pages (
        id SERIAL PRIMARY KEY,
        slug TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        content TEXT,
        language TEXT NOT NULL,
        meta_title TEXT,
        meta_description TEXT,
        og_image TEXT,
        published BOOLEAN DEFAULT TRUE,
        author_id INTEGER,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(slug, language)
      );
    `);
    console.log('Landing pages table checked.');
    
    // Inserir sites padrão se tabela estiver vazia
    const sitesCountQuery = await db.execute('SELECT COUNT(*) as count FROM sites');
    const sitesCount = sitesCountQuery.rows[0]?.count || '0';
    if (sitesCount === '0') {
      for (const code of SITE_CODES) {
        let name, domain, primaryColor, secondaryColor;
        let socialMedia = {};
        let metadata = {};
        
        switch (code) {
          case 'ness':
            name = 'ness.';
            domain = 'ness.com.br';
            primaryColor = '#00ade0';
            secondaryColor = '#2f3e4d';
            socialMedia = {
              linkedin: 'https://www.linkedin.com/company/ness-tech',
              instagram: 'https://www.instagram.com/ness.tech',
              facebook: 'https://www.facebook.com/ness.tech',
              twitter: 'https://twitter.com/ness_tech',
              youtube: 'https://www.youtube.com/channel/ness'
            };
            metadata = {
              defaultTitle: 'ness. | Soluções de Segurança Digital',
              defaultDescription: 'Soluções de segurança digital para empresas de todos os tamanhos. Protegendo seus dados com tecnologia avançada.',
              ogImage: '/images/ness-og.png',
              favicon: '/favicon-ness.ico'
            };
            break;
            
          case 'trustness':
            name = 'trustness.';
            domain = 'trustness.com.br';
            primaryColor = '#005fa3';
            secondaryColor = '#2c2c34';
            socialMedia = {
              linkedin: 'https://www.linkedin.com/company/trustness',
              instagram: 'https://www.instagram.com/trustness',
              facebook: 'https://www.facebook.com/trustness',
              twitter: 'https://twitter.com/trustness'
            };
            metadata = {
              defaultTitle: 'trustness. | Consultoria Estratégica em Segurança',
              defaultDescription: 'Consultoria estratégica em segurança da informação para organizações que buscam proteger seus ativos digitais.',
              ogImage: '/images/trustness-og.png',
              favicon: '/favicon-trustness.ico'
            };
            break;
            
          case 'forense':
            name = 'forense.io';
            domain = 'forense.io';
            primaryColor = '#2d3e50';
            secondaryColor = '#1abc9c';
            socialMedia = {
              linkedin: 'https://www.linkedin.com/company/forense-io',
              instagram: 'https://www.instagram.com/forense.io',
              facebook: 'https://www.facebook.com/forense.io'
            };
            metadata = {
              defaultTitle: 'forense.io | Resposta a Incidentes e Análise Forense',
              defaultDescription: 'Serviços especializados em resposta a incidentes e análise forense para identificar e mitigar ameaças digitais.',
              ogImage: '/images/forense-og.png',
              favicon: '/favicon-forense.ico'
            };
            break;
        }
        
        await db.execute(`
          INSERT INTO sites (code, name, domain, primary_color, secondary_color, social_media, metadata, contact_email)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          ON CONFLICT (code) DO NOTHING
        `, [
          code,
          name,
          domain,
          primaryColor,
          secondaryColor,
          JSON.stringify(socialMedia),
          JSON.stringify(metadata),
          `contato@${domain}`
        ]);
        
        console.log(`Site ${code} checked.`);
      }
    }
    
    console.log('Database migration completed successfully.');
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

migrate()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
