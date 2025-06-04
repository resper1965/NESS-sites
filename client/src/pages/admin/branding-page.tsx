import { useState } from 'react';
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
  User
} from 'lucide-react';

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

// Mock data - in a real application, this would come from the API
const mockFiles: BrandingFile[] = [
  {
    id: '1',
    name: 'guideline-colors.pdf',
    category: 'styles',
    type: 'pdf',
    description: 'Primary and neutral color codes for all digital materials',
    version: 'v2.1',
    uploadDate: '2024-01-15',
    uploader: 'Marketing Team',
    isOfficial: true,
    downloadUrl: '/assets/branding/guideline-colors.pdf',
    previewUrl: '/assets/branding/previews/guideline-colors-thumb.png'
  },
  {
    id: '2',
    name: 'typography-guidelines.pdf',
    category: 'styles',
    type: 'pdf',
    description: 'Montserrat font usage guidelines and hierarchy',
    version: 'v1.3',
    uploadDate: '2024-01-10',
    uploader: 'Design Team',
    isOfficial: true,
    downloadUrl: '/assets/branding/typography-guidelines.pdf'
  },
  {
    id: '3',
    name: 'SlideDeck_ness_v1.potx',
    category: 'templates',
    type: 'pptx',
    description: 'Official slide template for internal and client presentations',
    version: 'v1.0',
    uploadDate: '2024-01-12',
    uploader: 'Brand Manager',
    isOfficial: true,
    downloadUrl: '/assets/branding/SlideDeck_ness_v1.potx'
  },
  {
    id: '4',
    name: 'email_template.html',
    category: 'templates',
    type: 'html',
    description: 'Standard email template with brand styling',
    version: 'v2.0',
    uploadDate: '2024-01-14',
    uploader: 'Marketing Team',
    isOfficial: true,
    downloadUrl: '/assets/branding/email_template.html',
    previewUrl: '/assets/branding/previews/email-template-preview.png'
  },
  {
    id: '5',
    name: 'brand-usage-policy.pdf',
    category: 'governance',
    type: 'pdf',
    description: 'Guidelines for proper brand usage and restrictions',
    version: 'v1.1',
    uploadDate: '2024-01-08',
    uploader: 'Legal Team',
    isOfficial: true,
    downloadUrl: '/assets/branding/brand-usage-policy.pdf'
  },
  {
    id: '6',
    name: 'logo-package.zip',
    category: 'assets',
    type: 'zip',
    description: 'Complete logo package with SVG and PNG versions',
    version: 'v3.0',
    uploadDate: '2024-01-16',
    uploader: 'Design Team',
    isOfficial: true,
    downloadUrl: '/assets/branding/logo-package.zip'
  }
];

export default function BrandingPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [files] = useState<BrandingFile[]>(mockFiles);

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
              Official
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(file.uploadDate).toLocaleDateString()}
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
                  Preview
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download
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
    const categoryFiles = filteredFiles.filter(file => file.category === category);
    
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
          {categoryFiles.map(file => (
            <FileCard key={file.id} file={file} />
          ))}
          {categoryFiles.length === 0 && (
            <Card className="col-span-full">
              <CardContent className="flex items-center justify-center py-8">
                <p className="text-gray-500">No files found in this category</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Branding & Templates</h1>
          <p className="text-gray-600 mt-2">
            Centralized repository for brand assets, templates, and governance documents
          </p>
        </div>
        {isAdmin && (
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Upload New
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Upload New Document</DialogTitle>
                <DialogDescription>
                  Add a new file to the branding repository. Please ensure you have the necessary permissions.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="styles">Styles</SelectItem>
                      <SelectItem value="templates">Templates</SelectItem>
                      <SelectItem value="governance">Governance</SelectItem>
                      <SelectItem value="assets">Assets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">
                    File
                  </Label>
                  <Input
                    id="file"
                    type="file"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the file"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="version" className="text-right">
                    Version
                  </Label>
                  <Input
                    id="version"
                    placeholder="e.g., v1.0"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Upload File</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Search and Filter Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="styles">Styles</SelectItem>
                <SelectItem value="templates">Templates</SelectItem>
                <SelectItem value="governance">Governance</SelectItem>
                <SelectItem value="assets">Assets</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="File Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
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

      {/* Tabs for Categories */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="styles">Styles</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredFiles.map(file => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="styles" className="space-y-6">
          <CategorySection 
            category="styles" 
            title="Style Guidelines" 
            description="Color palettes, typography guidelines, and brand identity documents"
          />
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <CategorySection 
            category="templates" 
            title="Templates" 
            description="PowerPoint slides, email templates, and social media assets"
          />
        </TabsContent>

        <TabsContent value="governance" className="space-y-6">
          <CategorySection 
            category="governance" 
            title="Brand Governance" 
            description="Policy documents, approval workflows, and usage guidelines"
          />
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          <CategorySection 
            category="assets" 
            title="Brand Assets" 
            description="Raw logos, icons, fonts, and other design assets"
          />
        </TabsContent>
      </Tabs>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use This Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Uploading Documents</h4>
            <p className="text-gray-600 text-sm">
              Only users with Branding Admin permissions can upload new documents. 
              Select the appropriate category and provide a clear description and version number.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold mb-2">Version History</h4>
            <p className="text-gray-600 text-sm">
              When uploading a new version of an existing file, the previous version will be 
              automatically archived and accessible through the "View older versions" link.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold mb-2">Finding Documents</h4>
            <p className="text-gray-600 text-sm">
              Use the search bar to find files by name or description. Apply filters by category 
              or file type to narrow down results.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold mb-2">Need Help?</h4>
            <p className="text-gray-600 text-sm">
              For questions about brand guidelines or document access, contact the Marketing team 
              or Brand Manager.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}