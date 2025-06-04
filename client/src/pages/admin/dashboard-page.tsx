import { useState, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { Redirect, Link } from 'wouter';
import { getQueryFn } from '@/lib/queryClient';
import { Loader2, Home, FileText, Briefcase, Newspaper, Settings, Users, LogOut } from 'lucide-react';
import { User } from '@shared/schema';

// Inline AdminLayout component to avoid import issues
interface AdminLayoutProps {
  title: string;
  children: ReactNode;
  user: User;
  onLogout: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

function AdminLayout({
  title,
  children,
  user,
  onLogout,
  activeSection,
  setActiveSection
}: AdminLayoutProps) {
  const sidebarItems = [
    { 
      icon: <Home className="w-5 h-5" />, 
      label: 'Dashboard', 
      href: '/admin/dashboard',
      id: 'overview'
    },
    { 
      icon: <FileText className="w-5 h-5" />, 
      label: 'Conteúdos', 
      href: '/admin/content',
      id: 'content'
    },
    { 
      icon: <Briefcase className="w-5 h-5" />, 
      label: 'Vagas', 
      href: '/admin/jobs',
      id: 'jobs'
    },
    { 
      icon: <Newspaper className="w-5 h-5" />, 
      label: 'Notícias', 
      href: '/admin/news',
      id: 'news'
    },
    { 
      icon: <Settings className="w-5 h-5" />, 
      label: 'Configurações', 
      href: '/admin/settings',
      id: 'settings'
    },
  ];
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:bg-white md:border-r md:border-gray-200">
        <div className="flex flex-col flex-grow p-4">
          <div className="py-4 border-b border-gray-200 mb-4">
            <Link href="/admin/dashboard" className="flex items-center">
              <h1 className="text-xl font-['Montserrat'] font-normal text-primary">
                ness<span className="text-accent">.</span> <span className="font-medium">admin</span>
              </h1>
            </Link>
          </div>
          
          <div className="flex-grow">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <Link 
                  key={item.id} 
                  href={item.href}
                  className={`
                    flex items-center px-4 py-3 text-gray-700 rounded-md transition-colors
                    ${activeSection === item.id ? 'bg-primary text-white' : 'hover:bg-gray-100'}
                  `}
                  onClick={() => setActiveSection(item.id)}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-900">{user.username}</p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
              <button
                onClick={onLogout}
                className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 sm:px-6 flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
            
            <div className="flex items-center md:hidden">
              <button
                onClick={onLogout}
                className="ml-2 p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Mobile navigation */}
          <div className="md:hidden border-t border-gray-200">
            <div className="flex overflow-x-auto space-x-2 px-4 py-2">
              {sidebarItems.map((item) => (
                <Link 
                  key={item.id} 
                  href={item.href}
                  className={`
                    flex-shrink-0 flex items-center px-3 py-1.5 text-sm rounded-md transition-colors
                    ${activeSection === item.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                  `}
                  onClick={() => setActiveSection(item.id)}
                >
                  {item.icon}
                  <span className="ml-1.5">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const { user, isLoading: authLoading, logoutMutation } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  
  const { data: contentsCount, isLoading: contentsLoading } = useQuery<number>({
    queryKey: ['/api/admin/content/count'],
    queryFn: getQueryFn({ on401: 'throw' }),
    enabled: !!user?.isAdmin,
  });
  
  const { data: jobsCount, isLoading: jobsLoading } = useQuery<number>({
    queryKey: ['/api/admin/jobs/count'],
    queryFn: getQueryFn({ on401: 'throw' }),
    enabled: !!user?.isAdmin,
  });
  
  const { data: newsCount, isLoading: newsLoading } = useQuery<number>({
    queryKey: ['/api/admin/news/count'],
    queryFn: getQueryFn({ on401: 'throw' }),
    enabled: !!user?.isAdmin,
  });
  
  const { data: recentActivities, isLoading: activitiesLoading } = useQuery({
    queryKey: ['/api/admin/activities'],
    queryFn: getQueryFn({ on401: 'throw' }),
    enabled: !!user?.isAdmin,
  });
  
  const isLoading = 
    authLoading || 
    contentsLoading || 
    jobsLoading || 
    newsLoading || 
    activitiesLoading;
  
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };
  
  // If not logged in, redirect to login
  if (!authLoading && !user) {
    return <Redirect to="/admin/login" />;
  }
  
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  // Safety check to ensure user is defined before accessing properties
  if (!user) {
    return null;
  }
  
  const statCards = [
    {
      title: 'Conteúdos',
      count: contentsCount || 0,
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      color: 'bg-blue-100',
      link: '/admin/content'
    },
    {
      title: 'Vagas',
      count: jobsCount || 0,
      icon: <Briefcase className="h-8 w-8 text-green-500" />,
      color: 'bg-green-100',
      link: '/admin/jobs'
    },
    {
      title: 'Notícias',
      count: newsCount || 0,
      icon: <Newspaper className="h-8 w-8 text-amber-500" />,
      color: 'bg-amber-100',
      link: '/admin/news'
    }
  ];
  
  return (
    <AdminLayout 
      title="Dashboard" 
      user={user} 
      onLogout={handleLogout}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
    >
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Bem-vindo, {user.username}</h1>
          <p className="text-gray-600">Painel de administração do site ness.</p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {statCards.map((card, index) => (
                <div 
                  key={index} 
                  className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${card.color} mr-4`}>
                      {card.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{card.count}</h2>
                      <p className="text-gray-600">{card.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Atividades Recentes</h2>
              </div>
              <div className="p-6">
                {Array.isArray(recentActivities) && recentActivities.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {recentActivities.map((activity: any, index: number) => (
                      <div key={index} className="py-3 flex items-start">
                        <div className="mr-4 mt-1">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-primary text-sm">{activity.userId}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-800">
                            <span className="font-medium">{activity.action}</span>
                            {' '}
                            <span className="text-gray-600">
                              {activity.entityType}{activity.entityId ? ` #${activity.entityId}` : ''}
                            </span>
                          </p>
                          <p className="text-sm text-gray-500">
                            {activity.createdAt ? new Date(activity.createdAt).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : 'Data não disponível'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Nenhuma atividade recente encontrada.</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800">Links Rápidos</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
                      <FileText className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <span className="text-gray-800">Novo Conteúdo</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
                      <Briefcase className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <span className="text-gray-800">Nova Vaga</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
                      <Newspaper className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <span className="text-gray-800">Nova Notícia</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
                      <Settings className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <span className="text-gray-800">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800">Visão Geral</h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">
                    Acesse o painel de administração para gerenciar conteúdos, vagas, notícias e configurações do site ness.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Use o menu lateral para navegar entre as diferentes seções do painel.
                  </p>
                  <div className="flex justify-end">
                    <div className="inline-flex items-center text-primary hover:text-primary-dark">
                      <span className="mr-1">Ver site</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
