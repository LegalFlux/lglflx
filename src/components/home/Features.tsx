
import React from 'react';

const Features: React.FC = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades Principais</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-background p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Gestão de Processos</h3>
            <p className="text-muted-foreground">Organize todos os seus processos jurídicos com facilidade, acompanhe prazos e mantenha-se atualizado.</p>
          </div>
          <div className="bg-background p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Gestão Documental</h3>
            <p className="text-muted-foreground">Armazene, organize e assine documentos digitalmente. Crie modelos reutilizáveis para aumentar sua produtividade.</p>
          </div>
          <div className="bg-background p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Portal do Cliente</h3>
            <p className="text-muted-foreground">Ofereça aos seus clientes acesso transparente aos seus processos e documentos através de um portal seguro.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
