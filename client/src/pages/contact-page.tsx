import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/common/SEOHead';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactSection from '@/components/sections/ContactSection';

export default function ContactPage() {
  const { t } = useI18n();
  
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "ness. - Contato",
    "description": "Entre em contato com nossa equipe para saber mais sobre nossos serviços de tecnologia e segurança."
  };

  return (
    <>
      <SEOHead 
        title="Contato - ness."
        description="Entre em contato com nossa equipe para saber mais sobre nossos serviços de tecnologia e segurança."
        structuredData={structuredData}
      />
      
      <Navbar />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Entre em Contato</h1>
            <p className="text-lg text-gray-600">
              Estamos prontos para conversar sobre suas necessidades em tecnologia e segurança.
              Preencha o formulário abaixo e nossa equipe entrará em contato.
            </p>
          </div>
          
          <ContactSection />
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Endereço</h3>
              <p className="text-gray-600">
                Av. Paulista, 1000, Bela Vista<br />
                São Paulo, SP, 01310-100<br />
                Brasil
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Email & Telefone</h3>
              <p className="text-gray-600 mb-2">
                <strong>Suporte:</strong> suporte@ness.com.br
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Comercial:</strong> comercial@ness.com.br
              </p>
              <p className="text-gray-600">
                <strong>Telefone:</strong> +55 11 3456-7890
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Horário de Atendimento</h3>
              <p className="text-gray-600 mb-2">
                <strong>Segunda a Sexta:</strong> 09:00 - 18:00
              </p>
              <p className="text-gray-600">
                <strong>Suporte Emergencial:</strong> 24/7
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}