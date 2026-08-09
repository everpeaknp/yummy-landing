/**
 * Pricing Plans Configuration
 * Single source of truth for all plan data, features, and pricing
 */

export type BillingPeriod = 'monthly' | 'yearly' | '6month';
export type PlanTier = 'free' | 'basic' | 'pro' | 'premium' | 'enterprise';

export interface PlanPrice {
  period: BillingPeriod;
  amount: number; // in Rs.
  renewalAmount?: number; // if different from initial (for discounts)
  displayLabel: string; // e.g., "Rs. 20,000 / year"
  renewalLabel?: string; // e.g., "Renews at Rs. 12,000/year"
  originalAmount?: number; // Original price before discount (for strikethrough)
}

export interface PlanFeature {
  text: string;
  included: boolean; // true = checkmark, false = locked/greyed
}

export interface Plan {
  id: PlanTier;
  name: string;
  description: string;
  prices: PlanPrice[];
  features: PlanFeature[];
  isPopular?: boolean;
  ctaText: string;
  ctaHref: string;
  order: number;
}

export interface EnterprisePlan {
  id: 'enterprise';
  name: string;
  description: string;
  priceLabel: string;
  features: PlanFeature[];
  addOns: Array<{ name: string; price: string }>;
  ctaText: string;
  ctaHref: string;
}

// ============================================
// NORMAL PLANS
// ============================================

export const normalPlans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for small cafes and food trucks just getting started.',
    prices: [
      {
        period: 'yearly',
        amount: 0,
        displayLabel: 'Rs. 0 / forever',
      },
      {
        period: 'monthly',
        amount: 0,
        displayLabel: 'Rs. 0 / forever',
      },
    ],
    features: [
      { text: 'Up to 2 Users Login', included: true },
      { text: 'Up to 5 Tables', included: true },
      { text: 'Up to 50 Menu Items', included: true },
      { text: 'Up to 2 Staff Members', included: true },
      { text: 'Basic Ordering System', included: true },
      { text: 'No Inventory Management', included: false },
      { text: 'No Add-ons or Modifiers', included: false },
      { text: 'No Payroll Management', included: false },
      { text: 'No Daybook Closing', included: false },
      { text: 'No BOT', included: false },
      { text: 'No Customer Management (CRM)', included: false },
    ],
    ctaText: 'Get Started',
    ctaHref: 'https://app.yummyever.com/',
    order: 1,
  },
  {
    id: 'basic',
    name: 'Basic',
    description: 'For small to medium standalone restaurants.',
    prices: [
      {
        period: 'yearly',
        amount: 11400,
        renewalAmount: 11400,
        displayLabel: 'Rs. 11,400 / year',
        // Flat renewal rate - no originalAmount to show strikethrough
      },
      {
        period: '6month',
        amount: 6000,
        displayLabel: 'Rs. 6,000 / 6 months',
        // Flat rate - no originalAmount to show strikethrough
      },
    ],
    features: [
      { text: 'Up to 5 Users Login', included: true },
      { text: 'Up to 15 Tables', included: true },
      { text: 'Up to 300 Menu Items', included: true },
      { text: 'Up to 15 Staff Members', included: true },
      { text: 'Ordering System (Dine-in, Takeaway, Delivery)', included: true },
      { text: 'Reservations', included: true },
      { text: 'Digital QR Menu Ordering', included: true },
      { text: 'Full KOT & BOT Management', included: true },
      { text: 'Daybook Closing & Cash Drawer Sessions', included: true },
      { text: 'Payroll Management', included: true },
      { text: 'Basic Income & Expense Tracking', included: true },
      { text: 'No Inventory Management', included: false },
      { text: 'No Recipe Costing', included: false },
      { text: 'No Customer Database (CRM)', included: false },
    ],
    ctaText: 'Get Started',
    ctaHref: 'https://app.yummyever.com/',
    order: 2,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Everything a growing restaurant needs to scale efficiently.',
    prices: [
      {
        period: 'yearly',
        amount: 20000,
        renewalAmount: 12000, // 40% renewal discount
        displayLabel: 'Rs. 20,000 / year',
        originalAmount: 50000, // Show original price
      },
      {
        period: '6month',
        amount: 12500,
        displayLabel: 'Rs. 12,500 / 6 months',
        // Flat rate - no discount on 6-month plan
      },
    ],
    features: [
      { text: 'Everything in Basic, plus:', included: true },
      { text: 'Up to 20 Users Login', included: true },
      { text: 'Up to 50 Tables', included: true },
      { text: 'Up to 1,000 Menu Items', included: true },
      { text: 'Inventory & Stock Management (low stock alerts)', included: true },
      { text: 'Recipe Costing & Profit Analysis', included: true },
      { text: 'Customer Database (CRM & Loyalty)', included: true },
      { text: 'Customer Feedback Module', included: true },
      { text: 'Staff Performance Tracking', included: true },
      { text: 'Live Sales & Finance Insights', included: true },
      { text: 'No Multi-Location Management', included: false },
      { text: 'No Payment Gateway Integration', included: false },
    ],
    isPopular: true,
    ctaText: 'Start Free Trial',
    ctaHref: 'https://app.yummyever.com/',
    order: 3,
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'For high-volume restaurants, multi-branch chains, and busy lounges.',
    prices: [
      {
        period: 'yearly',
        amount: 44999,
        renewalAmount: 22500, // 50% renewal discount
        displayLabel: 'Rs. 44,999 / year',
        originalAmount: 99000, // Show original price
      },
      // NO 6-month option - only yearly pricing available for Premium
    ],
    features: [
      { text: 'Everything in Pro, plus:', included: true },
      { text: 'Unlimited Users Login', included: true },
      { text: 'Unlimited Tables', included: true },
      { text: 'Unlimited Menu Items', included: true },
      { text: 'Unlimited Staff Members', included: true },
      { text: 'Unlimited Customer Management', included: true },
      { text: 'Multi-Location Management', included: true },
      { text: 'Biometric Attendance Module', included: true },
      { text: 'Fonepay / Payment Gateways Integration', included: true },
      { text: 'eBilling / IRD CBMS Integration Setup', included: true },
      { text: 'Priority 24/7 Support', included: true },
    ],
    ctaText: 'Get Started',
    ctaHref: 'https://app.yummyever.com/',
    order: 4,
  },
];

