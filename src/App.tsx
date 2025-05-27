import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Rooms from "./pages/Rooms";
import Reservations from "./pages/Reservations";
import Guests from "./pages/Guests";
import Staff from "./pages/Staff";
import Billing from "./pages/Billing";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/theme-provider"

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="hotel-dashboard-theme">
    <div className="min-h-screen bg-background text-foreground">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/guests" element={<Guests />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/settings" element={<Settings />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  </ThemeProvider>
);

export default App;
