
import React from 'react';

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
  );
};

export default Footer;
