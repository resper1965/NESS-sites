import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useI18n, Language } from '@/lib/i18n';
import LanguageSelector from '@/components/common/LanguageSelector';
import { useAuth } from '@/hooks/use-auth';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Determine if we're on a page that should have transparent navbar
  const shouldBeTransparent = location === '/' || location.startsWith('/about') || location.startsWith('/services');
  const navbarClass = isScrolled || !shouldBeTransparent
    ? 'bg-black shadow-md'
    : 'bg-transparent';

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
          <div className="hidden md:flex space-x-4 items-center">
            <Link href="/" className="text-white hover:text-accent transition duration-200 font-medium">
              {t('nav.home')}
            </Link>
            <Link href="/about" className="text-white hover:text-accent transition duration-200 font-medium">
              {t('nav.about')}
            </Link>
            <Link href="/services" className="text-white hover:text-accent transition duration-200 font-medium">
              {t('nav.services')}
            </Link>
            <Link href="/jobs" className="text-white hover:text-accent transition duration-200 font-medium">
              {t('nav.jobs')}
            </Link>
            <Link href="/news" className="text-white hover:text-accent transition duration-200 font-medium">
              {t('nav.news')}
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
        <div className="md:hidden bg-primary-dark">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-3 pb-4">
              <Link href="/" className="text-white hover:text-accent transition duration-200 font-medium">
                {t('nav.home')}
              </Link>
              <Link href="/about" className="text-white hover:text-accent transition duration-200 font-medium">
                {t('nav.about')}
              </Link>
              <Link href="/services" className="text-white hover:text-accent transition duration-200 font-medium">
                {t('nav.services')}
              </Link>
              <Link href="/jobs" className="text-white hover:text-accent transition duration-200 font-medium">
                {t('nav.jobs')}
              </Link>
              <Link href="/news" className="text-white hover:text-accent transition duration-200 font-medium">
                {t('nav.news')}
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
