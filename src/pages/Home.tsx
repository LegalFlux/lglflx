import React, { lazy, Suspense } from 'react';

const Navbar = lazy(() => import('@/components/home/Navbar'));
const Hero = lazy(() => import('@/components/home/Hero'));
const Features = lazy(() => import('@/components/home/Features'));
const Pricing = lazy(() => import('@/components/home/Pricing'));
const Footer = lazy(() => import('@/components/home/Footer'));

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error occurred:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
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
