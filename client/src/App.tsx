import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { HelmetProvider } from "react-helmet-async";

// Site-specific pages
import NessHomePage from "@/site/ness/HomePage";
import NessAboutPage from "@/site/ness/AboutPage";
import TrustnessHomePage from "@/site/trustness/HomePage";
import TrustnessAboutPage from "@/site/trustness/AboutPage";
import ForenseHomePage from "@/site/forense/HomePage";

// Legacy pages (will be migrated)
import HomePage from "@/pages/home-page";
import AboutPage from "@/pages/about-page";
import ServicesPage from "@/pages/services-page";
import JobsPage from "@/pages/jobs-page";
import NewsPage from "@/pages/news-page";
import EthicsPage from "@/pages/ethics-page";
import PrivacyPage from "@/pages/privacy-page";
import ContactPage from "@/pages/contact-page";
import AuthPage from "@/pages/auth-page";
import AdminLoginPage from "@/pages/admin/login-page";
import AdminDashboardPage from "@/pages/admin/dashboard-page";
import InfraOpsPage from "@/pages/services/infraops-page";
import SecOpsPage from "@/pages/services/secops-page";

import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "@/hooks/use-auth";
import { I18nProvider } from "@/lib/i18n";

// Site Routes
import { NessRoute, TrustnessRoute, ForenseRoute } from "@/site/SiteRoute";
import { SiteProvider } from "@/site/SiteContext";

function Router() {
  return (
    <Switch>
      {/* Site-specific routes - NESS */}
      <Route path="/site/ness">
        <SiteProvider siteCode="ness">
          <NessHomePage />
        </SiteProvider>
      </Route>
      
      <Route path="/site/ness/about">
        <SiteProvider siteCode="ness">
          <NessAboutPage />
        </SiteProvider>
      </Route>
      
      {/* Site-specific routes - TRUSTNESS */}
      <Route path="/site/trustness">
        <SiteProvider siteCode="trustness">
          <TrustnessHomePage />
        </SiteProvider>
      </Route>

      <Route path="/site/trustness/about">
        <SiteProvider siteCode="trustness">
          <TrustnessAboutPage />
        </SiteProvider>
      </Route>
      
      {/* Site-specific routes - FORENSE */}
      <Route path="/site/forense">
        <SiteProvider siteCode="forense">
          <ForenseHomePage />
        </SiteProvider>
      </Route>
      
      {/* Default route - redirect to NESS site */}
      <Route path="/">
        <Redirect to="/site/ness" />
      </Route>

      {/* Legacy routes - will be removed after migration */}
      <Route path="/about" component={AboutPage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/services/infraops" component={InfraOpsPage} />
      <Route path="/services/secops" component={SecOpsPage} />
      <Route path="/jobs" component={JobsPage} />
      <Route path="/news" component={NewsPage} />
      <Route path="/ethics" component={EthicsPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/contact" component={ContactPage} />
      
      {/* Auth Route */}
      <Route path="/auth" component={AuthPage} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLoginPage} />
      <Route path="/admin/dashboard" component={AdminDashboardPage} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <AuthProvider>
          <HelmetProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </HelmetProvider>
        </AuthProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;
