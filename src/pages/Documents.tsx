
import React, { useState } from 'react';
import { 
  FilePlus, 
  Filter, 
  Search, 
  FileText, 
  X,
  SortAsc,
  SortDesc 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DocumentCard from '@/components/documents/DocumentCard';
import { mockDocuments } from '@/data';
import { Document } from '@/types';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

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
          <div className="relative flex-1 w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Pesquisar documentos..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Filter size={16} className="mr-2" />
                  Filtrar
                  {filters.types.length > 0 && (
                    <Badge className="ml-2 bg-primary text-primary-foreground">
                      {filters.types.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filtrar por Tipo</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {documentTypes.map((type) => (
                    <DropdownMenuItem
                      key={type}
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleTypeFilter(type)}
                    >
                      <span className="capitalize">
                        {type === 'petition' ? 'Petição' : 
                        type === 'contract' ? 'Contrato' : 
                        type === 'evidence' ? 'Evidência' : 
                        type === 'report' ? 'Relatório' : type}
                      </span>
                      {filters.types.includes(type) && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-primary"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                {(filters.types.length > 0) && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive cursor-pointer"
                      onClick={clearFilters}
                    >
                      Limpar Filtros
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" size="icon" onClick={toggleSortOrder}>
              {sortOrder === 'desc' ? (
                <SortDesc size={16} />
              ) : (
                <SortAsc size={16} />
              )}
            </Button>
          </div>
        </div>

        {/* Active filters */}
        {filters.types.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.types.map((type) => (
              <Badge 
                key={type} 
                variant="secondary"
                className="flex items-center gap-1 pl-3"
              >
                <span className="capitalize">
                  {type === 'petition' ? 'Petição' : 
                  type === 'contract' ? 'Contrato' : 
                  type === 'evidence' ? 'Evidência' : 
                  type === 'report' ? 'Relatório' : type}
                </span>
                <button 
                  className="ml-1 rounded-full hover:bg-muted"
                  onClick={() => toggleTypeFilter(type)}
                >
                  <X size={14} />
                </button>
              </Badge>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs"
              onClick={clearFilters}
            >
              Limpar Todos
            </Button>
          </div>
        )}

        {/* Documents list */}
        {filteredDocuments.length > 0 ? (
          <div className="space-y-4">
            {filteredDocuments.map((document) => (
              <DocumentCard
                key={document.id}
                document={document}
                onDownload={handleDownload}
                onDelete={handleDelete}
                onView={handleView}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Nenhum documento encontrado</h3>
            <p className="mt-1 text-muted-foreground">
              {searchQuery || filters.types.length > 0
                ? "Tente ajustar seus filtros ou pesquisa"
                : "Adicione documentos para começar"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
