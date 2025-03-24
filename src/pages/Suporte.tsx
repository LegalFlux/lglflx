'use client';

import React from 'react';
import Navbar from "@/components/layout/Navbar";
import { HelpCircle, ArrowRight, Mail, Phone, MessageSquare, BookOpen, Video, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Componente Card completo
const SimpleCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`p-6 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow ${className}`}>
      {children}
    </div>
  );
};

// Componente Button completo
const SimpleButton = ({ 
  children, 
  variant = "default", 
  className = "", 
  disabled = false,
  ...props 
}: { 
  children: React.ReactNode, 
  variant?: "default" | "outline" | "ghost", 
  className?: string,
  disabled?: boolean,
  [key: string]: any 
}) => {
  const baseClass = "px-4 py-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50";
  
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-400",
    ghost: "hover:bg-gray-100 focus-visible:ring-gray-300"
  };
  
  return (
    <button 
      className={`${baseClass} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Componente PageTransition completo
const SimplePageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="animate-in fade-in duration-300">
      {children}
    </div>
  );
};

// Componente FAQItem completo
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
          {question}
        </h3>
        <span className={`ml-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-400 group-hover:text-blue-600 transition-colors"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="mt-3 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

// Componente SupportChannel completo
const SupportChannel = ({ 
  icon: Icon, 
  title, 
  description,
  actionText = "Aceder"
}: { 
  icon: React.ComponentType<{ className?: string }>, 
  title: string, 
  description: string,
  actionText?: string
}) => {
  return (
    <SimpleCard className="h-full flex flex-col">
      <div className="p-2 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      <SimpleButton 
        variant="outline" 
        className="w-full mt-auto flex items-center justify-center"
      >
        {actionText} <ArrowRight className="ml-2 h-4 w-4" />
      </SimpleButton>
    </SimpleCard>
  );
};

const Support = () => {
  return (
    <SimplePageTransition>
      <Navbar />
      <main className="min-h-screen">
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Seção Hero */}
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600 font-medium mb-4">
                Central de Ajuda
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Como podemos ajudar?
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-gray-600">
                A nossa equipa de suporte está disponível para resolver qualquer dúvida ou problema que possa surgir.
              </p>
            </div>

            {/* Barra de pesquisa */}
            <div className="mb-16">
              <div className="max-w-2xl mx-auto">
                <Label htmlFor="search" className="sr-only">Pesquisar</Label>
                <div className="relative">
                  <Input
                    id="search"
                    type="text"
                    placeholder="Pesquisar na base de conhecimento..."
                    className="pl-10 py-6 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <SimpleButton className="absolute right-1 top-1/2 transform -translate-y-1/2 h-[calc(100%-8px)] m-1">
                    Pesquisar
                  </SimpleButton>
                </div>
              </div>
            </div>

            {/* Canais de suporte */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <SupportChannel
                icon={Mail}
                title="E-mail"
                description="Envie-nos um e-mail e responderemos dentro de 24 horas úteis."
                actionText="Enviar e-mail"
              />
              <SupportChannel
                icon={MessageSquare}
                title="Chat ao Vivo"
                description="Fale diretamente com a nossa equipa de suporte em tempo real."
              />
              <SupportChannel
                icon={BookOpen}
                title="Documentação"
                description="Explore a nossa documentação detalhada com tutoriais passo-a-passo."
              />
              <SupportChannel
                icon={Phone}
                title="Telefone"
                description="Prefere falar? Ligue para o nosso suporte telefónico."
                actionText="Ligar agora"
              />
            </div>

            {/* Recursos de aprendizagem */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">
                Recursos para Aprendizagem
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SimpleCard>
                  <div className="p-2 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <Video className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Tutoriais em Vídeo</h3>
                  <p className="text-gray-600 mb-6">
                    Aprenda a utilizar todas as funcionalidades do LegalFlux com os nossos vídeos detalhados.
                  </p>
                  <SimpleButton variant="outline" className="w-full">
                    Ver tutoriais
                  </SimpleButton>
                </SimpleCard>
                
                <SimpleCard>
                  <div className="p-2 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Guia do Utilizador</h3>
                  <p className="text-gray-600 mb-6">
                    Manual completo com explicações detalhadas de todas as funcionalidades da plataforma.
                  </p>
                  <SimpleButton variant="outline" className="w-full">
                    Ler manual
                  </SimpleButton>
                </SimpleCard>
                
                <SimpleCard>
                  <div className="p-2 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Sessões de Treino</h3>
                  <p className="text-gray-600 mb-6">
                    Agende uma sessão de treino personalizada para a sua equipa com os nossos especialistas.
                  </p>
                  <SimpleButton variant="outline" className="w-full">
                    Agendar treino
                  </SimpleButton>
                </SimpleCard>
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">
                Perguntas Frequentes
              </h2>
              <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
                <FAQItem
                  question="Como posso começar a utilizar o LegalFlux?"
                  answer="Para começar, basta criar uma conta gratuita no nosso site. Após o registo, será guiado através de um processo de configuração que o ajudará a preparar o seu escritório virtual."
                />
                <FAQItem
                  question="É possível migrar os meus dados de outro sistema?"
                  answer="Sim, oferecemos serviços de migração de dados para todos os planos pagos. A nossa equipa pode ajudar a transferir processos, clientes, documentos e outros dados."
                />
                <FAQItem
                  question="Quantos utilizadores posso adicionar aos diferentes planos?"
                  answer="O plano Free permite até 3 utilizadores, o plano Premium permite até 15 utilizadores, e o plano Enterprise permite utilizadores ilimitados."
                />
                <FAQItem
                  question="Como é garantida a segurança dos meus dados?"
                  answer="Utilizamos encriptação de nível militar (AES-256) para todos os dados, tanto em trânsito como em repouso. Implementamos autenticação multi-fator e controlos de acesso granulares."
                />
              </div>
            </div>

            {/* CTA Final */}
            <div className="mt-16 p-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl text-center">
              <h2 className="text-2xl font-bold mb-4">Não encontrou o que procura?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-blue-100">
                A nossa equipa de suporte está sempre disponível para ajudar com quaisquer questões ou problemas que possa ter.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <SimpleButton 
                  className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3 text-base"
                >
                  Contacte-nos
                </SimpleButton>
                <SimpleButton 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 px-8 py-3 text-base"
                >
                  Agendar demonstração
                </SimpleButton>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SimplePageTransition>
  );
};

export default Support;
