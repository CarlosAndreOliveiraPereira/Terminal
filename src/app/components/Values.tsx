import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Shield, Target, Users, Lock, TrendingUp, Heart } from "lucide-react";

export function Values() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      icon: Target,
      title: "Profissionalismo",
      description:
        "Mantemos os mais altos padrões de conduta profissional em todos os projetos e interações.",
    },
    {
      icon: Shield,
      title: "Organização",
      description:
        "Estrutura bem definida, processos claros e documentação completa em todas as atividades.",
    },
    {
      icon: Users,
      title: "Colaboração",
      description:
        "Trabalho em equipe eficiente, comunicação transparente e compartilhamento de conhecimento.",
    },
    {
      icon: Lock,
      title: "Segurança",
      description:
        "Proteção de dados, boas práticas de desenvolvimento e código seguro são prioridades.",
    },
    {
      icon: TrendingUp,
      title: "Crescimento Técnico",
      description:
        "Investimos no desenvolvimento contínuo, aprendizado e evolução de habilidades técnicas.",
    },
    {
      icon: Heart,
      title: "Ética e Respeito",
      description:
        "Ambiente inclusivo, respeitoso e ético, valorizando cada membro da comunidade.",
    },
  ];

  return (
    <section
      id="valores"
      ref={ref}
      className="relative py-24 bg-gradient-to-b from-[#0B0F1A] to-[#05070D] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(0, 229, 255, 0.3) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block px-4 py-2 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 mb-4">
            <span className="text-sm text-[#00E5FF]">Nossos Valores</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            O Que Nos Move
          </h2>
          <div className="h-1 w-20 mx-auto bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent mb-6" />
          <p className="text-lg text-[#B0B3B8] max-w-3xl mx-auto">
            Princípios fundamentais que guiam nosso trabalho, relacionamentos e
            crescimento como empresa e comunidade.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-[#00E5FF]/0 group-hover:bg-[#00E5FF]/5 rounded-2xl blur-xl transition-all duration-500" />

              {/* Card */}
              <div className="relative bg-gradient-to-br from-[#0B0F1A]/80 to-[#05070D]/80 backdrop-blur-sm p-8 rounded-2xl border border-[#00E5FF]/20 group-hover:border-[#00E5FF]/40 transition-all duration-300 h-full">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-xl bg-[#00E5FF]/10 flex items-center justify-center group-hover:bg-[#00E5FF]/20 group-hover:scale-110 transition-all duration-300">
                    <value.icon className="w-8 h-8 text-[#00E5FF]" />
                  </div>
                  {/* Icon Glow */}
                  <div className="absolute inset-0 bg-[#00E5FF]/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <h3 className="text-xl text-white mb-3 group-hover:text-[#00E5FF] transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-[#B0B3B8] leading-relaxed">
                  {value.description}
                </p>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00E5FF]/0 to-transparent group-hover:via-[#00E5FF]/50 transition-all duration-500 rounded-b-2xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quote */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-[#0B0F1A] to-[#05070D] border border-[#00E5FF]/30 relative overflow-hidden">
            {/* Quote Decoration */}
            <div className="absolute top-0 left-0 text-[#00E5FF]/10 text-9xl leading-none select-none">
              "
            </div>
            <div className="relative z-10">
              <p className="text-xl text-white italic mb-4">
                "Construindo o futuro da tecnologia através de colaboração,
                excelência técnica e valores sólidos."
              </p>
              <div className="h-1 w-16 mx-auto bg-[#00E5FF]/50" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
