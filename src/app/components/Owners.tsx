import { Shield, Code, Terminal, Zap } from "lucide-react";
import owner1 from "figma:asset/4a24cfb48dbe3315409300798348bb0b6af2a7a7.png";
import owner2 from "figma:asset/c3450cccfe9fde1adaf6b8cb414376e4745aebb0.png";
import owner3 from "figma:asset/b4e86e978f464fe8fe0f2fe9654a3e31d0421a32.png";

interface Owner {
  name: string;
  role: string;
  image: string;
  specialty: string;
  icon: typeof Shield;
}

const owners: Owner[] = [
  {
    name: "Co-Founder",
    role: "Chief Technology Officer",
    image: owner1,
    specialty: "Backend & Security",
    icon: Shield,
  },
  {
    name: "Co-Founder",
    role: "Lead Developer",
    image: owner2,
    specialty: "Full Stack Development",
    icon: Code,
  },
  {
    name: "Co-Founder",
    role: "Chief Executive Officer",
    image: owner3,
    specialty: "Strategy & Innovation",
    icon: Terminal,
  },
];

export function Owners() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#05070D] via-[#0B0F1A] to-[#05070D] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00E5FF] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF00FF] rounded-full blur-[120px]" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#00E5FF 1px, transparent 1px),
            linear-gradient(90deg, #00E5FF 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 mb-6">
            <Zap className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-[#00E5FF] text-sm font-mono uppercase tracking-wider">
              Fundadores
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-[#00E5FF] to-white bg-clip-text text-transparent">
              Os Criadores do
            </span>
            <br />
            <span className="text-[#00E5FF] font-black">Terminal 404</span>
          </h2>
          
          <p className="text-[#B0B3B8] text-lg max-w-2xl mx-auto">
            A equipe visionária por trás da estética cyberpunk e tecnologia de ponta
          </p>
        </div>

        {/* Owners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {owners.map((owner, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-gradient-to-br from-[#0B0F1A] to-[#05070D] border border-[#00E5FF]/20 rounded-2xl p-8 transition-all duration-500 hover:border-[#00E5FF]/60 hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] overflow-hidden">
                
                {/* Animated Corner Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00E5FF]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#FF00FF]/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon Badge */}
                <div className="absolute top-6 right-6 p-3 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 group-hover:bg-[#00E5FF]/20 transition-all duration-300">
                  <owner.icon className="w-5 h-5 text-[#00E5FF]" />
                </div>

                {/* Image Container */}
                <div className="relative mb-6">
                  <div className="relative w-40 h-40 mx-auto">
                    {/* Hexagon Border Effect */}
                    <div className="absolute inset-0 rounded-full border-2 border-[#00E5FF]/30 group-hover:border-[#00E5FF] transition-all duration-500" />
                    <div className="absolute inset-2 rounded-full border border-[#00E5FF]/20 group-hover:border-[#00E5FF]/60 transition-all duration-500" />
                    
                    {/* Image */}
                    <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-[#00E5FF]/40 group-hover:scale-110 transition-transform duration-500">
                      <img
                        src={owner.image}
                        alt={owner.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-full bg-[#00E5FF]/0 group-hover:bg-[#00E5FF]/10 blur-xl transition-all duration-500" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00E5FF] transition-colors duration-300">
                    {owner.name}
                  </h3>
                  
                  <p className="text-[#00E5FF] font-mono text-sm uppercase tracking-widest mb-3">
                    {owner.role}
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#00E5FF]/5 border border-[#00E5FF]/20 group-hover:bg-[#00E5FF]/10 group-hover:border-[#00E5FF]/40 transition-all duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                    <span className="text-[#B0B3B8] text-xs font-mono">
                      {owner.specialty}
                    </span>
                  </div>
                </div>

                {/* Scan Line Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00E5FF]/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none" />
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#00E5FF]/5 border border-[#00E5FF]/20">
            <div className="flex -space-x-2">
              {owners.map((owner, idx) => (
                <div 
                  key={idx}
                  className="w-8 h-8 rounded-full border-2 border-[#0B0F1A] overflow-hidden"
                >
                  <img src={owner.image} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <span className="text-[#B0B3B8] text-sm font-mono">
              Unidos pela inovação
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
      <div className="absolute top-40 right-20 w-1 h-1 rounded-full bg-[#FF00FF] animate-pulse delay-100" />
      <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse delay-200" />
    </section>
  );
}
