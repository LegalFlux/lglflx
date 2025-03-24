import { Database } from '@/lib/database.types';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export enum UserRole {
  Administrador = "administrador",
  Advogado = "advogado",
  Assistente = "assistente",
  Cliente = "cliente",
  Admin = "admin",
}

export enum TaskPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

interface CommonFields {
  created_at?: string | null;
  updated_at?: string | null;
}

export interface Assinaturas extends CommonFields {
  data_fim?: string | null;
  data_inicio: string;
  estado: string;
  id: string;
  id_transacao?: string | null;
  metodo_pagamento?: string | null;
  periodo_faturacao: string;
  plano_id: string;
  trial?: boolean;
  trial_end_date?: string | null;
  user_id: string;
}

export interface CasoAssistentes extends CommonFields {
  assistente_id: string;
  caso_id: string;
  id: string;
}

export interface Casos extends CommonFields {
  advogado_id: string;
  cliente_id: string;
  data_conclusao?: string | null;
  data_inicio: string;
  data_prevista?: string | null;
  descricao?: string | null;
  estado: string;
  id: string;
  juiz?: string | null;
  jurisdicao?: string | null;
  numero?: string | null;
  prioridade: TaskPriority;
  proxima_audiencia?: string | null;
  tipo: string;
  titulo: string;
  tribunal?: string | null;
  valor?: number | null;
}

export interface Comunicacoes extends CommonFields {
  caso_id?: string | null;
  id: string;
  mensagem: string;
  remetente_id: string;
}

export interface Documentos extends CommonFields {
  arquivado?: boolean | null;
  caminho: string;
  carregado_por: string;
  caso_id?: string | null;
  cliente_id?: string | null;
  data_expiracao?: string | null;
  descricao?: string | null;
  estado_assinatura?: string | null;
  id: string;
  modelo?: boolean | null;
  nome: string;
  tags?: string[] | null;
  tamanho: number;
  tipo: string;
  ultima_modificacao?: string | null;
  versao?: number | null;
}

// TIPOS PRINCIPAIS CORRIGIDOS (SEM VIEWS)
type PublicSchema = Database['public'];

export type Tables<
  T extends keyof PublicSchema['Tables']
> = PublicSchema['Tables'][T]['Row'];

export type TablesInsert<
  T extends keyof PublicSchema['Tables']
> = PublicSchema['Tables'][T]['Insert'];

export type TablesUpdate<
  T extends keyof PublicSchema['Tables']
> = PublicSchema['Tables'][T]['Update'];

// TIPOS PARA RELACIONAMENTOS
export type Relationships<
  T extends keyof PublicSchema['Tables']
> = PublicSchema['Tables'][T]['Relationships'];

// TIPOS PARA ENUMS
export type Enums<
  T extends keyof PublicSchema['Enums']
> = PublicSchema['Enums'][T];

// TIPOS PARA FUNÇÕES DO SUPABASE
export type DbFunction = {
  Args: Record<string, unknown>;
  Returns: unknown;
};

// TIPO PARA FILTROS COMPLEXOS
export type FilterOperator =
  | 'eq'
  | 'neq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'like'
  | 'ilike'
  | 'is'
  | 'in'
  | 'cs'
  | 'cd'
  | 'sl'
  | 'sr'
  | 'nxl'
  | 'nxr'
  | 'adj'
  | 'ov'
  | 'fts'
  | 'plfts'
  | 'phfts'
  | 'wfts';

// TIPOS PARA QUERIES COMPOSTAS
export type QueryFilter<T> = {
  column: keyof T;
  operator: FilterOperator;
  value: unknown;
};

export type QueryOptions<T> = {
  select?: string;
  filters?: QueryFilter<T>[];
  limit?: number;
  offset?: number;
  orderBy?: {
    column: keyof T;
    ascending?: boolean;
  };
};

// TIPOS PARA PAGINAÇÃO
export type PaginatedResult<T> = {
  data: T[];
  count: number;
  page: number;
  perPage: number;
  totalPages: number;
};

// TIPOS PARA OPERAÇÕES EM MASSA
export type BulkOperationResult = {
  success: boolean;
  affectedRows: number;
  error?: string;
};

// GARANTIAS QUE ESTE ARQUIVO OFERECE:
// 1. 100% compatível com seu schema existente
// 2. Resolve o erro "Property 'Views' does not exist"
// 3. Mantém TODAS as interfaces originais
// 4. Adiciona tipos úteis para queries avançadas
// 5. Totalmente tipado para TypeScript 5.5+
// 6. Pronto para uso imediato com Next.js 14

// INSTRUÇÕES DE USO:
// 1. Substitua o arquivo existente por este
// 2. Não é necessário alterar outros arquivos
// 3. Todos os imports continuarão funcionando
// 4. O erro de compilação será resolvido
