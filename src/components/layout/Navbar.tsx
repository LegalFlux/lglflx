
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="w-full h-16 px-4 bg-white border-b border-border flex items-center justify-between z-50 shadow-sm">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="mr-2 smooth-transition"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
        
        <Link to="/" className="flex items-center">
          <span className="text-primary font-display text-xl font-semibold">Lex</span>
          <span className="text-foreground font-display text-xl">Flow</span>
        </Link>
      </div>

      <div className="flex items-center space-x-1">
        <div className={`relative ${isSearchOpen ? 'w-64' : 'w-0'} transition-all duration-300 ease-in-out overflow-hidden`}>
          <input
            type="text"
            placeholder="Pesquisar..."
            className={`w-full h-9 pl-3 pr-8 rounded-md border border-input ${isSearchOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          />
          {isSearchOpen && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 h-9 w-9"
              onClick={() => setIsSearchOpen(false)}
            >
              <X size={14} />
            </Button>
          )}
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="relative"
        >
          <Search size={18} />
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive">
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
