'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const ScreenshotsPage = () => {
  const screenshots = [
    '/screenshots/screenshot1.png',
    '/screenshots/screenshot2.png',
    '/screenshots/screenshot3.png',
    '/screenshots/screenshot4.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <Head>
        <title>Screenshots - LegalFlux</title>
        <meta name="description" content="Galeria de screenshots do sistema LegalFlux" />
      </Head>

      <div className={`container mx-auto px-4 py-8 ${isFullscreen ? 'fixed inset-0 z-50 bg-black p-0' : ''}`}>
        {isFullscreen && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/10"
            onClick={toggleFullscreen}
          >
            <Maximize2 className="rotate-45" />
          </Button>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Screenshots</h1>
          <p className="text-muted-foreground">
            Visualize as capturas de tela do nosso sistema
          </p>
        </div>

        <div className="relative">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
            <Image
              src={screenshots[currentIndex]}
              alt={`Screenshot ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
              quality={100}
            />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Button variant="outline" onClick={prevImage}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {screenshots.length}
            </span>
            
            <Button variant="outline" onClick={nextImage}>
              Próximo
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {screenshots.map((src, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`overflow-hidden rounded-lg border transition-all ${
                currentIndex === index ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <div className="relative aspect-video">
                <Image
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  quality={80}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ScreenshotsPage;
