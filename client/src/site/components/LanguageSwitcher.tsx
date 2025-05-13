import React from 'react';
import { useI18n, Language } from '@/lib/i18n';

/**
 * Componente para alternar entre os idiomas disponíveis.
 * Mostra um menu dropdown com as opções de idioma.
 */
export function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  // Função para mudar o idioma sem recarregar a página
  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
  };

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`text-xs px-2 py-1 rounded flex items-center ${language === lang.code ? 'bg-white/20 font-medium' : 'text-gray-300 hover:text-white'}`}
          onClick={() => handleLanguageChange(lang.code)}
        >
          <span className="mr-1">{lang.flag}</span>
          {lang.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}