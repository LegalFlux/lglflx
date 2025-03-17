
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from 'lucide-react';

const DocumentSettings: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Documentos</CardTitle>
        <CardDescription>
          Configure o armazenamento e modelos de documentos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Modelos de Documentos</h3>
            <p className="text-muted-foreground mb-4">
              Gerencie modelos para geração automática de documentos
            </p>
            <Button>Gerir Modelos</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentSettings;
