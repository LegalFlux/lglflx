
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/use-subscription';
import PricingCard from '@/components/pricing/PricingCard';
import { Button } from '@/components/ui/button';
// Card components removed as they're not being used
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/router'; // Changed from react-router-dom to next/router

const PlanSelector: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  
  const { planos, loading, subscreverPlano, iniciarTrial, assinaturaAtual } = useSubscription();
  const [selectedPeriod, setSelectedPeriod] = useState<'mensal' | 'anual'>('mensal');
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Função para lidar com a seleção de um plano
  const handleSelectPlan = (planId: string) => {
    if (!user) {
      router.push('/auth'); // Changed from navigate to router.push
      return;
    }
    
    setSelectedPlanId(planId);
    setIsDialogOpen(true);
  };

  // Função para iniciar o trial
  const handleStartTrial = async () => {
    if (!selectedPlanId || !user) return;
    
    setIsProcessing(true);
    await iniciarTrial(selectedPlanId);
    setIsProcessing(false);
    setIsDialogOpen(false);
  };

  // Função para subscrever plano
  const handleSubscribe = async () => {
    if (!selectedPlanId || !user) return;
    
    setIsProcessing(true);
    await subscreverPlano(selectedPlanId, selectedPeriod);
    setIsProcessing(false);
    setIsDialogOpen(false);
  };

  // Helper para calcular desconto anual removed as it's not being used

  // Helper para formatar preço
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center mb-8">
        <RadioGroup
          value={selectedPeriod}
          onValueChange={(value) => setSelectedPeriod(value as 'mensal' | 'anual')}
          className="flex items-center space-x-2 bg-muted p-1 rounded-lg"
        >
          <div className={`flex items-center space-x-2 rounded-md px-3 py-2 ${selectedPeriod === 'mensal' ? 'bg-background shadow-sm' : ''}`}>
            <RadioGroupItem value="mensal" id="mensal" className="sr-only" />
            <Label htmlFor="mensal" className={`cursor-pointer ${selectedPeriod === 'mensal' ? 'font-medium' : ''}`}>
              Mensal
            </Label>
          </div>
          <div className={`flex items-center space-x-2 rounded-md px-3 py-2 ${selectedPeriod === 'anual' ? 'bg-background shadow-sm' : ''}`}>
            <RadioGroupItem value="anual" id="anual" className="sr-only" />
            <Label htmlFor="anual" className={`cursor-pointer ${selectedPeriod === 'anual' ? 'font-medium' : ''}`}>
              Anual <span className="text-xs text-green-600 font-semibold ml-1">-17%</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {planos.map((plano) => {
          const isPopular = plano.nome === 'Solo';
          const price = selectedPeriod === 'mensal' 
            ? plano.preco_mensal 
            : Math.round(plano.preco_anual / 12);
          
          const formattedPrice = formatPrice(price);
          
          // Verificar se o plano é o plano atual do usuário
          const isPlanoCurrent = assinaturaAtual?.plano_id === plano.id;

          // Montar lista de recursos
          const features = plano.recursos.map(recurso => ({
            name: recurso,
            included: true
          }));

          return (
            <PricingCard
              key={plano.id}
              title={plano.nome}
              price={formattedPrice}
              period={selectedPeriod === 'mensal' ? '/mês' : '/mês, faturado anualmente'}
              description={plano.descricao || ''}
              features={features}
              buttonText={isPlanoCurrent ? 'Plano Atual' : 'Selecionar Plano'}
              buttonVariant={isPlanoCurrent ? 'outline' : 'default'}
              popular={isPopular}
              onClick={() => !isPlanoCurrent && handleSelectPlan(plano.id)}
              disabled={isPlanoCurrent}
            />
          );
        })}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Subscrição</DialogTitle>
            <DialogDescription>
              Escolha como deseja prosseguir com a subscrição do plano selecionado.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!assinaturaAtual && (
              <Button 
                onClick={handleStartTrial} 
                variant="outline" 
                className="w-full justify-start text-left"
                disabled={isProcessing}
              >
                {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                Começar com 15 dias grátis
              </Button>
            )}
            <Button 
              onClick={handleSubscribe} 
              className="w-full justify-start text-left"
              disabled={isProcessing}
            >
              {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
              Subscrever agora
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button 
              variant="secondary" 
              onClick={() => setIsDialogOpen(false)}
              disabled={isProcessing}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlanSelector;
