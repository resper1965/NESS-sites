import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { useSite } from '../SiteContext';
import { useI18n, Language } from '@/lib/i18n';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export default function SiteNavbar() {
  const { siteConfig } = useSite();
  const { t, language, setLanguage } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [location] = useLocation();
  
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

  // Services for dropdown menu - diferentes para cada site
  const nessServices = [
    { id: 'secops', name: 'n.SecOps', path: `/site/ness/services#secops` },
    { id: 'infraops', name: 'n.InfraOps', path: `/site/ness/services#infraops` },
    { id: 'devarch', name: 'n.DevArch', path: `/site/ness/services#devarch` },
    { id: 'autoops', name: 'n.AutoOps', path: `/site/ness/services#autoops` },
    { id: 'crisisops', name: 'n.CrisisOps', path: `/site/ness/services#crisisops` },
    { id: 'privacy', name: 'n.Privacy', path: `/site/ness/services#privacy` }
  ];
  
  const trustnessServices = [
    { id: 'assessment', name: '.assessment', path: `/site/trustness/services#assessment` },
    { id: 'conformity', name: '.conformity', path: `/site/trustness/services#conformity` },
    { id: 'privacy', name: '.privacy', path: `/site/trustness/services#privacy` }
  ];
  
  // Serviços da forense.io
  const forenseServices = [
    { id: 'digital-forensics', name: 'forense.digital', path: `/site/forense/services/digital-forensics` },
    { id: 'legal-support', name: 'suporte.legal', path: `/site/forense/services/legal-support` },
    { id: 'corporate-investigations', name: 'investigações.corporativas', path: `/site/forense/services/corporate-investigations` }
  ];
  
  // Seleciona serviços com base no site atual
  const services = siteConfig.code === 'ness' ? nessServices : 
                   siteConfig.code === 'trustness' ? trustnessServices :
                   siteConfig.code === 'forense' ? forenseServices : [];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${navbarClass}`}>
      <div className="container mx-auto px-4 py-2">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={sitePrefix} className="text-white lowercase">
              <h1 className="font-['Montserrat'] font-normal text-3xl">
                {siteConfig.code === 'forense' 
                  ? <>forense<span style={{color: "#00ade0", marginLeft: "1px"}}>.</span>io</>
                  : <>{siteConfig.name.replace('.', '')}<span style={{color: siteConfig.primaryColor, marginLeft: "1px"}}>.</span></>
                }
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
                        {siteConfig.code === 'ness' ? (
                          <>n<span className="text-[#00ade0]">.</span>{service.name.substring(2)}</>
                        ) : siteConfig.code === 'trustness' ? (
                          <><span className="text-[#005fa3]">.</span>{service.name.substring(1)}</>
                        ) : siteConfig.code === 'forense' ? (
                          service.name === 'forense.digital' ? (
                            <>forense<span className="text-[#00ade0]">.</span>digital</>
                          ) : service.name === 'suporte.legal' ? (
                            <>suporte<span className="text-[#00ade0]">.</span>legal</>
                          ) : (
                            <>investigações<span className="text-[#00ade0]">.</span>corporativas</>
                          )
                        ) : null}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <Link href={`${sitePrefix}/jobs`} className="text-white hover:text-accent transition duration-200 text-sm lowercase px-1 py-0.5">
              {t('nav.jobs')}
            </Link>
            <Link href={`${sitePrefix}/news`} className="text-white hover:text-accent transition duration-200 text-sm lowercase px-1 py-0.5">
              {t('nav.news')}
            </Link>
            
            {/* Language Switcher */}
            <div className="ml-4">
              <LanguageSwitcher />
            </div>
            
            {/* Contact as a button */}
            <Link 
              href={`${sitePrefix}/contact`} 
              className={`${siteConfig.code === 'forense' ? 'bg-[#00ade0]' : 'bg-[var(--primary-color)]'} hover:bg-opacity-90 text-white py-1.5 px-3 rounded-sm transition duration-200 text-sm lowercase ml-2`}
            >
              {t('nav.contact')}
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-white p-2"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900 mt-2 p-4 rounded-md">
            <div className="flex flex-col space-y-4">
              <Link href={`${sitePrefix}/about`} className="text-white hover:text-accent transition duration-200 font-medium lowercase">
                {t('nav.about')}
              </Link>
              {/* Dropdown para Serviços no Mobile */}
              <div className="text-white font-medium lowercase mb-2">
                {t('nav.services')}
              </div>
              {services.map(service => (
                <Link 
                  key={service.id}
                  href={service.path}
                  className="text-gray-300 hover:text-accent transition duration-200 pl-3 pb-1 text-sm lowercase block"
                >
                  {siteConfig.code === 'ness' ? (
                    <>n<span className="text-[#00ade0]">.</span>{service.name.substring(2)}</>
                  ) : siteConfig.code === 'trustness' ? (
                    <><span className="text-[#005fa3]">.</span>{service.name.substring(1)}</>
                  ) : siteConfig.code === 'forense' ? (
                    service.name === 'forense.digital' ? (
                      <>forense<span className="text-[#00ade0]">.</span>digital</>
                    ) : service.name === 'suporte.legal' ? (
                      <>suporte<span className="text-[#00ade0]">.</span>legal</>
                    ) : (
                      <>investigações<span className="text-[#00ade0]">.</span>corporativas</>
                    )
                  ) : null}
                </Link>
              ))}
              <Link href={`${sitePrefix}/jobs`} className="text-white hover:text-accent transition duration-200 font-medium lowercase">
                {t('nav.jobs')}
              </Link>
              <Link href={`${sitePrefix}/news`} className="text-white hover:text-accent transition duration-200 font-medium lowercase">
                {t('nav.news')}
              </Link>
              
              {/* Language Switcher Mobile */}
              <div className="mb-4 mt-2 flex justify-center">
                <LanguageSwitcher />
              </div>
              <Link 
                href={`${sitePrefix}/contact`} 
                className={`${siteConfig.code === 'forense' ? 'bg-[#00ade0]' : 'bg-[var(--primary-color)]'} hover:bg-opacity-90 text-white py-2 px-4 rounded-sm transition duration-200 text-center lowercase`}
              >
                {t('nav.contact')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}