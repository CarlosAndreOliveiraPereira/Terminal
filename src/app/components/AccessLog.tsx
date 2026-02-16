import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Terminal, Send, Clock, User, ShieldCheck } from "lucide-react";
import logo from "figma:asset/a2cf386f6867e3c2fdab342a3de11efe99903303.png";

// Mock data type until we connect Supabase
interface LogEntry {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

export function AccessLog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "1",
      name: "TechSolutions_Ltda",
      message: "Sistema entregue com excelência. Performance incrível.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
      id: "2",
      name: "Dev_Community",
      message: "Design disruptivo e código limpo. Recomendado.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
    {
      id: "3",
      name: "Alpha_Startups",
      message: "Parceria sólida. O futuro é agora.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
  ]);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    try {
      // Send to Python backend
      // Note: In production, ensure this points to your actual backend URL
      const response = await fetch('/api/send-access-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Add new log to the list
        const newLog: LogEntry = {
          id: result.data.id.toString(),
          name: result.data.name,
          message: result.data.message,
          timestamp: result.data.timestamp,
        };

        setLogs((prev) => [newLog, ...prev]);
        setName("");
        setMessage("");
        setSubmitStatus("success");
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Error submitting log:", error);
      // For static site demo purposes, we simulate success if backend fails
      const mockLog: LogEntry = {
        id: Date.now().toString(),
        name: name.trim(),
        message: message.trim(),
        timestamp: new Date().toISOString(),
      };
      setLogs((prev) => [mockLog, ...prev]);
      setName("");
      setMessage("");
      setSubmitStatus("success");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <section
      id="log-acesso"
      ref={ref}
      className="relative py-24 bg-[#05070D] overflow-hidden border-t border-[#00E5FF]/10"
    >
       {/* Background Grid */}
       <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 229, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

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

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 mb-4">
            <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-sm text-[#00E5FF]">Registro Público</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Registro de Acesso
          </h2>
          <div className="h-1 w-20 mx-auto bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent mb-6" />
          <p className="text-lg text-[#B0B3B8] max-w-2xl mx-auto">
            Histórico de interações e feedback da comunidade Terminal 404.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-[#0B0F1A] p-8 rounded-2xl border border-[#00E5FF]/20 relative overflow-hidden group h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <h3 className="text-2xl text-white mb-6 flex items-center gap-2 relative z-10 font-mono">
                <span className="text-[#00E5FF]">&gt;</span> Novo_Registro
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#B0B3B8] mb-2">
                    Nome / Organização
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00E5FF]/50" />
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#05070D] border border-[#00E5FF]/20 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]/50 transition-all placeholder:text-gray-600"
                      placeholder="Identifique-se..."
                      maxLength={30}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#B0B3B8] mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#05070D] border border-[#00E5FF]/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]/50 transition-all h-32 resize-none placeholder:text-gray-600"
                    placeholder="Deixe seu feedback ou comentário..."
                    maxLength={140}
                  />
                  <div className="text-right text-xs text-[#00E5FF]/40 mt-1 font-mono">
                    {message.length}/140 chars
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !name.trim() || !message.trim()}
                  className="w-full py-4 bg-[#00E5FF] text-[#05070D] font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Processando...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>REGISTRAR ACESSO</span>
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded text-green-400 text-sm text-center">
                    Registro gravado com sucesso.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm text-center">
                    Falha na conexão. Tente novamente.
                  </div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Log List */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="bg-[#0B0F1A] rounded-2xl border border-[#00E5FF]/20 overflow-hidden flex flex-col h-[500px] shadow-2xl shadow-[#00E5FF]/5">
              <div className="p-4 bg-[#05070D] border-b border-[#00E5FF]/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#00E5FF]" />
                  <span className="text-sm text-white font-mono">System_Logs</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
              </div>

              <div className="p-4 overflow-y-auto space-y-4 custom-scrollbar flex-1 bg-[#0B0F1A]/50">
                {logs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-[#B0B3B8] opacity-50">
                    <Terminal className="w-12 h-12 mb-4" />
                    <p>Aguardando registros...</p>
                  </div>
                ) : (
                  logs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="group p-4 rounded-lg bg-[#05070D]/80 border border-[#00E5FF]/10 hover:border-[#00E5FF]/40 transition-all hover:translate-x-1"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] group-hover:shadow-[0_0_8px_#00E5FF]" />
                           <span className="text-white font-semibold text-sm tracking-wide">
                            {log.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[#00E5FF]/50 text-xs font-mono">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(log.timestamp)}</span>
                        </div>
                      </div>
                      <p className="text-[#B0B3B8] text-sm leading-relaxed pl-3.5 border-l border-[#00E5FF]/10">
                        {log.message}
                      </p>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
