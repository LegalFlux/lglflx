
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();
  const primaryColor = '#33254C';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-primary font-display text-2xl font-semibold" style={{ color: primaryColor }}>Legal</span>
            <span className="text-foreground font-display text-2xl">Flux</span>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <Button asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link to="/auth">Entrar</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Gestão Jurídica Simplificada</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Uma plataforma completa para advogados, solicitadores e agentes de execução gerir processos, 
              clientes e documentos com eficiência.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="font-semibold" style={{ backgroundColor: primaryColor }}>
                <Link to="/auth">Experimente Grátis</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precos">Ver Planos</a>
              </Button>
            </div>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
            <iframe 
              src="https://player.vimeo.com/video/1062960326?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
              title="LegalFlux"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades Principais</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Gestão de Processos</h3>
              <p className="text-muted-foreground">Organize todos os seus processos jurídicos com facilidade, acompanhe prazos e mantenha-se atualizado.</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Gestão Documental</h3>
              <p className="text-muted-foreground">Armazene, organize e assine documentos digitalmente. Crie modelos reutilizáveis para aumentar sua produtividade.</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Portal do Cliente</h3>
              <p className="text-muted-foreground">Ofereça aos seus clientes acesso transparente aos seus processos e documentos através de um portal seguro.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Planos e Preços</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold mb-2">Básico</h3>
                <div className="text-3xl font-bold mb-2">€29<span className="text-lg text-muted-foreground">/mês</span></div>
                <p className="text-muted-foreground">Ideal para profissionais independentes</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Até 50 processos ativos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>5GB de armazenamento</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Portal do cliente</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">Começar</Button>
              </div>
            </div>
            
            <div className="border border-primary rounded-lg overflow-hidden shadow-md">
              <div className="p-6 border-b bg-primary/5">
                <h3 className="text-xl font-semibold mb-2">Profissional</h3>
                <div className="text-3xl font-bold mb-2">€59<span className="text-lg text-muted-foreground">/mês</span></div>
                <p className="text-muted-foreground">Para escritórios em crescimento</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Até 200 processos ativos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>20GB de armazenamento</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Portal do cliente personalizado</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Assinatura digital</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" style={{ backgroundColor: primaryColor }}>Começar</Button>
              </div>
            </div>
            
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold mb-2">Empresarial</h3>
                <div className="text-3xl font-bold mb-2">€99<span className="text-lg text-muted-foreground">/mês</span></div>
                <p className="text-muted-foreground">Para grandes escritórios</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Processos ilimitados</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>50GB de armazenamento</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Suporte prioritário</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>API para integrações</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">Começar</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <span className="text-primary font-display text-xl font-semibold" style={{ color: primaryColor }}>Legal</span>
                <span className="text-foreground font-display text-xl">Flux</span>
              </div>
              <p className="text-muted-foreground">Gestão jurídica simplificada para advogados, solicitadores e agentes de execução.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contactos</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>+351 220 145 169</li>
                <li>suporte@legalflux.pt</li>
                <li>www.legalflux.pt</li>
                <li>
                  <div className="flex space-x-4 mt-4">
                    <a href="https://www.instagram.com/legalflux.pt/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      Instagram
                    </a>
                    <a href="https://vimeo.com/user119294787" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      Vimeo
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      LinkedIn
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Termos e Condições</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Política de Privacidade</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">FAQ</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Suporte</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} LegalFlux. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
