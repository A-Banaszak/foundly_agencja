const webhookUrl = "https://discord.com/api/webhooks/1478870517539799040/AW5vPWZ3RgDJrk5NuZrHiDfUnSS-6To6FhezIqE_AwzjQUP2Rcr05cNJ6cwikAV06V0C";

fetch(webhookUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    embeds: [{
      title: "🔥 Testowy Lead z Formularza!",
      description: "Testowe powiadomienie sprawdzające Webhook dla kompletnych leadów.",
      color: 0xf59e0b,
      fields: [
        { name: "👤 Imię i Nazwisko", value: "Jan Kowalski", inline: true },
        { name: "📞 Kontakt", value: "+48 600 100 200 / jan@example.com", inline: true },
        { name: "📦 Formularz", value: "Kalkulator Wyceny Online", inline: true }
      ],
      timestamp: new Date().toISOString()
    }]
  })
})
.then(res => console.log('Discord Webhook Response Status:', res.status))
.catch(err => console.error('Error:', err));
