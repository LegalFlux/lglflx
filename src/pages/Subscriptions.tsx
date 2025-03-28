
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/router';
import PageHeader from '@/components/layout/PageHeader';
import PlanSelector from '@/components/subscription/PlanSelector';
import UserSubscription from '@/components/subscription/UserSubscription';

const Subscriptions: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<string>(user ? 'minha-assinatura' : 'planos');

  // Redirecionar para login se não estiver autenticado
  React.useEffect(() => {
    if (!user) {
      router.push('/auth');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-background pt-16 animate-fade-in">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <PageHeader
          title="Subscrições"
          description="Gerencie a sua subscrição e veja os planos disponíveis"
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
            <TabsContent value="minha-assinatura" className="space-y-4">
              <UserSubscription />
            </TabsContent>
          )}

          <TabsContent value="planos" className="space-y-4">
            <PlanSelector />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Subscriptions;
