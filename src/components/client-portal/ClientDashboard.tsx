import React, { useState } from 'react';
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
    }, 1000);
  };

  const updateLeadStatus = (leadId: string, newStatus: LeadItem['status']) => {
    setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
  };

  // Calculations
  const totalLeads = DEMO_DAILY_METRICS.reduce((acc, m) => acc + m.leadsCount, 0);
  const totalPhoneClicks = DEMO_DAILY_METRICS.reduce((acc, m) => acc + m.phoneClicks, 0);
  const totalFormLeads = DEMO_DAILY_METRICS.reduce((acc, m) => acc + m.formLeads, 0);
  const totalGoogleSpend = DEMO_DAILY_METRICS.reduce((acc, m) => acc + m.googleAdsSpend, 0);
  const totalMetaSpend = DEMO_DAILY_METRICS.reduce((acc, m) => acc + m.metaAdsSpend, 0);
  const totalSpend = totalGoogleSpend + totalMetaSpend;
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
      <div className="min-h-[85vh] bg-zinc-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm space-y-6">
          <div className="space-y-2 text-center">
            <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-700 text-[11px] font-bold rounded-md uppercase tracking-wider">
              Panel Klienta Foundly
            </span>
            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
              Logowanie do serwisu
            </h1>
            <p className="text-xs text-zinc-500">
              Wprowadź swoje dane, aby przejść do raportów i rejestru zapytań.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Adres e-mail:
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="np. demo@foundly.pl"
                className="w-full h-10 px-3 rounded-lg border border-zinc-300 text-zinc-900 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Hasło:
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full h-10 px-3 rounded-lg border border-zinc-300 text-zinc-900 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-sm"
            >
              Zaloguj do Panelu
            </button>
          </form>

          <div className="pt-4 border-t border-zinc-100 text-center space-y-2">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold text-xs rounded-lg transition-colors"
            >
              Zaloguj na Konto Demo (1-Click)
            </button>
            <p className="text-[11px] text-zinc-400">
              Pola są wstępnie uzupełnione. Kliknij dowolny przycisk.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header Bar */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Live API Sync Connected</span>
              <span className="text-xs text-zinc-400 font-mono">| Ostatnia aktualizacja: dziś, 01:00</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
              Konto: {activeAccount.companyName}
            </h1>
            <p className="text-xs text-zinc-500">
              Użytkownik: <strong className="text-zinc-800">{activeAccount.clientName}</strong> ({activeAccount.email}) &bull; Domena: <span className="font-mono text-zinc-700">{activeAccount.gscSiteUrl}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleManualSync}
              disabled={isSyncing}
              className="px-3.5 py-2 bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50 font-semibold text-xs rounded-lg transition-colors shadow-sm"
            >
              {isSyncing ? 'Synchronizowanie...' : 'Odśwież Dane'}
            </button>
            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              className="px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold text-xs rounded-lg transition-colors"
            >
              Wyloguj
            </button>
          </div>
        </div>

        {/* Tabular KPI Summary Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Pozyskane Leady</span>
            <div className="text-2xl sm:text-3xl font-bold text-zinc-900">{totalLeads}</div>
            <div className="text-xs text-zinc-500 font-medium">
              Telefony: <strong className="text-zinc-800">{totalPhoneClicks}</strong> &bull; Formularze: <strong className="text-zinc-800">{totalFormLeads}</strong>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Średni Koszt Leada (CPL)</span>
            <div className="text-2xl sm:text-3xl font-bold text-indigo-600">{avgCpl} PLN</div>
            <div className="text-xs text-emerald-600 font-medium">Stabilny koszt konwersji</div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Budżet Ads (Ten msc)</span>
            <div className="text-2xl sm:text-3xl font-bold text-zinc-900">{totalSpend} PLN</div>
            <div className="text-xs text-zinc-500 font-medium">
              Google: <strong className="text-zinc-800">{totalGoogleSpend} PLN</strong> &bull; Meta: <strong className="text-zinc-800">{totalMetaSpend} PLN</strong>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Widoczność w Google</span>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-600">TOP 1-3</div>
            <div className="text-xs text-zinc-500 font-medium">Wizytówka Maps & Frazy Lokalne</div>
          </div>
        </div>

        {/* Tabular API Integrations Table */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
              Status Połączonych Systemów API
            </h2>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Wszystkie API aktywne
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">System</th>
                  <th className="py-2.5 px-3">Identyfikator Konta / Zasobu</th>
                  <th className="py-2.5 px-3">Zakres Pobieranych Danych</th>
                  <th className="py-2.5 px-3 text-right">Status Sync</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-zinc-900">Google Analytics 4</td>
                  <td className="py-2.5 px-3 font-mono text-zinc-500">Property ID: {activeAccount.ga4PropertyId}</td>
                  <td className="py-2.5 px-3">Unikalne sesje, konwersje, kliknięcia w telefon</td>
                  <td className="py-2.5 px-3 text-right"><span className="text-emerald-600 font-medium">● Połączono</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-zinc-900">Google Ads API</td>
                  <td className="py-2.5 px-3 font-mono text-zinc-500">Customer ID: {activeAccount.googleAdsCustomerId}</td>
                  <td className="py-2.5 px-3">Wydatki, koszt kliknięcia, liczba połączeń</td>
                  <td className="py-2.5 px-3 text-right"><span className="text-emerald-600 font-medium">● Połączono</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-zinc-900">Meta Marketing API</td>
                  <td className="py-2.5 px-3 font-mono text-zinc-500">Ad Account ID: {activeAccount.metaAdAccountId}</td>
                  <td className="py-2.5 px-3">Wydatki Facebook/Instagram, pozyskane leady</td>
                  <td className="py-2.5 px-3 text-right"><span className="text-emerald-600 font-medium">● Połączono</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-zinc-900">Google Search Console</td>
                  <td className="py-2.5 px-3 font-mono text-zinc-500">Domain: {activeAccount.gscSiteUrl.replace('https://', '')}</td>
                  <td className="py-2.5 px-3">Pozycje organiczne w wyszukiwarce na frazy kluczowe</td>
                  <td className="py-2.5 px-3 text-right"><span className="text-emerald-600 font-medium">● Połączono</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabular Rejestr Pozyskanych Zapytań */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                Rejestr Pozyskanych Zapytań (Lead Log)
              </h2>
              <p className="text-xs text-zinc-500">Pełna lista potencjalnych klientów pozyskanych przez stronę i kampanie.</p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtruj wg nazwiska lub tel..."
                className="h-9 px-3 rounded-lg border border-zinc-300 text-zinc-900 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 w-full sm:w-56"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 px-3 rounded-lg border border-zinc-300 text-zinc-900 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-zinc-900 bg-white"
              >
                <option value="all">Wszystkie statusy</option>
                <option value="Nowy">Nowy</option>
                <option value="W kontakcie">W kontakcie</option>
                <option value="Zrealizowany">Zrealizowany</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Data i Czas</th>
                  <th className="py-2.5 px-3">Kanał Pozyskania</th>
                  <th className="py-2.5 px-3">Typ Zgłoszenia</th>
                  <th className="py-2.5 px-3">Klient / Kontakt</th>
                  <th className="py-2.5 px-3">Szczegóły Zapytania</th>
                  <th className="py-2.5 px-3 text-right">Status Obsługi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="py-3 px-3 font-mono text-zinc-500 text-[11px]">{lead.date}</td>
                    <td className="py-3 px-3 font-semibold text-zinc-800">{lead.source}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        lead.type === 'phone' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}>
                        {lead.type === 'phone' ? 'Połączenie Tel.' : 'Formularz WWW'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-zinc-900">{lead.clientName}</div>
                      <div className="text-zinc-500 font-mono text-[11px]">{lead.contact}</div>
                    </td>
                    <td className="py-3 px-3 text-zinc-600 max-w-xs truncate">{lead.details || '-'}</td>
                    <td className="py-3 px-3 text-right">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadItem['status'])}
                        className={`px-2 py-1 rounded text-[11px] font-semibold border focus:outline-none bg-white ${
                          lead.status === 'Nowy' ? 'text-amber-800 border-amber-300 bg-amber-50' :
                          lead.status === 'W kontakcie' ? 'text-indigo-800 border-indigo-300 bg-indigo-50' :
                          'text-emerald-800 border-emerald-300 bg-emerald-50'
                        }`}
                      >
                        <option value="Nowy">Nowy</option>
                        <option value="W kontakcie">W kontakcie</option>
                        <option value="Zrealizowany">Zrealizowany</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabular Daily History Table */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="border-b border-zinc-100 pb-3">
            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
              Dzienny Zapis Wyników (Ostatnie 7 Dni)
            </h2>
            <p className="text-xs text-zinc-500">Zapis dzienny pobrany bezpośrednio z interfejsów API systemów reklamowych.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Data</th>
                  <th className="py-2.5 px-3 text-center">Suma Leadów</th>
                  <th className="py-2.5 px-3 text-center">Telefony</th>
                  <th className="py-2.5 px-3 text-center">Formularze</th>
                  <th className="py-2.5 px-3 text-right">Google Ads</th>
                  <th className="py-2.5 px-3 text-right">Meta Ads</th>
                  <th className="py-2.5 px-3 text-right">Koszt Leada (CPL)</th>
                  <th className="py-2.5 px-3 text-right">Pozycja Maps</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {DEMO_DAILY_METRICS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-medium text-zinc-700">{row.date}</td>
                    <td className="py-2.5 px-3 text-center font-bold text-zinc-900">{row.leadsCount}</td>
                    <td className="py-2.5 px-3 text-center text-zinc-600">{row.phoneClicks}</td>
                    <td className="py-2.5 px-3 text-center text-zinc-600">{row.formLeads}</td>
                    <td className="py-2.5 px-3 text-right text-zinc-700">{row.googleAdsSpend} PLN</td>
                    <td className="py-2.5 px-3 text-right text-zinc-700">{row.metaAdsSpend} PLN</td>
                    <td className="py-2.5 px-3 text-right font-semibold text-indigo-600">{row.avgCpl.toFixed(2)} PLN</td>
                    <td className="py-2.5 px-3 text-right font-semibold text-emerald-700">#{row.topGooglePosition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contact Support Footer Box */}
        <div className="bg-zinc-900 text-white rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h3 className="text-base font-bold">Wsparcie i Dedykowana Opieka Foundly</h3>
            <p className="text-xs text-zinc-400">Potrzebujesz zmian w treściach na stronie lub zmiany budżetu kampanii? Napisz do opiekuna.</p>
          </div>
          <a
            href="mailto:kontakt@foundly.pl"
            className="px-5 py-2.5 bg-white text-zinc-900 hover:bg-zinc-100 font-semibold text-xs rounded-lg transition-colors uppercase tracking-wider shrink-0"
          >
            Kontakt z Opiekunem
          </a>
        </div>

      </div>
    </div>
  );
}
