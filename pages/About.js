import { useRouter } from 'next/router';
import { useEffect } from 'react';

export async function getServerSideProps() {
  return { props: {} }; // Desabilita a pré-renderização
}

export default function About() {
  const router = useRouter();

  useEffect(() => {
    if (router) {
      console.log('Router is available');
    }
  }, [router]);

  return <div>About Page</div>;
}