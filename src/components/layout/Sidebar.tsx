
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, FileText, Users, Briefcase, Calendar, DollarSign, BarChart, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const { signOut, user } = useAuth();

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Documentos', icon: FileText, path: '/dashboard/documents' },
    { name: 'Clientes', icon: Users, path: '/dashboard/clients' },
    { name: 'Processos', icon: Briefcase, path: '/dashboard/cases' },
    { name: 'Agenda', icon: Calendar, path: '/dashboard/calendar' },
    { name: 'Financeiro', icon: DollarSign, path: '/dashboard/finance' },
    { name: 'Relatórios', icon: BarChart, path: '/dashboard/reports' },
    { name: 'Configurações', icon: Settings, path: '/dashboard/settings' },
  ];

  return (
    <div className={cn(
      "fixed left-0 top-0 bottom-0 z-30 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 mt-16 overflow-y-auto",
      isOpen ? "w-64" : "w-20"
    )}>
      <div className="flex flex-col h-full py-6">
        <div className="px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.path || pathname.startsWith(item.path + '/')
                  ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <item.icon className="h-5 w-5" />
              {isOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </div>

        <div className="mt-auto px-4">
          <div className="border-t border-sidebar-border pt-4 mt-4">
            {isOpen && (
              <div className="mb-4 px-3 flex flex-col">
                <span className="text-xs text-muted-foreground">CONTA</span>
                <span className="text-sm font-medium truncate">
                  {user?.email}
                </span>
              </div>
            )}
            <Button 
              variant="ghost" 
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent",
                !isOpen && "justify-center px-0"
              )}
              onClick={signOut}
            >
              <LogOut className="h-5 w-5" />
              {isOpen && <span>Sair</span>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
