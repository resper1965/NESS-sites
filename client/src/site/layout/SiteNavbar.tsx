import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { useSite } from '../SiteContext';
import { useI18n } from '@/lib/i18n';
import LanguageSelector from '@/components/common/LanguageSelector';

export default function SiteNavbar() {
  const { siteConfig } = useSite();
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  // Detectar rolagem para mudar o estilo da navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Fechar menu ao mudar de rota
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  const sitePrefix = `/site/${siteConfig.code}`;

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href={sitePrefix} className="flex items-center">
            <span className="text-2xl font-normal">
              {siteConfig.name}
            </span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <Link href={`${sitePrefix}/about`} className="text-gray-700 hover:text-primary transition">
                {t('menu.about')}
              </Link>
              <Link href={`${sitePrefix}/services`} className="text-gray-700 hover:text-primary transition">
                {t('menu.services')}
              </Link>
              <Link href={`${sitePrefix}/jobs`} className="text-gray-700 hover:text-primary transition">
                {t('menu.jobs')}
              </Link>
              <Link href={`${sitePrefix}/news`} className="text-gray-700 hover:text-primary transition">
                {t('menu.news')}
              </Link>
            </nav>
            
            {/* Language Selector */}
            <LanguageSelector />
            
            {/* Contact Button */}
            <Link href={`${sitePrefix}/contact`} className="bg-[var(--primary-color)] text-white px-4 py-2 rounded hover:bg-opacity-90 transition">
              {t('menu.contact')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link href={`${sitePrefix}/about`} className="text-gray-700 hover:text-primary transition py-2">
                {t('menu.about')}
              </Link>
              <Link href={`${sitePrefix}/services`} className="text-gray-700 hover:text-primary transition py-2">
                {t('menu.services')}
              </Link>
              <Link href={`${sitePrefix}/jobs`} className="text-gray-700 hover:text-primary transition py-2">
                {t('menu.jobs')}
              </Link>
              <Link href={`${sitePrefix}/news`} className="text-gray-700 hover:text-primary transition py-2">
                {t('menu.news')}
              </Link>
              <Link href={`${sitePrefix}/contact`} className="text-gray-700 hover:text-primary transition py-2">
                {t('menu.contact')}
              </Link>
              <div className="flex items-center py-2">
                <span className="text-gray-700 mr-2">{t('language')}:</span>
                <LanguageSelector />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}