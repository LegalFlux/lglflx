import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Client } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ClientCardProps {
  client: Client;
  onClick?: () => void;
}

const ClientCard: React.FC<ClientCardProps> = ({ client, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'prospect':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'inactive':
        return 'Inativo';
      case 'prospect':
        return 'Prospecto';
      default:
        return status;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer animate-fade-in"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-12 w-12 border border-border">
            <AvatarImage src={client.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(client.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-lg line-clamp-1">{client.name}</h3>
              <Badge className={getStatusColor(client.status)}>
                {getStatusText(client.status)}
              </Badge>
            </div>
            
            <Badge variant="outline" className="mt-1">
              {client.type === 'individual' ? 'Pessoa Física' : 'Pessoa Jurídica'}
            </Badge>
            
            <div className="mt-3 space-y-1">
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail size={14} className="mr-2" />
                <span className="truncate">{client.email}</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone size={14} className="mr-2" />
                <span>{client.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 border-t border-border mt-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Calendar size={14} className="mr-2" />
          <span>
            Cliente desde {formatDistanceToNow(new Date(client.createdAt), { addSuffix: true, locale: ptBR })}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ClientCard;
