
import React, { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

const Navbar = lazy(() => import('@/components/home/Navbar'));
const Hero = lazy(() => import('@/components/home/Hero'));
const Features = lazy(() => import('@/components/home/Features'));
const Pricing = lazy(() => import('@/components/home/Pricing'));
const Footer = lazy(() => import('@/components/home/Footer'));

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error occurred:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary flex flex-col items-center justify-center min-h-[40vh] text-center p-4">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Algo correu mal.</h1>
          <p className="mb-4 text-gray-600">Lamentamos o inconveniente. Por favor tente novamente.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Recarregar a página
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="flex flex-col items-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 text-lg text-muted-foreground">A carregar...</p>
    </div>
  </div>
);

const Home: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <div className="min-h-screen bg-background flex flex-col">
          <Navbar />
          <Hero />
          <Features />
          <Pricing />
          <Footer />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Home;
