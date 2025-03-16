
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import PricingCard from '@/components/pricing/PricingCard';

const Finance = () => {
  return (
    <div className="container py-6 space-y-6">
      <PageHeader 
        title="Finanças" 
        description="Gerencie faturamento, honorários e serviços contratados"
      />

      <Tabs defaultValue="planos" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="planos">Planos de Subscrição</TabsTrigger>
          <TabsTrigger value="faturacao">Faturação</TabsTrigger>
          <TabsTrigger value="honorarios">Honorários</TabsTrigger>
        </TabsList>
        
        <TabsContent value="planos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PricingCard 
              title="Free"
              price="0€"
              description="Funcionalidades básicas para começar"
              buttonText="Plano Atual"
              buttonVariant="outline"
              features={[
                { name: "Cadastro de Processos", included: true },
                { name: "Acompanhamento de Andamentos", included: true },
                { name: "Linha do Tempo do Caso", included: true },
                { name: "Calendário Integrado", included: true },
                { name: "Alertas de Prazos", included: true },
                { name: "Armazenamento Seguro", included: true, detail: "1GB" },
                { name: "Chat Interno", included: true },
                { name: "Faturamento Básico", included: true },
                { name: "Acesso a Bases de Dados Básicas", included: true },
                { name: "Criptografia de Dados", included: true },
                { name: "Aplicativo Móvel", included: true },
                { name: "Suporte por E-mail", included: true },
              ]}
            />
            
            <PricingCard 
              title="Premium"
              price="49,99€"
              period="/mês"
              description="Funcionalidades avançadas para escritórios de médio porte"
              buttonText="Upgrade"
              buttonVariant="default"
              popular={true}
              features={[
                { name: "Cadastro de Processos", included: true },
                { name: "Acompanhamento de Andamentos", included: true },
                { name: "Linha do Tempo do Caso", included: true },
                { name: "Previsão de Resultados com IA", included: true },
                { name: "Calendário Integrado", included: true },
                { name: "Alertas de Prazos", included: true },
                { name: "Automação de Workflows", included: true },
                { name: "Armazenamento Seguro", included: true, detail: "10GB" },
                { name: "Digitalização e OCR", included: true },
                { name: "Automação de Documentos", included: true },
                { name: "Chat Interno", included: true },
                { name: "Portal do Cliente", included: true },
                { name: "Integração com Ferramentas", included: true },
                { name: "Faturamento Básico", included: true },
                { name: "Controle de Honorários", included: true },
                { name: "Relatórios Financeiros", included: true },
                { name: "Acesso a Bases de Dados Básicas", included: true },
                { name: "Atualizações Legislativas", included: true },
                { name: "Análise de Dados com IA", included: true },
                { name: "Criptografia de Dados", included: true },
                { name: "Controle de Acesso Básico", included: true },
                { name: "Auditoria de Acesso", included: true },
                { name: "Aplicativo Móvel", included: true },
                { name: "Sincronização em Tempo Real", included: true },
                { name: "Suporte por E-mail", included: true },
              ]}
            />
            
            <PricingCard 
              title="Enterprise"
              price="Personalizado"
              description="Solução completa para grandes escritórios"
              buttonText="Contacte-nos"
              buttonVariant="outline"
              features={[
                { name: "Todas as funcionalidades Premium", included: true },
                { name: "Armazenamento Seguro", included: true, detail: "Ilimitado" },
                { name: "Suporte Prioritário (24/7)", included: true },
                { name: "Treinamento Personalizado", included: true },
                { name: "Integrações Customizadas", included: true },
                { name: "Implementação Assistida", included: true },
                { name: "SLA Garantido", included: true },
              ]}
            />
          </div>
          
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Adons Disponíveis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold text-lg">Armazenamento Extra</h3>
                <p className="text-muted-foreground mb-2">Aumente seu espaço de armazenamento</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-medium">10€/mês por 10GB extra</span>
                  <Button size="sm" variant="outline">Adicionar</Button>
                </div>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold text-lg">Integrações Avançadas</h3>
                <p className="text-muted-foreground mb-2">Conexão com sistemas específicos</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-medium">25€/mês por integração</span>
                  <Button size="sm" variant="outline">Adicionar</Button>
                </div>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold text-lg">Relatórios Personalizados</h3>
                <p className="text-muted-foreground mb-2">Análises e relatórios customizados</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-medium">15€/mês</span>
                  <Button size="sm" variant="outline">Adicionar</Button>
                </div>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold text-lg">Marketing Jurídico</h3>
                <p className="text-muted-foreground mb-2">Ferramentas de captação de clientes</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-medium">30€/mês</span>
                  <Button size="sm" variant="outline">Adicionar</Button>
                </div>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold text-lg">Treinos e Consultoria</h3>
                <p className="text-muted-foreground mb-2">Sessões de treino para equipes</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-medium">75€/sessão</span>
                  <Button size="sm" variant="outline">Contactar</Button>
                </div>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold text-lg">Portal do Cliente Premium</h3>
                <p className="text-muted-foreground mb-2">Experiência aprimorada para clientes</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-medium">20€/mês</span>
                  <Button size="sm" variant="outline">Adicionar</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="faturacao" className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Gestão de Faturação</h3>
            <p className="text-muted-foreground">
              A gestão de faturação estará disponível em breve. Esta funcionalidade permitirá emitir faturas,
              controlar pagamentos e monitorizar receitas.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="honorarios" className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Gestão de Honorários</h3>
            <p className="text-muted-foreground">
              A gestão de honorários estará disponível em breve. Esta funcionalidade permitirá definir e monitorizar
              honorários por processo, cliente ou tipo de serviço.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Finance;
