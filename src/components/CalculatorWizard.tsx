import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, Send, Building, Wrench, Shield, Stethoscope, Scissors } from 'lucide-react';

export default function CalculatorWizard() {
  const [step, setStep] = useState<number>(1);
  const [industry, setIndustry] = useState<string>('budowlana');
  const [sitePackage, setSitePackage] = useState<string>('business');
  const [marketingPackage, setMarketingPackage] = useState<string>('seo');
  
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    details: ''
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Prices calculation
  const getSitePrice = () => {
    if (sitePackage === 'starter') return 890;
    if (sitePackage === 'business') return 1490;
    if (sitePackage === 'ecommerce') return 2990;
    return 0;
  };

  const getMarketingPrice = () => {
    if (marketingPackage === 'seo') return 490;
    if (marketingPackage === 'ads') return 690;
    if (marketingPackage === 'full') return 990;
    return 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="kalkulator" className="py-28 bg-[#080808] relative border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kalkulator Wyceny Online</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter text-white">
            Skonfiguruj Swój Pakiet <br />
            <span className="text-white/40">i poznaj koszt w 60 sekund</span>
          </h2>
        </div>

        {isSubmitted ? (
          <div className="p-12 rounded-[2.5rem] bg-gradient-to-b from-indigo-950/40 to-black border border-indigo-500/50 text-center max-w-xl mx-auto shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-4">
              Dziękujemy za Zgłoszenie!
            </h3>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">
              Otrzymaliśmy Twoją konfigurację. Skontaktujemy się z Tobą telefonicznie lub e-mailowo w ciągu 2 godzin z gotowym projektem wstępnym.
            </p>
            <button
              onClick={() => { setIsSubmitted(false); setStep(1); }}
              className="px-8 py-3 rounded-full bg-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-colors"
            >
              Skonfiguruj Ponownie
            </button>
          </div>
        ) : (
          <div className="p-8 sm:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/10 shadow-2xl backdrop-blur-xl relative">
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/10">
              <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider ${step >= 1 ? 'text-indigo-400' : 'text-white/20'}`}>
                <span className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-[10px]">1</span>
                <span>Branża</span>
              </div>
              <div className="h-0.5 w-12 bg-white/10"></div>
              <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider ${step >= 2 ? 'text-indigo-400' : 'text-white/20'}`}>
                <span className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-[10px]">2</span>
                <span>Strona & Marketing</span>
              </div>
              <div className="h-0.5 w-12 bg-white/10"></div>
              <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider ${step >= 3 ? 'text-indigo-400' : 'text-white/20'}`}>
                <span className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-[10px]">3</span>
                <span>Kontakt</span>
              </div>
            </div>

            {/* STEP 1: Industry */}
            {step === 1 && (
              <div>
                <h3 className="text-xl font-black uppercase italic text-white mb-6">
                  Krok 1: Wybierz swoją branżę
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                  {[
                    { id: 'budowlana', label: 'Firma Budowlana / Remontowa', icon: Building },
                    { id: 'stolarz', label: 'Stolarz / Meble na wymiar', icon: Wrench },
                    { id: 'medycyna', label: 'Psycholog / Medycyna / Gabinet', icon: Stethoscope },
                    { id: 'prawnik', label: 'Kancelaria Prawna / Finanse', icon: Shield },
                    { id: 'beauty', label: 'Salon Beauty / Barber / Fryzjer', icon: Scissors },
                    { id: 'uslugi', label: 'Inne Usługi Lokalne', icon: Sparkles }
                  ].map((item) => {
                    const IconComp = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setIndustry(item.id)}
                        className={`p-5 rounded-2xl border text-left transition-all flex flex-col gap-3 ${
                          industry === item.id
                            ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                            : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <IconComp className="w-6 h-6 text-indigo-400" />
                        <span className="text-xs font-bold uppercase tracking-tight">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="h-14 px-8 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center gap-2"
                  >
                    <span>Dalej: Zakres Strony</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Website & Marketing Packages */}
            {step === 2 && (
              <div>
                <h3 className="text-xl font-black uppercase italic text-white mb-6">
                  Krok 2: Wybierz pakiet strony oraz opcjonalny marketing
                </h3>

                {/* Website Packages */}
                <div className="mb-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">Pakiet Strony WWW:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'starter', name: 'Starter One-Page', price: '890 zł' },
                      { id: 'business', name: 'Business Multi-Page', price: '1490 zł' },
                      { id: 'ecommerce', name: 'Sklep E-Commerce', price: '2990 zł' }
                    ].map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSitePackage(pkg.id)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          sitePackage === pkg.id
                            ? 'bg-indigo-600/20 border-indigo-500 text-white'
                            : 'bg-white/5 border-white/5 text-white/60'
                        }`}
                      >
                        <div className="text-xs font-bold uppercase tracking-tight mb-1">{pkg.name}</div>
                        <div className="text-sm font-black text-indigo-400">{pkg.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Marketing Packages */}
                <div className="mb-10">
                  <div className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">Dodatkowy Marketing (Pozyskiwanie klientów):</div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {[
                      { id: 'none', name: 'Brak (Sama Strona)', price: '0 zł/mc' },
                      { id: 'seo', name: 'SEO Lokalne (Google)', price: '490 zł/mc' },
                      { id: 'ads', name: 'Kampanie Ads (Telefony)', price: '690 zł/mc' },
                      { id: 'full', name: 'Full Growth (SEO+Ads)', price: '990 zł/mc' }
                    ].map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setMarketingPackage(pkg.id)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          marketingPackage === pkg.id
                            ? 'bg-purple-600/20 border-purple-500 text-white'
                            : 'bg-white/5 border-white/5 text-white/60'
                        }`}
                      >
                        <div className="text-[11px] font-bold uppercase tracking-tight mb-1">{pkg.name}</div>
                        <div className="text-xs font-black text-purple-400">{pkg.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Estimation Bar */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-white/40">Szacowana Inwestycja:</div>
                    <div className="text-2xl font-black text-white italic">
                      {getSitePrice()} PLN netto <span className="text-xs text-white/40 not-italic font-normal">(jednorazowo)</span>
                      {getMarketingPrice() > 0 && (
                        <span className="text-indigo-400 ml-2">+ {getMarketingPrice()} PLN/mc</span>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-white/40 font-medium italic">
                    Gwarancja wykonania w 48h
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-bold uppercase text-white/40 hover:text-white"
                  >
                    ← Wstecz
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="h-14 px-8 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center gap-2"
                  >
                    <span>Dalej: Przejdź do kontaktu</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Contact Form */}
            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-black uppercase italic text-white mb-2">
                  Krok 3: Gdzie wysłać bezpłatny podgląd projektu?
                </h3>
                <p className="text-xs text-white/40 mb-8 font-medium">
                  Przygotujemy wstępną makietę strony dla Twojej firmy bez jakichkolwiek zobowiązań.
                </p>

                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                      Imię i Nazwisko / Nazwa Firmy *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="np. Jan Kowalski - Usługi Stolarskie"
                      className="w-full h-14 px-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                      Numer Telefonu lub Adres E-mail *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="np. 600 111 222 lub biuro@firma.pl"
                      className="w-full h-14 px-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                      Dodatkowe uwagi / Adres obecnej strony (opcjonalnie)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Napisz krótko, czym się zajmujesz..."
                      className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs font-bold uppercase text-white/40 hover:text-white"
                  >
                    ← Wstecz
                  </button>
                  <button
                    type="submit"
                    className="h-16 px-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-xs uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25 flex items-center gap-2"
                  >
                    <span>Wyślij i Odbierz Dedykowany Projekt</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
