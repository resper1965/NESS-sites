import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { Redirect } from 'wouter';
import { getQueryFn } from '@/lib/queryClient';
import { Loader2, Home, FileText, Briefcase, Newspaper, Settings, Users, LogOut } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Content, Job, News } from '@shared/schema';

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
  
  // If not logged in or not admin, redirect to login
  if (!authLoading && (!user || !user.isAdmin)) {
    return <Redirect to="/admin/login" />;
  }
  
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
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
                {recentActivities && recentActivities.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="py-3 flex items-start">
                        <div className="mr-4 mt-1">
                          <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center">
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
                            {new Date(activity.createdAt).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
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