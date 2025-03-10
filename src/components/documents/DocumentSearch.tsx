
import React from 'react';
import { Search, X, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface DocumentSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenFilters?: () => void;
  placeholder?: string;
}

const DocumentSearch: React.FC<DocumentSearchProps> = ({ 
  searchQuery, 
  setSearchQuery,
  onOpenFilters,
  placeholder = "Pesquisar documentos..."
}) => {
  return (
    <div className="relative flex items-center w-full gap-2">
      <div className="relative flex-1 w-full md:max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={placeholder}
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            onClick={() => setSearchQuery('')}
            aria-label="Limpar pesquisa"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {onOpenFilters && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onOpenFilters}
          className="flex items-center gap-1"
        >
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filtros</span>
        </Button>
      )}
    </div>
  );
};

export default DocumentSearch;
