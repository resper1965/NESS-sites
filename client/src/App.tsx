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
import TrustnessAssessmentPage from "@/site/trustness/services/AssessmentPage";
import TrustnessPrivacyPage from "@/site/trustness/services/PrivacyPage";
import TrustnessConformityPage from "@/site/trustness/services/ConformityPage";
import ForenseHomePage from "@/site/forense/HomePage";
import ForenseAboutPage from "@/site/forense/AboutPage";
import ForenseDigitalForensicsPage from "@/site/forense/services/DigitalForensicsPage";
import ForenseLegalSupportPage from "@/site/forense/services/LegalSupportPage";
import ForenseCorporateInvestigationsPage from "@/site/forense/services/CorporateInvestigationsPage";

// Ness Services
import NessSecOpsPage from "@/site/ness/services/SecOpsPage";
import NessInfraOpsPage from "@/site/ness/services/InfraOpsPage";
import NessDevArchPage from "@/site/ness/services/DevArchPage";
import NessAutoOpsPage from "@/site/ness/services/AutoOpsPage";
import NessCrisisOpsPage from "@/site/ness/services/CrisisOpsPage";
import NessPrivacyPage from "@/site/ness/services/PrivacyPage";

// Contact Pages
import NessContactPage from "@/site/ness/ContactPage";
import TrustnessContactPage from "@/site/trustness/ContactPage";
import ForenseContactPage from "@/site/forense/ContactPage";

// Legacy pages (will be migrated)
import HomePage from "@/pages/home-page";
import AboutPage from "@/pages/about-page";
import ServicesPage from "@/pages/services-page";
import JobsPage from "@/pages/jobs-page";
import NewsPage from "@/pages/news-page";
import EthicsPage from "@/pages/ethics-page";
import PrivacyPage from "@/pages/privacy-page";
import ContactPage from "@/pages/contact-page";
import AdminLoginPage from "@/pages/admin/login-page";
import AdminDashboardPage from "@/pages/admin/dashboard-page";
import BrandingPage from "@/pages/admin/branding-page";
import AdminJobsPage from "@/pages/admin/jobs-page";
import PublicJobsPage from "@/pages/public-jobs-page";
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
      
      <Route path="/site/ness/services/secops">
        <SiteProvider siteCode="ness">
          <NessSecOpsPage />
        </SiteProvider>
      </Route>
      
      <Route path="/site/ness/services/infraops">
        <SiteProvider siteCode="ness">
          <NessInfraOpsPage />
        </SiteProvider>
      </Route>
      
      <Route path="/site/ness/services/devarch">
        <SiteProvider siteCode="ness">
          <NessDevArchPage />
        </SiteProvider>
      </Route>
      
      <Route path="/site/ness/services/autoops">
        <SiteProvider siteCode="ness">
          <NessAutoOpsPage />
        </SiteProvider>
      </Route>
      
      <Route path="/site/ness/services/crisisops">
        <SiteProvider siteCode="ness">
          <NessCrisisOpsPage />
        </SiteProvider>
      </Route>
      
      <Route path="/site/ness/services/privacy">
        <SiteProvider siteCode="ness">
          <NessPrivacyPage />
        </SiteProvider>
      </Route>
      
      <Route path="/site/ness/contact">
        <SiteProvider siteCode="ness">
          <NessContactPage />
        </SiteProvider>
      </Route>
      
      <Route path="/site/ness/jobs">
        <SiteProvider siteCode="ness">
          <PublicJobsPage />
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

      <Route path="/site/trustness/services/assessment">
        <SiteProvider siteCode="trustness">
          <TrustnessAssessmentPage />
        </SiteProvider>
      </Route>

      <Route path="/site/trustness/services/privacy">
        <SiteProvider siteCode="trustness">
          <TrustnessPrivacyPage />
        </SiteProvider>
      </Route>

      <Route path="/site/trustness/services/conformity">
        <SiteProvider siteCode="trustness">
          <TrustnessConformityPage />
        </SiteProvider>
      </Route>
      
      <Route path="/site/trustness/contact">
        <SiteProvider siteCode="trustness">
          <TrustnessContactPage />
        </SiteProvider>
      </Route>
      
      <Route path="/site/trustness/jobs">
        <SiteProvider siteCode="trustness">
          <PublicJobsPage />
        </SiteProvider>
      </Route>
      
      {/* Site-specific routes - FORENSE */}
      <Route path="/site/forense">
        <SiteProvider siteCode="forense">
          <ForenseHomePage />
        </SiteProvider>
      </Route>

      <Route path="/site/forense/about">
        <SiteProvider siteCode="forense">
          <ForenseAboutPage />
        </SiteProvider>
      </Route>

      <Route path="/site/forense/services/digital-forensics">
        <SiteProvider siteCode="forense">
          <ForenseDigitalForensicsPage />
        </SiteProvider>
      </Route>

      <Route path="/site/forense/services/legal-support">
        <SiteProvider siteCode="forense">
          <ForenseLegalSupportPage />
        </SiteProvider>
      </Route>

      <Route path="/site/forense/services/corporate-investigations">
        <SiteProvider siteCode="forense">
          <ForenseCorporateInvestigationsPage />
        </SiteProvider>
      </Route>
      
      <Route path="/site/forense/contact">
        <SiteProvider siteCode="forense">
          <ForenseContactPage />
        </SiteProvider>
      </Route>
      
      <Route path="/site/forense/jobs">
        <SiteProvider siteCode="forense">
          <PublicJobsPage />
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
      
      
      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLoginPage} />
      <ProtectedRoute path="/admin/dashboard" component={AdminDashboardPage} />
      <ProtectedRoute path="/admin/branding" component={BrandingPage} />
      <ProtectedRoute path="/admin/jobs" component={AdminJobsPage} />
      
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
