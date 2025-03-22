import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Clock, DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Plus, Filter } from 'lucide-react';
import { ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

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

const Finance = () => {
  return (
    <div className="container py-6 space-y-6">
      <PageHeader title="Finanças" description="Gerencie faturamento, honorários e análise financeira" />

      <Tabs defaultValue="faturacao" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="faturacao">Faturação</TabsTrigger>
          <TabsTrigger value="honorarios">Honorários</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faturacao" className="space-y-4"> {/* Conteúdo original de Faturação */} </TabsContent>
        <TabsContent value="honorarios" className="space-y-4"> {/* Conteúdo original de Honorários */} </TabsContent>
      </Tabs>
      
      {/* Nova seção de Análise Financeira */}
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
      </div>

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
      </div>
    </div>
  );
};

export default Finance;
