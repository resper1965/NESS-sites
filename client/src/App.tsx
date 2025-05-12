import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
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
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "@/hooks/use-auth";
import { I18nProvider } from "@/lib/i18n";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/services" component={ServicesPage} />
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
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;
