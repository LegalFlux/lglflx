import React from 'react';
import Link from 'next/link';

const Settings: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Definições</h1>
      <p className="text-gray-600 mb-8">Esta página está em construção.</p>
      
      <Link href="/" className="text-blue-600 hover:underline">
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default Settings;
