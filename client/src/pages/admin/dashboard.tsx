import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/common/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Newspaper, 
  LogOut, 
  ChevronRight,
  Users,
  BarChart3,
  Clock,
  AlertTriangle
} from 'lucide-react';

// Admin layout component
interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

function AdminLayout({ children, title }: AdminLayoutProps) {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <SEOHead 
        title={`${title} - Admin CorpTech`}
        description="Painel administrativo da CorpTech"
        canonicalUrl="/admin"
      />
      
      {/* Header */}
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/admin/dashboard" className="text-white font-bold text-xl">
              <span className="text-accent">Corp</span>Tech <span className="text-sm font-normal">Admin</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <span className="text-sm hidden md:inline-block">
                Olá, {user?.username}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="bg-transparent text-white hover:bg-primary-light border-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-2">
            <Link href="/admin/dashboard">
              <div className={`flex items-center p-3 rounded-lg ${location === '/admin/dashboard' ? 'bg-primary text-white' : 'bg-white hover:bg-gray-50'}`}>
                <LayoutDashboard className="h-5 w-5 mr-3" />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link href="/admin/content">
              <div className={`flex items-center p-3 rounded-lg ${location === '/admin/content' ? 'bg-primary text-white' : 'bg-white hover:bg-gray-50'}`}>
                <FileText className="h-5 w-5 mr-3" />
                <span>Conteúdo</span>
              </div>
            </Link>
            <Link href="/admin/jobs">
              <div className={`flex items-center p-3 rounded-lg ${location === '/admin/jobs' ? 'bg-primary text-white' : 'bg-white hover:bg-gray-50'}`}>
                <Briefcase className="h-5 w-5 mr-3" />
                <span>Vagas</span>
              </div>
            </Link>
            <Link href="/admin/news">
              <div className={`flex items-center p-3 rounded-lg ${location === '/admin/news' ? 'bg-primary text-white' : 'bg-white hover:bg-gray-50'}`}>
                <Newspaper className="h-5 w-5 mr-3" />
                <span>Notícias</span>
              </div>
            </Link>
          </aside>
          
          {/* Main content */}
          <main className="flex-1">
            <h1 className="text-2xl font-bold mb-6">{title}</h1>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { language } = useI18n();
  
  // Fetch stats (in a real app, this would fetch from an API)
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: [`/api/stats?lang=${language}`],
  });
  
  // Fetch recent activities (in a real app, this would fetch from an API)
  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: [`/api/activities?lang=${language}`],
  });
  
  // Default data if API is not available
  const defaultStats = {
    visitors: 1250,
    pageViews: 4875,
    contentCount: 32,
    jobCount: 8,
    newsCount: 15
  };
  
  const defaultActivities = [
    { id: 1, type: 'content', action: 'edit', user: 'admin', item: 'Página Principal', date: '2023-06-15T14:32:00' },
    { id: 2, type: 'job', action: 'create', user: 'admin', item: 'Desenvolvedor Full Stack', date: '2023-06-14T10:15:00' },
    { id: 3, type: 'news', action: 'create', user: 'admin', item: 'Nova parceria estratégica', date: '2023-06-13T16:45:00' },
    { id: 4, type: 'content', action: 'edit', user: 'admin', item: 'Política de Privacidade', date: '2023-06-12T09:20:00' },
    { id: 5, type: 'job', action: 'edit', user: 'admin', item: 'Especialista em Segurança', date: '2023-06-10T11:30:00' }
  ];
  
  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Function to get icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'content':
        return <FileText className="h-4 w-4" />;
      case 'job':
        return <Briefcase className="h-4 w-4" />;
      case 'news':
        return <Newspaper className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  return (
    <AdminLayout title="Dashboard">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Visitantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.visitors || defaultStats.visitors}</div>
            <p className="text-xs text-gray-500 mt-1">Últimos 7 dias</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Visualizações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.pageViews || defaultStats.pageViews}</div>
            <p className="text-xs text-gray-500 mt-1">Últimos 7 dias</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Vagas Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.jobCount || defaultStats.jobCount}</div>
            <p className="text-xs text-gray-500 mt-1">Total publicado</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Notícias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.newsCount || defaultStats.newsCount}</div>
            <p className="text-xs text-gray-500 mt-1">Total publicado</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions and Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acesse funcionalidades comuns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/admin/content">
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Editar Conteúdo
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            
            <Link href="/admin/jobs">
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Gerenciar Vagas
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            
            <Link href="/admin/news">
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center">
                  <Newspaper className="h-4 w-4 mr-2" />
                  Gerenciar Notícias
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        {/* Activity Log */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>Histórico de alterações no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(activities || defaultActivities).map((activity) => (
                <div key={activity.id} className="flex items-start border-l-4 border-primary pl-4 py-2">
                  <div className="bg-primary-light p-2 rounded-full text-white mr-4">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">
                        {activity.action === 'create' ? 'Criou' : 'Editou'} {activity.item}
                      </h4>
                      <span className="text-xs text-gray-500">{formatDate(activity.date)}</span>
                    </div>
                    <p className="text-sm text-gray-600">Usuário: {activity.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="ml-auto">
              Ver todas as atividades
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Tabs with additional information */}
      <div className="mt-8">
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="performance">Desempenho</TabsTrigger>
            <TabsTrigger value="tasks">Tarefas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Visão Geral do Site</CardTitle>
                <CardDescription>Resumo dos principais indicadores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-full mr-4">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Usuários Cadastrados</h4>
                        <span className="font-bold">43</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-full mr-4">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Taxa de Conversão</h4>
                        <span className="font-bold">3.2%</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-full mr-4">
                      <Clock className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Tempo Médio na Página</h4>
                        <span className="font-bold">2m 45s</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Desempenho do Site</CardTitle>
                <CardDescription>Análise de velocidade e performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Tempo de Carregamento</span>
                        <span className="text-sm font-bold">1.8s</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">First Contentful Paint</span>
                        <span className="text-sm font-bold">0.9s</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Time to Interactive</span>
                        <span className="text-sm font-bold">2.3s</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Cumulative Layout Shift</span>
                        <span className="text-sm font-bold">0.05</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Tarefas Pendentes</CardTitle>
                <CardDescription>Ações que requerem atenção</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50 rounded-r-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Atualizar política de privacidade</h4>
                      <p className="text-sm text-gray-600">Prazo: 30/06/2023</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg">
                    <FileText className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Revisar conteúdo da página sobre nós</h4>
                      <p className="text-sm text-gray-600">Prazo: 25/06/2023</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start border-l-4 border-purple-500 pl-4 py-2 bg-purple-50 rounded-r-lg">
                    <Briefcase className="h-5 w-5 text-purple-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Publicar 3 novas vagas de emprego</h4>
                      <p className="text-sm text-gray-600">Prazo: 28/06/2023</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="ml-auto">
                  Ver todas as tarefas
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
