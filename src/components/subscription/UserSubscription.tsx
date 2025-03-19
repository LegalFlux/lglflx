
import React from 'react';
import { useSubscription } from '@/hooks/use-subscription';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

const UserSubscription: React.FC = () => {
  const { assinaturaAtual, cancelarAssinatura, loading } = useSubscription();
  const [isCancelling, setIsCancelling] = React.useState(false);

  const handleCancelSubscription = async () => {
    setIsCancelling(true);
    await cancelarAssinatura();
    setIsCancelling(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!assinaturaAtual) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sem Subscrição Ativa</CardTitle>
          <CardDescription>
            Atualmente não tem nenhuma subscrição ativa no sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-amber-600">
            <AlertTriangle size={20} />
            <p>Subscreva um plano para aceder a todas as funcionalidades.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="default" 
            onClick={() => window.scrollTo({ top: document.getElementById('planos')?.offsetTop, behavior: 'smooth' })}
          >
            Ver Planos Disponíveis
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: pt });
  };

  const plano = assinaturaAtual.plano;
  const isTrial = assinaturaAtual.estado === 'trial';
  const dataFim = formatDate(assinaturaAtual.data_fim);
  const dataInicio = formatDate(assinaturaAtual.data_inicio);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <span className="mr-2">
            {plano?.nome || 'Plano Ativo'}
          </span>
          {isTrial && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Período de Teste
            </span>
          )}
        </CardTitle>
        <CardDescription>
          {plano?.descricao || 'Informações sobre o seu plano atual'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Estado da Subscrição</p>
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
              <span className="capitalize">{assinaturaAtual.estado}</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Faturação</p>
            <p className="capitalize">{assinaturaAtual.periodo_faturacao}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Data de Início</p>
            <p>{dataInicio}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Data de Expiração</p>
            <p>{dataFim}</p>
          </div>
        </div>

        {/* Progress bar for time remaining */}
        {typeof assinaturaAtual.percentualRestante === 'number' && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Tempo Restante</span>
              <span>{assinaturaAtual.diasRestantes} dias</span>
            </div>
            <Progress value={assinaturaAtual.percentualRestante} />
          </div>
        )}

        {/* Features */}
        {plano?.recursos && plano.recursos.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium mb-2">Recursos Incluídos</p>
            <ul className="space-y-1">
              {plano.recursos.map((recurso, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{recurso}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              Cancelar Subscrição
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação irá cancelar a sua subscrição atual. Poderá continuar a utilizar o serviço até ao final do período já pago.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleCancelSubscription}
                disabled={isCancelling}
              >
                {isCancelling ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    A processar...
                  </>
                ) : (
                  'Sim, quero cancelar'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default UserSubscription;
