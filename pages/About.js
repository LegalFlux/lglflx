// Replace any react-router-dom imports with Next.js equivalents
// For example:
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';

// Then update any navigation code to use router.push instead of navigate
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