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
import AuthPage from "@/pages/auth-page";
import AdminDashboard from "@/pages/admin/dashboard";
import ContentEditor from "@/pages/admin/content-editor";
import JobsEditor from "@/pages/admin/jobs-editor";
import NewsEditor from "@/pages/admin/news-editor";
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
      
      {/* Auth Route */}
      <Route path="/auth" component={AuthPage} />
      
      {/* Admin Routes - Protected */}
      <Route path="/admin">
        <ProtectedRoute path="/admin/dashboard" component={AdminDashboard} />
        <ProtectedRoute path="/admin/content" component={ContentEditor} />
        <ProtectedRoute path="/admin/jobs" component={JobsEditor} />
        <ProtectedRoute path="/admin/news" component={NewsEditor} />
      </Route>
      
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
