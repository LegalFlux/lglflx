import { supabase } from '@/integrations/supabase/client';

const updateUserPassword = async (email: string, newPassword: string) => {
  try {
    // Passo 1: Buscar o utilizador pelo email
    const { data: user, error: userError } = await supabase
      .from('users') // Ou 'auth.users', dependendo da sua configuração
      .select('id')
      .eq('email', email)
      .single();

    if (userError || !user) {
      console.error('Utilizador não encontrado:', userError);
      throw new Error('Utilizador não encontrado');
    }

    // Passo 2: Atualizar a password
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    );

    if (updateError) {
      console.error('Erro ao atualizar a password:', updateError);
      throw new Error('Erro ao atualizar a password');
    }

    console.log('Password atualizada com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar a password:', error);
  }
};

// Chame a função para atualizar a password
updateUserPassword('brunopinto@rollbox.pt', 'senhasegura123');
