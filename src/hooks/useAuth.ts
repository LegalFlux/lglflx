import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  const signIn = async (email: string, password: string) => {
    const { user, session, error } = await supabase.auth.signIn({ email, password });
    if (error) {
      setError(error);
    } else {
      setUser(user);
      setSession(session);
    }
    return { user, session, error };
  };

  const signUp = async (email: string, password: string, metadata: any) => {
    const { user, session, error } = await supabase.auth.signUp(
      { email, password },
      { data: metadata }
    );
    if (error) {
      setError(error);
    } else {
      setUser(user);
      setSession(session);
    }
    return { user, session, error };
  };

  return { user, session, error, signIn, signUp };
}
