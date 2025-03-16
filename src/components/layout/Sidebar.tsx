
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, FileText, Calendar, Briefcase, FileStack, BarChart3, Settings, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
}

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
        )
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside
      className={cn(
        'fixed top-16 left-0 h-[calc(100vh-4rem)] bg-card border-r border-border transition-all duration-300 ease-in-out z-40 overflow-y-auto w-64',
        isOpen ? 'opacity-100' : 'opacity-0 -translate-x-full lg:translate-x-0 lg:w-0'
      )}
    >
      <div className="p-4 space-y-6">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground px-3 pb-2">MENU PRINCIPAL</p>
          <SidebarLink to="/" icon={<Home size={18} />} label="Dashboard" />
          <SidebarLink to="/cases" icon={<Briefcase size={18} />} label="Casos" />
          <SidebarLink to="/clients" icon={<Users size={18} />} label="Clientes" />
          <SidebarLink to="/calendar" icon={<Calendar size={18} />} label="Agenda" />
          <SidebarLink to="/documents" icon={<FileStack size={18} />} label="Documentos" />
        </div>
        
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground px-3 pb-2">ADMINISTRATIVO</p>
          <SidebarLink to="/reports" icon={<BarChart3 size={18} />} label="Relatórios" />
          <SidebarLink to="/settings" icon={<Settings size={18} />} label="Configurações" />
        </div>
        
        <div className="pt-4 mt-4 border-t border-border">
          <div className="px-3 py-2 bg-muted rounded-md">
            <div className="text-xs font-medium text-muted-foreground">ARMAZENAMENTO</div>
            <div className="mt-2 relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded-full bg-muted-foreground/20">
                <div style={{ width: "60%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-muted-foreground">1.2 GB</span>
                <span className="text-muted-foreground">2 GB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
