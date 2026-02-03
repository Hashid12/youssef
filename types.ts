
export interface DomainSuggestion {
  name: string;
  extension: string;
  price: string;
  numericPrice: number; // For sorting
  status: 'available' | 'premium' | 'taken';
  category: string;
  popularity: number; // 1-100 scale
  dateAdded: string; // ISO string
  reason?: string;
  isDirectListing?: boolean; // Flag for user-owned domains
}

export interface DomainAppraisal {
  domain: string;
  estimatedValue: string;
  brandabilityScore: number;
  seoPotential: number;
  marketDemand: string;
  bestSuitedFor: string[];
  verdict: string;
}

export interface DomainAnalytics {
  domain: string;
  visitors: { month: string; count: number }[];
  cpa: string;
  cpc: string;
  searchVolume: string;
  domainHistory: { year: string; event: string }[];
  marketIndex: number; // 1-100
  socialMentions: number;
}

export interface NavItem {
  label: string;
  path: string;
}
