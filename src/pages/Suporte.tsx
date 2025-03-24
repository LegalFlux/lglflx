import React from 'react';
 import Navbar from "@/components/Navbar";
 import { HelpCircle, ArrowRight, Mail, Phone, MessageSquare, BookOpen, Video, Users } from "lucide-react";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 
 // Componente simplificado para substituir o Card que está faltando
 const SimpleCard = ({ children, className = "" }) => {
   return (
     <div className={`p-6 border border-gray-200 rounded-xl bg-white ${className}`}>
       {children}
     </div>
   );
 };
 
 // Componente simplificado para substituir o Button que está faltando
 const SimpleButton = ({ children, variant = "default", className = "", ...props }) => {
   const baseClass = "px-4 py-2 rounded font-medium";
   const variantClass = variant === "outline" 
     ? "border border-gray-300 hover:bg-gray-100" 
     : "bg-blue-600 text-white hover:bg-blue-700";
   
   return (
     <button className={`${baseClass} ${variantClass} ${className}`} {...props}>
       {children}
     </button>
   );
 };
 
 // Componente simplificado para substituir o PageTransition que está faltando
 const SimplePageTransition = ({ children }) => {
   return <div>{children}</div>;
 };
 
 const FAQItem = ({ question, answer }) => {
   const [isOpen, setIsOpen] = React.useState(false);
 
   return (
     <div className="border-b border-gray-200 py-4">
       <button
         className="flex justify-between items-center w-full text-left"
         onClick={() => setIsOpen(!isOpen)}
       >
         <h3 className="text-lg font-medium">{question}</h3>
         <span
           className={`transform transition-transform ${
             isOpen ? "rotate-180" : ""
           }`}
         >
           <svg
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
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
       <div
         className={`mt-2 text-gray-600 overflow-hidden transition-all ${
           isOpen ? "max-h-96" : "max-h-0"
         }`}
       >
         <p>{answer}</p>
       </div>
     </div>
   ) ;
 };
 
 const SupportChannel = ({ icon: Icon, title, description }) => {
   return (
     <div>
       <SimpleCard>
         <div className="p-2 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
           <Icon className="h-6 w-6 text-blue-600" />
         </div>
         <h3 className="text-xl font-semibold mb-2">{title}</h3>
         <p className="text-gray-600 mb-4">{description}</p>
         <SimpleButton variant="outline" className="w-full">
           Aceder <ArrowRight className="ml-2 h-4 w-4 inline" />
         </SimpleButton>
       </SimpleCard>
     </div>
   );
 };
 
 const Support = () => {
   return (
     <SimplePageTransition>
       <Navbar />
       <main>
         <section className="py-20">
           <div className="container mx-auto px-4 sm:px-6">
             <div className="text-center mb-16">
               <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600 font-medium mb-4">
                 Central de Ajuda
               </span>
               <h1 className="text-3xl md:text-4xl font-bold mb-4">
                 Como podemos ajudar?
               </h1>
               <p className="max-w-2xl mx-auto text-lg text-gray-600">
                 A nossa equipa de suporte está disponível para resolver qualquer dúvida ou problema que possa surgir.
               </p>
             </div>
 
             <div className="mb-16">
               <div className="max-w-2xl mx-auto">
                 <div className="relative">
                   <Input
                     type="text"
                     placeholder="Pesquisar na base de conhecimento..."
                     className="pl-10 py-6 text-lg"
                   />
                   <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                   <SimpleButton className="absolute right-1 top-1/2 transform -translate-y-1/2">
                     Pesquisar
                   </SimpleButton>
                 </div>
               </div>
             </div>
 
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
               <SupportChannel
                 icon={Mail}
                 title="E-mail"
                 description="Envie-nos um e-mail e responderemos dentro de 24 horas úteis."
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
               />
             </div>
 
             <div className="mb-16">
               <h2 className="text-2xl font-bold mb-8 text-center">
                 Recursos para Aprendizagem
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <SimpleCard>
                   <Video className="h-8 w-8 text-blue-600 mb-4" />
                   <h3 className="text-xl font-semibold mb-2">Tutoriais em Vídeo</h3>
                   <p className="text-gray-600 mb-4">
                     Aprenda a utilizar todas as funcionalidades do LegalFlux com os nossos vídeos detalhados.
                   </p>
                   <SimpleButton variant="outline" className="w-full">
                     Ver tutoriais
                   </SimpleButton>
                 </SimpleCard>
                 <SimpleCard>
                   <BookOpen className="h-8 w-8 text-blue-600 mb-4" />
                   <h3 className="text-xl font-semibold mb-2">Guia do Utilizador</h3>
                   <p className="text-gray-600 mb-4">
                     Manual completo com explicações detalhadas de todas as funcionalidades da plataforma.
                   </p>
                   <SimpleButton variant="outline" className="w-full">
                     Ler manual
                   </SimpleButton>
                 </SimpleCard>
                 <SimpleCard>
                   <Users className="h-8 w-8 text-blue-600 mb-4" />
                   <h3 className="text-xl font-semibold mb-2">Sessões de Treino</h3>
                   <p className="text-gray-600 mb-4">
                     Agende uma sessão de treino personalizada para a sua equipa com os nossos especialistas.
                   </p>
                   <SimpleButton variant="outline" className="w-full">
                     Agendar treino
                   </SimpleButton>
                 </SimpleCard>
               </div>
             </div>
 
             <div>
               <h2 className="text-2xl font-bold mb-8 text-center">
                 Perguntas Frequentes
               </h2>
               <div className="max-w-3xl mx-auto">
                 <FAQItem
                   question="Como posso começar a utilizar o LegalFlux?"
                   answer="Para começar, basta criar uma conta gratuita no nosso site. Após o registo, será guiado através de um processo de configuração que o ajudará a preparar o seu escritório virtual. Pode começar a utilizar todas as funcionalidades do plano gratuito imediatamente."
                 />
                 <FAQItem
                   question="É possível migrar os meus dados de outro sistema?"
                   answer="Sim, oferecemos serviços de migração de dados para todos os planos pagos. A nossa equipa pode ajudar a transferir processos, clientes, documentos e outros dados do seu sistema atual para o LegalFlux, garantindo uma transição suave."
                 />
                 <FAQItem
                   question="Quantos utilizadores posso adicionar aos diferentes planos?"
                   answer="O plano Free permite até 3 utilizadores, o plano Premium permite até 15 utilizadores, e o plano Enterprise permite utilizadores ilimitados. Para necessidades específicas, contacte a nossa equipa de vendas para discutir opções personalizadas."
                 />
                 <FAQItem
                   question="Como é garantida a segurança dos meus dados?"
                   answer="Utilizamos encriptação de nível militar (AES-256) para todos os dados, tanto em trânsito como em repouso. Implementamos autenticação multi-fator, controlos de acesso granulares e realizamos auditorias de segurança regulares. Todos os nossos servidores estão localizados em data centers com certificação ISO 27001."
                 />
                 <FAQItem
                   question="Posso cancelar a minha subscrição a qualquer momento?"
                   answer="Sim, pode cancelar a sua subscrição a qualquer momento sem custos adicionais. Após o cancelamento, terá acesso à sua conta até ao final do período de faturação atual. Oferecemos também um período de exportação de dados de 30 dias após o término da subscrição."
                 />
                 <FAQItem
                   question="O LegalFlux está em conformidade com o RGPD?"
                   answer="Sim, o LegalFlux está totalmente em conformidade com o Regulamento Geral de Proteção de Dados (RGPD) da UE. Implementamos todas as medidas técnicas e organizacionais necessárias para garantir a proteção dos dados pessoais processados na nossa plataforma."
                 />
               </div>
             </div>
 
             <div className="mt-16 p-8 bg-blue-600 text-white rounded-xl text-center">
               <h2 className="text-2xl font-bold mb-4">Não encontrou o que procura?</h2>
               <p className="max-w-2xl mx-auto mb-8">
                 A nossa equipa de suporte está sempre disponível para ajudar com quaisquer questões ou problemas que possa ter.
               </p>
               <div className="flex flex-wrap justify-center gap-4">
                 <SimpleButton 
                   className="bg-white text-blue-600 hover:bg-white/90"
                 >
                   Contacte-nos
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
