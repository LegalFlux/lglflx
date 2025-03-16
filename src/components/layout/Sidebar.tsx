
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, Briefcase, FileText, Calendar, 
  BarChart3, Settings, PieChart, Home, User
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navItems = [
    { to: '/', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/clients', icon: <Users size={20} />, label: 'Clientes' },
    { to: '/cases', icon: <Briefcase size={20} />, label: 'Processos' },
    { to: '/documents', icon: <FileText size={20} />, label: 'Documentos' },
    { to: '/calendar', icon: <Calendar size={20} />, label: 'Calendário' },
    { to: '/finance', icon: <BarChart3 size={20} />, label: 'Finanças' },
    { to: '/reports', icon: <PieChart size={20} />, label: 'Relatórios' },
    { to: '/client-portal', icon: <User size={20} />, label: 'Portal Cliente' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Definições' },
  ];
  
  return (
    <div className={`h-screen fixed left-0 pt-16 bg-card border-r border-border transition-all duration-300 z-30 ${isOpen ? 'w-64' : 'w-20'}`}>
      <nav className="space-y-2 p-4">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) => 
              `flex items-center p-3 rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-accent ${
                isActive ? 'bg-accent text-foreground font-medium' : ''
              }`
            }
          >
            <span className="mr-3">{item.icon}</span>
            {isOpen && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
