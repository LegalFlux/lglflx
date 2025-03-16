
import React, { useState } from 'react';
import { mockDocuments } from '@/data';
import { Document } from '@/types';
import { toast } from '@/hooks/use-toast';

import DocumentHeader from '@/components/documents/DocumentHeader';
import DocumentContent from '@/components/documents/DocumentContent';

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
        <DocumentHeader 
          onScannedDocument={handleScannedDocument} 
          onSignature={handleSignature} 
        />

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
    </div>
  );
};

export default Documents;
