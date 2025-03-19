
import React from 'react';
import { Check } from 'lucide-react';

const Features: React.FC = () => {
  const primaryColor = '#33254C';

  return (
    <section className="py-16 bg-muted/30 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades Principais</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-background p-6 rounded-lg shadow-sm border">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: `${primaryColor}20` }}>
                <Check className="h-5 w-5" style={{ color: primaryColor }} />
              </div>
              <h3 className="text-xl font-semibold">Gestão de Processos</h3>
            </div>
            <p className="text-muted-foreground">Organize todos os seus processos jurídicos com facilidade, acompanhe prazos e mantenha-se atualizado.</p>
          </div>
          
          <div className="bg-background p-6 rounded-lg shadow-sm border">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: `${primaryColor}20` }}>
                <Check className="h-5 w-5" style={{ color: primaryColor }} />
              </div>
              <h3 className="text-xl font-semibold">Gestão Documental</h3>
            </div>
            <p className="text-muted-foreground">Armazene, organize e assine documentos digitalmente. Crie modelos reutilizáveis para aumentar sua produtividade.</p>
          </div>
          
          <div className="bg-background p-6 rounded-lg shadow-sm border">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: `${primaryColor}20` }}>
                <Check className="h-5 w-5" style={{ color: primaryColor }} />
              </div>
              <h3 className="text-xl font-semibold">Portal do Cliente</h3>
            </div>
            <p className="text-muted-foreground">Ofereça aos seus clientes acesso transparente aos seus processos e documentos através de um portal seguro.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
