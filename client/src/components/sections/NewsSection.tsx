import { Link } from 'wouter';
import { useI18n } from '@/lib/i18n';
import { formatDate } from '@/lib/utils';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  date: string;
  image: string;
}

interface NewsSectionProps {
  title: string;
  description: string;
  news: NewsItem[];
  viewAllLink: string;
}

export default function NewsSection({
  title,
  description,
  news,
  viewAllLink
}: NewsSectionProps) {
  const { t, language } = useI18n();
  
  return (
    <section id="news" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{title}</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-lg max-w-3xl mx-auto text-gray-700">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
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
                <Link href={`/news/${item.id}`} className="text-accent hover:text-accent-dark font-medium inline-flex items-center">
                  {t('news.readMore')}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={viewAllLink} className="inline-flex items-center bg-primary hover:bg-primary-light text-white py-3 px-8 rounded-md font-medium transition duration-300">
            {t('news.viewAll')}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
