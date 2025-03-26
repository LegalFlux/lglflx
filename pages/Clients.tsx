import React from 'react';
import { Link } from 'react-router-dom';

const Clients: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <p className="text-gray-600 mb-8">Esta página está em construção.</p>
      
      <Link to="/" className="text-blue-600 hover:underline">
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default Clients;
