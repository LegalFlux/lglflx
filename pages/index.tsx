import dynamic from 'next/dynamic';

// Importa o componente Home apenas no lado do cliente
const HomeWithNoSSR = dynamic(() => import('../src/pages/Home'), {
  ssr: false, // Desativa a renderização do lado do servidor
});

export default function Index() {
  return <HomeWithNoSSR />;
}