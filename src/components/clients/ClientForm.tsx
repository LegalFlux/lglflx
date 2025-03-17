
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface ClientFormProps {
  onClose: () => void;
  onSubmit: (clientData: any) => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    nome: '',
    apelido: '',
    email: '',
    telefone: '',
    endereco: '',
    nif: '',
    observacoes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.nome || !formData.email) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha o nome e email do cliente.',
        variant: 'destructive',
      });
      return;
    }
    
    // Envia os dados para o componente pai
    onSubmit(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Novo Cliente</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome *</Label>
              <Input
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Nome do cliente"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apelido">Apelido *</Label>
              <Input
                id="apelido"
                name="apelido"
                value={formData.apelido}
                onChange={handleChange}
                placeholder="Apelido do cliente"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@exemplo.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="+351 900 000 000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço</Label>
            <Input
              id="endereco"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              placeholder="Endereço completo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nif">NIF</Label>
            <Input
              id="nif"
              name="nif"
              value={formData.nif}
              onChange={handleChange}
              placeholder="Número de Identificação Fiscal"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              placeholder="Informações adicionais sobre o cliente"
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Guardar Cliente</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ClientForm;
