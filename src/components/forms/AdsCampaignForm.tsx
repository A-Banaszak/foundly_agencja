import React, { useState } from 'react';
import { Megaphone, CheckCircle2, Send, PhoneCall } from 'lucide-react';

export default function AdsCampaignForm() {
  const [channel, setChannel] = useState<string>('all');
  const [budget, setBudget] = useState<string>('medium');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: '', contact: '', goal: '' });

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
        <h3 className="text-2xl font-black uppercase italic text-white mb-3">Prognoza kampanii w trakcie!</h3>
        <p className="text-xs text-white/60 mb-6 leading-relaxed">
          Opracujemy estymację kosztów kliknięcia i szacowaną liczbę połączeń/formularzy z reklam. Skontaktujemy się w 2 godziny.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2.5 rounded-full bg-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-colors"
        >
          Zapytaj ponownie
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 sm:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-bold uppercase tracking-widest text-indigo-400 mb-3">
          <Megaphone className="w-3.5 h-3.5" />
          <span>Dedykowany Formularz Kampanii PPC</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-black uppercase italic text-white tracking-tight">
          Odbierz prognozę telefonów z Google & Meta Ads
        </h3>
        <p className="text-xs sm:text-sm text-white/50 font-medium mt-1">
          Wybierz kanały reklamowe oraz budżet. Prześlemy darmowy plan pozyskiwania klientów.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
            Wybierz interesujące Cię kanały reklamowe:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'google', label: 'Google Ads (Wyszukiwarka)' },
              { id: 'meta', label: 'Meta Ads (Facebook & IG)' },
              { id: 'all', label: 'Komplet (Google + Meta Ads)' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setChannel(item.id)}
                className={`p-4 rounded-xl border text-xs font-bold uppercase transition-all ${
                  channel === item.id
                    ? 'bg-indigo-600/20 border-indigo-500 text-white'
                    : 'bg-white/5 border-white/5 text-white/40 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
            Szacowany miesięczny budżet na reklamy:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'small', label: '1 000 - 3 000 PLN / msc' },
              { id: 'medium', label: '3 000 - 7 000 PLN / msc' },
              { id: 'large', label: 'Powyżej 7 000 PLN / msc' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setBudget(item.id)}
                className={`p-4 rounded-xl border text-xs font-bold uppercase transition-all ${
                  budget === item.id
                    ? 'bg-purple-600/20 border-purple-500 text-white'
                    : 'bg-white/5 border-white/5 text-white/40 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
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
              Telefon lub E-mail *
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
          <span>Odbierz Prognozę Telefonów i Zapytań z Reklam</span>
          <PhoneCall className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
