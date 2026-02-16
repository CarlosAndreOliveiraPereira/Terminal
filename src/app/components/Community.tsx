import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Users, MessageSquare, Code, Server, Database } from "lucide-react";
import { Logo } from "./Logo";

export function Community() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const areas = [
    { name: "Backend", icon: Server },
    { name: "Frontend", icon: Code },
    { name: "Database", icon: Database },
  ];

  const languages = ["Python", "JavaScript", "TypeScript"];

  const levels = [
    {
      name: "Iniciante",
      description: "Primeiros passos na programação",
      color: "from-green-500/20 to-transparent",
    },
    {
      name: "Intermediário",
      description: "Desenvolvendo projetos complexos",
      color: "from-blue-500/20 to-transparent",
    },
    {
      name: "Avançado",
      description: "Domínio técnico e arquitetura",
      color: "from-purple-500/20 to-transparent",
    },
  ];

  return (
    <section
      id="comunidade"
      ref={ref}
      className="relative py-24 bg-[#05070D] overflow-hidden"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 229, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00E5FF]/10 rounded-full blur-[150px]" />

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
            <div className="relative">
              <Logo 
                size={160}
                className="drop-shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:drop-shadow-[0_0_50px_rgba(0,229,255,0.6)] transition-all duration-500 transform hover:scale-105"
              />
            </div>
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 mb-4">
            <Users className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-sm text-[#00E5FF]">Comunidade</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Junte-se à Nossa Comunidade
          </h2>
          <div className="h-1 w-20 mx-auto bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent mb-6" />
          <p className="text-lg text-[#B0B3B8] max-w-3xl mx-auto leading-relaxed">
            A comunidade Terminal 404 é estruturada por áreas técnicas, linguagens e
            níveis de conhecimento, mantendo sempre um padrão profissional, ético e
            respeitoso.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Technical Areas */}
          <motion.div
            className="bg-gradient-to-br from-[#0B0F1A] to-[#05070D] p-8 rounded-2xl border border-[#00E5FF]/20"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center">
                <Code className="w-5 h-5 text-[#00E5FF]" />
              </div>
              <h3 className="text-2xl text-white">Áreas Técnicas</h3>
            </div>

            <div className="space-y-3">
              {areas.map((area, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#05070D]/50 border border-[#00E5FF]/10 hover:border-[#00E5FF]/30 hover:bg-[#05070D]/80 transition-all duration-300 group cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center group-hover:bg-[#00E5FF]/20 transition-all duration-300">
                    <area.icon className="w-6 h-6 text-[#00E5FF]" />
                  </div>
                  <span className="text-white">{area.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            className="bg-gradient-to-br from-[#0B0F1A] to-[#05070D] p-8 rounded-2xl border border-[#00E5FF]/20"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-[#00E5FF]" />
              </div>
              <h3 className="text-2xl text-white">Linguagens</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {languages.map((language, index) => (
                <motion.div
                  key={index}
                  className="px-4 py-3 rounded-lg bg-[#05070D]/50 border border-[#00E5FF]/10 hover:border-[#00E5FF]/30 hover:bg-[#05070D]/80 transition-all duration-300 text-center text-white cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  {language}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Knowledge Levels */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <h3 className="text-2xl text-white text-center mb-8">
            Níveis de Conhecimento
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {levels.map((level, index) => (
              <motion.div
                key={index}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${level.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`}
                />

                {/* Card */}
                <div className="relative bg-gradient-to-br from-[#0B0F1A] to-[#05070D] p-6 rounded-2xl border border-[#00E5FF]/20 group-hover:border-[#00E5FF]/40 transition-all duration-300 h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#00E5FF]/10 flex items-center justify-center mb-4 group-hover:bg-[#00E5FF]/20 transition-all duration-300">
                      <span className="text-2xl text-[#00E5FF]">
                        {index + 1}
                      </span>
                    </div>
                    <h4 className="text-xl text-white mb-2">{level.name}</h4>
                    <p className="text-sm text-[#B0B3B8]">{level.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-[#0B0F1A] to-[#05070D] border border-[#00E5FF]/30">
            <p className="text-lg text-[#B0B3B8] mb-4 max-w-2xl">
              Faça parte de uma comunidade profissional e estruturada, focada em
              crescimento técnico e colaboração.
            </p>
            <a
              href="#contato"
              className="inline-block px-8 py-4 bg-[#00E5FF] text-[#05070D] rounded-lg hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all duration-300"
            >
              Participar Agora
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}