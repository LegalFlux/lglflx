
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, Save, Euro, Users, Shield, FileText } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import { SystemConfig } from '@/types/lexflow';

const Settings = () => {
  const [config, setConfig] = useState<SystemConfig>({
    escritorioNome: "LexFlow Advocacia",
    moeda: "EUR",
    taxaIVA: 23,
    diasAlertaPrazos: 5,
    backupAutomatico: true,
    frequenciaBackup: 1
  });

  const handleChange = (key: keyof SystemConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    console.log("Configurações salvas:", config);
    // Aqui seria implementada a lógica para salvar as configurações
  };

  return (
    <div className="min-h-screen bg-background pt-16 animate-fade-in">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <PageHeader
          title="Configurações"
          description="Personalize o sistema de acordo com as necessidades do seu escritório"
          icon={<SettingsIcon size={28} />}
          actions={
            <Button onClick={handleSave}>
              <Save size={16} className="mr-2" />
              Guardar Alterações
            </Button>
          }
        />

        <Tabs defaultValue="geral" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full">
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
            <TabsTrigger value="utilizadores">Utilizadores</TabsTrigger>
            <TabsTrigger value="documentos">Documentos</TabsTrigger>
            <TabsTrigger value="seguranca">Segurança</TabsTrigger>
          </TabsList>

          <TabsContent value="geral" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="financeiro" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="utilizadores">
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
          </TabsContent>

          <TabsContent value="documentos">
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
          </TabsContent>

          <TabsContent value="seguranca">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
