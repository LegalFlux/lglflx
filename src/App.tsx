import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import PWAPrompt from '@/components/pwa/PWAPrompt';

// Páginas
import Home from '@/pages/Home';
import AuthPage from '@/pages/AuthPage';
import Finance from '@/pages/Finance';
import Clients from '@/pages/Clients';
import Documents from '@/pages/Documents';
import Cases from '@/pages/Cases';
import Calendar from '@/pages/Calendar';
import Settings from '@/pages/Settings';
import Support from '@/pages/Suporte';
import NotFound from '@/pages/NotFound';

// Layout
import { ThemeProvider } from '@/components/theme-provider';

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="legalflux-theme">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/suporte" element={<Support />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
          <Toaster />
          <PWAPrompt />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
