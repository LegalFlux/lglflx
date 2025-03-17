
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield } from 'lucide-react';

const SecuritySettings: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Segurança</CardTitle>
        <CardDescription>
          Configure os parâmetros de segurança e backup do sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <Shield size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Backup e Recuperação</h3>
            <p className="text-muted-foreground mb-4">
              Configure as políticas de backup e recuperação de dados
            </p>
            <Button>Configurar Backup</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
