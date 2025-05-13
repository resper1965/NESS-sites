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
    { code: 'pt', label: t('lang.pt'), flag: '🇧🇷' },
    { code: 'en', label: t('lang.en'), flag: '🇺🇸' },
    { code: 'es', label: t('lang.es'), flag: '🇪🇸' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center text-sm gap-1 outline-none">
        <Globe className="h-3.5 w-3.5" />
        <span className="text-xs uppercase">{language}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`text-sm cursor-pointer ${language === lang.code ? 'font-medium' : ''}`}
            onClick={() => setLanguage(lang.code)}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}