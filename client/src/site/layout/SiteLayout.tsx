import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSite } from '../SiteContext';
import SiteNavbar from './SiteNavbar';
import SiteFooter from './SiteFooter';

interface SiteLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
}

export default function SiteLayout({
  children,
  title,
  description,
  ogImage,
  canonicalUrl,
  structuredData,
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
        
        {/* Structured Data / Schema.org */}
        {structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )}
        
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
        <SiteNavbar />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <SiteFooter />
      </div>
    </>
  );
}
