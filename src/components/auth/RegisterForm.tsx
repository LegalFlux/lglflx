import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos.',
        variant: 'destructive',
      });
      return;
    }
    
    if (password.length < 8) {
      toast({
        title: 'Password fraca',
        description: 'A password deve ter pelo menos 8 caracteres.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signUp(email, password, { name });
      toast({
        title: 'Conta criada com sucesso',
        description: 'Verifique o seu email para confirmar a sua conta.',
      });
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast({
        title: 'Erro ao criar conta',
        description: error.message || 'Ocorreu um erro ao criar a sua conta. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo</Label>
        <Input
          id="name"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground">
          A password deve ter pelo menos 8 caracteres.
        </p>
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'A criar conta...' : 'Criar Conta'}
      </Button>
      
      <p className="text-xs text-center text-muted-foreground">
        Ao criar uma conta, você concorda com os nossos{' '}
        <a href="/terms" className="underline underline-offset-2 hover:text-primary">
          Termos de Serviço
        </a>{' '}
        e{' '}
        <a href="/privacy" className="underline underline-offset-2 hover:text-primary">
          Política de Privacidade
        </a>
        .
      </p>
    </form>
  );
};

export default RegisterForm;
