import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import DocumentHeader from '@/components/documents/DocumentHeader';
import DocumentContent from '@/components/documents/DocumentContent';
import { mockDocuments } from '@/data/documents';
import { Document, DocumentType } from '@/types';

const Documents: React.FC = () => {
  const { toast } = useToast();
  
  // Estado para documentos e filtros
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{ types: string[] }>({ types: [] });
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [activeTab, setActiveTab] = useState('documentos');

  // Extrair tipos de documentos únicos para os filtros
  const documentTypes = Array.from(new Set(documents.map(doc => doc.type)));

  // Filtrar documentos com base na pesquisa e filtros
  const filteredDocuments = documents.filter(doc => {
    // Filtro de pesquisa
    const matchesSearch = searchQuery === '' || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    // Filtro de tipos
    const matchesType = filters.types.length === 0 || filters.types.includes(doc.type);
    
    return matchesSearch && matchesType;
  }).sort((a, b) => {
    // Ordenação por data de upload
    const dateA = new Date(a.uploadedAt).getTime();
    const dateB = new Date(b.uploadedAt).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  // Funções de manipulação de documentos
  const handleDownload = (document: Document) => {
    toast({
      title: "Download iniciado",
      description: `Baixando ${document.name}...`,
    });
    // Lógica de download seria implementada aqui
  };

  const handleDelete = (document: Document) => {
    // Confirmar exclusão
    if (window.confirm(`Tem certeza que deseja excluir o documento "${document.name}"?`)) {
      setDocuments(prev => prev.filter(doc => doc.id !== document.id));
      toast({
        title: "Documento excluído",
        description: `${document.name} foi removido com sucesso.`,
      });
    }
  };

  const handleView = (document: Document) => {
    toast({
      title: "Visualizando documento",
      description: `Abrindo ${document.name}...`,
    });
    // Lógica de visualização seria implementada aqui
  };

  const handleUseTemplate = (templateName: string) => {
    toast({
      title: "Template selecionado",
      description: `Usando template ${templateName}...`,
    });
    // Lógica de uso de template seria implementada aqui
  };

  const handleScannedDocument = (file: File) => {
    // Criar um novo documento a partir do arquivo escaneado
    const newDocument: Document = {
      id: `scan-${Date.now()}`,
      name: file.name,
      type: 'evidence',
      path: URL.createObjectURL(file),
      size: file.size,
      uploadedBy: '1', // ID do usuário atual
      uploadedAt: new Date().toISOString(),
      tags: ['escaneado'],
    };

    setDocuments(prev => [newDocument, ...prev]);
    toast({
      title: "Documento escaneado",
      description: `${file.name} foi adicionado com sucesso.`,
    });
  };

  const handleSignature = (signatureDataUrl: string) => {
    toast({
      title: "Assinatura criada",
      description: "Assinatura digital criada com sucesso.",
    });
    // Lógica para usar a assinatura seria implementada aqui
  };

  // Funções para manipulação de filtros
  const toggleTypeFilter = (type: string) => {
    setFilters(prev => {
      const types = prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type];
      return { ...prev, types };
    });
  };

  const clearFilters = () => {
    setFilters({ types: [] });
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Cabeçalho com título e botões de ação */}
      <DocumentHeader 
        onScannedDocument={handleScannedDocument}
        onSignature={handleSignature}
      />
      
      {/* Conteúdo principal com abas, pesquisa, filtros e lista de documentos */}
      <DocumentContent 
        documents={documents}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        documentTypes={documentTypes}
        toggleTypeFilter={toggleTypeFilter}
        clearFilters={clearFilters}
        sortOrder={sortOrder}
        toggleSortOrder={toggleSortOrder}
        filteredDocuments={filteredDocuments}
        onDownload={handleDownload}
        onDelete={handleDelete}
        onView={handleView}
        onUseTemplate={handleUseTemplate}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default Documents;
