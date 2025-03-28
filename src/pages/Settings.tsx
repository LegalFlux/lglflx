import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { SystemConfig } from "@/types/lexflow";
import SettingsTabs from "@/components/settings/SettingsTabs";

const Settings = () => {
  const initialConfig: SystemConfig = {
    escritorioNome: "LexFlow Advocacia",
    moeda: "EUR",
    taxaIVA: 23,
    diasAlertaPrazos: 5,
    backupAutomatico: true,
    frequenciaBackup: 1,
  };

  const [config, setConfig] = useState<SystemConfig>(initialConfig);

  const handleChange = (key: keyof SystemConfig, value: string | number | boolean) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    try {
      console.log("Configurações salvas:", config);
      localStorage.setItem("systemConfig", JSON.stringify(config)); // Simulação de persistência
    } catch (error) {
      console.error("Erro ao salvar configurações", error);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16 animate-fade-in">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <PageHeader
          title="Configurações"
          description="Personalize o sistema de acordo com as necessidades do seu escritório"
          actions={
            <Button onClick={handleSave}>
              <Save size={16} className="mr-2" />
              Guardar Alterações
            </Button>
          }
        />
        <SettingsTabs config={config} handleChange={handleChange} />
      </div>
    </div>
  );
};

export default Settings;
