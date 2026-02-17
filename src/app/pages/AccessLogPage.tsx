import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Terminal, Send, Clock, ShieldCheck } from "lucide-react";

// Mock data type
interface LogEntry {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

export function AccessLogPage() {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "1",
      name: "TechSolutions_Ltda",
      message: "Sistema entregue com excelência. Performance incrível.",
      timestamp: "17/02, 07:37",
    },
    {
      id: "2",
      name: "Dev_Community",
      message: "Design disruptivo e código limpo. Recomendado.",
      timestamp: "17/02, 04:37",
    },
    {
      id: "3",
      name: "Alpha_Startups",
      message: "Parceria sólida. O futuro é agora.",
      timestamp: "16/02, 07:37",
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const now = new Date();
      const timestamp = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).format(now);

      const newLog: LogEntry = {
        id: Date.now().toString(),
        name: name.trim(),
        message: message.trim(),
        timestamp,
      };

      setLogs((prev) => [newLog, ...prev]);
      setName("");
      setMessage("");
      setSubmitStatus("success");
      
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (error) {
      console.error("Error submitting log:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070D] pt-24 pb-16 relative overflow-hidden">
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="h-full w-full animate-scanline"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 229, 255, 0.1) 0px, transparent 2px, transparent 4px)',
          }}
        />
      </div>

      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 229, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Page Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Registro de Acesso
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent mb-6" />
          <p className="text-lg text-[#B0B3B8] max-w-3xl mx-auto">
            Histórico de interações e feedback da comunidade Terminal 404.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-[#0B0F1A]/80 backdrop-blur-sm p-8 rounded-2xl border border-[#00E5FF]/20 relative overflow-hidden group shadow-2xl shadow-[#00E5FF]/5">
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Form Header */}
              <h2 className="text-2xl text-white mb-6 flex items-center gap-2 relative z-10 font-mono">
                <span className="text-[#00E5FF]">&gt;</span> Novo_Registro
              </h2>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#B0B3B8] mb-2">
                    Nome / Organização
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#05070D]/90 border border-[#00E5FF]/30 rounded-lg py-3.5 px-4 text-white placeholder:text-[#4A5568] focus:outline-none focus:border-[#00E5FF] focus:ring-2 focus:ring-[#00E5FF]/30 transition-all font-mono"
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
                    className="w-full bg-[#05070D]/90 border border-[#00E5FF]/30 rounded-lg py-3.5 px-4 text-white placeholder:text-[#4A5568] focus:outline-none focus:border-[#00E5FF] focus:ring-2 focus:ring-[#00E5FF]/30 transition-all h-36 resize-none font-mono"
                    placeholder="Deixe seu feedback ou comentário..."
                    maxLength={140}
                  />
                  <div className="text-right text-xs text-[#00E5FF]/50 mt-2 font-mono">
                    {message.length}/140 chars
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !name.trim() || !message.trim()}
                  className="w-full py-4 bg-[#00E5FF] text-[#05070D] font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 uppercase tracking-wider"
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
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm text-center font-mono"
                  >
                    ✓ Registro gravado com sucesso.
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center font-mono"
                  >
                    ✗ Falha na conexão. Tente novamente.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Logs Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-[#0B0F1A]/80 backdrop-blur-sm rounded-2xl border border-[#00E5FF]/20 overflow-hidden flex flex-col h-[580px] shadow-2xl shadow-[#00E5FF]/5">
              
              {/* Terminal Header */}
              <div className="p-4 bg-[#05070D]/90 border-b border-[#00E5FF]/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#00E5FF]" />
                  <span className="text-sm text-white font-mono">System_Logs</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60 shadow-[0_0_6px_rgba(234,179,8,0.5)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                </div>
              </div>

              {/* Logs List */}
              <div className="p-5 overflow-y-auto space-y-4 flex-1 bg-[#05070D]/50 custom-scrollbar">
                {logs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-[#B0B3B8]/50">
                    <Terminal className="w-12 h-12 mb-4 opacity-30" />
                    <p className="font-mono text-sm">Aguardando registros...</p>
                  </div>
                ) : (
                  logs.map((log, index) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group p-4 rounded-xl bg-[#0B0F1A]/80 border border-[#00E5FF]/10 hover:border-[#00E5FF]/40 hover:bg-[#0B0F1A] transition-all duration-300 hover:translate-x-1"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] group-hover:shadow-[0_0_12px_#00E5FF]" />
                          <span className="text-white font-semibold text-sm tracking-wide font-mono">
                            {log.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[#00E5FF]/60 text-xs font-mono">
                          <Clock className="w-3 h-3" />
                          <span>{log.timestamp}</span>
                        </div>
                      </div>
                      <p className="text-[#B0B3B8] text-sm leading-relaxed pl-3.5 border-l-2 border-[#00E5FF]/20 group-hover:border-[#00E5FF]/40 transition-colors">
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

      {/* Decorative Elements */}
      <div className="absolute top-32 left-10 w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
      <div className="absolute top-48 right-20 w-1 h-1 rounded-full bg-[#FF00FF] animate-pulse" />
      <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
      <div className="absolute bottom-48 right-1/3 w-1 h-1 rounded-full bg-[#FF00FF] animate-pulse" />
    </div>
  );
}