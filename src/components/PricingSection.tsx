import React, { useState } from 'react';
import { CheckCircle2, Zap, Sparkles, BarChart3, Clock, Unlock, Info } from 'lucide-react';

export default function PricingSection() {
  const [mode, setMode] = useState<'subscription' | 'oneoff'>('subscription');

  return (
    <section id="cennik" className="py-28 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-indigo-600/10 blur-[180px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Elastyczne Pakiety & Przejrzyste Zasady</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter text-white leading-none mb-6">
            Zyskaj stronę i klientów. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Bez dużych kosztów na start.
            </span>
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            Wybierz zoptymalizowany model abonamentowy ze stroną za 0 zł z góry lub wdrożenie jednorazowe. 100% uczciwych zasad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col gap-3 hover:border-indigo-500/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-black">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black uppercase italic text-white tracking-tight">0 PLN na start</h3>
            <p className="text-xs text-white/50 leading-relaxed font-medium">
              Nie zamrażasz tysięcy złotych w gotówce. Projektujemy i wdrażamy stronę za 0 zł w ramach abonamentu.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col gap-3 hover:border-indigo-500/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-black">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black uppercase italic text-white tracking-tight">Pełen Pakiet od 1. Dnia</h3>
            <p className="text-xs text-white/50 leading-relaxed font-medium">
              Od razu otrzymujesz stronę, hosting, domenkę, pozycjonowanie w Google oraz konfigurację płatnych kampanii.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col gap-3 hover:border-indigo-500/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-black">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black uppercase italic text-white tracking-tight">Stałe Raportowanie</h3>
            <p className="text-xs text-white/50 leading-relaxed font-medium">
              Co miesiąc dostajesz przejrzysty raport pozycji w Google, liczby telefonów i zapytań od klientów.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col gap-3 hover:border-indigo-500/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-black">
              <Unlock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black uppercase italic text-white tracking-tight">Bez Długich Umów</h3>
            <p className="text-xs text-white/50 leading-relaxed font-medium">
              Szanujemy Twoją wolność. Elastyczna umowa z 30-dniowym okresem wypowiedzenia bez lojalnościówek.
            </p>
          </div>
        </div>

        {/* Transparent Note on Ad Budget */}
        <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 max-w-4xl mx-auto mb-16 flex items-start gap-4">
          <Info className="w-6 h-6 text-indigo-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-indigo-200/90 leading-relaxed">
            <strong className="text-white uppercase font-black">100% Uczciwe Zasady:</strong> Abonament Foundly obejmuje pełną obsługę agencyjną, projekt i hosting strony za 0 zł, SEO oraz tworzenie i optymalizację kampanii Ads. <span className="underline decoration-indigo-400">Budżet na kliknięcia (Google/Meta Ads) jest elastyczny i płatny bezpośrednio do Google/Meta</span> (ustalamy go z Tobą indywidualnie, np. od 300 zł/mc). Zero ukrytych prowizji!
          </div>
        </div>

        <div className="flex justify-center mb-16">
          <div className="p-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl inline-flex gap-2">
            <button
              onClick={() => setMode('subscription')}
              className={`px-8 py-4 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                mode === 'subscription'
                  ? 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/30 scale-105'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-indigo-300" />
              <span>Model Abonamentowy (Strona 0 PLN)</span>
            </button>

            <button
              onClick={() => setMode('oneoff')}
              className={`px-8 py-4 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 ${
                mode === 'oneoff'
                  ? 'bg-white text-black shadow-xl'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Wdrożenie Jednorazowe
            </button>
          </div>
        </div>

        {mode === 'subscription' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group">
              <div>
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                  Strona 0 zł + SEO
                </span>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mt-4 mb-2">
                  Abonament Start
                </h3>
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-6">
                  Strona one-page za 0 zł + lokalne SEO w Google.
                </p>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 mb-6">
                  <div className="text-[11px] font-bold text-indigo-300 uppercase">Wkład własny na start:</div>
                  <div className="text-2xl font-black text-white italic">0 PLN <span className="text-xs font-normal text-white/40">(zamiast 999 zł)</span></div>
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl sm:text-5xl font-black text-white italic tracking-tighter">99</span>
                  <span className="text-white/40 text-xs font-black uppercase tracking-widest">PLN / msc</span>
                </div>
                <div className="text-[10px] text-indigo-300 font-bold mb-8 uppercase tracking-wider italic">
                  Strona One-Page za 0 zł + SEO Lokalne
                </div>

                <ul className="space-y-4 mb-10">
                  {[
                    "Strona WWW za 0 PLN na start (Wersja Startowa w 48h)",
                    "Hosting, szybki serwer i certyfikat SSL w cenie",
                    "Pozycjonowanie w Google Maps & Wizytówka",
                    "Stałe miesięczne raporty efektów i pozycji",
                    "Bez długoterminowych umów (30 dni wypowiedzenia)",
                    "Darmowe poprawki i opieka techniczna"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#kalkulator" className="w-full">
                <button className="w-full h-14 rounded-2xl bg-white/5 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 border border-white/10 transition-colors">
                  Wybierz Abonament Start
                </button>
              </a>
            </div>

            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-b from-indigo-950/60 via-indigo-900/30 to-black border-2 border-indigo-500 shadow-[0_0_60px_rgba(79,70,229,0.25)] flex flex-col justify-between relative group scale-105">
              <div className="absolute -top-4 right-8 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                Najczęściej Wybierany
              </div>
              <div>
                <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-[10px] font-black uppercase tracking-widest text-indigo-300">
                  Strona 0 zł + SEO + Ads
                </span>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mt-4 mb-2">
                  Abonament Business Pro
                </h3>
                <p className="text-xs text-indigo-200/60 font-medium uppercase tracking-wider mb-6">
                  Wielopodstronowa strona za 0 zł + potok klientów z reklam.
                </p>

                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 mb-6">
                  <div className="text-[11px] font-bold text-indigo-300 uppercase">Wkład własny na start:</div>
                  <div className="text-2xl font-black text-white italic">0 PLN <span className="text-xs font-normal text-white/40">(zamiast 2 999 zł)</span></div>
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl sm:text-5xl font-black text-white italic tracking-tighter">690</span>
                  <span className="text-white/40 text-xs font-black uppercase tracking-widest">PLN / msc</span>
                </div>
                <div className="text-[10px] text-indigo-300/80 font-bold mb-8 uppercase tracking-wider italic">
                  + własny budżet reklamowy do Google/Meta
                </div>

                <ul className="space-y-4 mb-10">
                  {[
                    "Pełna witryna firmowa (do 5 podstron) za 0 PLN z góry",
                    "Prowadzenie Kampanii Google Ads + SEO Lokalne",
                    "Natychmiastowe telefony i zapytania od klientów",
                    "Miesięczny raport konwersji i zwrotu z inwestycji",
                    "Darmowe modyfikacje treści w cenie",
                    "Zero zobowiązań – umowa na czas nieokreślony"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight text-white">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#kalkulator" className="w-full">
                <button className="w-full h-14 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors shadow-xl">
                  Zamów Abonament Business Pro
                </button>
              </a>
            </div>

            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group">
              <div>
                <span className="px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-[10px] font-black uppercase tracking-widest text-purple-300">
                  Kompletna Dominacja
                </span>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mt-4 mb-2">
                  Abonament Dominator
                </h3>
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-6">
                  Dedykowana strona/sklep za 0 zł + Full Growth (SEO+Ads).
                </p>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 mb-6">
                  <div className="text-[11px] font-bold text-purple-300 uppercase">Wkład własny na start:</div>
                  <div className="text-2xl font-black text-white italic">0 PLN <span className="text-xs font-normal text-white/40">(zamiast 4 999 zł)</span></div>
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl sm:text-5xl font-black text-white italic tracking-tighter">990</span>
                  <span className="text-white/40 text-xs font-black uppercase tracking-widest">PLN / msc</span>
                </div>
                <div className="text-[10px] text-white/40 font-medium mb-8 uppercase tracking-wider italic">
                  + własny budżet reklamowy do Google/Meta
                </div>

                <ul className="space-y-4 mb-10">
                  {[
                    "Dedykowana strona lub sklep e-commerce za 0 PLN",
                    "Full Growth: SEO + Google Ads + Reklamy Meta Ads",
                    "Zaawansowana analityka i dedykowany opiekun",
                    "Priorytetowe raporty i cotygodniowe statystyki",
                    "Elastyczna umowa bez lojalnościówki"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#kalkulator" className="w-full">
                <button className="w-full h-14 rounded-2xl bg-white/5 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 border border-white/10 transition-colors">
                  Wybierz Abonament Dominator
                </button>
              </a>
            </div>
          </div>
        )}

        {mode === 'oneoff' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between group">
              <div>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60">
                  Wdrożenie Jednorazowe
                </span>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mt-4 mb-2">
                  Starter One-Page
                </h3>
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-6">
                  Jednorazowa opłata za stworzenie strony wizytówki.
                </p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-3xl font-black text-white italic tracking-tighter">od 999</span>
                  <span className="text-white/40 text-xs font-black uppercase tracking-widest">PLN</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {[
                    "Strona One-Page (do 6 sekcji)",
                    "Wersja Startowa (MVP) w 48h",
                    "100% RWD",
                    "Formularz kontaktowy",
                    "Certyfikat SSL"
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
                  Zamów Jednorazowo
                </button>
              </a>
            </div>

            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group">
              <div>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                  Wdrożenie Jednorazowe
                </span>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mt-4 mb-2">
                  Business Multi-Page
                </h3>
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-6">
                  Strona wielopodstronowa dla firmy.
                </p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-3xl font-black text-white italic tracking-tighter">od 2 999</span>
                  <span className="text-white/40 text-xs font-black uppercase tracking-widest">PLN</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {[
                    "Strona do 5 podstron",
                    "Osobna oferta i o nas",
                    "Optymalizacja SEO On-Page",
                    "Podpięcie Analityki GA4",
                    "2 tury poprawek"
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
                  Zamów Jednorazowo
                </button>
              </a>
            </div>

            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between group">
              <div>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60">
                  Sklep / Custom
                </span>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mt-4 mb-2">
                  E-Commerce Premium
                </h3>
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-6">
                  Sklep internetowy z płatnościami online.
                </p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-3xl font-black text-white italic tracking-tighter">od 4 999</span>
                  <span className="text-white/40 text-xs font-black uppercase tracking-widest">PLN</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {[
                    "Sklep i płatności BLIK/Karty",
                    "Integracja InPost i kurierów",
                    "Panel zarządczy",
                    "Dedykowany opiekun"
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
                  Zapytaj o Sklep
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
