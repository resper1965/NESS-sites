import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { useI18n, Language } from '@/lib/i18n';
import { useSite } from '../SiteContext';
import { 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram, 
  Youtube,
  Phone, 
  Mail, 
  MapPin,
  Globe
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
            <div className="text-white text-xl mb-6 inline-block">
              <Link href={sitePrefix}>
                {siteConfig.name}
              </Link>
            </div>
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
                <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                  <Link href={`${sitePrefix}`}>
                    {t('menu.home')}
                  </Link>
                </div>
              </li>
              <li>
                <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                  <Link href={`${sitePrefix}/about`}>
                    {t('menu.about')}
                  </Link>
                </div>
              </li>
              <li>
                <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                  <Link href={`${sitePrefix}/services`}>
                    {t('menu.services')}
                  </Link>
                </div>
              </li>
              <li>
                <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                  <Link href={`${sitePrefix}/jobs`}>
                    {t('menu.jobs')}
                  </Link>
                </div>
              </li>
              <li>
                <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                  <Link href={`${sitePrefix}/news`}>
                    {t('menu.news')}
                  </Link>
                </div>
              </li>
              <li>
                <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                  <Link href={`${sitePrefix}/contact`}>
                    {t('menu.contact')}
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Coluna 3: Soluções */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('footer.solutions')}</h4>
            <ul className="space-y-3">
              <li>
                <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                  <Link href={`${sitePrefix}/services#infraops`}>
                    n.InfraOps
                  </Link>
                </div>
              </li>
              <li>
                <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                  <Link href={`${sitePrefix}/services#secops`}>
                    n.SecOps
                  </Link>
                </div>
              </li>
              <li>
                <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                  <Link href={`${sitePrefix}/services#devarch`}>
                    n.DevArch
                  </Link>
                </div>
              </li>
              <li>
                <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                  <Link href={`${sitePrefix}/services#autoops`}>
                    n.AutoOps
                  </Link>
                </div>
              </li>
              <li>
                <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                  <Link href={`${sitePrefix}/services#crisisops`}>
                    n.CrisisOps
                  </Link>
                </div>
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
              <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300 whitespace-nowrap">
                <Link href={`${sitePrefix}/privacy`}>
                  {t('footer.privacy')}
                </Link>
              </div>
              <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300 whitespace-nowrap">
                <Link href={`${sitePrefix}/terms`}>
                  {t('footer.terms')}
                </Link>
              </div>
              <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300 whitespace-nowrap">
                <Link href={`${sitePrefix}/cookies`}>
                  {t('footer.cookies')}
                </Link>
              </div>
              <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300 whitespace-nowrap">
                <Link href="/auth">
                  {t('footer.login')}
                </Link>
              </div>
              
              {/* Seletor de Idioma */}
              <div className="flex items-center gap-2 text-gray-300 relative mt-4 md:mt-0 md:ml-4">
                <Globe size={16} className="text-[var(--primary-color)]" />
                <FooterLanguageSelector />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Versão do seletor de idioma específica para o footer
function FooterLanguageSelector() {
  const { language, setLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const languages: { code: Language; label: string }[] = [
    { code: 'pt', label: 'Português' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
  ];
  
  // Lidar com mudança de idioma
  const handleLanguageChange = (lang: Language) => {
    if (lang !== language) {
      setLanguage(lang);
      setIsOpen(false);
    }
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className="flex items-center text-gray-300 hover:text-[var(--primary-color)] transition bg-transparent rounded-md px-2 py-1"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg className="w-5 h-5 mr-1 text-[#00ade0]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" opacity="0.2" />
          <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-8a8 8 0 100 16 8 8 0 000-16z" strokeWidth="1" stroke="currentColor" fill="none" />
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
        <span>{language.toUpperCase()}</span>
        <svg className={`w-3 h-3 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-32 bg-[#1b2838] rounded-md shadow-lg overflow-hidden z-50 border border-[#2f3e4d]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`block w-full text-left px-3 py-1.5 text-xs ${
                language === lang.code ? 'bg-[#2f3e4d] text-[#00ade0] font-medium' : 'text-gray-300 hover:bg-[#2f3e4d]'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}