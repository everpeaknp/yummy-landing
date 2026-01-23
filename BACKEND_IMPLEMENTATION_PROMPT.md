# Backend Implementation Prompt for Yummy Landing Page API

## Context
The `yummy_api_collection.json` defines API endpoints, but lacks complete **response schemas/data fields**. Your task is to implement these endpoints in Django (or your chosen framework) ensuring each endpoint returns the **exact data structure** the frontend expects.

This prompt identifies **ALL missing data fields** by comparing the current API collection against the frontend's requirements defined in `backend-dynamization-prompt.json`.

---

## CRITICAL MISSING ENDPOINTS & DATA FIELDS

### 1. GET /api/config/site
**Status:** Exists but response schema undefined.
**Required Response:**
```json
{
  "siteName": "Yummy POS",
  "tagline": "Yummy Ever", 
  "description": "Yummy is the best restaurant management software in Nepal...",
  "productionUrl": "https://yummypos.com",
  "appLoginUrl": "https://app.yummyever.com/",
  "companyName": "Everacy",
  "copyrightText": "© 2026 Yummy Ever. All rights reserved.",
  "logo": {
    "lightModeSrc": "/images/logo-light.svg",
    "darkModeSrc": "/images/logo-dark.svg",
    "altText": "Yummy POS",
    "width": 120,
    "height": 40
  },
  "themeSettings": {
    "darkModeEnabled": true,
    "darkModeToggleVisible": true,
    "defaultTheme": "system"
  }
}
```

---

### 2. GET /api/navigation/main
**Status:** Exists but missing mega menu content and button configs.
**Required Response:**
```json
{
  "items": [
    {
      "title": "Features",
      "href": "/features",
      "hasMegaMenu": true,
      "megaMenuItems": [
        { "name": "Smart Inventory", "href": "/features/smart-inventory", "icon": "inventory_2", "description": "Track stock in real-time" },
        { "name": "IRD Billing", "href": "/features/ird-billing", "icon": "receipt_long", "description": "Nepal tax compliant" },
        { "name": "Digital QR Menu", "href": "/features/qr-menu", "icon": "qr_code_2", "description": "Contactless ordering" },
        { "name": "Real-time Reports", "href": "/features/reports", "icon": "bar_chart", "description": "Analytics dashboard" }
      ],
      "order": 1
    },
    { "title": "Pricing", "href": "/pricing", "hasMegaMenu": false, "order": 2 },
    {
      "title": "Company",
      "href": "/team",
      "hasMegaMenu": true,
      "megaMenuItems": [
        { "name": "Team", "href": "/team", "icon": "group", "description": "Meet the people behind Yummy" },
        { "name": "Help Center", "href": "/help", "icon": "help", "description": "Get support and assistance" },
        { "name": "FAQ", "href": "/faq", "icon": "quiz", "description": "Common questions answered" }
      ],
      "order": 3
    },
    { "title": "Careers", "href": "/careers", "hasMegaMenu": false, "order": 4 },
    { "title": "Blog", "href": "/blog", "hasMegaMenu": false, "order": 5 }
  ],
  "buttons": [
    {
      "text": "Login",
      "href": "https://app.yummyever.com/",
      "variant": "login",
      "isExternal": true
    }
  ],
  "colors": {
    "navItemDefault": { "light": "#64748b", "dark": "#94a3b8" },
    "navItemHover": { "light": "#0f172a", "dark": "#ffffff" },
    "navItemActiveBackground": { "light": "#f1f5f9", "dark": "rgba(255,255,255,0.1)" },
    "megaMenuBackground": { "light": "#ffffff", "dark": "#171717" },
    "megaMenuBorder": { "light": "#e2e8f0", "dark": "#262626" },
    "megaMenuItemHover": { "light": "#f1f5f9", "dark": "rgba(255,255,255,0.05)" },
    "megaMenuItemText": { "light": "#1e293b", "dark": "#e5e5e5" },
    "megaMenuItemDescription": { "light": "#64748b", "dark": "#a3a3a3" },
    "megaMenuIconColor": { "light": "#94a3b8", "dark": "#6b7280" },
    "megaMenuIconColorHover": { "light": "#ff6929", "dark": "#ff6929" }
  },
  "themeToggle": {
    "visible": true,
    "lightModeIcon": "dark_mode",
    "darkModeIcon": "light_mode"
  },
  "loginButton": {
    "text": "Login",
    "href": "https://app.yummyever.com/",
    "lightBackground": "#0f172a",
    "lightText": "#ffffff",
    "darkBackground": "#ffffff",
    "darkText": "#0f172a"
  }
}
```

