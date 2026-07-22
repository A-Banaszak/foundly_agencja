import React, { useState } from 'react';
import { DEMO_CLIENT_ACCOUNT, DEMO_DAILY_METRICS } from '../../lib/client-portal-api';
import type { ClientAccount } from '../../lib/client-portal-api';

export default function ClientDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>('demo@foundly.pl');
  const [passwordInput, setPasswordInput] = useState<string>('haslo123');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  
  const [activeAccount, setActiveAccount] = useState<ClientAccount>(DEMO_CLIENT_ACCOUNT);
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

  // Aggregated Calculations (Zero Personal Data)
  const totalImpressions = DEMO_DAILY_METRICS.reduce((acc, m) => acc + m.impressions, 0);
  const totalClicks = DEMO_DAILY_METRICS.reduce((acc, m) => acc + m.clicks, 0);
  const totalPhoneClicks = DEMO_DAILY_METRICS.reduce((acc, m) => acc + m.phoneClicks, 0);
  const totalFormSubmissions = DEMO_DAILY_METRICS.reduce((acc, m) => acc + m.formSubmissions, 0);
  const totalActions = totalPhoneClicks + totalFormSubmissions;
  
  const totalGoogleSpend = DEMO_DAILY_METRICS.reduce((acc, m) => acc + m.googleAdsSpend, 0);
  const totalMetaSpend = DEMO_DAILY_METRICS.reduce((acc, m) => acc + m.metaAdsSpend, 0);
  const totalSpend = totalGoogleSpend + totalMetaSpend;

  const avgCpc = (totalSpend / totalClicks).toFixed(2);
  const avgCostPerAction = (totalSpend / totalActions).toFixed(2);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] bg-zinc-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm space-y-6">
          <div className="space-y-2 text-center">
            <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-700 text-[11px] font-bold rounded-md uppercase tracking-wider">
              Panel Wyników Kampanii Foundly
            </span>
            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
              Logowanie do serwisu
            </h1>
            <p className="text-xs text-zinc-500">
              Podgląd budżetu, wydatków i ruchu z kampanii Google Ads oraz Meta Ads.
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
              className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Zaloguj do Raportu
            </button>
          </form>

          <div className="pt-4 border-t border-zinc-100 text-center space-y-2">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
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
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Podgląd Kampanii API</span>
              <span className="text-xs text-zinc-400 font-mono">| Ostatnia synchronizacja: dziś, 01:00</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
              Statystyki Kampanii: {activeAccount.companyName}
            </h1>
            <p className="text-xs text-zinc-500">
              Konto: <strong className="text-zinc-800">{activeAccount.clientName}</strong> ({activeAccount.email}) &bull; Domena: <span className="font-mono text-zinc-700">{activeAccount.gscSiteUrl}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleManualSync}
              disabled={isSyncing}
              className="px-3.5 py-2 bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50 font-semibold text-xs rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              {isSyncing ? 'Synchronizowanie...' : 'Odśwież Statystyki'}
            </button>
            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              className="px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              Wyloguj
            </button>
          </div>
        </div>

        {/* Tabular KPI Summary Grid (Fully Anonymized Performance Metrics) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Wykorzystany Budżet Ads</span>
            <div className="text-2xl sm:text-3xl font-bold text-zinc-900">{totalSpend} PLN</div>
            <div className="text-xs text-zinc-500 font-medium">
              Google Ads: <strong className="text-zinc-800">{totalGoogleSpend} PLN</strong> &bull; Meta Ads: <strong className="text-zinc-800">{totalMetaSpend} PLN</strong>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Ruch na Stronie</span>
            <div className="text-2xl sm:text-3xl font-bold text-zinc-900">{totalClicks} kliknięć</div>
            <div className="text-xs text-zinc-500 font-medium">
              Wyświetlenia reklam: <strong className="text-zinc-800">{totalImpressions}</strong> &bull; Śr. CPC: <strong className="text-indigo-600">{avgCpc} PLN</strong>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Akcje na Stronie (Reakcje)</span>
            <div className="text-2xl sm:text-3xl font-bold text-indigo-600">{totalActions} reakcji</div>
            <div className="text-xs text-zinc-500 font-medium">
              Tel: <strong className="text-zinc-800">{totalPhoneClicks}</strong> &bull; Formularze: <strong className="text-zinc-800">{totalFormSubmissions}</strong> &bull; Śr. Koszt: <strong className="text-emerald-700">{avgCostPerAction} PLN</strong>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Pozycja w Google Maps</span>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-600">TOP 1-3</div>
            <div className="text-xs text-zinc-500 font-medium">Wizytówka Moja Firma & Frazy Lokalne</div>
          </div>
        </div>

        {/* Status Połączonych Systemów API */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
              Połączone Interfejsy API Raportów
            </h2>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              100% Automatyczny Odczyt
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">System Analityczny</th>
                  <th className="py-2.5 px-3">Identyfikator Konta / Zasobu</th>
                  <th className="py-2.5 px-3">Raportowane Metryki</th>
                  <th className="py-2.5 px-3 text-right">Status Połączenia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-zinc-900">Google Analytics 4</td>
                  <td className="py-2.5 px-3 font-mono text-zinc-500">ID: {activeAccount.ga4PropertyId}</td>
                  <td className="py-2.5 px-3">Unikalni użytkownicy, sesje, zdarzenia kliknięcia w telefon</td>
                  <td className="py-2.5 px-3 text-right"><span className="text-emerald-600 font-medium">● Aktywne API</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-zinc-900">Google Ads API</td>
                  <td className="py-2.5 px-3 font-mono text-zinc-500">ID: {activeAccount.googleAdsCustomerId}</td>
                  <td className="py-2.5 px-3">Wydatki, kliknięcia w wyszukiwarce, średni koszt kliknięcia (CPC)</td>
                  <td className="py-2.5 px-3 text-right"><span className="text-emerald-600 font-medium">● Aktywne API</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-zinc-900">Meta Marketing API</td>
                  <td className="py-2.5 px-3 font-mono text-zinc-500">ID: {activeAccount.metaAdAccountId}</td>
                  <td className="py-2.5 px-3">Wydatki na kampanie Facebook / Instagram, zasięg reklam</td>
                  <td className="py-2.5 px-3 text-right"><span className="text-emerald-600 font-medium">● Aktywne API</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-zinc-900">Google Search Console</td>
                  <td className="py-2.5 px-3 font-mono text-zinc-500">Domena: {activeAccount.gscSiteUrl.replace('https://', '')}</td>
                  <td className="py-2.5 px-3">Średnie pozycje w organicznych wynikach wyszukiwania Google</td>
                  <td className="py-2.5 px-3 text-right"><span className="text-emerald-600 font-medium">● Aktywne API</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabular Dzienny Zapis Wyników (Zanonimizowane Statystyki Dzień Po Dniu) */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="border-b border-zinc-100 pb-3">
            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
              Dzienny Zapis Wyników Kampanii (Ostatnie 7 Dni)
            </h2>
            <p className="text-xs text-zinc-500">Zagregowane dane ilościowe pobierane bezpośrednio przez skrypt API każdej nocy.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Data</th>
                  <th className="py-2.5 px-3 text-center">Wyświetlenia</th>
                  <th className="py-2.5 px-3 text-center">Kliknięcia</th>
                  <th className="py-2.5 px-3 text-center">Kliknięcia Tel</th>
                  <th className="py-2.5 px-3 text-center">Formularze</th>
                  <th className="py-2.5 px-3 text-right">Google Ads</th>
                  <th className="py-2.5 px-3 text-right">Meta Ads</th>
                  <th className="py-2.5 px-3 text-right">Śr. CPC</th>
                  <th className="py-2.5 px-3 text-right">Koszt Akcji</th>
                  <th className="py-2.5 px-3 text-right">Pozycja Maps</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {DEMO_DAILY_METRICS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-medium text-zinc-700">{row.date}</td>
                    <td className="py-2.5 px-3 text-center text-zinc-500 font-mono">{row.impressions}</td>
                    <td className="py-2.5 px-3 text-center font-bold text-zinc-900">{row.clicks}</td>
                    <td className="py-2.5 px-3 text-center text-zinc-700 font-semibold">{row.phoneClicks}</td>
                    <td className="py-2.5 px-3 text-center text-zinc-700 font-semibold">{row.formSubmissions}</td>
                    <td className="py-2.5 px-3 text-right text-zinc-700">{row.googleAdsSpend} PLN</td>
                    <td className="py-2.5 px-3 text-right text-zinc-700">{row.metaAdsSpend} PLN</td>
                    <td className="py-2.5 px-3 text-right font-mono text-zinc-600">{row.avgCpc.toFixed(2)} PLN</td>
                    <td className="py-2.5 px-3 text-right font-semibold text-indigo-600">{row.avgCostPerAction.toFixed(2)} PLN</td>
                    <td className="py-2.5 px-3 text-right font-semibold text-emerald-700">#{row.topGooglePosition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Informacja RODO / Ochrona Danych */}
        <div className="bg-zinc-100 border border-zinc-200 rounded-xl p-4 text-xs text-zinc-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <strong className="text-zinc-800 uppercase tracking-wider text-[11px] block mb-0.5">Ochrona Danych i RODO:</strong>
            Panel Foundly prezentuje wyłącznie zanonimizowane, zagregowane statystyki numeryczne (wydatki, ruch, liczbę akcji). System nie gromadzi ani nie przetwarza danych osobowych odwiedzających Twoją stronę.
          </div>
          <a
            href="mailto:kontakt@foundly.pl"
            className="px-3.5 py-1.5 bg-white border border-zinc-300 hover:bg-zinc-50 text-zinc-800 font-semibold rounded text-[11px] shrink-0 transition-colors"
          >
            Kontakt z Opiekunem
          </a>
        </div>

      </div>
    </div>
  );
}
