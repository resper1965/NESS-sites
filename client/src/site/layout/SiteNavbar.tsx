import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { useSite } from '../SiteContext';
import { useI18n } from '@/lib/i18n';

export default function SiteNavbar() {
  const { siteConfig } = useSite();
  const { language, t } = useI18n();
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

  // Menus específicos por site
  const getMenuItems = () => {
    const items = [
      { path: '/', label: t('navbar.home') },
      { path: '/about', label: t('navbar.about') },
      { path: '/services', label: t('navbar.services') },
    ];
    
    // Itens específicos por site
    switch (siteConfig.code) {
      case 'ness':
        items.push(
          { path: '/jobs', label: t('navbar.jobs') },
          { path: '/news', label: t('navbar.news') }
        );
        break;
      case 'trustness':
        items.push(
          { path: '/solutions', label: t('navbar.solutions') },
          { path: '/cases', label: t('navbar.cases') }
        );
        break;
      case 'forense':
        items.push(
          { path: '/services/incident-response', label: t('navbar.incident_response') },
          { path: '/services/digital-forensics', label: t('navbar.digital_forensics') }
        );
        break;
    }
    
    // Item comum de contato
    items.push({ path: '/contact', label: t('navbar.contact') });
    
    return items;
  };

  // Nome formatado do site com ponto em destaque
  const formattedSiteName = () => {
    if (siteConfig.name.includes('.')) {
      const parts = siteConfig.name.split('.');
      return (
        <span className="font-['Montserrat'] text-xl">
          {parts[0]}
          <span className="text-[var(--primary-color)]">.</span>
          {parts.length > 1 ? parts[1] : ''}
        </span>
      );
    }
    return <span className="font-['Montserrat'] text-xl">{siteConfig.name}</span>;
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {siteConfig.logo ? (
              <img 
                src={siteConfig.logo} 
                alt={siteConfig.name} 
                className="h-10" 
              />
            ) : (
              formattedSiteName()
            )}
          </Link>
          
          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {getMenuItems().map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={`text-sm font-medium hover:text-[var(--primary-color)] transition-colors ${
                  location === item.path ? 'text-[var(--primary-color)]' : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[var(--primary-color)]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col space-y-4">
              {getMenuItems().map((item) => (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={`text-sm font-medium hover:text-[var(--primary-color)] transition-colors ${
                    location === item.path ? 'text-[var(--primary-color)]' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}