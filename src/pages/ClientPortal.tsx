
import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, Calendar, Clock } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockDocuments } from '@/data';
import { Document } from '@/types';

const ClientPortal = () => {
  const [activeCase, setActiveCase] = useState(null);
  
  // Exemplo de casos do cliente (isto seria carregado do Supabase na implementação real)
  const clientCases = [
    {
      id: '1',
      title: 'Processo de Partilha de Bens',
      description: 'Partilha de bens após divórcio',
      status: 'active',
      createdAt: '2023-06-15',
      documents: ['doc1', 'doc2'],
      nextHearing: '2023-12-10',
    },
    {
      id: '2',
      title: 'Ação de Indemnização',
      description: 'Processo de indemnização por danos pessoais',
      status: 'active',
      createdAt: '2023-08-22',
      documents: ['doc3'],
      nextHearing: null,
    }
  ];
  
  // Filtra documentos com base no caso selecionado (simulação)
  const getDocumentsForCase = (caseId) => {
    if (!caseId) return [];
    return mockDocuments.slice(0, caseId === '1' ? 3 : 2);
  };
  
  const handleDownload = (document: Document) => {
    console.log('Download document:', document);
    // Implementação real faria o download do documento
  };
  
  const handleView = (document: Document) => {
    console.log('View document:', document);
    // Implementação real abriria o documento para visualização
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusText = (status: string) => {
    switch(status) {
      case 'active': return 'Ativo';
      case 'closed': return 'Encerrado';
      case 'archived': return 'Arquivado';
      default: return status;
    }
  };

  return (
    <div className="container py-6 space-y-6">
      <PageHeader 
        title="Portal do Cliente" 
        description="Acompanhe seus processos e documentos"
      />
      
      <Tabs defaultValue="processos" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="processos">Meus Processos</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
        </TabsList>
        
        <TabsContent value="processos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clientCases.map(caseItem => (
              <Card 
                key={caseItem.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setActiveCase(caseItem.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(caseItem.status)}`}>
                      {getStatusText(caseItem.status)}
                    </span>
                  </div>
                  <CardDescription>{caseItem.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data de Abertura:</span>
                      <span>{new Date(caseItem.createdAt).toLocaleDateString('pt-PT')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Documentos:</span>
                      <span>{caseItem.documents.length}</span>
                    </div>
                    {caseItem.nextHearing && (
                      <div className="flex justify-between items-center mt-2 pt-2 border-t">
                        <span className="flex items-center text-amber-600">
                          <Calendar size={14} className="mr-1" />
                          Próxima Audiência:
                        </span>
                        <span>{new Date(caseItem.nextHearing).toLocaleDateString('pt-PT')}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {activeCase && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Detalhes do Processo</CardTitle>
                <CardDescription>
                  {clientCases.find(c => c.id === activeCase)?.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Linha do Tempo</h4>
                    <div className="relative pl-6 border-l-2 border-muted space-y-4">
                      <div className="relative">
                        <div className="absolute -left-[27px] w-4 h-4 rounded-full bg-primary"></div>
                        <div className="pb-4">
                          <p className="font-medium">Abertura do Processo</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(clientCases.find(c => c.id === activeCase)?.createdAt).toLocaleDateString('pt-PT')}
                          </p>
                          <p className="text-sm mt-1">
                            Processo iniciado com a entrada da petição inicial.
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute -left-[27px] w-4 h-4 rounded-full bg-muted"></div>
                        <div className="pb-4">
                          <p className="font-medium">Aguardando Resposta</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date().toLocaleDateString('pt-PT')}
                          </p>
                          <p className="text-sm mt-1">
                            Aguardando resposta da parte contrária.
                          </p>
                        </div>
                      </div>
                      
                      {clientCases.find(c => c.id === activeCase)?.nextHearing && (
                        <div className="relative">
                          <div className="absolute -left-[27px] w-4 h-4 rounded-full bg-muted"></div>
                          <div className="pb-4">
                            <p className="font-medium">Audiência Agendada</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(clientCases.find(c => c.id === activeCase)?.nextHearing).toLocaleDateString('pt-PT')}
                            </p>
                            <p className="text-sm mt-1">
                              Audiência agendada para apreciação do caso.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="documentos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meus Documentos</CardTitle>
              <CardDescription>
                Documentos relacionados aos seus processos
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeCase ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getDocumentsForCase(activeCase).map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <FileText size={16} className="mr-2 text-primary" />
                            {doc.name}
                          </div>
                        </TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{new Date(doc.uploadedAt).toLocaleDateString('pt-PT')}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleView(doc)}>
                            <Eye size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDownload(doc)}>
                            <Download size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Selecione um processo</h3>
                  <p className="mt-1 text-muted-foreground">
                    Selecione um processo para ver os documentos associados
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="agenda" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agenda</CardTitle>
              <CardDescription>
                Próximos eventos e prazos dos seus processos
              </CardDescription>
            </CardHeader>
            <CardContent>
              {clientCases.some(c => c.nextHearing) ? (
                <div className="space-y-4">
                  {clientCases.filter(c => c.nextHearing).map(caseItem => (
                    <div key={caseItem.id} className="flex items-start p-4 border rounded-md">
                      <Calendar size={24} className="text-primary mr-4 mt-1" />
                      <div>
                        <h4 className="font-medium">{caseItem.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Audiência em {new Date(caseItem.nextHearing).toLocaleDateString('pt-PT')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Sem eventos agendados</h3>
                  <p className="mt-1 text-muted-foreground">
                    Não há eventos agendados para os próximos dias
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientPortal;
