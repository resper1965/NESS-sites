import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Loader2, Save, Globe, Phone, Mail, MapPin, Shield, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { SiteSetting } from "@shared/schema";

// Schema de validação para configurações
const settingsSchema = z.object({
  // Contato
  contact_phone: z.string().optional(),
  contact_email: z.string().email("Email inválido").optional(),
  contact_address: z.string().optional(),
  
  // Redes Sociais
  social_facebook: z.string().url("URL inválida").optional().or(z.literal("")),
  social_instagram: z.string().url("URL inválida").optional().or(z.literal("")),
  social_linkedin: z.string().url("URL inválida").optional().or(z.literal("")),
  social_twitter: z.string().url("URL inválida").optional().or(z.literal("")),
  social_youtube: z.string().url("URL inválida").optional().or(z.literal("")),
  
  // Políticas
  privacy_policy: z.string().optional(),
  terms_of_use: z.string().optional(),
  cookie_policy: z.string().optional(),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("contact");

  const { data: settings, isLoading } = useQuery<SiteSetting[]>({
    queryKey: ["/api/admin/settings"],
  });

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {},
  });

  // Converter array de settings para objeto
  const settingsMap = settings?.reduce((acc, setting) => {
    if (setting.language === 'pt') {
      acc[setting.key] = setting.value || '';
    }
    return acc;
  }, {} as Record<string, string>) || {};

  // Atualizar form quando settings carregarem
  useEffect(() => {
    if (settings && settings.length > 0) {
      form.reset(settingsMap);
    }
  }, [settings, form, settingsMap]);

  const updateSettingMutation = useMutation({
    mutationFn: async (data: { key: string; value: string; language: string }) => {
      return await apiRequest("POST", "/api/admin/settings", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
      toast({
        title: "Configuração salva",
        description: "A configuração foi salva com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const translateSettingMutation = useMutation({
    mutationFn: async (data: { key: string; value: string; targetLanguage: string }) => {
      return await apiRequest("POST", "/api/admin/settings/translate", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
      toast({
        title: "Tradução concluída",
        description: "A configuração foi traduzida automaticamente.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro na tradução",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: SettingsFormData) => {
    try {
      // Salvar todas as configurações em português
      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined && value !== '') {
          await updateSettingMutation.mutateAsync({
            key,
            value: value as string,
            language: 'pt'
          });

          // Para políticas (textos longos), traduzir automaticamente
          if (['privacy_policy', 'terms_of_use', 'cookie_policy'].includes(key) && value.length > 50) {
            // Traduzir para inglês
            await translateSettingMutation.mutateAsync({
              key,
              value: value as string,
              targetLanguage: 'en'
            });

            // Traduzir para espanhol
            await translateSettingMutation.mutateAsync({
              key,
              value: value as string,
              targetLanguage: 'es'
            });
          }
        }
      }

      toast({
        title: "Configurações salvas",
        description: "Todas as configurações foram salvas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as configurações.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Configurações do Sistema</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie as configurações globais do site, informações de contato e políticas.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contato
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Redes Sociais
              </TabsTrigger>
              <TabsTrigger value="policies" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Políticas
              </TabsTrigger>
              <TabsTrigger value="legal" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Termos Legais
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Informações de Contato
                  </CardTitle>
                  <CardDescription>
                    Configure as informações de contato que aparecerão em todo o site.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="contact_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone de Contato</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="+55 11 99999-9999" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email de Contato</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="contato@empresa.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact_address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Rua Example, 123 - Bairro - Cidade - Estado - CEP"
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Redes Sociais
                  </CardTitle>
                  <CardDescription>
                    Configure os links das redes sociais da empresa.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="social_facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://facebook.com/empresa" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="social_instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://instagram.com/empresa" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="social_linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://linkedin.com/company/empresa" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="social_twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter/X</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://twitter.com/empresa" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="social_youtube"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>YouTube</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://youtube.com/empresa" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="policies" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Política de Privacidade
                  </CardTitle>
                  <CardDescription>
                    Digite em português. A tradução será feita automaticamente para inglês e espanhol.
                    <Badge variant="secondary" className="ml-2">Tradução Automática</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="privacy_policy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Política de Privacidade (Português)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Digite aqui a política de privacidade da empresa..."
                            className="min-h-[300px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="legal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Termos de Uso
                  </CardTitle>
                  <CardDescription>
                    Digite em português. A tradução será feita automaticamente.
                    <Badge variant="secondary" className="ml-2">Tradução Automática</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="terms_of_use"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Termos de Uso (Português)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Digite aqui os termos de uso..."
                            className="min-h-[300px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Política de Cookies</CardTitle>
                  <CardDescription>
                    Configure a política de cookies do site.
                    <Badge variant="secondary" className="ml-2">Tradução Automática</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="cookie_policy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Política de Cookies (Português)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Digite aqui a política de cookies..."
                            className="min-h-[200px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Separator />

          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={updateSettingMutation.isPending || translateSettingMutation.isPending}
              className="flex items-center gap-2"
            >
              {(updateSettingMutation.isPending || translateSettingMutation.isPending) ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Salvar Configurações
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}