import { motion } from "motion/react";
import { FileText, ArrowLeft, ShieldAlert, CheckCircle2, Shield } from "lucide-react";

interface TermsOfUseProps {
  onBack: () => void;
}

export function TermsOfUse({ onBack }: TermsOfUseProps) {
  return (
    <div className="min-h-screen bg-[#05070D] pt-24 pb-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-[#00E5FF]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-[#00E5FF]/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10">
        {/* Back Button */}
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-[#00E5FF] hover:text-white transition-colors mb-8 group font-mono text-sm tracking-widest uppercase"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>[ RETORNAR_AO_SISTEMA ]</span>
        </motion.button>

        {/* Header */}
        <motion.div
          className="mb-12 border-b border-[#00E5FF]/20 pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#00E5FF]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
                <span className="text-[#00E5FF] font-mono text-xs tracking-[0.2em]">SYSTEM_PROTOCOL_V1.0</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                Termos de Uso <span className="text-[#00E5FF]">&</span> Escopo
              </h1>
            </div>
          </div>
          <p className="text-[#B0B3B8] text-lg max-w-2xl leading-relaxed">
            Diretrizes operacionais e escopo de atuação da Terminal 404.
            <span className="block text-sm font-mono text-[#00E5FF]/60 mt-2">
              // STATUS: ATIVO
            </span>
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          
          {/* Section 1: Introduction */}
          <motion.div
            className="bg-[#0B0F1A]/80 border border-[#00E5FF]/20 rounded-xl p-8 backdrop-blur-sm relative overflow-hidden group hover:border-[#00E5FF]/40 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileText className="w-24 h-24 text-[#00E5FF]" />
            </div>
            
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 font-mono">
              <span className="text-[#00E5FF]">01.</span>
              ATUAÇÃO_E_ESCOPO
            </h2>
            
            <p className="text-[#B0B3B8] leading-relaxed relative z-10">
              A <span className="text-white font-semibold">Terminal 404</span> atua exclusivamente no desenvolvimento de sites e sistemas para empresas, prezando pela ética, legalidade e boas práticas do mercado digital. Nosso compromisso é entregar código limpo, seguro e funcional.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Section 2: Prohibited (RESTRICTED) */}
            <motion.div
              className="bg-[#0B0F1A]/80 border border-red-500/20 rounded-xl p-8 backdrop-blur-sm h-full hover:border-red-500/40 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 font-mono">
                <span className="text-red-500">02.</span>
                RESTRICTED_ZONES
              </h2>
              
              <div className="flex items-center gap-2 mb-4 text-red-400 font-mono text-xs uppercase tracking-wider border-b border-red-500/10 pb-2">
                <ShieldAlert className="w-4 h-4" />
                <span>Acesso Negado / Proibido</span>
              </div>

              <p className="text-[#B0B3B8] mb-6 text-sm">
                Não desenvolvemos, hospedamos ou damos suporte a projetos que envolvam:
              </p>

              <ul className="space-y-4">
                {[
                  "Conteúdo pornográfico ou adulto",
                  "Sites de apostas, cassinos online ou jogos de azar",
                  "Plataformas de phishing, golpes ou fraudes",
                  "Projetos que violem leis ou direitos de terceiros"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-sm bg-red-500 mt-2 group-hover:shadow-[0_0_8px_rgba(239,68,68,0.6)] transition-shadow" />
                    <span className="text-gray-400 group-hover:text-red-200 transition-colors text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-4 border-t border-red-500/10">
                <p className="text-xs text-red-400/80 font-mono">
                  ERROR: SOLICITAÇÕES VIOLANDO ESTES PRINCÍPIOS SERÃO TERMINADAS IMEDIATAMENTE.
                </p>
              </div>
            </motion.div>

            {/* Section 3: Authorized (ALLOWED) */}
            <motion.div
              className="bg-[#0B0F1A]/80 border border-[#00E5FF]/20 rounded-xl p-8 backdrop-blur-sm h-full hover:border-[#00E5FF]/40 transition-colors"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 font-mono">
                <span className="text-[#00E5FF]">03.</span>
                AUTHORIZED_OPS
              </h2>

              <div className="flex items-center gap-2 mb-4 text-[#00E5FF] font-mono text-xs uppercase tracking-wider border-b border-[#00E5FF]/10 pb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Serviços Habilitados</span>
              </div>

              <p className="text-[#B0B3B8] mb-6 text-sm">
                Desenvolvimento profissional de alta performance, incluindo:
              </p>

              <ul className="space-y-4">
                {[
                  "Sites institucionais e corporativos (Pequeno a Grande porte)",
                  "Plataformas e sistemas de RH / Gestão",
                  "E-commerce, Vendas e Landing Pages",
                  "Sistemas personalizados e APIs",
                  "Projetos focados em performance e segurança"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-sm bg-[#00E5FF] mt-2 group-hover:shadow-[0_0_8px_rgba(0,229,255,0.6)] transition-shadow" />
                    <span className="text-gray-400 group-hover:text-cyan-100 transition-colors text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-[#00E5FF]/10">
                <p className="text-xs text-[#00E5FF]/80 font-mono">
                  SUCCESS: DESENVOLVIMENTO COM TRANSPARÊNCIA E QUALIDADE.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Footer Note */}
          <motion.div
            className="bg-gradient-to-r from-[#00E5FF]/5 to-transparent border-l-2 border-[#00E5FF] p-6 rounded-r-xl mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
              <span className="text-[#00E5FF] font-mono">Run_Protocol:</span> CONTATO
            </h3>
            <p className="text-[#B0B3B8] text-sm leading-relaxed">
              Se você tem uma ideia ou necessidade digital para o seu negócio, nós desenvolvemos com profissionalismo, transparência e prazer em entregar qualidade.
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
