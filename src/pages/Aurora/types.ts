export interface SalesTier {
  name: string;
  count: number;
  commission: number;
}

export interface CompensationRule {
  role: string;
  condition: string;
  payout: string;
  details: string;
}

export interface AuroraBenefit {
  item: string;
  marketPrice: number;
  description: string;
}
