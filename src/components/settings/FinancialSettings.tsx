
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Euro } from 'lucide-react';
import { SystemConfig } from '@/types/lexflow';

interface FinancialSettingsProps {
  config: SystemConfig;
  handleChange: (key: keyof SystemConfig, value: any) => void;
}

const FinancialSettings: React.FC<FinancialSettingsProps> = ({ config, handleChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações Financeiras</CardTitle>
        <CardDescription>
          Configure os parâmetros financeiros do sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="taxaIVA">Taxa de IVA Padrão (%)</Label>
            <Input 
              id="taxaIVA" 
              type="number"
              min="0"
              max="100"
              value={config.taxaIVA}
              onChange={(e) => handleChange('taxaIVA', Number(e.target.value))}
            />
          </div>
          
          <div className="grid gap-2">
            <Label>Moeda Padrão</Label>
            <div className="flex items-center h-10 px-3 rounded-md border border-input bg-background text-foreground">
              <Euro size={16} className="mr-2 text-muted-foreground" />
              Euro (€)
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialSettings;
