import React from 'react';
import Layout from '@/components/layout/Layout';
import dynamic from 'next/dynamic';

// Importa o componente Settings apenas no lado do cliente
const SettingsWithNoSSR = dynamic(() => import('../../src/pages/Settings'), {
  ssr: false, // Desativa a renderização do lado do servidor
});

export default function Settings() {
  return (
    <Layout>
      <SettingsWithNoSSR />
    </Layout>
  );
}