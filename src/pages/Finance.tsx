'use client';

import { BarChart, TrendingUp, ArrowUpRight, Calendar, CreditCard, PieChart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveBar } from '@nivo/bar';
import PageHeader from '@/components/layout/PageHeader';
import { Separator } from '@/components/ui/separator';

const revenueData: { [key: string]: string | number }[] = [
  { month: 'Jan', value: 4500 },
  { month: 'Fev', value: 5200 },
  { month: 'Mar', value: 4800 },
  { month: 'Abr', value: 5800 },
  { month: 'Mai', value: 6300 },
  { month: 'Jun', value: 5900 },
];

const Finance: React.FC = () => {
  return (
    <div className="container py-6 space-y-6">
      <PageHeader title="Finanças" description="Gerencie faturamento, honorários e análise financeira" />

      <Tabs defaultValue="faturacao" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="faturacao">Faturação</TabsTrigger>
          <TabsTrigger value="honorarios">Honorários</TabsTrigger>
        </TabsList>

        <TabsContent value="faturacao" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <BarChart size={20} />
                  </div>
                  <CardTitle>Faturamento e Cobrança</CardTitle>
                </div>
                <CardDescription>Gestão de faturamento e cobrança automatizada</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Funcionalidades</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Geração automática de faturas</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Integração com sistemas de pagamento</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Previsão de fluxo de caixa</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Relatórios financeiros detalhados</span>
                      </li>
                    </ul>
                    <Button>Gerar Nova Fatura</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="honorarios" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <CreditCard size={20} />
                  </div>
                  <CardTitle>Gestão de Honorários</CardTitle>
                </div>
                <CardDescription>Defina e monitorize honorários por processo, cliente ou tipo de serviço</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Configurações</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Definição de valores por hora</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Honorários por tipo de processo</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Tabelas de preços personalizadas</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Descontos para clientes recorrentes</span>
                      </li>
                    </ul>
                    <div className="mt-4 flex space-x-2">
                      <Button>Configurar Honorários</Button>
                      <Button variant="outline">Ver Histórico</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <PieChart size={20} />
                  </div>
                  <CardTitle>Análise de Rentabilidade</CardTitle>
                </div>
                <CardDescription>Avalie a rentabilidade dos seus serviços e clientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Relatórios Disponíveis</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Rentabilidade por cliente</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Rentabilidade por tipo de serviço</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Comparação de horas faturáveis vs. não faturáveis</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Tendências de rentabilidade ao longo do tempo</span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Button>Gerar Relatórios</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 hover:shadow-md transition-all duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Receitas</p>
              <h3 className="text-2xl font-bold mt-1">€32.500</h3>
              <div className="flex items-center mt-1 text-green-500 text-sm">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+8%</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <ArrowUpRight className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-all duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Despesas</p>
              <h3 className="text-2xl font-bold mt-1">€12.800</h3>
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+3%</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-red-500" />
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-all duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Lucro Líquido</p>
              <h3 className="text-2xl font-bold mt-1">€19.700</h3>
              <div className="flex items-center mt-1 text-green-500 text-sm">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+12%</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <PieChart className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-all duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Próximos Pagamentos</p>
              <h3 className="text-2xl font-bold mt-1">€8.200</h3>
              <div className="flex items-center mt-1 text-amber-500 text-sm">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Em 7 dias</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-amber-500" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-4 hover:shadow-md transition-all duration-200">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg font-semibold">Receitas Mensais</CardTitle>
            <CardDescription>Análise de receitas dos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="chart-container h-[300px]">
              <ResponsiveBar
                data={revenueData}
                keys={['value']}
                indexBy="month"
                margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
                padding={0.3}
                colors="#3b82f6"
                theme={{
                  tooltip: {
                    container: {
                      background: '#ffffff',
                      fontSize: '12px',
                      borderRadius: '4px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }
                  }
                }}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Mês',
                  legendPosition: 'middle',
                  legendOffset: 40,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Valor (€)',
                  legendPosition: 'middle',
                  legendOffset: -40,
                  format: (value) => `€${value}`,
                }}
                enableGridY={true}
                labelSkipWidth={12}
                labelSkipHeight={12}
                label={(d) => `€${d.value}`}
                role="application"
                ariaLabel="Gráfico de receitas mensais"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="p-4 hover:shadow-md transition-all duration-200">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg font-semibold">Análise Financeira</CardTitle>
            <CardDescription>Resumo de indicadores financeiros</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center">
                    <div className="p-2 mr-3 rounded-md bg-green-500/10">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Taxa de Crescimento</p>
                      <p className="text-xs text-muted-foreground">Comparado ao mês anterior</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-green-500">+12.5%</p>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center">
                    <div className="p-2 mr-3 rounded-md bg-blue-500/10">
                      <PieChart className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Margem de Lucro</p>
                      <p className="text-xs text-muted-foreground">Média dos últimos 3 meses</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-blue-500">32.8%</p>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center">
                    <div className="p-2 mr-3 rounded-md bg-amber-500/10">
                      <Calendar className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Previsão Próximo Mês</p>
                      <p className="text-xs text-muted-foreground">Baseado em tendências atuais</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-amber-500">€7.200</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Finance;
