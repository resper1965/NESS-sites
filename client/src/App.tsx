import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { HelmetProvider } from "react-helmet-async";

// Site-specific pages
import NessHomePage from "@/site/ness/HomePage";
import TrustnessHomePage from "@/site/trustness/HomePage";
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

function Router() {
  return (
    <Switch>
      {/* Default route - redirect to NESS site */}
      <Route path="/" exact>
        <Redirect to="/site/ness/" />
      </Route>

      {/* Multi-site Routes */}
      {/* NESS routes */}
      <NessRoute path="/" component={NessHomePage} />
      <NessRoute path="/about" component={AboutPage} />
      <NessRoute path="/services" component={ServicesPage} />
      <NessRoute path="/jobs" component={JobsPage} />
      <NessRoute path="/news" component={NewsPage} />
      <NessRoute path="/contact" component={ContactPage} />
      <NessRoute path="/ethics" component={EthicsPage} />
      <NessRoute path="/privacy" component={PrivacyPage} />
      
      {/* Trustness routes */}
      <TrustnessRoute path="/" component={TrustnessHomePage} />
      <TrustnessRoute path="/about" component={AboutPage} />
      <TrustnessRoute path="/services" component={ServicesPage} />
      <TrustnessRoute path="/contact" component={ContactPage} />
      <TrustnessRoute path="/privacy" component={PrivacyPage} />
      
      {/* Forense routes */}
      <ForenseRoute path="/" component={ForenseHomePage} />
      <ForenseRoute path="/about" component={AboutPage} />
      <ForenseRoute path="/services" component={ServicesPage} />
      <ForenseRoute path="/contact" component={ContactPage} />
      <ForenseRoute path="/privacy" component={PrivacyPage} />

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
