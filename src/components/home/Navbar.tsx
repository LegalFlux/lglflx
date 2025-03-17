import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const NAVBAR_PRIMARY_COLOR = '#33254C';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <span
            className="text-primary font-display text-2xl font-semibold"
            style={{ color: NAVBAR_PRIMARY_COLOR }}
          >
            Legal
          </span>
          <span className="text-foreground font-display text-2xl">Flux</span>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <Button asChild aria-label="Dashboard">
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <Button asChild aria-label="Sign In">
              <Link to="/auth">Entrar</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
