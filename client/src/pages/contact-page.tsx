import { useState, useRef } from 'react';
import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/common/SEOHead';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(3, 'Nome completo é obrigatório'),
  email: z.string().email('E-mail inválido'),
  company: z.string().min(2, 'Empresa é obrigatória'),
  phone: z.string().min(10, 'Telefone inválido'),
  subject: z.string().min(3, 'Assunto é obrigatório'),
  message: z.string().min(10, 'Mensagem deve ter no mínimo 10 caracteres'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const captchaRef = useRef<HTMLDivElement>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });
  
  // Simulate captcha verification
  const handleCaptchaChange = () => {
    // In a real implementation, this would verify the captcha response with the server
    setCaptchaVerified(true);
  };
  
  const onSubmit = async (data: ContactFormValues) => {
    if (!captchaVerified) {
      toast({
        title: t('contact.toast.verify.title'),
        description: t('contact.toast.verify.desc'),
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here we would send the form data to the server
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t('contact.toast.success.title'),
        description: t('contact.toast.success.desc'),
        variant: "default",
      });
      
      // Reset form after successful submission
      reset();
      setCaptchaVerified(false);
    } catch (error) {
      toast({
        title: t('contact.toast.error.title'),
        description: t('contact.toast.error.desc'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contato - ness.",
    "description": "Entre em contato com nossa equipe para saber mais sobre nossos serviços de tecnologia e segurança."
  };

  // Unused background image kept for potential future use
  const heroBackground = "https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&w=1920&h=1080&q=80";

  return (
    <>
      <SEOHead
        title="Contato - ness."
        description={t('contact.seo.description')}
        structuredData={structuredData}
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section - consistent with product pages */}
        <section
          className="intro bg-hero-gradient relative flex items-center overflow-hidden"
          style={{ minHeight: '60vh' }}
        >
          <div className="hero-vignette-right" />
          <div className="container mx-auto px-4 z-10 flex items-center h-full">
            <div className="hero-main-content">
              <h1 className="text-[48px] font-['Montserrat'] font-normal text-white mb-6">
                {t('contact.hero.prefix')}{' '}
                <span className="relative">
                  {t('contact.hero.highlight')}
                  <span className="absolute bottom-1 left-0 w-full h-1 bg-accent"></span>
                </span>
              </h1>
              <p className="text-base leading-6 text-[#F5F5F5] max-w-3xl">
                {t('contact.hero.text')}
              </p>
            </div>
          </div>
        </section>
      
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-['Montserrat'] text-primary mb-8">{t('contact.form.title')}</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-2">{t('contact.form.name')}</label>
                      <input 
                        type="text" 
                        id="name" 
                        {...register('name')}
                        className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent`} 
                      />
                      {errors.name && (
                        <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2">{t('contact.form.email')}</label>
                      <input 
                        type="email" 
                        id="email" 
                        {...register('email')}
                        className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent`} 
                      />
                      {errors.email && (
                        <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-gray-700 mb-2">{t('contact.form.company')}</label>
                      <input 
                        type="text" 
                        id="company" 
                        {...register('company')}
                        className={`w-full p-3 border ${errors.company ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent`} 
                      />
                      {errors.company && (
                        <p className="mt-1 text-red-500 text-sm">{errors.company.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 mb-2">{t('contact.form.phone')}</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        {...register('phone')}
                        className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent`} 
                      />
                      {errors.phone && (
                        <p className="mt-1 text-red-500 text-sm">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 mb-2">{t('contact.form.subject')}</label>
                    <input 
                      type="text" 
                      id="subject" 
                      {...register('subject')}
                      className={`w-full p-3 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent`} 
                    />
                    {errors.subject && (
                      <p className="mt-1 text-red-500 text-sm">{errors.subject.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-2">{t('contact.form.message')}</label>
                    <textarea 
                      id="message" 
                      rows={5} 
                      {...register('message')}
                      className={`w-full p-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent`}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">{t('contact.form.verification')}</label>
                    <div 
                      ref={captchaRef}
                      className="border border-gray-300 rounded-md overflow-hidden"
                    >
                      {/* Simulação de CAPTCHA - Em produção, usar reCAPTCHA ou similar */}
                      <div className="flex flex-col">
                        <div className="bg-blue-50 p-2 border-b border-gray-300 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-gray-600">{t('contact.form.security')}</span>
                        </div>
                        <div className="p-4 flex items-center">
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="captcha" 
                              className="mr-2 h-5 w-5 rounded border-gray-300 text-accent focus:ring-accent"
                              onChange={handleCaptchaChange}
                              checked={captchaVerified}
                            />
                            <label htmlFor="captcha" className="text-gray-700 flex items-center">
                              <span>{t('contact.form.notRobot')}</span>
                              <div className="ml-8 flex items-center space-x-2 pl-2 border-l border-gray-300">
                                <span className="text-xs text-gray-500">reCAPTCHA</span>
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-2 py-1 border-t border-gray-300">
                          <p className="text-xs text-gray-500">{t('contact.form.protected')}
                            <a href="#" className="text-blue-500 hover:underline ml-1">{t('contact.form.privacy')}</a> -
                            <a href="#" className="text-blue-500 hover:underline ml-1">{t('contact.form.terms')}</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-accent hover:bg-accent-dark text-white py-3 px-8 rounded-md font-medium transition duration-300 inline-block disabled:opacity-70"
                  >
                    {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                  </button>
                </form>
              </div>
              
              <div className="mt-8 lg:mt-0">
                <h2 className="text-3xl font-['Montserrat'] text-primary mb-8">{t('contact.info.title')}</h2>
                
                <div className="space-y-8 mb-12">
                  <div className="flex items-start">
                    <div className="bg-primary p-3 rounded-full text-white mr-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-800 mb-2">{t('contact.info.office')}</h3>
                      <p className="text-gray-600">
                        Av. Paulista, 1000, Bela Vista<br />
                        São Paulo, SP - 01310-100<br />
                        Brasil
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary p-3 rounded-full text-white mr-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-800 mb-2">{t('contact.info.phones')}</h3>
                      <p className="text-gray-600 mb-2">
                        <strong>Comercial:</strong> +55 (11) 3456-7890
                      </p>
                      <p className="text-gray-600">
                        <strong>Suporte:</strong> +55 (11) 3456-7891
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary p-3 rounded-full text-white mr-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-800 mb-2">{t('contact.info.email')}</h3>
                      <p className="text-gray-600 mb-2">
                        <strong>Comercial:</strong> comercial@ness.com.br
                      </p>
                      <p className="text-gray-600">
                        <strong>Suporte:</strong> suporte@ness.com.br
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-neutral rounded-lg p-8 shadow">
                  <h3 className="text-xl font-medium text-gray-800 mb-4">{t('contact.info.hours')}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('contact.info.weekdays')}</span>
                      <span className="text-gray-800 font-medium">9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('contact.info.emergency')}</span>
                      <span className="text-gray-800 font-medium">24/7</span>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-lg font-medium text-gray-800 mb-4">{t('contact.info.follow')}</h4>
                    <div className="flex space-x-4">
                      <a href="#" className="bg-primary hover:bg-primary-dark p-2 rounded-full text-white transition duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                      <a href="#" className="bg-primary hover:bg-primary-dark p-2 rounded-full text-white transition duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </a>
                      <a href="#" className="bg-primary hover:bg-primary-dark p-2 rounded-full text-white transition duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mapa */}
        <section className="w-full h-96 bg-gray-200">
          {/* Em produção, incluir um mapa real com a localização */}
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-800 mb-2">{t('contact.map.title')}</h3>
              <p className="text-gray-600">Av. Paulista, 1000, Bela Vista, São Paulo</p>
              <p className="text-sm text-gray-500 mt-4">{t('contact.map.placeholder')}</p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
