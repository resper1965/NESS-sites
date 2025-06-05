import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useSite } from '@/site/SiteContext';
import { useI18n } from '@/lib/i18n';
import SiteLayout from '@/site/layout/SiteLayout';
import { 
  MapPin,
  Clock,
  DollarSign,
  Building,
  Calendar,
  Send,
  Briefcase,
  Users,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

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
  slug: string;
}

export default function PublicJobsPage() {
  const { siteConfig } = useSite();
  const { language, t } = useI18n();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplicationDialogOpen, setIsApplicationDialogOpen] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: ''
  });

  // Fetch public jobs
  const { data: jobs = [], isLoading } = useQuery<Job[]>({
    queryKey: ['/api/public/jobs', language, siteConfig.code],
    queryFn: async () => {
      const response = await fetch(`/api/public/jobs?lang=${language}&site=${siteConfig.code}`);
      if (!response.ok) throw new Error('Erro ao carregar vagas');
      return response.json();
    },
  });

  // Application mutation
  const applicationMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/jobs/apply', data);
      return response.json();
    },
    onSuccess: () => {
      setIsApplicationDialogOpen(false);
      setApplicationData({ name: '', email: '', phone: '', coverLetter: '' });
      toast({
        title: "Candidatura enviada!",
        description: "Sua candidatura foi enviada com sucesso. Entraremos em contato em breve.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao enviar candidatura. Tente novamente.",
        variant: "destructive",
      });
    }
  });

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

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setIsApplicationDialogOpen(true);
  };

  const submitApplication = () => {
    if (!selectedJob || !applicationData.name || !applicationData.email || !applicationData.coverLetter) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    applicationMutation.mutate({
      jobId: selectedJob.id,
      ...applicationData
    });
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const featuredJobs = jobs.filter(job => job.isFeatured);
  const departments = Array.from(new Set(jobs.map(job => job.department)));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00ade0] mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando vagas...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SiteLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden" style={{ minHeight: '60vh' }}>
        {/* Padrão de Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzM0MTU1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        {/* Linhas Sutis */}
        <div className="absolute top-1/4 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-[#00ade0] to-transparent opacity-40"></div>
        <div className="absolute bottom-1/3 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-[#00ade0] to-transparent opacity-40"></div>
        <div className="absolute top-1/2 left-1/3 w-px h-24 bg-gradient-to-b from-transparent via-[#00ade0] to-transparent opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/3 w-24 h-px bg-gradient-to-r from-transparent via-[#00ade0] to-transparent opacity-30"></div>
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center h-full text-center" style={{ minHeight: '60vh' }}>
          {/* Logo */}
          <h1 className="font-['Montserrat'] font-light text-7xl md:text-8xl text-white mb-6 lowercase">
            vagas<span className="text-[#00ade0]">.</span>
          </h1>
          
          {/* Tagline */}
          <h2 className="mb-8">
            <div className="font-light text-2xl md:text-3xl text-slate-300 mb-2">
              Faça parte da
            </div>
            <div className="font-normal text-2xl md:text-3xl text-[#00ade0]">
              nossa equipe
            </div>
          </h2>
          
          {/* Parágrafo descritivo */}
          <p className="font-light text-lg text-slate-400 max-w-2xl leading-relaxed mb-8">
            Descubra oportunidades incríveis em {siteConfig.name} e construa sua carreira 
            em uma empresa inovadora e focada em tecnologia.
          </p>
          
          {/* Estatísticas */}
          <div className="flex items-center justify-center space-x-8 text-slate-300">
            <div className="flex items-center">
              <Briefcase className="h-6 w-6 mr-2 text-[#00ade0]" />
              <span>{jobs.length} vagas abertas</span>
            </div>
            <div className="flex items-center">
              <Users className="h-6 w-6 mr-2 text-[#00ade0]" />
              <span>Equipe diversa</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 mr-2 text-[#00ade0]" />
              <span>Benefícios completos</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Vagas em Destaque */}
        {featuredJobs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Vagas em Destaque
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {featuredJobs.map((job) => (
                <Card key={job.id} className="border-2 border-[#00ade0] hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl text-[#00ade0]">{job.title}</CardTitle>
                        <CardDescription>{job.department}</CardDescription>
                      </div>
                      <Badge className="bg-[#00ade0] text-white">Destaque</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {getJobTypeLabel(job.type)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-3">{job.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{getLevelLabel(job.level)}</Badge>
                        <Button 
                          size="sm" 
                          onClick={() => handleApply(job)}
                          className="bg-[#00ade0] hover:bg-[#008bb8]"
                        >
                          Candidatar-se
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Filtros */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <Input
                placeholder="Buscar vagas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ade0]"
            >
              <option value="all">Todos os Departamentos</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista de Vagas */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Todas as Vagas ({filteredJobs.length})
          </h2>
          
          <div className="grid gap-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        {job.isFeatured && (
                          <Badge className="bg-[#00ade0] text-white">Destaque</Badge>
                        )}
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
                        {job.salary && (
                          <span className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {job.salary}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleApply(job)}
                      className="bg-[#00ade0] hover:bg-[#008bb8]"
                    >
                      Candidatar-se
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{getLevelLabel(job.level)}</Badge>
                      <span className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        Publicada em {new Date(job.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-gray-600">{job.description}</p>
                    
                    {job.requirements && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Requisitos:</h4>
                        <p className="text-gray-600 text-sm whitespace-pre-line">{job.requirements}</p>
                      </div>
                    )}
                    
                    {job.benefits && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Benefícios:</h4>
                        <p className="text-gray-600 text-sm whitespace-pre-line">{job.benefits}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredJobs.length === 0 && (
              <Card>
                <CardContent className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Nenhuma vaga encontrada</p>
                    <p className="text-gray-400">Tente ajustar os filtros de busca</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Dialog de Candidatura */}
      <Dialog open={isApplicationDialogOpen} onOpenChange={setIsApplicationDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Candidatar-se para {selectedJob?.title}</DialogTitle>
            <DialogDescription>
              Preencha os dados abaixo para enviar sua candidatura
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                value={applicationData.name}
                onChange={(e) => setApplicationData({...applicationData, name: e.target.value})}
                placeholder="Seu nome completo"
              />
            </div>
            <div>
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={applicationData.email}
                onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                placeholder="seu.email@exemplo.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={applicationData.phone}
                onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                placeholder="(11) 99999-9999"
              />
            </div>
            <div>
              <Label htmlFor="coverLetter">Carta de Apresentação *</Label>
              <Textarea
                id="coverLetter"
                value={applicationData.coverLetter}
                onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                placeholder="Conte-nos sobre sua experiência e por que você se interessou por esta vaga..."
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={submitApplication} 
              disabled={applicationMutation.isPending}
              className="bg-[#00ade0] hover:bg-[#008bb8]"
            >
              {applicationMutation.isPending ? (
                'Enviando...'
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Candidatura
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </SiteLayout>
  );
}