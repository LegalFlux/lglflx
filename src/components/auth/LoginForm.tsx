import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth'; // Importa o useAuth

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { signIn } = useAuth(); // Usa o hook useAuth

  // Validação básica do email
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação dos campos
    if (!validateEmail(email)) {
      toast({
        title: 'Erro',
        description: 'Por favor, insira um email válido.',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Erro',
        description: 'A senha deve ter pelo menos 6 caracteres.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signIn(email, password); // Usa a função signIn do useAuth

      if (error) {
        console.error('Erro no login:', error.message);
        toast({
          title: 'Erro ao entrar',
          description: error.message || 'Credenciais inválidas. Verifique o seu email e senha.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Bem-vindo',
          description: 'Iniciou sessão com sucesso',
        });
        navigate('/dashboard'); // Redireciona para o dashboard após o login
      }
    } catch (error) {
      console.error('Erro ao iniciar sessão:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao tentar iniciar sessão',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password'); // Redireciona para a página de recuperação de senha
  };

  return (
    <form onSubmit={handleLogin}>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu.email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Senha</Label>
            <Button
              variant="link"
              className="p-0 h-auto"
              type="button"
              onClick={handleForgotPassword}
            >
              Esqueceu a senha?
            </Button>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end pt-4">
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              A processar
            </>
          ) : (
            'Entrar'
          )}
        </Button>
      </CardFooter>
    </form>
  );
};

export default LoginForm;
