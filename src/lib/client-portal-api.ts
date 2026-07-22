export type ClientAccount = {
  id: string;
  clientName: string;
  companyName: string;
  email: string;
  pin: string;
  ga4PropertyId: string;
  googleAdsCustomerId: string;
  metaAdAccountId: string;
  gscSiteUrl: string;
  createdAt: string;
};

export type DailyMetric = {
  date: string;
  leadsCount: number;
  phoneClicks: number;
  formLeads: number;
  googleAdsSpend: number;
  metaAdsSpend: number;
  avgCpl: number;
  topGooglePosition: number;
};

export type LeadItem = {
  id: string;
  date: string;
  type: 'phone' | 'form';
  source: 'Google Ads' | 'Meta Ads' | 'Google Organic (SEO)';
  clientName: string;
  contact: string;
  details?: string;
  status: 'Nowy' | 'W kontakcie' | 'Zrealizowany';
};

// Sample Initial Demo Client Data
export const DEMO_CLIENT_ACCOUNT: ClientAccount = {
  id: "cli_demo_01",
  clientName: "Jan Kowalski",
  companyName: "Kowalski Usługi Stolarskie",
  email: "demo@foundly.pl",
  pin: "1234",
  ga4PropertyId: "389201948",
  googleAdsCustomerId: "849-201-9482",
  metaAdAccountId: "act_492019482",
  gscSiteUrl: "https://kowalski-stolarstwo.pl",
  createdAt: "2026-06-01"
};

export const DEMO_DAILY_METRICS: DailyMetric[] = [
  { date: "2026-07-16", leadsCount: 2, phoneClicks: 1, formLeads: 1, googleAdsSpend: 54, metaAdsSpend: 0, avgCpl: 27.00, topGooglePosition: 4 },
  { date: "2026-07-17", leadsCount: 3, phoneClicks: 2, formLeads: 1, googleAdsSpend: 62, metaAdsSpend: 25, avgCpl: 29.00, topGooglePosition: 3 },
  { date: "2026-07-18", leadsCount: 1, phoneClicks: 1, formLeads: 0, googleAdsSpend: 40, metaAdsSpend: 0, avgCpl: 40.00, topGooglePosition: 3 },
  { date: "2026-07-19", leadsCount: 4, phoneClicks: 2, formLeads: 2, googleAdsSpend: 75, metaAdsSpend: 30, avgCpl: 26.25, topGooglePosition: 2 },
  { date: "2026-07-20", leadsCount: 5, phoneClicks: 3, formLeads: 2, googleAdsSpend: 88, metaAdsSpend: 40, avgCpl: 25.60, topGooglePosition: 2 },
  { date: "2026-07-21", leadsCount: 3, phoneClicks: 2, formLeads: 1, googleAdsSpend: 65, metaAdsSpend: 20, avgCpl: 28.33, topGooglePosition: 1 },
  { date: "2026-07-22", leadsCount: 6, phoneClicks: 4, formLeads: 2, googleAdsSpend: 92, metaAdsSpend: 45, avgCpl: 22.83, topGooglePosition: 1 },
];

export const DEMO_LEADS_HISTORY: LeadItem[] = [
  { id: "lead_101", date: "2026-07-22 14:15", type: 'phone', source: 'Google Ads', clientName: "Marek Nowak", contact: "+48 601 234 567", details: "Zapytanie o meble kuchenne na wymiar", status: 'Nowy' },
  { id: "lead_102", date: "2026-07-22 11:30", type: 'form', source: 'Google Organic (SEO)', clientName: "Piotr Wiśniewski", contact: "piotr@firma.pl", details: "Prośba o wycenę szafy przesuwnej w Poznaniu", status: 'Nowy' },
  { id: "lead_103", date: "2026-07-21 16:45", type: 'phone', source: 'Google Ads', clientName: "Tomasz Zieliński", contact: "+48 789 112 233", details: "Montaż blatu dębowego", status: 'W kontakcie' },
  { id: "lead_104", date: "2026-07-21 09:20", type: 'form', source: 'Meta Ads', clientName: "Karolina Szymańska", contact: "k.szymanska@gmail.com", details: "Zgłoszenie z reklamy Instagram Ads", status: 'Zrealizowany' },
  { id: "lead_105", date: "2026-07-20 18:10", type: 'phone', source: 'Google Organic (SEO)', clientName: "Adam Malinowski", contact: "+48 505 443 221", details: "Telefon z Google Maps (Wizytówka)", status: 'Zrealizowany' },
];
