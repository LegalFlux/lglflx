import React from "react";
import { Link } from "react-router-dom";
import { Euro, Instagram, Linkedin, MessageSquare } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: "/planos", label: "Planos e Preços" },
    { path: "/about", label: "Sobre Nós" },
    { path: "/terms", label: "Termos e Condições" }, // Link para terms.tsx
    { path: "/privacy", label: "Política de Privacidade" }, // Link para privacy.tsx
    { path: "/cookies", label: "Política de Cookies" }, // Link para cookies.tsx
    { path: "/faq", label: "FAQ" },
    { path: "/suporte", label: "Suporte" },
  ];

  return (
    <footer className="mt-auto py-12 bg-background border-t border-border w-full px-4 sm:px-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 1: Logo e Descrição */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-xl font-semibold text-[#33254C]">Legal</span>
              <span className="text-foreground text-xl">Flux</span>
            </div>
            <p className="text-muted-foreground">
              Gestão jurídica simplificada para advogados, solicitadores e agentes de execução.
            </p>

            <div className="mt-4 flex items-center space-x-1 text-muted-foreground">
              <Euro size={16} />
              <span>Planos desde 49€/mês</span>
            </div>
          </div>

          {/* Coluna 2: Contactos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contactos</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>+351 220 145 169</li>
              <li>suporte@legalflux.pt</li>
              <li>
                <a 
                  href="https://www.legalflux.pt" 
                  className="hover:text-primary transition-colors"
                >
                  www.legalflux.pt
                </a>
              </li>
              <li className="mt-4">
                <p className="text-sm mb-2">Siga-nos:</p>
                <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/legalflux.pt/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Instagram da LegalFlux"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/legalflux"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="LinkedIn da LegalFlux"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://vimeo.com/user119294787"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Canal da LegalFlux no Vimeo"
                  >
                    <MessageSquare size={20} />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Direitos reservados */}
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} LegalFlux. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
