
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Plano, Assinatura, AssinaturaDisplay } from '@/types/subscription';
import { toast } from '@/hooks/use-toast';

export const useSubscription = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [assinaturaAtual, setAssinaturaAtual] = useState<AssinaturaDisplay | null>(null);

  // Buscar planos disponíveis
  const fetchPlanos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('planos')
        .select('*')
        .eq('ativo', true)
        .order('preco_mensal', { ascending: true });

      if (error) {
        console.error('Erro ao buscar planos:', error);
        throw error;
      }

      if (data) {
        console.log('Planos obtidos:', data);
        setPlanos(data as Plano[]);
      } else {
        console.log('Nenhum plano encontrado');
        setPlanos([]);
      }
    } catch (error) {
      console.error('Erro ao buscar planos:', error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  // Buscar assinatura atual do utilizador
  const fetchAssinaturaAtual = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('assinaturas')
        .select(`
          *,
          plano:planos(*)
        `)
        .eq('user_id', user.id)
        .in('estado', ['ativa', 'trial'])
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Erro ao buscar assinatura:', error);
        throw error;
      }

      if (data) {
        console.log('Assinatura obtida:', data);
        
        // Calcular dias restantes para assinaturas não vitalícias
        let diasRestantes: number | undefined;
        let percentualRestante: number | undefined;

        if (data.data_fim) {
          const hoje = new Date();
          const dataFim = new Date(data.data_fim);
          const dataInicio = new Date(data.data_inicio);
          
          const diffFimHoje = dataFim.getTime() - hoje.getTime();
          diasRestantes = Math.ceil(diffFimHoje / (1000 * 3600 * 24));
          
          const duracaoTotal = dataFim.getTime() - dataInicio.getTime();
          const tempoDecorrido = hoje.getTime() - dataInicio.getTime();
          
          percentualRestante = 100 - Math.min(100, Math.max(0, (tempoDecorrido / duracaoTotal) * 100));
        }

        // Garantir que periodo_faturacao é 'mensal' ou 'anual'
        const periodoFaturacao = data.periodo_faturacao === 'anual' ? 'anual' : 'mensal';
        
        const assinaturaDisplay: AssinaturaDisplay = {
          ...data,
          diasRestantes,
          percentualRestante,
          periodo_faturacao: periodoFaturacao,
          plano: data.plano as Plano
        };
        
        setAssinaturaAtual(assinaturaDisplay);
      } else {
        console.log('Nenhuma assinatura ativa encontrada');
        setAssinaturaAtual(null);
      }
    } catch (error) {
      console.error('Erro ao buscar assinatura:', error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  // Inscrever num plano
  const subscreverPlano = async (planoId: string, periodoFaturacao: 'mensal' | 'anual' = 'mensal') => {
    if (!user) {
      toast({
        title: 'Erro',
        description: 'É necessário estar autenticado para subscrever um plano',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      
      // Verificar se já existe uma assinatura ativa
      const { data: assinaturasAtivas } = await supabase
        .from('assinaturas')
        .select('*')
        .eq('user_id', user.id)
        .in('estado', ['ativa', 'trial']);
      
      // Se existir, marcar como cancelada
      if (assinaturasAtivas && assinaturasAtivas.length > 0) {
        const atualizacoes = assinaturasAtivas.map(async (assinatura) => {
          await supabase
            .from('assinaturas')
            .update({ estado: 'cancelada' })
            .eq('id', assinatura.id);
        });
        
        await Promise.all(atualizacoes);
      }
      
      // Calcular data de fim com base no período de faturação
      const hoje = new Date();
      const dataFim = new Date(hoje);
      if (periodoFaturacao === 'mensal') {
        dataFim.setMonth(dataFim.getMonth() + 1);
      } else {
        dataFim.setFullYear(dataFim.getFullYear() + 1);
      }
      
      // Criar nova assinatura
      const { data, error } = await supabase
        .from('assinaturas')
        .insert({
          user_id: user.id,
          plano_id: planoId,
          periodo_faturacao: periodoFaturacao,
          data_inicio: hoje.toISOString(),
          data_fim: dataFim.toISOString(),
          estado: 'ativa',
          trial: false
        })
        .select()
        .single();
      
      if (error) {
        console.error('Erro ao subscrever plano:', error);
        throw error;
      }
      
      toast({
        title: 'Sucesso',
        description: 'Plano subscrito com sucesso',
      });
      
      // Atualizar assinatura atual
      await fetchAssinaturaAtual();
      
      return data;
    } catch (error) {
      console.error('Erro ao subscrever plano:', error);
      setError(error as Error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao subscrever o plano',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Cancelar assinatura atual
  const cancelarAssinatura = async () => {
    if (!user || !assinaturaAtual) {
      toast({
        title: 'Erro',
        description: 'Não há assinatura ativa para cancelar',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('assinaturas')
        .update({ estado: 'cancelada' })
        .eq('id', assinaturaAtual.id);
      
      if (error) {
        console.error('Erro ao cancelar assinatura:', error);
        throw error;
      }
      
      toast({
        title: 'Sucesso',
        description: 'Assinatura cancelada com sucesso',
      });
      
      // Atualizar assinatura atual
      await fetchAssinaturaAtual();
    } catch (error) {
      console.error('Erro ao cancelar assinatura:', error);
      setError(error as Error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao cancelar a assinatura',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Iniciar período de teste
  const iniciarTrial = async (planoId: string) => {
    if (!user) {
      toast({
        title: 'Erro',
        description: 'É necessário estar autenticado para iniciar um período de teste',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      
      // Verificar se já utilizou trial antes
      const { data: assinaturasAnteriores } = await supabase
        .from('assinaturas')
        .select('*')
        .eq('user_id', user.id)
        .eq('trial', true);
      
      if (assinaturasAnteriores && assinaturasAnteriores.length > 0) {
        toast({
          title: 'Aviso',
          description: 'Você já utilizou o período de teste anteriormente',
          variant: 'destructive',
        });
        return null;
      }
      
      // Cancelar qualquer assinatura ativa atual
      const { data: assinaturasAtivas } = await supabase
        .from('assinaturas')
        .select('*')
        .eq('user_id', user.id)
        .in('estado', ['ativa', 'trial']);
      
      if (assinaturasAtivas && assinaturasAtivas.length > 0) {
        const atualizacoes = assinaturasAtivas.map(async (assinatura) => {
          await supabase
            .from('assinaturas')
            .update({ estado: 'cancelada' })
            .eq('id', assinatura.id);
        });
        
        await Promise.all(atualizacoes);
      }
      
      // Calcular data de fim do trial (15 dias)
      const hoje = new Date();
      const trialEndDate = new Date(hoje);
      trialEndDate.setDate(trialEndDate.getDate() + 15);
      
      // Criar nova assinatura de trial
      const { data, error } = await supabase
        .from('assinaturas')
        .insert({
          user_id: user.id,
          plano_id: planoId,
          periodo_faturacao: 'mensal',
          data_inicio: hoje.toISOString(),
          data_fim: trialEndDate.toISOString(),
          estado: 'trial',
          trial: true,
          trial_end_date: trialEndDate.toISOString()
        })
        .select()
        .single();
      
      if (error) {
        console.error('Erro ao iniciar trial:', error);
        throw error;
      }
      
      toast({
        title: 'Sucesso',
        description: 'Período de teste iniciado com sucesso',
      });
      
      // Atualizar assinatura atual
      await fetchAssinaturaAtual();
      
      return data;
    } catch (error) {
      console.error('Erro ao iniciar trial:', error);
      setError(error as Error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao iniciar o período de teste',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Carregar dados iniciais
  useEffect(() => {
    fetchPlanos();
  }, []);

  // Carregar assinatura quando o utilizador mudar
  useEffect(() => {
    if (user) {
      fetchAssinaturaAtual();
    } else {
      setAssinaturaAtual(null);
    }
  }, [user]);

  return {
    loading,
    error,
    planos,
    assinaturaAtual,
    fetchPlanos,
    fetchAssinaturaAtual,
    subscreverPlano,
    cancelarAssinatura,
    iniciarTrial
  };
};

