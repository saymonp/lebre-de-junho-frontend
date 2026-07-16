export interface Address {
  id?: number;              // Opcional, pois no cadastro o ID ainda não existe
  user_id?: number;         // Opcional, caso precise relacionar ao usuário logado
  titulo: string;           // Ex: "Casa", "Trabalho"
  destinatario: string;     // Quem vai receber a encomenda
  telefone: string;         // Aceita máscaras: "(55) 99999-9999"
  cep: string;              // Aceita "99999-999" ou "99999999"
  logradouro: string;       // Rua, Avenida, etc.
  numero: string;           // Mantido como string para aceitar "S/N" ou "102-A"
  bairro: string;
  cidade: string;
  estado: string;           // Estritamente 2 caracteres (UF)
  complemento?: string | null; // Opcional / Nullable
  padrao?: boolean;         // Define se é o endereço principal de entrega
  created_at?: string;
  updated_at?: string;
}

// Tipo auxiliar para quando você estiver criando um novo endereço (sem IDs ou datas do banco)
export type CreateAddressRequest = Omit<Address, 'id' | 'user_id' | 'created_at' | 'updated_at'>;