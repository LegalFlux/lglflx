
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);
  
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border h-16 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <MobileMenu />
          <div className="ml-2 flex items-center">
            <span className="text-primary font-display text-xl font-semibold">Legal</span>
            <span className="text-foreground font-display text-xl">Flux</span>
          </div>
        </div>
      </div>
      
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar isOpen={sidebarOpen} />
        </div>
        
        <main className={`flex-1 pt-16 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} w-full`}>
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default Layout;
