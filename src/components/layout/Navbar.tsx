import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';
import { Menu, X, Home, FileText, Users, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMobile } from '@/hooks/use-mobile';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = router.pathname;
  const isMobile = useMobile();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const routes = [
    { href: '/', label: 'Início' },
    { href: '/suporte', label: 'Suporte' },
    { href: '/precos', label: 'Preços' },
    { href: '/blog', label: 'Blog' },
  ];

  const mobileNavItems = [
    { href: '/', label: 'Início', icon: Home },
    { href: '/cases', label: 'Processos', icon: FileText },
    { href: '/clients', label: 'Clientes', icon: Users },
    { href: '/calendar', label: 'Agenda', icon: Calendar },
    { href: '/settings', label: 'Definições', icon: Settings },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="LegalFlux Logo" className="h-8 w-8" />
            <span className="text-xl font-bold">LegalFlux</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === route.href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="fixed inset-0 top-16 z-50 md:hidden mobile-menu-container">
              <div className="bg-background border-t mobile-menu">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      'mobile-menu-item',
                      pathname === route.href
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    )}
                  >
                    {route.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Bottom Navigation for Mobile */}
      {isMobile && (
        <nav className="bottom-nav">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'bottom-nav-item',
                  pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <Icon className="bottom-nav-icon" size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
}
