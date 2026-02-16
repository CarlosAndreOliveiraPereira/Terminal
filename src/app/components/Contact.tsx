import { useState } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Mail, Phone, Send, MessageCircle } from "lucide-react";
import logo from "figma:asset/a2cf386f6867e3c2fdab342a3de11efe99903303.png";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Send to Python backend
    try {
      const response = await fetch('/api/send-access-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.name} <${formData.email}>`,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error sending contact form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const directLinks = [
    {
      label: "WhatsApp Direto",
      icon: MessageCircle,
      href: "https://wa.me/553291547944",
      color: "bg-green-500/10 text-green-500 border-green-500/30 hover:bg-green-500 hover:text-white",
      borderColor: "border-green-500/30"
    },
    {
      label: "E-mail Direto",
      icon: Mail,
      href: "mailto:terminallocal404@gmail.com",
      color: "bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30 hover:bg-[#00E5FF] hover:text-[#05070D]",
      borderColor: "border-[#00E5FF]/30"
    }
  ];

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
        
        {/* Large Logo Header */}
        <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-[#00E5FF]/20 blur-[50px] rounded-full group-hover:bg-[#00E5FF]/30 transition-all duration-700" />
            <img 
              src={logo} 
              alt="Terminal 404 Shield" 
              className="relative w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:drop-shadow-[0_0_50px_rgba(0,229,255,0.6)] transition-all duration-500 transform hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block px-4 py-2 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 mb-4">
            <span className="text-sm text-[#00E5FF]">Canais de Comunicação</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Fale Conosco
          </h2>
          <div className="h-1 w-20 mx-auto bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent mb-6" />
          <p className="text-lg text-[#B0B3B8] max-w-2xl mx-auto">
            Escolha o canal de sua preferência. Respondemos rapidamente.
          </p>
        </motion.div>

        {/* Direct Action Buttons */}
        <motion.div 
          className="flex flex-col md:flex-row justify-center gap-6 mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {directLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center gap-4 py-6 px-8 rounded-xl border transition-all duration-300 group ${link.color} ${link.borderColor}`}
            >
              <link.icon className="w-8 h-8" />
              <span className="text-xl font-bold">{link.label}</span>
            </a>
          ))}
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info Side */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div>
              <h3 className="text-2xl text-white mb-6 border-l-4 border-[#00E5FF] pl-4">
                Informações
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 rounded-xl bg-[#0B0F1A] border border-[#00E5FF]/20">
                  <div className="w-12 h-12 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#00E5FF]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#B0B3B8] mb-1">E-mail Comercial</p>
                    <a href="mailto:terminallocal404@gmail.com" className="text-white hover:text-[#00E5FF] transition-colors break-all">
                      terminallocal404@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-xl bg-[#0B0F1A] border border-[#00E5FF]/20">
                  <div className="w-12 h-12 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#00E5FF]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#B0B3B8] mb-1">WhatsApp / Telefone</p>
                    <a href="https://wa.me/553291547944" target="_blank" rel="noreferrer" className="text-white hover:text-[#00E5FF] transition-colors">
                      (32) 99154-7944
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Box */}
            <motion.div
              className="p-6 rounded-2xl bg-gradient-to-br from-[#0B0F1A] to-[#05070D] border border-[#00E5FF]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <h4 className="text-white mb-3 font-semibold">Horário de Atendimento</h4>
              <p className="text-[#B0B3B8] text-sm leading-relaxed">
                Segunda a Sexta: 09:00 - 18:00<br/>
                Sábados: Plantão de dúvidas (via WhatsApp)
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-[#0B0F1A] p-8 rounded-2xl border border-[#00E5FF]/20 h-full">
              <h3 className="text-2xl text-white mb-6 flex items-center gap-2">
                <Send className="w-6 h-6 text-[#00E5FF]" />
                Formulário Rápido
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div>
                  <label htmlFor="contact-name" className="block text-sm text-[#B0B3B8] mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#05070D] border border-[#00E5FF]/20 text-white placeholder-[#B0B3B8]/50 focus:border-[#00E5FF] focus:outline-none focus:ring-1 focus:ring-[#00E5FF]/50 transition-all"
                    placeholder="Digite seu nome"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="contact-email" className="block text-sm text-[#B0B3B8] mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#05070D] border border-[#00E5FF]/20 text-white placeholder-[#B0B3B8]/50 focus:border-[#00E5FF] focus:outline-none focus:ring-1 focus:ring-[#00E5FF]/50 transition-all"
                    placeholder="Digite seu e-mail"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="contact-message" className="block text-sm text-[#B0B3B8] mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-[#05070D] border border-[#00E5FF]/20 text-white placeholder-[#B0B3B8]/50 focus:border-[#00E5FF] focus:outline-none focus:ring-1 focus:ring-[#00E5FF]/50 transition-all resize-none"
                    placeholder="Descreva seu projeto ou dúvida..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-[#00E5FF] text-[#05070D] font-bold rounded-lg hover:bg-[#00c4db] transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
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
                    className="p-3 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Mensagem enviada!
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div
                    className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Erro ao enviar mensagem. Tente novamente mais tarde.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
