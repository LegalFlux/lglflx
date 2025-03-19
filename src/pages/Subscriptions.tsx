
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PlanSelector from '@/components/subscription/PlanSelector';
import UserSubscription from '@/components/subscription/UserSubscription';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';

const Subscriptions: React.FC = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState<string>(user ? 'minha-assinatura' : 'planos');

  // Redirecionar para login se não estiver autenticado
  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  // Se for administrador, mostrar também a gestão de planos
  const isAdmin = userRole === 'administrador';

  return (
    <div className="min-h-screen bg-background pt-16 animate-fade-in">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <PageHeader
          title="Subscrições"
          description="Gerencie a sua subscrição e veja os planos disponíveis"
          icon={<CreditCard size={28} />}
        />

        <Tabs 
          defaultValue={activeTab} 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full mb-8"
        >
          <TabsList className="w-full md:w-auto mb-4">
            {user && (
              <TabsTrigger value="minha-assinatura">Minha Subscrição</TabsTrigger>
            )}
            <TabsTrigger value="planos" id="planos">Planos Disponíveis</TabsTrigger>
          </TabsList>

          {user && (
            <TabsContent value="minha-assinatura" className="pt-4">
              <div className="max-w-3xl mx-auto">
                <UserSubscription />
              </div>
            </TabsContent>
          )}
          
          <TabsContent value="planos" className="pt-4">
            <PlanSelector />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Subscriptions;
