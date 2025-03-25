import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from '@/components/ui/navigation-menu';
import { useAuth } from '@/contexts/AuthContext';

const NavLink: React.FC<{ href: string; scroll?: boolean; children: React.ReactNode; onClick?: () => void }> = ({ href, scroll = true, children, onClick }) => (
  <Link
    href={href}
    scroll={scroll}
    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
    onClick={onClick}
  >
    {children}
  </Link>
);

const AuthButtons: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const { user } = useAuth();
  const baseClassName = isMobile ? "w-full" : "";

  return user ? (
    <Link href="/dashboard">
      <Button className={`bg-brand hover:bg-brand/90 ${baseClassName}`}>
        Dashboard
      </Button>
    </Link>
  ) : (
    <>
      <Link href="/auth">
        <Button variant="outline" className={baseClassName}>
          Entrar
        </Button>
      </Link>
      <Link href="/auth?tab=register">
        <Button className={`bg-brand hover:bg-brand/90 ${baseClassName}`}>
          Registar
        </Button>
      </Link>
    </>
  );
};

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="w-full border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center" aria-label="LegalFlux Home">
            <span className="font-display text-xl font-semibold text-brand">Legal</span>
            <span className="font-display text-xl text-foreground hover:opacity-90">Flux</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {[
              { href: '/', label: 'Início' },
              { href: '/#features', label: 'Funcionalidades', scroll: false },
              { href: '/#pricing', label: 'Preços', scroll: false },
              { href: '/screenshots', label: 'Screenshots' }
            ].map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavLink href={item.href} scroll={item.scroll}>{item.label}</NavLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <AuthButtons />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-background border-b">
          <nav className="flex flex-col space-y-4">
            {[
              { href: '/', label: 'Início' },
              { href: '/#features', label: 'Funcionalidades', scroll: false },
              { href: '/#pricing', label: 'Preços', scroll: false },
              { href: '/screenshots', label: 'Screenshots' }
            ].map((item) => (
              <NavLink key={item.href} href={item.href} scroll={item.scroll}>{item.label}</NavLink>
            ))}
            <AuthButtons isMobile />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
