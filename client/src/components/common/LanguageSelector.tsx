import { useState } from 'react';
import { useI18n, Language } from '@/lib/i18n';

export default function LanguageSelector() {
  const { language, setLanguage, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const languages: { code: Language; label: string }[] = [
    { code: 'pt', label: 'Português' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
  ];
  
  return (
    <div className="relative ml-4 group">
      <button 
        onClick={toggleDropdown}
        className="flex items-center text-white hover:text-accent transition duration-200"
      >
        <span>{language.toUpperCase()}</span>
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg overflow-hidden z-20">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm ${
                language === lang.code ? 'bg-neutral-dark text-primary font-medium' : 'text-gray-800 hover:bg-neutral-dark'
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
