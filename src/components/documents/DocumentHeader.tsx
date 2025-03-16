
import React from 'react';
import { FilePlus, Scan, FileSignature } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DocumentScanner from '@/components/documents/DocumentScanner';
import SignatureCanvas from '@/components/documents/SignatureCanvas';

interface DocumentHeaderProps {
  onScannedDocument: (file: File) => void;
  onSignature: (signatureDataUrl: string) => void;
}

const DocumentHeader: React.FC<DocumentHeaderProps> = ({
  onScannedDocument,
  onSignature
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">Documentos</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie todos os seus documentos jurídicos
        </p>
      </div>
      <div className="flex mt-4 md:mt-0 space-x-2 flex-wrap gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <Scan size={16} className="mr-2" />
              Digitalizar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DocumentScanner onScan={onScannedDocument} />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center" variant="outline">
              <FileSignature size={16} className="mr-2" />
              Assinar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <SignatureCanvas onSave={onSignature} />
          </DialogContent>
        </Dialog>

        <Button className="flex items-center" variant="outline">
          <FilePlus size={16} className="mr-2" />
          Novo
        </Button>
      </div>
    </div>
  );
};

export default DocumentHeader;
