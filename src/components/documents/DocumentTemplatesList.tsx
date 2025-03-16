
import React from 'react';
import { FilePlus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import DocumentTemplateCard from '@/components/documents/DocumentTemplateCard';
import { Document } from '@/types';

interface DocumentTemplatesListProps {
  onUseTemplate: (templateName: string) => void;
  onDownloadTemplate: (document: Document) => void;
}

const DocumentTemplatesList: React.FC<DocumentTemplatesListProps> = ({
  onUseTemplate,
  onDownloadTemplate
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <DocumentTemplateCard
        title="Procuração"
        description="Modelo de procuração geral para representação jurídica"
        onUse={() => onUseTemplate("Procuração")}
        onDownload={() => onDownloadTemplate({
          id: 'template-1',
          name: 'Procuração_Template.docx',
          type: 'contract',
          path: '/templates/procuracao.docx',
          size: 245000,
          uploadedBy: '1',
          uploadedAt: new Date().toISOString(),
        })}
        onEdit={() => {}}
      />
      
      <DocumentTemplateCard
        title="Contrato de Prestação de Serviços"
        description="Modelo padrão para contratação de serviços advocatícios"
        onUse={() => onUseTemplate("Contrato de Prestação de Serviços")}
        onDownload={() => onDownloadTemplate({
          id: 'template-2',
          name: 'Contrato_Prestacao_Servicos.docx',
          type: 'contract',
          path: '/templates/contrato.docx',
          size: 320000,
          uploadedBy: '1',
          uploadedAt: new Date().toISOString(),
        })}
        onEdit={() => {}}
      />
      
      <DocumentTemplateCard
        title="Petição Inicial"
        description="Modelo de petição inicial para processos cíveis"
        onUse={() => onUseTemplate("Petição Inicial")}
        onDownload={() => onDownloadTemplate({
          id: 'template-3',
          name: 'Peticao_Inicial.docx',
          type: 'petition',
          path: '/templates/peticao.docx',
          size: 280000,
          uploadedBy: '1',
          uploadedAt: new Date().toISOString(),
        })}
        onEdit={() => {}}
      />
      
      <DocumentTemplateCard
        title="Contestação"
        description="Modelo de contestação para processos cíveis"
        onUse={() => onUseTemplate("Contestação")}
        onDownload={() => onDownloadTemplate({
          id: 'template-4',
          name: 'Contestacao.docx',
          type: 'petition',
          path: '/templates/contestacao.docx',
          size: 310000,
          uploadedBy: '1',
          uploadedAt: new Date().toISOString(),
        })}
        onEdit={() => {}}
      />
      
      <DocumentTemplateCard
        title="Recurso"
        description="Modelo de recurso para instâncias superiores"
        onUse={() => onUseTemplate("Recurso")}
        onDownload={() => onDownloadTemplate({
          id: 'template-5',
          name: 'Recurso.docx',
          type: 'petition',
          path: '/templates/recurso.docx',
          size: 295000,
          uploadedBy: '1',
          uploadedAt: new Date().toISOString(),
        })}
        onEdit={() => {}}
      />
      
      <Card className="border-dashed border-2 rounded-md p-4 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors cursor-pointer h-full">
        <div className="flex flex-col items-center text-center">
          <div className="p-3 mb-2">
            <FilePlus size={24} />
          </div>
          <span className="text-sm font-medium">Adicionar template</span>
        </div>
      </Card>
    </div>
  );
};

export default DocumentTemplatesList;
