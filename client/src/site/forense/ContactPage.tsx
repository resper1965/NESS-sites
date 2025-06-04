import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { useI18n } from '@/lib/i18n';
import { useSite } from '../SiteContext';
import SiteLayout from '../layout/SiteLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Assunto deve ter pelo menos 5 caracteres'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
  captcha: z.string().min(1, 'Por favor, complete o captcha'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ForenseContactPage() {
  const { siteConfig } = useSite();
  const { language, t } = useI18n();
  const { toast } = useToast();
  const [captchaQuestion, setCaptchaQuestion] = useState<{question: string, answer: number}>({
    question: '',
    answer: 0
  });

  React.useEffect(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaQuestion({
      question: `${num1} + ${num2} = ?`,
      answer: num1 + num2
    });
  }, []);

  const { data: contactInfo, isLoading: isLoadingContact } = useQuery({
    queryKey: ['/api/admin/contact-info', siteConfig.code],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/admin/contact-info?site=${siteConfig.code}`);
        if (!res.ok) throw new Error('Failed to fetch contact info');
        return res.json();
      } catch (error) {
        console.error("Error fetching contact info:", error);
        return {
          email: 'contato@forense.io',
          phone: '+55 11 4002-8922',
          address: 'São Paulo, Brasil',
          businessHours: 'Segunda a Sexta, 9h às 18h'
        };
      }
    }
  });

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      captcha: '',
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      if (parseInt(data.captcha) !== captchaQuestion.answer) {
        throw new Error('Captcha incorreto');
      }

      const res = await apiRequest('POST', '/api/contact', {
        ...data,
        site: siteConfig.code,
        language
      });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: language === 'pt' ? 'Mensagem enviada!' : 
               language === 'en' ? 'Message sent!' : 
               'Mensaje enviado!',
        description: language === 'pt' ? 'Entraremos em contato em breve.' :
                    language === 'en' ? 'We will contact you soon.' :
                    'Nos pondremos en contacto pronto.',
      });
      form.reset();
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      setCaptchaQuestion({
        question: `${num1} + ${num2} = ?`,
        answer: num1 + num2
      });
    },
    onError: (error: Error) => {
      toast({
        title: language === 'pt' ? 'Erro ao enviar' : 
               language === 'en' ? 'Error sending' : 
               'Error al enviar',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const content = {
    pt: {
      title: 'Contato',
      description: 'Entre em contato conosco',
      subtitle: 'precisa de serviços especializados em forense digital?',
      intro: 'nossa equipe de peritos forenses está preparada para auxiliar em investigações digitais, coleta de evidências e análises técnicas com validade legal.',
      formTitle: 'envie sua mensagem',
      contactTitle: 'informações de contato',
      name: 'Nome',
      email: 'Email',
      phone: 'Telefone (opcional)',
      subject: 'Assunto',
      message: 'Mensagem',
      send: 'Enviar mensagem',
      sending: 'Enviando...',
      businessHours: 'Horário de funcionamento',
      address: 'Endereço'
    },
    en: {
      title: 'Contact',
      description: 'Get in touch with us',
      subtitle: 'need specialized digital forensics services?',
      intro: 'our team of forensic experts is prepared to assist in digital investigations, evidence collection, and technical analysis with legal validity.',
      formTitle: 'send your message',
      contactTitle: 'contact information',
      name: 'Name',
      email: 'Email',
      phone: 'Phone (optional)',
      subject: 'Subject',
      message: 'Message',
      send: 'Send message',
      sending: 'Sending...',
      businessHours: 'Business hours',
      address: 'Address'
    },
    es: {
      title: 'Contacto',
      description: 'Póngase en contacto con nosotros',
      subtitle: '¿necesita servicios especializados en forense digital?',
      intro: 'nuestro equipo de expertos forenses está preparado para asistir en investigaciones digitales, recolección de evidencias y análisis técnicos con validez legal.',
      formTitle: 'envíe su mensaje',
      contactTitle: 'información de contacto',
      name: 'Nombre',
      email: 'Email',
      phone: 'Teléfono (opcional)',
      subject: 'Asunto',
      message: 'Mensaje',
      send: 'Enviar mensaje',
      sending: 'Enviando...',
      businessHours: 'Horario de atención',
      address: 'Dirección'
    }
  };

  const pageTitle = `${content[language].title} - ${siteConfig.metadata?.defaultTitle}`;
  const pageDescription = content[language].description;

  return (
    <SiteLayout
      title={pageTitle}
      description={pageDescription}
      canonicalUrl={`https://${siteConfig.domain}/contact`}
    >
      {/* Hero Section */}
      <section className="intro bg-[#121212] relative flex items-center justify-center" style={{ minHeight: "60vh" }}>
        <div className="container mx-auto px-4 z-10">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-['Montserrat'] font-normal mb-6 text-white">
              <span className="font-['Montserrat'] font-normal">
                {content[language].title.toLowerCase()}
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-['Montserrat'] font-light mb-8 max-w-4xl mx-auto text-white lowercase">
              {content[language].subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="conteudo bg-white" style={{ padding: "4rem 0" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              {content[language].intro}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="conteudo bg-gray-50" style={{ padding: "4rem 0" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-['Montserrat'] font-normal mb-8 text-gray-800 lowercase">
                  {content[language].formTitle}
                </h2>
                
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="name">{content[language].name}</Label>
                    <Input
                      id="name"
                      {...form.register('name')}
                      className="mt-1"
                      placeholder={content[language].name}
                    />
                    {form.formState.errors.name && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">{content[language].email}</Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register('email')}
                      className="mt-1"
                      placeholder={content[language].email}
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">{content[language].phone}</Label>
                    <Input
                      id="phone"
                      {...form.register('phone')}
                      className="mt-1"
                      placeholder={content[language].phone}
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">{content[language].subject}</Label>
                    <Input
                      id="subject"
                      {...form.register('subject')}
                      className="mt-1"
                      placeholder={content[language].subject}
                    />
                    {form.formState.errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message">{content[language].message}</Label>
                    <Textarea
                      id="message"
                      {...form.register('message')}
                      className="mt-1 min-h-[120px]"
                      placeholder={content[language].message}
                    />
                    {form.formState.errors.message && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
                    )}
                  </div>

                  {/* Captcha */}
                  <div>
                    <Label htmlFor="captcha">
                      {language === 'pt' ? 'Verificação' : 
                       language === 'en' ? 'Verification' : 
                       'Verificación'}: {captchaQuestion.question}
                    </Label>
                    <Input
                      id="captcha"
                      {...form.register('captcha')}
                      className="mt-1"
                      placeholder={language === 'pt' ? 'Resposta' : 
                                  language === 'en' ? 'Answer' : 
                                  'Respuesta'}
                    />
                    {form.formState.errors.captcha && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.captcha.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-[#00ade0] hover:bg-[#0095c4] text-white font-['Montserrat'] lowercase"
                  >
                    {contactMutation.isPending ? content[language].sending : content[language].send}
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-['Montserrat'] font-normal mb-8 text-gray-800 lowercase">
                    {content[language].contactTitle}
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-[#00ade0] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-['Montserrat'] font-medium text-gray-800 mb-1">Email</h3>
                      <p className="text-gray-600">{contactInfo?.email || 'contato@forense.io'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-[#00ade0] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-['Montserrat'] font-medium text-gray-800 mb-1">
                        {language === 'pt' ? 'Telefone' : 
                         language === 'en' ? 'Phone' : 
                         'Teléfono'}
                      </h3>
                      <p className="text-gray-600">{contactInfo?.phone || '+55 11 4002-8922'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-[#00ade0] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-['Montserrat'] font-medium text-gray-800 mb-1">
                        {content[language].address}
                      </h3>
                      <p className="text-gray-600">{contactInfo?.address || 'São Paulo, Brasil'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-[#00ade0] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-['Montserrat'] font-medium text-gray-800 mb-1">
                        {content[language].businessHours}
                      </h3>
                      <p className="text-gray-600">
                        {contactInfo?.businessHours || 
                         (language === 'pt' ? 'Segunda a Sexta, 9h às 18h' :
                          language === 'en' ? 'Monday to Friday, 9am to 6pm' :
                          'Lunes a Viernes, 9h a 18h')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}