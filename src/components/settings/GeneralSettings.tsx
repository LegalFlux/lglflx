
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SystemConfig } from '@/types/lexflow';

interface GeneralSettingsProps {
  config: SystemConfig;
  handleChange: (key: keyof SystemConfig, value: any) => void;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ config, handleChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações do Escritório</CardTitle>
        <CardDescription>
          Configure as informações básicas do seu escritório
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="escritorioNome">Nome do Escritório</Label>
            <Input 
              id="escritorioNome" 
              value={config.escritorioNome}
              onChange={(e) => handleChange('escritorioNome', e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="emailNotificacoes">Email para Notificações</Label>
            <Input 
              id="emailNotificacoes" 
              type="email"
              value={config.emailNotificacoes || ''}
              onChange={(e) => handleChange('emailNotificacoes', e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="diasAlertaPrazos">Dias para Alerta de Prazos</Label>
            <Input 
              id="diasAlertaPrazos" 
              type="number"
              min="1"
              max="30"
              value={config.diasAlertaPrazos}
              onChange={(e) => handleChange('diasAlertaPrazos', Number(e.target.value))}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralSettings;
