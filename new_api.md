# Yummy Landing Page API Reference

Complete API documentation for the Next.js frontend.

---

## Icon Library

All icon fields use **Material Symbols**. Browse icons at: https://fonts.google.com/icons

---

## Base URL
```
http://localhost:8000/api/
```

---

## Core & Theme

### GET `/config/site/`
Site configuration with branding.

```json
{
  "siteName": "Yummy POS",
  "tagline": "Yummy Ever",
  "description": "Yummy is the best restaurant...",
  "productionUrl": "https://yummypos.com",
  "appLoginUrl": "https://app.yummyever.com/",
  "companyName": "Everacy",
  "copyrightText": "© 2026 Everacy. All rights reserved.",
  "logo": {
    "lightModeSrc": "/media/logos/light.svg",
    "darkModeSrc": "/media/logos/dark.svg",
    "favicon": "/media/logos/favicon.ico"
  },
  "themeSettings": {
    "darkModeEnabled": true,
    "darkModeToggleVisible": true,
    "defaultTheme": "system"
  },
  "socialLinks": [
    { "platform": "Facebook", "url": "https://...", "icon": "facebook", "order": 1 }
  ]
}
```

### GET `/theme/colors/`
All theme colors with light/dark variants.

```json
{
  "primary": { "light": "#ff6929", "dark": "#ff6929", "description": "Brand primary" },
  "background": { "light": "#ffffff", "dark": "#0a0a0a", "description": "Page background" },
  "textPrimary": { "light": "#0f172a", "dark": "#ffffff", "description": "Main text" }
  // ... 27 total colors
}
```

### GET `/theme/buttons/`
Button styles with all states.

```json
{
  "primary": {
    "light": {
      "background": "linear-gradient(...)",
      "backgroundHover": "...",
      "text": "#ffffff",
      "border": "",
      "borderHover": "",
      "shadow": "0 4px 14px...",
      "shadowHover": "..."
    },
    "dark": { ... }
  },
  "secondary": { ... },
  "outline": { ... },
  "ghost": { ... },
  "login": { ... }
}
```

### GET `/theme/components/`
All component-specific styles.

### GET `/theme/components/:name/`
Single component style by name (e.g., `navbar`, `footer`, `pricingCard`).

---

## Navigation

### GET `/navigation/main/`
Complete navbar configuration - all fields editable in Admin.

```json
{
  "logo": {
    "lightModeSrc": "/images/yummy_logo_orange.png",
    "darkModeSrc": "/images/yummy_logo.png",
    "text": "Yummy Ever",
    "href": "/"
  },
  "items": [
    {
      "title": "Features",
      "href": "/features",
      "hasMegaMenu": true,
      "megaMenuType": "features",
      "order": 1,
      "megaMenuItems": [
        { "name": "Smart Inventory", "href": "/features/smart-inventory", "icon": "inventory_2", "description": "Track stock", "order": 1 }
      ]
    },
    { "title": "Pricing", "href": "/pricing", "hasMegaMenu": false, "order": 2 }
  ],
  "themeToggle": {
    "visible": true,
    "lightModeIcon": "dark_mode",
    "darkModeIcon": "light_mode"
  },
  "loginButton": {
    "text": "Login",
    "href": "https://app.yummyever.com/",
    "visible": true,
    "lightBackground": "#0f172a",
    "lightText": "#ffffff",
    "darkBackground": "#ffffff",
    "darkText": "#0f172a"
  },
  "colors": { ... },
  "megaMenuColors": { ... }
}
```

### GET `/navigation/footer/`
Complete footer configuration - all fields editable in Admin.

