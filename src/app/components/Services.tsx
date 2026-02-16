import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Server, Code, Database, Network } from "lucide-react";
import logo from "figma:asset/a2cf386f6867e3c2fdab342a3de11efe99903303.png";

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Server,
      title: "Backend",
      description:
        "Desenvolvimento de APIs, sistemas, regras de negócio e integrações.",
      technologies: ["Python", "FastAPI", "JavaScript", "TypeScript"],
    },
    {
      icon: Code,
      title: "Frontend",
      description:
        "Criação de interfaces modernas, responsivas e focadas na experiência do usuário.",
      technologies: ["React", "Vue", "Angular", "TypeScript"],
    },
    {
      icon: Database,
      title: "Banco de Dados",
      description:
        "Modelagem, otimização, segurança e gerenciamento de dados.",
      technologies: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
    },
    {
      icon: Network,
      title: "Projetos Colaborativos",
      description:
        "Ambiente organizado para desenvolvimento e evolução de projetos em equipe.",
      technologies: ["Git", "CI/CD", "Docker", "Kubernetes"],
    },
  ];

  return (
    <section
      id="servicos"
      ref={ref}
      className="relative py-24 bg-gradient-to-b from-[#05070D] to-[#0B0F1A] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-40 left-10 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-[120px]" />

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
            <span className="text-sm text-[#00E5FF]">Nossos Serviços</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Áreas de Atuação
          </h2>
          <div className="h-1 w-20 mx-auto bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent mb-6" />
          <p className="text-lg text-[#B0B3B8] max-w-2xl mx-auto">
            Soluções completas em desenvolvimento de software com foco em qualidade,
            performance e escalabilidade.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/0 to-[#00E5FF]/0 group-hover:from-[#00E5FF]/10 group-hover:to-transparent rounded-2xl blur-xl transition-all duration-500" />

              {/* Card Content */}
              <div className="relative bg-gradient-to-br from-[#0B0F1A] to-[#05070D] p-8 rounded-2xl border border-[#00E5FF]/20 group-hover:border-[#00E5FF]/40 transition-all duration-300 h-full">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-[#00E5FF]/10 flex items-center justify-center mb-6 group-hover:bg-[#00E5FF]/20 group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-8 h-8 text-[#00E5FF]" />
                </div>

                {/* Title */}
                <h3 className="text-2xl text-white mb-4 group-hover:text-[#00E5FF] transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[#B0B3B8] mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs bg-[#00E5FF]/10 text-[#00E5FF] rounded-full border border-[#00E5FF]/20 hover:bg-[#00E5FF]/20 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/5 blur-[50px] rounded-full group-hover:bg-[#00E5FF]/10 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <p className="text-[#B0B3B8] mb-6">
            Interessado em desenvolver um projeto conosco?
          </p>
          <a
            href="#contato"
            className="inline-block px-8 py-4 bg-[#00E5FF] text-[#05070D] rounded-lg hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all duration-300"
          >
            Entrar em Contato
          </a>
        </motion.div>
      </div>
    </section>
  );
}
