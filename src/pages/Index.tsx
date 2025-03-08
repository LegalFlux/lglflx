import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users, Briefcase, Clock, FileText, ArrowUpRight } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import MetricsCard from '@/components/dashboard/MetricsCard';
import CaseCard from '@/components/cases/CaseCard';
import { 
  mockDashboardMetrics, 
  mockCases, 
  mockTasks, 
  mockEvents,
  mockClients 
} from '@/data';
import { useNavigate } from 'react-router-dom';
import { Client } from '@/types/client';
import { LegalCase } from '@/types/case';
import { Task } from '@/types/task';
import { CalendarEvent } from '@/types/calendar';

const Index = () => {
  const navigate = useNavigate();
  
  // Get recent cases
  const recentCases = [...mockCases]
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, 3);
  
  // Get upcoming events
  const upcomingEvents = [...mockEvents]
    .filter(event => new Date(event.start) > new Date())
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 5);
  
  // Get client metrics
  const clientsByStatus = mockClients.reduce((acc, client) => {
    acc[client.status] = (acc[client.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Get case metrics
  const casesByStatus = mockCases.reduce((acc, legalCase) => {
    acc[legalCase.status] = (acc[legalCase.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-background pt-16 animate-fade-in">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Visão geral do seu escritório e atividades recentes
            </p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-2">
            <Button className="flex items-center">
              <PlusCircle size={16} className="mr-2" />
              Novo Caso
            </Button>
          </div>
        </div>

        {/* Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mockDashboardMetrics.slice(0, 6).map((metric) => (
            <MetricsCard key={metric.id} metric={metric} />
          ))}
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Cases */}
          <div className="lg:col-span-2 space-y-6">
            <DashboardCard 
              title="Casos Recentes" 
              actions={
                <Button variant="ghost" size="sm" onClick={() => navigate('/cases')} className="text-primary -mr-2">
                  Ver Todos
                  <ArrowUpRight size={16} className="ml-1" />
                </Button>
              }
            >
              <div className="space-y-4">
                {recentCases.map(legalCase => (
                  <CaseCard 
                    key={legalCase.id} 
                    legalCase={{
                      ...legalCase,
                      client: mockClients.find(client => client.id === legalCase.clientId)
                    }}
                    onClick={() => navigate(`/cases/${legalCase.id}`)}
                  />
                ))}
              </div>
            </DashboardCard>
            
            <DashboardCard 
              title="Análise de Casos" 
              className="shadow-sm"
            >
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[150px]">
                  <div className="flex items-center mb-4">
                    <Briefcase size={18} className="mr-2 text-primary" />
                    <h3 className="font-medium">Status dos Casos</h3>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(casesByStatus).map(([status, count]) => (
                      <div key={status} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground capitalize">
                          {status === 'open' ? 'Aberto' : 
                           status === 'closed' ? 'Fechado' : 
                           status === 'pending' ? 'Pendente' : 
                           status === 'archived' ? 'Arquivado' : status}
                        </span>
                        <div className="flex items-center">
                          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden mr-3">
                            <div 
                              className={`h-full rounded-full ${
                                status === 'open' ? 'bg-green-500' : 
                                status === 'closed' ? 'bg-gray-500' : 
                                status === 'pending' ? 'bg-amber-500' : 
                                'bg-blue-500'
                              }`}
                              style={{ width: `${(count / mockCases.length) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex-1 min-w-[150px]">
                  <div className="flex items-center mb-4">
                    <Users size={18} className="mr-2 text-primary" />
                    <h3 className="font-medium">Status dos Clientes</h3>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(clientsByStatus).map(([status, count]) => (
                      <div key={status} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground capitalize">
                          {status === 'active' ? 'Ativo' : 
                           status === 'inactive' ? 'Inativo' : 
                           status === 'prospect' ? 'Prospecto' : status}
                        </span>
                        <div className="flex items-center">
                          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden mr-3">
                            <div 
                              className={`h-full rounded-full ${
                                status === 'active' ? 'bg-green-500' : 
                                status === 'inactive' ? 'bg-gray-500' : 
                                'bg-blue-500'
                              }`}
                              style={{ width: `${(count / mockClients.length) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <DashboardCard 
              title="Próximos Eventos" 
              actions={
                <Button variant="ghost" size="sm" onClick={() => navigate('/calendar')} className="text-primary -mr-2">
                  Ver Agenda
                  <ArrowUpRight size={16} className="ml-1" />
                </Button>
              }
            >
              <div className="space-y-3">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map(event => (
                    <div 
                      key={event.id} 
                      className="p-3 rounded-md border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start">
                        <div className={`p-2 rounded-md mr-3 ${
                          event.type === 'hearing' ? 'bg-amber-100 text-amber-800' : 
                          event.type === 'meeting' ? 'bg-blue-100 text-blue-800' : 
                          event.type === 'deadline' ? 'bg-red-100 text-red-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {event.type === 'hearing' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 8a6 6 0 0 0-9.33-5"/><path d="m10.67 5.8-.67.5"/><path d="M20.91 8c.61.44.77 1.3.4 1.88l-2.4 3.72a5.94 5.94 0 0 1-5.09 2.92h-6.3a2 2 0 0 1-1.84-1.22l-1.5-3.26a5.7 5.7 0 0 1 1.4-6.26"/><path d="M4.24 15.5c-.33.5-.24 1.18.22 1.5l4.92 3.35c.46.32 1.1.23 1.44-.2l5.76-7.4.01-.01a.9.9 0 0 0 .11-1c-.3-.43-.89-.54-1.32-.25L9.6 15.29"/></svg>}
                          {event.type === 'meeting' && <Users className="w-5 h-5" />}
                          {event.type === 'deadline' && <Clock className="w-5 h-5" />}
                          {event.type === 'task' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>}
                          {event.type === 'other' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm line-clamp-2">{event.title}</h4>
                          <div className="flex items-center mt-1">
                            <Clock size={14} className="text-muted-foreground mr-1" />
                            <p className="text-xs text-muted-foreground">
                              {new Date(event.start).toLocaleDateString('pt-BR')} • {new Date(event.start).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          {event.location && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                              {event.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">Nenhum evento próximo</p>
                  </div>
                )}
              </div>
            </DashboardCard>
            
            <DashboardCard 
              title="Documentos Recentes" 
              actions={
                <Button variant="ghost" size="sm" onClick={() => navigate('/documents')} className="text-primary -mr-2">
                  Ver Todos
                  <ArrowUpRight size={16} className="ml-1" />
                </Button>
              }
            >
              <div className="space-y-3">
                <div className="p-3 rounded-md border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className="p-2 rounded-md bg-blue-100 text-blue-800 mr-3">
                      <FileText size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-1">Petição Inicial - Danos Morais.pdf</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Adicionado em 10/06/2023
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-md border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className="p-2 rounded-md bg-amber-100 text-amber-800 mr-3">
                      <FileText size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-1">Contestação Trabalhista - Final.docx</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Adicionado em 05/06/2023
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-md border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className="p-2 rounded-md bg-green-100 text-green-800 mr-3">
                      <FileText size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-1">Relatório de Análise - Caso Maria.pdf</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Adicionado em 01/06/2023
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