---

### 3. GET /api/navigation/footer
**Status:** Exists but missing complete structure.
**Required Response:**
```json
{
  "brand": {
    "logoLight": "/images/logo-light-footer.svg",
    "logoDark": "/images/logo-dark-footer.svg",
    "name": "Yummy Ever",
    "tagline": "Building innovative restaurant solutions for the modern world."
  },
  "columns": [
    {
      "title": "Quick links",
      "links": [
        { "label": "Home", "href": "/" },
        { "label": "Features", "href": "/features" },
        { "label": "Pricing", "href": "/pricing" },
        { "label": "Blog", "href": "/blog" },
        { "label": "FAQ", "href": "/faq" },
        { "label": "Help Center", "href": "/help" }
      ]
    },
    {
      "title": "Product",
      "links": [
        { "label": "Smart Inventory", "href": "/features/smart-inventory" },
        { "label": "IRD Billing", "href": "/features/ird-billing" },
        { "label": "Digital QR Menu", "href": "/features/qr-menu" },
        { "label": "Analytics", "href": "/features/reports" },
        { "label": "Cloud POS", "href": "#" }
      ]
    }
  ],
  "contact": {
    "title": "Contact us",
    "address": "Chhorepatan, Pokhara\nGandaki Province, Nepal",
    "email": "yummyever.np@gmail.com",
    "phone": "+977 9807134097"
  },
  "socialLinks": [
    { "platform": "facebook", "url": "https://facebook.com/yummypos", "icon": "facebook" },
    { "platform": "twitter", "url": "https://twitter.com/yummypos", "icon": "twitter" },
    { "platform": "instagram", "url": "https://instagram.com/yummypos", "icon": "instagram" }
  ],
  "copyright": {
    "text": "© 2026 Yummy Ever. All rights reserved.",
    "poweredBy": {
      "text": "By Everacy",
      "href": "https://everacy.com",
      "logo": "/images/everacy-logo.svg"
    }
  },
  "legalLinks": [
    { "label": "Privacy Policy", "href": "/privacy-policy" },
    { "label": "Terms of Service", "href": "/terms-and-conditions" },
    { "label": "Cookies", "href": "/cookies" }
  ],
  "colors": {
    "background": { "light": "#ffffff", "dark": "#0a0a0a" },
    "borderTop": { "light": "#e5e7eb", "dark": "#171717" },
    "text": { "light": "#4b5563", "dark": "#d4d4d4" },
    "headingText": { "light": "#0f172a", "dark": "#ffffff" },
    "linkHover": { "light": "#ff6929", "dark": "#ff6929" }
  }
}
```

---

### 4. GET /api/theme/colors
**Status:** Exists but response undefined.
**Required Response:**
All 30+ theme colors with light/dark mode values. See `themeSystem.globalColors` in `backend-dynamization-prompt.json` for complete list including:
- primary, primaryHover, primaryLight, primaryLightText
- background, backgroundAlt, backgroundCard, backgroundCardHover, backgroundSubtle, backgroundOverlay  
- textPrimary, textSecondary, textMuted, textSubtle
- border, borderLight, borderSubtle
- navBackground, navBorder, navText, navTextActive, navTabHover
- footerBackground, footerBorder, footerText, footerHeading, footerLinkHover

---

