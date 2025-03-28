import React from 'react';
import Layout from '@/components/layout/Layout';
import dynamic from 'next/dynamic';

// Importa o componente Dashboard apenas no lado do cliente
const DashboardWithNoSSR = dynamic(() => import('../src/pages/Index'), {
  ssr: false, // Desativa a renderização do lado do servidor
});

export default function Dashboard() {
  return (
    <Layout>
      <DashboardWithNoSSR />
    </Layout>
  );
}