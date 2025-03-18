
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { UserRole } from '@/types/lexflow';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  userRole: UserRole | null;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, userData: { nome: string; apelido: string; role?: UserRole }) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Erro ao obter role do utilizador:', error);
      } else if (data) {
        setUserRole(data.role as UserRole);
      }
    } catch (error) {
      console.error('Erro ao obter role do utilizador:', error);
    }
  };

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
          
          if (data.session?.user) {
            fetchUserRole(data.session.user.id);
          }
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
        
        if (newSession?.user) {
          fetchUserRole(newSession.user.id);
        } else {
          setUserRole(null);
        }
        
        setIsLoading(false);

        if (event === 'SIGNED_IN') {
          console.log('Utilizador conectado');
          toast({
            title: 'Bem-vindo',
            description: 'Sessão iniciada com sucesso',
          });
        } else if (event === 'SIGNED_OUT') {
          console.log('Utilizador desconectado');
          toast({
            title: 'Sessão terminada',
            description: 'Sessão encerrada com sucesso',
          });
        }
      }
    );

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      return { error: error };
    } catch (error) {
      console.error('Erro ao iniciar sessão:', error);
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, userData: { nome: string; apelido: string; role?: UserRole }) => {
    try {
      // Se não for especificado um role, atribui 'cliente' por defeito
      const role = userData.role || 'cliente';
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nome: userData.nome,
            apelido: userData.apelido,
            role: role,
          },
        },
      });
      
      return { error: error };
    } catch (error) {
      console.error('Erro ao registar:', error);
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUserRole(null);
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
    userRole,
    signIn,
    signUp,
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
