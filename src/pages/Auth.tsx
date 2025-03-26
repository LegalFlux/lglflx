
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import AuthLogo from '@/components/auth/AuthLogo';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const Auth: React.FC = () => {
  const [activeTab, setActiveTab] = useState('login');

  // Replace this:
  // const navigate = useNavigate();
  // const location = useLocation();
  
  // With this:
  const router = useRouter();
  
  // And replace any navigate() calls with router.push()
  // For example:
  // navigate('/dashboard') becomes router.push('/dashboard')
  
  // To get query parameters:
  // Instead of location.state?.from, use router.query
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-8 text-center">
          <AuthLogo />
        </div>

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Registar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card className="border-2">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Iniciar Sessão</CardTitle>
                <CardDescription>Entre na sua conta para aceder à plataforma</CardDescription>
              </CardHeader>
              <LoginForm />
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card className="border-2">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
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
