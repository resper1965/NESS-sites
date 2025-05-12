import { useState } from 'react';
import { useLocation } from 'wouter';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/use-auth';
import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/common/SEOHead';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

// Login form schema
const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Registration form schema
const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>('login');
  const { t } = useI18n();
  const [location, navigate] = useLocation();
  
  // Get auth context
  const { user, loginMutation, registerMutation, isLoading: authLoading } = useAuth();
  
  // Initialize login form
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  
  // Initialize register form
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });
  
  // Handle login submit
  const onLoginSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };
  
  // Handle register submit
  const onRegisterSubmit = (data: RegisterFormData) => {
    const { username, password } = data;
    registerMutation.mutate({ username, password });
  };
  
  // If user is already logged in, redirect to dashboard
  if (user && !authLoading) {
    navigate('/admin/dashboard');
    return null;
  }
  
  return (
    <>
      <SEOHead 
        title="Login - CorpTech"
        description="Faça login para acessar a área administrativa da CorpTech."
        canonicalUrl="/auth"
      />
      
      <Navbar />
      
      <main className="py-20 bg-neutral min-h-screen">
        <div className="container mx-auto px-4 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left side - Auth forms */}
            <div className="mt-8">
              <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Registro</TabsTrigger>
                </TabsList>
                
                {/* Login Form */}
                <TabsContent value="login">
                  <Card>
                    <CardHeader>
                      <CardTitle>Login</CardTitle>
                      <CardDescription>
                        Entre com suas credenciais para acessar a área administrativa.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                          <FormField
                            control={loginForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nome de usuário</FormLabel>
                                <FormControl>
                                  <Input placeholder="Digite seu nome de usuário" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="Digite sua senha" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button 
                            type="submit" 
                            className="w-full" 
                            disabled={loginMutation.isPending}
                          >
                            {loginMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Entrando...
                              </>
                            ) : (
                              'Entrar'
                            )}
                          </Button>
                        </form>
                      </Form>
                      
                      <div className="text-center text-sm text-gray-500">
                        <p>Não tem uma conta? <button onClick={() => setActiveTab('register')} className="text-accent hover:text-accent-dark">Registre-se</button></p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Register Form */}
                <TabsContent value="register">
                  <Card>
                    <CardHeader>
                      <CardTitle>Criar conta</CardTitle>
                      <CardDescription>
                        Crie uma nova conta para acessar a área administrativa.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Form {...registerForm}>
                        <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                          <FormField
                            control={registerForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nome de usuário</FormLabel>
                                <FormControl>
                                  <Input placeholder="Escolha um nome de usuário" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={registerForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="Escolha uma senha" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={registerForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirmar senha</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="Confirme sua senha" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button 
                            type="submit" 
                            className="w-full" 
                            disabled={registerMutation.isPending}
                          >
                            {registerMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Registrando...
                              </>
                            ) : (
                              'Registrar'
                            )}
                          </Button>
                        </form>
                      </Form>
                      
                      <div className="text-center text-sm text-gray-500">
                        <p>Já tem uma conta? <button onClick={() => setActiveTab('login')} className="text-accent hover:text-accent-dark">Faça login</button></p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right side - Information */}
            <div className="bg-primary rounded-lg p-8 text-white">
              <div className="h-full flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-6">Área Administrativa</h2>
                <p className="text-lg mb-6">
                  Bem-vindo ao painel administrativo da CorpTech. Aqui você pode gerenciar conteúdos institucionais, vagas, notícias e muito mais.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-accent p-2 rounded-full text-white mr-4 mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-xl">Sistema de CMS</h3>
                      <p className="text-white/80 text-sm">Gerencie facilmente todos os conteúdos do site.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-accent p-2 rounded-full text-white mr-4 mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-xl">Vagas e Recrutamento</h3>
                      <p className="text-white/80 text-sm">Publique e gerencie oportunidades de trabalho.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-accent p-2 rounded-full text-white mr-4 mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-xl">Notícias e Artigos</h3>
                      <p className="text-white/80 text-sm">Mantenha clientes e colaboradores informados.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-accent p-2 rounded-full text-white mr-4 mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-xl">Multilíngue</h3>
                      <p className="text-white/80 text-sm">Gerencie conteúdo em português, inglês e espanhol.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
