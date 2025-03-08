
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusCircle, Search, Filter } from 'lucide-react';
import CaseCard from '@/components/cases/CaseCard';
import { mockCases, mockClients } from '@/data/mockData';
import { LegalCase, CaseStatus, CaseType, CasePriority } from '@/types';
import { useNavigate } from 'react-router-dom';

const Cases = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  
  // Combine cases with client data
  const casesWithClients = mockCases.map(legalCase => ({
    ...legalCase,
    client: mockClients.find(client => client.id === legalCase.clientId)
  }));
  
  // Filter cases based on search term and filters
  const filteredCases = casesWithClients.filter(legalCase => {
    const matchesSearch = 
      searchTerm === '' || 
      legalCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      legalCase.number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      legalCase.client?.name.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || legalCase.status === statusFilter;
    const matchesType = typeFilter === 'all' || legalCase.type === typeFilter;
    const matchesPriority = priorityFilter === 'all' || legalCase.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-background pt-16 animate-fade-in">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Casos</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie todos os seus processos e casos jurídicos
            </p>
          </div>
          <div className="flex mt-4 md:mt-0">
            <Button className="flex items-center">
              <PlusCircle size={16} className="mr-2" />
              Novo Caso
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Pesquisar por título, número ou cliente..."
              className="pl-9"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="w-full md:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <div className="flex items-center">
                    <Filter size={16} className="mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="open">Aberto</SelectItem>
                  <SelectItem value="closed">Fechado</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="archived">Arquivado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-auto">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Tipos</SelectItem>
                  <SelectItem value="civil">Civil</SelectItem>
                  <SelectItem value="criminal">Criminal</SelectItem>
                  <SelectItem value="labor">Trabalhista</SelectItem>
                  <SelectItem value="tax">Tributário</SelectItem>
                  <SelectItem value="corporate">Corporativo</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-auto">
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Prioridades</SelectItem>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.length > 0 ? (
            filteredCases.map(legalCase => (
              <CaseCard 
                key={legalCase.id} 
                legalCase={legalCase}
                onClick={() => navigate(`/cases/${legalCase.id}`)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">Nenhum caso encontrado</h3>
              <p className="text-muted-foreground mt-1">
                Tente ajustar os filtros ou criar um novo caso
              </p>
              <Button className="mt-4">
                <PlusCircle size={16} className="mr-2" />
                Criar Novo Caso
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cases;
