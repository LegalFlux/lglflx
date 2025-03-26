
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

  const router = useRouter();
  const { user } = useAuth();

  // Memoize URL params to avoid unnecessary recomputations
  const params = useMemo(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search);
    }
    return new URLSearchParams();
  }, [router.asPath]);

  // Set active tab based on URL parameters
  useEffect(() => {
    const tab = router.query.tab as string;
    if (tab === 'register') {
      setActiveTab('register');
    }
  }, [router.query]);

  // Redirect to dashboard if the user is already authenticated
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

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
