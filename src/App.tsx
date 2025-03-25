'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Layout from "@/components/layout/Layout";
import Index from "@/pages/Index";
import Clients from "@/pages/Clients";
// ... outras importações ...
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import ClientOnly from "@/components/client/ClientOnly"; // Nova importação
import "./App.css";

// ... componentes LoadingSpinner, ProtectedRoute, RedirectIfAuthenticated ...

// Componente principal de roteamento
const AppRouter = () => {
  const pathname = usePathname();
  
  // ... lógica de roteamento ...
};

function App() {
  return (
    <AuthProvider>
      <ClientOnly>
        <AppRouter />
      </ClientOnly>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