// ============================================
// ENTERPRISE PLAN
// ============================================

export const enterprisePlan: EnterprisePlan = {
  id: 'enterprise',
  name: 'Enterprise',
  description: 'For hotels, resorts, and massive corporate operations needing heavy, specialized ERP tools.',
  priceLabel: 'Custom Pricing',
  features: [
    { text: 'Everything in Premium, plus:', included: true },
    { text: 'Hotel Module (room management, room service, guest folio billing sync)', included: true },
    { text: 'Extensive Detailed Accounting Module (Aging Reports AR/AP, Full Ledger, Balance Sheet generation)', included: true },
    { text: 'Dedicated Server & Database', included: true },
    { text: 'Advanced API & Webhook Integrations', included: true },
    { text: 'Dedicated Account Manager', included: true },
  ],
  addOns: [
    { name: 'Accounting Module', price: 'Rs. 18,000' },
    { name: 'Hotel Module', price: 'Rs. 35,000' },
    { name: 'API Integrations', price: 'Custom quote' },
  ],
  ctaText: "Let's Chat",
  ctaHref: '/contact',
};

// ============================================
// FEATURE ROUTE GATING
// ============================================

export interface RouteGate {
  path: string; // route pattern (supports wildcards)
  requiredPlan: PlanTier; // minimum plan tier required
  featureName: string; // user-friendly feature name for upgrade prompt
}

/**
 * Route access rules for feature gating
 * Note: This is UX-layer only. Django backend RBAC is the real enforcement.
 */
export const routeGates: RouteGate[] = [
  // Inventory requires Pro+
  { path: '/dashboard/inventory/*', requiredPlan: 'pro', featureName: 'Inventory Management' },
  { path: '/dashboard/inventory', requiredPlan: 'pro', featureName: 'Inventory Management' },
  { path: '/dashboard/stock/*', requiredPlan: 'pro', featureName: 'Stock Management' },
  { path: '/dashboard/recipe-costing/*', requiredPlan: 'pro', featureName: 'Recipe Costing' },
  
  // Payroll requires Basic+
  { path: '/dashboard/payroll/*', requiredPlan: 'basic', featureName: 'Payroll Management' },
  { path: '/dashboard/payroll', requiredPlan: 'basic', featureName: 'Payroll Management' },
  { path: '/dashboard/daybook/*', requiredPlan: 'basic', featureName: 'Daybook Closing' },
  
  // Multi-location requires Premium+
  { path: '/dashboard/multi-location/*', requiredPlan: 'premium', featureName: 'Multi-Location Management' },
  { path: '/dashboard/locations/*', requiredPlan: 'premium', featureName: 'Multi-Location Management' },
  { path: '/dashboard/biometric/*', requiredPlan: 'premium', featureName: 'Biometric Attendance' },
  
  // Hotel module requires Enterprise
  { path: '/dashboard/hotel/*', requiredPlan: 'enterprise', featureName: 'Hotel Module' },
  { path: '/dashboard/rooms/*', requiredPlan: 'enterprise', featureName: 'Hotel Module' },
  { path: '/dashboard/accounting/*', requiredPlan: 'enterprise', featureName: 'Advanced Accounting' },
  
  // CRM requires Pro+
  { path: '/dashboard/crm/*', requiredPlan: 'pro', featureName: 'Customer Management (CRM)' },
  { path: '/dashboard/customers/*', requiredPlan: 'pro', featureName: 'Customer Management (CRM)' },
  { path: '/dashboard/loyalty/*', requiredPlan: 'pro', featureName: 'Loyalty Program' },
];

/**
 * Plan tier hierarchy for access checks
 */
export const planHierarchy: Record<PlanTier, number> = {
  free: 0,
  basic: 1,
  pro: 2,
  premium: 3,
  enterprise: 4,
};

/**
 * Check if a user's plan has access to a required plan tier
 */
export function hasAccess(userPlan: PlanTier, requiredPlan: PlanTier): boolean {
  return planHierarchy[userPlan] >= planHierarchy[requiredPlan];
}

/**
 * Get the route gate for a given path
 */
export function getRouteGate(pathname: string): RouteGate | null {
  return routeGates.find((gate) => {
    const pattern = gate.path.replace(/\*/g, '.*');
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(pathname);
  }) || null;
}

/**
 * Get price for a specific billing period
 */
export function getPlanPrice(plan: Plan, period: BillingPeriod): PlanPrice | undefined {
  return plan.prices.find((p) => p.period === period);
}
