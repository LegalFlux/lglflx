import React from 'react';
import Layout from '@/components/layout/Layout';
import dynamic from 'next/dynamic';

// Importa o componente Calendar apenas no lado do cliente
const CalendarWithNoSSR = dynamic(() => import('../../src/pages/Calendar'), {
  ssr: false, // Desativa a renderização do lado do servidor
});

export default function Calendar() {
  return (
    <Layout>
      <CalendarWithNoSSR />
    </Layout>
  );
}