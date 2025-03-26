import React from 'react';
import { usePWA } from '@/hooks/use-pwa';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, X } from 'lucide-react';

interface PWAPromptProps {
  className?: string;
}

const PWAPrompt: React.FC<PWAPromptProps> = ({ className }) => {
  const { offlineReady, needRefresh, updateSW, installApp, canInstall } = usePWA();
  
  if (!needRefresh && !canInstall && !offlineReady) return null;
  
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t shadow-lg ${className}`}>
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          {offlineReady && (
            <p className="text-sm text-muted-foreground">
              Aplicativo pronto para uso offline!
            </p>
          )}
          
          {needRefresh && (
            <p className="text-sm">
              Nova versão disponível!
            </p>
          )}
          
          {canInstall && !needRefresh && (
            <p className="text-sm">
              Instale o LegalFlux no seu dispositivo para acesso rápido
            </p>
          )}
        </div>
        
        <div className="flex gap-2">
          {needRefresh && (
            <Button size="sm" onClick={() => updateSW()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Atualizar
            </Button>
          )}
          
          {canInstall && (
            <Button size="sm" onClick={() => installApp()}>
              <Download className="mr-2 h-4 w-4" />
              Instalar
            </Button>
          )}
          
          <Button size="sm" variant="ghost">
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PWAPrompt;
