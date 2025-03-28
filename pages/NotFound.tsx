import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';

interface NotFoundProps {
  className?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ className }) => {
  return (
    <div className={clsx("flex flex-col items-center justify-center min-h-screen px-4", className)}>
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Página não encontrada</h2>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        A página que está a procurar não existe ou foi movida para outro endereço.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/" 
          className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
        >
          Voltar para a página inicial
        </Link>
        <Link 
          href="/suporte" 
          className="px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-medium hover:bg-secondary/90 transition-colors"
        >
          Contactar suporte
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
