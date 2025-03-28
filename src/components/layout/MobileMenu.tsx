
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, Home, FileText, Users, Briefcase, Calendar, DollarSign, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const MobileMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = router.pathname;
  
  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Documentos', icon: FileText, path: '/dashboard/documents' },
    { name: 'Clientes', icon: Users, path: '/dashboard/clients' },
    { name: 'Processos', icon: Briefcase, path: '/dashboard/cases' },
    { name: 'Agenda', icon: Calendar, path: '/dashboard/calendar' },
    { name: 'Financeiro', icon: DollarSign, path: '/dashboard/finance' },
    { name: 'Configurações', icon: Settings, path: '/dashboard/settings' },
  ];

  return (
    <div className="block lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu size={24} />
            <span className="sr-only">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <span className="text-primary font-display text-xl font-semibold">Lex</span>
                <span className="text-foreground font-display text-xl">Flow</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X size={20} />
              </Button>
            </div>
            
            <nav className="flex-1 p-2">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        pathname === item.path || pathname.startsWith(item.path + '/')
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-secondary"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="p-4 border-t text-xs text-muted-foreground">
              LexFlow - Gestão Jurídica v1.0
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
