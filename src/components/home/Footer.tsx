
import React from 'react';
import { Link } from 'react-router-dom';
import { Euro, Instagram, Linkedin, MessageSquare } from 'lucide-react';

const Footer: React.FC = () => {
  const primaryColor = '#33254C';

  return (
    <footer className="mt-auto py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-primary font-display text-xl font-semibold" style={{ color: primaryColor }}>Legal</span>
              <span className="text-foreground font-display text-xl">Flux</span>
            </div>
            <p className="text-muted-foreground">Gestão jurídica simplificada para advogados, solicitadores e agentes de execução.</p>
            
            <div className="mt-4">
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Euro size={16} />
                <span>Planos desde 49€/mês</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contactos</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>+351 220 145 169</li>
              <li>suporte@legalflux.pt</li>
              <li>www.legalflux.pt</li>
              <li>
                <div className="flex space-x-4 mt-4">
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" 
                     className="text-muted-foreground hover:text-primary" aria-label="Instagram">
                    <Instagram size={20} />
                  </a>
                  <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" 
                     className="text-muted-foreground hover:text-primary" aria-label="LinkedIn">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://vimeo.com/" target="_blank" rel="noopener noreferrer" 
                     className="text-muted-foreground hover:text-primary" aria-label="Vimeo">
                    <MessageSquare size={20} />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/planos" className="text-muted-foreground hover:text-primary">Planos e Preços</Link></li>
              <li><Link to="/termos" className="text-muted-foreground hover:text-primary">Termos e Condições</Link></li>
              <li><Link to="/privacidade" className="text-muted-foreground hover:text-primary">Política de Privacidade</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link to="/suporte" className="text-muted-foreground hover:text-primary">Suporte</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LegalFlux. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
