
import React from "react";
import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Plus, Filter } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import DashboardLayout from "@/pages/Dashboard/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const revenueData = [
  { month: 'Jan', value: 4500 },
  { month: 'Fev', value: 5200 },
  { month: 'Mar', value: 4800 },
  { month: 'Abr', value: 5800 },
  { month: 'Mai', value: 6300 },
  { month: 'Jun', value: 5900 },
];

const expensesByCategory = [
  { name: 'Pessoal', value: 40 },
  { name: 'Operacional', value: 20 },
  { name: 'Escritório', value: 15 },
  { name: 'Marketing', value: 10 },
  { name: 'Impostos', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Financials = () => {
  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Análise Financeira</h1>
              <p className="text-muted-foreground">
                Visão geral financeira do escritório 
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Registar Transação
              </Button>
            </div>
          </div>

          {/* Cards de resumo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="p-4">
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
            
            <Card className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Despesas</p>
                  <h3 className="text-2xl font-bold mt-1">€18.300</h3>
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    <span>-2%</span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <ArrowDownRight className="h-5 w-5 text-red-500" />
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resultado Líquido</p>
                  <h3 className="text-2xl font-bold mt-1">€14.200</h3>
                  <div className="flex items-center mt-1 text-green-500 text-sm">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+12%</span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-purple-500" />
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Honorários Pendentes</p>
                  <h3 className="text-2xl font-bold mt-1">€8.750</h3>
                  <div className="flex items-center mt-1 text-amber-500 text-sm">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+5%</span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-amber-500" />
                </div>
              </div>
            </Card>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Receitas Mensais</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Distribuição de Despesas</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expensesByCategory}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {expensesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Tabela de transações recentes */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Transações Recentes</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">Descrição</th>
                    <th className="px-4 py-3 text-left font-medium">Processo</th>
                    <th className="px-4 py-3 text-left font-medium">Data</th>
                    <th className="px-4 py-3 text-left font-medium">Tipo</th>
                    <th className="px-4 py-3 text-right font-medium">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">Honorários - Caso ABC</td>
                    <td className="px-4 py-3">123/2023</td>
                    <td className="px-4 py-3">10/05/2023</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                        Receita
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-green-600">€2.500,00</td>
                  </tr>
                  <tr className="border-t hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">Aluguer de Escritório</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">05/05/2023</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                        Despesa
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-red-600">-€1.200,00</td>
                  </tr>
                  <tr className="border-t hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">Honorários - Consultoria</td>
                    <td className="px-4 py-3">145/2023</td>
                    <td className="px-4 py-3">03/05/2023</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                        Receita
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-green-600">€1.800,00</td>
                  </tr>
                  <tr className="border-t hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">Salários</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">30/04/2023</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                        Despesa
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-red-600">-€4.500,00</td>
                  </tr>
                  <tr className="border-t hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">Honorários - Caso XYZ</td>
                    <td className="px-4 py-3">098/2023</td>
                    <td className="px-4 py-3">28/04/2023</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                        Receita
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-green-600">€3.200,00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Financials;