### 5. GET /api/theme/buttons
**Status:** Exists but response undefined.
**Required Response:**
Button styles for: primary, secondary, outline, ghost, login
Each with light/dark mode values for: background, backgroundHover, text, border, borderHover, shadow, shadowHover

---

### 6. MISSING ENDPOINTS (Not in yummy_api_collection.json)

| Endpoint | Purpose |
|----------|---------|
| `GET /api/components/navbar` | Full navbar config including logo, brandName, colors |
| `GET /api/components/footer` | Full footer config with all sections |
| `GET /api/seo/global` | Global SEO defaults |
| `GET /api/seo/page/:pageId` | Page-specific SEO |

---

### 7. PAGE ENDPOINTS - Missing Fields

#### GET /api/pages/home/hero
Needs: badge (icon, text, emoji, colors), headline (line1, line2, highlightWord, colors), subheadline, ctaButtons array with type/href/text

#### GET /api/pages/home/process  
Needs: badge (text, colors), title, subtitle, steps array (number, icon, iconColor, title, description, isHighlighted), normalCardColors, highlightedCardColors

#### GET /api/pages/home/testimonials
Needs: title, subtitle, cards array (imageUrl, quote, author), cardColors

#### GET /api/pages/home/about
Needs: title (prefix, highlight, suffix), description, video (url, thumbnailUrl), videoCardShadow

#### GET /api/pages/home/features
Needs: badge, title, subtitle, cards array (id, title, description, icon, iconColor, iconBgLight, iconBgDark, gridSpan, mockData, decorGlowColor), cardColors

#### GET /api/pages/home/gallery
Needs: title, subtitle, features array (id, title, description, icon, image, bulletPoints), accordionColors, stepIndicatorColors

#### GET /api/pages/home/launch-phases
Needs: title, phases array (label, title, badgeColors, titleColor, cards array)

#### GET /api/pages/pricing
Needs: title, subtitle, toggle config, savingsBadge, promotionBanner, plans array, cardColors, faqs array, faqColors

#### GET /api/pages/faq
Needs: title, subtitle, contactPrompt, categories array (title, colors, questions array), accordionColors

#### GET /api/pages/careers
Needs: badge, title, subtitle, searchPlaceholder, categories array, categoryButtonColors, jobs array, jobCardColors, emptyState

#### GET /api/pages/team
Needs: icon, title, companyLogo, subtitle (with highlightWord), values array, valueCardColors, joinSection

#### GET /api/pages/contact
Needs: title, subtitle, infoSection, contactItems array (icon, iconColors, title, content), mapEmbedUrl, mapFilter, formSection, formColors, categories, submitButton

#### GET /api/pages/help
Needs: title, subtitle, searchPlaceholder, searchColors, linkColumns array, linkColors, noResultsText

#### GET /api/blog/posts
Needs: title, subtitle, posts array (slug, title, excerpt, date, image, metaTitle, metaDescription, keywords), cardColors

#### GET /api/blog/posts/:slug
Needs: full post (title, content as HTML, date, author, category, metaTitle, metaDescription, keywords), postPageColors

#### GET /api/pages/features/:slug
Needs: slug, title, subtitle, icon, heroImage, sections, metaTitle, metaDescription

#### GET /api/pages/legal/:type
Needs: type, title, content (HTML), lastUpdated, metaTitle, metaDescription

---

## IMPLEMENTATION CHECKLIST

- [ ] All endpoints return JSON with proper content-type header
- [ ] Every color field includes both `light` and `dark` mode values
- [ ] Logo fields include both `lightModeSrc` and `darkModeSrc`
- [ ] Navbar includes `themeToggle.visible` boolean
- [ ] Footer includes `copyright.text` and `copyright.poweredBy`
- [ ] All images return absolute URLs or paths starting with `/`
- [ ] Rich text fields (blog content, legal pages) return sanitized HTML
- [ ] Django Admin allows editing ALL fields listed above

---

## REFERENCE FILES
- `backend-dynamization-prompt.json` - Complete field specifications
- `theme-seed-data.json` - All theme color values
- `content-seed-data.json` - All content data values
