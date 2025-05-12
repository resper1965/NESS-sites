import React from 'react';
import { Link } from 'wouter';
import { useSite } from '../SiteContext';
import { useI18n } from '@/lib/i18n';
import { 
  Linkedin, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Mail, 
  ExternalLink
} from 'lucide-react';

export default function SiteFooter() {
  const { siteConfig } = useSite();
  const { t } = useI18n();
  
  // Obter o ano atual para o copyright
  const currentYear = new Date().getFullYear();

  // Nome formatado do site com ponto em destaque
  const formattedSiteName = () => {
    if (siteConfig.name.includes('.')) {
      const parts = siteConfig.name.split('.');
      return (
        <span className="font-['Montserrat'] text-xl">
          {parts[0]}
          <span className="text-[var(--primary-color)]">.</span>
          {parts.length > 1 ? parts[1] : ''}
        </span>
      );
    }
    return <span className="font-['Montserrat'] text-xl">{siteConfig.name}</span>;
  };

  // Links de rodapé específicos por site
  const getFooterLinks = () => {
    const links = [
      { path: '/about', label: t('footer.about') },
      { path: '/services', label: t('footer.services') },
      { path: '/contact', label: t('footer.contact') },
      { path: '/privacy', label: t('footer.privacy') },
    ];
    
    // Links específicos por site
    switch (siteConfig.code) {
      case 'ness':
        links.push(
          { path: '/jobs', label: t('footer.jobs') },
          { path: '/news', label: t('footer.news') },
          { path: '/ethics', label: t('footer.ethics') }
        );
        break;
      case 'trustness':
        links.push(
          { path: '/solutions', label: t('footer.solutions') },
          { path: '/cases', label: t('footer.cases') }
        );
        break;
      case 'forense':
        links.push(
          { path: '/services/incident-response', label: t('footer.incident_response') },
          { path: '/services/digital-forensics', label: t('footer.digital_forensics') }
        );
        break;
    }
    
    return links;
  };

  // Renderizar ícones de redes sociais
  const renderSocialLinks = () => {
    const socialLinks = [];
    
    if (siteConfig.socialMedia?.linkedin) {
      socialLinks.push(
        <a 
          key="linkedin" 
          href={siteConfig.socialMedia.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-gray-400 hover:text-[var(--primary-color)] transition-colors"
        >
          <Linkedin size={20} />
        </a>
      );
    }
    
    if (siteConfig.socialMedia?.instagram) {
      socialLinks.push(
        <a 
          key="instagram" 
          href={siteConfig.socialMedia.instagram} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-gray-400 hover:text-[var(--primary-color)] transition-colors"
        >
          <Instagram size={20} />
        </a>
      );
    }
    
    if (siteConfig.socialMedia?.facebook) {
      socialLinks.push(
        <a 
          key="facebook" 
          href={siteConfig.socialMedia.facebook} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="text-gray-400 hover:text-[var(--primary-color)] transition-colors"
        >
          <Facebook size={20} />
        </a>
      );
    }
    
    if (siteConfig.socialMedia?.twitter) {
      socialLinks.push(
        <a 
          key="twitter" 
          href={siteConfig.socialMedia.twitter} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="text-gray-400 hover:text-[var(--primary-color)] transition-colors"
        >
          <Twitter size={20} />
        </a>
      );
    }
    
    if (siteConfig.socialMedia?.youtube) {
      socialLinks.push(
        <a 
          key="youtube" 
          href={siteConfig.socialMedia.youtube} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="text-gray-400 hover:text-[var(--primary-color)] transition-colors"
        >
          <Youtube size={20} />
        </a>
      );
    }
    
    return socialLinks;
  };

  return (
    <footer className="bg-[var(--secondary-color)] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Coluna 1: Logo e descrição */}
          <div>
            <div className="mb-4">
              {siteConfig.logo ? (
                <img 
                  src={siteConfig.logo} 
                  alt={siteConfig.name} 
                  className="h-10" 
                />
              ) : (
                <div className="text-white">{formattedSiteName()}</div>
              )}
            </div>
            <p className="text-gray-300 text-sm">
              {siteConfig.metadata?.defaultDescription}
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              {renderSocialLinks()}
              
              {siteConfig.contactEmail && (
                <a 
                  href={`mailto:${siteConfig.contactEmail}`}
                  aria-label="Email"
                  className="text-gray-400 hover:text-[var(--primary-color)] transition-colors"
                >
                  <Mail size={20} />
                </a>
              )}
            </div>
          </div>
          
          {/* Coluna 2: Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 lowercase">
              {t('footer.site_map')}
            </h3>
            <ul className="space-y-2">
              {getFooterLinks().map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path}
                    className="text-gray-300 hover:text-[var(--primary-color)] transition-colors text-sm lowercase"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Coluna 3: Links para outros sites */}
          <div>
            <h3 className="text-lg font-semibold mb-4 lowercase">
              {t('footer.our_divisions')}
            </h3>
            <ul className="space-y-2">
              {siteConfig.code !== 'ness' && (
                <li>
                  <a 
                    href="https://ness.com.br" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-[var(--primary-color)] transition-colors text-sm lowercase inline-flex items-center"
                  >
                    <span>ness.</span>
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
              )}
              
              {siteConfig.code !== 'trustness' && (
                <li>
                  <a 
                    href="https://trustness.com.br" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-[var(--primary-color)] transition-colors text-sm lowercase inline-flex items-center"
                  >
                    <span>trustness.</span>
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
              )}
              
              {siteConfig.code !== 'forense' && (
                <li>
                  <a 
                    href="https://forense.io" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-[var(--primary-color)] transition-colors text-sm lowercase inline-flex items-center"
                  >
                    <span>forense.io</span>
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
              )}
            </ul>
          </div>
          
          {/* Coluna 4: Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4 lowercase">
              {t('footer.contact')}
            </h3>
            {siteConfig.contactEmail && (
              <p className="text-gray-300 text-sm mb-2">
                {siteConfig.contactEmail}
              </p>
            )}
            
            <div className="mt-4">
              <Link 
                href="/contact"
                className="text-white bg-[var(--primary-color)] hover:bg-opacity-90 px-4 py-2 rounded text-sm lowercase"
              >
                {t('footer.contact_us')}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p className="lowercase">
            © {currentYear} {siteConfig.name} | {t('footer.all_rights_reserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}