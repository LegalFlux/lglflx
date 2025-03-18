
/**
 * Tipos específicos para o sistema LexFlow - Gestão Jurídica em Portugal
 */

/**
 * Representa os tipos de tribunais em Portugal
 * @typedef {string} TribunalType
 */
export type TribunalType = 
  | 'tribunal_primeira_instancia' 
  | 'tribunal_relacao' 
  | 'supremo_tribunal_justica' 
  | 'tribunal_constitucional'
  | 'tribunal_administrativo'
  | 'tribunal_fiscal'
  | 'julgado_paz'
  | 'tribunal_trabalho'
  | 'tribunal_maritimo'
  | 'tribunal_propriedade_intelectual'
  | 'tribunal_concorrencia'
  | 'tribunal_execucao_penas'
  | 'conservatoria'
  | 'notario'
  | 'other';

/**
 * Representa os tipos de processos jurídicos em Portugal
 * @typedef {string} ProcessoType
 */
export type ProcessoType = 
  | 'acao_civil' 
  | 'processo_penal' 
  | 'processo_trabalho' 
  | 'processo_administrativo'
  | 'processo_fiscal'
  | 'processo_familia'
  | 'inventario'
  | 'execucao'
  | 'providencia_cautelar'
  | 'recurso'
  | 'insolvencia'
  | 'mediacao'
  | 'arbitragem'
  | 'other';

/**
 * Representa as funções dos utilizadores do sistema
 * @typedef {string} UserRole
 */
export type UserRole = 
  | 'administrador' 
  | 'advogado_senior' 
  | 'advogado' 
  | 'assistente'
  | 'cliente';

/**
 * Representa os estados de uma tarefa no sistema
 * @typedef {string} EstadoTarefa
 */
export type EstadoTarefa = 
  | 'pendente' 
  | 'em_andamento' 
  | 'concluida' 
  | 'bloqueada'
  | 'cancelada';

/**
 * Representa os níveis de prioridade
 * @typedef {string} Prioridade
 */
export type Prioridade = 
  | 'baixa' 
  | 'media' 
  | 'alta' 
  | 'urgente';

/**
 * Representa os estados de um processo
 * @typedef {string} EstadoProcesso
 */
export type EstadoProcesso = 
  | 'ativo' 
  | 'suspenso' 
  | 'arquivado' 
  | 'encerrado'
  | 'recurso'
  | 'aguardando_decisao';

/**
 * Representa os tipos de documentos jurídicos específicos de Portugal
 * @typedef {string} TipoDocumentoJuridico
 */
export type TipoDocumentoJuridico = 
  | 'peticao_inicial' 
  | 'contestacao' 
  | 'recurso' 
  | 'alegacoes'
  | 'procuracao'
  | 'notificacao'
  | 'sentenca'
  | 'acordao'
  | 'contrato'
  | 'escritura'
  | 'certidao'
  | 'despacho'
  | 'parecer'
  | 'reclamacao'
  | 'requerimento'
  | 'relatorio'
  | 'outro';

/**
 * Interface para os planos de subscrição 
 * @interface Plano
 */
export interface Plano {
  /** Identificador único do plano */
  id: string;
  /** Nome do plano */
  nome: string;
  /** Descrição do plano */
  descricao?: string;
  /** Preço mensal do plano em euros */
  preco: number;
  /** Intervalo de cobrança do plano */
  intervalo_cobranca: 'mensal' | 'trimestral' | 'semestral' | 'anual';
  /** Limite de casos que podem ser geridos com este plano */
  limite_casos?: number;
  /** Limite de armazenamento em MB */
  limite_armazenamento?: number;
  /** Data de criação do plano */
  created_at?: string;
  /** Data da última atualização do plano */
  updated_at?: string;
}

/**
 * Interface para as assinaturas dos utilizadores
 * @interface Assinatura
 */
export interface Assinatura {
  /** Identificador único da assinatura */
  id: string;
  /** ID do utilizador */
  user_id: string;
  /** ID do plano */
  plano_id: string;
  /** Estado atual da assinatura */
  estado: 'ativa' | 'cancelada' | 'expirada' | 'pendente' | 'teste';
  /** Data de início da assinatura */
  data_inicio: string;
  /** Data de término da assinatura */
  data_termino?: string;
  /** Método de pagamento usado */
  metodo_pagamento?: string;
  /** ID do pagamento no sistema externo (Stripe, PayPal, etc.) */
  id_pagamento_externo?: string;
  /** Indica se está em período de teste */
  periodo_teste: boolean;
  /** Data do próximo pagamento */
  data_proximo_pagamento?: string;
  /** Data de criação do registo */
  created_at?: string;
  /** Data da última atualização */
  updated_at?: string;
}

/**
 * Interface para os registos de pagamentos
 * @interface Pagamento
 */
export interface Pagamento {
  /** Identificador único do pagamento */
  id: string;
  /** ID da assinatura relacionada */
  assinatura_id: string;
  /** Valor do pagamento em euros */
  valor: number;
  /** Data do pagamento */
  data_pagamento: string;
  /** Método usado para o pagamento */
  metodo: 'cartao' | 'paypal' | 'transferencia' | 'bitcoin' | 'outro';
  /** Estado do pagamento */
  estado: 'processado' | 'pendente' | 'falhou' | 'reembolsado';
  /** Referência externa do pagamento */
  referencia_externa?: string;
  /** Data de criação do registo */
  created_at?: string;
}

/**
 * Interface para as permissões dos assistentes
 * @interface PermissaoAssistente
 */
export interface PermissaoAssistente {
  /** Identificador único da permissão */
  id: string;
  /** ID do assistente */
  assistente_id: string;
  /** ID do advogado que concedeu a permissão */
  advogado_id: string;
  /** Permissão para editar documentos */
  pode_editar_documentos: boolean;
  /** Permissão para ver dados financeiros */
  pode_ver_financas: boolean;
  /** Permissão para criar tarefas */
  pode_criar_tarefas: boolean;
  /** Permissão para ver todos os casos do advogado */
  pode_ver_todos_casos: boolean;
  /** Data de criação do registo */
  created_at?: string;
  /** Data da última atualização */
  updated_at?: string;
}

/**
 * Interface para configurações do sistema
 * @interface SystemConfig
 */
export interface SystemConfig {
  /** Nome do escritório */
  escritorioNome: string;
  /** Logotipo do escritório */
  escritorioLogo?: string;
  /** Moeda utilizada (padrão: EUR) */
  moeda: 'EUR';
  /** Cor primária do tema */
  corPrimaria?: string;
  /** IVA padrão */
  taxaIVA: number;
  /** Email para notificações do sistema */
  emailNotificacoes?: string;
  /** Número de dias para alerta de prazos */
  diasAlertaPrazos: number;
  /** Ativar backup automático */
  backupAutomatico: boolean;
  /** Frequência de backup (em dias) */
  frequenciaBackup?: number;
}
