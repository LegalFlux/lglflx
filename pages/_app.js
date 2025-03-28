// pages/_app.js
import { AuthProvider } from '@/contexts/AuthContext';
import '@/styles/globals.css';
import { Router } from 'next/router';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Router>
        <Component {...pageProps} />
      </Router>
    </AuthProvider>
  );
}
