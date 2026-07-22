import React, { useState } from 'react';
import { CheckCircle2, Zap, Sparkles } from 'lucide-react';

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState<'sites' | 'marketing' | 'subscription'>('sites');

  return (
    <section id="cennik" className="py-28 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/10 blur-[160px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              <span>02. Przejrzysty Cennik</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter text-white leading-none">
              Proste Zasady. <br />
              <span className="text-white/40">Zero ukrytych kosztów.</span>
            </h2>
          </div>

          <div className="inline-flex p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
            <button
              onClick={() => setActiveTab('sites')}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'sites'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Strony WWW
            </button>
            <button
              onClick={() => setActiveTab('marketing')}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'marketing'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              SEO & Ads
            </button>
            <button
              onClick={() => setActiveTab('subscription')}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                activeTab === 'subscription'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'text-indigo-400 hover:text-indigo-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Strona za 0 zł
            </button>
          </div>
        </div>

        {activeTab === 'sites' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between group">
              <div>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60">
                  Pakiet 01
                </span>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mt-4 mb-2">
                  Starter One-Page
                </h3>
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-6">
                  Idealny szybki start dla małych firm i usług.
                </p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl sm:text-5xl font-black text-white italic tracking-tighter">890</span>
                  <span className="text-white/40 text-xs font-black uppercase tracking-widest">PLN netto</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {[
                    "Strona One-Page (do 6 sekcji)",
                    "Pierwszy projekt gotowy w 48h",
                    "100% Responsywność (RWD)",
                    "Formularz kontaktowy + Podpięcie mapy",
                    "Podstawowa optymalizacja SEO On-Page",
                    "Certyfikat SSL + Podpięcie domeny"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight text-white/60">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#kalkulator" className="w-full">
                <button className="w-full h-14 rounded-2xl bg-white/5 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 border border-white/10 transition-colors">
                  Zamów Starter
                </button>
              </a>
            </div>

            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-b from-indigo-950/40 via-indigo-900/20 to-black border border-indigo-500/50 shadow-[0_0_50px_rgba(79,70,229,0.15)] flex flex-col justify-between relative group scale-105">
              <div className="absolute -top-4 right-8 px-4 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                Najczęściej Wybierany
              </div>
              <div>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                  Pakiet 02
                </span>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mt-4 mb-2">
                  Business Multi-Page
                </h3>
                <p className="text-xs text-indigo-300/60 font-medium uppercase tracking-wider mb-6">
                  Kompletna strona z dedykowanymi podstronami oferty.
                </p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl sm:text-5xl font-black text-white italic tracking-tighter">1490</span>
                  <span className="text-white/40 text-xs font-black uppercase tracking-widest">PLN netto</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {[
                    "Strona Wielopodstronowa (do 5 podstron)",
                    "Dedykowana podstrona Oferty i O Nas",
                    "Sekcja Realizacji / FAQ / Galeria",
                    "Zaawansowana optymalizacja SEO On-Page",
                    "Podpięcie Analityki (Google Analytics 4)",
                    "2 tury korekt w cenie + opieka 30 dni"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight text-white/90">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#kalkulator" className="w-full">
                <button className="w-full h-14 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10">
                  Zamów Business
                </button>
              </a>
            </div>

            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between group">
              <div>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60">
                  Pakiet 03
                </span>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mt-4 mb-2">
                  E-Commerce / Custom
                </h3>
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-6">
                  Sklep internetowy lub dedykowany portal z integracjami.
                </p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-3xl font-black text-white italic tracking-tighter">od 2990</span>
                  <span className="text-white/40 text-xs font-black uppercase tracking-widest">PLN netto</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {[
                    "Sklep internetowy z płatnościami online (BLIK/Karty)",
                    "Integracja kurierów (InPost, DPD, Paczkomaty)",
                    "Panel zarządzania produktami i zamówieniami",
                    "Dedykowane funkcjonalności i rezerwacje online",
                    "Zaawansowane moduły marketingowe i porzucone koszyki",
                    "Indywidualne wsparcie opiekuna"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight text-white/60">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#kalkulator" className="w-full">
                <button className="w-full h-14 rounded-2xl bg-white/5 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 border border-white/10 transition-colors">
                  Wycena Indywidualna
                </button>
              </a>
            </div>
          </div>
        )}

        {activeTab === 'marketing' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between">
              <div>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                  SEO Lokalne
                </span>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mt-4 mb-2">
                  Pozycjonowanie w Google
                </h3>
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-6">
                  Wizytówka Google Moja Firma + Frazy w Twoim mieście.
                </p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl sm:text-5xl font-black text-white italic tracking-tighter">490</span>
                  <span className="text-white/40 text-xs font-black uppercase tracking-widest">PLN / msc</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {[
                    "Optymalizacja wizytówki Google Maps",
                    "Pozycjonowanie na frazy lokalne (np. stolarz Kraków)",
                    "Analiza konkurencji i audyt treści",
                    "Miesięczny raport pozycji i ruchu",
                    "Zero długoterminowych umów (30 dni wypowiedzenia)"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight text-white/60">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#kalkulator" className="w-full">
                <button className="w-full h-14 rounded-2xl bg-white/5 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 border border-white/10 transition-colors">
                  Wybierz SEO
                </button>
              </a>
            </div>

            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-b from-indigo-950/40 via-indigo-900/20 to-black border border-indigo-500/50 shadow-[0_0_50px_rgba(79,70,229,0.15)] flex flex-col justify-between scale-105">
              <div>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                  Kampanie Ads
                </span>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mt-4 mb-2">
                  Google & Meta Ads
                </h3>
                <p className="text-xs text-indigo-300/60 font-medium uppercase tracking-wider mb-6">
                  Natychmiastowy potok zapytań i połączeń.
                </p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl sm:text-5xl font-black text-white italic tracking-tighter">690</span>
                  <span className="text-white/40 text-xs font-black uppercase tracking-widest">PLN / msc + budżet</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {[
                    "Prowadzenie płatnych reklam w Google i na Facebooku",
                    "Konfiguracja celów: Telefoniczne zamówienia & Formularze",
                    "Bieżąca optymalizacja stawek i wykluczeń",
                    "Projekt banerów i tekstów reklamowych",
                    "Pełna analityka konwersji i zwrotu z inwestycji (ROAS)"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight text-white/90">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#kalkulator" className="w-full">
                <button className="w-full h-14 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors">
                  Uruchom Kampanie Ads
                </button>
              </a>
            </div>

            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between">
              <div>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-[10px] font-black uppercase tracking-widest text-purple-400">
                  Kompletny Wzrost
                </span>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mt-4 mb-2">
                  Full Growth (SEO + Ads)
                </h3>
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-6">
                  Pełna dominacja w Twojej branży i regionie.
                </p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl sm:text-5xl font-black text-white italic tracking-tighter">990</span>
                  <span className="text-white/40 text-xs font-black uppercase tracking-widest">PLN / msc</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {[
                    "Połączenie SEO Lokalnego i Kampanii Google Ads",
                    "Ciągłe testowanie A/B landing page'a pod konwersję",
                    "Priorytetowe wsparcie i opieka techniczna strony",
                    "Dedykowany konsultant marketingowy"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight text-white/60">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#kalkulator" className="w-full">
                <button className="w-full h-14 rounded-2xl bg-white/5 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 border border-white/10 transition-colors">
                  Wybierz Full Growth
                </button>
              </a>
            </div>
          </div>
        )}

        {activeTab === 'subscription' && (
          <div className="max-w-4xl mx-auto p-10 sm:p-14 rounded-[3rem] bg-gradient-to-br from-indigo-950/60 via-purple-950/40 to-black border-2 border-indigo-500/60 shadow-[0_0_80px_rgba(99,102,241,0.25)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-indigo-400/20 font-black italic text-9xl pointer-events-none select-none">
              0 PLN
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-xs font-bold uppercase tracking-widest text-indigo-300 mb-6">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Model Abonamentowy All-In-One</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tighter text-white mb-6">
              Strona WWW za 0 PLN na start <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300">
                + Marketing w 1 stałej racie!
              </span>
            </h3>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
              Nie chcesz płacić kilku tysięcy złotych z góry za stronę? Oferujemy unikalny model: **projektujemy i wdrażamy pełną stronę firmową za 0 zł**, a Ty opłacasz jedynie stałą miesięczną opłatę za jej utrzymanie oraz stałe pozyskiwanie klientów (SEO + Reklamy).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl font-black text-white italic mb-1">0 PLN z góry</div>
                <div className="text-xs text-white/50 font-medium">Brak ryzyka. Projektujesz stronę bez angażowania kapitału początkowego.</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl font-black text-indigo-400 italic mb-1">od 390 PLN / msc</div>
                <div className="text-xs text-white/50 font-medium">W cenie: Strona + Hosting + Domena + Opieka + SEO/Google Ads.</div>
              </div>
            </div>

            <a href="#kalkulator">
              <button className="h-16 px-10 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors shadow-2xl flex items-center gap-3">
                <span>Zapytaj o abonament z 0 PLN na start</span>
                <Zap className="w-4 h-4 text-indigo-600 fill-indigo-600" />
              </button>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
