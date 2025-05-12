import { Link } from 'wouter';
import { useI18n } from '@/lib/i18n';
import { useQuery } from '@tanstack/react-query';

export default function Footer() {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();
  
  // Fetch social media links from API (will implement later in admin)
  const socialLinks = {
    linkedin: "https://www.linkedin.com/company/ness-security",
    twitter: "https://twitter.com/ness_security",
    facebook: "https://facebook.com/ness.security",
    instagram: "https://instagram.com/ness.security"
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-white text-xl mb-6 inline-block lowercase">
              ness<span style={{color: "#00ade0", marginLeft: "1px"}}>.</span>
            </Link>
            <p className="text-gray-300 mb-6">
              Desde 1991, fornecemos soluções empresariais de alta qualidade com foco em cibersegurança, infraestrutura e arquitetura de software.
            </p>
            <div className="flex space-x-4">
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent transition duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent transition duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent transition duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent transition duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-300 hover:text-accent transition duration-300">{t('nav.home')}</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-accent transition duration-300">{t('nav.about')}</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-accent transition duration-300">{t('nav.services')}</Link></li>
              <li><Link href="/jobs" className="text-gray-300 hover:text-accent transition duration-300">{t('nav.jobs')}</Link></li>
              <li><Link href="/news" className="text-gray-300 hover:text-accent transition duration-300">{t('nav.news')}</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-accent transition duration-300">{t('nav.contact')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Soluções</h4>
            <ul className="space-y-3">
              <li><Link href="/services#infraops" className="text-gray-300 hover:text-accent transition duration-300">n.InfraOps</Link></li>
              <li><Link href="/services#secops" className="text-gray-300 hover:text-accent transition duration-300">n.SecOps</Link></li>
              <li><Link href="/services#devarch" className="text-gray-300 hover:text-accent transition duration-300">n.DevArch</Link></li>
              <li><Link href="/services#autoops" className="text-gray-300 hover:text-accent transition duration-300">n.AutoOps</Link></li>
              <li><Link href="/services#crisisops" className="text-gray-300 hover:text-accent transition duration-300">n.CrisisOps</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Documentos Legais</h4>
            <ul className="space-y-3">
              <li><Link href="/terms" className="text-gray-300 hover:text-accent transition duration-300">Termos de Uso</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-accent transition duration-300">Política de Privacidade</Link></li>
              <li><Link href="/ethics" className="text-gray-300 hover:text-accent transition duration-300">Código de Ética</Link></li>
              <li><Link href="/security" className="text-gray-300 hover:text-accent transition duration-300">Política de Segurança</Link></li>
              <li><Link href="/cookies" className="text-gray-300 hover:text-accent transition duration-300">Política de Cookies</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; {currentYear} ness<span style={{color: "#00ade0", marginLeft: "1px"}}>.</span> {t('footer.rights')}.</p>
          <div className="mt-2">
            <Link href="/auth" className="text-gray-300 hover:text-accent transition duration-300">{t('nav.login')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
