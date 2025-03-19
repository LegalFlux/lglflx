
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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <AuthLogo />

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Registar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Iniciar Sessão</CardTitle>
                <CardDescription>Entre na sua conta para aceder à plataforma</CardDescription>
              </CardHeader>
              <LoginForm />
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Criar Conta</CardTitle>
                <CardDescription>Registe-se para começar a utilizar a plataforma</CardDescription>
              </CardHeader>
              <RegisterForm onSuccess={handleRegisterSuccess} />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
