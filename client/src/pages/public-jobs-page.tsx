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
  const departments = [...new Set(jobs.map(job => job.department))];

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#00ade0] to-[#005fa3] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Faça Parte da Nossa Equipe
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
            Descubra oportunidades incríveis em {siteConfig.name} e construa sua carreira 
            em uma empresa inovadora e focada em tecnologia.
          </p>
          <div className="flex items-center justify-center space-x-8 text-blue-100">
            <div className="flex items-center">
              <Briefcase className="h-6 w-6 mr-2" />
              <span>{jobs.length} vagas abertas</span>
            </div>
            <div className="flex items-center">
              <Users className="h-6 w-6 mr-2" />
              <span>Equipe diversa</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 mr-2" />
              <span>Benefícios completos</span>
            </div>
          </div>
        </div>
      </div>

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
  );
}