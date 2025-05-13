import React from 'react';
import { useI18n, Language } from '@/lib/i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from 'lucide-react';

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
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center text-sm gap-1 outline-none">
        <Globe className="h-4 w-4" />
        <span className="text-xs font-medium uppercase ml-1">{language}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`text-sm cursor-pointer ${language === lang.code ? 'font-bold' : ''}`}
            onClick={() => handleLanguageChange(lang.code)}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}