import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Headset } from "lucide-react";

interface Message {
  id?: number;
  role: "GUEST" | "ADMIN" | "USER";
  content: string;
  createdAt?: string;
}

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1478104823730802811/GpNCU-mHyBjQNm6OgGX9zZS7qh2Cov61-TRQ4TspNhEkr2FIpr3vu3wFV4bKOrFccY7R";

function sendDirectDiscordNotification(message: string, user: string, role: string) {
  if (!DISCORD_WEBHOOK_URL) return;
  const color = (role === 'ADMIN') ? 0x4f46e5 : ((role === 'LEAD') ? 0xf59e0b : 0x10b981);
  const title = (role === 'LEAD') ? "🎯 Nowy Lead na Czacie (Foundly)!" : "💬 Nowa wiadomość na czacie Foundly";

  fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: title,
        description: message,
        color: color,
        fields: [
          { name: "Autor", value: user, inline: true },
          { name: "Rola", value: role, inline: true }
        ],
        timestamp: new Date().toISOString()
      }]
    })
  }).catch(() => {});
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadInfo, setLeadInfo] = useState({ name: "", email: "" });
  const [isLeadSaved, setIsLeadSaved] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastAdminMsgsRef = useRef<number>(0);
  const originalTitleRef = useRef<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    originalTitleRef.current = document.title;
    audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3");

    let sid = localStorage.getItem("foundly_chat_session");
    if (!sid) {
      sid = crypto.randomUUID();
      localStorage.setItem("foundly_chat_session", sid);
    }
    setSessionId(sid);

    if (localStorage.getItem("foundly_chat_info") === "true") {
      setIsLeadSaved(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (unreadCount > 0) {
      document.title = `(${unreadCount}) Nowa wiadomość!`;
    } else {
      document.title = originalTitleRef.current || "Foundly.Agencja";
    }
  }, [unreadCount]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && sessionId) {
      loadMessages();
      const interval = setInterval(loadMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen, sessionId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [chatHistory, showLeadCapture]);

  async function loadMessages() {
    if (!sessionId) return;
    try {
      const res = await fetch(`/api/chat.php?action=messages&sessionId=${encodeURIComponent(sessionId)}`);
      const contentType = res.headers.get("content-type") || "";

      if (res.ok && contentType.includes("application/json")) {
        const data = await res.json();
        if (Array.isArray(data)) {
          processLoadedMessages(data);
          return;
        }
      }
    } catch (e) {}

    // Fallback dla lokalnego dev (localhost bez PHP)
    const rawLocalData = localStorage.getItem("foundly_local_chats");
    if (rawLocalData) {
      try {
        const parsed = JSON.parse(rawLocalData);
        if (parsed[sessionId] && Array.isArray(parsed[sessionId].messages)) {
          processLoadedMessages(parsed[sessionId].messages);
        }
      } catch (e) {}
    }
  }

  function processLoadedMessages(data: Message[]) {
    const currentAdminMsgs = data.filter((m: Message) => m.role === "ADMIN").length;

    if (currentAdminMsgs > lastAdminMsgsRef.current) {
      if (!isOpen || document.hidden) {
        audioRef.current?.play().catch(() => {});
        setUnreadCount(prev => prev + (currentAdminMsgs - lastAdminMsgsRef.current));
      }
    }

    lastAdminMsgsRef.current = currentAdminMsgs;
    setChatHistory(data);

    const hasAdminReplied = data.some((m: Message) => m.role === "ADMIN");
    const isUserTyping = leadInfo.name.length > 0 || leadInfo.email.length > 0;
    const alreadySaved = localStorage.getItem("foundly_chat_info") === "true";

    if (data.some((m: Message) => m.role === "GUEST") && !isLeadSaved && !alreadySaved) {
      if (!hasAdminReplied || isUserTyping) {
        setShowLeadCapture(true);
      } else {
        setShowLeadCapture(false);
      }
    } else {
      setShowLeadCapture(false);
    }
  }

  async function handleSend() {
    if (!message.trim() || isPending || !sessionId) return;
    const currentMsg = message;
    setMessage("");
    setIsPending(true);

    const newMsgObj: Message = { role: "GUEST", content: currentMsg, createdAt: new Date().toISOString() };
    setChatHistory(prev => [...prev, newMsgObj]);

    let isPhpSuccess = false;
    try {
      const res = await fetch("/api/chat.php?action=send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, content: currentMsg })
      });
      const contentType = res.headers.get("content-type") || "";
      if (res.ok && contentType.includes("application/json")) {
        isPhpSuccess = true;
        await loadMessages();
      }
    } catch (e) {}

    // Jeśli nie wykonano powiadomienia z backendu PHP (np. lokalny dev), wyślij bezpośrednio z klienta
    if (!isPhpSuccess) {
      saveMessageLocally(newMsgObj);
      const label = leadInfo.name ? `${leadInfo.name} (${leadInfo.email})` : `Gość (${sessionId.slice(-4)})`;
      sendDirectDiscordNotification(currentMsg, label, "GUEST");
    }

    setIsPending(false);
  }

  function saveMessageLocally(newMsgObj: Message) {
    const rawLocalData = localStorage.getItem("foundly_local_chats");
    let parsed: any = {};
    if (rawLocalData) {
      try { parsed = JSON.parse(rawLocalData); } catch (e) {}
    }

    if (!parsed[sessionId]) {
      parsed[sessionId] = {
        messages: [],
        guestName: leadInfo.name || "",
        guestEmail: leadInfo.email || "",
        updatedAt: new Date().toISOString()
      };
    }

    parsed[sessionId].messages.push(newMsgObj);
    parsed[sessionId].updatedAt = new Date().toISOString();

    localStorage.setItem("foundly_local_chats", JSON.stringify(parsed));
  }

  async function handleSaveLead() {
    if (!leadInfo.name || !leadInfo.email || !sessionId) return;
    let isPhpSuccess = false;

    try {
      const res = await fetch("/api/chat.php?action=lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, name: leadInfo.name, email: leadInfo.email })
      });
      const contentType = res.headers.get("content-type") || "";
      if (res.ok && contentType.includes("application/json")) {
        isPhpSuccess = true;
      }
    } catch (e) {}

    if (!isPhpSuccess) {
      // Fallback lokalny
      const rawLocalData = localStorage.getItem("foundly_local_chats");
      let parsed: any = {};
      if (rawLocalData) {
        try { parsed = JSON.parse(rawLocalData); } catch (e) {}
      }
      if (!parsed[sessionId]) parsed[sessionId] = { messages: [] };
      parsed[sessionId].guestName = leadInfo.name;
      parsed[sessionId].guestEmail = leadInfo.email;
      parsed[sessionId].updatedAt = new Date().toISOString();
      localStorage.setItem("foundly_local_chats", JSON.stringify(parsed));

      sendDirectDiscordNotification(`Pozyskano dane kontaktowe:\nImię: ${leadInfo.name}\nEmail: ${leadInfo.email}`, `${leadInfo.name} (${leadInfo.email})`, "LEAD");
    }

    localStorage.setItem("foundly_chat_info", "true");
    setIsLeadSaved(true);
    setShowLeadCapture(false);
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(8px)" }}
            className="mb-4 w-[calc(100vw-32px)] sm:w-[380px] bg-[#0a0a0a] border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="bg-white/5 p-6 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <Headset className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0a0a0a]" />
                </div>
                <div>
                  <h4 className="font-bold tracking-tight text-sm text-white">Foundly Support</h4>
                  <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Eksperci online</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div
              ref={scrollRef}
              className="flex-grow h-[360px] overflow-y-auto p-6 space-y-4 bg-[#050505] scrollbar-thin scrollbar-thumb-white/10"
            >
              {chatHistory.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                  <MessageCircle className="w-10 h-10 text-white/10" />
                  <p className="text-white/40 text-xs leading-relaxed max-w-[220px]">
                    Cześć! W czym możemy Ci dzisiaj pomóc? Napisz do nas krótką wiadomość.
                  </p>
                </div>
              )}

              {chatHistory.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex ${msg.role === "ADMIN" ? "justify-start" : "justify-end"}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed ${
                    msg.role === "ADMIN"
                      ? "bg-white/10 text-white rounded-bl-none border border-white/10"
                      : "bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-500/20"
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {showLeadCapture && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-2xl bg-indigo-600/90 text-white space-y-3 shadow-lg backdrop-blur-sm border border-indigo-400/30"
                >
                  <p className="text-[11px] leading-relaxed opacity-95">
                    Podaj swoje imię oraz e-mail – jeśli nie odpiszemy od razu, prześlemy odpowiedź na Twoją skrzynkę!
                  </p>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Twoje imię"
                      value={leadInfo.name}
                      onChange={e => setLeadInfo({ ...leadInfo, name: e.target.value })}
                      className="w-full h-9 bg-black/20 border border-white/20 rounded-xl px-3 text-xs text-white placeholder:text-white/50 focus:outline-none focus:border-white"
                    />
                    <input
                      type="email"
                      placeholder="Adres e-mail"
                      value={leadInfo.email}
                      onChange={e => setLeadInfo({ ...leadInfo, email: e.target.value })}
                      className="w-full h-9 bg-black/20 border border-white/20 rounded-xl px-3 text-xs text-white placeholder:text-white/50 focus:outline-none focus:border-white"
                    />
                    <button
                      onClick={handleSaveLead}
                      className="w-full h-9 bg-white text-indigo-600 rounded-xl text-xs font-bold hover:bg-zinc-100 transition-all active:scale-95 shadow"
                    >
                      Zapisz dane
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white/5 border-t border-white/5">
              <div className="relative flex items-center gap-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Napisz wiadomość..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl h-12 pl-4 pr-12 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition-all"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-1.5 top-1.5 h-9 w-9 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-all active:scale-95 disabled:opacity-50"
                  disabled={isPending}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 relative ${
          isOpen ? "bg-white text-black rotate-90" : "bg-indigo-600 text-white"
        }`}
      >
        {unreadCount > 0 && !isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md animate-bounce">
            {unreadCount}
          </span>
        )}
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
