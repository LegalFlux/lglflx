import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Hero: React.FC = () => {
  const primaryColor = '#33254C';

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Gestão Jurídica Simplificada</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Uma plataforma completa para advogados, solicitadores e agentes de execução gerir processos, 
            clientes e documentos com eficiência.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="font-semibold" style={{ backgroundColor: primaryColor }}>
              <Link href="/auth">Experimente Grátis</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#precos">Ver Planos</a>
            </Button>
          </div>
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
          <iframe 
            src="https://player.vimeo.com/video/1062960326?title=0&byline=0&portrait=0&badge=0&autopause=0&loop=1&controls=0&background=1" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
            title="LegalFlux"
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Hero;
