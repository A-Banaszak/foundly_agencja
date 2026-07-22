import React, { useState } from 'react';
import { 
  BarChart3, RefreshCw, Smartphone, ShieldCheck, Zap, TrendingUp, CheckCircle2, 
  Lock, Key, Phone, Mail, FileText, Download, MessageSquare, Search, Filter, 
  ChevronRight, ExternalLink, Calendar, DollarSign, Activity, AlertCircle, LogOut, Eye, EyeOff
} from 'lucide-react';
import { DEMO_CLIENT_ACCOUNT, DEMO_DAILY_METRICS, DEMO_LEADS_HISTORY } from '../../lib/client-portal-api';
import type { ClientAccount, LeadItem } from '../../lib/client-portal-api';

export default function ClientDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>('demo@foundly.pl');
  const [passwordInput, setPasswordInput] = useState<string>('haslo123');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  
  const [activeAccount, setActiveAccount] = useState<ClientAccount>(DEMO_CLIENT_ACCOUNT);
  const [leads, setLeads] = useState<LeadItem[]>(DEMO_LEADS_HISTORY);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const currentEmail = emailInput.trim() || 'demo@foundly.pl';
    const currentPassword = passwordInput.trim() || 'haslo123';

    // Set client account context
    setActiveAccount({
      ...DEMO_CLIENT_ACCOUNT,
      email: currentEmail,
      clientName: currentEmail.split('@')[0].toUpperCase(),
      companyName: currentEmail.includes('demo') ? DEMO_CLIENT_ACCOUNT.companyName : `Firma ${currentEmail.split('@')[0]}`
    });

    setIsAuthenticated(true);
    setAuthError('');
  };

  const handleDemoLogin = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setEmailInput('demo@foundly.pl');
    setPasswordInput('haslo123');
    setActiveAccount(DEMO_CLIENT_ACCOUNT);
    setIsAuthenticated(true);
    setAuthError('');
  };

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1200);
  };

  const updateLeadStatus = (leadId: string, newStatus: LeadItem['status']) => {
    setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
  };

  // Calculations
  const totalLeads = DEMO_DAILY_METRICS.reduce((acc, m) => acc + m.leadsCount, 0);
  const totalPhoneClicks = DEMO_DAILY_METRICS.reduce((acc, m) => acc + m.phoneClicks, 0);
  const totalFormLeads = DEMO_DAILY_METRICS.reduce((acc, m) => acc + m.formLeads, 0);
  const totalSpend = DEMO_DAILY_METRICS.reduce((acc, m) => acc + m.googleAdsSpend + m.metaAdsSpend, 0);
  const avgCpl = (totalSpend / totalLeads).toFixed(2);

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSearch = lead.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lead.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (lead.details && lead.details.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-b from-indigo-950/40 via-purple-950/20 to-black border-2 border-indigo-500/40 backdrop-blur-2xl shadow-2xl space-y-8 relative overflow-hidden">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/10">
              <Lock className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Strefa Klienta Foundly 24/7
            </span>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">
              Zaloguj się do Panelu
            </h1>
            <p className="text-xs text-white/50 font-medium">
              Dostęp na żywo do wyników kampanii Google Ads, Meta Ads oraz pozycji SEO.
            </p>
          </div>

          {authError && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5" noValidate>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                Adres E-mail Klienta:
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="np. demo@foundly.pl lub Twój e-mail"
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                Hasło:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Wprowadź swoje hasło"
                  className="w-full h-12 pl-4 pr-11 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-xs uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
            >
              <span>Zaloguj do Panelu Wyników</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center space-y-3">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-3.5 px-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Zap className="w-4 h-4 text-indigo-400 fill-indigo-400" />
              <span>Szybkie Logowanie Konto Demo (1-Click)</span>
            </button>
            <p className="text-[10px] text-white/40">
              Pola są wstępnie uzupełnione. Kliknij dowolny przycisk logowania.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header Bar */}
      <div className="p-6 sm:p-8 rounded-[2.5rem] bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-black border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono text-emerald-400 font-bold tracking-wider uppercase">Live API Sync Connected</span>
            <span className="text-[10px] text-white/40 font-mono">| Ostatnia nocna sync: 01:00 AM</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black uppercase italic tracking-tight text-white">
            Witaj, {activeAccount.clientName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-white/50 font-medium">
            Firma: <strong className="text-white">{activeAccount.companyName}</strong> | Witryna: <a href={activeAccount.gscSiteUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">{activeAccount.gscSiteUrl}</a>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleManualSync}
            disabled={isSyncing}
            className="px-4 py-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-bold text-xs uppercase tracking-wider hover:bg-indigo-500/30 transition-all flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Synchronizacja API...' : 'Odśwież Dane Live'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 font-bold text-xs uppercase tracking-wider hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Wyloguj</span>
          </button>
        </div>
      </div>

      {/* 4 Main KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 sm:p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 space-y-4 hover:border-indigo-500/40 transition-colors relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/50">Pozyskane Leady</span>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Phone className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white italic tracking-tight">{totalLeads}</div>
            <div className="text-[11px] text-emerald-400 font-bold mt-1">↑ +28% od ubiegłego msc</div>
          </div>
          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-bold text-white/40">
            <span>Telefony: <strong className="text-white">{totalPhoneClicks}</strong></span>
            <span>Formularze: <strong className="text-white">{totalFormLeads}</strong></span>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 space-y-4 hover:border-indigo-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/50">Średni CPL (Koszt Leada)</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-indigo-400 italic tracking-tight">{avgCpl} PLN</div>
            <div className="text-[11px] text-white/40 font-medium mt-1">Optymalizacja stawek na żywo</div>
          </div>
          <div className="pt-3 border-t border-white/5 text-[11px] font-bold text-white/40">
            Stabilny koszt pozyskania leada
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 space-y-4 hover:border-indigo-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/50">Wydatki na Ads (Ten msc)</span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white italic tracking-tight">{totalSpend} PLN</div>
            <div className="text-[11px] text-white/40 font-medium mt-1">Płatne bezpośrednio do Google/Meta</div>
          </div>
          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-bold text-white/40">
            <span>Google: <strong className="text-white">474 PLN</strong></span>
            <span>Meta: <strong className="text-white">160 PLN</strong></span>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 space-y-4 hover:border-indigo-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/50">Pozycja w Google Maps</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 italic tracking-tight">TOP 1-3</div>
            <div className="text-[11px] text-white/40 font-medium mt-1">Główne frazy branżowe w Twoim mieście</div>
          </div>
          <div className="pt-3 border-t border-white/5 text-[11px] font-bold text-white/40">
            Wizytówka Google Moja Firma aktywna
          </div>
        </div>
      </div>

      {/* Live API Integration Status Details */}
      <div className="p-6 sm:p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-black uppercase italic text-white">Połączone Źródła Danych (API Status)</h3>
            <p className="text-xs text-white/50">Automatyczna pobieralnia statystyk bezpośrednio z oficjalnych systemów.</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
            Wszystkie API Aktywne (100% Sync)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-white">Google Analytics 4</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <div className="text-[11px] font-mono text-white/40">ID: {activeAccount.ga4PropertyId}</div>
            <div className="text-[10px] text-indigo-300 font-bold">Sesje & Zdarzenia Konwersji</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-white">Google Ads API</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <div className="text-[11px] font-mono text-white/40">ID: {activeAccount.googleAdsCustomerId}</div>
            <div className="text-[10px] text-indigo-300 font-bold">Wydatki & Kliknięcia Telefonów</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-white">Meta Marketing API</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <div className="text-[11px] font-mono text-white/40">ID: {activeAccount.metaAdAccountId}</div>
            <div className="text-[10px] text-purple-300 font-bold">Kampanie Facebook & Instagram</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-white">Search Console API</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <div className="text-[11px] font-mono text-white/40">Domain: {activeAccount.gscSiteUrl.replace('https://', '')}</div>
            <div className="text-[10px] text-emerald-300 font-bold">Pozycje Fraza Po Frazie</div>
          </div>
        </div>
      </div>

      {/* Interactive Leads Table */}
      <div className="p-6 sm:p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-black uppercase italic text-white">Rejestr Pozyskanych Zapytań (Live Feed)</h3>
            <p className="text-xs text-white/50">Lista potencjalnych klientów pozyskanych przez stronę i kampanie.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-3 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Szukaj leada..."
                className="w-full h-9 pl-9 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 px-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold uppercase focus:outline-none focus:border-indigo-500"
            >
              <option value="all" className="bg-[#080808]">Wszystkie statusy</option>
              <option value="Nowy" className="bg-[#080808]">Nowe zapytania</option>
              <option value="W kontakcie" className="bg-[#080808]">W kontakcie</option>
              <option value="Zrealizowany" className="bg-[#080808]">Zrealizowane</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-black uppercase tracking-wider text-white/40">
                <th className="py-3 px-4">Data i Czas</th>
                <th className="py-3 px-4">Typ Zgłoszenia</th>
                <th className="py-3 px-4">Źródło Ruchu</th>
                <th className="py-3 px-4">Imię i Kontakt</th>
                <th className="py-3 px-4">Szczegóły</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-medium">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4 text-white/60 font-mono text-[11px]">{lead.date}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      lead.type === 'phone' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    }`}>
                      {lead.type === 'phone' ? '📞 Połączenie' : '📝 Formularz'}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-white/80">{lead.source}</td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-white">{lead.clientName}</div>
                    <div className="text-[11px] text-indigo-400 font-mono">{lead.contact}</div>
                  </td>
                  <td className="py-4 px-4 text-white/60 max-w-xs truncate">{lead.details || '-'}</td>
                  <td className="py-4 px-4 text-right">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadItem['status'])}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border focus:outline-none ${
                        lead.status === 'Nowy' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                        lead.status === 'W kontakcie' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' :
                        'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}
                    >
                      <option value="Nowy" className="bg-[#080808] text-white">Nowy</option>
                      <option value="W kontakcie" className="bg-[#080808] text-white">W kontakcie</option>
                      <option value="Zrealizowany" className="bg-[#080808] text-white">Zrealizowany</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Support & Rapid Actions */}
      <div className="p-6 sm:p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-black uppercase italic text-white mb-1">
            Masz pytania do opiekuna lub chcesz wprowadzić zmiany na stronie?
          </h3>
          <p className="text-xs text-white/50">
            Darmowe modyfikacje treści w cenie abonamentu. Dedykowany opiekun odpowiada w max 2h.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <a href="mailto:kontakt@foundly.pl" className="flex-1 md:flex-initial">
            <button type="button" className="w-full px-6 h-12 rounded-xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Napisz do Opiekuna</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
