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
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { getQueryFn, apiRequest } from '@/lib/queryClient';
import { 
  Upload, 
  Download, 
  Eye, 
  Search, 
  Filter, 
  FileText, 
  Presentation, 
  Image, 
  Code,
  Palette,
  Shield,
  Archive,
  Plus,
  Calendar,
  User,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'wouter';

interface BrandingFile {
  id: string;
  name: string;
  category: 'styles' | 'templates' | 'governance' | 'assets';
  type: 'pdf' | 'pptx' | 'html' | 'svg' | 'png' | 'zip' | 'woff' | 'woff2';
  description: string;
  version: string;
  uploadDate: string;
  uploader: string;
  isOfficial: boolean;
  downloadUrl: string;
  previewUrl?: string;
}

export default function BrandingPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadData, setUploadData] = useState({
    category: '',
    description: '',
    version: '',
    fileName: ''
  });

  // Fetch branding files from API
  const { data: files = [], isLoading } = useQuery<BrandingFile[]>({
    queryKey: ['/api/branding/files'],
    queryFn: async () => {
      const response = await fetch(`/api/branding/files?category=${selectedCategory}&type=${selectedType}`);
      if (!response.ok) throw new Error('Erro ao carregar arquivos');
      return response.json();
    },
  });

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/branding/upload', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/branding/files'] });
      setIsUploadDialogOpen(false);
      setUploadData({ category: '', description: '', version: '', fileName: '' });
      toast({
        title: "Sucesso",
        description: "Arquivo enviado com sucesso",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: "Erro ao enviar arquivo",
        variant: "destructive",
      });
    }
  });

  const isAdmin = user?.isAdmin;

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-500" />;
      case 'pptx':
        return <Presentation className="h-6 w-6 text-orange-500" />;
      case 'html':
        return <Code className="h-6 w-6 text-blue-500" />;
      case 'svg':
      case 'png':
        return <Image className="h-6 w-6 text-green-500" />;
      case 'zip':
        return <Archive className="h-6 w-6 text-purple-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'styles':
        return <Palette className="h-5 w-5" />;
      case 'templates':
        return <Presentation className="h-5 w-5" />;
      case 'governance':
        return <Shield className="h-5 w-5" />;
      case 'assets':
        return <Image className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    const matchesType = selectedType === 'all' || file.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleUpload = () => {
    if (!uploadData.category || !uploadData.description || !uploadData.version || !uploadData.fileName) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }
    uploadMutation.mutate(uploadData);
  };

  const FileCard = ({ file }: { file: BrandingFile }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {getFileIcon(file.type)}
            <div>
              <CardTitle className="text-lg">{file.name}</CardTitle>
              <CardDescription className="mt-1">{file.description}</CardDescription>
            </div>
          </div>
          {file.isOfficial && (
            <Badge variant="default" className="bg-green-100 text-green-800">
              Oficial
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(file.uploadDate).toLocaleDateString('pt-BR')}
            </span>
            <span className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {file.uploader}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="outline">{file.version}</Badge>
            <div className="flex space-x-2">
              {file.previewUrl && (
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  Visualizar
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => window.open(file.downloadUrl, '_blank')}>
                <Download className="h-4 w-4 mr-1" />
                Baixar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CategorySection = ({ category, title, description }: { 
    category: string; 
    title: string; 
    description: string;
  }) => {
    const categoryFiles = filteredFiles.filter((file: BrandingFile) => file.category === category);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          {getCategoryIcon(category)}
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categoryFiles.map((file: BrandingFile) => (
            <FileCard key={file.id} file={file} />
          ))}
          {categoryFiles.length === 0 && (
            <Card className="col-span-full">
              <CardContent className="flex items-center justify-center py-8">
                <p className="text-gray-500">Nenhum arquivo encontrado nesta categoria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00ade0] mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando arquivos de branding...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Identidade Visual & Templates</h1>
            <p className="text-gray-600 mt-2">
              Repositório centralizado para assets da marca, templates e documentos de governança
            </p>
          </div>
        </div>
        {isAdmin && (
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Enviar Novo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Enviar Novo Documento</DialogTitle>
                <DialogDescription>
                  Adicione um novo arquivo ao repositório de branding. Certifique-se de ter as permissões necessárias.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Categoria
                  </Label>
                  <Select value={uploadData.category} onValueChange={(value) => setUploadData({...uploadData, category: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecionar categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="styles">Estilos</SelectItem>
                      <SelectItem value="templates">Templates</SelectItem>
                      <SelectItem value="governance">Governança</SelectItem>
                      <SelectItem value="assets">Assets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fileName" className="text-right">
                    Nome do Arquivo
                  </Label>
                  <Input
                    id="fileName"
                    value={uploadData.fileName}
                    onChange={(e) => setUploadData({...uploadData, fileName: e.target.value})}
                    placeholder="exemplo-documento.pdf"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Descrição
                  </Label>
                  <Textarea
                    id="description"
                    value={uploadData.description}
                    onChange={(e) => setUploadData({...uploadData, description: e.target.value})}
                    placeholder="Breve descrição do arquivo"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="version" className="text-right">
                    Versão
                  </Label>
                  <Input
                    id="version"
                    value={uploadData.version}
                    onChange={(e) => setUploadData({...uploadData, version: e.target.value})}
                    placeholder="ex: v1.0"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleUpload} disabled={uploadMutation.isPending}>
                  {uploadMutation.isPending ? 'Enviando...' : 'Enviar Arquivo'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Controles de Busca e Filtro */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar arquivos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                <SelectItem value="styles">Estilos</SelectItem>
                <SelectItem value="templates">Templates</SelectItem>
                <SelectItem value="governance">Governança</SelectItem>
                <SelectItem value="assets">Assets</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Tipo de Arquivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="pptx">PowerPoint</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="svg">SVG</SelectItem>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="zip">ZIP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Abas para Categorias */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Todos os Arquivos</TabsTrigger>
          <TabsTrigger value="styles">Estilos</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="governance">Governança</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredFiles.map((file: BrandingFile) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="styles" className="space-y-6">
          <CategorySection 
            category="styles" 
            title="Diretrizes de Estilo" 
            description="Paletas de cores, guidelines de tipografia e documentos de identidade da marca"
          />
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <CategorySection 
            category="templates" 
            title="Templates" 
            description="Slides PowerPoint, templates de email e assets para redes sociais"
          />
        </TabsContent>

        <TabsContent value="governance" className="space-y-6">
          <CategorySection 
            category="governance" 
            title="Governança da Marca" 
            description="Documentos de política, fluxos de aprovação e diretrizes de uso"
          />
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          <CategorySection 
            category="assets" 
            title="Assets da Marca" 
            description="Logos originais, ícones, fontes e outros elementos de design"
          />
        </TabsContent>
      </Tabs>

      {/* Seção de Ajuda */}
      <Card>
        <CardHeader>
          <CardTitle>Como Usar Esta Seção</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Enviando Documentos</h4>
            <p className="text-gray-600 text-sm">
              Apenas usuários com permissões de Administrador de Branding podem enviar novos documentos. 
              Selecione a categoria apropriada e forneça uma descrição clara e número de versão.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold mb-2">Histórico de Versões</h4>
            <p className="text-gray-600 text-sm">
              Ao enviar uma nova versão de um arquivo existente, a versão anterior será 
              automaticamente arquivada e acessível através do link "Ver versões anteriores".
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold mb-2">Encontrando Documentos</h4>
            <p className="text-gray-600 text-sm">
              Use a barra de pesquisa para encontrar arquivos por nome ou descrição. Aplique filtros por categoria 
              ou tipo de arquivo para refinar os resultados.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold mb-2">Precisa de Ajuda?</h4>
            <p className="text-gray-600 text-sm">
              Para dúvidas sobre diretrizes da marca ou acesso a documentos, entre em contato com a equipe 
              de Marketing ou Gerente de Marca.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}