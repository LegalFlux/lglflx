/**
 * Tipos específicos para o sistema LexFlow - Gestão Jurídica em Portugal
 */

// Tipos de tribunais em Portugal
export enum TribunalType {
  PRIMEIRA_INSTANCIA = 'tribunal_primeira_instancia',
  RELACAO = 'tribunal_relacao',
  SUPREMO = 'supremo_tribunal_justica',
  CONSTITUCIONAL = 'tribunal_constitucional',
  ADMINISTRATIVO = 'tribunal_administrativo',
  FISCAL = 'tribunal_fiscal',
  JULGADO_PAZ = 'julgado_paz',
  TRABALHO = 'tribunal_trabalho',
  MARITIMO = 'tribunal_maritimo',
  PROPRIEDADE_INTELECTUAL = 'tribunal_propriedade_intelectual',
  CONCORRENCIA = 'tribunal_concorrencia',
  EXECUCAO_PENAS = 'tribunal_execucao_penas',
  CONSERVATORIA = 'conservatoria',
  NOTARIO = 'notario',
  OTHER = 'other'
}

// Tipos de processos jurídicos
export enum ProcessoType {
  ACAO_CIVIL = 'acao_civil',
  PROCESSO_PENAL = 'processo_penal',
  PROCESSO_TRABALHO = 'processo_trabalho',
  PROCESSO_ADMINISTRATIVO = 'processo_administrativo',
  PROCESSO_FISCAL = 'processo_fiscal',
  PROCESSO_FAMILIA = 'processo_familia',
  INVENTARIO = 'inventario',
  EXECUCAO = 'execucao',
  PROVIDENCIA_CAUTELAR = 'providencia_cautelar',
  RECURSO = 'recurso',
  INSOLVENCIA = 'insolvencia',
  MEDIACAO = 'mediacao',
  ARBITRAGEM = 'arbitragem',
  OTHER = 'other'
}

// Funções dos utilizadores
export enum UserRole {
  ADMINISTRADOR = 'administrador',
  ADVOGADO_SENIOR = 'advogado_senior',
  ADVOGADO = 'advogado',
  ASSISTENTE = 'assistente',
  CLIENTE = 'cliente'
}

// Estados das tarefas
export enum EstadoTarefa {
  PENDENTE = 'pendente',
  EM_ANDAMENTO = 'em_andamento',
  CONCLUIDA = 'concluida',
  BLOQUEADA = 'bloqueada',
  CANCELADA = 'cancelada'
}

// Níveis de prioridade
export enum Prioridade {
  BAIXA = 'baixa',
  MEDIA = 'media',
  ALTA = 'alta',
  URGENTE = 'urgente'
}

// Estados do processo
export enum EstadoProcesso {
  ATIVO = 'ativo',
  SUSPENSO = 'suspenso',
  ARQUIVADO = 'arquivado',
  ENCERRADO = 'encerrado',
  RECURSO = 'recurso',
  AGUARDANDO_DECISAO = 'aguardando_decisao'
}

// Tipos de documentos jurídicos
export enum TipoDocumentoJuridico {
  PETICAO_INICIAL = 'peticao_inicial',
  CONTESTACAO = 'contestacao',
  RECURSO = 'recurso',
  ALEGACOES = 'alegacoes',
  PROCURACAO = 'procuracao',
  NOTIFICACAO = 'notificacao',
  SENTENCA = 'sentenca',
  ACORDAO = 'acordao',
  CONTRATO = 'contrato',
  ESCRITURA = 'escritura',
  CERTIDAO = 'certidao',
  DESPACHO = 'despacho',
  PARECER = 'parecer',
  RECLAMACAO = 'reclamacao',
  REQUERIMENTO = 'requerimento',
  RELATORIO = 'relatorio',
  OUTRO = 'outro'
}

// Interface para os planos de subscrição
export interface Plano {
  readonly id: string;
  nome: string;
  descricao?: string;
  preco: number;
  intervaloCobranca: 'mensal' | 'trimestral' | 'semestral' | 'anual';
  limiteCasos?: number;
  limiteArmazenamento?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

// Interface para assinaturas
export interface Assinatura {
  readonly id: string;
  userId: string;
  planoId: string;
  estado: 'ativa' | 'cancelada' | 'expirada' | 'pendente' | 'teste';
  dataInicio: string;
  dataTermino?: string;
  metodoPagamento?: string;
  idPagamentoExterno?: string;
  periodoTeste: boolean;
  dataProximoPagamento?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

// Interface para pagamentos
export interface Pagamento {
  readonly id: string;
  assinaturaId: string;
  valor: number;
  dataPagamento: string;
  metodo: 'cartao' | 'paypal' | 'transferencia' | 'bitcoin' | 'outro';
  estado: 'processado' | 'pendente' | 'falhou' | 'reembolsado';
  referenciaExterna?: string;
  readonly createdAt?: string;
}

// Interface para permissões dos assistentes
export interface PermissaoAssistente {
  readonly id: string;
  assistenteId: string;
  advogadoId: string;
  podeEditarDocumentos: boolean;
  podeVerFinancas: boolean;
  podeCriarTarefas: boolean;
  podeVerTodosCasos: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

// Interface para configurações do sistema
export interface SystemConfig {
  escritorioNome: string;
  escritorioLogo?: string;
  moeda: 'EUR';
  corPrimaria?: string;
  taxaIVA: number;
  emailNotificacoes?: string;
  diasAlertaPrazos: number;
  backupAutomatico: boolean;
  frequenciaBackup?: number;
}
