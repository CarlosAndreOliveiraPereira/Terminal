import { Terminal, Github, Linkedin, MessageCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Owners } from "./Owners";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/Terminllocal404",
      icon: Github,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/terminal-i-48a2a53a6/",
      icon: Linkedin,
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/553291547944",
      icon: MessageCircle,
    },
    {
      label: "E-mail",
      href: "mailto:terminallocal404@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <footer className="relative bg-[#0B0F1A] border-t border-[#00E5FF]/20">
      {/* Owners Section */}
      <Owners />
      
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Terminal className="w-6 h-6 text-[#00E5FF]" />
              <span className="text-lg text-white font-bold tracking-wider">
                Terminal <span className="text-[#00E5FF]">404</span>
              </span>
            </div>
            <p className="text-[#B0B3B8] text-sm max-w-xs">
              Desenvolvimento web de alta performance e estética cyberpunk.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B0B3B8] hover:text-[#00E5FF] transition-all hover:scale-110 p-2 rounded-lg hover:bg-[#00E5FF]/10"
                title={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-12 pt-8 border-t border-[#00E5FF]/10">
          {/* Legal Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/terms"
              className="text-[#B0B3B8] hover:text-[#00E5FF] text-xs uppercase tracking-widest transition-colors"
            >
              Termos de Uso
            </Link>
            <span className="text-[#00E5FF]/20">|</span>
            <Link
              to="/privacy"
              className="text-[#B0B3B8] hover:text-[#00E5FF] text-xs uppercase tracking-widest transition-colors"
            >
              Política de Privacidade
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-[#B0B3B8]/60">
            © {currentYear} Terminal 404 — Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-30" />
    </footer>
  );
}