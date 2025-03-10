
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
  | 'advogado' 
  | 'solicitador' 
  | 'agente_execucao' 
  | 'estagiario'
  | 'assistente'
  | 'gestor'
  | 'administrador'
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
