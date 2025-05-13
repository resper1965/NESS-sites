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

  // Services for dropdown menu with descriptions
  const services = [
    { 
      id: 'secops', 
      name: 'n.SecOps', 
      path: '/services/secops',
      description: 'Segurança integrada às operações com monitoramento contínuo.'
    },
    { 
      id: 'infraops', 
      name: 'n.InfraOps', 
      path: '/services/infraops',
      description: 'Gestão moderna de infraestrutura com alta disponibilidade.'
    },
    { 
      id: 'devarch', 
      name: 'n.DevArch', 
      path: '/services#devarch',
      description: 'Fundamentos sólidos para desenvolvimento com arquitetura segura.'
    },
    { 
      id: 'autoops', 
      name: 'n.AutoOps', 
      path: '/services#autoops',
      description: 'Automação inteligente de processos operacionais.'
    },
    { 
      id: 'crisisops', 
      name: 'n.CrisisOps', 
      path: '/services#crisisops',
      description: 'Resposta imediata para incidentes e gestão de crises cibernéticas.'
    },
    { 
      id: 'privacy', 
      name: 'n.Privacy', 
      path: '/services#privacy',
      description: 'Gestão completa de privacidade para conformidade com LGPD/GDPR.'
    }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${navbarClass}`}>
      <div className="container mx-auto px-4 py-2">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-white lowercase">
              <h1 className="font-['Montserrat'] font-normal text-3xl">
                ness<span style={{color: "#00ade0", marginLeft: "1px"}}>.</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/about" className="text-white hover:text-accent transition duration-200 font-medium lowercase">
              {t('nav.about')}
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={toggleServicesDropdown}
                className="text-white hover:text-accent transition duration-200 font-medium flex items-center lowercase"
              >
                o que fazemos
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
                <div className="absolute -left-16 mt-2 w-[800px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-6">
                  <div className="grid grid-cols-3 gap-6" role="menu" aria-orientation="vertical">
                    {services.map(service => (
                      <Link 
                        key={service.id}
                        href={service.path}
                        className="block p-4 rounded hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => setServicesDropdownOpen(false)}
                      >
                        <h3 className="font-['Montserrat'] text-gray-800 text-lg mb-2">
                          n<span className="text-[#00ade0]">.</span>{service.name.substring(2)}
                        </h3>
                        <p className="text-sm text-gray-600 leading-snug">{service.description}</p>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                    <Link 
                      href="/services"
                      className="text-accent hover:text-accent-dark font-medium transition-colors duration-200 lowercase"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      ver todos os serviços
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <Link href="/jobs" className="text-white hover:text-accent transition duration-200 font-medium lowercase">
              {t('nav.jobs')}
            </Link>
            <Link href="/news" className="text-white hover:text-accent transition duration-200 font-medium lowercase">
              {t('nav.news')}
            </Link>
            
            {/* Language Selector */}
            <LanguageSelector />
            
            {/* Contact as a button */}
            <Link href="/contact" className="bg-[#00ade0] hover:bg-[#0095c4] text-white py-2 px-4 rounded-sm transition duration-200 lowercase">
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
              <Link href="/about" className="text-white hover:text-accent transition duration-200 font-medium lowercase">
                {t('nav.about')}
              </Link>
              
              {/* Mobile Services Dropdown */}
              <div>
                <button
                  onClick={toggleServicesDropdown}
                  className="text-white hover:text-accent transition duration-200 font-medium flex items-center w-full justify-between lowercase"
                >
                  o que fazemos
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
                      className="text-accent hover:text-accent-light transition duration-200 block mt-2 font-medium lowercase"
                    >
                      ver todos os serviços
                    </Link>
                  </div>
                )}
              </div>
              
              <Link href="/jobs" className="text-white hover:text-accent transition duration-200 font-medium lowercase">
                {t('nav.jobs')}
              </Link>
              <Link href="/news" className="text-white hover:text-accent transition duration-200 font-medium lowercase">
                {t('nav.news')}
              </Link>
              
              <div className="border-t border-gray-600 pt-4">
                <p className="text-white mb-2 text-sm lowercase">{t('nav.language')}:</p>
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
              
              {/* Contact as a button */}
              <Link href="/contact" className="bg-[#00ade0] hover:bg-[#0095c4] text-white py-2 px-4 rounded-sm transition duration-200 text-center lowercase">
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
