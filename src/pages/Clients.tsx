import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlusCircle, ChevronDown, Search } from 'lucide-react';
import { mockClients } from '@/data';
import { Client } from '@/types';
import ClientCard from '@/components/clients/ClientCard';
import { useRouter } from 'next/router';

const Clients = () => {
  const router = useRouter();
  const [clients, setClients] = useState(mockClients);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<keyof Client>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const navigate = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    let sortedClients = [...mockClients];

    // Apply search filter
    if (searchQuery && searchQuery.length > 0) {
      sortedClients = sortedClients.filter(client =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    sortedClients.sort((a, b) => {
      // Garantir que os valores existem e são comparáveis
      const aValue = a[sortBy] !== undefined ? (typeof a[sortBy] === 'string' ? (a[sortBy] as string).toLowerCase() : a[sortBy]) : '';
      const bValue = b[sortBy] !== undefined ? (typeof b[sortBy] === 'string' ? (b[sortBy] as string).toLowerCase() : b[sortBy]) : '';
      
      // Comparação segura
      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setClients(sortedClients);
  }, [searchQuery, sortBy, sortOrder]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortOrderChange = (newSortBy: keyof Client) => {
    if (sortBy === newSortBy) {
      // Toggle sort order if the same column is clicked
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort column and reset sort order to ascending
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16 animate-fade-in">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Clientes</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie seus clientes e informações de contato
            </p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-2">
            <Button className="flex items-center">
              <PlusCircle size={16} className="mr-2" />
              Novo Cliente
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-2">
          <div className="relative w-full md:w-1/3">
            <Input
              type="search"
              placeholder="Buscar cliente..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                Ordenar por
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSortOrderChange('name')}>
                Nome {sortBy === 'name' && (sortOrder === 'asc' ? '(A-Z)' : '(Z-A)')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortOrderChange('email')}>
                Email {sortBy === 'email' && (sortOrder === 'asc' ? '(A-Z)' : '(Z-A)')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortOrderChange('createdAt')}>
                Data de Cadastro {sortBy === 'createdAt' && (sortOrder === 'asc' ? '(Mais Antigo)' : '(Mais Recente)')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Client List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map(client => (
            <ClientCard 
              key={client.id} 
              client={client} 
              onClick={() => navigate(`/clients/${client.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;
