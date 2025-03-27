// src/context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { UserRole } from '@/types/lexflow';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  userRole: UserRole | null;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string, 
    password: string, 
    userData: { nome: string; apelido: string; role?: UserRole }
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const { toast } = useToast(); // Initialize the toast function from useToast hook

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) throw error;
      if (data) setUserRole(data.role as UserRole);
    } catch (error) {
      console.error('Failed to fetch user role:', error);
      setUserRole(null);
    }
  };

  const refreshSession = async () => {
    setIsLoading(true);
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      setSession(session);
      setUser(session?.user || null);
      
      if (session?.user) {
        await fetchUserRole(session.user.id);
      } else {
        setUserRole(null);
      }
    } catch (error) {
      console.error('Failed to refresh session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user || null);
        
        if (session?.user) {
          await fetchUserRole(session.user.id);
        } else {
          setUserRole(null);
        }

        switch (event) {
          case 'SIGNED_IN':
            toast({ title: 'Bem-vindo', description: 'Sessão iniciada com sucesso' });
            break;
          case 'SIGNED_OUT':
            toast({ title: 'Sessão terminada', description: 'Até logo!' });
            break;
          case 'TOKEN_REFRESHED':
            console.log('Token refreshed');
            break;
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [toast]); // Add toast to dependency array

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast({
          title: 'Erro',
          description: error.message,
          variant: 'destructive'
        });
      }
      
      return { error: error ? new Error(error.message) : null };
    } catch (error) {
      console.error('Login error:', error);
      return { error: error instanceof Error ? error : new Error('Unknown error') };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    { nome, apelido, role = UserRole.CLIENTE }: { nome: string; apelido: string; role?: UserRole }
  ) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { nome, apelido, role }
        }
      });

      if (error) throw error;
      
      toast({
        title: 'Sucesso',
        description: 'Verifique seu email para confirmar o registro'
      });
      
      return { error: null };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        error: error instanceof Error ? error : new Error('Registration failed') 
      };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({ title: 'Desconectado', description: 'Sessão encerrada' });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao sair',
        variant: 'destructive'
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        userRole,
        signIn,
        signUp,
        signOut,
        refreshSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
