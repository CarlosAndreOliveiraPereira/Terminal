import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Mail, Phone, Send, DollarSign, Calendar, Briefcase } from "lucide-react";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    description: "",
    budget: "",
    deadline: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/backend/quote-form.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({ 
          name: "", 
          email: "", 
          phone: "",
          projectType: "",
          description: "",
          budget: "",
          deadline: ""
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error sending quote form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contato"
      ref={ref}
      className="relative py-24 bg-[#05070D] overflow-hidden"
    >
      {/* Background Elements */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 229, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block px-4 py-2 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 mb-4">
            <span className="text-sm text-[#00E5FF]">Solicite um Orçamento</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Formulário de Orçamento
          </h2>
          <div className="h-1 w-20 mx-auto bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent mb-6" />
          <p className="text-lg text-[#B0B3B8] max-w-2xl mx-auto">
            Preencha os dados abaixo para receber uma proposta personalizada.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Quote Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-[#0B0F1A]/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-[#00E5FF]/20 shadow-2xl shadow-[#00E5FF]/5">
              <h3 className="text-2xl text-white mb-8 flex items-center gap-3">
                <Send className="w-6 h-6 text-[#00E5FF]" />
                Formulário Rápido
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-[#B0B3B8] mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 rounded-lg bg-[#05070D]/90 border border-[#00E5FF]/30 text-white placeholder-[#4A5568] focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/30 transition-all"
                      placeholder="Digite seu nome"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-[#B0B3B8] mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 rounded-lg bg-[#05070D]/90 border border-[#00E5FF]/30 text-white placeholder-[#4A5568] focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/30 transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                {/* Phone and Project Type Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-[#B0B3B8] mb-2">
                      Telefone/WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00E5FF]/50" />
                      <input
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 pl-11 rounded-lg bg-[#05070D]/90 border border-[#00E5FF]/30 text-white placeholder-[#4A5568] focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/30 transition-all"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-projectType" className="block text-sm font-medium text-[#B0B3B8] mb-2">
                      Tipo de Projeto *
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00E5FF]/50 pointer-events-none" />
                      <select
                        id="contact-projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 pl-11 rounded-lg bg-[#05070D]/90 border border-[#00E5FF]/30 text-white focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/30 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#0B0F1A]">Selecione...</option>
                        <option value="landing-page" className="bg-[#0B0F1A]">Landing Page</option>
                        <option value="site-institucional" className="bg-[#0B0F1A]">Site Institucional</option>
                        <option value="e-commerce" className="bg-[#0B0F1A]">E-commerce</option>
                        <option value="sistema-web" className="bg-[#0B0F1A]">Sistema Web</option>
                        <option value="outro" className="bg-[#0B0F1A]">Outro</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Description Field */}
                <div>
                  <label htmlFor="contact-description" className="block text-sm font-medium text-[#B0B3B8] mb-2">
                    Descrição do Projeto *
                  </label>
                  <textarea
                    id="contact-description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3.5 rounded-lg bg-[#05070D]/90 border border-[#00E5FF]/30 text-white placeholder-[#4A5568] focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/30 transition-all resize-none"
                    placeholder="Descreva seu projeto, funcionalidades desejadas, referências..."
                  />
                </div>

                {/* Budget and Deadline Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-budget" className="block text-sm font-medium text-[#B0B3B8] mb-2">
                      Orçamento Estimado *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00E5FF]/50" />
                      <select
                        id="contact-budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 pl-11 rounded-lg bg-[#05070D]/90 border border-[#00E5FF]/30 text-white focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/30 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#0B0F1A]">Selecione...</option>
                        <option value="ate-2k" className="bg-[#0B0F1A]">Até R$ 2.000</option>
                        <option value="2k-5k" className="bg-[#0B0F1A]">R$ 2.000 - R$ 5.000</option>
                        <option value="5k-10k" className="bg-[#0B0F1A]">R$ 5.000 - R$ 10.000</option>
                        <option value="10k-mais" className="bg-[#0B0F1A]">R$ 10.000+</option>
                        <option value="a-definir" className="bg-[#0B0F1A]">A definir</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-deadline" className="block text-sm font-medium text-[#B0B3B8] mb-2">
                      Prazo Desejado *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00E5FF]/50" />
                      <select
                        id="contact-deadline"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 pl-11 rounded-lg bg-[#05070D]/90 border border-[#00E5FF]/30 text-white focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/30 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#0B0F1A]">Selecione...</option>
                        <option value="urgente" className="bg-[#0B0F1A]">Urgente (até 15 dias)</option>
                        <option value="1-mes" className="bg-[#0B0F1A]">Até 1 mês</option>
                        <option value="2-meses" className="bg-[#0B0F1A]">Até 2 meses</option>
                        <option value="3-meses" className="bg-[#0B0F1A]">Até 3 meses</option>
                        <option value="flexivel" className="bg-[#0B0F1A]">Flexível</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-[#00E5FF] text-[#05070D] font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 uppercase tracking-wider"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#05070D]/30 border-t-[#05070D] rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Agora
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Success Message */}
                {submitStatus === "success" && (
                  <motion.div
                    className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm text-center font-mono"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✓ Orçamento enviado com sucesso! Entraremos em contato em breve.
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div
                    className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center font-mono"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✗ Erro ao enviar. Tente novamente ou entre em contato via WhatsApp.
                  </motion.div>
                )}
              </form>

              {/* Contact Info Below Form */}
              <div className="mt-10 pt-8 border-t border-[#00E5FF]/10">
                <p className="text-[#B0B3B8] text-sm text-center mb-4">
                  Ou entre em contato diretamente:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/553291547944"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium">WhatsApp: (32) 99154-7944</span>
                  </a>
                  <a
                    href="mailto:terminallocal404@gmail.com"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] hover:bg-[#00E5FF]/20 transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm font-medium">terminallocal404@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}