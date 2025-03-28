import React from 'react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                    Gestão Jurídica Simplificada
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-[600px]">
                    Uma plataforma completa para advogados, solicitadores e agentes de execução gerir processos, clientes e documentos com eficiência.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/auth?tab=register">
                    <Button size="lg" className="w-full sm:w-auto">
                      Experimente Grátis
                    </Button>
                  </Link>
                  <Link href="/precos">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Ver Planos
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative lg:ml-auto">
                <div className="relative w-full aspect-video overflow-hidden rounded-xl shadow-xl">
                  <img
                    src="/images/dashboard-preview.webp"
                    alt="Dashboard do LegalFlux"
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/800x450/3b82f6/ffffff?text=LegalFlux+Dashboard';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter">Funcionalidades Principais</h2>
              <p className="text-muted-foreground mt-2">Tudo o que precisa para gerir o seu escritório jurídico</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                    <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"></path>
                    <line x1="9" y1="9" x2="10" y2="9"></line>
                    <line x1="9" y1="13" x2="15" y2="13"></line>
                    <line x1="9" y1="17" x2="15" y2="17"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Gestão de Processos</h3>
                <p className="text-muted-foreground">
                  Organize todos os seus processos jurídicos com facilidade, acompanhe prazos e mantenha-se atualizado.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    <path d="M12 11h4"></path>
                    <path d="M12 16h4"></path>
                    <path d="M8 11h.01"></path>
                    <path d="M8 16h.01"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Gestão Documental</h3>
                <p className="text-muted-foreground">
                  Armazene, organize e assine documentos digitalmente. Crie modelos reutilizáveis para aumentar sua produtividade.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Portal do Cliente</h3>
                <p className="text-muted-foreground">
                  Ofereça aos seus clientes acesso transparente aos seus processos e documentos através de um portal seguro.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-10 shadow-lg">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Pronto para transformar a gestão do seu escritório?
                </h2>
                <p className="text-primary-foreground/90 mb-6">
                  Junte-se a milhares de profissionais jurídicos que já estão a utilizar o LegalFlux para aumentar a sua produtividade.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/auth?tab=register">
                    <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                      Começar Agora
                    </Button>
                  </Link>
                  <Link href="/suporte">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/20 hover:bg-primary-foreground/10">
                      Agendar Demonstração
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">LegalFlux</h3>
              <p className="text-sm text-muted-foreground">
                Plataforma de gestão jurídica completa para advogados, solicitadores e agentes de execução.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Produto</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/funcionalidades" className="text-muted-foreground hover:text-foreground">Funcionalidades</Link></li>
                <li><Link href="/subscriptions" className="text-muted-foreground hover:text-foreground">Preços</Link></li>
                <li><Link href="/suporte" className="text-muted-foreground hover:text-foreground">Suporte</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Empresa</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/sobre" className="text-muted-foreground hover:text-foreground">Sobre nós</Link></li>
                <li><Link href="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link href="/contacto" className="text-muted-foreground hover:text-foreground">Contacto</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/termos" className="text-muted-foreground hover:text-foreground">Termos de Serviço</Link></li>
                <li><Link href="/privacidade" className="text-muted-foreground hover:text-foreground">Política de Privacidade</Link></li>
                <li><Link href="/cookies" className="text-muted-foreground hover:text-foreground">Política de Cookies</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} LegalFlux. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://twitter.com" className="text-muted-foreground hover:text-foreground" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://linkedin.com" className="text-muted-foreground hover:text-foreground" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
