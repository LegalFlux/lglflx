// =============== TIPOS BASE ===============
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

// =============== INTERFACES DAS TABELAS ===============
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

// =============== TIPOS DO SUPABASE ===============
export interface Database {
  public: {
    Tables: {
      assinaturas: {
        Row: Assinaturas;
        Insert: Partial<Assinaturas>;
        Update: Partial<Assinaturas>;
        Relationships: [
          {
            foreignKeyName: "assinaturas_plano_id_fkey";
            columns: ["plano_id"];
            referencedRelation: "planos";
            referencedColumns: ["id"];
          }
        ];
      };
      caso_assistentes: {
        Row: CasoAssistentes;
        Insert: Partial<CasoAssistentes>;
        Update: Partial<CasoAssistentes>;
        Relationships: [
          {
            foreignKeyName: "caso_assistentes_assistente_id_fkey";
            columns: ["assistente_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "caso_assistentes_caso_id_fkey";
            columns: ["caso_id"];
            referencedRelation: "casos";
            referencedColumns: ["id"];
          }
        ];
      };
      casos: {
        Row: Casos;
        Insert: Partial<Casos>;
        Update: Partial<Casos>;
        Relationships: [
          {
            foreignKeyName: "casos_advogado_id_fkey";
            columns: ["advogado_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "casos_cliente_id_fkey";
            columns: ["cliente_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      comunicacoes: {
        Row: Comunicacoes;
        Insert: Partial<Comunicacoes>;
        Update: Partial<Comunicacoes>;
        Relationships: [
          {
            foreignKeyName: "comunicacoes_caso_id_fkey";
            columns: ["caso_id"];
            referencedRelation: "casos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comunicacoes_remetente_id_fkey";
            columns: ["remetente_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      documentos: {
        Row: Documentos;
        Insert: Partial<Documentos>;
        Update: Partial<Documentos>;
        Relationships: [
          {
            foreignKeyName: "documentos_carregado_por_fkey";
            columns: ["carregado_por"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "documentos_caso_id_fkey";
            columns: ["caso_id"];
            referencedRelation: "casos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "documentos_cliente_id_fkey";
            columns: ["cliente_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Enums: {
      user_role: UserRole;
    };
  };
}

// =============== TIPOS PARA OPERAÇÕES ===============
type PublicSchema = Database['public'];

export type Tables<T extends keyof PublicSchema['Tables']> = PublicSchema['Tables'][T]['Row'];
export type TablesInsert<T extends keyof PublicSchema['Tables']> = PublicSchema['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof PublicSchema['Tables']> = PublicSchema['Tables'][T]['Update'];
export type Relationships<T extends keyof PublicSchema['Tables']> = PublicSchema['Tables'][T]['Relationships'];
export type Enums<T extends keyof PublicSchema['Enums']> = PublicSchema['Enums'][T];
