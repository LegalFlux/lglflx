
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Edit, Copy } from 'lucide-react';

interface DocumentTemplateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  onUse?: () => void;
  onDownload?: () => void;
  onEdit?: () => void;
}

const DocumentTemplateCard: React.FC<DocumentTemplateProps> = ({
  title,
  description,
  icon = <FileText size={24} />,
  onUse,
  onDownload,
  onEdit
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <div className="p-3 rounded-full bg-primary/10 text-primary mb-3">
            {icon}
          </div>
          <h3 className="font-medium text-base">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 flex justify-center gap-2">
        <Button variant="outline" size="sm" onClick={onUse}>
          <Copy size={14} className="mr-1" /> 
          Usar
        </Button>
        <Button variant="outline" size="sm" onClick={onDownload}>
          <Download size={14} className="mr-1" /> 
          Baixar
        </Button>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Edit size={14} /> 
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DocumentTemplateCard;
