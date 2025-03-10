
import React from 'react';
import { Filter, X, SortAsc, SortDesc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface DocumentFiltersProps {
  documentTypes: string[];
  filters: {
    types: string[];
  };
  toggleTypeFilter: (type: string) => void;
  clearFilters: () => void;
  sortOrder: 'asc' | 'desc';
  toggleSortOrder: () => void;
}

const DocumentFilters: React.FC<DocumentFiltersProps> = ({
  documentTypes,
  filters,
  toggleTypeFilter,
  clearFilters,
  sortOrder,
  toggleSortOrder
}) => {
  const getDocumentTypeName = (type: string): string => {
    switch (type) {
      case 'petition': return 'Petição';
      case 'contract': return 'Contrato';
      case 'evidence': return 'Evidência';
      case 'report': return 'Relatório';
      case 'procuration': return 'Procuração';
      default: return type;
    }
  };

  return (
    <>
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
                    {getDocumentTypeName(type)}
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
                {getDocumentTypeName(type)}
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
    </>
  );
};

export default DocumentFilters;
