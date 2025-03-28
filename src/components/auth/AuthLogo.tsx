import React from 'react';
import Link from 'next/link';

const AuthLogo: React.FC = () => {
  return (
    <Link href="/" className="flex flex-col items-center">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-primary"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold">LegalFlux</h1>
      <p className="text-sm text-muted-foreground">Gestão Jurídica Simplificada</p>
    </Link>
  );
};

export default AuthLogo;
