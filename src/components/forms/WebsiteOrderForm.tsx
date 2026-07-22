import React, { useState } from 'react';
import { Send, CheckCircle2, Monitor, Rocket } from 'lucide-react';

export default function WebsiteOrderForm() {
  const [pkg, setPkg] = useState<string>('business');
  const [hasDomain, setHasDomain] = useState<string>('no');
  const [timeline, setTimeline] = useState<string>('48h');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: '', contact: '', notes: '' });

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
        <h3 className="text-2xl font-black uppercase italic text-white mb-3">Dziękujemy za zapytanie o stronę WWW!</h3>
        <p className="text-xs text-white/60 mb-6 leading-relaxed">
          Przygotowujemy wstępną makietę strony dla Twojej firmy. Skontaktujemy się z Tobą telefonicznie lub mailowo w ciągu 2 godzin.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2.5 rounded-full bg-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-colors"
        >
          Wyślij ponownie
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 sm:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-bold uppercase tracking-widest text-indigo-400 mb-3">
          <Monitor className="w-3.5 h-3.5" />
          <span>Dedykowany Formularz Strony WWW</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-black uppercase italic text-white tracking-tight">
          Zamów bezpłatną makietę strony WWW
        </h3>
        <p className="text-xs sm:text-sm text-white/50 font-medium mt-1">
          Wypełnij poniższe pola. Przygotujemy projekt strony dla Twojej firmy bez jakichkolwiek zobowiązań.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
            Wybierz pakiet strony WWW:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'starter', title: 'Starter One-Page', price: '890 zł' },
              { id: 'business', title: 'Business Multi-Page', price: '1490 zł' },
              { id: 'ecommerce', title: 'Sklep E-Commerce', price: 'od 2990 zł' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPkg(item.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  pkg === item.id
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="text-xs font-black uppercase tracking-tight mb-1">{item.title}</div>
                <div className="text-xs font-bold text-indigo-400">{item.price}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
              Czy posiadasz obecną stronę lub domenę?
            </label>
            <div className="flex gap-3">
              {[
                { id: 'no', label: 'Nie, potrzebuję nowej' },
                { id: 'yes', label: 'Tak, mam obecną' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setHasDomain(item.id)}
                  className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold uppercase transition-all ${
                    hasDomain === item.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-white/5 border-white/5 text-white/40'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
              Oczekiwany czas realizacji:
            </label>
            <select
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold uppercase focus:outline-none focus:border-indigo-500"
            >
              <option value="48h" className="bg-[#080808]">Ekspresowo w 48 godzin (Rekomendowane)</option>
              <option value="2weeks" className="bg-[#080808]">W ciągu 1-2 tygodni</option>
              <option value="nopressure" className="bg-[#080808]">Bez pośpiechu</option>
            </select>
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
              placeholder="np. Jan Kowalski Usługi Budowlane"
              className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
              Telefon lub E-mail do kontaktu *
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

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
            Krótki opis branży lub link do wzoru strony (opcjonalnie):
          </label>
          <textarea
            rows={2}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Opisz czym zajmuje się Twoja firma..."
            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-xs focus:outline-none focus:border-indigo-500 transition-colors resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-xs uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
        >
          <span>Odbierz Wstępny Projekt Strony WWW w 48h</span>
          <Rocket className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
