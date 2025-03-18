
import React from 'react';
import { useSubscription } from '@/hooks/use-subscription';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

const UserSubscription: React.FC = () => {
  const { assinaturaAtual, loading, cancelarAssinatura } = useSubscription();

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 flex items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          <span className="ml-2">A carregar informações da subscrição...</span>
        </CardContent>
      </Card>
    );
  }

  if (!assinaturaAtual) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sem Subscrição Ativa</CardTitle>
          <CardDescription>
            Não possui nenhuma subscrição ativa no momento.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center p-4 bg-muted rounded-lg">
            <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
            <p>Subscreva um plano para aceder a todos os recursos da plataforma.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="default" className="w-full">
            Ver Planos Disponíveis
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const { plano, data_inicio, data_fim, estado, periodo_faturacao, trial, diasRestantes, percentualRestante } = assinaturaAtual;

  const dataInicio = data_inicio ? format(new Date(data_inicio), 'dd/MM/yyyy', { locale: pt }) : 'N/A';
  const dataFim = data_fim ? format(new Date(data_fim), 'dd/MM/yyyy', { locale: pt }) : 'N/A';
  
  const getStatusIcon = () => {
    if (estado === 'ativa' || estado === 'trial') {
      return <CheckCircle className="h-5 w-5 text-green-500 mr-2" />;
    }
    return <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />;
  };

  const getStatusText = () => {
    switch (estado) {
      case 'ativa':
        return 'Ativa';
      case 'trial':
        return 'Período de Teste';
      case 'pendente':
        return 'Pendente';
      case 'cancelada':
        return 'Cancelada';
      case 'expirada':
        return 'Expirada';
      default:
        return estado;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscrição Atual</CardTitle>
        <CardDescription>
          Detalhes da sua subscrição
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Plano</h4>
            <p className="text-lg font-bold">{plano.nome}</p>
            <p className="text-sm text-muted-foreground">{plano.descricao}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Estado</h4>
            <div className="flex items-center">
              {getStatusIcon()}
              <span className="font-medium">{getStatusText()}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {trial ? 'Período de teste gratuito' : `Faturação ${periodo_faturacao === 'mensal' ? 'mensal' : 'anual'}`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Data de Início</h4>
            <p>{dataInicio}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Data de Término</h4>
            <p>{dataFim}</p>
          </div>
        </div>

        {(estado === 'ativa' || estado === 'trial') && data_fim && (
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium">Tempo Restante</h4>
              <span className="text-sm">{diasRestantes} dias</span>
            </div>
            <Progress value={percentualRestante || 0} className="h-2" />
          </div>
        )}

        <div className="space-y-2 pt-4">
          <h4 className="text-sm font-medium">Recursos Incluídos</h4>
          <ul className="space-y-2 mt-2">
            {plano.recursos.map((recurso, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span className="text-sm">{recurso}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      
      {(estado === 'ativa' || estado === 'trial') && (
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full text-destructive hover:text-destructive"
            onClick={cancelarAssinatura}
          >
            Cancelar Subscrição
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default UserSubscription;
