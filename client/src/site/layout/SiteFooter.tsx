import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { useI18n, Language } from '@/lib/i18n';
import { useSite } from '../SiteContext';
import { 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram, 
  Youtube,
  Phone, 
  Mail, 
  MapPin,
  Globe
} from 'lucide-react';

export default function SiteFooter() {
  const { t } = useI18n();
  const { siteConfig } = useSite();
  const currentYear = new Date().getFullYear();
  
  const sitePrefix = `/site/${siteConfig.code}`;
  
  // Função auxiliar para renderizar o componente correto do ícone social
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin size={20} />;
      case 'twitter':
        return <Twitter size={20} />;
      case 'facebook':
        return <Facebook size={20} />;
      case 'instagram':
        return <Instagram size={20} />;
      case 'youtube':
        return <Youtube size={20} />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Coluna 1: Sobre a empresa */}
          <div>
            <div className="text-white text-xl mb-6 inline-block">
              <Link href={sitePrefix}>
                {siteConfig.name}
              </Link>
            </div>
            <p className="text-gray-300 mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {/* LinkedIn */}
              {siteConfig.socialMedia?.linkedin && (
                <a 
                  href={siteConfig.socialMedia.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300"
                >
                  <Linkedin size={20} />
                </a>
              )}
              
              {/* Twitter */}
              {siteConfig.socialMedia?.twitter && (
                <a 
                  href={siteConfig.socialMedia.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300"
                >
                  <Twitter size={20} />
                </a>
              )}
              
              {/* Facebook */}
              {siteConfig.socialMedia?.facebook && (
                <a 
                  href={siteConfig.socialMedia.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300"
                >
                  <Facebook size={20} />
                </a>
              )}
              
              {/* Instagram */}
              {siteConfig.socialMedia?.instagram && (
                <a 
                  href={siteConfig.socialMedia.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300"
                >
                  <Instagram size={20} />
                </a>
              )}
              
              {/* YouTube */}
              {siteConfig.socialMedia?.youtube && (
                <a 
                  href={siteConfig.socialMedia.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300"
                >
                  <Youtube size={20} />
                </a>
              )}
            </div>
          </div>
          
          {/* Coluna 2: Links Rápidos */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              <li>
                <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                  <Link href={`${sitePrefix}`}>
                    {t('menu.home')}
                  </Link>
                </div>
              </li>
              <li>
                <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                  <Link href={`${sitePrefix}/about`}>
                    {t('menu.about')}
                  </Link>
                </div>
              </li>
              <li>
                <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                  {siteConfig.code === 'ness' ? (
                    <Link href={`${sitePrefix}/services/secops`}>
                      {t('menu.services')}
                    </Link>
                  ) : (
                    <Link href={`${sitePrefix}/services`}>
                      {t('menu.services')}
                    </Link>
                  )}
                </div>
              </li>
              <li>
                <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                  <Link href={`${sitePrefix}/jobs`}>
                    {t('menu.jobs')}
                  </Link>
                </div>
              </li>
              <li>
                <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                  <Link href={`${sitePrefix}/news`}>
                    {t('menu.news')}
                  </Link>
                </div>
              </li>
              <li>
                <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                  <Link href={`${sitePrefix}/contact`}>
                    {t('menu.contact')}
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Coluna 3: Soluções */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('footer.solutions')}</h4>
            <ul className="space-y-3">
              {siteConfig.code === 'ness' && (
                <>
                  <li>
                    <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                      <Link href={`${sitePrefix}/services/infraops`}>
                        n.InfraOps
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                      <Link href={`${sitePrefix}/services/secops`}>
                        n.SecOps
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                      <Link href={`${sitePrefix}/services/devarch`}>
                        n.DevArch
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                      <Link href={`${sitePrefix}/services/autoops`}>
                        n.AutoOps
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                      <Link href={`${sitePrefix}/services/crisisops`}>
                        n.CrisisOps
                      </Link>
                    </div>
                  </li>
                </>
              )}
              {siteConfig.code !== 'ness' && (
                <>
                  <li>
                    <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                      <Link href={`${sitePrefix}/services#infraops`}>
                        n.InfraOps
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                      <Link href={`${sitePrefix}/services#secops`}>
                        n.SecOps
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                      <Link href={`${sitePrefix}/services#devarch`}>
                        n.DevArch
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                      <Link href={`${sitePrefix}/services#autoops`}>
                        n.AutoOps
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                      <Link href={`${sitePrefix}/services#crisisops`}>
                        n.CrisisOps
                      </Link>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
          
          {/* Coluna 4: Contato */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-[var(--primary-color)] mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  {t('footer.address')}
                </span>
              </li>
              {siteConfig.contactEmail && (
                <li className="flex items-center">
                  <Mail size={20} className="mr-3 text-[var(--primary-color)] flex-shrink-0" />
                  <a href={`mailto:${siteConfig.contactEmail}`} className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300">
                    {siteConfig.contactEmail}
                  </a>
                </li>
              )}
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-[var(--primary-color)] flex-shrink-0" />
                <span className="text-gray-300">+55 11 4002-8922</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Rodapé Inferior */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {currentYear} {siteConfig.name} {t('footer.rights')}</p>
            
            {/* Links de Documentos Legais */}
            <div className="flex flex-wrap justify-center gap-x-4 mt-4 md:mt-0">
              <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300 whitespace-nowrap">
                <Link href={`${sitePrefix}/privacy`}>
                  {t('footer.privacy')}
                </Link>
              </div>
              <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300 whitespace-nowrap">
                <Link href={`${sitePrefix}/terms`}>
                  {t('footer.terms')}
                </Link>
              </div>
              <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300 whitespace-nowrap">
                <Link href={`${sitePrefix}/cookies`}>
                  {t('footer.cookies')}
                </Link>
              </div>
              <div className="text-gray-300 hover:text-[var(--primary-color)] transition duration-300 whitespace-nowrap">
                <Link href="/auth">
                  {t('footer.login')}
                </Link>
              </div>
              
              {/* Links para outras marcas */}
              <div className="flex gap-x-4 ml-4 pl-4 border-l border-gray-700">
                {siteConfig.code !== 'ness' && (
                  <div className="text-gray-300 hover:text-[#00ade0] transition duration-300 whitespace-nowrap">
                    <Link href="/site/ness">
                      ness<span className="text-[#00ade0]">.</span>
                    </Link>
                  </div>
                )}
                {siteConfig.code !== 'trustness' && (
                  <div className="text-gray-300 hover:text-[#00ade0] transition duration-300 whitespace-nowrap">
                    <Link href="/site/trustness">
                      trustness<span className="text-[#00ade0]">.</span>
                    </Link>
                  </div>
                )}
                {siteConfig.code !== 'forense' && (
                  <div className="text-gray-300 hover:text-[#00ade0] transition duration-300 whitespace-nowrap">
                    <Link href="/site/forense">
                      forense<span className="text-[#00ade0]">.</span>io
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Função FooterLanguageSelector foi removida pois o seletor de idiomas foi movido para o header