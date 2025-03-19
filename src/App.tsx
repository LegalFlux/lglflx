
import { RouterProvider, createBrowserRouter, Navigate, Outlet } from "react-router-dom";
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
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import "./App.css";
import { Toaster } from "@/components/ui/toaster";

// Componente para rotas protegidas
const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  // Se ainda estiver carregando, mostra um spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para a página de login
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Se estiver autenticado, renderiza as rotas filhas
  return <Outlet />;
};

// Componente para redirecionar usuários autenticados
const RedirectIfAuthenticated = () => {
  const { user, isLoading } = useAuth();

  // Se ainda estiver carregando, mostra um spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Se estiver autenticado, redireciona para o dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Se não estiver autenticado, renderiza as rotas filhas
  return <Outlet />;
};

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      element: <RedirectIfAuthenticated />,
      children: [
        { path: "auth", element: <Auth /> },
      ],
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "dashboard",
          element: <Layout />,
          children: [
            { index: true, element: <Index /> },
            { path: "clients", element: <Clients /> },
            { path: "cases", element: <Cases /> },
            { path: "documents", element: <Documents /> },
            { path: "calendar", element: <Calendar /> },
            { path: "finance", element: <Finance /> },
            { path: "reports", element: <Reports /> },
            { path: "settings", element: <Settings /> },
            { path: "client-portal", element: <ClientPortal /> },
            { path: "subscriptions", element: <Subscriptions /> },
          ],
        },
        {
          path: "subscriptions",
          element: <Subscriptions />,
        },
      ]
    },
    { path: "*", element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
