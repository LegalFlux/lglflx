
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border h-16 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <MobileMenu />
          <div className="ml-2 flex items-center">
            <span className="text-primary font-display text-xl font-semibold">Lex</span>
            <span className="text-foreground font-display text-xl">Flow</span>
          </div>
        </div>
      </div>
      
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar isOpen={sidebarOpen} />
        </div>
        
        <main className={`flex-1 pt-16 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default Layout;
