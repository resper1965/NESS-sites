import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSite } from '../SiteContext';

interface SiteLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export default function SiteLayout({
  children,
  title,
  description,
  ogImage,
  canonicalUrl,
}: SiteLayoutProps) {
  const { siteConfig } = useSite();
  
  // Meta tags do site
  const pageTitle = title || siteConfig.metadata?.defaultTitle || '';
  const pageDescription = description || siteConfig.metadata?.defaultDescription || '';
  const pageImage = ogImage || siteConfig.metadata?.ogImage || '';
  
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        {pageImage && <meta property="og:image" content={pageImage} />}
        {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        {pageImage && <meta name="twitter:image" content={pageImage} />}
        
        {/* Favicon */}
        {siteConfig.metadata?.favicon && (
          <link rel="icon" type="image/png" href={siteConfig.metadata.favicon} />
        )}
        
        {/* CSS Vars para cores do tema */}
        <style>
          {`
            :root {
              --primary-color: ${siteConfig.primaryColor || '#00ade0'};
              --secondary-color: ${siteConfig.secondaryColor || '#2f3e4d'};
            }
          `}
        </style>
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        {/* Temporariamente usando componentes básicos de navegação */}
        <header className="bg-white shadow-sm py-4">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">{siteConfig.name}</h1>
              <nav className="space-x-4">
                <a href="#" className="text-gray-600 hover:text-[var(--primary-color)]">Home</a>
                <a href="#" className="text-gray-600 hover:text-[var(--primary-color)]">About</a>
                <a href="#" className="text-gray-600 hover:text-[var(--primary-color)]">Services</a>
                <a href="#" className="text-gray-600 hover:text-[var(--primary-color)]">Contact</a>
              </nav>
            </div>
          </div>
        </header>
        
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Footer básico */}
        <footer className="bg-[var(--secondary-color)] text-white py-8">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p>© {new Date().getFullYear()} {siteConfig.name} All Rights Reserved</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}