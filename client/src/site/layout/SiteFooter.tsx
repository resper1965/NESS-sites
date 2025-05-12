import React from 'react';
import { Link } from 'wouter';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../SiteContext';
import { 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram, 
  Youtube,
  Phone, 
  Mail, 
  MapPin 
} from 'lucide-react';

export default function SiteFooter() {
  const { t } = useI18n();
  const { siteConfig } = useSite();
  const currentYear = new Date().getFullYear();
  
  const sitePrefix = `/site/${siteConfig.code}`;
  
  // Função auxiliar para renderizar o componente correto do ícone social
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin size={20} />;
      case 'twitter':
        return <Twitter size={20} />;
      case 'facebook':
        return <Facebook size={20} />;
      case 'instagram':
        return <Instagram size={20} />;
      case 'youtube':
        return <Youtube size={20} />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-[var(--secondary-color)] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Coluna 1: Sobre a empresa */}
          <div>
            <Link href={sitePrefix}>
              <a className="text-white text-xl mb-6 inline-block">
                {siteConfig.name}
              </a>
            </Link>
            <p className="text-gray-300 mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {/* LinkedIn */}
              {siteConfig.socialMedia?.linkedin && (
                <a 
                  href={siteConfig.socialMedia.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300"
                >
                  <Linkedin size={20} />
                </a>
              )}
              
              {/* Twitter */}
              {siteConfig.socialMedia?.twitter && (
                <a 
                  href={siteConfig.socialMedia.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300"
                >
                  <Twitter size={20} />
                </a>
              )}
              
              {/* Facebook */}
              {siteConfig.socialMedia?.facebook && (
                <a 
                  href={siteConfig.socialMedia.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300"
                >
                  <Facebook size={20} />
                </a>
              )}
              
              {/* Instagram */}
              {siteConfig.socialMedia?.instagram && (
                <a 
                  href={siteConfig.socialMedia.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300"
                >
                  <Instagram size={20} />
                </a>
              )}
              
              {/* YouTube */}
              {siteConfig.socialMedia?.youtube && (
                <a 
                  href={siteConfig.socialMedia.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300"
                >
                  <Youtube size={20} />
                </a>
              )}
            </div>
          </div>
          
          {/* Coluna 2: Links Rápidos */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              <li>
                <Link href={`${sitePrefix}`}>
                  <a className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                    {t('menu.home')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${sitePrefix}/about`}>
                  <a className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                    {t('menu.about')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${sitePrefix}/services`}>
                  <a className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                    {t('menu.services')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${sitePrefix}/jobs`}>
                  <a className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                    {t('menu.jobs')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${sitePrefix}/news`}>
                  <a className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                    {t('menu.news')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${sitePrefix}/contact`}>
                  <a className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                    {t('menu.contact')}
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Coluna 3: Soluções */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('footer.solutions')}</h4>
            <ul className="space-y-3">
              <li>
                <Link href={`${sitePrefix}/services#infraops`}>
                  <a className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                    n.InfraOps
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${sitePrefix}/services#secops`}>
                  <a className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                    n.SecOps
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${sitePrefix}/services#devarch`}>
                  <a className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                    n.DevArch
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${sitePrefix}/services#autoops`}>
                  <a className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                    n.AutoOps
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${sitePrefix}/services#crisisops`}>
                  <a className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                    n.CrisisOps
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Coluna 4: Contato */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-[var(--primary-color)] mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  {t('footer.address')}
                </span>
              </li>
              {siteConfig.contactEmail && (
                <li className="flex items-center">
                  <Mail size={20} className="mr-3 text-[var(--primary-color)] flex-shrink-0" />
                  <a href={`mailto:${siteConfig.contactEmail}`} className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                    {siteConfig.contactEmail}
                  </a>
                </li>
              )}
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-[var(--primary-color)] flex-shrink-0" />
                <span className="text-gray-300">+55 11 4002-8922</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Rodapé Inferior */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {currentYear} {siteConfig.name} {t('footer.rights')}</p>
            
            {/* Links de Documentos Legais */}
            <div className="flex flex-wrap justify-center gap-x-4 mt-4 md:mt-0">
              <Link href={`${sitePrefix}/privacy`}>
                <a className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300 whitespace-nowrap">
                  {t('footer.privacy')}
                </a>
              </Link>
              <Link href={`${sitePrefix}/terms`}>
                <a className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300 whitespace-nowrap">
                  {t('footer.terms')}
                </a>
              </Link>
              <Link href={`${sitePrefix}/cookies`}>
                <a className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300 whitespace-nowrap">
                  {t('footer.cookies')}
                </a>
              </Link>
              <Link href="/auth">
                <a className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300 whitespace-nowrap">
                  {t('footer.login')}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}