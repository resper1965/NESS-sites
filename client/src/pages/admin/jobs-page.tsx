import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { 
  Plus,
  Search,
  Filter,
  MapPin,
  Clock,
  Users,
  Eye,
  Edit,
  Trash2,
  ArrowLeft,
  Briefcase,
  Calendar,
  DollarSign,
  Building,
  User
} from 'lucide-react';
import { Link } from 'wouter';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  level: 'junior' | 'pleno' | 'senior' | 'lead';
  salary: string;
  description: string;
  requirements: string;
  benefits: string;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  applications: number;
  language: string;
  siteCode?: string;
}

interface JobApplication {
  id: number;
  jobId: number;
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  resumeUrl?: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  appliedAt: string;
}

export default function JobsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [activeTab, setActiveTab] = useState('jobs');

  const [jobData, setJobData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'full-time' as 'full-time' | 'part-time' | 'contract' | 'internship',
    level: 'pleno' as 'junior' | 'pleno' | 'senior' | 'lead',
    salary: '',
    description: '',
    requirements: '',
    benefits: '',
    isActive: true,
    isFeatured: false
  });

  // Fetch jobs
  const { data: jobs = [], isLoading: jobsLoading } = useQuery<Job[]>({
    queryKey: ['/api/jobs'],
    queryFn: async () => {
      const response = await fetch('/api/jobs?lang=pt');
      if (!response.ok) throw new Error('Erro ao carregar vagas');
      return response.json();
    },
  });

  // Fetch applications
  const { data: applications = [], isLoading: applicationsLoading } = useQuery<JobApplication[]>({
    queryKey: ['/api/jobs/applications'],
    queryFn: async () => {
      const response = await fetch('/api/jobs/applications');
      if (!response.ok) throw new Error('Erro ao carregar candidaturas');
      return response.json();
    },
    enabled: activeTab === 'applications'
  });

  // Create job mutation
  const createJobMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/jobs?lang=pt', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/jobs'] });
      setIsCreateDialogOpen(false);
      resetJobData();
      toast({
        title: "Sucesso",
        description: "Vaga criada com sucesso",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao criar vaga",
        variant: "destructive",
      });
    }
  });

  // Update job mutation
  const updateJobMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await apiRequest('PUT', `/api/jobs/${id}?lang=pt`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/jobs'] });
      setEditingJob(null);
      resetJobData();
      toast({
        title: "Sucesso",
        description: "Vaga atualizada com sucesso",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao atualizar vaga",
        variant: "destructive",
      });
    }
  });

  // Delete job mutation
  const deleteJobMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest('DELETE', `/api/jobs/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/jobs'] });
      toast({
        title: "Sucesso",
        description: "Vaga removida com sucesso",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao remover vaga",
        variant: "destructive",
      });
    }
  });

  const resetJobData = () => {
    setJobData({
      title: '',
      department: '',
      location: '',
      type: 'full-time',
      level: 'pleno',
      salary: '',
      description: '',
      requirements: '',
      benefits: '',
      isActive: true,
      isFeatured: false
    });
  };

  const handleCreateJob = () => {
    if (!jobData.title || !jobData.department || !jobData.description) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }
    createJobMutation.mutate(jobData);
  };

  const handleUpdateJob = () => {
    if (!editingJob) return;
    updateJobMutation.mutate({ id: editingJob.id, data: jobData });
  };

  const startEdit = (job: Job) => {
    setEditingJob(job);
    setJobData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      level: job.level,
      salary: job.salary,
      description: job.description,
      requirements: job.requirements,
      benefits: job.benefits,
      isActive: job.isActive,
      isFeatured: job.isFeatured
    });
    setIsCreateDialogOpen(true);
  };

  const getJobTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'full-time': 'Integral',
      'part-time': 'Meio Período',
      'contract': 'Contrato',
      'internship': 'Estágio'
    };
    return labels[type] || type;
  };

  const getLevelLabel = (level: string) => {
    const labels: { [key: string]: string } = {
      'junior': 'Júnior',
      'pleno': 'Pleno',
      'senior': 'Sênior',
      'lead': 'Lead'
    };
    return labels[level] || level;
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'reviewing': 'bg-blue-100 text-blue-800',
      'accepted': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      'pending': 'Pendente',
      'reviewing': 'Em Análise',
      'accepted': 'Aceita',
      'rejected': 'Rejeitada'
    };
    return labels[status] || status;
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesType = selectedType === 'all' || job.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' && job.isActive) || 
                         (selectedStatus === 'inactive' && !job.isActive);
    
    return matchesSearch && matchesDepartment && matchesType && matchesStatus;
  });

  const filteredApplications = applications.filter(app => {
    return app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           app.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (jobsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00ade0] mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando vagas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com navegação */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestão de Vagas</h1>
            <p className="text-gray-600 mt-2">
              Gerencie vagas de emprego e candidaturas
            </p>
          </div>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Vaga
        </Button>
      </div>

      {/* Tabs principais */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="jobs">
            <Briefcase className="h-4 w-4 mr-2" />
            Vagas ({jobs.length})
          </TabsTrigger>
          <TabsTrigger value="applications">
            <Users className="h-4 w-4 mr-2" />
            Candidaturas ({applications.length})
          </TabsTrigger>
        </TabsList>

        {/* Aba de Vagas */}
        <TabsContent value="jobs" className="space-y-6">
          {/* Controles de busca e filtro */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar vagas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Departamentos</SelectItem>
                    <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Vendas">Vendas</SelectItem>
                    <SelectItem value="RH">Recursos Humanos</SelectItem>
                    <SelectItem value="Financeiro">Financeiro</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[150px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Tipos</SelectItem>
                    <SelectItem value="full-time">Integral</SelectItem>
                    <SelectItem value="part-time">Meio Período</SelectItem>
                    <SelectItem value="contract">Contrato</SelectItem>
                    <SelectItem value="internship">Estágio</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[120px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Ativas</SelectItem>
                    <SelectItem value="inactive">Inativas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lista de vagas */}
          <div className="grid gap-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        {job.isFeatured && (
                          <Badge variant="default" className="bg-[#00ade0] text-white">
                            Destaque
                          </Badge>
                        )}
                        <Badge variant={job.isActive ? "default" : "secondary"}>
                          {job.isActive ? 'Ativa' : 'Inativa'}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Building className="h-4 w-4 mr-1" />
                          {job.department}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {getJobTypeLabel(job.type)}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {job.applications} candidaturas
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedJob(job)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => startEdit(job)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => deleteJobMutation.mutate(job.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{getLevelLabel(job.level)}</Badge>
                      {job.salary && (
                        <span className="flex items-center text-sm text-gray-600">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{job.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Criada em {new Date(job.createdAt).toLocaleDateString('pt-BR')}</span>
                      <span>Atualizada em {new Date(job.updatedAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredJobs.length === 0 && (
              <Card>
                <CardContent className="flex items-center justify-center py-8">
                  <p className="text-gray-500">Nenhuma vaga encontrada</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Aba de Candidaturas */}
        <TabsContent value="applications" className="space-y-6">
          {/* Controles de busca para candidaturas */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar candidaturas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de candidaturas */}
          <div className="grid gap-4">
            {filteredApplications.map((application) => {
              const job = jobs.find(j => j.id === application.jobId);
              return (
                <Card key={application.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">{application.name}</CardTitle>
                        <CardDescription>
                          Candidatura para: {job?.title || 'Vaga não encontrada'}
                        </CardDescription>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {application.email}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(application.appliedAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(application.status)}>
                        {getStatusLabel(application.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-gray-600 text-sm line-clamp-3">{application.coverLetter}</p>
                      {application.resumeUrl && (
                        <Button variant="outline" size="sm" onClick={() => window.open(application.resumeUrl, '_blank')}>
                          Ver Currículo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            {filteredApplications.length === 0 && (
              <Card>
                <CardContent className="flex items-center justify-center py-8">
                  <p className="text-gray-500">Nenhuma candidatura encontrada</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog para criar/editar vaga */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingJob ? 'Editar Vaga' : 'Nova Vaga'}</DialogTitle>
            <DialogDescription>
              {editingJob ? 'Atualize as informações da vaga' : 'Preencha os dados para criar uma nova vaga'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Título da Vaga *</Label>
                <Input
                  id="title"
                  value={jobData.title}
                  onChange={(e) => setJobData({...jobData, title: e.target.value})}
                  placeholder="Ex: Desenvolvedor React"
                />
              </div>
              <div>
                <Label htmlFor="department">Departamento *</Label>
                <Select value={jobData.department} onValueChange={(value) => setJobData({...jobData, department: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Vendas">Vendas</SelectItem>
                    <SelectItem value="RH">Recursos Humanos</SelectItem>
                    <SelectItem value="Financeiro">Financeiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="location">Localização</Label>
                <Input
                  id="location"
                  value={jobData.location}
                  onChange={(e) => setJobData({...jobData, location: e.target.value})}
                  placeholder="Ex: São Paulo, SP"
                />
              </div>
              <div>
                <Label htmlFor="type">Tipo</Label>
                <Select value={jobData.type} onValueChange={(value) => setJobData({...jobData, type: value as any})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Integral</SelectItem>
                    <SelectItem value="part-time">Meio Período</SelectItem>
                    <SelectItem value="contract">Contrato</SelectItem>
                    <SelectItem value="internship">Estágio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="level">Nível</Label>
                <Select value={jobData.level} onValueChange={(value) => setJobData({...jobData, level: value as any})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="junior">Júnior</SelectItem>
                    <SelectItem value="pleno">Pleno</SelectItem>
                    <SelectItem value="senior">Sênior</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="salary">Salário</Label>
              <Input
                id="salary"
                value={jobData.salary}
                onChange={(e) => setJobData({...jobData, salary: e.target.value})}
                placeholder="Ex: R$ 5.000 - R$ 8.000"
              />
            </div>
            <div>
              <Label htmlFor="description">Descrição da Vaga *</Label>
              <Textarea
                id="description"
                value={jobData.description}
                onChange={(e) => setJobData({...jobData, description: e.target.value})}
                placeholder="Descreva as responsabilidades e objetivos da posição"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="requirements">Requisitos</Label>
              <Textarea
                id="requirements"
                value={jobData.requirements}
                onChange={(e) => setJobData({...jobData, requirements: e.target.value})}
                placeholder="Liste os requisitos necessários para a vaga"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="benefits">Benefícios</Label>
              <Textarea
                id="benefits"
                value={jobData.benefits}
                onChange={(e) => setJobData({...jobData, benefits: e.target.value})}
                placeholder="Descreva os benefícios oferecidos"
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={jobData.isActive}
                  onCheckedChange={(checked) => setJobData({...jobData, isActive: checked})}
                />
                <Label htmlFor="isActive">Vaga ativa</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isFeatured"
                  checked={jobData.isFeatured}
                  onCheckedChange={(checked) => setJobData({...jobData, isFeatured: checked})}
                />
                <Label htmlFor="isFeatured">Vaga em destaque</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={editingJob ? handleUpdateJob : handleCreateJob} 
              disabled={createJobMutation.isPending || updateJobMutation.isPending}
            >
              {createJobMutation.isPending || updateJobMutation.isPending 
                ? 'Salvando...' 
                : editingJob ? 'Atualizar Vaga' : 'Criar Vaga'
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para visualizar vaga */}
      {selectedJob && (
        <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedJob.title}</DialogTitle>
              <DialogDescription>
                {selectedJob.department} • {selectedJob.location}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{getJobTypeLabel(selectedJob.type)}</Badge>
                <Badge variant="outline">{getLevelLabel(selectedJob.level)}</Badge>
                {selectedJob.salary && (
                  <Badge variant="outline">{selectedJob.salary}</Badge>
                )}
                <Badge variant={selectedJob.isActive ? "default" : "secondary"}>
                  {selectedJob.isActive ? 'Ativa' : 'Inativa'}
                </Badge>
                {selectedJob.isFeatured && (
                  <Badge className="bg-[#00ade0] text-white">Destaque</Badge>
                )}
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Descrição</h4>
                <p className="text-gray-600 whitespace-pre-wrap">{selectedJob.description}</p>
              </div>
              {selectedJob.requirements && (
                <div>
                  <h4 className="font-semibold mb-2">Requisitos</h4>
                  <p className="text-gray-600 whitespace-pre-wrap">{selectedJob.requirements}</p>
                </div>
              )}
              {selectedJob.benefits && (
                <div>
                  <h4 className="font-semibold mb-2">Benefícios</h4>
                  <p className="text-gray-600 whitespace-pre-wrap">{selectedJob.benefits}</p>
                </div>
              )}
              <Separator />
              <div className="text-sm text-gray-500">
                <p>Criada em {new Date(selectedJob.createdAt).toLocaleDateString('pt-BR')}</p>
                <p>Última atualização em {new Date(selectedJob.updatedAt).toLocaleDateString('pt-BR')}</p>
                <p>{selectedJob.applications} candidaturas recebidas</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}