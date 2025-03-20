export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Enum for user roles
export enum UserRole {
  Administrador = "administrador",
  Advogado = "advogado",
  Assistente = "assistente",
  Cliente = "cliente",
  Admin = "admin",
}

// Enum for task priority
export enum TaskPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

// Interface for common fields in database tables
interface CommonFields {
  created_at?: string | null
  updated_at?: string | null
}

// Table definition interfaces
export interface Assinaturas extends CommonFields {
  data_fim?: string | null
  data_inicio: string
  estado: string
  id: string
  id_transacao?: string | null
  metodo_pagamento?: string | null
  periodo_faturacao: string
  plano_id: string
  trial?: boolean
  trial_end_date?: string | null
  user_id: string
}

export interface CasoAssistentes extends CommonFields {
  assistente_id: string
  caso_id: string
  id: string
}

export interface Casos extends CommonFields {
  advogado_id: string
  cliente_id: string
  data_conclusao?: string | null
  data_inicio: string
  data_prevista?: string | null
  descricao?: string | null
  estado: string
  id: string
  juiz?: string | null
  jurisdicao?: string | null
  numero?: string | null
  prioridade: TaskPriority
  proxima_audiencia?: string | null
  tipo: string
  titulo: string
  tribunal?: string | null
  valor?: number | null
}

export interface Comunicacoes extends CommonFields {
  caso_id?: string | null
  id: string
  mensagem: string
  remetente_id: string
}

export interface Documentos extends CommonFields {
  arquivado?: boolean | null
  caminho: string
  carregado_por: string
  caso_id?: string | null
  cliente_id?: string | null
  data_expiracao?: string | null
  descricao?: string | null
  estado_assinatura?: string | null
  id: string
  modelo?: boolean | null
  nome: string
  tags?: string[] | null
  tamanho: number
  tipo: string
  ultima_modificacao?: string | null
  versao?: number | null
}

// Database schema interface
export interface Database {
  public: {
    Tables: {
      assinaturas: {
        Row: Assinaturas
        Insert: Partial<Assinaturas>
        Update: Partial<Assinaturas>
        Relationships: [
          {
            foreignKeyName: "assinaturas_plano_id_fkey"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos"
            referencedColumns: ["id"]
          },
        ]
      }
      caso_assistentes: {
        Row: CasoAssistentes
        Insert: Partial<CasoAssistentes>
        Update: Partial<CasoAssistentes>
        Relationships: [
          {
            foreignKeyName: "caso_assistentes_assistente_id_fkey"
            columns: ["assistente_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "caso_assistentes_caso_id_fkey"
            columns: ["caso_id"]
            isOneToOne: false
            referencedRelation: "casos"
            referencedColumns: ["id"]
          },
        ]
      }
      casos: {
        Row: Casos
        Insert: Partial<Casos>
        Update: Partial<Casos>
        Relationships: [
          {
            foreignKeyName: "casos_advogado_id_fkey"
            columns: ["advogado_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "casos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comunicacoes: {
        Row: Comunicacoes
        Insert: Partial<Comunicacoes>
        Update: Partial<Comunicacoes>
        Relationships: [
          {
            foreignKeyName: "comunicacoes_caso_id_fkey"
            columns: ["caso_id"]
            isOneToOne: false
            referencedRelation: "casos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comunicacoes_remetente_id_fkey"
            columns: ["remetente_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      documentos: {
        Row: Documentos
        Insert: Partial<Documentos>
        Update: Partial<Documentos>
        Relationships: [
          {
            foreignKeyName: "documentos_carregado_por_fkey"
            columns: ["carregado_por"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documentos_caso_id_fkey"
            columns: ["caso_id"]
            isOneToOne: false
            referencedRelation: "casos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documentos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      // Define other tables similarly...
    }
    Enums: {
      user_role: UserRole
      // Define other enums if needed...
    }
    // Define other schema properties if needed...
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
