export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      caso_assistentes: {
        Row: {
          assistente_id: string
          caso_id: string
          created_at: string
          id: string
        }
        Insert: {
          assistente_id: string
          caso_id: string
          created_at?: string
          id?: string
        }
        Update: {
          assistente_id?: string
          caso_id?: string
          created_at?: string
          id?: string
        }
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
        Row: {
          advogado_id: string
          cliente_id: string
          created_at: string
          data_conclusao: string | null
          data_inicio: string
          data_prevista: string | null
          descricao: string | null
          estado: string
          id: string
          juiz: string | null
          jurisdicao: string | null
          numero: string | null
          prioridade: string
          proxima_audiencia: string | null
          tipo: string
          titulo: string
          tribunal: string | null
          updated_at: string
          valor: number | null
        }
        Insert: {
          advogado_id: string
          cliente_id: string
          created_at?: string
          data_conclusao?: string | null
          data_inicio?: string
          data_prevista?: string | null
          descricao?: string | null
          estado?: string
          id?: string
          juiz?: string | null
          jurisdicao?: string | null
          numero?: string | null
          prioridade?: string
          proxima_audiencia?: string | null
          tipo: string
          titulo: string
          tribunal?: string | null
          updated_at?: string
          valor?: number | null
        }
        Update: {
          advogado_id?: string
          cliente_id?: string
          created_at?: string
          data_conclusao?: string | null
          data_inicio?: string
          data_prevista?: string | null
          descricao?: string | null
          estado?: string
          id?: string
          juiz?: string | null
          jurisdicao?: string | null
          numero?: string | null
          prioridade?: string
          proxima_audiencia?: string | null
          tipo?: string
          titulo?: string
          tribunal?: string | null
          updated_at?: string
          valor?: number | null
        }
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
      documentos: {
        Row: {
          arquivado: boolean | null
          caminho: string
          carregado_em: string
          carregado_por: string
          caso_id: string | null
          cliente_id: string | null
          created_at: string
          data_expiracao: string | null
          descricao: string | null
          estado_assinatura: string | null
          id: string
          modelo: boolean | null
          nome: string
          tags: string[] | null
          tamanho: number
          tipo: string
          ultima_modificacao: string | null
          updated_at: string
          versao: number | null
        }
        Insert: {
          arquivado?: boolean | null
          caminho: string
          carregado_em?: string
          carregado_por: string
          caso_id?: string | null
          cliente_id?: string | null
          created_at?: string
          data_expiracao?: string | null
          descricao?: string | null
          estado_assinatura?: string | null
          id?: string
          modelo?: boolean | null
          nome: string
          tags?: string[] | null
          tamanho: number
          tipo: string
          ultima_modificacao?: string | null
          updated_at?: string
          versao?: number | null
        }
        Update: {
          arquivado?: boolean | null
          caminho?: string
          carregado_em?: string
          carregado_por?: string
          caso_id?: string | null
          cliente_id?: string | null
          created_at?: string
          data_expiracao?: string | null
          descricao?: string | null
          estado_assinatura?: string | null
          id?: string
          modelo?: boolean | null
          nome?: string
          tags?: string[] | null
          tamanho?: number
          tipo?: string
          ultima_modificacao?: string | null
          updated_at?: string
          versao?: number | null
        }
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
      profiles: {
        Row: {
          advogado_id: string | null
          apelido: string
          created_at: string
          email: string
          foto_url: string | null
          id: string
          nome: string
          role: Database["public"]["Enums"]["user_role"]
          telefone: string | null
          updated_at: string
        }
        Insert: {
          advogado_id?: string | null
          apelido: string
          created_at?: string
          email: string
          foto_url?: string | null
          id: string
          nome: string
          role?: Database["public"]["Enums"]["user_role"]
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          advogado_id?: string | null
          apelido?: string
          created_at?: string
          email?: string
          foto_url?: string | null
          id?: string
          nome?: string
          role?: Database["public"]["Enums"]["user_role"]
          telefone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_advogado_id_fkey"
            columns: ["advogado_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tarefas: {
        Row: {
          atribuido_a: string | null
          atribuido_por: string
          caso_id: string | null
          created_at: string
          data_limite: string | null
          descricao: string | null
          estado: string
          id: string
          prioridade: string
          titulo: string
          updated_at: string
        }
        Insert: {
          atribuido_a?: string | null
          atribuido_por: string
          caso_id?: string | null
          created_at?: string
          data_limite?: string | null
          descricao?: string | null
          estado?: string
          id?: string
          prioridade?: string
          titulo: string
          updated_at?: string
        }
        Update: {
          atribuido_a?: string | null
          atribuido_por?: string
          caso_id?: string | null
          created_at?: string
          data_limite?: string | null
          descricao?: string | null
          estado?: string
          id?: string
          prioridade?: string
          titulo?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tarefas_atribuido_a_fkey"
            columns: ["atribuido_a"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tarefas_atribuido_por_fkey"
            columns: ["atribuido_por"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tarefas_caso_id_fkey"
            columns: ["caso_id"]
            isOneToOne: false
            referencedRelation: "casos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
      user_can_access_case:
        | {
            Args: Record<PropertyKey, never>
            Returns: boolean
          }
        | {
            Args: {
              case_id: string
            }
            Returns: boolean
          }
    }
    Enums: {
      user_role: "administrador" | "advogado" | "assistente" | "cliente"
    }
    CompositeTypes: {
      [_ in never]: never
    }
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
