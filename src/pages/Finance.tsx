
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Clock } from 'lucide-react';

const Finance = () => {
  return (
    <div className="container py-6 space-y-6">
      <PageHeader 
        title="Finanças" 
        description="Gerencie faturamento, honorários e documentos"
      />

      <Tabs defaultValue="faturacao" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="faturacao">Faturação</TabsTrigger>
          <TabsTrigger value="honorarios">Honorários</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faturacao" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <BarChart size={20} />
                  </div>
                  <CardTitle>Faturamento e Cobrança</CardTitle>
                </div>
                <CardDescription>
                  Gestão de faturamento e cobrança automatizada
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Funcionalidades</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Geração automática de faturas</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Integração com sistemas de pagamento</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Previsão de fluxo de caixa</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Relatórios financeiros detalhados</span>
                      </li>
                    </ul>
                  </div>
                  <Button>Gerar Nova Fatura</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <Clock size={20} />
                  </div>
                  <CardTitle>Registro de Horas</CardTitle>
                </div>
                <CardDescription>
                  Controle preciso de horas trabalhadas em cada caso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Funcionalidades</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Cronômetro integrado</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Registro manual de horas</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Relatórios por caso, cliente ou advogado</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Conversão automática para faturamento</span>
                      </li>
                    </ul>
                  </div>
                  <Button>Iniciar Registro de Horas</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="honorarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Honorários</CardTitle>
              <CardDescription>
                Defina e monitorize honorários por processo, cliente ou tipo de serviço
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Honorários por Tipo de Caso</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Civil</span>
                        <span className="font-medium">€120/hora</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Penal</span>
                        <span className="font-medium">€150/hora</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Trabalhista</span>
                        <span className="font-medium">€100/hora</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Fiscal</span>
                        <span className="font-medium">€180/hora</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Tabela de Serviços</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Consulta Jurídica</span>
                        <span className="font-medium">€80</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Petição Inicial</span>
                        <span className="font-medium">€500</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Contestação</span>
                        <span className="font-medium">€400</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Recurso</span>
                        <span className="font-medium">€800</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <Button>Configurar Honorários</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Finance;
