
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scan, FileSignature, FileUp, Clock, BarChart } from 'lucide-react';

const Finance = () => {
  return (
    <div className="container py-6 space-y-6">
      <PageHeader 
        title="Finanças" 
        description="Gerencie faturamento, honorários e documentos"
      />

      <Tabs defaultValue="documentos" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="documentos">Documentos Digitais</TabsTrigger>
          <TabsTrigger value="faturacao">Faturação</TabsTrigger>
          <TabsTrigger value="honorarios">Honorários</TabsTrigger>
        </TabsList>
        
        <TabsContent value="documentos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-md bg-primary/10 text-primary">
                      <Scan size={20} />
                    </div>
                    <CardTitle>Digitalização de Documentos</CardTitle>
                  </div>
                </div>
                <CardDescription>
                  Digitalize documentos físicos e extraia texto automaticamente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Funcionalidades</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Captura pela câmara do dispositivo</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Correção de perspectiva e melhoria de imagem</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>OCR para extrair texto</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Geração de PDF digitalizado</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full">
                    <FileUp size={16} className="mr-2" />
                    Digitalizar Documento
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-md bg-primary/10 text-primary">
                      <FileSignature size={20} />
                    </div>
                    <CardTitle>Assinatura Digital</CardTitle>
                  </div>
                </div>
                <CardDescription>
                  Assine documentos digitalmente e envie-os de forma segura
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Funcionalidades</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Assinatura manuscrita digital no ecrã</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Suporte para assinatura com certificado digital</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Validação e armazenamento seguro</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Envio automático do documento assinado</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full">
                    <FileSignature size={16} className="mr-2" />
                    Assinar Documento
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Templates de Documentos</CardTitle>
              <CardDescription>
                Modelos pré-formatados para criar documentos rapidamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-md p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                  <h3 className="font-medium">Procuração</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Modelo de procuração geral para representação jurídica
                  </p>
                </div>
                <div className="border rounded-md p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                  <h3 className="font-medium">Contrato de Prestação de Serviços</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Modelo padrão para contratação de serviços advocatícios
                  </p>
                </div>
                <div className="border rounded-md p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                  <h3 className="font-medium">Petição Inicial</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Modelo de petição inicial para processos cíveis
                  </p>
                </div>
                <div className="border rounded-md p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                  <h3 className="font-medium">Contestação</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Modelo de contestação para processos cíveis
                  </p>
                </div>
                <div className="border rounded-md p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                  <h3 className="font-medium">Recurso</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Modelo de recurso para instâncias superiores
                  </p>
                </div>
                <div className="border-dashed border-2 rounded-md p-4 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors cursor-pointer">
                  <span>+ Adicionar novo template</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
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
