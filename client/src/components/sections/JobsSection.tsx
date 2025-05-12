import { Link } from 'wouter';
import { useI18n } from '@/lib/i18n';

interface JobTag {
  name: string;
}

interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  description: string;
  tags: JobTag[];
}

interface JobsSectionProps {
  title: string;
  description: string;
  jobs: Job[];
  viewAllLink: string;
}

export default function JobsSection({
  title,
  description,
  jobs,
  viewAllLink
}: JobsSectionProps) {
  const { t } = useI18n();
  
  return (
    <section id="jobs" className="py-20 bg-neutral">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{title}</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-lg max-w-3xl mx-auto text-gray-700">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-accent">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-primary">{job.title}</h3>
                  <p className="text-gray-600">{job.location}</p>
                </div>
                <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">{job.type}</span>
              </div>
              <p className="text-gray-700 mb-6">
                {job.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {job.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="bg-neutral-dark px-3 py-1 rounded-full text-xs text-gray-700">{tag.name}</span>
                ))}
              </div>
              <Link href={`/jobs/${job.id}`} className="text-accent hover:text-accent-dark font-medium inline-flex items-center">
                {t('jobs.viewDetails')}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={viewAllLink} className="inline-flex items-center bg-primary hover:bg-primary-light text-white py-3 px-8 rounded-md font-medium transition duration-300">
            {t('jobs.viewAll')}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
