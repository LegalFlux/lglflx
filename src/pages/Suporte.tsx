
import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { HelpCircle, ArrowRight, Mail, Phone, MessageSquare, BookOpen, Video, Users } from "lucide-react";
import Button from "@/components/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Card from "@/components/Card";

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="border-b border-border py-4"
    >
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
        className={`mt-2 text-muted-foreground overflow-hidden transition-all ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <p>{answer}</p>
      </div>
    </motion.div>
  );
};

const SupportChannel = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="h-full">
        <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button variant="outline" className="w-full">
          Aceder <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Card>
    </motion.div>
  );
};

const Support = () => {
  return (
    <PageTransition>
      <Navbar />
      <main>
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium mb-4"
              >
                Central de Ajuda
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Como podemos ajudar?
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto text-lg text-muted-foreground"
              >
                A nossa equipa de suporte está disponível para resolver qualquer dúvida ou problema que possa surgir.
              </motion.p>
            </div>

            <div className="mb-16">
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Pesquisar na base de conhecimento..."
                    className="pl-10 py-6 text-lg"
                  />
                  <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Button className="absolute right-1 top-1/2 transform -translate-y-1/2">
                    Pesquisar
                  </Button>
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
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl font-bold mb-8 text-center"
              >
                Recursos para Aprendizagem
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="p-6 border border-border rounded-xl bg-background"
                >
                  <Video className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Tutoriais em Vídeo</h3>
                  <p className="text-muted-foreground mb-4">
                    Aprenda a utilizar todas as funcionalidades do LegalFlux com os nossos vídeos detalhados.
                  </p>
                  <Button variant="outline" className="w-full">
                    Ver tutoriais
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 border border-border rounded-xl bg-background"
                >
                  <BookOpen className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Guia do Utilizador</h3>
                  <p className="text-muted-foreground mb-4">
                    Manual completo com explicações detalhadas de todas as funcionalidades da plataforma.
                  </p>
                  <Button variant="outline" className="w-full">
                    Ler manual
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="p-6 border border-border rounded-xl bg-background"
                >
                  <Users className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Sessões de Treino</h3>
                  <p className="text-muted-foreground mb-4">
                    Agende uma sessão de treino personalizada para a sua equipa com os nossos especialistas.
                  </p>
                  <Button variant="outline" className="w-full">
                    Agendar treino
                  </Button>
                </motion.div>
              </div>
            </div>

            <div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl font-bold mb-8 text-center"
              >
                Perguntas Frequentes
              </motion.h2>
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-16 p-8 bg-primary text-primary-foreground rounded-xl text-center"
            >
              <h2 className="text-2xl font-bold mb-4">Não encontrou o que procura?</h2>
              <p className="max-w-2xl mx-auto mb-8">
                A nossa equipa de suporte está sempre disponível para ajudar com quaisquer questões ou problemas que possa ter.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Contacte-nos
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default Support;
