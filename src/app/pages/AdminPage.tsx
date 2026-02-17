import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Search, 
  Download, 
  Calendar, 
  Mail, 
  Phone, 
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Shield,
  LogOut,
  Filter
} from "lucide-react";

interface QuoteSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  description: string;
  budget: string;
  deadline: string;
  createdAt: string;
}

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [submissions, setSubmissions] = useState<QuoteSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Check if already authenticated
  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (token) {
      setIsAuthenticated(true);
      fetchSubmissions();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const response = await fetch("/backend/admin-login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (result.success) {
        sessionStorage.setItem("admin_token", result.token);
        setIsAuthenticated(true);
        fetchSubmissions();
      } else {
        setLoginError("Credenciais inválidas");
      }
    } catch (error) {
      setLoginError("Erro ao conectar. Tente novamente.");
    }
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("admin_token");
      const response = await fetch("/backend/admin-quotes.php", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();
      if (result.success) {
        setSubmissions(result.data);
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setSubmissions([]);
  };

  const exportToCSV = () => {
    const headers = ["ID", "Nome", "Email", "Telefone", "Tipo", "Orçamento", "Prazo", "Data"];
    const rows = filteredSubmissions.map(s => [
      s.id,
      s.name,
      s.email,
      s.phone,
      s.projectType,
      s.budget,
      s.deadline,
      new Date(s.createdAt).toLocaleString("pt-BR"),
    ]);

    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orcamentos_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  // Filter logic
  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = 
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = dateFilter 
      ? sub.createdAt.startsWith(dateFilter)
      : true;

    return matchesSearch && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const paginatedSubmissions = filteredSubmissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getProjectTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      "landing-page": "Landing Page",
      "site-institucional": "Site Institucional",
      "e-commerce": "E-commerce",
      "sistema-web": "Sistema Web",
      "outro": "Outro",
    };
    return labels[type] || type;
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#05070D] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Grid */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0, 229, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="bg-[#0B0F1A]/90 backdrop-blur-sm p-8 rounded-2xl border border-[#00E5FF]/20 shadow-2xl shadow-[#00E5FF]/10">
            
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30">
                <Shield className="w-10 h-10 text-[#00E5FF]" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white text-center mb-2">
              Painel Administrativo
            </h1>
            <p className="text-[#B0B3B8] text-center mb-8">
              Terminal 404 - Sistema de Gestão
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-[#B0B3B8] mb-2">
                  Usuário
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#05070D]/90 border border-[#00E5FF]/30 text-white placeholder-[#4A5568] focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/30 transition-all"
                  placeholder="Digite seu usuário"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#B0B3B8] mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#05070D]/90 border border-[#00E5FF]/30 text-white placeholder-[#4A5568] focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/30 transition-all"
                  placeholder="Digite sua senha"
                />
              </div>

              {loginError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#00E5FF] text-[#05070D] font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Entrar
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-[#05070D] pt-24 pb-16 px-4 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Painel Administrativo
            </h1>
            <p className="text-[#B0B3B8]">
              Gerenciamento de Orçamentos - Terminal 404
            </p>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </motion.div>

        {/* Filters and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0B0F1A]/80 backdrop-blur-sm p-6 rounded-xl border border-[#00E5FF]/20 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00E5FF]/50" />
              <input
                type="text"
                placeholder="Buscar por nome ou e-mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#05070D]/90 border border-[#00E5FF]/30 text-white placeholder-[#4A5568] focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/30 transition-all"
              />
            </div>

            {/* Date Filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00E5FF]/50" />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#05070D]/90 border border-[#00E5FF]/30 text-white focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/30 transition-all"
              />
            </div>

            {/* Export Button */}
            <button
              onClick={exportToCSV}
              disabled={filteredSubmissions.length === 0}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] hover:bg-[#00E5FF]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5" />
              Exportar CSV
            </button>
          </div>

          <div className="mt-4 text-sm text-[#B0B3B8]">
            Total de registros: <span className="text-[#00E5FF] font-semibold">{filteredSubmissions.length}</span>
          </div>
        </motion.div>

        {/* Submissions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0B0F1A]/80 backdrop-blur-sm rounded-xl border border-[#00E5FF]/20 overflow-hidden"
        >
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block w-8 h-8 border-2 border-[#00E5FF]/30 border-t-[#00E5FF] rounded-full animate-spin" />
              <p className="text-[#B0B3B8] mt-4">Carregando...</p>
            </div>
          ) : paginatedSubmissions.length === 0 ? (
            <div className="p-12 text-center text-[#B0B3B8]">
              Nenhum registro encontrado.
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#05070D]/90 border-b border-[#00E5FF]/20">
                    <tr>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-[#00E5FF] uppercase tracking-wider">ID</th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-[#00E5FF] uppercase tracking-wider">Nome</th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-[#00E5FF] uppercase tracking-wider">Contato</th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-[#00E5FF] uppercase tracking-wider">Projeto</th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-[#00E5FF] uppercase tracking-wider">Orçamento</th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-[#00E5FF] uppercase tracking-wider">Data</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#00E5FF]/10">
                    {paginatedSubmissions.map((sub, index) => (
                      <motion.tr
                        key={sub.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-[#00E5FF]/5 transition-colors"
                      >
                        <td className="px-4 py-4 text-sm text-white font-mono">#{sub.id}</td>
                        <td className="px-4 py-4 text-sm text-white">{sub.name}</td>
                        <td className="px-4 py-4 text-sm">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-[#B0B3B8]">
                              <Mail className="w-3 h-3 text-[#00E5FF]" />
                              <span className="text-xs">{sub.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#B0B3B8]">
                              <Phone className="w-3 h-3 text-[#00E5FF]" />
                              <span className="text-xs">{sub.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-2 py-1 rounded-md bg-[#00E5FF]/10 text-[#00E5FF] text-xs">
                            {getProjectTypeLabel(sub.projectType)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-[#B0B3B8]">{sub.budget}</td>
                        <td className="px-4 py-4 text-sm text-[#B0B3B8] font-mono">
                          {new Date(sub.createdAt).toLocaleDateString("pt-BR")}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 bg-[#05070D]/50 border-t border-[#00E5FF]/10">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] hover:bg-[#00E5FF]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </button>
                  
                  <span className="text-sm text-[#B0B3B8]">
                    Página <span className="text-[#00E5FF] font-semibold">{currentPage}</span> de <span className="text-[#00E5FF] font-semibold">{totalPages}</span>
                  </span>
                  
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] hover:bg-[#00E5FF]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Próxima
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
