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
  if (!FORM_DISCORD_WEBHOOK) return;

  const discordFields: LeadField[] = [
    { name: "Imię / Firma", value: payload.name || "Nie podano", inline: true },
    { name: "Kontakt", value: payload.contact || "Nie podano", inline: true },
    ...(payload.fields || [])
  ];

  if (payload.notes) {
    discordFields.push({ name: "Uwagi / Opis", value: payload.notes, inline: false });
  }

  try {
    await fetch(FORM_DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [{
          title: `NOWY LEAD: ${payload.formTitle}`,
          color: 0xf59e0b, // Złocisty kolor dla wyróżnienia leadów
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
