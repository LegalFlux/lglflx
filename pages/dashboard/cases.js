import React from 'react';
import Layout from '@/components/layout/Layout';
import dynamic from 'next/dynamic';

// Importa o componente Cases apenas no lado do cliente
const CasesWithNoSSR = dynamic(() => import('../../src/pages/Cases'), {
  ssr: false, // Desativa a renderização do lado do servidor
});

export default function Cases() {
  return (
    <Layout>
      <CasesWithNoSSR />
    </Layout>
  );
}