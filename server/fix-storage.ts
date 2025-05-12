import { db } from './db';
import { storage } from './storage';

/**
 * Esta função modifica temporariamente a implementação do método getContent 
 * para não usar a tabela content_sites que ainda não existe,
 * permitindo que a aplicação funcione enquanto a migração completa não é realizada.
 */
export function fixGetContentMethod() {
  // Substituir a implementação do getContent para não usar a tabela content_sites
  if (storage instanceof DatabaseStorage) {
    // @ts-ignore - Hack temporário
    storage.getContent = async function(pageId: string, language: string, siteCode?: SiteCode): Promise<Content | undefined> {
      const [content] = await db.select().from(contents)
        .where(and(
          eq(contents.pageId, pageId),
          eq(contents.language, language)
        ));
      
      return content;
    };

    console.log('Método getContent temporariamente modificado para funcionar sem a tabela content_sites');
  }
}

// Importações aqui para evitar erros de referência circular
import { DatabaseStorage } from './storage';
import { contents } from '@shared/schema';
import { and, eq } from 'drizzle-orm';
import { Content, SiteCode } from '@shared/schema';