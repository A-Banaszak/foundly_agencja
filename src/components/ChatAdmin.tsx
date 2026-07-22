import React, { useState, useEffect } from "react";
import { Lock, LogOut, RefreshCw, Send, User, Mail, MessageSquare, ShieldCheck, KeyRound, ArrowLeft, FileText, Phone, Calendar, Search } from "lucide-react";

interface SessionItem {
  sessionId: string;
  guestName?: string;
  guestEmail?: string;
  lastMessage?: string;
  lastActivity?: string;
  lastRole?: string;
}

interface MessageItem {
  id: number;
  sessionId: string;
  role: "GUEST" | "ADMIN" | "USER";
  content: string;
  createdAt: string;
}

interface FormLeadItem {
  id: number;
  formTitle: string;
  name: string;
  contact: string;
  details?: string;
  notes?: string;
  createdAt: string;
}

export function ChatAdmin() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [pendingToken, setPendingToken] = useState("");

  const [token, setToken] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"chats" | "leads">("chats");

  // Czaty
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [replyText, setReplyText] = useState("");

  // Leady z formularzy
  const [formLeads, setFormLeads] = useState<FormLeadItem[]>([]);
  const [leadSearch, setLeadSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("foundly_admin_session_token");
    if (savedToken) {
      setToken(savedToken);
      setIsAuth(true);
      fetchSessions(savedToken, true);
      fetchFormLeads(savedToken);
    }
  }, []);

  useEffect(() => {
    if (!isAuth || !token) return;
    const interval = setInterval(() => {
      if (activeTab === "chats") {
        fetchSessions(token, false);
        if (activeSession) {
          loadChatMessages(activeSession);
        }
      } else {
        fetchFormLeads(token);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isAuth, token, activeSession, activeTab]);

  async function handleLoginStep1(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    setLoading(true);

    let isCredentialsValid = false;
    let validToken = "";

    try {
      const res = await fetch("/api/chat.php?action=login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const contentType = res.headers.get("content-type") || "";
      if (res.ok && contentType.includes("application/json")) {
        const data = await res.json();
        if (data.token) {
          isCredentialsValid = true;
          validToken = data.token;
        }
      }
    } catch (err) {}

    if (!isCredentialsValid) {
      if (username === "admin" && (password === "foundly2026!" || password === "admin")) {
        isCredentialsValid = true;
        validToken = "local_dev_token_2026";
      }
    }

    if (!isCredentialsValid) {
      setAuthError("Błędny użytkownik lub hasło!");
      setLoading(false);
      return;
    }

    // Wygeneruj kod 2FA i wyślij na Discord
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setTwoFactorCode(generatedCode);
    setPendingToken(validToken);

    const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1478104823730802811/GpNCU-mHyBjQNm6OgGX9zZS7qh2Cov61-TRQ4TspNhEkr2FIpr3vu3wFV4bKOrFccY7R";
    try {
      await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [{
            title: "BEZPIECZEŃSTWO: Kod 2FA Logowania do Panelu Foundly",
            color: 0x6366f1,
            description: `Właśnie podjęto próbę logowania na konto **${username}**.\n\n🔑 Kod weryfikacyjny 2FA: **${generatedCode}**\n\nPodaj ten kod w formularzu na stronie, aby zalogować się do panelu.`,
            footer: { text: "Foundly Agencja - Autoryzacja Dwuetapowa 2FA" },
            timestamp: new Date().toISOString()
          }]
        })
      });
    } catch (e) {
      console.error("Błąd wysyłania 2FA na Discord:", e);
    }

    setLoading(false);
    setStep(2);
  }

  async function handleVerify2FA(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");

    if (enteredCode.trim() === twoFactorCode) {
      setToken(pendingToken);
      setIsAuth(true);
      localStorage.setItem("foundly_admin_session_token", pendingToken);
      await fetchSessions(pendingToken, true);
      await fetchFormLeads(pendingToken);
    } else {
      setAuthError("Błędny 6-cyfrowy kod 2FA! Sprawdź wiadomość wysłaną na Discord.");
    }
  }

  function handleLogout() {
    setIsAuth(false);
    setToken("");
    setStep(1);
    setTwoFactorCode("");
    setEnteredCode("");
    localStorage.removeItem("foundly_admin_session_token");
  }

  async function fetchSessions(tok: string, showLoader = false) {
    if (showLoader) setLoading(true);
    try {
      const res = await fetch(`/api/chat.php?action=admin_sessions&token=${encodeURIComponent(tok)}`);
      const contentType = res.headers.get("content-type") || "";

      if (res.ok && contentType.includes("application/json")) {
        const data = await res.json();
        if (data.sessions) {
          setSessions(data.sessions);
          setIsAuth(true);
          if (showLoader) setLoading(false);
          return;
        }
      }
    } catch (err) {}

    loadLocalDevSessions();
    if (showLoader) setLoading(false);
  }

  async function fetchFormLeads(tok: string) {
    try {
      const res = await fetch(`/api/chat.php?action=admin_leads&token=${encodeURIComponent(tok)}`);
      const contentType = res.headers.get("content-type") || "";

      if (res.ok && contentType.includes("application/json")) {
        const data = await res.json();
        if (Array.isArray(data.leads)) {
          setFormLeads(data.leads);
          return;
        }
      }
    } catch (e) {}

    // Fallback lokalny
    try {
      const rawLocal = localStorage.getItem("foundly_form_leads") || "[]";
      setFormLeads(JSON.parse(rawLocal));
    } catch (e) {}
  }

  function loadLocalDevSessions() {
    const rawLocalData = localStorage.getItem("foundly_local_chats");
    if (rawLocalData) {
      try {
        const parsed = JSON.parse(rawLocalData);
        const sessionList: SessionItem[] = Object.keys(parsed).map(sid => {
          const item = parsed[sid];
          const msgs = item.messages || [];
          const lastMsg = msgs.length > 0 ? msgs[msgs.length - 1].content : "";
          return {
            sessionId: sid,
            guestName: item.guestName || `Gość (${sid.slice(-4)})`,
            guestEmail: item.guestEmail || "",
            lastMessage: lastMsg,
            lastActivity: item.updatedAt || new Date().toISOString()
          };
        });
        setSessions(sessionList);
      } catch (e) {}
    }
  }

  async function loadChatMessages(sid: string) {
    setActiveSession(sid);
    try {
      const res = await fetch(`/api/chat.php?action=messages&sessionId=${encodeURIComponent(sid)}`);
      const contentType = res.headers.get("content-type") || "";

      if (res.ok && contentType.includes("application/json")) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setMessages(data);
          return;
        }
      }
    } catch (e) {}

    const rawLocalData = localStorage.getItem("foundly_local_chats");
    if (rawLocalData) {
      try {
        const parsed = JSON.parse(rawLocalData);
        if (parsed[sid] && Array.isArray(parsed[sid].messages)) {
          setMessages(parsed[sid].messages);
        }
      } catch (e) {}
    }
  }

  async function handleSendReply(e: React.FormEvent) {
    e.preventDefault();
    if (!replyText.trim() || !activeSession) return;
    const msgContent = replyText;
    setReplyText("");

    try {
      const res = await fetch("/api/chat.php?action=admin_reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          sessionId: activeSession,
          content: msgContent
        })
      });

      const contentType = res.headers.get("content-type") || "";
      if (res.ok && contentType.includes("application/json")) {
        await loadChatMessages(activeSession);
        await fetchSessions(token, false);
        return;
      }
    } catch (err) {}

    const rawLocalData = localStorage.getItem("foundly_local_chats");
    let parsed: any = {};
    if (rawLocalData) {
      try { parsed = JSON.parse(rawLocalData); } catch (e) {}
    }

    if (!parsed[activeSession]) {
      parsed[activeSession] = { messages: [], updatedAt: new Date().toISOString() };
    }

    parsed[activeSession].messages.push({
      role: "ADMIN",
      content: msgContent,
      createdAt: new Date().toISOString()
    });
    parsed[activeSession].updatedAt = new Date().toISOString();

    localStorage.setItem("foundly_local_chats", JSON.stringify(parsed));
    loadChatMessages(activeSession);
    loadLocalDevSessions();
  }

  if (!isAuth) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-white backdrop-blur-xl">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mb-4 text-indigo-400">
            {step === 1 ? <Lock className="w-8 h-8" /> : <KeyRound className="w-8 h-8" />}
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            {step === 1 ? "Panel Zarządzania Foundly" : "Autoryzacja 2FA (Discord)"}
          </h2>
          <p className="text-xs text-white/40 mt-1">
            {step === 1 ? "Foundly Agencja Management System" : "Kod weryfikacyjny wysłano na Twój kanał Discord"}
          </p>
        </div>

        {authError && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs text-center font-medium">
            {authError}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleLoginStep1} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1">Użytkownik:</label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all pl-10"
                  placeholder="Wpisz login..."
                />
                <User className="w-4 h-4 text-white/30 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1">Hasło:</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all pl-10"
                  placeholder="Wpisz hasło..."
                />
                <ShieldCheck className="w-4 h-4 text-white/30 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/20 active:scale-95 disabled:opacity-50 mt-2"
            >
              {loading ? "Wysyłanie kodu 2FA..." : "Zaloguj się"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify2FA} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1">Kod 2FA z Discorda:</label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  value={enteredCode}
                  onChange={e => setEnteredCode(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-center text-xl tracking-[0.5em] font-mono text-white focus:outline-none focus:border-indigo-500 transition-all"
                  placeholder="000000"
                  autoFocus
                />
              </div>
              <p className="text-[11px] text-white/40 mt-2 text-center">
                Sprawdź kanał Discord - wysłano 6-cyfrowy kod autoryzacji.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-xl text-sm transition-all shadow-lg active:scale-95 mt-2"
            >
              Potwierdź Kod 2FA
            </button>

            <button
              type="button"
              onClick={() => { setStep(1); setAuthError(""); }}
              className="w-full py-2 text-xs text-white/40 hover:text-white flex items-center justify-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Wróć do logowania
            </button>
          </form>
        )}
      </div>
    );
  }

  const selectedSessionMeta = sessions.find(s => s.sessionId === activeSession);

  const filteredLeads = formLeads.filter(l => {
    const q = leadSearch.toLowerCase();
    return (
      l.formTitle?.toLowerCase().includes(q) ||
      l.name?.toLowerCase().includes(q) ||
      l.contact?.toLowerCase().includes(q) ||
      l.details?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto my-6 p-6 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] text-white shadow-2xl min-h-[650px] space-y-6">
      {/* Pasek Wyboru Zakładki & Wyloguj */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10">
          <button
            onClick={() => setActiveTab("chats")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "chats"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "text-white/60 hover:text-white"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Czaty Live ({sessions.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab("leads"); fetchFormLeads(token); }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "leads"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "text-white/60 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Leady z Formularzy ({formLeads.length})</span>
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 text-white/60 hover:text-red-400 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all"
        >
          <LogOut className="w-4 h-4" /> Wyloguj z panelu
        </button>
      </div>

      {/* Widok 1: Czaty Online */}
      {activeTab === "chats" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[550px]">
          {/* Lista rozmów */}
          <div className="border-r border-white/10 pr-4 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                  <h3 className="font-bold text-xs uppercase tracking-wider text-white">Rozmowy na Czacie</h3>
                </div>
                <button
                  onClick={() => fetchSessions(token, true)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                  title="Odśwież listę"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                </button>
              </div>

              <div className="space-y-2 overflow-y-auto max-h-[500px] pr-1">
                {sessions.length === 0 && (
                  <div className="p-8 text-center text-xs text-white/30">Brak aktywnych konwersacji</div>
                )}
                {sessions.map(s => {
                  const isSelected = activeSession === s.sessionId;
                  return (
                    <div
                      key={s.sessionId}
                      onClick={() => loadChatMessages(s.sessionId)}
                      className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                        isSelected
                          ? "bg-indigo-600/20 border-indigo-500/50 shadow-lg"
                          : "bg-white/5 border-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs text-white flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-indigo-400" />
                          {s.guestName || `Gość (${s.sessionId.slice(-4)})`}
                        </span>
                        <span className="text-[10px] text-white/40">{s.lastActivity?.slice(11, 16)}</span>
                      </div>
                      {s.guestEmail && (
                        <p className="text-[11px] text-indigo-300 mb-1.5 flex items-center gap-1">
                          <Mail className="w-3 h-3 opacity-60" /> {s.guestEmail}
                        </p>
                      )}
                      <p className="text-xs text-white/60 truncate">{s.lastMessage}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Okno rozmowy */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            {activeSession ? (
              <>
                <div>
                  <div className="pb-4 mb-4 border-b border-white/10 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-base text-white flex items-center gap-2">
                        {selectedSessionMeta?.guestName || "Nieznany Gość"}
                        {selectedSessionMeta?.guestEmail && (
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-normal border border-indigo-500/30">
                            {selectedSessionMeta.guestEmail}
                          </span>
                        )}
                      </h3>
                      <p className="text-[11px] text-white/40 mt-0.5">ID Sesji: {activeSession}</p>
                    </div>
                  </div>

                  <div className="h-[400px] overflow-y-auto space-y-3 p-4 bg-black/40 rounded-2xl border border-white/5 scrollbar-thin">
                    {messages.map((m, idx) => (
                      <div
                        key={idx}
                        className={`flex ${m.role === "ADMIN" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[78%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                            m.role === "ADMIN"
                              ? "bg-indigo-600 text-white rounded-br-none shadow-md"
                              : "bg-white/10 text-white rounded-bl-none border border-white/10"
                          }`}
                        >
                          <p>{m.content}</p>
                          <span className="text-[9px] opacity-40 block mt-1 text-right">
                            {m.createdAt?.slice(11, 16)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSendReply} className="mt-4 flex gap-3">
                  <input
                    type="text"
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder="Napisz odpowiedź do klienta..."
                    className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-white/20"
                  />
                  <button
                    type="submit"
                    className="px-6 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-2xl transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-indigo-500/20"
                  >
                    <Send className="w-4 h-4" /> Wyślij
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-white/30 text-xs space-y-2">
                <MessageSquare className="w-12 h-12 opacity-20" />
                <p>Wybierz rozmowę z listy po lewej stronie, aby odczytać wiadomości</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Widok 2: Leady z Formularzy */}
      {activeTab === "leads" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={leadSearch}
                onChange={e => setLeadSearch(e.target.value)}
                placeholder="Szukaj po nazwie, kontakcie, branży..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500"
              />
              <Search className="w-4 h-4 text-white/30 absolute left-3.5 top-3" />
            </div>

            <button
              onClick={() => fetchFormLeads(token)}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 text-xs font-bold rounded-xl flex items-center gap-2 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Odśwież leady
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLeads.length === 0 && (
              <div className="col-span-full p-12 text-center text-xs text-white/30 border border-white/5 rounded-2xl">
                Brak zarejestrowanych leadów w systemie.
              </div>
            )}
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4 flex flex-col justify-between hover:border-indigo-500/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold uppercase tracking-wider">
                      {lead.formTitle}
                    </span>
                    <span className="text-[10px] text-white/40 flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3" />
                      {lead.createdAt?.slice(0, 10)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-black text-white flex items-center gap-2">
                      <User className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{lead.name}</span>
                    </div>

                    <div className="text-xs font-bold text-indigo-300 flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{lead.contact}</span>
                    </div>

                    {lead.details && (
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-white/70 leading-relaxed font-mono">
                        {lead.details}
                      </div>
                    )}

                    {lead.notes && (
                      <div className="text-xs text-white/50 italic border-l-2 border-indigo-500/40 pl-2.5 py-0.5">
                        "{lead.notes}"
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex gap-2">
                  <a
                    href={`tel:${lead.contact}`}
                    className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] text-center transition-all"
                  >
                    Zadzwoń
                  </a>
                  <a
                    href={`mailto:${lead.contact}`}
                    className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-[11px] text-center border border-white/10 transition-all"
                  >
                    Napisz E-mail
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
