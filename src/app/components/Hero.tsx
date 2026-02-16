import { motion } from "motion/react";
import { Terminal, ArrowRight, ShieldCheck } from "lucide-react";
import logo from "figma:asset/a2cf386f6867e3c2fdab342a3de11efe99903303.png";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 bg-[#05070D]"
    >
      {/* Premium Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#00E5FF]/5 to-transparent opacity-40" />
        <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-[#00E5FF]/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] bg-[#0000FF]/5 rounded-full blur-[120px]" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(#00E5FF 1px, transparent 1px), linear-gradient(90deg, #00E5FF 1px, transparent 1px)`,
            backgroundSize: "60px 60px"
          }} 
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          
          {/* Logo Section - Highlighted & Large */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-10 relative group"
          >
            <div className="absolute inset-0 bg-[#00E5FF]/20 blur-[50px] rounded-full group-hover:bg-[#00E5FF]/30 transition-all duration-700" />
            <img 
              src={logo} 
              alt="Terminal 404 Shield" 
              className="relative w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:drop-shadow-[0_0_50px_rgba(0,229,255,0.6)] transition-all duration-500 transform hover:scale-105"
            />
          </motion.div>

          {/* Corporate Title */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            TERMINAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#0099FF]">404</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-[#B0B3B8] mb-10 max-w-3xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Soluções digitais de alta performance com segurança blindada.
            <br className="hidden md:block" />
            Transformamos desafios complexos em sistemas robustos.
          </motion.p>

          {/* Call to Action - Professional Style */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <a
              href="/community"
              className="group relative px-8 py-4 bg-[#00E5FF] hover:bg-[#00c4db] text-[#05070D] font-bold rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] flex items-center justify-center gap-3"
            >
              Juntar-se à Comunidade
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="/services"
              className="group px-8 py-4 bg-[#0B0F1A]/80 border border-[#00E5FF]/30 text-white font-medium rounded-lg hover:bg-[#00E5FF]/10 hover:border-[#00E5FF] transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm"
            >
              <ShieldCheck className="w-5 h-5 text-[#00E5FF]" />
              Nossos Serviços
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-24 pt-8 border-t border-white/5 w-full max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Segurança", value: "100%" },
                { label: "Uptime", value: "99.9%" },
                { label: "Projetos", value: "50+" },
                { label: "Comunidade", value: "Ativa" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-white mb-1">{stat.value}</span>
                  <span className="text-xs text-[#00E5FF] uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
