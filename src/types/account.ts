/**
 * Interface representing an account transaction for a client
 * @interface AccountTransaction
 */
export interface AccountTransaction {
  /** Unique identifier for the transaction (read-only) */
  readonly id: string;
  /** ID of the client this transaction belongs to */
  clienteId: string;
  /** ID of the case this transaction is related to (optional) */
  casoId?: string;
  /** Date of the transaction (ISO 8601 format) */
  data: string;
  /** Description of the transaction */
  descricao: string;
  /** Value of the transaction (positive for income, negative for expenses) */
  valor: number;
  /** Type of transaction */
  tipo: 'honorario' | 'despesa' | 'pagamento';
  /** Creation date of the record (ISO 8601 format, read-only) */
  readonly createdAt: string;
  /** Last update date of the record (ISO 8601 format, read-only) */
  readonly updatedAt: string;
}

/**
 * Interface representing a summary of a client's account
 * @interface AccountSummary
 */
export interface AccountSummary {
  /** Total amount owed by the client */
  total: number;
  /** Total amount paid by the client */
  totalPago: number;
  /** Current balance (paid - owed) */
  saldo: number;
  /** Pending payment amount */
  pendente: number;
  /** Last payment date (ISO 8601 format, optional) */
  ultimoPagamento?: string;
  /** Last payment amount (optional) */
  valorUltimoPagamento?: number;
}
