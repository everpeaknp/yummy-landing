"use client";

import { useTheme } from "@/hooks/useTheme";

const steps = [
  {
    number: 1,
    icon: "person_add",
    title: "Create Account",
    description:
      "Sign up instantly with your email. No credit card required for the trial.",
    highlight: false,
    iconColor: "#ff6929",
  },
  {
    number: 2,
    icon: "restaurant_menu",
    title: "Setup Menu",
    description:
      "Add your categories, items, and tables. Configure your floor plan easily.",
    highlight: false,
    iconColor: "#3b82f6",
  },
  {
    number: 3,
    icon: "point_of_sale",
    title: "Start Selling",
    description:
      "Take orders, print KOTs, and manage billing instantly. Watch your business grow.",
    highlight: true,
    iconColor: "#ffffff",
  },
];

export function Process() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section 
      id="process" 
      className="py-24" 
      style={{ backgroundColor: isDark ? '#050505' : '#ffffff' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-4xl font-black font-display mb-4"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            Start in 3 Simple Steps
          </h2>
          <p className="text-lg" style={{ color: '#64748b' }}>
            The fastest setup in the industry. Go live in minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-8 rounded-3xl relative overflow-hidden group"
              style={step.highlight 
                ? { 
                    backgroundColor: isDark ? '#ffffff' : '#0f172a', 
                    color: isDark ? '#000000' : '#ffffff', 
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' 
                  }
                : { 
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', 
                    border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #f1f5f9' 
                  }
              }
            >
              {/* Background Number */}
              <div
                className="absolute -right-4 -top-4 text-9xl font-black z-0 group-hover:scale-110 transition-transform"
                style={{ 
                  color: step.highlight 
                    ? (isDark ? '#e2e8f0' : 'rgba(255,255,255,0.1)') 
                    : (isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0') 
                }}
              >
                {step.number}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-2xl"
                  style={{ 
                    backgroundColor: step.highlight 
                      ? (isDark ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)') 
                      : (isDark ? 'rgba(255,255,255,0.1)' : '#ffffff'),
                    boxShadow: step.highlight ? 'none' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    color: step.highlight ? (isDark ? '#000000' : '#ffffff') : step.iconColor
                  }}
                >
                  <span className="material-symbols-outlined">{step.icon}</span>
                </div>
                <h3 
                  className="text-2xl font-bold font-display mb-3"
                  style={{ color: step.highlight ? undefined : (isDark ? '#ffffff' : '#0f172a') }}
                >
                  {step.title}
                </h3>
                <p style={{ 
                  color: step.highlight ? undefined : (isDark ? '#94a3b8' : '#475569'),
                  opacity: step.highlight ? 0.9 : 1
                }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
