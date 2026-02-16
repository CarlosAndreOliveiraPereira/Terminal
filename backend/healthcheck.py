#!/usr/bin/env python3
"""
Terminal 404 - Health Check Script
Verifica o status de todos os componentes do sistema
"""

import sys
import os
import subprocess
from datetime import datetime

COLORS = {
    'green': '\033[92m',
    'red': '\033[91m',
    'yellow': '\033[93m',
    'blue': '\033[94m',
    'cyan': '\033[96m',
    'reset': '\033[0m'
}

def print_colored(text, color='reset'):
    """Print colored text"""
    print(f"{COLORS.get(color, '')}{text}{COLORS['reset']}")

def print_header(text):
    """Print section header"""
    print("\n" + "=" * 60)
    print_colored(f"  {text}", 'cyan')
    print("=" * 60)

def check_python_version():
    """Check Python version"""
    print_header("Verificando Python")
    version = sys.version_info
    
    if version.major >= 3 and version.minor >= 8:
        print_colored(f"✅ Python {version.major}.{version.minor}.{version.micro}", 'green')
        return True
    else:
        print_colored(f"❌ Python {version.major}.{version.minor}.{version.micro} (requer 3.8+)", 'red')
        return False

def check_virtual_env():
    """Check if virtual environment exists"""
    print_header("Verificando Virtual Environment")
    
    if os.path.exists('venv'):
        print_colored("✅ Virtual environment encontrado", 'green')
        
        # Check if it's activated
        if hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
            print_colored("✅ Virtual environment ativado", 'green')
            return True
        else:
            print_colored("⚠️  Virtual environment não ativado", 'yellow')
            print_colored("   Execute: source venv/bin/activate", 'yellow')
            return False
    else:
        print_colored("❌ Virtual environment não encontrado", 'red')
        print_colored("   Execute: python3 -m venv venv", 'yellow')
        return False

def check_dependencies():
    """Check if all dependencies are installed"""
    print_header("Verificando Dependências")
    
    required_packages = [
        'Flask',
        'flask_limiter',
        'flask_cors',
        'bleach',
        'gunicorn'
    ]
    
    missing = []
    for package in required_packages:
        try:
            __import__(package.lower().replace('-', '_'))
            print_colored(f"✅ {package}", 'green')
        except ImportError:
            print_colored(f"❌ {package}", 'red')
            missing.append(package)
    
    if missing:
        print_colored(f"\n⚠️  Pacotes faltando: {', '.join(missing)}", 'yellow')
        print_colored("   Execute: pip install -r requirements.txt", 'yellow')
        return False
    
    return True

def check_env_file():
    """Check if .env file exists and is configured"""
    print_header("Verificando Configuração (.env)")
    
    if not os.path.exists('.env'):
        print_colored("❌ Arquivo .env não encontrado", 'red')
        print_colored("   Execute: cp .env.example .env", 'yellow')
        return False
    
    print_colored("✅ Arquivo .env encontrado", 'green')
    
    # Load and check critical variables
    try:
        from dotenv import load_dotenv
        load_dotenv()
        
        critical_vars = ['SMTP_USER', 'SMTP_PASS']
        warnings = []
        
        for var in critical_vars:
            value = os.getenv(var)
            if not value:
                warnings.append(var)
                print_colored(f"⚠️  {var} não configurado", 'yellow')
            else:
                print_colored(f"✅ {var} configurado", 'green')
        
        # Check if using example values
        if os.getenv('SMTP_PASS') == 'your_app_specific_password_here':
            print_colored("⚠️  SMTP_PASS ainda está com valor de exemplo", 'yellow')
            warnings.append('SMTP_PASS')
        
        if os.getenv('IP_HASH_SALT') == 'change_this_to_random_string_for_production':
            print_colored("⚠️  IP_HASH_SALT ainda está com valor de exemplo", 'yellow')
        
        if warnings:
            print_colored(f"\n⚠️  Configure: {', '.join(warnings)}", 'yellow')
            return False
        
        return True
        
    except ImportError:
        print_colored("⚠️  python-dotenv não instalado", 'yellow')
        return False

