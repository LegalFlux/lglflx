
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Trash2, 
  Calendar, 
  User, 
  ExternalLink 
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Document } from '@/types';

interface DocumentCardProps {
  document: Document;
  onDownload?: (document: Document) => void;
  onDelete?: (document: Document) => void;
  onView?: (document: Document) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ 
  document, 
  onDownload, 
  onDelete, 
  onView 
}) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case 'petition':
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m14 14-8.5 8.5a2.12 2.12 0 1 1-3-3L11 11"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/></svg>;
      case 'contract':
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M8 18v-1"/><path d="M16 18v-3"/></svg>;
      case 'evidence':
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>;
      case 'report':
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getDocumentTypeName = (type: string): string => {
    switch (type) {
      case 'petition':
        return 'Petição';
      case 'contract':
        return 'Contrato';
      case 'evidence':
        return 'Evidência';
      case 'report':
        return 'Relatório';
      default:
        return 'Documento';
    }
  };

  const getFileType = (filename: string): string => {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    return extension;
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-start">
          {/* Document icon/type indicator */}
          <div className={`p-3 rounded-md mr-4 ${
            document.type === 'petition' ? 'bg-blue-100 text-blue-800' : 
            document.type === 'contract' ? 'bg-purple-100 text-purple-800' : 
            document.type === 'evidence' ? 'bg-amber-100 text-amber-800' : 
            document.type === 'report' ? 'bg-green-100 text-green-800' : 
            'bg-gray-100 text-gray-800'
          }`}>
            {getDocumentTypeIcon(document.type)}
          </div>
          
          {/* Document details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-base line-clamp-1">{document.name}</h3>
            
            <div className="flex flex-wrap gap-2 mt-2 mb-2">
              <Badge variant="outline" className="text-xs">
                {getDocumentTypeName(document.type)}
              </Badge>
              <Badge variant="secondary" className="text-xs bg-secondary/40">
                {getFileType(document.name).toUpperCase()}
              </Badge>
              {document.size && (
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  {formatFileSize(document.size)}
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-2">
              <div className="flex items-center">
                <Calendar size={12} className="mr-1" />
                <span>
                  {formatDistanceToNow(new Date(document.uploadedAt), { addSuffix: true, locale: ptBR })}
                </span>
              </div>
              
              {document.uploadedBy && (
                <div className="flex items-center">
                  <User size={12} className="mr-1" />
                  <span>Dr. Paulo Carvalho</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-1 ml-2">
            {onView && (
              <Button variant="ghost" size="icon" onClick={() => onView(document)}>
                <ExternalLink size={16} />
              </Button>
            )}
            {onDownload && (
              <Button variant="ghost" size="icon" onClick={() => onDownload(document)}>
                <Download size={16} />
              </Button>
            )}
            {onDelete && (
              <Button variant="ghost" size="icon" className="text-destructive" onClick={() => onDelete(document)}>
                <Trash2 size={16} />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentCard;
