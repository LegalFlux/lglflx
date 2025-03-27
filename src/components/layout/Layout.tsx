
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [sidebarOpen] = useState(false);
  const { user, isLoading, signOut } = useAuth();
// Router is already declared above, removing duplicate declaration
  
  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!user) {
    router.replace('/auth');
    return null;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border h-16 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <MobileMenu />
          <div className="ml-2 flex items-center">
            <span className="text-primary font-display text-xl font-semibold textLegal">Legal</span>
            <span className="text-foreground font-display text-xl">Flux</span>
          </div>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={handleSignOut} className="flex items-center gap-1">
            <LogOut size={16} />
            <span className="hidden sm:inline ml-1">Sair</span>
          </Button>
        </div>
      </div>
      
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar isOpen={sidebarOpen} />
        </div>
        
        <main className={`flex-1 pt-16 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} w-full p-4 md:p-6`}>
{children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
