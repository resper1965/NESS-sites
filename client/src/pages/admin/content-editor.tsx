import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useI18n, Language } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/lib/queryClient';
import { apiRequest } from '@/lib/queryClient';
import { Content } from '@shared/schema';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Newspaper, 
  LogOut,
  Save,
  Globe,
  Loader2
} from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import SEOHead from '@/components/common/SEOHead';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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

// Content editor page
export default function ContentEditor() {
  const { language, setLanguage, t } = useI18n();
  const { toast } = useToast();
  const [selectedPage, setSelectedPage] = useState<string>('home');
  const [editorContent, setEditorContent] = useState<Content | null>(null);
  
  // Fetch the content for the current page
  const { data: content, isLoading } = useQuery<Content>({
    queryKey: [`/api/content/${selectedPage}?lang=${language}`],
  });
  
  // Update content when the selection changes
  useEffect(() => {
    if (content) {
      setEditorContent(content);
    }
  }, [content]);
  
  // Content update mutation
  const updateMutation = useMutation({
    mutationFn: async (content: Content) => {
      const res = await apiRequest('PUT', `/api/content/${selectedPage}?lang=${language}`, content);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/content/${selectedPage}?lang=${language}`] });
      toast({
        title: 'Conteúdo atualizado',
        description: 'O conteúdo foi atualizado com sucesso.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao atualizar',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  // Translate content mutation
  const translateMutation = useMutation({
    mutationFn: async ({ targetLang, content }: { targetLang: Language, content: Content }) => {
      const res = await apiRequest('POST', `/api/translate?lang=${targetLang}`, content);
      return await res.json();
    },
    onSuccess: (data) => {
      toast({
        title: 'Conteúdo traduzido',
        description: 'O conteúdo foi traduzido com sucesso.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro na tradução',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  // Handle content update
  const handleSave = () => {
    if (editorContent) {
      updateMutation.mutate(editorContent);
    }
  };
  
  // Handle content translation
  const handleTranslation = (targetLang: Language) => {
    if (editorContent) {
      translateMutation.mutate({ targetLang, content: editorContent });
    }
  };
  
  // Content pages
  const contentPages = [
    { id: 'home', name: 'Página Inicial' },
    { id: 'about', name: 'Quem Somos' },
    { id: 'services', name: 'O Que Fazemos' },
    { id: 'ethics', name: 'Código de Ética' },
    { id: 'privacy', name: 'Política de Segurança' },
  ];
  
  return (
    <AdminLayout title="Editor de Conteúdo">
      <div className="mb-6 flex flex-col md:flex-row justify-between gap-4 items-start">
        <div className="flex flex-col md:flex-row gap-4">
          <div>
            <Label htmlFor="page-select">Página</Label>
            <Select
              value={selectedPage}
              onValueChange={(value) => setSelectedPage(value)}
            >
              <SelectTrigger id="page-select" className="w-[180px]">
                <SelectValue placeholder="Selecione uma página" />
              </SelectTrigger>
              <SelectContent>
                {contentPages.map((page) => (
                  <SelectItem key={page.id} value={page.id}>{page.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
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
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={updateMutation.isPending}>
            {updateMutation.isPending ? (
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
          
          <Select
            onValueChange={(value) => handleTranslation(value as Language)}
            disabled={translateMutation.isPending}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Traduzir para..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pt">Traduzir para Português</SelectItem>
              <SelectItem value="en">Traduzir para Inglês</SelectItem>
              <SelectItem value="es">Traduzir para Espanhol</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input 
                id="title" 
                value={editorContent?.title || ''}
                onChange={(e) => setEditorContent({ ...editorContent!, title: e.target.value })}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Input 
                id="description" 
                value={editorContent?.description || ''}
                onChange={(e) => setEditorContent({ ...editorContent!, description: e.target.value })}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="content">Conteúdo</Label>
              <Textarea 
                id="content" 
                value={editorContent?.content || ''}
                onChange={(e) => setEditorContent({ ...editorContent!, content: e.target.value })}
                className="mt-1 min-h-[300px]"
              />
              <p className="text-sm text-gray-500 mt-1">
                Você pode usar tags HTML para formatação.
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave} disabled={updateMutation.isPending}>
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </div>
        </Card>
      )}
      
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-4">Visualização</h2>
        <Card className="p-6">
          <div className="prose max-w-none">
            <h1>{editorContent?.title}</h1>
            <p className="text-gray-500">{editorContent?.description}</p>
            <div dangerouslySetInnerHTML={{ __html: editorContent?.content || '' }} />
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
