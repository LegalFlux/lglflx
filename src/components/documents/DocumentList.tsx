
import React from 'react';
import { FileText } from 'lucide-react';
import DocumentCard from '@/components/documents/DocumentCard';
import { Document } from '@/types';

interface DocumentListProps {
  documents: Document[];
  onDownload: (document: Document) => void;
  onDelete: (document: Document) => void;
  onView: (document: Document) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onDownload,
  onDelete,
  onView
}) => {
  if (documents.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Nenhum documento encontrado</h3>
        <p className="mt-1 text-muted-foreground">
          Tente ajustar seus filtros ou pesquisa
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          onDownload={onDownload}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
};

export default DocumentList;