```json
{
  "brand": {
    "logoLight": "/media/footer/logo-light.png",
    "logoDark": "/media/footer/logo-dark.png",
    "name": "Yummy Ever",
    "tagline": "Building innovative restaurant solutions for the modern world."
  },
  "columns": [
    {
      "title": "Quick Links",
      "order": 1,
      "links": [
        { "label": "Home", "href": "/", "order": 1 },
        { "label": "Features", "href": "/features", "order": 2 }
      ]
    },
    {
      "title": "Product",
      "order": 2,
      "links": [
        { "label": "Smart Inventory", "href": "/features/smart-inventory", "order": 1 }
      ]
    }
  ],
  "socialLinks": [
    { "platform": "Facebook", "url": "https://facebook.com/yummyever", "icon": "facebook", "order": 1 },
    { "platform": "Twitter", "url": "https://twitter.com/yummyever", "icon": "twitter", "order": 2 },
    { "platform": "Instagram", "url": "https://instagram.com/yummyever", "icon": "instagram", "order": 3 }
  ],
  "contact": {
    "title": "Contact Us",
    "address": "Chhorepatan, Pokhara\nGandaki Province, Nepal",
    "email": "yummyever.np@gmail.com",
    "phone": "+977 9807134097"
  },
  "copyright": {
    "text": "© 2026 Yummy Ever. All rights reserved.",
    "poweredBy": {
      "text": "By Everacy",
      "href": "https://everacy.com",
      "logoUrl": "/media/footer/everacy_logo.png"
    }
  },
  "legalLinks": [
    { "label": "Privacy Policy", "href": "/privacy-policy", "order": 1 },
    { "label": "Terms of Service", "href": "/terms-and-conditions", "order": 2 },
    { "label": "Cookies", "href": "/cookies", "order": 3 }
  ],
  "colors": { ... }
}
```

---

## SEO

### GET `/seo/global/`
Global SEO defaults.

```json
{
  "titleTemplate": "%s | Yummy POS",
  "defaultDescription": "Yummy is the best...",
  "defaultKeywords": "restaurant POS Nepal, IRD billing",
  "twitterHandle": "@yummypos",
  "canonicalDomain": "https://yummypos.com",
  "googleAnalyticsId": "",
  "facebookPixelId": "",
  "defaultOgImage": "/media/seo/og-image.png"
}
```

### GET `/seo/pages/`
All page SEO configs keyed by page ID.

### GET `/seo/page/:pageId/`
SEO for specific page (e.g., `home`, `pricing`, `faq`).

```json
{
  "pageId": "home",
  "metaTitle": "Yummy POS - Best Restaurant Management Software",
  "metaDescription": "...",
  "metaKeywords": "...",
  "ogTitle": "...",
  "ogDescription": "...",
  "ogImage": "/media/seo/pages/home.png",
  "jsonLd": { "@context": "https://schema.org", ... }
}
```

---

## Home Page

### GET `/pages/home/`
Complete homepage (all sections combined).

### GET `/pages/home/hero/`
```json
{
  "badge": { "icon": "verified", "text": "Made for Nepal", "emoji": "🇳🇵" },
  "headline": { "line1": "Manage your", "line2": "Restaurant,", "highlightWord": "Effortlessly.", "highlightColor": "#ff6929" },
  "subheadline": "The #1 Restaurant OS...",
  "buttons": [{ "text": "Start Free Trial", "href": "/pricing", "type": "primary", "icon": null, "successText": "Launching...", "order": 1 }],
  "badgeColors": { "light": { "background": "#ffedd5", "text": "#c2410c" }, "dark": { ... } }
}
```

### GET `/pages/home/process/`
```json
{
  "badgeText": "Easy Start",
  "title": "Start in 3 Simple Steps",
  "subtitle": "...",
  "steps": [{ "number": "01", "icon": "person_add", "iconColor": "#ff6929", "title": "Create Account", "description": "...", "isHighlighted": false, "order": 1 }],
  "badgeColors": { ... },
  "normalCardColors": { ... },
  "highlightedCardColors": { ... }
}
```

### GET `/pages/home/testimonials/`
```json
{
  "title": "Trusted by the Best",
  "subtitle": "Join 500+ restaurants...",
  "cards": [{ "imageUrl": "/media/testimonials/...", "quote": "...", "author": "Baje Ko Sekuwa", "order": 1 }],
  "cardColors": { ... }
}
```

### GET `/pages/home/about/`
```json
{
  "title": { "prefix": "What is", "highlight": "Yummy", "suffix": "?" },
  "description": "Discover Yummy...",
  "videoUrl": "/media/about/video.mp4",
  "thumbnailUrl": "/media/about/thumbnail.jpg",
  "videoCardShadow": { "light": "0 25px 50px...", "dark": "..." }
}
```

