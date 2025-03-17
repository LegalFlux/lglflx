
import React from 'react';
import { Button } from '@/components/ui/button';

const Pricing: React.FC = () => {
  const primaryColor = '#33254C';

  return (
    <section id="precos" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Planos e Preços</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold mb-2">Básico</h3>
              <div className="text-3xl font-bold mb-2">€29<span className="text-lg text-muted-foreground">/mês</span></div>
              <p className="text-muted-foreground">Ideal para profissionais independentes</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Até 50 processos ativos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>5GB de armazenamento</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Portal do cliente</span>
                </li>
              </ul>
              <Button className="w-full mt-6" variant="outline">Começar</Button>
            </div>
          </div>
          
          <div className="border border-primary rounded-lg overflow-hidden shadow-md">
            <div className="p-6 border-b bg-primary/5">
              <h3 className="text-xl font-semibold mb-2">Profissional</h3>
              <div className="text-3xl font-bold mb-2">€59<span className="text-lg text-muted-foreground">/mês</span></div>
              <p className="text-muted-foreground">Para escritórios em crescimento</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Até 200 processos ativos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>20GB de armazenamento</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Portal do cliente personalizado</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Assinatura digital</span>
                </li>
              </ul>
              <Button className="w-full mt-6" style={{ backgroundColor: primaryColor }}>Começar</Button>
            </div>
          </div>
          
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold mb-2">Empresarial</h3>
              <div className="text-3xl font-bold mb-2">€99<span className="text-lg text-muted-foreground">/mês</span></div>
              <p className="text-muted-foreground">Para grandes escritórios</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Processos ilimitados</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>50GB de armazenamento</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Suporte prioritário</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>API para integrações</span>
                </li>
              </ul>
              <Button className="w-full mt-6" variant="outline">Começar</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
