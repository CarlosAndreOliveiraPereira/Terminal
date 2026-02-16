import { motion } from "motion/react";
import { Shield, ArrowLeft, Mail, Phone } from "lucide-react";

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-[#05070D] pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Back Button */}
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-[#00E5FF] hover:text-white transition-colors mb-8 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Voltar ao Site</span>
        </motion.button>

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/20 mb-6">
            <Shield className="w-8 h-8 text-[#00E5FF]" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Política de Privacidade
          </h1>
          <p className="text-[#B0B3B8] text-lg">Terminal 404</p>
        </motion.div>

        {/* Content */}
        <motion.div
          className="bg-[#0B0F1A]/50 border border-[#00E5FF]/20 rounded-2xl p-8 lg:p-12 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="prose prose-invert prose-cyan max-w-none">
            <p className="text-[#B0B3B8] leading-relaxed mb-8">
              A Terminal 404 respeita a privacidade dos usuários e está comprometida com a proteção dos dados pessoais, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 – LGPD).
            </p>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-[#00E5FF] to-transparent rounded-full" />
                Coleta de Dados
              </h2>
              <p className="text-[#B0B3B8] leading-relaxed mb-3">
                Podemos coletar as seguintes informações:
              </p>
              <ul className="space-y-2 text-[#B0B3B8]">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] mt-2 flex-shrink-0" />
                  <span>Nome</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] mt-2 flex-shrink-0" />
                  <span>Endereço de e-mail</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] mt-2 flex-shrink-0" />
                  <span>Telefone</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] mt-2 flex-shrink-0" />
                  <span>Informações fornecidas voluntariamente em formulários de contato</span>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-[#00E5FF] to-transparent rounded-full" />
                Uso dos Dados
              </h2>
              <p className="text-[#B0B3B8] leading-relaxed mb-3">
                Os dados coletados são utilizados para:
              </p>
              <ul className="space-y-2 text-[#B0B3B8]">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] mt-2 flex-shrink-0" />
                  <span>Comunicação com usuários</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] mt-2 flex-shrink-0" />
                  <span>Atendimento de solicitações</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] mt-2 flex-shrink-0" />
                  <span>Melhorar nossos serviços e conteúdos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] mt-2 flex-shrink-0" />
                  <span>Contato para parcerias e projetos</span>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-[#00E5FF] to-transparent rounded-full" />
                Compartilhamento
              </h2>
              <p className="text-[#B0B3B8] leading-relaxed">
                A Terminal 404 não compartilha dados pessoais com terceiros, exceto quando exigido por lei.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-[#00E5FF] to-transparent rounded-full" />
                Armazenamento e Segurança
              </h2>
              <p className="text-[#B0B3B8] leading-relaxed">
                Adotamos medidas técnicas e organizacionais para proteger os dados contra acesso não autorizado, vazamentos ou usos indevidos.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-[#00E5FF] to-transparent rounded-full" />
                Direitos do Usuário
              </h2>
              <p className="text-[#B0B3B8] leading-relaxed mb-3">
                O usuário pode, a qualquer momento:
              </p>
              <ul className="space-y-2 text-[#B0B3B8]">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] mt-2 flex-shrink-0" />
                  <span>Solicitar acesso aos seus dados</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] mt-2 flex-shrink-0" />
                  <span>Solicitar correção ou exclusão</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] mt-2 flex-shrink-0" />
                  <span>Revogar consentimento</span>
                </li>
              </ul>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-[#00E5FF]/10 to-[#0B0F1A] border border-[#00E5FF]/30 rounded-xl p-6 mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Contato Oficial
              </h3>
              <p className="text-[#B0B3B8] mb-4">
                Solicitações podem ser feitas através dos seguintes canais:
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:terminallocal404@gmail.com"
                  className="flex items-center gap-3 text-[#00E5FF] hover:text-white transition-colors group"
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>terminallocal404@gmail.com</span>
                </a>
                <a
                  href="tel:+5532991547944"
                  className="flex items-center gap-3 text-[#00E5FF] hover:text-white transition-colors group"
                >
                  <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>(32) 99154-7944</span>
                </a>
              </div>
            </div>

            {/* Notice */}
            <div className="bg-[#00E5FF]/5 border border-[#00E5FF]/20 rounded-xl p-6 mt-8">
              <h3 className="text-lg font-semibold text-white mb-2">
                Disposições Finais
              </h3>
              <p className="text-[#B0B3B8] text-sm leading-relaxed">
                Esta política pode ser atualizada periodicamente. Recomenda-se que o usuário revise este documento regularmente.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-[#00E5FF]/20">
              <p className="text-[#B0B3B8] text-sm">
                Última atualização: Janeiro de 2026
              </p>
              <p className="text-[#B0B3B8] text-sm mt-2">
                Lei Geral de Proteção de Dados (Lei nº 13.709/2018 – LGPD)
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