### GET `/pages/home/features/`
```json
{
  "badge": { "icon": "bolt", "text": "Powerful Features" },
  "title": "Everything you need.",
  "subtitle": "...",
  "cards": [{
    "id": "inventory",
    "title": "Smart Inventory",
    "description": "...",
    "icon": "inventory_2",
    "iconColor": "#16a34a",
    "gridSpan": "wide",
    "mockData": { "items": [...] },
    "order": 1,
    "iconColors": { "light": { "background": "#f0fdf4", "icon": "#16a34a" }, "dark": { ... } }
  }],
  "cardColors": { ... }
}
```

### GET `/pages/home/gallery/`
```json
{
  "title": "What Yummy offers?",
  "subtitle": "...",
  "features": [{
    "id": "track",
    "title": "Track Every Order",
    "description": "...",
    "icon": "dashboard",
    "imageUrl": "/media/gallery/...",
    "bulletPoints": ["Active Orders Dashboard", "Order History Log"],
    "order": 1
  }],
  "accordionColors": { ... },
  "stepIndicatorColors": { ... }
}
```

### GET `/pages/home/launch-phases/`
```json
{
  "title": "Launch and Scale",
  "phases": [{
    "label": "PHASE 1",
    "title": "Setup",
    "color": "orange",
    "order": 1,
    "cards": [{ "title": "Create Profile", "description": "...", "imageUrl": "...", "order": 1 }],
    "badgeColors": { ... }
  }]
}
```

---

## Pricing

### GET `/pages/pricing/`
```json
{
  "title": "Simple, Transparent Pricing",
  "subtitle": "...",
  "toggle": { "monthlyLabel": "Monthly", "yearlyLabel": "Yearly", "savingsLabel": "SAVE 33%" },
  "annualSavingsLabel": "SAVE 33%",
  "savingsPercentage": 33,
  "promotionBanner": { "icon": "celebration", "text": "Free Installation valid until", "highlightText": "February!" },
  "plans": [{
    "name": "Starter",
    "priceMonthly": "Free",
    "priceYearly": "Free",
    "description": "...",
    "features": [{ "text": "Single Outlet", "order": 1 }],
    "ctaText": "Get Started",
    "ctaHref": "https://app.yummyever.com/",
    "isPopular": false,
    "popularLabel": null,
    "order": 1
  }],
  "faqs": [{ "question": "Can I switch plans?", "answer": "...", "order": 1 }],
  "cardColors": { ... },
  "faqColors": { ... }
}
```

---

## FAQ

### GET `/pages/faq/`
```json
{
  "title": "Frequently Asked Questions",
  "subtitle": "...",
  "contactPrompt": { "text": "Chat to our friendly team.", "linkText": "Contact", "linkHref": "/contact" },
  "categories": [{
    "title": "Billing & Subscriptions",
    "order": 1,
    "questions": [{ "question": "What payment methods?", "answer": "...", "order": 1 }]
  }],
  "accordionColors": { ... }
}
```

---

## Careers

### GET `/pages/careers/`
```json
{
  "badge": "WE ARE HIRING",
  "title": "Join the Revolution",
  "subtitle": "...",
  "searchPlaceholder": "Search for roles...",
  "applicationEmail": "yummyever.np@gmail.com",
  "emptyState": { "title": "No positions found", "message": "..." },
  "categories": ["All", "Engineering", "Design", "Sales"],
  "jobs": [{ "title": "Senior Frontend Engineer", "department": "Engineering", "type": "Full-time", "location": "Remote", "description": "...", "isActive": true, "order": 1 }],
  "categoryButtonColors": { ... },
  "jobCardColors": { ... }
}
```

---

## Team

### GET `/pages/team/`
```json
{
  "title": "Meet the Team",
  "subtitle": "...",
  "companyHighlight": "Everacy",
  "companyDescription": "...",
  "values": [{ "icon": "target", "iconColor": "#ff6929", "title": "Our Mission", "description": "...", "order": 1 }],
  "members": [{ "name": "John Doe", "role": "CEO", "photoUrl": "/media/team/...", "bio": "...", "order": 1 }],
  "joinSection": { "title": "Want to join us?", "description": "...", "ctaText": "View Careers", "ctaHref": "/careers" },
  "valueCardColors": { ... }
}
```

