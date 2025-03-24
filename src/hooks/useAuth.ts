// Este arquivo está sendo mantido apenas para compatibilidade
// Importe useAuth diretamente de '@/contexts/AuthContext' em vez deste arquivo

import { useAuth as authHook } from '@/contexts/AuthContext';

export function useAuth() {
  return authHook();
}

export default useAuth;