def check_log_files():
    """Check if log files are writable"""
    print_header("Verificando Arquivos de Log")
    
    log_files = ['security.log', 'security_events.log']
    
    for log_file in log_files:
        if os.path.exists(log_file):
            if os.access(log_file, os.W_OK):
                print_colored(f"✅ {log_file} (gravável)", 'green')
            else:
                print_colored(f"❌ {log_file} (sem permissão de escrita)", 'red')
                return False
        else:
            # Try to create it
            try:
                open(log_file, 'a').close()
                print_colored(f"✅ {log_file} (criado)", 'green')
            except:
                print_colored(f"❌ {log_file} (não pode criar)", 'red')
                return False
    
    return True

def check_port_availability():
    """Check if port 5000 is available"""
    print_header("Verificando Porta 5000")
    
    try:
        import socket
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(1)
        result = s.connect_ex(('127.0.0.1', 5000))
        s.close()
        
        if result == 0:
            print_colored("⚠️  Porta 5000 já está em uso", 'yellow')
            print_colored("   O backend pode já estar rodando", 'yellow')
            return True  # Not necessarily a failure
        else:
            print_colored("✅ Porta 5000 disponível", 'green')
            return True
    except:
        print_colored("⚠️  Não foi possível verificar porta", 'yellow')
        return True

def check_file_permissions():
    """Check if app.py is executable"""
    print_header("Verificando Permissões")
    
    files_to_check = ['app.py', 'deploy.sh', 'test_api.py']
    
    for file in files_to_check:
        if os.path.exists(file):
            if os.access(file, os.R_OK):
                print_colored(f"✅ {file} (legível)", 'green')
            else:
                print_colored(f"❌ {file} (sem permissão de leitura)", 'red')
                return False
        else:
            print_colored(f"⚠️  {file} não encontrado", 'yellow')
    
    return True

def check_disk_space():
    """Check available disk space"""
    print_header("Verificando Espaço em Disco")
    
    try:
        import shutil
        total, used, free = shutil.disk_usage(".")
        
        free_gb = free // (2**30)
        print(f"Espaço livre: {free_gb} GB")
        
        if free_gb < 1:
            print_colored("⚠️  Pouco espaço em disco disponível", 'yellow')
            return False
        else:
            print_colored(f"✅ {free_gb} GB disponíveis", 'green')
            return True
    except:
        print_colored("⚠️  Não foi possível verificar espaço", 'yellow')
        return True

def main():
    """Run all health checks"""
    start_time = datetime.now()
    
    print_colored("\n" + "=" * 60, 'cyan')
    print_colored("  Terminal 404 - Health Check", 'cyan')
    print_colored("=" * 60, 'cyan')
    print(f"Iniciado em: {start_time.strftime('%Y-%m-%d %H:%M:%S')}")
    
    results = {
        'Python Version': check_python_version(),
        'Virtual Environment': check_virtual_env(),
        'Dependencies': check_dependencies(),
        'Configuration (.env)': check_env_file(),
        'Log Files': check_log_files(),
        'Port 5000': check_port_availability(),
        'File Permissions': check_file_permissions(),
        'Disk Space': check_disk_space(),
    }
    
    # Summary
    print_header("Resumo")
    
    total = len(results)
    passed = sum(1 for v in results.values() if v)
    failed = total - passed
    
    print(f"Total de verificações: {total}")
    print_colored(f"Aprovadas: {passed} ✅", 'green')
    
    if failed > 0:
        print_colored(f"Falharam: {failed} ❌", 'red')
    else:
        print_colored(f"Falharam: {failed}", 'green')
    
    success_rate = (passed / total) * 100
    print(f"Taxa de sucesso: {success_rate:.1f}%")
    
    elapsed = (datetime.now() - start_time).total_seconds()
    print(f"Tempo decorrido: {elapsed:.2f}s")
    
    print("\n" + "=" * 60 + "\n")
    
    if failed == 0:
        print_colored("🎉 Todos os checks passaram! Sistema pronto para uso.", 'green')
        print_colored("Execute 'python app.py' ou './deploy.sh' para iniciar.", 'green')
        return 0
    else:
        print_colored(f"⚠️  {failed} check(s) falharam. Revise os resultados acima.", 'yellow')
        print_colored("Consulte o README.md para instruções de configuração.", 'yellow')
        return 1

if __name__ == "__main__":
    try:
        exit_code = main()
        sys.exit(exit_code)
    except KeyboardInterrupt:
        print_colored("\n\n⚠️  Health check cancelado pelo usuário.", 'yellow')
        sys.exit(1)
    except Exception as e:
        print_colored(f"\n\n❌ Erro inesperado: {str(e)}", 'red')
        sys.exit(1)
