const url = "https://discord.com/api/webhooks/1478104823730802811/GpNCU-mHyBjQNm6OgGX9zZS7qh2Cov61-TRQ4TspNhEkr2FIpr3vu3wFV4bKOrFccY7R";

fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    embeds: [{
      title: "💬 Testowe powiadomienie z czatu Foundly!",
      description: "Cześć Aleksander! To jest testowe powiadomienie ze strony zaktualizowanego czatu.",
      color: 0x4f46e5,
      fields: [
        { name: "Status", value: "Połączono pomyślnie!", inline: true },
        { name: "Serwer", value: "Foundly Agencja", inline: true }
      ],
      timestamp: new Date().toISOString()
    }]
  })
})
.then(res => console.log('Discord Webhook Response Status:', res.status))
.catch(err => console.error('Error:', err));
