
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard/DashboardCard';
import CaseCard from '@/components/cases/CaseCard';
import { mockCases, mockClients } from '@/data';
import { useNavigate } from 'react-router-dom';

const DashboardRecentCases: React.FC = () => {
  const navigate = useNavigate();
  
  // Get recent cases
  const recentCases = [...mockCases]
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, 3);

  return (
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
  );
};

export default DashboardRecentCases;
