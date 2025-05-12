import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useI18n, Language } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/lib/queryClient';
import { apiRequest } from '@/lib/queryClient';
import { News } from '@shared/schema';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Newspaper, 
  LogOut,
  Save,
  Globe,
  Loader2,
  PlusCircle,
  Trash2,
  Edit,
  Calendar,
  Image
} from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import SEOHead from '@/components/common/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/utils';

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

// Initial empty news template
const emptyNews: Partial<News> = {
  title: '',
  summary: '',
  content: '',
  image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500', // Default image
  date: new Date().toISOString().split('T')[0],
  category: 'company',
  featured: false
};

// News editor page
export default function NewsEditor() {
  const { language, setLanguage } = useI18n();
  const { toast } = useToast();
  const [editingNews, setEditingNews] = useState<Partial<News> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Fetch news
  const { data: news, isLoading } = useQuery<News[]>({
    queryKey: [`/api/news?lang=${language}`],
  });
  
  // Create news mutation
  const createMutation = useMutation({
    mutationFn: async (news: Partial<News>) => {
      const res = await apiRequest('POST', `/api/news?lang=${language}`, news);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/news?lang=${language}`] });
      toast({
        title: 'Notícia criada',
        description: 'A notícia foi criada com sucesso.',
      });
      setIsDialogOpen(false);
      setEditingNews(null);
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao criar notícia',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  // Update news mutation
  const updateMutation = useMutation({
    mutationFn: async (news: Partial<News>) => {
      const res = await apiRequest('PUT', `/api/news/${news.id}?lang=${language}`, news);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/news?lang=${language}`] });
      toast({
        title: 'Notícia atualizada',
        description: 'A notícia foi atualizada com sucesso.',
      });
      setIsDialogOpen(false);
      setEditingNews(null);
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao atualizar notícia',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  // Delete news mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest('DELETE', `/api/news/${id}?lang=${language}`, null);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/news?lang=${language}`] });
      toast({
        title: 'Notícia excluída',
        description: 'A notícia foi excluída com sucesso.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao excluir notícia',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  // Handle new news
  const handleNewNews = () => {
    setEditingNews({ ...emptyNews });
    setIsDialogOpen(true);
  };
  
  // Handle edit news
  const handleEditNews = (newsItem: News) => {
    setEditingNews(newsItem);
    setIsDialogOpen(true);
  };
  
  // Handle delete news
  const handleDeleteNews = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta notícia?')) {
      deleteMutation.mutate(id);
    }
  };
  
  // Handle dialog close
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingNews(null);
  };
  
  // Handle save news
  const handleSaveNews = () => {
    if (!editingNews?.title || !editingNews.summary || !editingNews.date) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }
    
    if (editingNews.id) {
      updateMutation.mutate(editingNews as News);
    } else {
      createMutation.mutate(editingNews);
    }
  };
  
  // Filter news by category
  const filteredNews = news?.filter(item => 
    categoryFilter === 'all' || item.category === categoryFilter
  );
  
  // Get unique categories for filter
  const categories = news 
    ? ['all', ...new Set(news.map(item => item.category))]
    : ['all', 'company', 'technology', 'events'];
  
  return (
    <AdminLayout title="Gerenciador de Notícias">
      <div className="mb-6 flex flex-col md:flex-row justify-between gap-4 items-start">
        <div className="flex flex-col md:flex-row gap-4">
          <div>
            <Label htmlFor="language-select">Idioma</Label>
            <Select
              value={language}
              onValueChange={(value) => setLanguage(value as Language)}
            >
              <SelectTrigger id="language-select" className="w-[180px]">
                <SelectValue placeholder="Selecione um idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="category-filter">Categoria</Label>
            <Select
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger id="category-filter" className="w-[180px]">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'Todas as categorias' : 
                     category === 'company' ? 'Empresa' : 
                     category === 'technology' ? 'Tecnologia' : 
                     category === 'events' ? 'Eventos' : 
                     category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button onClick={handleNewNews}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Nova Notícia
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredNews && filteredNews.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Título</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNews.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{formatDate(item.date, language)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {item.category === 'company' ? 'Empresa' : 
                       item.category === 'technology' ? 'Tecnologia' : 
                       item.category === 'events' ? 'Eventos' : 
                       item.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.featured && (
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        Destaque
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditNews(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteNews(item.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Newspaper className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhuma notícia encontrada</h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              Você ainda não tem notícias cadastradas ou nenhuma notícia corresponde ao filtro selecionado.
            </p>
            <Button onClick={handleNewNews}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Criar Notícia
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* News Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingNews?.id ? 'Editar Notícia' : 'Nova Notícia'}</DialogTitle>
            <DialogDescription>
              Preencha os detalhes da notícia. Os campos marcados com * são obrigatórios.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input 
                  id="title" 
                  value={editingNews?.title || ''}
                  onChange={(e) => setEditingNews({ ...editingNews!, title: e.target.value })}
                  className="mt-1"
                  placeholder="Ex: Nova parceria estratégica para expansão internacional"
                />
              </div>
              
              <div>
                <Label htmlFor="date">Data de Publicação *</Label>
                <Input 
                  id="date" 
                  type="date"
                  value={editingNews?.date ? editingNews.date.split('T')[0] : ''}
                  onChange={(e) => setEditingNews({ ...editingNews!, date: e.target.value })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select
                  value={editingNews?.category || 'company'}
                  onValueChange={(value) => setEditingNews({ ...editingNews!, category: value })}
                >
                  <SelectTrigger id="category" className="mt-1">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="company">Empresa</SelectItem>
                    <SelectItem value="technology">Tecnologia</SelectItem>
                    <SelectItem value="events">Eventos</SelectItem>
                    <SelectItem value="partnerships">Parcerias</SelectItem>
                    <SelectItem value="awards">Prêmios</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="image">URL da Imagem *</Label>
                <Input 
                  id="image" 
                  value={editingNews?.image || ''}
                  onChange={(e) => setEditingNews({ ...editingNews!, image: e.target.value })}
                  className="mt-1"
                  placeholder="URL da imagem da notícia"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recomendado: 800x500px
                </p>
              </div>
              
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox 
                  id="featured" 
                  checked={editingNews?.featured || false} 
                  onCheckedChange={(checked) => setEditingNews({ ...editingNews!, featured: !!checked })}
                />
                <label
                  htmlFor="featured"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Destacar na página inicial
                </label>
              </div>
              
              {editingNews?.image && (
                <div className="mt-4">
                  <Label>Prévia da Imagem</Label>
                  <div className="mt-2 border rounded-md overflow-hidden">
                    <img 
                      src={editingNews.image} 
                      alt="Prévia" 
                      className="w-full h-40 object-cover" 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/800x500?text=Imagem+Indisponivel';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="summary">Resumo *</Label>
                <Textarea 
                  id="summary" 
                  value={editingNews?.summary || ''}
                  onChange={(e) => setEditingNews({ ...editingNews!, summary: e.target.value })}
                  className="mt-1"
                  placeholder="Breve resumo da notícia"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="content">Conteúdo Completo</Label>
                <Textarea 
                  id="content" 
                  value={editingNews?.content || ''}
                  onChange={(e) => setEditingNews({ ...editingNews!, content: e.target.value })}
                  className="mt-1"
                  placeholder="Conteúdo completo da notícia (suporta HTML)"
                  rows={10}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Você pode usar tags HTML para formatação.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleDialogClose}>Cancelar</Button>
            <Button 
              onClick={handleSaveNews} 
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {createMutation.isPending || updateMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
