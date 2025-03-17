
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useIsMobile } from '@/hooks/use-mobile';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('login');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [apelido, setApelido] = useState('');
  
  // Error states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Check URL params for default tab
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('register') === 'true') {
      setActiveTab('signup');
    }
  }, [location]);
  
  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/');
      }
    };
    
    checkSession();
  }, [navigate]);
  
  const validateForm = () => {
    let isValid = true;
    
    // Validate email
    if (!email || !email.includes('@')) {
      setEmailError('Email inválido');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    // Validate password
    if (!password || password.length < 6) {
      setPasswordError('A senha deve ter pelo menos 6 caracteres');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    return isValid;
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        toast({
          title: 'Erro ao entrar',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Login realizado com sucesso',
          description: 'Bem-vindo de volta!'
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: 'Erro ao entrar',
        description: 'Ocorreu um erro ao tentar fazer login.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nome,
            apelido,
            role: 'cliente'
          }
        }
      });
      
      if (error) {
        toast({
          title: 'Erro ao registrar',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Registo realizado com sucesso',
          description: 'Verifique seu e-mail para confirmar o cadastro.'
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: 'Erro ao registrar',
        description: 'Ocorreu um erro ao tentar criar sua conta.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="w-full px-4 py-4 bg-white border-b">
        <div className="container mx-auto">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#33254C]">Legal</span>
            <span className="text-2xl font-bold">Flux</span>
          </Link>
        </div>
      </header>
      
      {/* Auth Container */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card className="shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl text-[#33254C]">Bem-vindo ao LegalFlux</CardTitle>
              <CardDescription>
                Entre na sua conta ou crie uma nova para começar
              </CardDescription>
            </CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-4 mx-4">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="signup">Registrar</TabsTrigger>
              </TabsList>
              
              {/* Login Form */}
              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="seu@email.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Senha</Label>
                        <Link to="/reset-password" className="text-sm text-[#33254C] hover:underline">
                          Esqueceu a senha?
                        </Link>
                      </div>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-[#33254C] hover:bg-[#33254C]/90"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Entrando...' : 'Entrar'}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
              
              {/* Signup Form */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome</Label>
                        <Input 
                          id="nome" 
                          type="text" 
                          placeholder="Nome" 
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apelido">Apelido</Label>
                        <Input 
                          id="apelido" 
                          type="text" 
                          placeholder="Apelido" 
                          value={apelido}
                          onChange={(e) => setApelido(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="seu@email.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Senha</Label>
                      <Input 
                        id="signup-password" 
                        type="password" 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                    </div>
                    <div className="text-sm text-gray-500">
                      Ao registrar, você concorda com nossos <a href="#" className="text-[#33254C] hover:underline">Termos de Serviço</a> e <a href="#" className="text-[#33254C] hover:underline">Política de Privacidade</a>.
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-[#33254C] hover:bg-[#33254C]/90"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Registrando...' : 'Registrar'}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
