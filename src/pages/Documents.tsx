
import React, { useState } from 'react';
import { FilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockDocuments } from '@/data';
import { Document } from '@/types';
import { toast } from '@/hooks/use-toast';

import DocumentSearch from '@/components/documents/DocumentSearch';
import DocumentFilters from '@/components/documents/DocumentFilters';
import DocumentList from '@/components/documents/DocumentList';

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{
    types: string[];
  }>({
    types: [],
  });
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

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
          <div className="flex mt-4 md:mt-0 space-x-2">
            <Button className="flex items-center">
              <FilePlus size={16} className="mr-2" />
              Novo Documento
            </Button>
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default Documents;
