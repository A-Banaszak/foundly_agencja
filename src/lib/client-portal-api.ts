export type ClientAccount = {
  id: string;
  clientName: string;
  companyName: string;
  email: string;
  ga4PropertyId: string;
  googleAdsCustomerId: string;
  metaAdAccountId: string;
  gscSiteUrl: string;
  createdAt: string;
};

export type DailyMetric = {
  date: string;
  impressions: number;
  clicks: number;
  phoneClicks: number;
  formSubmissions: number;
  googleAdsSpend: number;
  metaAdsSpend: number;
  avgCpc: number;
  avgCostPerAction: number;
  topGooglePosition: number;
};

// Demo Client Account
export const DEMO_CLIENT_ACCOUNT: ClientAccount = {
  id: "cli_demo_01",
  clientName: "Jan Kowalski",
  companyName: "Kowalski Usługi Stolarskie",
  email: "demo@foundly.pl",
  ga4PropertyId: "389201948",
  googleAdsCustomerId: "849-201-9482",
  metaAdAccountId: "act_492019482",
  gscSiteUrl: "https://kowalski-stolarstwo.pl",
  createdAt: "2026-06-01"
};

// Fully Anonymized Performance Statistics (Zero Personal Data / Zero GDPR Risk)
export const DEMO_DAILY_METRICS: DailyMetric[] = [
  { date: "2026-07-16", impressions: 420, clicks: 38, phoneClicks: 2, formSubmissions: 1, googleAdsSpend: 54, metaAdsSpend: 0, avgCpc: 1.42, avgCostPerAction: 18.00, topGooglePosition: 4 },
  { date: "2026-07-17", impressions: 510, clicks: 44, phoneClicks: 3, formSubmissions: 1, googleAdsSpend: 62, metaAdsSpend: 25, avgCpc: 1.97, avgCostPerAction: 21.75, topGooglePosition: 3 },
  { date: "2026-07-18", impressions: 380, clicks: 29, phoneClicks: 1, formSubmissions: 0, googleAdsSpend: 40, metaAdsSpend: 0, avgCpc: 1.38, avgCostPerAction: 40.00, topGooglePosition: 3 },
  { date: "2026-07-19", impressions: 680, clicks: 52, phoneClicks: 3, formSubmissions: 2, googleAdsSpend: 75, metaAdsSpend: 30, avgCpc: 2.02, avgCostPerAction: 21.00, topGooglePosition: 2 },
  { date: "2026-07-20", impressions: 740, clicks: 61, phoneClicks: 4, formSubmissions: 2, googleAdsSpend: 88, metaAdsSpend: 40, avgCpc: 2.10, avgCostPerAction: 21.33, topGooglePosition: 2 },
  { date: "2026-07-21", impressions: 590, clicks: 48, phoneClicks: 3, formSubmissions: 1, googleAdsSpend: 65, metaAdsSpend: 20, avgCpc: 1.77, avgCostPerAction: 21.25, topGooglePosition: 1 },
  { date: "2026-07-22", impressions: 830, clicks: 70, phoneClicks: 5, formSubmissions: 3, googleAdsSpend: 92, metaAdsSpend: 45, avgCpc: 1.95, avgCostPerAction: 17.12, topGooglePosition: 1 },
];
