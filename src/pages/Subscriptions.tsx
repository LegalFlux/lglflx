
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PlanSelector from '@/components/subscription/PlanSelector';
import UserSubscription from '@/components/subscription/UserSubscription';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

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
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Subscrições</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie a sua subscrição e veja os planos disponíveis
        </p>
      </div>

      <Tabs 
        defaultValue={activeTab} 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full mb-8"
      >
        <TabsList className="w-full md:w-auto">
          {user && (
            <TabsTrigger value="minha-assinatura">Minha Subscrição</TabsTrigger>
          )}
          <TabsTrigger value="planos">Planos Disponíveis</TabsTrigger>
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
  );
};

export default Subscriptions;
