import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';

import SiteLayout from '@/site/layout/SiteLayout';
import { News } from '@shared/schema';
import { formatDate } from '@/lib/utils';

export default function NewsPage() {
  const { t, language } = useI18n();
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Fetch news
  const { data: news, isLoading } = useQuery<News[]>({
    queryKey: [`/api/news?lang=${language}`],
  });

  // Function to filter news by category
  const filterNews = (news: News[] | undefined) => {
    if (!news) return [];
    
    if (categoryFilter === 'all') return news;
    return news.filter(item => item.category === categoryFilter);
  };

  const filteredNews = filterNews(news);

  // Get unique categories
  const categories = news 
    ? ['all', ...[...new Set(news.map(item => item.category))]]
    : ['all', 'company', 'technology', 'events'];

  return (
    <SiteLayout
      title={`${t('news.title')} - ness.`}
      description="Fique por dentro das últimas notícias e atualizações da ness. e do mundo da tecnologia."
      canonicalUrl="/news"
    >
      <main>
        {/* Hero Section com fundo gradiente azul, sem imagem */}
        <section className="relative py-20 bg-gradient-to-b from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 pt-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-['Montserrat'] font-normal mb-6">{t('news.title')}</h1>
              <div className="w-20 h-1 bg-[#00ade0] mx-auto mb-8"></div>
              <p className="text-xl max-w-3xl mx-auto">
                Fique por dentro das novidades sobre nossa empresa e o mercado de tecnologia.
              </p>
            </div>
          </div>
        </section>
        
        {/* News List */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {/* Filters */}
            <div className="mb-8 flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button 
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm ${categoryFilter === category ? 'bg-primary text-white' : 'bg-neutral text-gray-700'}`}
                >
                  {category === 'all' ? 'Todas as notícias' : 
                   category === 'company' ? 'Empresa' : 
                   category === 'technology' ? 'Tecnologia' : 
                   category === 'events' ? 'Eventos' : category}
                </button>
              ))}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse bg-neutral rounded-lg overflow-hidden shadow-md">
                    <div className="w-full h-48 bg-gray-300"></div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-24"></div>
                      </div>
                      <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                      <div className="space-y-2 mb-4">
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                      </div>
                      <div className="h-4 bg-gray-300 rounded w-24"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredNews.map((item) => (
                  <div key={item.id} className="bg-neutral rounded-lg overflow-hidden shadow-md transition duration-300 hover:shadow-lg">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-48 object-cover" 
                    />
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span>{formatDate(item.date, language)}</span>
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                      <p className="text-gray-700 mb-4 line-clamp-3">
                        {item.summary}
                      </p>
                      <a href={`/news/${item.id}`} className="text-accent hover:text-accent-dark font-medium inline-flex items-center">
                        {t('news.readMore')}
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-neutral rounded-lg shadow">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                </svg>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhuma notícia encontrada</h3>
                <p className="text-gray-600">
                  Não há notícias disponíveis com o filtro selecionado.
                </p>
              </div>
            )}
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-16 bg-neutral">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-primary mb-4">Assine nossa newsletter</h2>
              <p className="text-gray-700 mb-8">
                Receba as últimas novidades e artigos exclusivos diretamente em seu e-mail.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 justify-center">
                <input 
                  type="email" 
                  placeholder="Seu e-mail" 
                  className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent flex-grow max-w-md"
                  required
                />
                <button 
                  type="submit"
                  className="bg-accent hover:bg-accent-dark text-white py-3 px-6 rounded-md font-medium transition duration-300 inline-block"
                >
                  Assinar
                </button>
              </form>
              <p className="text-gray-500 text-sm mt-4">
                Respeitamos sua privacidade. Você pode cancelar a inscrição a qualquer momento.
              </p>
            </div>
          </div>
        </section>
      </main>
      
    </SiteLayout>
  );
}
