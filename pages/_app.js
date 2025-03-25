import { AuthProvider } from '../context/AuthContext'; // Ajuste o caminho conforme necessário
import { BrowserRouter } from 'react-router-dom';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Component {...pageProps} />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default MyApp;