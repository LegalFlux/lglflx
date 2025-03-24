import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from '@/components/ui/navigation-menu';
import { useAuth } from '@/contexts/AuthContext';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="w-full border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-primary font-display text-xl font-semibold" style={{ color: '#33254C' }}>Legal</span>
            <span className="text-foreground font-display text-xl">Flux</span>
          </Link>
        </div>

        {/* Menu Desktop */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                Início
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/#features" scroll={false} className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                Funcionalidades
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/#pricing" scroll={false} className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                Preços
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/screenshots" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                Screenshots
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Botões de Autenticação */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <Link href="/dashboard">
              <Button style={{ backgroundColor: '#33254C' }}>
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/auth">
                <Button variant="outline">
                  Entrar
                </Button>
              </Link>
              <Link href="/auth?tab=register">
                <Button style={{ backgroundColor: '#33254C' }}>
                  Registar
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Botão de Menu Mobile */}
        <button 
          className="md:hidden"
          aria-label="Abrir menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-background border-b">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-foreground hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
              Início
            </Link>
            <Link href="/#features" scroll={false} className="text-foreground hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
              Funcionalidades
            </Link>
            <Link href="/#pricing" scroll={false} className="text-foreground hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
              Preços
            </Link>
            <Link href="/screenshots" className="text-foreground hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
              Screenshots
            </Link>
            <div className="pt-4 border-t border-border flex flex-col space-y-2">
              {user ? (
                <Link href="/dashboard">
                  <Button className="w-full" style={{ backgroundColor: '#33254C' }}>
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth">
                    <Button variant="outline" className="w-full">
                      Entrar
                    </Button>
                  </Link>
                  <Link href="/auth?tab=register">
                    <Button className="w-full" style={{ backgroundColor: '#33254C' }}>
                      Registar
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
