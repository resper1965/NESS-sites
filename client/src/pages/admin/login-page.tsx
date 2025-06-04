import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Redirect } from 'wouter';
import { Loader2 } from 'lucide-react';

// Form validation schema
const loginSchema = z.object({
  username: z.string().min(1, 'Usuário é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const { user, isLoading, loginMutation } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  
  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    
    try {
      await loginMutation.mutateAsync(data);
      toast({
        title: 'Login realizado com sucesso',
        description: 'Bem-vindo à área administrativa',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Erro ao fazer login',
        description: error instanceof Error ? error.message : 'Credenciais inválidas',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Redirect to admin dashboard if already logged in
  if (user && user.isAdmin) {
    return <Redirect to="/admin/dashboard" />;
  }
  
  // If user is logged in but not admin
  if (user && !user.isAdmin) {
    return <Redirect to="/" />;
  }
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl  font-normal text-primary mb-2">
                ness<span className="text-accent">.</span> <span className="font-medium">admin</span>
              </h1>
              <p className="text-gray-600">Área restrita de administração</p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Usuário
                </label>
                <input
                  id="username"
                  type="text"
                  {...register('username')}
                  className={`w-full p-3 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="Digite seu e-mail"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  {...register('password')}
                  className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="Digite sua senha"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Entrando...
                  </span>
                ) : (
                  'Entrar'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <a href="/" className="text-sm text-primary hover:text-primary-dark">
                Voltar para o site
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Área restrita apenas para administradores autorizados.
            <br />
            Em caso de problemas, entre em contato com o suporte.
          </p>
        </div>
      </div>
    </div>
  );
}