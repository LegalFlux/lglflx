import React, { useState, useRef, useEffect } from 'react';
import { mockDocuments } from '@/data';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

// Importar ícones de lucide-react
import { 
  Search, 
  SortAsc, 
  SortDesc, 
  Download, 
  Trash2, 
  Eye, 
  Edit, 
  FileSignature, 
  Clock, 
  CheckCircle,
  FileText, 
  Upload, 
  // Scanner não existe no lucide-react, substituindo por Scan
  Scan, 
  FolderPlus, 
  Plus, 
  ChevronDown,
  Save, 
  Users, 
  History, 
  Lock, 
  Unlock, 
  Share2, 
  CheckSquare,
  TrendingUp, 
  ArrowUpRight 
} from 'lucide-react';

// Definição dos tipos
interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  content: string;
  createdAt: string;
  createdBy: string;
  comment: string;
}

interface DocumentCollaborator {
  userId: string;
  name: string;
  email: string;
  role: 'editor' | 'viewer' | 'owner';
  addedAt: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  path: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  tags: string[];
  // Campos adicionais para gestão avançada
  currentVersion?: number;
  versions?: DocumentVersion[];
  collaborators?: DocumentCollaborator[];
  isTemplate?: boolean;
  templateCategory?: string;
  lastModifiedAt?: string;
  lastModifiedBy?: string;
  status?: 'draft' | 'review' | 'final' | 'signed';
  signedBy?: string[];
  signatureDate?: string;
  expiryDate?: string;
  isLocked?: boolean;
}

// Dados de exemplo para versões
const mockVersions: DocumentVersion[] = [
  {
    id: '1',
    documentId: '1',
    version: 1,
    content: 'Conteúdo inicial do documento',
    createdAt: '2025-03-20T10:00:00Z',
    createdBy: 'João Silva',
    comment: 'Versão inicial'
  },
  {
    id: '2',
    documentId: '1',
    version: 2,
    content: 'Conteúdo atualizado com correções',
    createdAt: '2025-03-21T14:30:00Z',
    createdBy: 'Maria Oliveira',
    comment: 'Correções ortográficas'
  },
  {
    id: '3',
    documentId: '1',
    version: 3,
    content: 'Conteúdo final com revisão legal',
    createdAt: '2025-03-22T09:15:00Z',
    createdBy: 'Carlos Santos',
    comment: 'Revisão legal completa'
  }
];

// Dados de exemplo para colaboradores
const mockCollaborators: DocumentCollaborator[] = [
  {
    userId: '1',
    name: 'João Silva',
    email: 'joao.silva@exemplo.com',
    role: 'owner',
    addedAt: '2025-03-20T10:00:00Z'
  },
  {
    userId: '2',
    name: 'Maria Oliveira',
    email: 'maria.oliveira@exemplo.com',
    role: 'editor',
    addedAt: '2025-03-20T10:05:00Z'
  },
  {
    userId: '3',
    name: 'Carlos Santos',
    email: 'carlos.santos@exemplo.com',
    role: 'viewer',
    addedAt: '2025-03-21T14:00:00Z'
  }
];

