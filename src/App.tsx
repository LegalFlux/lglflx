'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Layout from "@/components/layout/Layout";
import Index from "@/pages/Index";
import Clients from "@/pages/Clients";
import Cases from "@/pages/Cases";
import Documents from "@/pages/Documents";
import Calendar from "@/pages/Calendar";
import Finance from "@/pages/Finance";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import ClientPortal from "@/pages/ClientPortal";
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import Subscriptions from "@/pages/Subscriptions";
import Screenshots from "@/pages/Screenshots";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

// Componente para mostrar um spinner durante o carregamento
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
  </div>
);

// Componente para rotas protegidas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth');
    }
  }, [user, isLoading, router]);

  if (isLoading) return <LoadingSpinner />;
  return user ? children : null;
};

// Componente para redirecionar usuários autenticados
const RedirectIfAuthenticated = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading) return <LoadingSpinner />;
  return !user ? children : null;
};

// Componente principal de roteamento
const AppRouter = () => {
  const pathname = usePathname();

  if (pathname === '/') {
    return <Home />;
  }

  if (pathname === '/auth') {
    return (
      <RedirectIfAuthenticated>
        <Auth />
      </RedirectIfAuthenticated>
    );
  }

  if (pathname?.startsWith('/dashboard')) {
    return (
      <ProtectedRoute>
        <Layout>
          {pathname === '/dashboard' && <Index />}
          {pathname === '/dashboard/clients' && <Clients />}
          {pathname === '/dashboard/cases' && <Cases />}
          {pathname === '/dashboard/documents' && <Documents />}
          {pathname === '/dashboard/calendar' && <Calendar />}
          {pathname === '/dashboard/finance' && <Finance />}
          {pathname === '/dashboard/reports' && <Reports />}
          {pathname === '/dashboard/settings' && <Settings />}
          {pathname === '/dashboard/client-portal' && <ClientPortal />}
          {pathname === '/dashboard/subscriptions' && <Subscriptions />}
          {pathname === '/dashboard/screenshots' && <Screenshots />}
        </Layout>
      </ProtectedRoute>
    );
  }

  return <NotFound />;
};

function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
