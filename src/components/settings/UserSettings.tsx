
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from 'lucide-react';

const UserSettings: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Utilizadores</CardTitle>
        <CardDescription>
          Gerencie os utilizadores e suas permissões
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <Users size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Gestão de Utilizadores</h3>
            <p className="text-muted-foreground mb-4">
              Adicione, edite e gerencie as permissões dos utilizadores do sistema
            </p>
            <Button>Gerir Utilizadores</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserSettings;
