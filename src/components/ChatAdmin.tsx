import React, { useState, useEffect } from "react";
import { Lock, LogOut, RefreshCw, Send, User, Mail, MessageSquare, ShieldCheck } from "lucide-react";

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

export function ChatAdmin() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [authError, setAuthError] = useState("");

  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("foundly_admin_session_token");
    if (savedToken) {
      setToken(savedToken);
      setIsAuth(true);
      fetchSessions(savedToken, true);
    }
  }, []);

  useEffect(() => {
    if (!isAuth || !token) return;
    const interval = setInterval(() => {
      fetchSessions(token, false);
      if (activeSession) {
        loadChatMessages(activeSession);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isAuth, token, activeSession]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    setLoading(true);

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
          setToken(data.token);
          setIsAuth(true);
          localStorage.setItem("foundly_admin_session_token", data.token);
          await fetchSessions(data.token, true);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.log("PHP backend not active (local environment)");
    }

    // Tryb lokalny (gdy uruchamiasz 'npm run dev' bez lokalnego serwera PHP):
    if (username === "admin" && (password === "foundly2026!" || password === "admin")) {
      const mockToken = "local_dev_token_2026";
      setToken(mockToken);
      setIsAuth(true);
      localStorage.setItem("foundly_admin_session_token", mockToken);
      await fetchSessions(mockToken, true);
    } else {
      setAuthError("Błędny użytkownik lub hasło!");
    }
    setLoading(false);
  }

  function handleLogout() {
    setIsAuth(false);
    setToken("");
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
    } catch (err) {
      console.log("Fetching PHP sessions failed, loading from local dev storage");
    }

    // Fallback dla lokalnego trybu dev
    loadLocalDevSessions();
    if (showLoader) setLoading(false);
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

    // Fallback lokalny
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

    // Zapis w trybie lokalnym
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
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Panel Czata — Logowanie</h2>
          <p className="text-xs text-white/40 mt-1">Foundly Agencja Management</p>
        </div>

        {authError && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs text-center font-medium">
            {authError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
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
            {loading ? "Logowanie..." : "Zaloguj się"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/5 text-center">
          <p className="text-[11px] text-white/40">
            Domyślny login: <code className="text-indigo-400 font-mono">admin</code> | Hasło: <code className="text-indigo-400 font-mono">foundly2026!</code>
          </p>
        </div>
      </div>
    );
  }

  const selectedSessionMeta = sessions.find(s => s.sessionId === activeSession);

  return (
    <div className="max-w-7xl mx-auto my-6 p-6 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] text-white shadow-2xl min-h-[650px] grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Lista rozmów */}
      <div className="border-r border-white/10 pr-4 space-y-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-sm text-white">Aktywne czaty ({sessions.length})</h3>
            </div>
            <button
              onClick={() => fetchSessions(token, true)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
              title="Odśwież listę"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[520px] pr-1">
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

        <button
          onClick={handleLogout}
          className="w-full mt-4 py-2.5 px-4 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 text-white/60 hover:text-red-400 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all"
        >
          <LogOut className="w-4 h-4" /> Wyloguj z panelu
        </button>
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

              <div className="h-[440px] overflow-y-auto space-y-3 p-4 bg-black/40 rounded-2xl border border-white/5 scrollbar-thin">
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
  );
}