// Componente DocumentEditor
const DocumentEditor = ({ document, onSave, onAddCollaborator, onClose }) => {
  const [content, setContent] = useState('');
  const [comment, setComment] = useState('');
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState('');
  const [newCollaboratorRole, setNewCollaboratorRole] = useState('viewer');
  const [activeUsers, setActiveUsers] = useState(['João Silva', 'Maria Oliveira']);
  const [activeTab, setActiveTab] = useState('editor');

  useEffect(() => {
    // Simulação: carregar conteúdo do documento
    setContent(`# ${document.name}\n\nConteúdo do documento...\n\n`);
    
    // Simulação: verificar usuários ativos
    const interval = setInterval(() => {
      // Em uma implementação real, isso seria uma conexão WebSocket
    }, 5000);
    
    return () => clearInterval(interval);
  }, [document]);

  const handleSave = () => {
    onSave(content, comment);
    setComment('');
    toast({
      title: "Documento salvo",
      description: "Uma nova versão do documento foi criada.",
    });
  };

  const handleAddCollaborator = () => {
    if (!newCollaboratorEmail) return;
    
    onAddCollaborator(newCollaboratorEmail, newCollaboratorRole);
    setNewCollaboratorEmail('');
    toast({
      title: "Colaborador adicionado",
      description: `${newCollaboratorEmail} foi adicionado como ${newCollaboratorRole}.`,
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 p-2 border-b">
        <div className="flex items-center">
          <FileText className="mr-2" />
          <h2 className="text-xl font-semibold">{document.name}</h2>
          {document.isLocked && <Lock className="ml-2 text-red-500" size={16} />}
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {activeUsers.map((user, i) => (
              <Avatar key={i} className="border-2 border-background w-8 h-8">
                <AvatarFallback>{user.substring(0, 2)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>Fechar</Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Salvar
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="versions">Versões</TabsTrigger>
          <TabsTrigger value="collaborators">Colaboradores</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor" className="flex-1">
          <div className="flex flex-col h-full">
            <Textarea 
              value={content} 
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 font-mono resize-none min-h-[500px] p-4"
              placeholder="Digite o conteúdo do documento aqui..."
            />
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Comentário da versão:</p>
              <Textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Descreva as alterações feitas nesta versão..."
                className="h-20"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="versions">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Histórico de versões</h3>
            {document.versions?.map((version) => (
              <div key={version.id} className="border rounded-md p-3 hover:bg-muted/50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Versão {version.version}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(version.createdAt).toLocaleString()} por {version.createdBy}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Visualizar</Button>
                    <Button variant="outline" size="sm">Restaurar</Button>
                  </div>
                </div>
                {version.comment && (
                  <p className="mt-2 text-sm border-t pt-2">{version.comment}</p>
                )}
              </div>
            ))}
            {!document.versions?.length && (
              <p className="text-muted-foreground">Nenhuma versão anterior disponível.</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="collaborators">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Colaboradores</h3>
            
            <div className="border rounded-md p-4">
              <h4 className="font-medium mb-2">Adicionar colaborador</h4>
              <div className="flex space-x-2">
                <Input 
                  value={newCollaboratorEmail}
                  onChange={(e) => setNewCollaboratorEmail(e.target.value)}
                  placeholder="Email do colaborador"
                  className="flex-1"
                />
                <select 
                  value={newCollaboratorRole}
                  onChange={(e) => setNewCollaboratorRole(e.target.value)}
                  className="border rounded-md px-3"
                >
                  <option value="viewer">Visualizador</option>
                  <option value="editor">Editor</option>
                </select>
                <Button onClick={handleAddCollaborator}>Adicionar</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              {document.collaborators?.map((collaborator) => (
                <div key={collaborator.userId} className="flex justify-between items-center border rounded-md p-3">
                  <div className="flex items-center">
                    <Avatar className="mr-2 h-8 w-8">
                      <AvatarFallback>{collaborator.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{collaborator.name}</p>
                      <p className="text-sm text-muted-foreground">{collaborator.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">
                      {collaborator.role === 'owner' ? 'Proprietário' : 
                       collaborator.role === 'editor' ? 'Editor' : 'Visualizador'}
                    </span>
                    {collaborator.role !== 'owner' && (
                      <Button variant="ghost" size="sm">Remover</Button>
                    )}
                  </div>
                </div>
              ))}
              {!document.collaborators?.length && (
                <p className="text-muted-foreground">Nenhum colaborador adicionado.</p>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Componente TemplateManager
const TemplateManager = ({ templates, onUseTemplate, onCreateTemplate, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateCategory, setNewTemplateCategory] = useState('');
  const [activeTab, setActiveTab] = useState('browse');
  
  // Get all template categories
  const categories = Array.from(new Set(templates.map(t => t.templateCategory || 'Geral')));
  
  // Filter templates based on search query
  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleCreateTemplate = () => {
    if (!newTemplateName) return;
    
    onCreateTemplate(newTemplateName, newTemplateCategory || 'Geral');
    setNewTemplateName('');
    setNewTemplateCategory('');
    toast({
      title: "Modelo criado",
      description: `O modelo "${newTemplateName}" foi criado com sucesso.`,
    });
  };
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Modelos de Documentos</h2>
        <Button variant="ghost" onClick={onClose}>Fechar</Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="browse">Explorar Modelos</TabsTrigger>
          <TabsTrigger value="create">Criar Modelo</TabsTrigger>
        </TabsList>
        
        <TabsContent value="browse">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar modelos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(category => (
              <div key={category} className="space-y-3">
                <h3 className="font-medium text-lg">{category}</h3>
                {filteredTemplates
                  .filter(t => (t.templateCategory || 'Geral') === category)
                  .map(template => (
                    <div 
                      key={template.id} 
                      className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer"
                      onClick={() => onUseTemplate(template.id)}
                    >
                      <div className="flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">{template.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Criado em {new Date(template.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                {filteredTemplates.filter(t => (t.templateCategory || 'Geral') === category).length === 0 && (
                  <p className="text-sm text-muted-foreground">Nenhum modelo nesta categoria.</p>
                )}
              </div>
            ))}
          </div>
          
          {filteredTemplates.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhum modelo encontrado.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="create">
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium mb-1">Nome do Modelo</label>
              <Input
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
                placeholder="Ex: Contrato de Prestação de Serviços"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Categoria</label>
              <Input
                value={newTemplateCategory}
                onChange={(e) => setNewTemplateCategory(e.target.value)}
                placeholder="Ex: Contratos, Petições, etc."
              />
            </div>
            
            <Button onClick={handleCreateTemplate}>
              <FolderPlus className="mr-2 h-4 w-4" />
              Criar Modelo
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Componente SignaturePanel
const SignaturePanel = ({ document, onSignDocument, onRequestSignature, onClose }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('draw');
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set drawing style
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';
  }, []);
  
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };
  
  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  
  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL('image/png');
    onSignDocument(dataUrl);
    
    toast({
      title: "Documento assinado",
      description: "Sua assinatura foi aplicada ao documento.",
    });
  };
  
  const handleRequestSignature = () => {
    if (!recipientEmail) return;
    
    onRequestSignature(recipientEmail, message);
    
    toast({
      title: "Solicitação enviada",
      description: `Solicitação de assinatura enviada para ${recipientEmail}.`,
    });
    
    setRecipientEmail('');
    setMessage('');
  };
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Assinatura Digital</h2>
        <Button variant="ghost" onClick={onClose}>Fechar</Button>
      </div>
      
      <div className="flex space-x-4 mb-4">
        <Button 
          variant={activeTab === 'draw' ? 'default' : 'outline'}
          onClick={() => setActiveTab('draw')}
        >
          Assinar Documento
        </Button>
        <Button 
          variant={activeTab === 'request' ? 'default' : 'outline'}
          onClick={() => setActiveTab('request')}
        >
          Solicitar Assinatura
        </Button>
      </div>
      
      {activeTab === 'draw' && (
        <div>
          <p className="mb-2 text-sm text-muted-foreground">
            Desenhe sua assinatura abaixo:
          </p>
          
          <div className="border rounded-md p-1 bg-white mb-4">
            <canvas
              ref={canvasRef}
              width={600}
              height={200}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="w-full cursor-crosshair"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={clearCanvas}>
              <Trash2 className="mr-2 h-4 w-4" />
              Limpar
            </Button>
            <Button onClick={saveSignature}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Assinar Documento
            </Button>
          </div>
        </div>
      )}
      
      {activeTab === 'request' && (
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium mb-1">Email do Destinatário</label>
            <Input
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="email@exemplo.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Mensagem (opcional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Por favor, assine este documento..."
              className="w-full border rounded-md p-2 h-24"
            />
          </div>
          
          <Button onClick={handleRequestSignature}>
            <FileSignature className="mr-2 h-4 w-4" />
            Solicitar Assinatura
          </Button>
        </div>
      )}
    </div>
  );
};

// Componente DocumentHeader
const DocumentHeader = ({ onScannedDocument, onSignature, onOpenTemplates }) => {
  const fileInputRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    onScannedDocument(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Documentos</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie todos os documentos do seu escritório
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-2">
          <div className="relative">
            <Button onClick={() => setShowDropdown(!showDropdown)}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Documento
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-background border rounded-md shadow-lg z-10">
                <div className="p-1">
                  <button
                    className="flex w-full items-center px-3 py-2 text-sm rounded-md hover:bg-muted"
                    onClick={handleUploadClick}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Carregar Arquivo
                  </button>
                  <button
                    className="flex w-full items-center px-3 py-2 text-sm rounded-md hover:bg-muted"
                    onClick={handleUploadClick}
                  >
                    <Scan className="mr-2 h-4 w-4" />
                    Digitalizar Documento
                  </button>
                  <button
                    className="flex w-full items-center px-3 py-2 text-sm rounded-md hover:bg-muted"
                    onClick={onOpenTemplates}
                  >
                    <FolderPlus className="mr-2 h-4 w-4" />
                    Usar Modelo
                  </button>
                  <button
                    className="flex w-full items-center px-3 py-2 text-sm rounded-md hover:bg-muted"
                    onClick={() => {
                      setShowDropdown(false);
                      toast({
                        title: "Novo documento",
                        description: "Criando novo documento em branco...",
                      });
                    }}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Documento em Branco
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-primary/10 rounded-lg p-4 flex items-center">
          <div className="bg-primary/20 rounded-full p-3 mr-4">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Documentos Totais</h3>
            <p className="text-2xl font-bold">248</p>
          </div>
        </div>
        
        <div className="bg-yellow-500/10 rounded-lg p-4 flex items-center">
          <div className="bg-yellow-500/20 rounded-full p-3 mr-4">
            <FileSignature className="h-6 w-6 text-yellow-500" />
          </div>
          <div>
            <h3 className="font-medium">Pendentes de Assinatura</h3>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
        
        <div className="bg-green-500/10 rounded-lg p-4 flex items-center">
          <div className="bg-green-500/20 rounded-full p-3 mr-4">
            <FolderPlus className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <h3 className="font-medium">Modelos Disponíveis</h3>
            <p className="text-2xl font-bold">24</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente DocumentContent
const DocumentContent = ({
  documents,
  searchQuery,
  setSearchQuery,
  filters,
  documentTypes,
  documentStatuses,
  toggleTypeFilter,
  setStatusFilter,
  clearFilters,
  sortOrder,
  toggleSortOrder,
  filteredDocuments,
  onDownload,
  onDelete,
  onView,
  onEdit,
  onSign,
  activeTab,
  setActiveTab
}) => {
  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500">Rascunho</Badge>;
      case 'review':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">Em Revisão</Badge>;
      case 'final':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500">Final</Badge>;
      case 'signed':
        return <Badge variant="outline" className="bg-purple-500/10 text-purple-500">Assinado</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar documentos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center space-x-1">
            <span className="text-sm font-medium">Tipo:</span>
            {documentTypes.map((type) => (
              <Button
                key={type}
                variant={filters.types.includes(type) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleTypeFilter(type)}
                className="text-xs"
              >
                {type}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center space-x-1">
            <span className="text-sm font-medium">Status:</span>
            <Button
              variant={!filters.status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(undefined)}
              className="text-xs"
            >
              Todos
            </Button>
            {documentStatuses.map((status) => (
              <Button
                key={status}
                variant={filters.status === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="text-xs"
              >
                {status === 'draft' ? 'Rascunho' : 
                 status === 'review' ? 'Em Revisão' : 
                 status === 'final' ? 'Final' : 'Assinado'}
              </Button>
            ))}
          </div>
          
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Limpar Filtros
          </Button>
          
          <Button variant="outline" size="sm" onClick={toggleSortOrder}>
            {sortOrder === 'asc' ? (
              <SortAsc className="h-4 w-4" />
            ) : (
              <SortDesc className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="templates">Modelos</TabsTrigger>
          <TabsTrigger value="assinaturas">Pendentes de Assinatura</TabsTrigger>
        </TabsList>
        
        <TabsContent value="documentos">
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium">Nome</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Tipo</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Tamanho</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Última Modificação</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredDocuments.filter(doc => !doc.isTemplate).map((document) => (
                    <tr key={document.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <FileText className="mr-2 h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium">{document.name}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {document.tags.map((tag, i) => (
                                <span key={i} className="text-xs bg-muted px-1.5 py-0.5 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{document.type}</td>
                      <td className="px-4 py-3 text-sm">
                        {getStatusBadge(document.status)}
                      </td>
                      <td className="px-4 py-3 text-sm">{formatFileSize(document.size)}</td>
                      <td className="px-4 py-3 text-sm">
                        <div>
                          <p>{formatDate(document.lastModifiedAt || document.uploadedAt)}</p>
                          <p className="text-xs text-muted-foreground">
                            por {document.lastModifiedBy || 'Desconhecido'}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon" onClick={() => onView(document)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => onEdit(document)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => onSign(document)}>
                            <FileSignature className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => onDownload(document)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => onDelete(document)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredDocuments.filter(doc => !doc.isTemplate).length === 0 && (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">Nenhum documento encontrado.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="templates">
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium">Nome</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Categoria</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Última Modificação</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredDocuments.filter(doc => doc.isTemplate).map((template) => (
                    <tr key={template.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <FileText className="mr-2 h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium">{template.name}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {template.tags.map((tag, i) => (
                                <span key={i} className="text-xs bg-muted px-1.5 py-0.5 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{template.templateCategory || 'Geral'}</td>
                      <td className="px-4 py-3 text-sm">
                        <div>
                          <p>{formatDate(template.lastModifiedAt || template.uploadedAt)}</p>
                          <p className="text-xs text-muted-foreground">
                            por {template.lastModifiedBy || 'Desconhecido'}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon" onClick={() => onView(template)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => onEdit(template)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => onDelete(template)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredDocuments.filter(doc => doc.isTemplate).length === 0 && (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">Nenhum modelo encontrado.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="assinaturas">
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium">Nome</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Solicitado por</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Data</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredDocuments
                    .filter(doc => doc.status === 'review')
                    .map((document) => (
                      <tr key={document.id} className="hover:bg-muted/30">
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <FileText className="mr-2 h-5 w-5 text-yellow-500" />
                            <div>
                              <p className="font-medium">{document.name}</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {document.tags.map((tag, i) => (
                                  <span key={i} className="text-xs bg-muted px-1.5 py-0.5 rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4 text-yellow-500" />
                            <span>Aguardando Assinatura</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{document.lastModifiedBy || 'Desconhecido'}</td>
                        <td className="px-4 py-3 text-sm">{formatDate(document.lastModifiedAt || document.uploadedAt)}</td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" onClick={() => onView(document)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => onSign(document)}>
                              <FileSignature className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            
            {filteredDocuments.filter(doc => doc.status === 'review').length === 0 && (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">Nenhum documento pendente de assinatura.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Componente principal Documents
const Documents = () => {
  // Adicionar dados de exemplo aos documentos
  const enhancedMockDocuments = mockDocuments.map(doc => ({
    ...doc,
    currentVersion: 3,
    versions: mockVersions.filter(v => v.documentId === doc.id),
    collaborators: mockCollaborators,
    isTemplate: doc.id === '5' || doc.id === '8',
    templateCategory: doc.id === '5' ? 'Contratos' : doc.id === '8' ? 'Petições' : undefined,
    lastModifiedAt: '2025-03-22T09:15:00Z',
    lastModifiedBy: 'Carlos Santos',
    status: doc.id === '2' ? 'signed' : doc.id === '3' ? 'review' : 'draft',
    signedBy: doc.id === '2' ? ['João Silva', 'Maria Oliveira'] : undefined,
    signatureDate: doc.id === '2' ? '2025-03-22T15:30:00Z' : undefined,
    isLocked: doc.id === '2'
  }));

  const [documents, setDocuments] = useState(enhancedMockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    types: [],
    status: undefined
  });
  const [sortOrder, setSortOrder] = useState('desc');
  const [activeTab, setActiveTab] = useState('documentos');
  
  // Estado para controlar modais e painéis
  const [editingDocument, setEditingDocument] = useState(null);
  const [showTemplateManager, setShowTemplateManager] = useState(false);
  const [signingDocument, setSigningDocument] = useState(null);
  
  // Get all document types for filter
  const documentTypes = Array.from(new Set(documents.map(doc => doc.type)));
  
  // Get all document statuses for filter
  const documentStatuses = ['draft', 'review', 'final', 'signed'];
  
  // Get templates
  const templates = documents.filter(doc => doc.isTemplate);

  // Filter documents based on search query and filters
  const filteredDocuments = documents.filter(doc => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Type filter
    const matchesType = filters.types.length === 0 || 
      filters.types.includes(doc.type);
    
    // Status filter
    const matchesStatus = !filters.status || 
      doc.status === filters.status;
    
    // Template filter (only in documents tab)
    const matchesTemplate = activeTab === 'templates' ? 
      doc.isTemplate : 
      activeTab === 'documentos' ? !doc.isTemplate : true;
    
    return matchesSearch && matchesType && matchesStatus && matchesTemplate;
  }).sort((a, b) => {
    // Sort by upload date or last modified date
    const dateA = new Date(a.lastModifiedAt || a.uploadedAt).getTime();
    const dateB = new Date(b.lastModifiedAt || b.uploadedAt).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Toggle document type filter
  const toggleTypeFilter = (type) => {
    setFilters(prev => {
      const newTypes = prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type];
      
      return { ...prev, types: newTypes };
    });
  };
  
  // Set status filter
  const setStatusFilter = (status) => {
    setFilters(prev => ({ ...prev, status }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({ types: [], status: undefined });
    setSearchQuery('');
  };

  // Handle document actions
  const handleDownload = (document) => {
    toast({
      title: "Download iniciado",
      description: `${document.name} será baixado em breve.`,
    });
  };

  const handleDelete = (document) => {
    toast({
      title: "Documento removido",
      description: `${document.name} foi removido com sucesso.`,
      variant: "destructive",
    });
    setDocuments(docs => docs.filter(d => d.id !== document.id));
  };

  const handleView = (document) => {
    setEditingDocument(document);
  };
  
  const handleEdit = (document) => {
    if (document.isLocked) {
      toast({
        title: "Documento bloqueado",
        description: "Este documento está assinado e não pode ser editado.",
        variant: "destructive",
      });
      return;
    }
    
    setEditingDocument(document);
  };
  
  const handleSign = (document) => {
    setSigningDocument(document);
  };

  // Handle scanned document
  const handleScannedDocument = (file) => {
    // Create a new document from the scanned file
    const newDoc = {
      id: (documents.length + 1).toString(),
      name: file.name,
      type: 'evidence',
      path: URL.createObjectURL(file),
      size: file.size,
      uploadedBy: '1',
      uploadedAt: new Date().toISOString(),
      tags: ['digitalizado', 'evidência'],
      currentVersion: 1,
      status: 'draft',
      lastModifiedAt: new Date().toISOString(),
      lastModifiedBy: 'João Silva',
    };

    setDocuments(prev => [newDoc, ...prev]);
    
    toast({
      title: "Documento digitalizado",
      description: "O documento foi digitalizado e adicionado com sucesso.",
    });
  };

  // Handle signature
  const handleSignature = (signatureDataUrl) => {
    // Create a new document from the signature
    const newDoc = {
      id: (documents.length + 1).toString(),
      name: `Assinatura_${new Date().toLocaleDateString().replace(/\//g, '-')}.png`,
      type: 'evidence',
      path: signatureDataUrl,
      size: Math.round(signatureDataUrl.length * 0.75), // Approximate size
      uploadedBy: '1',
      uploadedAt: new Date().toISOString(),
      tags: ['assinatura', 'documento oficial'],
      currentVersion: 1,
      status: 'final',
      lastModifiedAt: new Date().toISOString(),
      lastModifiedBy: 'João Silva',
    };

    setDocuments(prev => [newDoc, ...prev]);
    
    toast({
      title: "Assinatura salva",
      description: "A assinatura foi salva e adicionada aos documentos.",
    });
  };

  // Handle document editor save
  const handleSaveDocument = (content, comment) => {
    if (!editingDocument) return;
    
    const now = new Date().toISOString();
    const newVersion = (editingDocument.currentVersion || 0) + 1;
    
    // Create new version
    const newVersionObj = {
      id: `${editingDocument.id}_v${newVersion}`,
      documentId: editingDocument.id,
      version: newVersion,
      content,
      createdAt: now,
      createdBy: 'João Silva', // In a real app, this would be the current user
      comment
    };
    
    // Update document
    setDocuments(docs => docs.map(doc => 
      doc.id === editingDocument.id 
        ? {
            ...doc,
            currentVersion: newVersion,
            versions: [...(doc.versions || []), newVersionObj],
            lastModifiedAt: now,
            lastModifiedBy: 'João Silva', // In a real app, this would be the current user
          }
        : doc
    ));
  };
  
  // Handle adding collaborator
  const handleAddCollaborator = (email, role) => {
    if (!editingDocument) return;
    
    const now = new Date().toISOString();
    const newCollaborator = {
      userId: `temp_${Date.now()}`, // In a real app, this would be a real user ID
      name: email.split('@')[0], // Simplified for demo
      email,
      role,
      addedAt: now
    };
    
    // Update document
    setDocuments(docs => docs.map(doc => 
      doc.id === editingDocument.id 
        ? {
            ...doc,
            collaborators: [...(doc.collaborators || []), newCollaborator]
          }
        : doc
    ));
  };
  
  // Handle template usage
  const handleUseTemplate = (templateId) => {
    const template = documents.find(doc => doc.id === templateId);
    if (!template) return;
    
    const now = new Date().toISOString();
    
    // Create new document from template
    const newDoc = {
      id: (documents.length + 1).toString(),
      name: `${template.name} - Cópia`,
      type: template.type,
      path: template.path,
      size: template.size,
      uploadedBy: '1',
      uploadedAt: now,
      tags: [...template.tags, 'baseado em modelo'],
      currentVersion: 1,
      status: 'draft',
      lastModifiedAt: now,
      lastModifiedBy: 'João Silva',
    };
    
    setDocuments(prev => [newDoc, ...prev]);
    setShowTemplateManager(false);
    
    toast({
      title: "Modelo utilizado",
      description: `Um novo documento foi criado a partir do modelo "${template.name}".`,
    });
    
    // Open the new document for editing
    setEditingDocument(newDoc);
  };
  
  // Handle creating a new template
  const handleCreateTemplate = (name, category) => {
    const now = new Date().toISOString();
    
    // Create new template
    const newTemplate = {
      id: (documents.length + 1).toString(),
      name,
      type: 'template',
      path: '', // In a real app, this would be a path to the template content
      size: 0,
      uploadedBy: '1',
      uploadedAt: now,
      tags: ['modelo', category.toLowerCase()],
      isTemplate: true,
      templateCategory: category,
      currentVersion: 1,
      status: 'draft',
      lastModifiedAt: now,
      lastModifiedBy: 'João Silva',
    };
    
    setDocuments(prev => [newTemplate, ...prev]);
    
    // Open the new template for editing
    setEditingDocument(newTemplate);
    setShowTemplateManager(false);
  };
  
  // Handle signing a document
  const handleSignDocument = (signatureDataUrl) => {
    if (!signingDocument) return;
    
    const now = new Date().toISOString();
    
    // Update document
    setDocuments(docs => docs.map(doc => 
      doc.id === signingDocument.id 
        ? {
            ...doc,
            status: 'signed',
            signedBy: [...(doc.signedBy || []), 'João Silva'], // In a real app, this would be the current user
            signatureDate: now,
            isLocked: true
          }
        : doc
    ));
    
    setSigningDocument(null);
  };
  
  // Handle requesting signature
  const handleRequestSignature = (email, message) => {
    if (!signingDocument) return;
    
    // In a real app, this would send an email to the recipient
    toast({
      title: "Solicitação enviada",
      description: `Solicitação de assinatura enviada para ${email}.`,
    });
    
    setSigningDocument(null);
  };

  return (
    <div className="min-h-screen bg-background pt-16 animate-fade-in">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <DocumentHeader 
          onScannedDocument={handleScannedDocument} 
          onSignature={handleSignature}
          onOpenTemplates={() => setShowTemplateManager(true)}
        />

        <DocumentContent
          documents={documents}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          documentTypes={documentTypes}
          documentStatuses={documentStatuses}
          toggleTypeFilter={toggleTypeFilter}
          setStatusFilter={setStatusFilter}
          clearFilters={clearFilters}
          sortOrder={sortOrder}
          toggleSortOrder={toggleSortOrder}
          filteredDocuments={filteredDocuments}
          onDownload={handleDownload}
          onDelete={handleDelete}
          onView={handleView}
          onEdit={handleEdit}
          onSign={handleSign}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        {/* Document Editor Modal */}
        {editingDocument && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-auto">
              <DocumentEditor 
                document={editingDocument}
                onSave={handleSaveDocument}
                onAddCollaborator={handleAddCollaborator}
                onClose={() => setEditingDocument(null)}
              />
            </div>
          </div>
        )}
        
        {/* Template Manager Modal */}
        {showTemplateManager && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
              <TemplateManager 
                templates={templates}
                onUseTemplate={handleUseTemplate}
                onCreateTemplate={handleCreateTemplate}
                onClose={() => setShowTemplateManager(false)}
              />
            </div>
          </div>
        )}
        
        {/* Signature Panel Modal */}
        {signingDocument && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-auto">
              <SignaturePanel 
                document={signingDocument}
                onSignDocument={handleSignDocument}
                onRequestSignature={handleRequestSignature}
                onClose={() => setSigningDocument(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
