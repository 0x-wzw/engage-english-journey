
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
// new pages
import Login from "./pages/Login";
import SelfAssessment from "./pages/SelfAssessment";
import Assessment from "./pages/Assessment";
import Dashboard from "./pages/Dashboard";
import ContinueLearning from "./pages/ContinueLearning";
import CoursesAdmin from "./pages/admin/CoursesAdmin";
import APIKeyManagement from "./pages/admin/APIKeyManagement";
import { AuthProvider } from "@/hooks/useAuth";
import { TranslationProvider } from "@/contexts/TranslationContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <TranslationProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/self-assessment" element={<SelfAssessment />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/continue-learning" element={<ContinueLearning />} />
              <Route path="/admin/courses" element={<CoursesAdmin />} />
              <Route path="/admin/api-keys" element={<APIKeyManagement />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TranslationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
