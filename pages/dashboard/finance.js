import React from 'react';
import Layout from '@/components/layout/Layout';
import dynamic from 'next/dynamic';

// Importa o componente Finance apenas no lado do cliente
const FinanceWithNoSSR = dynamic(() => import('../../src/pages/Finance'), {
  ssr: false, // Desativa a renderização do lado do servidor
});

export default function Finance() {
  return (
    <Layout>
      <FinanceWithNoSSR />
    </Layout>
  );
}