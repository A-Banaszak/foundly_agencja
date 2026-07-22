import React, { useState } from 'react';
import { Search, CheckCircle2, Send, MapPin } from 'lucide-react';

export default function SeoAuditForm() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    website: '',
    city: '',
    keywords: '',
    name: '',
    contact: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-10 rounded-[2.5rem] bg-gradient-to-b from-indigo-950/40 to-black border border-indigo-500/50 text-center max-w-xl mx-auto shadow-2xl">
        <div className="w-14 h-14 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-black uppercase italic text-white mb-3">Audyt SEO w trakcie przygotowywania!</h3>
        <p className="text-xs text-white/60 mb-6 leading-relaxed">
          Przeanalizujemy pozycje Twojej witryny oraz konkurencji w Google Maps. Raport prześlemy w ciągu 24h.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2.5 rounded-full bg-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-colors"
        >
          Zamów kolejny audyt
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 sm:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-bold uppercase tracking-widest text-indigo-400 mb-3">
          <Search className="w-3.5 h-3.5" />
          <span>Dedykowany Formularz SEO & Google Maps</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-black uppercase italic text-white tracking-tight">
          Zamów darmowy audyt pozycji w Google
        </h3>
        <p className="text-xs sm:text-sm text-white/50 font-medium mt-1">
          Podaj adres strony oraz obszar działania. Sprawdzimy na jakich pozycjach znajduje się Twoja firma.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
              Adres obecnej strony WWW *
            </label>
            <input
              type="text"
              required
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="np. mojanazwafirmy.pl"
              className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
              Miasto / Główny obszar działania *
            </label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="np. Warszawa, Poznań lub cała Polska"
              className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
            Główne usługi lub frazy do sprawdzenia (opcjonalnie):
          </label>
          <input
            type="text"
            value={formData.keywords}
            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
            placeholder="np. stolarz meble na wymiar, firma remontowa, psycholog"
            className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
              Imię i Nazwisko / Nazwa Firmy *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="np. Jan Kowalski"
              className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
              Telefon lub E-mail do odbioru raportu *
            </label>
            <input
              type="text"
              required
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              placeholder="np. 600 111 222 lub biuro@firma.pl"
              className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-xs uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
        >
          <span>Zamów Darmowy Audyt SEO i Raport Pozycji</span>
          <Search className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
