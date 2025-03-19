
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
      <Card className="w-full border-2 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Sem Subscrição Ativa</CardTitle>
          <CardDescription>
            Atualmente não tem nenhuma subscrição ativa no sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-amber-600 p-4 bg-amber-50 rounded-md">
            <AlertTriangle size={20} />
            <p>Subscreva um plano para aceder a todas as funcionalidades.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="default" 
            className="w-full md:w-auto"
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
    <Card className="w-full border-2 shadow-md">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle className="text-xl md:text-2xl flex flex-wrap items-center gap-2">
              <span>
                {plano?.nome || 'Plano Ativo'}
              </span>
              {isTrial && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Período de Teste
                </span>
              )}
            </CardTitle>
            <CardDescription className="mt-1">
              {plano?.descricao || 'Informações sobre o seu plano atual'}
            </CardDescription>
          </div>
          <div className="text-xl font-bold text-primary">
            {plano?.preco_mensal ? `${plano.preco_mensal}€` : ''} 
            <span className="text-sm text-muted-foreground font-normal">/mês</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Estado da Subscrição</p>
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                <span className="font-medium capitalize">{assinaturaAtual.estado}</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Faturação</p>
              <p className="font-medium capitalize">{assinaturaAtual.periodo_faturacao}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Data de Início</p>
              <p className="font-medium">{dataInicio}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Data de Expiração</p>
              <p className="font-medium">{dataFim}</p>
            </div>
          </div>
        </div>

        {/* Progress bar for time remaining */}
        {typeof assinaturaAtual.percentualRestante === 'number' && (
          <div className="mt-6 space-y-3 p-4 bg-slate-50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Tempo Restante</span>
              <span className="font-bold">{assinaturaAtual.diasRestantes} dias</span>
            </div>
            <Progress value={assinaturaAtual.percentualRestante} className="h-2" />
          </div>
        )}

        {/* Features */}
        {plano?.recursos && plano.recursos.length > 0 && (
          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <p className="text-sm font-medium mb-3">Recursos Incluídos</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
      <CardFooter className="flex justify-end pt-4">
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
