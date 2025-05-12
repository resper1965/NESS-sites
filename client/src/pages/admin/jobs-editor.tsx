import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useI18n, Language } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/lib/queryClient';
import { apiRequest } from '@/lib/queryClient';
import { Job } from '@shared/schema';
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
  Tags
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

// Initial empty job template
const emptyJob: Partial<Job> = {
  title: '',
  location: '',
  locationType: 'office',
  type: 'Integral',
  summary: '',
  description: '',
  requirements: '',
  tags: [],
};

// Jobs editor page
export default function JobsEditor() {
  const { language, setLanguage } = useI18n();
  const { toast } = useToast();
  const [editingJob, setEditingJob] = useState<Partial<Job> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTag, setNewTag] = useState('');
  
  // Fetch jobs
  const { data: jobs, isLoading } = useQuery<Job[]>({
    queryKey: [`/api/jobs?lang=${language}`],
  });
  
  // Create job mutation
  const createMutation = useMutation({
    mutationFn: async (job: Partial<Job>) => {
      const res = await apiRequest('POST', `/api/jobs?lang=${language}`, job);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/jobs?lang=${language}`] });
      toast({
        title: 'Vaga criada',
        description: 'A vaga foi criada com sucesso.',
      });
      setIsDialogOpen(false);
      setEditingJob(null);
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao criar vaga',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  // Update job mutation
  const updateMutation = useMutation({
    mutationFn: async (job: Partial<Job>) => {
      const res = await apiRequest('PUT', `/api/jobs/${job.id}?lang=${language}`, job);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/jobs?lang=${language}`] });
      toast({
        title: 'Vaga atualizada',
        description: 'A vaga foi atualizada com sucesso.',
      });
      setIsDialogOpen(false);
      setEditingJob(null);
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao atualizar vaga',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  // Delete job mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest('DELETE', `/api/jobs/${id}?lang=${language}`, null);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/jobs?lang=${language}`] });
      toast({
        title: 'Vaga excluída',
        description: 'A vaga foi excluída com sucesso.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao excluir vaga',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  // Handle new job
  const handleNewJob = () => {
    setEditingJob({ ...emptyJob });
    setIsDialogOpen(true);
  };
  
  // Handle edit job
  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setIsDialogOpen(true);
  };
  
  // Handle delete job
  const handleDeleteJob = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta vaga?')) {
      deleteMutation.mutate(id);
    }
  };
  
  // Handle dialog close
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingJob(null);
  };
  
  // Handle save job
  const handleSaveJob = () => {
    if (!editingJob?.title || !editingJob.location || !editingJob.summary) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }
    
    if (editingJob.id) {
      updateMutation.mutate(editingJob as Job);
    } else {
      createMutation.mutate(editingJob);
    }
  };
  
  // Handle add tag
  const handleAddTag = () => {
    if (newTag.trim() && editingJob) {
      const tags = editingJob.tags ? [...editingJob.tags] : [];
      tags.push({ name: newTag.trim() });
      setEditingJob({ ...editingJob, tags });
      setNewTag('');
    }
  };
  
  // Handle remove tag
  const handleRemoveTag = (index: number) => {
    if (editingJob && editingJob.tags) {
      const tags = [...editingJob.tags];
      tags.splice(index, 1);
      setEditingJob({ ...editingJob, tags });
    }
  };
  
  return (
    <AdminLayout title="Gerenciador de Vagas">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value as Language)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione um idioma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pt">Português</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
            </SelectContent>
          </Select>
          
          <span className="text-sm text-gray-500">
            {jobs?.length || 0} vagas encontradas
          </span>
        </div>
        
        <Button onClick={handleNewJob}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Nova Vaga
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : jobs && jobs.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Título</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {job.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline">{tag.name}</Badge>
                      ))}
                      {job.tags.length > 3 && (
                        <Badge variant="outline">+{job.tags.length - 3}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={job.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {job.active ? 'Ativa' : 'Inativa'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditJob(job)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteJob(job.id)}>
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
            <Briefcase className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhuma vaga cadastrada</h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              Você ainda não tem vagas cadastradas. Clique no botão abaixo para criar sua primeira vaga.
            </p>
            <Button onClick={handleNewJob}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Criar Vaga
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* Job Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingJob?.id ? 'Editar Vaga' : 'Nova Vaga'}</DialogTitle>
            <DialogDescription>
              Preencha os detalhes da vaga. Os campos marcados com * são obrigatórios.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input 
                  id="title" 
                  value={editingJob?.title || ''}
                  onChange={(e) => setEditingJob({ ...editingJob!, title: e.target.value })}
                  className="mt-1"
                  placeholder="Ex: Desenvolvedor Full Stack"
                />
              </div>
              
              <div>
                <Label htmlFor="location">Localização *</Label>
                <Input 
                  id="location" 
                  value={editingJob?.location || ''}
                  onChange={(e) => setEditingJob({ ...editingJob!, location: e.target.value })}
                  className="mt-1"
                  placeholder="Ex: São Paulo, SP"
                />
              </div>
              
              <div>
                <Label htmlFor="locationType">Tipo de Localização</Label>
                <Select
                  value={editingJob?.locationType || 'office'}
                  onValueChange={(value) => setEditingJob({ ...editingJob!, locationType: value })}
                >
                  <SelectTrigger id="locationType" className="mt-1">
                    <SelectValue placeholder="Selecione o tipo de localização" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remoto</SelectItem>
                    <SelectItem value="office">Presencial</SelectItem>
                    <SelectItem value="hybrid">Híbrido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="type">Tipo de Contrato</Label>
                <Select
                  value={editingJob?.type || 'Integral'}
                  onValueChange={(value) => setEditingJob({ ...editingJob!, type: value })}
                >
                  <SelectTrigger id="type" className="mt-1">
                    <SelectValue placeholder="Selecione o tipo de contrato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Integral">Integral</SelectItem>
                    <SelectItem value="Meio Período">Meio Período</SelectItem>
                    <SelectItem value="Freelancer">Freelancer</SelectItem>
                    <SelectItem value="Estágio">Estágio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="active">Status</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox 
                    id="active" 
                    checked={editingJob?.active || false} 
                    onCheckedChange={(checked) => setEditingJob({ ...editingJob!, active: !!checked })}
                  />
                  <label
                    htmlFor="active"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Vaga ativa
                  </label>
                </div>
              </div>
              
              <div>
                <Label>Tags</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Adicionar tag"
                    className="flex-1"
                  />
                  <Button type="button" onClick={handleAddTag} size="sm">
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {editingJob?.tags?.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag.name}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(index)}
                        className="hover:text-red-500"
                      >
                        &times;
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="summary">Resumo *</Label>
                <Textarea 
                  id="summary" 
                  value={editingJob?.summary || ''}
                  onChange={(e) => setEditingJob({ ...editingJob!, summary: e.target.value })}
                  className="mt-1"
                  placeholder="Breve descrição da vaga"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="description">Descrição Completa</Label>
                <Textarea 
                  id="description" 
                  value={editingJob?.description || ''}
                  onChange={(e) => setEditingJob({ ...editingJob!, description: e.target.value })}
                  className="mt-1"
                  placeholder="Descrição detalhada da vaga"
                  rows={5}
                />
              </div>
              
              <div>
                <Label htmlFor="requirements">Requisitos</Label>
                <Textarea 
                  id="requirements" 
                  value={editingJob?.requirements || ''}
                  onChange={(e) => setEditingJob({ ...editingJob!, requirements: e.target.value })}
                  className="mt-1"
                  placeholder="Requisitos para a vaga"
                  rows={4}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleDialogClose}>Cancelar</Button>
            <Button 
              onClick={handleSaveJob} 
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
