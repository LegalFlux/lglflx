
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Erro ao obter sessão:', error);
        } else {
          setSession(data.session);
          setUser(data.session?.user || null);
        }
      } catch (error) {
        console.error('Erro ao obter sessão:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state change:', event);
        setSession(newSession);
        setUser(newSession?.user || null);
        setIsLoading(false);

        if (event === 'SIGNED_IN') {
          console.log('Usuário conectado');
        } else if (event === 'SIGNED_OUT') {
          console.log('Usuário desconectado');
        }
      }
    );

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: 'Desconectado',
        description: 'Sessão encerrada com sucesso',
      });
    } catch (error) {
      console.error('Erro ao sair:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível encerrar sua sessão',
        variant: 'destructive',
      });
    }
  };

  const value = {
    user,
    session,
    isLoading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
