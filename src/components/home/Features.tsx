import React from "react";
import { Check } from "lucide-react";

const features = [
  {
    title: "Gestão de Processos",
    description:
      "Organize todos os seus processos jurídicos com facilidade, acompanhe prazos e mantenha-se atualizado.",
  },
  {
    title: "Gestão Documental",
    description:
      "Armazene, organize e assine documentos digitalmente. Crie modelos reutilizáveis para aumentar sua produtividade.",
  },
  {
    title: "Portal do Cliente",
    description:
      "Ofereça aos seus clientes acesso transparente aos seus processos e documentos através de um portal seguro.",
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-16 bg-muted/30 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades Principais</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-background p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-purple-200">
                  <Check className="h-5 w-5 text-purple-700" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
