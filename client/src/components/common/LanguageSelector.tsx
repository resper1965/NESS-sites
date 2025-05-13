import { useState, useEffect, useRef } from 'react';
import { useI18n, Language } from '@/lib/i18n';

export default function LanguageSelector() {
  const { language, setLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  // Close dropdown when clicking outside
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
  
  // Handle language change
  const handleLanguageChange = (lang: Language) => {
    if (lang !== language) {
      setLanguage(lang);
      setIsOpen(false);
    }
  };
  
  return (
    <div className="relative ml-4" ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className="flex items-center text-white hover:text-accent transition duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{language.toUpperCase()}</span>
        <svg className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`block w-full text-left px-4 py-2 text-sm ${
                language === lang.code ? 'bg-neutral-dark text-primary font-medium' : 'text-gray-800 hover:bg-neutral-dark hover:text-white'
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
