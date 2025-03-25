import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageHeader from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/card';
import { mockCases, mockClients, mockDocuments } from '@/data';
import { Users, FileText, CreditCard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import CaseCard from '@/components/cases/CaseCard';
import DocumentCard from '@/components/documents/DocumentCard';
import ClientAccount from '@/components/client/ClientAccount';
import { AccountTransaction } from '@/types/account';

// Mock data for the account
const mockTransactions: AccountTransaction[] = [
  {
    id: '1',
    clienteId: '123',
    casoId: '456',
    data: new Date().toISOString(), // Converte Date para string
    descricao: 'Descrição do exemplo',
    valor: 100.00,
    tipo: 'honorario',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // ...outros itens
];

const mockAccountSummary = {
  total: 650,
  totalPago: 300,
  saldo: -350,
  pendente: 350,
  ultimoPagamento: new Date('2023-10-20'),
  valorUltimoPagamento: 300
};

const ClientPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('cases');
  const { user } = useAuth();
  
  // Mock client for demo
  const client = mockClients[0];
  
  // Filter cases and documents for this client
  const clientCases = mockCases.filter(c => c.clientId === client.id);
  const clientDocuments = mockDocuments.filter(d => d.clientId === client.id);
  
  return (
    <div className="container mx-auto px-4 pt-6 pb-16 max-w-7xl">
      <PageHeader
        title="Portal do Cliente"
        description="Aceda à informação dos seus processos e documentos"
        icon={<Users className="mr-2" />}
      />
      
      <Tabs
        defaultValue="cases"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mt-6"
      >
        <div className="flex justify-between items-center mb-6">
          <TabsList className="w-full md:w-auto justify-start overflow-x-auto">
            <TabsTrigger value="cases" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              <span>Processos</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              <span>Documentos</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Conta Corrente</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="cases" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clientCases.length > 0 ? (
              clientCases.map(legalCase => (
                <CaseCard
                  key={legalCase.id}
                  legalCase={{
                    ...legalCase,
                    client: client
                  }}
                />
              ))
            ) : (
              <Card className="p-6 col-span-full">
                <p className="text-center text-muted-foreground">Não tem processos ativos de momento.</p>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientDocuments.length > 0 ? (
              clientDocuments.map(document => (
                <DocumentCard key={document.id} document={document} />
              ))
            ) : (
              <Card className="p-6 col-span-full">
                <p className="text-center text-muted-foreground">Não tem documentos disponíveis de momento.</p>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="account" className="mt-0">
          <ClientAccount
            clientId={client.id}
            transactions={mockTransactions}
            summary={mockAccountSummary}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientPortal;