---

## Contact

### GET `/pages/contact/`
```json
{
  "title": "Get in Touch",
  "subtitle": "...",
  "formTitle": "Send us a Message",
  "submitButtonText": "Send Message",
  "mapEmbedUrl": "https://www.google.com/maps/embed?...",
  "contactItems": [
    { 
      "icon": "location_on", 
      "title": "Our Office", 
      "content": "Chhorepatan, Pokhara\nGandaki Province, Nepal",
      "iconColors": { "light": { "background": "#ffedd5", "icon": "#ea580c" }, "dark": { "background": "rgba(234, 88, 12, 0.3)", "icon": "#fb923c" } }
    },
    { 
      "icon": "mail", 
      "title": "Email Us", 
      "emails": ["yummyever.np@gmail.com"],
      "iconColors": { "light": { "background": "#dbeafe", "icon": "#2563eb" }, "dark": { "background": "rgba(37, 99, 235, 0.3)", "icon": "#60a5fa" } }
    },
    { 
      "icon": "phone", 
      "title": "Call Us", 
      "phone": "+977 9807134097", 
      "hours": "Sun-Fri, 9am - 6pm",
      "iconColors": { "light": { "background": "#dcfce7", "icon": "#16a34a" }, "dark": { "background": "rgba(22, 163, 74, 0.3)", "icon": "#4ade80" } }
    }
  ],
  "formCategories": ["General Inquiry", "Sales & Pricing", "Technical Support"],
  "formColors": { ... }
}
```

### POST `/contact/submit/`
Submit contact form.

---

## Help

### GET `/pages/help/`
```json
{
  "title": "Help Center",
  "subtitle": "How can we help you today?",
  "searchPlaceholder": "Search for answers...",
  "linkColumns": [{ "order": 1, "links": [{ "label": "Billing", "href": "/faq", "order": 1 }] }],
  "noResultsText": "No results found",
  "searchColors": { ... },
  "linkColors": { ... }
}
```

---

## Blog

### GET `/blog/`
Get complete blog page data including settings, categories, and posts.

```json
{
  "title": "Yummyever Blogs",
  "subtitle": "Latest insights, tips, and trends from the restaurant industry.",
  "pageColors": {
    "light": {
      "titleColor": "#0f172a",
      "subtitleColor": "#64748b"
    },
    "dark": {
      "titleColor": "#ffffff",
      "subtitleColor": "#94a3b8"
    }
  },
  "categories": [
    { "name": "All", "slug": "all" },
    { "name": "Restaurant Tips", "slug": "restaurant-tips" },
    { "name": "Technology", "slug": "technology" }
  ],
  "posts": [
    {
      "slug": "restaurant-trends-2024",
      "title": "Top 5 Restaurant Trends...",
      "excerpt": "...",
      "imageUrl": "/media/blog/...",
      "date": "Jan 10, 2024",
      "author": { "name": "Yummy Team", "photoUrl": "...", "bio": "..." },
      "category": { "name": "Restaurant Tips", "slug": "restaurant-tips" },
      "cardTextColor": "#ffffff",
      "cardTextColorDark": "#ffffff",
      "cardOverlayOpacity": 0.5,
      "metaTitle": "...",
      "metaDescription": "...",
      "keywords": "...",
      "order": 1
    }
  ]
}
```

### GET `/blog/:slug/`
Single blog post with full content.

```json
{
  "slug": "restaurant-trends-2024",
  "title": "Top 5 Restaurant Trends...",
  "content": "<p>Full HTML content...</p>",
  "excerpt": "...",
  "imageUrl": "/media/blog/...",
  "date": "Jan 10, 2024",
  "author": { "name": "Yummy Team", "photoUrl": "...", "bio": "..." },
  "category": { "name": "Restaurant Tips", "slug": "restaurant-tips" },
  "cardTextColor": "#ffffff",
  "cardTextColorDark": "#ffffff",
  "cardOverlayOpacity": 0.5,
  "metaTitle": "...",
  "metaDescription": "...",
  "keywords": "...",
  "order": 1
}
```

---

## Features

### GET `/features/`
List all feature pages.

