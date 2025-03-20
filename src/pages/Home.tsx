import React from "react";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Pricing from "@/components/home/Pricing";
import Footer from "@/components/home/Footer";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main role="main" aria-label="Página inicial" className="flex-grow">
        <section id="hero" aria-labelledby="hero-title" className="container mx-auto">
          <h2 id="hero-title" className="sr-only">Seção Hero</h2>
          <Hero />
        </section>
        <section id="features" aria-labelledby="features-title" className="container mx-auto py-8">
          <h2 id="features-title" className="sr-only">Recursos</h2>
          <Features />
        </section>
        <section id="pricing" aria-labelledby="pricing-title" className="container mx-auto py-8">
          <h2 id="pricing-title" className="sr-only">Planos e Preços</h2>
          <Pricing />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
