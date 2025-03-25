import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export async function getServerSideProps() {
  return { props: {} }; // Desabilita a pré-renderização
}

export default function About() {
  const navigate = typeof window !== 'undefined' ? useNavigate() : null;

  useEffect(() => {
    if (navigate) {
      console.log('Navigate is available');
    }
  }, [navigate]);

  return <div>About Page</div>;
}