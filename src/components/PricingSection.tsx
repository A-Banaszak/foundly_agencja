import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Zap, ArrowRight, Sparkles, Clock, RefreshCw } from 'lucide-react';

export default function PricingSection() {
  const [mode, setMode] = useState<'subscription' | 'oneoff'>('subscription');

  return (
    <section id="cennik" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[11px] font-bold uppercase tracking-widest text-indigo-400 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Elastyczne Pakiety & Przejrzyste Zasady</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter text-white leading-none mb-6">
            Zyskaj stronę i klientów. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Bez jednorazowej inwestycji w serwis.
            </span>
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            Zamiast płacić kilka tysięcy za projekt strony - wchodzisz w abonament od pierwszego miesiąca i od razu masz gotową witrynę, hosting, SEO i kampanie. 100% uczciwych zasad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col gap-3 hover:border-indigo-500/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-black">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black uppercase italic text-white tracking-tight">Strona w abonamencie</h3>
            <p className="text-xs text-white/50 leading-relaxed font-medium">
              Nie zamrażasz tysięcy złotych z góry. Płacisz od 1. miesiąca abonamentu - strona, hosting, domena i opieka techniczna w cenie.
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
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black uppercase italic text-white tracking-tight">Bez Długich Umów</h3>
            <p className="text-xs text-white/50 leading-relaxed font-medium">
              Standardowa umowa na czas nieokreślony z 30-dniowym okresem wypowiedzenia. Pracujemy tak, abyś chciał zostać.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col gap-3 hover:border-indigo-500/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black uppercase italic text-white tracking-tight">Raporty Co Miesiąc</h3>
            <p className="text-xs text-white/50 leading-relaxed font-medium">
              Otrzymujesz przejrzyste podsumowanie pozycji w Google, liczby odwiedzin i wygenerowanych zapytaniach od klientów.
            </p>
          </div>
        </div>

        {/* Toggle Mode */}
        <div className="flex justify-center mb-12">
          <div className="p-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 backdrop-blur-xl">
            <button
              onClick={() => setMode('subscription')}
              className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                mode === 'subscription'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              Model Abonamentowy (Strona + Marketing)
            </button>
            <button
              onClick={() => setMode('oneoff')}
              className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                mode === 'oneoff'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              Wdrożenie Jednorazowe
            </button>
          </div>
        </div>

        {mode === 'subscription' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pakiet 1: Start */}
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group">
              <div>
                <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                  Strona w abonamencie + SEO
                </span>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mt-4 mb-2">
                  Abonament Start
                </h3>
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-6">
                  Strona statyczna One-Page + lokalne SEO w Google.
                </p>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 mb-6">
                  <div className="text-[11px] font-bold text-indigo-300 uppercase">Płatność wstępna z góry:</div>
                  <div className="text-2xl font-black text-white italic">0 zł <span className="text-xs font-normal text-white/40">(płatny od 1. msc)</span></div>
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl sm:text-5xl font-black text-white italic tracking-tighter">99</span>
                  <span className="text-white/40 text-xs font-black uppercase tracking-widest">PLN / msc</span>
                </div>
                <div className="text-[10px] text-indigo-300 font-bold mb-8 uppercase tracking-wider italic">
                  Strona One-Page + SEO Lokalne
                </div>

                <ul className="space-y-4 mb-10">
                  {[
                    "Strona WWW (Wersja Startowa w 48h)",
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
              <a href="#zamow-formularz" className="w-full">
                <button className="w-full h-14 rounded-2xl bg-white/5 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 border border-white/10 transition-colors">
                  Wybierz Abonament Start
                </button>
              </a>
            </div>

            {/* Pakiet 2: Business Pro */}
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-b from-indigo-950/60 via-indigo-900/30 to-black border-2 border-indigo-500 shadow-[0_0_60px_rgba(79,70,229,0.25)] flex flex-col justify-between relative group scale-105">
              <div className="absolute -top-4 right-8 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                Najczęściej Wybierany
              </div>
              <div>
                <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-[10px] font-black uppercase tracking-widest text-indigo-300">
                  Strona + SEO + Google Ads
                </span>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mt-4 mb-2">
                  Abonament Business Pro
                </h3>
                <p className="text-xs text-indigo-200/60 font-medium uppercase tracking-wider mb-6">
                  Wielopodstronowy WordPress + potok klientów z reklam.
                </p>

                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 mb-6">
                  <div className="text-[11px] font-bold text-indigo-300 uppercase">Płatność wstępna z góry:</div>
                  <div className="text-2xl font-black text-white italic">0 zł <span className="text-xs font-normal text-white/40">(płatny od 1. msc)</span></div>
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
                    "Pełna witryna firmowa WordPress (do 5 podstron)",
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
              <a href="#zamow-formularz" className="w-full">
                <button className="w-full h-14 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors shadow-xl">
                  Zamów Abonament Business Pro
                </button>
              </a>
            </div>

            {/* Pakiet 3: Dominator */}
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group">
              <div>
                <span className="px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-[10px] font-black uppercase tracking-widest text-purple-300">
                  Kompletna Dominacja
                </span>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mt-4 mb-2">
                  Abonament Dominator
                </h3>
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-6">
                  Dedykowany e-commerce / WordPress + Full Growth (SEO+Ads).
                </p>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 mb-6">
                  <div className="text-[11px] font-bold text-purple-300 uppercase">Płatność wstępna z góry:</div>
                  <div className="text-2xl font-black text-white italic">0 zł <span className="text-xs font-normal text-white/40">(płatny od 1. msc)</span></div>
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
                    "Dedykowana strona lub sklep e-commerce WordPress",
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
              <a href="#zamow-formularz" className="w-full">
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
                  Strona Statyczna HTML/Astro
                </h3>
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-6">
                  Błyskawiczna strona onepager na własność.
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl sm:text-5xl font-black text-white italic tracking-tighter">999</span>
                  <span className="text-white/40 text-xs font-black uppercase tracking-widest">PLN netto</span>
                </div>

                <ul className="space-y-4 mb-10">
                  {[
                    "Unikalny projekt One-Page z treściami",
                    "Najwyższy wynik w Google PageSpeed (99-100/100)",
                    "Wersja gotowa do podłączenia pod reklamy",
                    "Wskazówki SEO i podpięcie domeny",
                    "Pełne przekazanie praw autorskich i kodu"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="/kontakt" className="w-full">
                <button className="w-full h-14 rounded-2xl bg-white/5 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 border border-white/10 transition-colors">
                  Zamów Wdrożenie Jednorazowe
                </button>
              </a>
            </div>

            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between group">
              <div>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60">
                  Wdrożenie Jednorazowe
                </span>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mt-4 mb-2">
                  Strona WordPress CMS
                </h3>
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-6">
                  Wielopodstronowy serwis z panelem do edycji.
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl sm:text-5xl font-black text-white italic tracking-tighter">2 499</span>
                  <span className="text-white/40 text-xs font-black uppercase tracking-widest">PLN netto</span>
                </div>

                <ul className="space-y-4 mb-10">
                  {[
                    "Strona firmowa do 5 podstron na WordPress",
                    "Łatwa samodzielna edycja tekstów i zdjęć",
                    "Optymalizacja pod pozycjonowanie SEO",
                    "Szkolenie z obsługi panelu CMS",
                    "100% własności witryny"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="/kontakt" className="w-full">
                <button className="w-full h-14 rounded-2xl bg-white/5 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 border border-white/10 transition-colors">
                  Zamów WordPress Jednorazowo
                </button>
              </a>
            </div>

            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between group">
              <div>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60">
                  Wdrożenie Jednorazowe
                </span>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mt-4 mb-2">
                  Sklep E-Commerce WordPress
                </h3>
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-6">
                  Pełny sklep internetowy z płatnościami online.
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl sm:text-5xl font-black text-white italic tracking-tighter">4 499</span>
                  <span className="text-white/40 text-xs font-black uppercase tracking-widest">PLN netto</span>
                </div>

                <ul className="space-y-4 mb-10">
                  {[
                    "Sklep WooCommerce z bramkami płatności (BLIK/Przelewy24)",
                    "Integracje z kurierami i magazynem",
                    "Wprowadzenie pierwszych produktów",
                    "Analityka e-commerce Google Analytics 4",
                    "100% własności serwisu"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="/kontakt" className="w-full">
                <button className="w-full h-14 rounded-2xl bg-white/5 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 border border-white/10 transition-colors">
                  Zamów Sklep Jednorazowo
                </button>
              </a>
            </div>
          </div>
        )}

        <div className="mt-16 p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-black border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-black uppercase italic text-white mb-2">
              Potrzebujesz indywidualnego podejścia?
            </h3>
            <p className="text-xs sm:text-sm text-white/60 font-medium">
              Skonfiguruj darmową wycenę w naszym kalkulatorze lub skonsultuj się z nami telefonicznie.
            </p>
          </div>
          <a href="/kontakt" className="shrink-0">
            <button className="px-8 h-14 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors shadow-2xl flex items-center gap-2">
              <span>Bezpłatna Konsultacja</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
