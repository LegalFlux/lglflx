
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header com navegação */}
      <header className="w-full px-4 py-4 bg-[#33254C] text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold">LegalFlux</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#caracteristicas" className="hover:text-primary-foreground/80">Características</a>
            <a href="#precos" className="hover:text-primary-foreground/80">Preços</a>
            <a href="#contacto" className="hover:text-primary-foreground/80">Contacto</a>
            <Link to="/auth">
              <Button variant="outline" className="text-white border-white hover:bg-white/20">
                Entrar
              </Button>
            </Link>
          </nav>
          <Link to="/auth" className="md:hidden">
            <Button variant="outline" className="text-white border-white hover:bg-white/20">
              Entrar
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-[#33254C] text-white py-16 md:py-24">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Transforme a gestão do seu escritório de advocacia
            </h1>
            <p className="text-lg md:text-xl text-white/80">
              Plataforma completa para advogados e escritórios que otimiza processos, centraliza informações e potencializa resultados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/auth?register=true">
                <Button className="bg-white text-[#33254C] hover:bg-white/90 w-full sm:w-auto">
                  Comece agora
                </Button>
              </Link>
              <Button variant="outline" className="border-white text-white hover:bg-white/20 w-full sm:w-auto">
                Agendar uma demonstração
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg">
            <div className="aspect-video">
              <iframe 
                src="https://player.vimeo.com/video/1062960326?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                width="100%" 
                height="100%" 
                className="absolute inset-0 w-full h-full object-cover"
                style={{ aspectRatio: '16/9' }}
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                title="LegalFlux"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="caracteristicas" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#33254C]">Tudo que seu escritório precisa</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Uma plataforma completa que centraliza todos os aspetos da gestão do seu escritório de advocacia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#33254C]/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#33254C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Gestão de Processos</h3>
                <p className="text-gray-600">
                  Cadastre e acompanhe todos os seus processos, prazos e audiências em um só lugar.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#33254C]/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#33254C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Gestão de Clientes</h3>
                <p className="text-gray-600">
                  Mantenha os dados dos seus clientes organizados e acessíveis a qualquer momento.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#33254C]/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#33254C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Relatórios Financeiros</h3>
                <p className="text-gray-600">
                  Acompanhe faturação, contas a receber e a gestão financeira do seu escritório.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#33254C]/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#33254C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Agenda Integrada</h3>
                <p className="text-gray-600">
                  Organize compromissos, audiências e prazos com notificações automáticas.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#33254C]/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#33254C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Gestão Documental</h3>
                <p className="text-gray-600">
                  Digitalize, assine e gerencie todos os documentos jurídicos em um único lugar.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#33254C]/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#33254C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Portal do Cliente</h3>
                <p className="text-gray-600">
                  Ofereça aos seus clientes acesso exclusivo para acompanhar seus processos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#33254C]">Planos Flexíveis</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Escolha o plano que melhor se adapta às necessidades do seu escritório.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold">Iniciante</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">€49</span>
                    <span className="text-gray-500">/mês</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Para advogados independentes</p>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Até 50 processos</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Gestão de clientes</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Calendário de prazos</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Armazenamento de 5GB</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#33254C] hover:bg-[#33254C]/90">
                  Selecionar
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg relative border-[#33254C]">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#33254C] text-white px-4 py-1 rounded-full text-sm font-medium">
                Mais Popular
              </div>
              <CardContent className="p-6 flex flex-col h-full">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold">Profissional</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">€99</span>
                    <span className="text-gray-500">/mês</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Para escritórios pequenos</p>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Até 200 processos</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Gestão financeira</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Portal do cliente</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Armazenamento de 20GB</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Modelos de documentos</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#33254C] hover:bg-[#33254C]/90">
                  Selecionar
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold">Empresarial</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">€199</span>
                    <span className="text-gray-500">/mês</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Para escritórios maiores</p>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Processos ilimitados</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Relatórios avançados</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>API personalizada</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Armazenamento de 100GB</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Suporte prioritário</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#33254C] hover:bg-[#33254C]/90">
                  Contacte-nos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#33254C]">Entre em Contacto</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Estamos aqui para responder a todas as suas perguntas sobre o LegalFlux.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Informações de Contacto</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#33254C] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+351 220 145 169</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#33254C] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>suporte@legalflux.pt</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#33254C] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>www.legalflux.pt</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#33254C] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Porto, Portugal</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-8 mb-4">Siga-nos</h3>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/legalflux.pt/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#33254C]/10 flex items-center justify-center text-[#33254C] hover:bg-[#33254C]/20 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="https://vimeo.com/user119294787" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#33254C]/10 flex items-center justify-center text-[#33254C] hover:bg-[#33254C]/20 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.9765 6.4168c-.105 2.338-1.739 5.5429-4.894 9.6088-3.2679 4.247-6.0258 6.3699-8.2898 6.3699-1.409 0-2.578-1.294-3.553-3.881l-1.9179-7.1138c-.719-2.584-1.488-3.878-2.312-3.878-.179 0-.806.378-1.8809 1.132l-1.129-1.457c1.1899-.996 2.3456-1.989 3.4679-2.98 1.5681-1.354 2.7371-2.068 3.5301-2.141 1.8459-.177 2.991 1.085 3.422 3.781.4629 2.927.783 4.7479.9639 5.465.5309 2.4111 1.121 3.6169 1.77 3.6169.5 0 1.254-.792 2.254-2.377 1.003-1.5849 1.54-2.7909 1.617-3.618.14-1.363-.395-2.043-1.617-2.043-.574 0-1.167.121-1.774.391 1.186-3.8679 3.434-5.7519 6.7619-5.6509 2.4731.06 3.6371 1.664 3.4931 4.8168z" />
                  </svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#33254C]/10 flex items-center justify-center text-[#33254C] hover:bg-[#33254C]/20 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Envie-nos uma Mensagem</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33254C]"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33254C]"
                      placeholder="Seu email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33254C]"
                    placeholder="Assunto da mensagem"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33254C]"
                    placeholder="Sua mensagem"
                  ></textarea>
                </div>
                <Button className="w-full bg-[#33254C] hover:bg-[#33254C]/90">
                  Enviar Mensagem
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#33254C] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">LegalFlux</div>
              <p className="text-white/70">
                Plataforma completa para gestão jurídica que simplifica e otimiza o dia a dia do seu escritório.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Recursos</h3>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-white">Preços</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Suporte</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Empresa</h3>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white">Sobre nós</a></li>
                <li><a href="#" className="hover:text-white">Contacto</a></li>
                <li><a href="#" className="hover:text-white">Carreiras</a></li>
                <li><a href="#" className="hover:text-white">Parceiros</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white">Termos de Serviço</a></li>
                <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white">Cookies</a></li>
                <li><a href="#" className="hover:text-white">RGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>&copy; {new Date().getFullYear()} LegalFlux. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
