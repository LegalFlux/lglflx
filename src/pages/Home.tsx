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
      <main className="flex-grow">
        <section>
          <Hero />
        </section>
        <section>
          <Features />
        </section>
        <section>
          <Pricing />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
