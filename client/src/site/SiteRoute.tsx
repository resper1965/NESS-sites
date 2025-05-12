import React, { ReactNode } from 'react';
import { Route } from 'wouter';
import { SiteProvider, type SiteCode } from './SiteContext';

interface SiteRouteProps {
  path: string;
  siteCode: SiteCode;
  component: () => ReactNode;
}

export function SiteRoute({ path, siteCode, component: Component }: SiteRouteProps) {
  return (
    <Route path={path}>
      <SiteProvider siteCode={siteCode}>
        <Component />
      </SiteProvider>
    </Route>
  );
}

// HOC para criar uma rota específica para o site ness
export function NessRoute({ path, component }: Omit<SiteRouteProps, 'siteCode'>) {
  // Faz o path ficar correto, adicionando uma barra final se necessário
  const formattedPath = path === '/' ? '/site/ness/' : `/site/ness${path}`;
  return <SiteRoute path={formattedPath} siteCode="ness" component={component} />;
}

// HOC para criar uma rota específica para o site trustness
export function TrustnessRoute({ path, component }: Omit<SiteRouteProps, 'siteCode'>) {
  // Faz o path ficar correto, adicionando uma barra final se necessário
  const formattedPath = path === '/' ? '/site/trustness/' : `/site/trustness${path}`;
  return <SiteRoute path={formattedPath} siteCode="trustness" component={component} />;
}

// HOC para criar uma rota específica para o site forense
export function ForenseRoute({ path, component }: Omit<SiteRouteProps, 'siteCode'>) {
  // Faz o path ficar correto, adicionando uma barra final se necessário
  const formattedPath = path === '/' ? '/site/forense/' : `/site/forense${path}`;
  return <SiteRoute path={formattedPath} siteCode="forense" component={component} />;
}