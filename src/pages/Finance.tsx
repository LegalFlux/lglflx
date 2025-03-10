
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Euro, FileText, Plus, Download, Filter } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import { Invoice } from '@/types/finance';
import DocumentSearch from '@/components/documents/DocumentSearch';

const Finance = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const mockInvoices: Invoice[] = [
    {
      id: '1',
      number: 'FT/2023/001',
      clientId: '1',
      issueDate: '2023-01-15T00:00:00Z',
      dueDate: '2023-02-15T00:00:00Z',
      items: [
        {
          description: 'Honorários - Processo Civil',
          quantity: 1,
          unitPrice: 1500,
          taxRate: 23,
          total: 1500
        },
        {
          description: 'Despesas processuais',
          quantity: 1,
          unitPrice: 200,
          taxRate: 23,
          total: 200
        }
      ],
      subtotal: 1700,
      tax: 391,
      total: 2091,
      status: 'paid',
      paymentMethod: 'bank_transfer',
      paymentDate: '2023-02-10T00:00:00Z'
    },
    {
      id: '2',
      number: 'FT/2023/002',
      clientId: '2',
      caseId: '3',
      issueDate: '2023-02-20T00:00:00Z',
      dueDate: '2023-03-20T00:00:00Z',
      items: [
        {
          description: 'Honorários - Processo de Divórcio',
          quantity: 1,
          unitPrice: 1200,
          taxRate: 23,
          total: 1200
        }
      ],
      subtotal: 1200,
      tax: 276,
      total: 1476,
      status: 'pending'
    },
    {
      id: '3',
      number: 'FT/2023/003',
      clientId: '3',
      caseId: '2',
      issueDate: '2023-03-10T00:00:00Z',
      dueDate: '2023-04-10T00:00:00Z',
      items: [
        {
          description: 'Honorários - Processo Trabalhista',
          quantity: 1,
          unitPrice: 1800,
          taxRate: 23,
          total: 1800
        },
        {
          description: 'Despesas de deslocação',
          quantity: 1,
          unitPrice: 150,
          taxRate: 23,
          total: 150
        }
      ],
      subtotal: 1950,
      tax: 448.5,
      total: 2398.5,
      status: 'overdue'
    }
  ];

  const filteredInvoices = mockInvoices.filter(invoice => 
    invoice.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.items.some(item => item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background pt-16 animate-fade-in">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <PageHeader
          title="Gestão Financeira"
          description="Gerencie faturas, honorários e despesas do escritório"
          icon={Euro}
          actions={
            <Button>
              <Plus size={16} className="mr-2" />
              Nova Fatura
            </Button>
          }
        />

        <Tabs defaultValue="faturas" className="space-y-4">
          <TabsList>
            <TabsTrigger value="faturas">Faturas</TabsTrigger>
            <TabsTrigger value="honorarios">Honorários</TabsTrigger>
            <TabsTrigger value="despesas">Despesas</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="faturas" className="space-y-4">
            <div className="flex items-center justify-between">
              <DocumentSearch 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                placeholder="Pesquisar faturas..."
                onOpenFilters={() => console.log("Abrir filtros")}
              />
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter size={16} className="mr-2" />
                  Filtrar
                </Button>
                <Button variant="outline" size="sm">
                  <Download size={16} className="mr-2" />
                  Exportar
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredInvoices.map((invoice) => (
                <Card key={invoice.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Fatura #{invoice.number}</CardTitle>
                        <div className="text-sm text-muted-foreground mt-1">
                          Cliente: {invoice.clientId}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className={`px-2 py-1 rounded-md text-xs font-medium ${
                          invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 
                          invoice.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {invoice.status === 'paid' ? 'Paga' : 
                           invoice.status === 'pending' ? 'Pendente' : 
                           invoice.status === 'partially_paid' ? 'Parcialmente Paga' :
                           invoice.status === 'cancelled' ? 'Cancelada' : 'Vencida'}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Vencimento: {new Date(invoice.dueDate).toLocaleDateString('pt-PT')}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md">
                      <div className="grid grid-cols-4 gap-4 p-3 border-b text-sm font-medium text-muted-foreground">
                        <div className="col-span-2">Descrição</div>
                        <div className="text-right">Quantidade</div>
                        <div className="text-right">Total</div>
                      </div>
                      <div className="divide-y">
                        {invoice.items.map((item, index) => (
                          <div key={index} className="grid grid-cols-4 gap-4 p-3 text-sm">
                            <div className="col-span-2">{item.description}</div>
                            <div className="text-right">{item.quantity}</div>
                            <div className="text-right">{item.total.toLocaleString('pt-PT')} €</div>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-4 gap-4 p-3 border-t bg-muted/50">
                        <div className="col-span-2 text-right font-medium">Subtotal:</div>
                        <div></div>
                        <div className="text-right">{invoice.subtotal.toLocaleString('pt-PT')} €</div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 px-3 pb-1 pt-1 bg-muted/50">
                        <div className="col-span-2 text-right font-medium">IVA (23%):</div>
                        <div></div>
                        <div className="text-right">{invoice.tax.toLocaleString('pt-PT')} €</div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 p-3 border-t bg-muted/50">
                        <div className="col-span-2 text-right font-medium">Total:</div>
                        <div></div>
                        <div className="text-right font-bold">{invoice.total.toLocaleString('pt-PT')} €</div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4 gap-2">
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-2" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText size={16} className="mr-2" />
                        Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="honorarios">
            <Card>
              <CardHeader>
                <CardTitle>Honorários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-8">
                  <div className="text-center">
                    <Euro size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Gestão de Honorários</h3>
                    <p className="text-muted-foreground mb-4">
                      Configure e gerencie os valores de honorários por tipo de serviço
                    </p>
                    <Button>Configurar Honorários</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="despesas">
            <Card>
              <CardHeader>
                <CardTitle>Despesas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-8">
                  <div className="text-center">
                    <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Gestão de Despesas</h3>
                    <p className="text-muted-foreground mb-4">
                      Registe e acompanhe as despesas do escritório e dos processos
                    </p>
                    <Button>Adicionar Despesa</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="relatorios">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios Financeiros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-8">
                  <div className="text-center">
                    <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Relatórios Financeiros</h3>
                    <p className="text-muted-foreground mb-4">
                      Gere relatórios financeiros para análise de desempenho
                    </p>
                    <Button>Gerar Relatório</Button>
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

export default Finance;
