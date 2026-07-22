export const FORM_DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1478870517539799040/AW5vPWZ3RgDJrk5NuZrHiDfUnSS-6To6FhezIqE_AwzjQUP2Rcr05cNJ6cwikAV06V0C";

export interface LeadField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface LeadPayload {
  formTitle: string;
  name: string;
  contact: string;
  fields?: LeadField[];
  notes?: string;
}

export async function sendLeadToDiscord(payload: LeadPayload) {
  const discordFields: LeadField[] = [
    { name: "Imię / Firma", value: payload.name || "Nie podano", inline: true },
    { name: "Kontakt", value: payload.contact || "Nie podano", inline: true },
    ...(payload.fields || [])
  ];

  if (payload.notes) {
    discordFields.push({ name: "Uwagi / Opis", value: payload.notes, inline: false });
  }

  // 1. Wysyłka do Discord Webhook
  if (FORM_DISCORD_WEBHOOK) {
    try {
      await fetch(FORM_DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [{
            title: `NOWY LEAD: ${payload.formTitle}`,
            color: 0xf59e0b,
            fields: discordFields,
            footer: { text: "Foundly Agencja - System Pozyskiwania Leada" },
            timestamp: new Date().toISOString()
          }]
        })
      });
    } catch (err) {
      console.error("Błąd wysyłania leada na Discord:", err);
    }
  }

  // 2. Zapis w bazie PHP (SQLite)
  const detailsStr = payload.fields?.map(f => `${f.name}: ${f.value}`).join(" | ") || "";
  try {
    await fetch("/api/chat.php?action=save_form_lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formTitle: payload.formTitle,
        name: payload.name,
        contact: payload.contact,
        details: detailsStr,
        notes: payload.notes || ""
      })
    });
  } catch (err) {}

  // 3. Zapis lokalny (fallback dev)
  try {
    const rawLocal = localStorage.getItem("foundly_form_leads") || "[]";
    const parsed = JSON.parse(rawLocal);
    parsed.unshift({
      id: Date.now(),
      formTitle: payload.formTitle,
      name: payload.name,
      contact: payload.contact,
      details: detailsStr,
      notes: payload.notes || "",
      createdAt: new Date().toISOString()
    });
    localStorage.setItem("foundly_form_leads", JSON.stringify(parsed));
  } catch (e) {}
}
