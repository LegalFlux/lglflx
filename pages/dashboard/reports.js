import React from 'react';
import Layout from '@/components/layout/Layout';
import dynamic from 'next/dynamic';

// Importa o componente Reports apenas no lado do cliente
const ReportsWithNoSSR = dynamic(() => import('../../src/pages/Reports'), {
  ssr: false, // Desativa a renderização do lado do servidor
});

export default function Reports() {
  return (
    <Layout>
      <ReportsWithNoSSR />
    </Layout>
  );
}