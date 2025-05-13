import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSite } from '../SiteContext';
import { useI18n, Language } from '@/lib/i18n';
import { useAuth } from '@/hooks/use-auth';

export default function SiteNavbar() {
  const { siteConfig } = useSite();
  const { t, language, setLanguage } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();
  const { user } = useAuth();
  
  // Available languages
  const languages = [
    { code: 'pt', label: 'Português' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
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

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${navbarClass}`}>
      <div className="container mx-auto px-4 py-2">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href={sitePrefix} className="text-white lowercase">
              <h1 className="font-['Montserrat'] font-normal text-3xl">
                {siteConfig.name.replace('.', '')}<span style={{color: siteConfig.primaryColor, marginLeft: "1px"}}>.</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href={`${sitePrefix}/about`} className="text-white hover:text-accent transition duration-200 font-medium lowercase">
              {t('nav.about')}
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative" ref={servicesDropdownRef}>
              <button 
                onClick={toggleServicesDropdown}
                className="text-white hover:text-accent transition duration-200 font-medium flex items-center lowercase"
                aria-expanded={servicesDropdownOpen}
                aria-haspopup="true"
              >
                {t('nav.services')}
                <ChevronDown 
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${servicesDropdownOpen ? 'transform rotate-180' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div 
                    className="absolute left-0 mt-2 w-56 rounded-md shadow-lg overflow-hidden z-50"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-gray-900 py-1 border border-gray-800" role="menu" aria-orientation="vertical">
                      {services.map(service => (
                        <motion.div 
                          key={service.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                        >
                          <Link 
                            href={service.path}
                            className="block px-4 py-3 text-sm text-gray-200 hover:bg-gray-800 transition-colors duration-150 flex items-center"
                            onClick={() => setServicesDropdownOpen(false)}
                          >
                            <motion.div 
                              className="w-2 h-2 rounded-full bg-[var(--primary-color)] mr-2"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                            {service.name}
                          </Link>
                        </motion.div>
                      ))}
                      <Link 
                        href={`${sitePrefix}/services`}
                        className="block px-4 py-3 text-sm font-medium text-[var(--primary-color)] hover:bg-gray-800 border-t border-gray-700 lowercase transition-colors duration-150"
                        onClick={() => setServicesDropdownOpen(false)}
                      >
                        {t('nav.seeAllServices')}
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Link href={`${sitePrefix}/jobs`} className="text-white hover:text-accent transition duration-200 font-medium lowercase">
              {t('nav.jobs')}
            </Link>
            <Link href={`${sitePrefix}/news`} className="text-white hover:text-accent transition duration-200 font-medium lowercase">
              {t('nav.news')}
            </Link>
            
            {/* Custom Language Selector */}
            <div className="relative" ref={languageDropdownRef}>
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="flex items-center text-white hover:text-accent transition duration-200"
                aria-expanded={languageDropdownOpen}
                aria-haspopup="true"
              >
                <Globe size={16} className="mr-1" />
                <span>{language.toUpperCase()}</span>
                <ChevronDown 
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${languageDropdownOpen ? 'transform rotate-180' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {languageDropdownOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-32 bg-gray-900 rounded-md shadow-lg overflow-hidden z-50 border border-gray-800"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        onClick={() => {
                          if (lang.code !== language) {
                            setLanguage(lang.code);
                            setLanguageDropdownOpen(false);
                          }
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                          language === lang.code 
                            ? 'bg-gray-800 text-[var(--primary-color)] font-medium' 
                            : 'text-gray-200 hover:bg-gray-800'
                        }`}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.15, delay: 0.05 * languages.findIndex(l => l.code === lang.code) }}
                      >
                        {lang.label}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Contact as a button */}
            <Link href={`${sitePrefix}/contact`} className="bg-[var(--primary-color)] hover:bg-opacity-90 text-white py-2 px-4 rounded-sm transition duration-200 lowercase">
              {t('nav.contact')}
            </Link>
            
            {/* Only show Admin button if user is logged in */}
            {user && (
              <Link href="/admin/dashboard" className="bg-accent hover:bg-accent-dark text-white py-2 px-4 rounded transition duration-200">
                Admin
              </Link>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-white hover:text-accent focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
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
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${servicesDropdownOpen ? 'transform rotate-180' : ''}`} 
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
              
              <div className="border-t border-gray-600 pt-4">
                <p className="text-white mb-2 text-sm lowercase">{t('nav.language')}:</p>
                <div className="flex flex-wrap items-center gap-2">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        if (lang.code !== language) {
                          setLanguage(lang.code);
                        }
                      }}
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
              
              {/* Only show Admin button if user is logged in */}
              {user && (
                <Link href="/admin/dashboard" className="bg-accent hover:bg-accent-dark text-white py-2 px-4 rounded transition duration-200 inline-block">
                  Admin
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}