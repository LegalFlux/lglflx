import React from 'react';
import Layout from '@/components/layout/Layout';
import dynamic from 'next/dynamic';

// Importa o componente Clients apenas no lado do cliente
const ClientsWithNoSSR = dynamic(() => import('../../src/pages/Clients'), {
  ssr: false, // Desativa a renderização do lado do servidor
});

export default function Clients() {
  return (
    <Layout>
      <ClientsWithNoSSR />
    </Layout>
  );
}