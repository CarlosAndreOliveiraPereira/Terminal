import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Code, Network, Cpu } from "lucide-react";
import { Logo } from "./Logo";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="sobre"
      ref={ref}
      className="relative py-24 bg-[#05070D] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#00E5FF]/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Large Logo Header */}
          <motion.div
              className="flex justify-center mb-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-[#00E5FF]/20 blur-[50px] rounded-full group-hover:bg-[#00E5FF]/30 transition-all duration-700" />
              <div className="relative">
                <Logo 
                  size={160}
                  className="drop-shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:drop-shadow-[0_0_50px_rgba(0,229,255,0.6)] transition-all duration-500 transform hover:scale-105"
                />
              </div>
            </div>
          </motion.div>

          {/* Section Title */}
          <div className="text-center mb-16">
            <motion.div
              className="inline-block px-4 py-2 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm text-[#00E5FF]">Sobre Nós</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl text-white mb-4">
              Quem Somos
            </h2>
            <div className="h-1 w-20 mx-auto bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent" />
          </div>

          {/* Main Content */}
          <motion.div
            className="bg-gradient-to-br from-[#0B0F1A] to-[#05070D] p-8 md:p-12 rounded-2xl border border-[#00E5FF]/20 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#00E5FF]/5 blur-[60px]" />

            <p className="text-lg text-[#B0B3B8] leading-relaxed mb-8">
              A Terminal 404 é uma empresa de tecnologia e comunidade técnica criada
              para unir desenvolvedores, profissionais e entusiastas da programação em
              um ambiente sério, organizado e colaborativo.
            </p>

            <p className="text-lg text-[#B0B3B8] leading-relaxed mb-8">
              Atuamos no desenvolvimento de projetos, troca de conhecimento e
              construção de soluções digitais com foco em qualidade, segurança e
              crescimento técnico.
            </p>

            {/* Tech Icons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: Code,
                  title: "Desenvolvimento",
                  description: "Projetos escaláveis e bem estruturados",
                },
                {
                  icon: Network,
                  title: "Colaboração",
                  description: "Ambiente técnico e profissional",
                },
                {
                  icon: Cpu,
                  title: "Tecnologia",
                  description: "Soluções modernas e eficientes",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl bg-[#05070D]/50 border border-[#00E5FF]/10 hover:border-[#00E5FF]/30 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="w-14 h-14 rounded-full bg-[#00E5FF]/10 flex items-center justify-center mb-4 group-hover:bg-[#00E5FF]/20 transition-all duration-300">
                    <item.icon className="w-7 h-7 text-[#00E5FF] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-[#B0B3B8]">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}