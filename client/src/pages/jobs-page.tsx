import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/common/SEOHead';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Job } from '@shared/schema';

export default function JobsPage() {
  const { t, language } = useI18n();
  const [filter, setFilter] = useState('all');
  
  // Fetch jobs
  const { data: jobs, isLoading } = useQuery<Job[]>({
    queryKey: [`/api/jobs?lang=${language}`],
  });

  // Function to filter jobs by location type
  const filterJobs = (jobs: Job[] | undefined) => {
    if (!jobs) return [];
    
    if (filter === 'all') return jobs;
    return jobs.filter(job => job.locationType === filter);
  };

  const filteredJobs = filterJobs(jobs);

  return (
    <>
      <SEOHead 
        title={`${t('jobs.title')} - CorpTech`}
        description="Explore as oportunidades de carreira na CorpTech e junte-se a nossa equipe de especialistas em tecnologia."
        canonicalUrl="/jobs"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-primary text-white">
          <div className="container mx-auto px-4 pt-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('jobs.title')}</h1>
              <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
              <p className="text-xl max-w-3xl mx-auto">
                Junte-se à nossa equipe de especialistas e construa uma carreira de sucesso em tecnologia.
              </p>
            </div>
          </div>
        </section>
        
        {/* Jobs List */}
        <section className="py-16 bg-neutral">
          <div className="container mx-auto px-4">
            {/* Filters */}
            <div className="mb-8 flex flex-wrap gap-4 justify-center">
              <button 
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
              >
                Todas as vagas
              </button>
              <button 
                onClick={() => setFilter('remote')}
                className={`px-4 py-2 rounded-full ${filter === 'remote' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
              >
                Remotas
              </button>
              <button 
                onClick={() => setFilter('office')}
                className={`px-4 py-2 rounded-full ${filter === 'office' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
              >
                Presenciais
              </button>
              <button 
                onClick={() => setFilter('hybrid')}
                className={`px-4 py-2 rounded-full ${filter === 'hybrid' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
              >
                Híbridas
              </button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                      <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                      <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-40"></div>
                  </div>
                ))}
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-accent">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-primary">{job.title}</h3>
                        <p className="text-gray-600">{job.location}</p>
                      </div>
                      <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">{job.type}</span>
                    </div>
                    <p className="text-gray-700 mb-6">
                      {job.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.tags.map((tag, index) => (
                        <span key={index} className="bg-neutral-dark px-3 py-1 rounded-full text-xs text-gray-700">{tag.name}</span>
                      ))}
                    </div>
                    <a href={`/jobs/${job.id}`} className="text-accent hover:text-accent-dark font-medium inline-flex items-center">
                      Ver detalhes e candidatar-se
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhuma vaga encontrada</h3>
                <p className="text-gray-600">
                  Não há vagas disponíveis com os filtros selecionados.
                </p>
              </div>
            )}
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Benefícios de trabalhar conosco</h2>
              <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-neutral rounded-lg p-8 text-center">
                <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Desenvolvimento profissional</h3>
                <p className="text-gray-700">
                  Investimos continuamente no desenvolvimento técnico e pessoal através de treinamentos, certificações e mentorias.
                </p>
              </div>
              
              <div className="bg-neutral rounded-lg p-8 text-center">
                <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Ambiente colaborativo</h3>
                <p className="text-gray-700">
                  Trabalhamos em equipes multidisciplinares onde a colaboração e o compartilhamento de conhecimento são incentivados.
                </p>
              </div>
              
              <div className="bg-neutral rounded-lg p-8 text-center">
                <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Flexibilidade e equilíbrio</h3>
                <p className="text-gray-700">
                  Oferecemos horários flexíveis, modelo híbrido e iniciativas que promovem o equilíbrio entre vida pessoal e profissional.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
