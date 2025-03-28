import React from 'react';
import Layout from '@/components/layout/Layout';
import dynamic from 'next/dynamic';

// Importa o componente Documents apenas no lado do cliente
const DocumentsWithNoSSR = dynamic(() => import('../../src/pages/Documents'), {
  ssr: false, // Desativa a renderização do lado do servidor
});

export default function Documents() {
  return (
    <Layout>
      <DocumentsWithNoSSR />
    </Layout>
  );
}