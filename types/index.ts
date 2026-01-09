/**
 * Common types used throughout the application
 */

export interface NavLink {
  href: string;
  label: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface PricingPlan {
  name: string;
  price: string;
  description?: string;
  features: string[];
  cta: string;
  href: string;
  popular?: boolean;
}

export interface Step {
  number: number;
  icon: string;
  title: string;
  description: string;
  highlight?: boolean;
}
