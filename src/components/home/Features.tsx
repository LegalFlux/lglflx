import React from "react";
import { Check, FileText, FolderGit2, UserCircle } from "lucide-react";

const Features: React.FC = () => {
  const features = [
    {
      icon: <FolderGit2 className="h-5 w-5 text-primary" />,
      title: "Gestão de Processos",
      description: "Organize todos os seus processos jurídicos com facilidade, acompanhe prazos e mantenha-se atualizado."
    },
    {
      icon: <FileText className="h-5 w-5 text-primary" />,
      title: "Gestão Documental",
      description: "Armazene, organize e assine documentos digitalmente. Crie modelos reutilizáveis para aumentar sua produtividade."
    },
    {
      icon: <UserCircle className="h-5 w-5 text-primary" />,
      title: "Portal do Cliente",
      description: "Ofereça aos seus clientes acesso transparente aos seus processos e documentos através de um portal seguro."
    }
  ];

  return (
    <section className="py-16 bg-muted/30 w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#33254C]">Funcionalidades Principais</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Tudo o que você precisa para modernizar sua prática jurídica
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-background p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-purple-100">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#33254C]">{feature.title}</h3>
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
