
import React from 'react';
import { mockDocuments } from '@/data';
import DocumentCard from '@/components/documents/DocumentCard';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { useRouter } from 'next/router';
import { ArrowUpRight, FileText, FileTextIcon } from 'lucide-react'; // Add missing icon imports

const DashboardRecentDocuments: React.FC = () => {
  const router = useRouter();
  
  const handleViewAll = () => {
    router.push('/documents');
  };

  return (
    <DashboardCard 
      title="Documentos Recentes" 
      actions={
        <Button variant="ghost" size="sm" onClick={handleViewAll} className="text-primary -mr-2">
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
  );
};

export default DashboardRecentDocuments;
