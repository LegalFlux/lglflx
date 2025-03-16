
import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentType } from '@/types';

const Reports = () => {
  return (
    <div className="container py-6 space-y-6">
      <PageHeader 
        title="Relatórios" 
        description="Visualize e gere relatórios detalhados sobre processos, clientes e finanças"
      />
      
      <Tabs defaultValue="casos" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="casos">Processos</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="casos" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Análise de Processos</h3>
            <p className="text-muted-foreground">
              Os relatórios de processos estarão disponíveis em breve. Esta funcionalidade permitirá visualizar estatísticas
              sobre processos em andamento, concluídos, tipos de processos e tempos médios de resolução.
            </p>
          </Card>
        </TabsContent>
        
        <TabsContent value="clientes" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Análise de Clientes</h3>
            <p className="text-muted-foreground">
              Os relatórios de clientes estarão disponíveis em breve. Esta funcionalidade permitirá visualizar estatísticas
              sobre aquisição de clientes, retenção e satisfação.
            </p>
          </Card>
        </TabsContent>
        
        <TabsContent value="financeiro" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Análise Financeira</h3>
            <p className="text-muted-foreground">
              Os relatórios financeiros estarão disponíveis em breve. Esta funcionalidade permitirá visualizar estatísticas
              sobre faturação, honorários e despesas, bem como projeções financeiras.
            </p>
          </Card>
        </TabsContent>
        
        <TabsContent value="documentos" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Análise de Documentos</h3>
            <p className="text-muted-foreground">
              Os relatórios de documentos estarão disponíveis em breve. Esta funcionalidade permitirá visualizar estatísticas
              sobre tipos de documentos, volumes e frequência de acesso.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
