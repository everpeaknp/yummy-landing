"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/constants";
import { useTheme } from "@/hooks/useTheme";

const plans = [
  {
    name: "Starter",
    price: "Coming Soon",
    features: ["Single Location", "POS & KOT"],
    cta: null,
    href: null,
    popular: false,
  },
  {
    name: "Pro",
    price: "Open Beta",
    description: "Everything you need to run a professional restaurant.",
    features: ["Unlimited Inventory", "Table Management", "Advanced Reports"],
    cta: "Start Free Trial",
    href: siteConfig.links.app,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Multi-location", "Custom Integrations"],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
  },
];

export function Pricing() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="pricing"
      className="py-24"
      style={{ 
        backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', 
        borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #e2e8f0' 
      }}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <h2 
          className="text-3xl sm:text-4xl font-black font-display mb-4"
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
        >
          Simple, Transparent Pricing
        </h2>
        <p className="mb-16" style={{ color: '#64748b' }}>No hidden fees. Cancel anytime.</p>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-start max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-8 rounded-3xl relative ${plan.popular ? 'transform scale-105' : ''}`}
              style={plan.popular 
                ? { backgroundColor: '#ff6929', color: '#ffffff', boxShadow: '0 20px 25px -5px rgba(255, 105, 41, 0.25)' }
                : { 
                    backgroundColor: isDark ? '#0a0a0a' : '#ffffff', 
                    border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0' 
                  }
              }
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <span 
                    className="text-[10px] uppercase font-bold px-3 py-1 rounded-full"
                    style={{ backgroundColor: '#000000', color: '#ffffff' }}
                  >
                    Most Popular
                  </span>
                </div>
              )}

              <h3 
                className="font-bold text-xl mb-2"
                style={{ color: plan.popular ? '#ffffff' : (isDark ? '#ffffff' : '#0f172a') }}
              >
                {plan.name}
              </h3>
              <div
                className={`text-3xl font-black mb-6 ${plan.name === "Pro" ? "text-4xl" : ""}`}
                style={{ color: plan.popular ? '#ffffff' : '#94a3b8' }}
              >
                {plan.price}
              </div>

              {plan.description && (
                <p
                  className="text-sm mb-8"
                  style={{ color: plan.popular ? 'rgba(255,255,255,0.9)' : '#64748b' }}
                >
                  {plan.description}
                </p>
              )}

              {/* CTA Button */}
              {plan.cta && plan.href && (
                <Link
                  href={plan.href}
                  className="block w-full py-3 rounded-xl font-bold transition-colors mb-8"
                  style={plan.popular 
                    ? { backgroundColor: '#ffffff', color: '#ff6929' }
                    : { 
                        border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid #e2e8f0', 
                        color: isDark ? '#ffffff' : '#0f172a' 
                      }
                  }
                >
                  {plan.cta}
                </Link>
              )}

              {/* Features */}
              <ul
                className="space-y-3 text-sm text-left"
                style={{ color: plan.popular ? 'rgba(255,255,255,0.9)' : '#64748b' }}
              >
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span
                      className="material-symbols-outlined text-sm"
                      style={{ color: plan.popular ? '#ffffff' : '#22c55e' }}
                    >
                      check
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
