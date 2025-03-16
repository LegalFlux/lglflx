
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import DashboardMetrics from './DashboardMetrics';
import DashboardRecentCases from './DashboardRecentCases';
import DashboardCaseAnalysis from './DashboardCaseAnalysis';
import DashboardUpcomingEvents from './DashboardUpcomingEvents';
import DashboardRecentDocuments from './DashboardRecentDocuments';
import { useNavigate } from 'react-router-dom';
import { mockDashboardMetrics } from '@/data';

const DashboardOverview: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Visão geral do seu escritório e atividades recentes
            </p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-2">
            <Button className="flex items-center" onClick={() => navigate('/cases/new')}>
              <PlusCircle size={16} className="mr-2" />
              Novo Caso
            </Button>
          </div>
        </div>

        {/* Metrics Section */}
        <DashboardMetrics metrics={mockDashboardMetrics.slice(0, 6)} />

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Cases and Case Analysis */}
          <div className="lg:col-span-2 space-y-6">
            <DashboardRecentCases />
            <DashboardCaseAnalysis />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <DashboardUpcomingEvents />
            <DashboardRecentDocuments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
