import { motion } from "motion/react";
import { Terminal, ArrowRight, ShieldCheck, ChevronRight } from "lucide-react";
import { Logo } from "./Logo";
import { useEffect, useState } from "react";

export function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate random particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 bg-[#05070D]"
    >
      {/* Global Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent opacity-30 animate-[scan_8s_linear_infinite] z-40 pointer-events-none shadow-[0_0_15px_#00E5FF]" />

      {/* Premium Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#00E5FF]/5 to-transparent opacity-40" />
        <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-[#00E5FF]/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] bg-[#0000FF]/5 rounded-full blur-[120px]" />
        
        {/* Animated Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{
            backgroundImage: `linear-gradient(#00E5FF 1px, transparent 1px), linear-gradient(90deg, #00E5FF 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            transform: "perspective(500px) rotateX(60deg) translateY(-100px) scale(2)",
            transformOrigin: "top center",
          }} 
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00E5FF]/20 to-transparent"
            animate={{ translateY: [0, 60] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        </div>
        
        {/* Floating Particles */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#00E5FF]/30 blur-[1px]"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animation: `float-up ${p.duration}s linear infinite`,
              animationDelay: `-${p.delay}s`,
            }}
          />
        ))}
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
            <div className="absolute inset-0 bg-[#00E5FF]/20 blur-[50px] rounded-full group-hover:bg-[#00E5FF]/30 transition-all duration-700 animate-pulse" />
            
            {/* Rotating Rings around Logo */}
            <div className="absolute inset-0 -m-10 border border-[#00E5FF]/10 rounded-full w-[calc(100%+5rem)] h-[calc(100%+5rem)] animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-0 -m-16 border border-[#00E5FF]/5 rounded-full w-[calc(100%+8rem)] h-[calc(100%+8rem)] animate-[spin_15s_linear_infinite_reverse]" />
            
            <div className="relative">
              <Logo 
                size={256}
                className="drop-shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:drop-shadow-[0_0_50px_rgba(0,229,255,0.6)] transition-all duration-500 transform hover:scale-105 relative z-10"
              />
            </div>
          </motion.div>

          {/* Corporate Title with Glitch Effect */}
          <motion.h1
            className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6 leading-[1.1] relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="relative inline-block">
              TERMINAL
            </span>
            <br className="md:hidden" />
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#0099FF] to-[#00E5FF] bg-[length:200%_auto] animate-gradient ml-4 relative inline-block"
              style={{ textShadow: "0 0 20px rgba(0, 229, 255, 0.5)" }}
            >
              404
            </span>
          </motion.h1>

          <motion.div
            className="h-1 w-24 bg-[#00E5FF] mb-8 rounded-full shadow-[0_0_10px_#00E5FF]"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />

          <motion.p
            className="text-xl md:text-2xl text-[#B0B3B8] mb-10 max-w-3xl font-light leading-relaxed relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <span className="block mb-2 text-[#00E5FF]/80 text-sm font-mono tracking-[0.2em] uppercase">
              System Status: Operational
            </span>
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
              className="group relative px-8 py-4 bg-[#00E5FF] hover:bg-[#00c4db] text-[#05070D] font-bold rounded-none clip-path-polygon transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_40px_rgba(0,229,255,0.6)] flex items-center justify-center gap-3 overflow-hidden"
              style={{ clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Juntar-se à Comunidade
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            </a>
            
            <a
              href="/services"
              className="group relative px-8 py-4 bg-transparent border border-[#00E5FF]/30 text-white font-medium rounded-none hover:bg-[#00E5FF]/5 hover:border-[#00E5FF] transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm overflow-hidden"
              style={{ clipPath: "polygon(0 0, 90% 0, 100% 30%, 100% 100%, 10% 100%, 0 70%)" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#00E5FF]" />
                Nossos Serviços
              </span>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#00E5FF] group-hover:w-full transition-all duration-300" />
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-24 pt-8 border-t border-[#00E5FF]/20 w-full max-w-4xl relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00E5FF]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00E5FF]" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Segurança", value: "100%" },
                { label: "Uptime", value: "99.9%" },
                { label: "Projetos", value: "1+" },
                { label: "Comunidade", value: "Ativa" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center group cursor-default">
                  <span className="text-3xl font-bold text-white mb-1 group-hover:text-[#00E5FF] transition-colors duration-300 drop-shadow-lg">{stat.value}</span>
                  <span className="text-xs text-[#00E5FF]/70 uppercase tracking-widest font-mono group-hover:text-[#00E5FF] transition-colors">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}