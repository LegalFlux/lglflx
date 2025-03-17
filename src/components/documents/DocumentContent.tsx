
import React from 'react';
import { FileText, LayoutTemplate } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentSearch from '@/components/documents/DocumentSearch';
import DocumentFilters from '@/components/documents/DocumentFilters';
import DocumentList from '@/components/documents/DocumentList';
import DocumentTemplatesList from '@/components/documents/DocumentTemplatesList';
import { Document } from '@/types';

interface DocumentContentProps {
  documents: Document[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: {
    types: string[];
  };
  documentTypes: string[];
  toggleTypeFilter: (type: string) => void;
  clearFilters: () => void;
  sortOrder: 'asc' | 'desc';
  toggleSortOrder: () => void;
  filteredDocuments: Document[];
  onDownload: (document: Document) => void;
  onDelete: (document: Document) => void;
  onView: (document: Document) => void;
  onUseTemplate: (templateName: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DocumentContent: React.FC<DocumentContentProps> = ({
  searchQuery,
  setSearchQuery,
  filters,
  documentTypes,
  toggleTypeFilter,
  clearFilters,
  sortOrder,
  toggleSortOrder,
  filteredDocuments,
  onDownload,
  onDelete,
  onView,
  onUseTemplate,
  activeTab,
  setActiveTab
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 w-full">
      <TabsList className="mb-4 w-full sm:w-auto">
        <TabsTrigger value="documentos" className="flex items-center">
          <FileText size={16} className="mr-2" />
          Documentos
        </TabsTrigger>
        <TabsTrigger value="templates" className="flex items-center">
          <LayoutTemplate size={16} className="mr-2" />
          Templates
        </TabsTrigger>
      </TabsList>

      <TabsContent value="documentos" className="space-y-6">
        {/* Search and filters */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
          <DocumentSearch 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
          
          <DocumentFilters 
            documentTypes={documentTypes}
            filters={filters}
            toggleTypeFilter={toggleTypeFilter}
            clearFilters={clearFilters}
            sortOrder={sortOrder}
            toggleSortOrder={toggleSortOrder}
          />
        </div>

        {/* Documents list */}
        <DocumentList 
          documents={filteredDocuments}
          onDownload={onDownload}
          onDelete={onDelete}
          onView={onView}
        />
      </TabsContent>

      <TabsContent value="templates" className="space-y-6">
        <DocumentTemplatesList
          onUseTemplate={onUseTemplate}
          onDownloadTemplate={onDownload}
        />
      </TabsContent>
    </Tabs>
  );
};

export default DocumentContent;
