
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard/DashboardCard';
import CaseCard from '@/components/cases/CaseCard';
import { mockCases, mockClients } from '@/data';
import { useRouter } from 'next/router'; // Replace react-router-dom import

const DashboardRecentCases: React.FC = () => {
  const router = useRouter(); // Use Next.js router instead of useNavigate
  
  // Update any navigation functions to use router.push instead of navigate
  // For example, if you have code like:
  // const handleCaseClick = (caseId: string) => {
  //   navigate(`/cases/${caseId}`);
  // };
  // 
  // Change it to:
  // const handleCaseClick = (caseId: string) => {
  //   router.push(`/cases/${caseId}`);
  // };
  
  // Get recent cases
  const recentCases = [...mockCases]
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, 3);

  return (
    <DashboardCard 
      title="Casos Recentes" 
      actions={
        <Button variant="ghost" size="sm" onClick={() => router.push('/cases')} className="text-primary -mr-2">
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
            onClick={() => router.push(`/cases/${legalCase.id}`)}
          />
        ))}
      </div>
    </DashboardCard>
  );
};

export default DashboardRecentCases;
