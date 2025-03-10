
import React from 'react';
import { Briefcase, Users } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { mockCases, mockClients } from '@/data';

const DashboardCaseAnalysis: React.FC = () => {
  // Get case metrics
  const casesByStatus = mockCases.reduce((acc, legalCase) => {
    acc[legalCase.status] = (acc[legalCase.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Get client metrics
  const clientsByStatus = mockClients.reduce((acc, client) => {
    acc[client.status] = (acc[client.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
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
                      style={{ width: `${(Number(count) / mockClients.length) * 100}%` }}
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
  );
};

export default DashboardCaseAnalysis;
