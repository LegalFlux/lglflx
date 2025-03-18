import React, { lazy, Suspense } from 'react';

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
        <div className="error-boundary">
          <h1>Something went wrong.</h1>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

const Home: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
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
