import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Zap, ArrowRight, Sparkles, Clock, RefreshCw, SlidersHorizontal } from 'lucide-react';

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
            <h3 className="text-lg font-black uppercase italic text-white tracking-tight">Start Kampanii w 48h</h3>
            <p className="text-xs text-white/50 leading-relaxed font-medium">
              W 48 godzin od przekazania materiałów dostarczamy Wersję Startową (MVP), by natychmiast pozyskiwać klientów.
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
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pakiet 1: Start */}
              <div className="p-6 sm:p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group">
                <div>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                    One-Page + SEO
                  </span>
                  <h3 className="text-xl font-black uppercase italic tracking-tighter text-white mt-4 mb-2">
                    Abonament Start
                  </h3>
                  <p className="text-[11px] text-white/40 font-medium uppercase tracking-wider mb-6">
                    Strona statyczna One-Page + lokalne SEO w Google.
                  </p>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 mb-6">
                    <div className="text-[10px] font-bold text-indigo-300 uppercase">Płatność z góry:</div>
                    <div className="text-xl font-black text-white italic">0 zł <span className="text-[10px] font-normal text-white/40">(od 1. msc)</span></div>
                  </div>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl sm:text-4xl font-black text-white italic tracking-tighter">99</span>
                    <span className="text-white/40 text-xs font-black uppercase tracking-widest">PLN / msc</span>
                  </div>
                  <div className="text-[10px] text-indigo-300 font-bold mb-6 uppercase tracking-wider italic">
                    One-Page + SEO Lokalne
                  </div>

                  <ul className="space-y-3 mb-8">
                    {[
                      "Strona WWW (Wersja Startowa w 48h)",
                      "Hosting, szybki serwer i SSL w cenie",
                      "Pozycjonowanie w Google Maps & Wizytówka",
                      "Miesięczne raporty pozycji",
                      "Bez długich umów (30 dni wypowiedzenia)"
                    ].map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-tight text-white/70">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="#zamow-formularz" className="w-full">
                  <button className="w-full h-12 rounded-2xl bg-white/5 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 border border-white/10 transition-colors">
                    Wybierz Start
                  </button>
                </a>
              </div>

              {/* Pakiet 2: Growth */}
              <div className="p-6 sm:p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group">
                <div>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-[10px] font-black uppercase tracking-widest text-indigo-300">
                    Multi-Page + SEO
                  </span>
                  <h3 className="text-xl font-black uppercase italic tracking-tighter text-white mt-4 mb-2">
                    Abonament Growth
                  </h3>
                  <p className="text-[11px] text-white/40 font-medium uppercase tracking-wider mb-6">
                    Wielopodstronowa strona (do 5 podstron) + SEO Lokalne.
                  </p>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 mb-6">
                    <div className="text-[10px] font-bold text-indigo-300 uppercase">Płatność z góry:</div>
                    <div className="text-xl font-black text-white italic">0 zł <span className="text-[10px] font-normal text-white/40">(od 1. msc)</span></div>
                  </div>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl sm:text-4xl font-black text-white italic tracking-tighter">390</span>
                    <span className="text-white/40 text-xs font-black uppercase tracking-widest">PLN / msc</span>
                  </div>
                  <div className="text-[10px] text-indigo-300 font-bold mb-6 uppercase tracking-wider italic">
                    Serwis firmowy do 5 podstron + SEO
                  </div>

                  <ul className="space-y-3 mb-8">
                    {[
                      "Strona firmowa do 5 podstron (Wersja 48h)",
                      "Pełne pozycjonowanie na frazy lokalne",
                      "Optymalizacja Wizytówki Google Maps",
                      "Darmowe wprowadzanie zmian treści",
                      "Hosting, serwer, domena i SSL w cenie"
                    ].map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-tight text-white/70">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="#zamow-formularz" className="w-full">
                  <button className="w-full h-12 rounded-2xl bg-white/5 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 border border-white/10 transition-colors">
                    Wybierz Growth
                  </button>
                </a>
              </div>

              {/* Pakiet 3: Business Pro */}
              <div className="p-6 sm:p-8 rounded-[2.5rem] bg-gradient-to-b from-indigo-950/60 via-indigo-900/30 to-black border-2 border-indigo-500 shadow-[0_0_60px_rgba(79,70,229,0.25)] flex flex-col justify-between relative group scale-105">
                <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[9px] font-black uppercase tracking-widest shadow-lg">
                  Najczęściej Wybierany
                </div>
                <div>
                  <span className="inline-block whitespace-nowrap px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-indigo-300">
                    SEO + GOOGLE ADS
                  </span>
                  <h3 className="text-xl font-black uppercase italic tracking-tighter text-white mt-4 mb-2">
                    Business Pro
                  </h3>
                  <p className="text-[11px] text-indigo-200/60 font-medium uppercase tracking-wider mb-6">
                    Wielopodstronowy WordPress + reklama w Google Ads.
                  </p>

                  <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 mb-6">
                    <div className="text-[10px] font-bold text-indigo-300 uppercase">Płatność z góry:</div>
                    <div className="text-xl font-black text-white italic">0 zł <span className="text-[10px] font-normal text-white/40">(od 1. msc)</span></div>
                  </div>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl sm:text-4xl font-black text-white italic tracking-tighter">690</span>
                    <span className="text-white/40 text-xs font-black uppercase tracking-widest">PLN / msc</span>
                  </div>
                  <div className="text-[10px] text-indigo-300/80 font-bold mb-6 uppercase tracking-wider italic">
                    + własny budżet na reklamy Ads
                  </div>

                  <ul className="space-y-3 mb-8">
                    {[
                      "Witryna firmowa WordPress (do 5 podstron)",
                      "Prowadzenie i optymalizacja Google Ads",
                      "Pozycjonowanie fraz w Twoim mieście",
                      "Raporty konwersji i zapytań co miesiąc",
                      "Darmowe modyfikacje treści w cenie"
                    ].map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-tight text-white">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="#zamow-formularz" className="w-full">
                  <button className="w-full h-12 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors shadow-xl">
                    Zamów Business Pro
                  </button>
                </a>
              </div>

              {/* Pakiet 4: E-Commerce Max */}
              <div className="p-6 sm:p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group">
                <div>
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-[10px] font-black uppercase tracking-widest text-purple-300">
                    Sklep + Full Growth
                  </span>
                  <h3 className="text-xl font-black uppercase italic tracking-tighter text-white mt-4 mb-2">
                    E-Commerce Max
                  </h3>
                  <p className="text-[11px] text-white/40 font-medium uppercase tracking-wider mb-6">
                    Sklep WooCommerce + SEO + Google Ads & Meta Ads.
                  </p>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 mb-6">
                    <div className="text-[10px] font-bold text-purple-300 uppercase">Płatność z góry:</div>
                    <div className="text-xl font-black text-white italic">0 zł <span className="text-[10px] font-normal text-white/40">(od 1. msc)</span></div>
                  </div>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl sm:text-4xl font-black text-white italic tracking-tighter">990</span>
                    <span className="text-white/40 text-xs font-black uppercase tracking-widest">PLN / msc</span>
                  </div>
                  <div className="text-[10px] text-white/40 font-medium mb-6 uppercase tracking-wider italic">
                    + własny budżet na reklamy Ads
                  </div>

                  <ul className="space-y-3 mb-8">
                    {[
                      "Sklep e-commerce WooCommerce w cenie abonamentu",
                      "Full Growth: SEO + Google Ads + Meta Ads (FB/IG)",
                      "Dedykowany opiekun i zaawansowana analityka",
                      "Priorytetowa obsługa i wsparcie techniczne",
                      "Umowa bez długich okresów lojalnościowych"
                    ].map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-tight text-white/70">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="#zamow-formularz" className="w-full">
                  <button className="w-full h-12 rounded-2xl bg-white/5 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 border border-white/10 transition-colors">
                    Wybierz E-Commerce Max
                  </button>
                </a>
              </div>
            </div>

            {/* BOKS: ABONAMENT CUSTOM / NA WYMIAR */}
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-r from-indigo-950/50 via-purple-950/30 to-black border-2 border-indigo-500/40 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-widest">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Dopasowanie Indywidualne</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase italic text-white tracking-tight">
                  Potrzebujesz abonamentu skrojonego na wymiar?
                </h3>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-medium">
                  Szukasz niestandardowej liczby podstron, integracji z zewnętrznym CRM/ERP, rozbudowanego sklepu lub indywidualnie dobranego budżetu na kampanie reklamowe? Skonfiguruj z nami abonament dostosowany idealnie do Twoich potrzeb i celów.
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
                <a href="/kontakt" className="w-full">
                  <button className="w-full px-8 h-14 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors shadow-xl flex items-center justify-center gap-2">
                    <span>Skonsultuj Abonament Custom</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
                <a href="tel:+48786429360" className="w-full text-center">
                  <span className="text-xs font-bold text-indigo-300 hover:underline">
                    lub zadzwoń: +48 786 429 360
                  </span>
                </a>
              </div>
            </div>
          </div>
        )}

        {mode === 'oneoff' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between group">
              <div>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60">
                  Strona Statyczna HTML/Astro
                </span>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mt-4 mb-2">
                  Starter One-Page
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
              Chcesz bezpłatnie przeanalizować swój projekt?
            </h3>
            <p className="text-xs sm:text-sm text-white/60 font-medium">
              Skonfiguruj darmową wycenę w naszym kalkulatorze online lub skonsultuj się bezpośrednio z opiekunem.
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
