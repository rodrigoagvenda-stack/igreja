export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export type Database = {
  public: {
    Tables: {
      arq_noticias: {
        Row: {
          id:           string
          slug:         string
          titulo:       string
          resumo:       string | null
          conteudo:     string | null
          categoria:    string
          status:       "rascunho" | "revisao" | "publicado"
          destaque:     boolean
          imagem_url:   string | null
          autor_id:     string | null
          publicado_em: string | null
          created_at:   string
          updated_at:   string
        }
        Insert: Omit<Database["public"]["Tables"]["arq_noticias"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["arq_noticias"]["Insert"]>
      }
      arq_eventos: {
        Row: {
          id:         string
          titulo:     string
          descricao:  string | null
          local:      string | null
          categoria:  string
          inicio:     string
          fim:        string | null
          destaque:   boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["arq_eventos"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["arq_eventos"]["Insert"]>
      }
      arq_paroquias: {
        Row: {
          id:              string
          slug:            string
          nome:            string
          cidade:          string
          regiao_pastoral: "RP1" | "RP2" | "RP3" | "RP4"
          padroeiro:       string | null
          data_criacao:    string | null
          endereco:        string | null
          cep:             string | null
          telefone:        string | null
          email:           string | null
          site:            string | null
          ativa:           boolean
          created_at:      string
          updated_at:      string
        }
        Insert: Omit<Database["public"]["Tables"]["arq_paroquias"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["arq_paroquias"]["Insert"]>
      }
      arq_locais: {
        Row: {
          id:          string
          paroquia_id: string
          nome:        string
          tipo:        "Matriz" | "Capela"
          endereco:    string | null
          created_at:  string
        }
        Insert: Omit<Database["public"]["Tables"]["arq_locais"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["arq_locais"]["Insert"]>
      }
      arq_horarios_missa: {
        Row: {
          id:         string
          local_id:   string
          descricao:  string
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["arq_horarios_missa"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["arq_horarios_missa"]["Insert"]>
      }
      arq_padres: {
        Row: {
          id:          string
          nome:        string
          nascimento:  string | null
          ordenacao:   string | null
          paroquia_id: string | null
          foto_url:    string | null
          ativo:       boolean
          created_at:  string
          updated_at:  string
        }
        Insert: Omit<Database["public"]["Tables"]["arq_padres"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["arq_padres"]["Insert"]>
      }
      arq_diaconos: {
        Row: {
          id:          string
          nome:        string
          nascimento:  string | null
          ordenacao:   string | null
          paroquia_id: string | null
          foto_url:    string | null
          ativo:       boolean
          created_at:  string
          updated_at:  string
        }
        Insert: Omit<Database["public"]["Tables"]["arq_diaconos"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["arq_diaconos"]["Insert"]>
      }
      arq_seminaristas: {
        Row: {
          id:            string
          nome:          string
          nascimento:    string | null
          ano_formacao:  string
          paroquia_id:   string | null
          foto_url:      string | null
          ativo:         boolean
          created_at:    string
          updated_at:    string
        }
        Insert: Omit<Database["public"]["Tables"]["arq_seminaristas"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["arq_seminaristas"]["Insert"]>
      }
      arq_documentos: {
        Row: {
          id:           string
          slug:         string
          titulo:       string
          tipo:         "Decreto" | "Comunicado" | "Nomeação" | "Circular"
          arquivo_url:  string | null
          publicado_em: string
          created_at:   string
          updated_at:   string
        }
        Insert: Omit<Database["public"]["Tables"]["arq_documentos"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["arq_documentos"]["Insert"]>
      }
      arq_setores_pastorais: {
        Row: {
          id:          string
          slug:        string
          nome:        string
          descricao:   string | null
          coordenador: string | null
          email:       string | null
          telefone:    string | null
          ordem:       number
          created_at:  string
          updated_at:  string
        }
        Insert: Omit<Database["public"]["Tables"]["arq_setores_pastorais"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["arq_setores_pastorais"]["Insert"]>
      }
      arq_site_config: {
        Row: {
          id:         string
          chave:      string
          valor:      string | null
          descricao:  string | null
          updated_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["arq_site_config"]["Row"], "id" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["arq_site_config"]["Insert"]>
      }
    }
    Functions: {
      arq_is_admin: { Args: Record<never, never>; Returns: boolean }
    }
  }
}

// Tipos de conveniência para uso nos componentes
export type Noticia        = Database["public"]["Tables"]["arq_noticias"]["Row"]
export type Evento         = Database["public"]["Tables"]["arq_eventos"]["Row"]
export type Paroquia       = Database["public"]["Tables"]["arq_paroquias"]["Row"]
export type Local          = Database["public"]["Tables"]["arq_locais"]["Row"]
export type HorarioMissa   = Database["public"]["Tables"]["arq_horarios_missa"]["Row"]
export type Padre          = Database["public"]["Tables"]["arq_padres"]["Row"]
export type Diacono        = Database["public"]["Tables"]["arq_diaconos"]["Row"]
export type Seminarista    = Database["public"]["Tables"]["arq_seminaristas"]["Row"]
export type Documento      = Database["public"]["Tables"]["arq_documentos"]["Row"]
export type SetorPastoral  = Database["public"]["Tables"]["arq_setores_pastorais"]["Row"]
export type SiteConfig     = Database["public"]["Tables"]["arq_site_config"]["Row"]
