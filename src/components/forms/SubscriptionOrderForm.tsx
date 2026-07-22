import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { sendLeadToDiscord } from '../../lib/discord-leads';
import { validateName, validateContact } from '../../lib/validation';

export default function SubscriptionOrderForm() {
  const [plan, setPlan] = useState<string>('pro');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: '', contact: '', notes: '' });
  const [errors, setErrors] = useState<{ name?: string; contact?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameErr = validateName(formData.name);
    const contactErr = validateContact(formData.contact);

    if (nameErr || contactErr) {
      setErrors({ name: nameErr || undefined, contact: contactErr || undefined });
      return;
    }

    setErrors({});

    sendLeadToDiscord({
      formTitle: "Zamówienie Abonamentu (Strona 0 PLN)",
      name: formData.name,
      contact: formData.contact,
      fields: [
        { name: "Wybrany Abonament", value: plan.toUpperCase(), inline: true }
      ],
      notes: formData.notes
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-10 rounded-[2.5rem] bg-gradient-to-b from-indigo-950/40 to-black border border-indigo-500/50 text-center max-w-xl mx-auto shadow-2xl">
        <div className="w-14 h-14 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-black uppercase italic text-white mb-3">Zgłoszenie zarezerwowane!</h3>
        <p className="text-xs text-white/60 mb-6 leading-relaxed">
          Zarezerwowaliśmy pakiet ze stroną za 0 zł na start. Skontaktujemy się telefonicznie w 2 godziny z gotowym projektem wstępnym.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', contact: '', notes: '' });
          }}
          className="px-6 py-2.5 rounded-full bg-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-colors"
        >
          Wypełnij ponownie
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-black border-2 border-indigo-500/50 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-[11px] font-bold uppercase tracking-widest text-indigo-300 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Dedykowany Formularz Subskrypcji All-In-One</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-black uppercase italic text-white tracking-tight">
          Zarezerwuj Stronę za 0 PLN na start
        </h3>
        <p className="text-xs sm:text-sm text-white/60 font-medium mt-1">
          Wybierz plan abonamentowy. Stronę projektujemy bez kosztów wstępnych z gwarancją stałych raportów i brakiem długoterminowych umów.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
            Wybierz wariant abonamentu:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'start', title: 'Abonament Start', price: '99 zł / msc', desc: 'Strona one-page za 0 zł + SEO' },
              { id: 'pro', title: 'Business Pro', price: '690 zł / msc', desc: 'Strona multi-page za 0 zł + SEO + Ads' },
              { id: 'dominator', title: 'Dominator', price: '990 zł / msc', desc: 'Sklep za 0 zł + Full Growth (SEO+Ads)' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPlan(item.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  plan === item.id
                    ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="text-xs font-black uppercase tracking-tight mb-1">{item.title}</div>
                <div className="text-xs font-bold text-indigo-400 mb-1">{item.price}</div>
                <div className="text-[10px] text-white/40">{item.desc}</div>
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
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              placeholder="np. Jan Kowalski Usługi Stolarskie"
              className={`w-full h-12 px-4 rounded-xl bg-white/5 border ${
                errors.name ? 'border-red-500' : 'border-white/10'
              } text-white placeholder-white/20 text-xs focus:outline-none focus:border-indigo-500 transition-colors`}
            />
            {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
              Telefon lub E-mail do kontaktu *
            </label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => {
                setFormData({ ...formData, contact: e.target.value });
                if (errors.contact) setErrors({ ...errors, contact: undefined });
              }}
              placeholder="np. 600 111 222 lub biuro@firma.pl"
              className={`w-full h-12 px-4 rounded-xl bg-white/5 border ${
                errors.contact ? 'border-red-500' : 'border-white/10'
              } text-white placeholder-white/20 text-xs focus:outline-none focus:border-indigo-500 transition-colors`}
            />
            {errors.contact && <p className="text-[11px] text-red-400 mt-1">{errors.contact}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
            Branża lub czym zajmuje się Twoja firma:
          </label>
          <textarea
            rows={2}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Krótko opisz swój biznes..."
            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-xs focus:outline-none focus:border-indigo-500 transition-colors resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full h-14 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors shadow-2xl flex items-center justify-center gap-2"
        >
          <span>Rezerwuj Stronę za 0 PLN + Marketing</span>
          <Zap className="w-4 h-4 text-indigo-600 fill-indigo-600" />
        </button>
      </form>
    </div>
  );
}
