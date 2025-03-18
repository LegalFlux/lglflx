
import React, { useState } from 'react';
import { useSubscription } from '@/hooks/use-subscription';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Check, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const PlanSelector: React.FC = () => {
  const { planos, loading, assinaturaAtual, subscreverPlano, iniciarTrial } = useSubscription();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAnual, setIsAnual] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        <span className="ml-2">A carregar planos...</span>
      </div>
    );
  }

  const handleSubscribe = async (planoId: string) => {
    if (!user) {
      toast({
        title: 'Login necessário',
        description: 'Faça login para subscrever um plano',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }

    setLoadingPlan(planoId);
    try {
      await subscreverPlano(planoId, isAnual ? 'anual' : 'mensal');
      navigate('/dashboard');
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleTrial = async (planoId: string) => {
    if (!user) {
      toast({
        title: 'Login necessário',
        description: 'Faça login para iniciar um período de teste',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }

    setLoadingPlan(planoId);
    try {
      await iniciarTrial(planoId);
      navigate('/dashboard');
    } finally {
      setLoadingPlan(null);
    }
  };

  const isPlanActive = (planoId: string) => {
    return assinaturaAtual?.plano_id === planoId && 
      (assinaturaAtual?.estado === 'ativa' || assinaturaAtual?.estado === 'trial');
  };

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Escolha o Plano Ideal para Si</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Selecione o plano que melhor se adapta às necessidades do seu escritório jurídico. 
          Todos os planos incluem suporte técnico e atualizações regulares.
        </p>
      </div>

      <div className="flex justify-center items-center space-x-2 mb-8">
        <Label htmlFor="billing-toggle" className={isAnual ? 'text-muted-foreground' : 'font-medium'}>Mensal</Label>
        <Switch
          id="billing-toggle"
          checked={isAnual}
          onCheckedChange={setIsAnual}
        />
        <Label htmlFor="billing-toggle" className={!isAnual ? 'text-muted-foreground' : 'font-medium'}>
          Anual <span className="text-sm text-green-600 ml-1">(2 meses grátis)</span>
        </Label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {planos.map((plano) => {
          const preco = isAnual ? plano.preco_anual / 12 : plano.preco_mensal;
          const isActive = isPlanActive(plano.id);
          
          return (
            <Card 
              key={plano.id} 
              className={`flex flex-col h-full transition-all duration-200 hover:shadow-md ${
                plano.nome === 'Enterprise' ? 'border-primary scale-[1.02] shadow-md' : ''
              }`}
            >
              {plano.nome === 'Enterprise' && (
                <div className="bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-t-md w-full text-center">
                  Mais Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl font-bold">{plano.nome}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{preco.toFixed(2)}€</span>
                  <span className="text-muted-foreground text-sm">/mês</span>
                </div>
                <CardDescription className="mt-2">{plano.descricao}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {plano.recursos.map((recurso, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={18} className="text-green-500 mr-2 flex-shrink-0 mt-1" />
                      <span className="text-sm">{recurso}</span>
                    </li>
                  ))}
                  <li className="flex items-start mt-3 pt-2 border-t">
                    <span className="text-sm font-medium">
                      {plano.limite_usuarios === 1 
                        ? '1 utilizador'
                        : `Até ${plano.limite_usuarios} utilizadores`}
                    </span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3">
                {isActive ? (
                  <Button 
                    className="w-full" 
                    variant="outline" 
                    disabled
                  >
                    Plano Atual
                  </Button>
                ) : (
                  <>
                    <Button 
                      className="w-full" 
                      onClick={() => handleSubscribe(plano.id)}
                      disabled={loadingPlan === plano.id}
                    >
                      {loadingPlan === plano.id ? (
                        <>
                          <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                          A processar
                        </>
                      ) : (
                        `Subscrever ${isAnual ? 'Anual' : 'Mensal'}`
                      )}
                    </Button>
                    {!isAnual && (
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => handleTrial(plano.id)}
                        disabled={loadingPlan === plano.id || !!assinaturaAtual}
                      >
                        {loadingPlan === plano.id ? (
                          <>
                            <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                            A processar
                          </>
                        ) : (
                          'Experimentar 15 dias'
                        )}
                      </Button>
                    )}
                  </>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 bg-muted p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">🛠 Add-ons Disponíveis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-background rounded-md">
            <h4 className="font-medium">📦 Armazenamento adicional</h4>
            <p className="text-sm text-muted-foreground mt-1">Expansão do espaço de documentos conforme a necessidade.</p>
          </div>
          <div className="p-4 bg-background rounded-md">
            <h4 className="font-medium">🔗 Integrações avançadas</h4>
            <p className="text-sm text-muted-foreground mt-1">Conexão com CRMs, ERPs e outras plataformas.</p>
          </div>
          <div className="p-4 bg-background rounded-md">
            <h4 className="font-medium">📊 Relatórios personalizados</h4>
            <p className="text-sm text-muted-foreground mt-1">Criação de dashboards customizados para análise jurídica.</p>
          </div>
          <div className="p-4 bg-background rounded-md">
            <h4 className="font-medium">🤖 IA Integrada</h4>
            <p className="text-sm text-muted-foreground mt-1">Sugestões inteligentes, automação de tarefas, análise de documentos.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSelector;
