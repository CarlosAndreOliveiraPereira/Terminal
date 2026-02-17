import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: "Início", href: "/" },
    { label: "Sobre", href: "/about" },
    { label: "Serviços", href: "/services" },
    { label: "Comunidade", href: "/community" },
    { label: "Registro", href: "/access-log" },
    { label: "Contato", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#05070D]/90 backdrop-blur-xl border-b border-[#00E5FF]/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <nav className="container mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
        {/* Logo - Simplified as requested */}
        <Link
          to="/"
          className="flex items-center gap-4 group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Logo size={50} className="transition-transform duration-300 group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white group-hover:text-[#00E5FF] transition-colors duration-300">
              Terminal 404
            </span>
            <span className="text-[10px] text-[#00E5FF] font-mono uppercase tracking-widest">
              Cyberpunk Tech
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`relative text-sm font-semibold tracking-wide transition-all duration-300 py-2 ${
                isActive(item.href) ? "text-[#00E5FF]" : "text-[#B0B3B8] hover:text-white"
              } group`}
            >
              {item.label}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#00E5FF] transition-all duration-300 ${
                isActive(item.href) ? "w-full shadow-[0_0_10px_#00E5FF]" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 hover:bg-[#00E5FF]/10 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <Menu className="w-8 h-8" />
          )}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="absolute top-24 left-0 right-0 border-b border-[#00E5FF]/20 bg-[#0B0F1A]/95 backdrop-blur-xl shadow-2xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col p-6 gap-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                      isActive(item.href) 
                        ? "text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/20" 
                        : "text-[#B0B3B8] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}