import { ReactNode } from 'react';
import { Link } from 'wouter';
import { Home, FileText, Briefcase, Newspaper, Settings, Users, LogOut } from 'lucide-react';
import { User } from '@shared/schema';

interface AdminLayoutProps {
  title: string;
  children: ReactNode;
  user: User;
  onLogout: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function AdminLayout({
  title,
  children,
  user,
  onLogout,
  activeSection,
  setActiveSection
}: AdminLayoutProps) {
  const sidebarItems = [
    { 
      icon: <Home className="w-5 h-5" />, 
      label: 'Dashboard', 
      href: '/admin/dashboard',
      id: 'overview'
    },
    { 
      icon: <FileText className="w-5 h-5" />, 
      label: 'Conteúdos', 
      href: '/admin/content',
      id: 'content'
    },
    { 
      icon: <Briefcase className="w-5 h-5" />, 
      label: 'Vagas', 
      href: '/admin/jobs',
      id: 'jobs'
    },
    { 
      icon: <Newspaper className="w-5 h-5" />, 
      label: 'Notícias', 
      href: '/admin/news',
      id: 'news'
    },
    { 
      icon: <Settings className="w-5 h-5" />, 
      label: 'Configurações', 
      href: '/admin/settings',
      id: 'settings'
    },
  ];
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:bg-white md:border-r md:border-gray-200">
        <div className="flex flex-col flex-grow p-4">
          <div className="py-4 border-b border-gray-200 mb-4">
            <Link href="/admin/dashboard">
              <a className="flex items-center">
                <h1 className="text-xl font-['Montserrat'] font-normal text-primary">
                  ness<span className="text-accent">.</span> <span className="font-medium">admin</span>
                </h1>
              </a>
            </Link>
          </div>
          
          <div className="flex-grow">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <Link key={item.id} href={item.href}>
                  <a 
                    className={`
                      flex items-center px-4 py-3 text-gray-700 rounded-md transition-colors
                      ${activeSection === item.id ? 'bg-primary text-white' : 'hover:bg-gray-100'}
                    `}
                    onClick={() => setActiveSection(item.id)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </a>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-900">{user.username}</p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
              <button
                onClick={onLogout}
                className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 sm:px-6 flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
            
            <div className="flex items-center md:hidden">
              <button
                onClick={onLogout}
                className="ml-2 p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Mobile navigation */}
          <div className="md:hidden border-t border-gray-200">
            <div className="flex overflow-x-auto space-x-2 px-4 py-2">
              {sidebarItems.map((item) => (
                <Link key={item.id} href={item.href}>
                  <a 
                    className={`
                      flex-shrink-0 flex items-center px-3 py-1.5 text-sm rounded-md transition-colors
                      ${activeSection === item.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                    `}
                    onClick={() => setActiveSection(item.id)}
                  >
                    {item.icon}
                    <span className="ml-1.5">{item.label}</span>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}