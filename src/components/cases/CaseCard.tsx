
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { LegalCase } from '@/types/case';

interface CaseCardProps {
  legalCase: LegalCase;
  onClick?: () => void;
}

const CaseCard: React.FC<CaseCardProps> = ({ legalCase, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-500 hover:bg-green-600';
      case 'closed':
        return 'bg-gray-500 hover:bg-gray-600';
      case 'pending':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'archived':
        return 'bg-blue-500 hover:bg-blue-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Aberto';
      case 'closed':
        return 'Fechado';
      case 'pending':
        return 'Pendente';
      case 'archived':
        return 'Arquivado';
      default:
        return status;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'Baixa';
      case 'medium':
        return 'Média';
      case 'high':
        return 'Alta';
      case 'urgent':
        return 'Urgente';
      default:
        return priority;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'civil':
        return 'Civil';
      case 'criminal':
        return 'Criminal';
      case 'labor':
        return 'Trabalhista';
      case 'tax':
        return 'Tributário';
      case 'corporate':
        return 'Corporativo';
      case 'other':
        return 'Outro';
      default:
        return type;
    }
  };

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer animate-fade-in"
      onClick={onClick}
    >
      <div className={`h-2 w-full ${getStatusColor(legalCase.status)}`} />
      <CardContent className="p-6">
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-lg line-clamp-1">{legalCase.title}</h3>
            <Badge variant="outline" className={`ml-2 ${getPriorityColor(legalCase.priority)}`}>
              {getPriorityText(legalCase.priority)}
            </Badge>
          </div>
          
          {legalCase.number && (
            <p className="text-sm text-muted-foreground">
              Processo nº {legalCase.number}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              {getTypeText(legalCase.type)}
            </Badge>
            <Badge variant="outline">
              {getStatusText(legalCase.status)}
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex flex-wrap gap-y-2 text-sm text-muted-foreground">
        <div className="flex items-center mr-4">
          <Calendar size={14} className="mr-1" />
          <span>
            {new Date(legalCase.startDate).toLocaleDateString('pt-BR')}
          </span>
        </div>
        
        {legalCase.nextHearing && (
          <div className="flex items-center mr-4">
            <Clock size={14} className="mr-1" />
            <span>
              Audiência em {formatDistanceToNow(new Date(legalCase.nextHearing), { addSuffix: true, locale: ptBR })}
            </span>
          </div>
        )}
        
        <div className="flex items-center">
          <User size={14} className="mr-1" />
          <span>{legalCase.client?.name || 'Cliente'}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CaseCard;
