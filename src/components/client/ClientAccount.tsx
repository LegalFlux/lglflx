
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AccountSummary, AccountTransaction } from '@/types/account';
import { formatCurrency, formatDate } from '@/lib/utils';

interface ClientAccountProps {
  clientId?: string;
  transactions: AccountTransaction[];
  summary: AccountSummary;
  isLoading?: boolean;
}

const ClientAccount: React.FC<ClientAccountProps> = ({
  clientId,
  transactions,
  summary,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card className="animate-pulse">
          <CardHeader className="space-y-2">
            <div className="h-6 bg-muted rounded w-1/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-muted rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Account Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Saldo Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${summary.saldo < 0 ? 'text-destructive' : 'text-green-600'}`}>
              {formatCurrency(summary.saldo)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Valor Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summary.total)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Pago</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(summary.totalPago)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Último Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            {summary.ultimoPagamento ? (
              <div>
                <div className="text-2xl font-bold">{formatCurrency(summary.valorUltimoPagamento || 0)}</div>
                <div className="text-sm text-muted-foreground">{formatDate(new Date(summary.ultimoPagamento))}</div>
              </div>
            ) : (
              <div className="text-muted-foreground">Sem pagamentos</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Conta Corrente</CardTitle>
          <CardDescription>
            Histórico completo de movimentos na sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          {transactions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{formatDate(new Date(transaction.data))}</TableCell>
                    <TableCell>{transaction.descricao}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          transaction.tipo === 'pagamento' ? 'default' : 
                          transaction.tipo === 'honorario' ? 'secondary' : 
                          'outline'
                        }
                      >
                        {transaction.tipo === 'pagamento' ? 'Pagamento' : 
                         transaction.tipo === 'honorario' ? 'Honorário' : 
                         transaction.tipo === 'despesa' ? 'Despesa' : 
                         transaction.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell className={`text-right font-medium ${
                      transaction.tipo === 'pagamento' ? 'text-green-600' : 'text-destructive'
                    }`}>
                      {transaction.tipo === 'pagamento' ? '+' : '-'} {formatCurrency(Math.abs(transaction.valor))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              Não existem transações registadas
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientAccount;
