import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Globe } from 'lucide-react';
import { useSite } from '../SiteContext';
import { useI18n, Language } from '@/lib/i18n';

export default function SiteNavbar() {
  const { siteConfig } = useSite();
  const { t, language, setLanguage } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [location] = useLocation();
  
  // Available languages
  const languages = [
    { code: 'pt' as Language, label: 'Português' },
    { code: 'en' as Language, label: 'English' },
    { code: 'es' as Language, label: 'Español' }
  ];

  // Handle scroll event to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle services dropdown
  const toggleServicesDropdown = () => {
    setServicesDropdownOpen(!servicesDropdownOpen);
  };

  // Determine if we're on a page that should have transparent navbar
  const sitePrefix = `/site/${siteConfig.code}`;
  const shouldBeTransparent = location === sitePrefix || location.includes(`${sitePrefix}/about`) || location.includes(`${sitePrefix}/services`);
  const navbarClass = isScrolled || !shouldBeTransparent
    ? 'bg-black shadow-md'
    : 'bg-transparent';

  // Services for dropdown menu
  const services = [
    { id: 'infraops', name: 'n.InfraOps', path: `${sitePrefix}/services#infraops` },
    { id: 'secops', name: 'n.SecOps', path: `${sitePrefix}/services#secops` },
    { id: 'devarch', name: 'n.DevArch', path: `${sitePrefix}/services#devarch` },
    { id: 'autoops', name: 'n.AutoOps', path: `${sitePrefix}/services#autoops` },
    { id: 'crisisops', name: 'n.CrisisOps', path: `${sitePrefix}/services#crisisops` }
  ];

  // Handle language change
  const handleLanguageChange = (lang: Language) => {
    if (lang !== language) {
      setLanguage(lang);
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${navbarClass}`}>
      <div className="container mx-auto px-4 py-2">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={sitePrefix} className="text-white lowercase">
              <h1 className="font-['Montserrat'] font-normal text-3xl">
                {siteConfig.name.replace('.', '')}<span style={{color: siteConfig.primaryColor, marginLeft: "1px"}}>.</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link href={`${sitePrefix}/about`} className="text-white hover:text-accent transition duration-200 text-sm lowercase px-1 py-0.5">
              {t('nav.about')}
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative group">
              <button 
                onClick={toggleServicesDropdown}
                className="text-white hover:text-accent transition duration-200 text-sm flex items-center lowercase px-1 py-0.5"
              >
                {t('nav.services')}
                <svg 
                  className={`w-3 h-3 ml-1 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {servicesDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-gray-50 border border-gray-200 z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {services.map(service => (
                      <Link 
                        key={service.id}
                        href={service.path}
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors duration-150"
                        onClick={() => setServicesDropdownOpen(false)}
                      >
                        n<span className="text-[#00ade0]">.</span>{service.name.substring(1)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <Link href={`${sitePrefix}/jobs`} className="text-white hover:text-accent transition duration-200 font-medium lowercase">
              {t('nav.jobs')}
            </Link>
            <Link href={`${sitePrefix}/news`} className="text-white hover:text-accent transition duration-200 font-medium lowercase">
              {t('nav.news')}
            </Link>
            
            {/* Language Selector */}
            <div className="relative ml-4">
              <div className="flex items-center space-x-2">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`px-2 py-1 rounded-sm text-sm transition-colors ${
                      language === lang.code 
                        ? 'bg-[var(--primary-color)] text-white font-medium' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Contact as a button */}
            <Link href={`${sitePrefix}/contact`} className="bg-[var(--primary-color)] hover:bg-opacity-90 text-white py-2 px-4 rounded-sm transition duration-200 lowercase">
              {t('nav.contact')}
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-white hover:text-accent focus:outline-none">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-3 pb-4">
              <Link href={`${sitePrefix}/about`} className="text-white hover:text-accent transition duration-200 font-medium lowercase">
                {t('nav.about')}
              </Link>
              
              {/* Mobile Services Dropdown */}
              <div>
                <button
                  onClick={toggleServicesDropdown}
                  className="text-white hover:text-accent transition duration-200 font-medium flex items-center w-full justify-between lowercase"
                >
                  {t('nav.services')}
                  <svg 
                    className={`w-4 h-4 ml-1 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {servicesDropdownOpen && (
                  <div className="pl-4 mt-2 space-y-2 border-l border-gray-700">
                    {services.map(service => (
                      <Link 
                        key={service.id}
                        href={service.path}
                        className="text-gray-300 hover:text-accent transition duration-200 block"
                      >
                        {service.name}
                      </Link>
                    ))}
                    <Link 
                      href={`${sitePrefix}/services`}
                      className="text-accent hover:text-accent-light transition duration-200 block mt-2 font-medium lowercase"
                    >
                      {t('nav.seeAllServices')}
                    </Link>
                  </div>
                )}
              </div>
              
              <Link href={`${sitePrefix}/jobs`} className="text-white hover:text-accent transition duration-200 font-medium lowercase">
                {t('nav.jobs')}
              </Link>
              <Link href={`${sitePrefix}/news`} className="text-white hover:text-accent transition duration-200 font-medium lowercase">
                {t('nav.news')}
              </Link>
              
              {/* Language Selector for Mobile */}
              <div className="border-t border-gray-600 pt-4">
                <p className="text-white mb-2 text-sm lowercase">{t('nav.language')}:</p>
                <div className="flex flex-wrap items-center gap-2">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`px-3 py-1 rounded-sm text-sm ${
                        language === lang.code 
                          ? 'bg-[var(--primary-color)] text-white font-medium' 
                          : 'text-gray-300 border border-gray-700 hover:border-[var(--primary-color)]'
                      }`}
                    >
                      {lang.code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Contact as a button */}
              <Link href={`${sitePrefix}/contact`} className="bg-[var(--primary-color)] hover:bg-opacity-90 text-white py-2 px-4 rounded-sm transition duration-200 text-center lowercase">
                {t('nav.contact')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}