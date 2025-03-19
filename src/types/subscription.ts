
export interface Plano {
  id: string;
  nome: string;
  descricao: string | null;
  preco_mensal: number;
  preco_anual: number;
  limite_usuarios: number;
  recursos: string[];
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Assinatura {
  id: string;
  user_id: string;
  plano_id: string;
  data_inicio: string;
  data_fim: string | null;
  periodo_faturacao: 'mensal' | 'anual';
  estado: 'ativa' | 'pendente' | 'cancelada' | 'expirada' | 'trial';
  metodo_pagamento: string | null;
  id_transacao: string | null;
  trial: boolean;
  trial_end_date: string | null;
  created_at: string;
  updated_at: string;
  plano?: Plano;
}

export interface AssinaturaDisplay extends Assinatura {
  diasRestantes?: number;
  percentualRestante?: number;
}
