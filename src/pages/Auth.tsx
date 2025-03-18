import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import AuthLogo from '@/components/auth/AuthLogo';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const Auth: React.FC = () => {
  const [activeTab, setActiveTab] = useState('login');

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Memoize URL params to avoid unnecessary recomputations
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

  // Set active tab based on URL parameters
  useEffect(() => {
    const tab = params.get('tab');
    if (tab === 'register') {
      setActiveTab('register');
    }
  }, [params]);

  // Redirect to dashboard if the user is already authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleRegisterSuccess = () => {
    setActiveTab('login');
  };

  const AuthCard: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {children}
    </Card>
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <AuthLogo />

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" aria-selected={activeTab === 'login'}>Entrar</TabsTrigger>
            <TabsTrigger value="register" aria-selected={activeTab === 'register'}>Registar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <AuthCard title="Iniciar Sessão" description="Entre na sua conta para aceder à plataforma">
              <LoginForm />
            </AuthCard>
          </TabsContent>
          
          <TabsContent value="register">
            <AuthCard title="Criar Conta" description="Registe-se para começar a utilizar a plataforma">
              <RegisterForm onSuccess={handleRegisterSuccess} />
            </AuthCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