```json
[{
  "slug": "smart-inventory",
  "title": "Smart Inventory",
  "subtitle": "Track stock in real-time...",
  "icon": "inventory_2",
  "heroImage": "/media/features/...",
  "metaTitle": "...",
  "metaDescription": "...",
  "order": 1,
  "sections": [...]
}]
```

### GET `/features/:slug/`
Single feature page with rich sections.

```json
{
  "slug": "smart-inventory",
  "title": "Smart Inventory",
  "subtitle": "Ingredients are deducted automatically as you sell.",
  "icon": "inventory_2",
  "heroImage": null,
  "metaTitle": "Smart Inventory - Yummy POS",
  "metaDescription": "...",
  "order": 1,
  "sections": [
    {
      "subheading": "Smart Inventory",
      "heading": "Precision Control.",
      "image": "https://images.unsplash.com/photo-...",
      "content": {
        "title": "Real-time Tracking",
        "description": "Never guess what's in your pantry again...",
        "features": [
          "Live deduction of ingredients per dish",
          "Automatic low-stock alerts",
          "Multi-location support"
        ],
        "cta": false
      },
      "quote": null
    },
    {
      "subheading": "Automated",
      "heading": "Vendor Management.",
      "image": "https://images.unsplash.com/photo-...",
      "content": {
        "title": "Streamlined Ordering",
        "description": "Manage all your suppliers in one place...",
        "features": ["One-click Purchase Orders", "Supplier price history", "Digital GRN"],
        "cta": false
      },
      "quote": {
        "text": "We cut our food waste by 15% in the first month using Yummy's vendor tools.",
        "author": "Head Chef, Kathmandu Kitchen"
      }
    },
    {
      "subheading": "Profitable",
      "heading": "Cost Analysis.",
      "image": "https://images.unsplash.com/photo-...",
      "content": {
        "title": "Optimize Your Menu",
        "description": "Know exactly how much each dish costs to make...",
        "features": ["Recipe costing cards", "Variance reports", "Menu engineering insights"],
        "cta": {
          "visible": true,
          "text": "Get Started",
          "href": "/contact"
        }
      },
      "quote": null
    }
  ]
}
```

**Section CTA Options:**
- `cta: false` - No call-to-action button
- `cta: { visible: true, text: "...", href: "..." }` - Shows CTA button

---

## Legal

### GET `/legal/`
List all legal pages.

```json
[
  { "type": "privacy-policy", "title": "Your privacy matters to Yummy", "lastUpdated": "2025-12-29" },
  { "type": "terms-and-conditions", "title": "Terms for using the Yummy platform", "lastUpdated": "2025-12-29" },
  { "type": "cookies", "title": "How Yummy uses cookies", "lastUpdated": "2025-12-29" }
]
```

### GET `/legal/:type/`
Single legal page by type (`privacy-policy`, `terms-and-conditions`, `cookies`).

```json
{
  "type": "privacy-policy",
  "title": "Your privacy matters to Yummy",
  "content": "<p class=\"introduction\">Yummy operates the Yummy mobile application...</p>\n<h2>1. Information We Collect</h2>\n<h3>1.1 Personal Information</h3>\n<ul><li>Full name</li><li>Email address</li>...</ul>\n<h2>2. How We Use Your Information</h2>\n<p>...</p>\n<ul><li>Provide and manage restaurant operations</li>...</ul>\n<p class=\"note\"><em>You may request deletion of your data at any time.</em></p>\n<div class=\"contact-info\"><p>Email: <a href=\"mailto:...\">...</a></p></div>",
  "lastUpdated": "2025-12-29",
  "metaTitle": "Privacy Policy - Yummy",
  "metaDescription": "Yummy operates the Yummy mobile application and related services..."
}
```

**HTML Content Structure:**
- `<p class="introduction">` - Opening paragraph
- `<h2>` - Main section headers (1. Information We Collect, 2. How We Use...)
- `<h3>` - Subsection headers (1.1 Personal Information, 1.2 Usage...)
- `<ul><li>` - Bullet points for items
- `<p class="note"><em>` - Footer notes
- `<div class="contact-info">` - Contact information block

---

## API Docs

- **Swagger UI**: `/api/docs/`
- **ReDoc**: `/api/redoc/`
