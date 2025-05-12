import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { useI18n, Language } from '@/lib/i18n';
import LanguageSelector from '@/components/common/LanguageSelector';
import { useAuth } from '@/hooks/use-auth';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();
  const [location] = useLocation();
  const { user } = useAuth();

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

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle services dropdown
  const toggleServicesDropdown = () => {
    setServicesDropdownOpen(!servicesDropdownOpen);
  };

  // Determine if we're on a page that should have transparent navbar
  const shouldBeTransparent = location === '/' || location.startsWith('/about') || location.startsWith('/services');
  const navbarClass = isScrolled || !shouldBeTransparent
    ? 'bg-black shadow-md'
    : 'bg-transparent';

  // Services for dropdown menu
  const services = [
    { id: 'infraops', name: 'n.InfraOps', path: '/services#infraops' },
    { id: 'secops', name: 'n.SecOps', path: '/services#secops' },
    { id: 'devarch', name: 'n.DevArch', path: '/services#devarch' },
    { id: 'autoops', name: 'n.AutoOps', path: '/services#autoops' },
    { id: 'crisisops', name: 'n.CrisisOps', path: '/services#crisisops' }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${navbarClass}`}>
      <div className="container mx-auto px-4 py-2">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-white text-xl lowercase">
              ness<span style={{color: "#00ade0", marginLeft: "1px"}}>.</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="text-white hover:text-accent transition duration-200 font-medium">
              {t('nav.home')}
            </Link>
            <Link href="/about" className="text-white hover:text-accent transition duration-200 font-medium">
              {t('nav.about')}
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={toggleServicesDropdown}
                className="text-white hover:text-accent transition duration-200 font-medium flex items-center"
              >
                O que fazemos
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
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {services.map(service => (
                      <Link 
                        key={service.id}
                        href={service.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setServicesDropdownOpen(false)}
                      >
                        {service.name}
                      </Link>
                    ))}
                    <Link 
                      href="/services"
                      className="block px-4 py-2 text-sm font-medium text-accent hover:bg-gray-100 border-t border-gray-100"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      Ver todos os serviços
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <Link href="/jobs" className="text-white hover:text-accent transition duration-200 font-medium">
              {t('nav.jobs')}
            </Link>
            <Link href="/news" className="text-white hover:text-accent transition duration-200 font-medium">
              {t('nav.news')}
            </Link>
            <Link href="/contact" className="text-white hover:text-accent transition duration-200 font-medium">
              {t('nav.contact')}
            </Link>
            
            {/* Language Selector */}
            <LanguageSelector />
            
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
              <Link href="/" className="text-white hover:text-accent transition duration-200 font-medium">
                {t('nav.home')}
              </Link>
              <Link href="/about" className="text-white hover:text-accent transition duration-200 font-medium">
                {t('nav.about')}
              </Link>
              
              {/* Mobile Services Dropdown */}
              <div>
                <button
                  onClick={toggleServicesDropdown}
                  className="text-white hover:text-accent transition duration-200 font-medium flex items-center w-full justify-between"
                >
                  O que fazemos
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
                      href="/services"
                      className="text-accent hover:text-accent-light transition duration-200 block mt-2 font-medium"
                    >
                      Ver todos os serviços
                    </Link>
                  </div>
                )}
              </div>
              
              <Link href="/jobs" className="text-white hover:text-accent transition duration-200 font-medium">
                {t('nav.jobs')}
              </Link>
              <Link href="/news" className="text-white hover:text-accent transition duration-200 font-medium">
                {t('nav.news')}
              </Link>
              <Link href="/contact" className="text-white hover:text-accent transition duration-200 font-medium">
                {t('nav.contact')}
              </Link>
              
              <div className="border-t border-gray-600 pt-4">
                <p className="text-white mb-2 text-sm">{t('nav.language')}:</p>
                <div className="flex space-x-4">
                  <button onClick={() => {
                    const { setLanguage } = useI18n();
                    setLanguage('pt' as Language);
                  }} className="text-white hover:text-accent">PT</button>
                  <button onClick={() => {
                    const { setLanguage } = useI18n();
                    setLanguage('en' as Language);
                  }} className="text-white hover:text-accent">EN</button>
                  <button onClick={() => {
                    const { setLanguage } = useI18n();
                    setLanguage('es' as Language);
                  }} className="text-white hover:text-accent">ES</button>
                </div>
              </div>
              
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
