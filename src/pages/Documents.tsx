
import React, { useState } from 'react';
import { FilePlus, Scan, FileSignature, FileText, LayoutTemplate } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockDocuments } from '@/data';
import { Document } from '@/types';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DocumentSearch from '@/components/documents/DocumentSearch';
import DocumentFilters from '@/components/documents/DocumentFilters';
import DocumentList from '@/components/documents/DocumentList';
import DocumentScanner from '@/components/documents/DocumentScanner';
import SignatureCanvas from '@/components/documents/SignatureCanvas';
import DocumentTemplateCard from '@/components/documents/DocumentTemplateCard';

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{
    types: string[];
  }>({
    types: [],
  });
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [activeTab, setActiveTab] = useState('documentos');

  // Get all document types for filter
  const documentTypes = Array.from(new Set(mockDocuments.map(doc => doc.type)));

  // Filter documents based on search query and filters
  const filteredDocuments = documents.filter(doc => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Type filter
    const matchesType = filters.types.length === 0 || 
      filters.types.includes(doc.type);
    
    return matchesSearch && matchesType;
  }).sort((a, b) => {
    // Sort by upload date
    const dateA = new Date(a.uploadedAt).getTime();
    const dateB = new Date(b.uploadedAt).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Toggle document type filter
  const toggleTypeFilter = (type: string) => {
    setFilters(prev => {
      const newTypes = prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type];
      
      return { ...prev, types: newTypes };
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({ types: [] });
    setSearchQuery('');
  };

  // Handle document actions
  const handleDownload = (document: Document) => {
    toast({
      title: "Download iniciado",
      description: `${document.name} será baixado em breve.`,
    });
  };

  const handleDelete = (document: Document) => {
    toast({
      title: "Documento removido",
      description: `${document.name} foi removido com sucesso.`,
      variant: "destructive",
    });
    setDocuments(docs => docs.filter(d => d.id !== document.id));
  };

  const handleView = (document: Document) => {
    toast({
      title: "Visualizando documento",
      description: `Abrindo ${document.name}`,
    });
  };

  // Handle scanned document
  const handleScannedDocument = (file: File) => {
    // Create a new document from the scanned file
    const newDoc: Document = {
      id: (documents.length + 1).toString(),
      name: file.name,
      type: 'evidence',
      path: URL.createObjectURL(file),
      size: file.size,
      uploadedBy: '1',
      uploadedAt: new Date().toISOString(),
      tags: ['digitalizado', 'evidência'],
    };

    setDocuments(prev => [newDoc, ...prev]);
    
    toast({
      title: "Documento digitalizado",
      description: "O documento foi digitalizado e adicionado com sucesso.",
    });
  };

  // Handle signature
  const handleSignature = (signatureDataUrl: string) => {
    // Create a new document from the signature
    const newDoc: Document = {
      id: (documents.length + 1).toString(),
      name: `Assinatura_${new Date().toLocaleDateString().replace(/\//g, '-')}.png`,
      type: 'evidence',
      path: signatureDataUrl,
      size: Math.round(signatureDataUrl.length * 0.75), // Approximate size
      uploadedBy: '1',
      uploadedAt: new Date().toISOString(),
      tags: ['assinatura', 'documento oficial'],
    };

    setDocuments(prev => [newDoc, ...prev]);
    
    toast({
      title: "Assinatura salva",
      description: "A assinatura foi salva e adicionada aos documentos.",
    });
  };

  // Handle template usage
  const handleUseTemplate = (templateName: string) => {
    toast({
      title: "Template utilizado",
      description: `O template "${templateName}" foi aberto para edição.`,
    });
  };

  return (
    <div className="min-h-screen bg-background pt-16 animate-fade-in">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Documentos</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie todos os seus documentos jurídicos
            </p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-2 flex-wrap gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center">
                  <Scan size={16} className="mr-2" />
                  Digitalizar
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
                <DocumentScanner onScan={handleScannedDocument} />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center" variant="outline">
                  <FileSignature size={16} className="mr-2" />
                  Assinar
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <SignatureCanvas onSave={handleSignature} />
              </DialogContent>
            </Dialog>

            <Button className="flex items-center" variant="outline">
              <FilePlus size={16} className="mr-2" />
              Novo
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="mb-4">
            <TabsTrigger value="documentos">
              <FileText size={16} className="mr-2" />
              Documentos
            </TabsTrigger>
            <TabsTrigger value="templates">
              <LayoutTemplate size={16} className="mr-2" />
              Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="documentos" className="space-y-6">
            {/* Search and filters */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
              <DocumentSearch 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
              />
              
              <DocumentFilters 
                documentTypes={documentTypes}
                filters={filters}
                toggleTypeFilter={toggleTypeFilter}
                clearFilters={clearFilters}
                sortOrder={sortOrder}
                toggleSortOrder={toggleSortOrder}
              />
            </div>

            {/* Documents list */}
            <DocumentList 
              documents={filteredDocuments}
              onDownload={handleDownload}
              onDelete={handleDelete}
              onView={handleView}
            />
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <DocumentTemplateCard
                title="Procuração"
                description="Modelo de procuração geral para representação jurídica"
                onUse={() => handleUseTemplate("Procuração")}
                onDownload={() => handleDownload({
                  id: 'template-1',
                  name: 'Procuração_Template.docx',
                  type: 'contract',
                  path: '/templates/procuracao.docx',
                  size: 245000,
                  uploadedBy: '1',
                  uploadedAt: new Date().toISOString(),
                })}
                onEdit={() => {}}
              />
              
              <DocumentTemplateCard
                title="Contrato de Prestação de Serviços"
                description="Modelo padrão para contratação de serviços advocatícios"
                onUse={() => handleUseTemplate("Contrato de Prestação de Serviços")}
                onDownload={() => handleDownload({
                  id: 'template-2',
                  name: 'Contrato_Prestacao_Servicos.docx',
                  type: 'contract',
                  path: '/templates/contrato.docx',
                  size: 320000,
                  uploadedBy: '1',
                  uploadedAt: new Date().toISOString(),
                })}
                onEdit={() => {}}
              />
              
              <DocumentTemplateCard
                title="Petição Inicial"
                description="Modelo de petição inicial para processos cíveis"
                onUse={() => handleUseTemplate("Petição Inicial")}
                onDownload={() => handleDownload({
                  id: 'template-3',
                  name: 'Peticao_Inicial.docx',
                  type: 'petition',
                  path: '/templates/peticao.docx',
                  size: 280000,
                  uploadedBy: '1',
                  uploadedAt: new Date().toISOString(),
                })}
                onEdit={() => {}}
              />
              
              <DocumentTemplateCard
                title="Contestação"
                description="Modelo de contestação para processos cíveis"
                onUse={() => handleUseTemplate("Contestação")}
                onDownload={() => handleDownload({
                  id: 'template-4',
                  name: 'Contestacao.docx',
                  type: 'petition',
                  path: '/templates/contestacao.docx',
                  size: 310000,
                  uploadedBy: '1',
                  uploadedAt: new Date().toISOString(),
                })}
                onEdit={() => {}}
              />
              
              <DocumentTemplateCard
                title="Recurso"
                description="Modelo de recurso para instâncias superiores"
                onUse={() => handleUseTemplate("Recurso")}
                onDownload={() => handleDownload({
                  id: 'template-5',
                  name: 'Recurso.docx',
                  type: 'petition',
                  path: '/templates/recurso.docx',
                  size: 295000,
                  uploadedBy: '1',
                  uploadedAt: new Date().toISOString(),
                })}
                onEdit={() => {}}
              />
              
              <Card className="border-dashed border-2 rounded-md p-4 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors cursor-pointer h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 mb-2">
                    <FilePlus size={24} />
                  </div>
                  <span className="text-sm font-medium">Adicionar template</span>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documents;
