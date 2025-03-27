
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import PricingCard from '@/components/pricing/PricingCard';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';


const Pricing: React.FC = () => {
  const [billingInterval, setBillingInterval] = useState<'mensal' | 'anual'>('mensal');
  const primaryColor = '#33254C';

  // Cálculo de desconto de 2 meses grátis para pagamento anual
  const getDiscountPrice = (monthlyPrice: number) => {
    return monthlyPrice * 10; // 12 meses - 2 meses grátis = 10 meses
  };

  return (
    <section id="precos" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Planos e Preços</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Escolha o plano que melhor se adapta às necessidades do seu escritório jurídico.
          </p>
          
          <div className="mt-6">
            <Tabs
              defaultValue="mensal"
              className="inline-flex mx-auto"
              onValueChange={(value) => setBillingInterval(value as 'mensal' | 'anual')}
            >
              <TabsList>
                <TabsTrigger value="mensal">Faturação Mensal</TabsTrigger>
                <TabsTrigger value="anual">
                  Faturação Anual
                  <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">2 meses grátis</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Plano Basic */}
          <PricingCard
            title="Basic"
            price={billingInterval === 'mensal' ? '49€' : `${getDiscountPrice(49)}€`}
            period={billingInterval === 'mensal' ? '/mês' : '/ano'}
            description="Para advogados individuais e pequenos escritórios"
            features={[
              { name: "Portal de Cliente", included: true },
              { name: "Calendário integrado", included: true },
              { name: "Base de conhecimentos", included: true },
              { name: "Gestão de processos", included: true },
              { name: "Número de utilizadores", included: true, detail: "1 utilizador" },
              { name: "Armazenamento", included: true, detail: "5GB" },
              { name: "Processos activos", included: true, detail: "até 50" },
              { name: "Gestão documental avançada", included: false },
              { name: "Comunicação integrada", included: false },
            ]}
            buttonText="Começar agora"
            buttonVariant="outline"
          />

          {/* Plano Solo */}
          <PricingCard
            title="Solo"
            price={billingInterval === 'mensal' ? '99€' : `${getDiscountPrice(99)}€`}
            period={billingInterval === 'mensal' ? '/mês' : '/ano'}
            description="Para advogados independentes com maior volume"
            popular={true}
            features={[
              { name: "Tudo do Basic +", included: true },
              { name: "Adicionar assistentes", included: true },
              { name: "Gestão documental avançada", included: true },
              { name: "Comunicação integrada", included: true, detail: "chat, email, WhatsApp" },
              { name: "Gestão financeira", included: true },
              { name: "Número de utilizadores", included: true, detail: "até 3" },
              { name: "Armazenamento", included: true, detail: "20GB" },
              { name: "Processos activos", included: true, detail: "até 200" },
              { name: "Pesquisa jurídica integrada", included: false },
            ]}
            buttonText="Escolher Solo"
            buttonVariant="default"
          />

          {/* Plano Enterprise */}
          <PricingCard
            title="Enterprise"
            price={billingInterval === 'mensal' ? '199€' : `${getDiscountPrice(199)}€`}
            period={billingInterval === 'mensal' ? '/mês' : '/ano'}
            description="Para escritórios com equipas e automação"
            features={[
              { name: "Tudo do Solo +", included: true },
              { name: "Pesquisa jurídica integrada", included: true },
              { name: "Segurança avançada", included: true, detail: "2FA, backups, encriptação" },
              { name: "Relatórios de eficiência", included: true },
              { name: "Número de utilizadores", included: true, detail: "até 10" },
              { name: "Armazenamento", included: true, detail: "100GB" },
              { name: "Processos activos", included: true, detail: "ilimitados" },
              { name: "Suporte prioritário", included: true },
              { name: "Customizações avançadas", included: false },
            ]}
            buttonText="Escolher Enterprise"
            buttonVariant="outline"
          />

          {/* Plano Personalizado */}
          <PricingCard
            title="Personalizado"
            price="Sob orçamento"
            description="Para grandes escritórios e empresas jurídicas"
            features={[
              { name: "Tudo do Enterprise +", included: true },
              { name: "Customizações avançadas", included: true },
              { name: "Integrações específicas", included: true },
              { name: "Suporte prioritário", included: true },
              { name: "Número de utilizadores", included: true, detail: "ilimitados" },
              { name: "Armazenamento", included: true, detail: "personalizado" },
              { name: "Processos activos", included: true, detail: "ilimitados" },
              { name: "Formação da equipa", included: true },
              { name: "Gestão de projectos dedicada", included: true },
            ]}
            buttonText="Contactar-nos"
            buttonVariant="outline"
          />
        </div>
        
        {/* Add-ons */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Add-ons Disponíveis</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Grupo 1 */}
            <div className="space-y-4">
              <div className="border rounded-lg p-5 h-full">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-50 p-2 rounded-full text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12.29V9c0-1.1-.9-2-2-2h-8.93a2 2 0 0 1-1.66-.9l-.82-1.2a2 2 0 0 0-1.66-.9H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2h7.22"/><circle cx="16" cy="19" r="2"/><circle cx="21" cy="19" r="2"/><path d="M16 11V9"/><path d="M21 11V9"/><path d="M21 17h-5"/></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Armazenamento adicional</h4>
                    <p className="text-sm text-muted-foreground">Expansão do espaço de documentos conforme a necessidade.</p>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-5 h-full">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-50 p-2 rounded-full text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1"/><path d="M17 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1"/><path d="M12 12v8"/><path d="m8 16 4 4 4-4"/></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Integrações avançadas</h4>
                    <p className="text-sm text-muted-foreground">Conexão com CRMs, ERPs e outras plataformas.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Grupo 2 */}
            <div className="space-y-4">
              <div className="border rounded-lg p-5 h-full">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-50 p-2 rounded-full text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Relatórios personalizados</h4>
                    <p className="text-sm text-muted-foreground">Criação de dashboards customizados para análise jurídica.</p>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-5 h-full">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-50 p-2 rounded-full text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8.56 3.69a7 7 0 0 0-2.32 1.05"/><path d="M3.69 8.56A7 7 0 0 0 3.5 12"/><path d="M3.69 15.44a7 7 0 0 0 1.05 2.32"/><path d="M8.56 20.31A7 7 0 0 0 12 20.5"/><path d="M15.44 20.31a7 7 0 0 0 2.32-1.05"/><path d="M20.31 15.44A7 7 0 0 0 20.5 12"/><path d="M20.31 8.56a7 7 0 0 0-1.05-2.32"/><path d="M15.44 3.69A7 7 0 0 0 12 3.5"/></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Marketing jurídico</h4>
                    <p className="text-sm text-muted-foreground">Gestão de presença online, SEO e captação de clientes.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Grupo 3 */}
            <div className="space-y-4">
              <div className="border rounded-lg p-5 h-full">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-50 p-2 rounded-full text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Treino e Consultoria</h4>
                    <p className="text-sm text-muted-foreground">Formação personalizada para maximizar a utilização da plataforma.</p>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-5 h-full">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-50 p-2 rounded-full text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10h10V2Z"/><path d="M22 12h-10v10h10V12Z"/><path d="M12 12 2 22"/><path d="M22 2 12 12"/></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">IA Integrada</h4>
                    <p className="text-sm text-muted-foreground">Sugestões inteligentes, automação de tarefas repetitivas, análise de documentos.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Diferenciais */}
        <div className="mt-16 border-t pt-10">
          <h3 className="text-2xl font-bold mb-6 text-center">Diferenciais</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-4 rounded-lg border">
              <div className="flex items-center mb-2 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
                <p className="ml-2 font-semibold">Teste grátis</p>
              </div>
              <p className="text-sm text-muted-foreground">14 dias para novos clientes sem necessidade de cartão de crédito.</p>
            </div>
            
            <div className="p-4 rounded-lg border">
              <div className="flex items-center mb-2 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <p className="ml-2 font-semibold">Descontos anuais</p>
              </div>
              <p className="text-sm text-muted-foreground">2 meses grátis ao optar pelo pagamento anual.</p>
            </div>
            
            <div className="p-4 rounded-lg border">
              <div className="flex items-center mb-2 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>
                <p className="ml-2 font-semibold">Demonstração ao vivo</p>
              </div>
              <p className="text-sm text-muted-foreground">Para os planos Enterprise e Personalizado.</p>
            </div>
            
            <div className="p-4 rounded-lg border">
              <div className="flex items-center mb-2 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="12" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                <p className="ml-2 font-semibold">Pacotes customizáveis</p>
              </div>
              <p className="text-sm text-muted-foreground">Possibilidade de misturar planos com add-ons específicos.</p>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto bg-muted p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Não sabe qual plano escolher?</h3>
            <p className="text-muted-foreground mb-6">
              Fale com um dos nossos consultores para encontrar a solução ideal para o seu escritório jurídico.
            </p>
            <Button className="font-semibold" style={{ backgroundColor: primaryColor }}>
              Agendar Consultoria Gratuita
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
