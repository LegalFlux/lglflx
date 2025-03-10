
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface DocumentSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const DocumentSearch: React.FC<DocumentSearchProps> = ({ 
  searchQuery, 
  setSearchQuery 
}) => {
  return (
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
  );
};

export default DocumentSearch;
