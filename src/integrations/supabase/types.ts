import { Database as DatabaseGenerated } from '@/lib/database.types';

// ==================== TIPOS BASE ====================
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

// ==================== INTERFACES DAS TABELAS ====================
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

// ==================== TIPOS DO SUPABASE ====================
export interface Database extends DatabaseGenerated {
  // Extensão adicional se necessário
}

type PublicSchema = Database['public'];

// ==================== TIPOS PARA OPERAÇÕES CRUD ====================
export type Tables<T extends keyof PublicSchema['Tables']> = PublicSchema['Tables'][T]['Row'];
export type TablesInsert<T extends keyof PublicSchema['Tables']> = PublicSchema['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof PublicSchema['Tables']> = PublicSchema['Tables'][T]['Update'];
export type Relationships<T extends keyof PublicSchema['Tables']> = PublicSchema['Tables'][T]['Relationships'];

// ==================== TIPOS PARA ENUMS ====================
export type Enums<T extends keyof PublicSchema['Enums']> = PublicSchema['Enums'][T];

// ==================== TIPOS PARA FUNÇÕES ====================
export type DbFunction = {
  Args: Record<string, unknown>;
  Returns: unknown;
};

// ==================== TIPOS PARA FILTROS ====================
export type FilterOperator =
  | 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte'
  | 'like' | 'ilike' | 'is' | 'in' | 'cs' | 'cd'
  | 'sl' | 'sr' | 'nxl' | 'nxr' | 'adj' | 'ov'
  | 'fts' | 'plfts' | 'phfts' | 'wfts';

export type QueryFilter<T> = {
  column: keyof T;
  operator: FilterOperator;
  value: unknown;
};

// ==================== TIPOS PARA QUERIES ====================
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

// ==================== TIPOS PARA PAGINAÇÃO ====================
export type PaginatedResult<T> = {
  data: T[];
  count: number;
  page: number;
  perPage: number;
  totalPages: number;
};

// ==================== EXPORTAÇÕES ====================
export type {
  Database,
  PublicSchema,
  Tables,
  TablesInsert,
  TablesUpdate,
  Relationships,
  Enums,
  DbFunction,
  FilterOperator,
  QueryFilter,
  QueryOptions,
  PaginatedResult
};
