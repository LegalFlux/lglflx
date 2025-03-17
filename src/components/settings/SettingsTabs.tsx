
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralSettings from './GeneralSettings';
import FinancialSettings from './FinancialSettings';
import UserSettings from './UserSettings';
import DocumentSettings from './DocumentSettings';
import SecuritySettings from './SecuritySettings';
import { SystemConfig } from '@/types/lexflow';

interface SettingsTabsProps {
  config: SystemConfig;
  handleChange: (key: keyof SystemConfig, value: any) => void;
}

const SettingsTabs: React.FC<SettingsTabsProps> = ({ config, handleChange }) => {
  return (
    <Tabs defaultValue="geral" className="space-y-4">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full">
        <TabsTrigger value="geral">Geral</TabsTrigger>
        <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
        <TabsTrigger value="utilizadores">Utilizadores</TabsTrigger>
        <TabsTrigger value="documentos">Documentos</TabsTrigger>
        <TabsTrigger value="seguranca">Segurança</TabsTrigger>
      </TabsList>

      <TabsContent value="geral" className="space-y-4">
        <GeneralSettings config={config} handleChange={handleChange} />
      </TabsContent>

      <TabsContent value="financeiro" className="space-y-4">
        <FinancialSettings config={config} handleChange={handleChange} />
      </TabsContent>

      <TabsContent value="utilizadores">
        <UserSettings />
      </TabsContent>

      <TabsContent value="documentos">
        <DocumentSettings />
      </TabsContent>

      <TabsContent value="seguranca">
        <SecuritySettings />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
