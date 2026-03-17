# BuyHomeSmarter.com — Landing Page

High-conversion dark premium landing page for **BuyHomeSmarter.com** — the 100% buyer-advocacy home buying platform covering Canada 🇨🇦 and USA 🇺🇸.

**Mission:** Fight against banks and agents hiding info from buyers. Uncover hidden fees, unlock $100,000+ in grants, and negotiate like an insider.

---

## 📁 File Structure

```
/
├── index.html       # Main landing page (13 sections, 6 AdSense slots)
├── css/style.css    # Dark premium design system + AdSense CSS
├── js/main.js       # Typewriter, counters, scroll animations
├── vercel.json      # Vercel deploy config + security headers
├── package.json     # Project metadata
├── .gitignore       # Git ignores
├── robots.txt       # SEO bot instructions
├── sitemap.xml      # Google Search Console sitemap
└── README.md        # This file
```

---

## 🎨 Design System

| Property | Value |
|---|---|
| Background | Dark navy `#0f0c29` → `#302b63` gradient |
| Accent | Gold `#FFD700` |
| Font | Inter (Google Fonts) |
| Cards | Glassmorphism (backdrop-blur, semi-transparent) |

---

## 🔥 13 Sections

1. Sticky Navbar — Logo, links, country toggle, gold CTA
2. Hero — Typewriter headlines, animated stat counters
3. Trust Bar — CMHC, HUD, CFPB, Fannie Mae, VA, USDA
4. The Problem — Banks vs Agents vs Closing Fees
5. Features Grid — 6 glassmorphism tool cards
6. Impact Stats — Counter-animated stats
7. How It Works — 3-step visual process
8. Programs Finder — Canada 🇨🇦 vs USA 🇺🇸 tab switch
9. Negotiation Playbook — 4-phase cards
10. Insider Secrets Vault — 10 accordion secrets
11. Canada vs USA Comparison — Side-by-side mortgage rules
12. Final CTA — Pulsing gold button
13. Footer — Official resource links

---

## 💰 Google AdSense — 6 Slots Pre-Configured

Replace these two placeholders once AdSense approves your site:

```
FIND:    ca-pub-XXXXXXXXXXXXXXXXX
REPLACE: ca-pub-YOUR_REAL_PUBLISHER_ID

FIND:    data-ad-slot="XXXXXXXXXX"
REPLACE: (each slot gets its own unique Ad Unit ID from AdSense dashboard)
```

| Slot | Location | Format |
|---|---|---|
| ad-slot-1 | Below Trust Bar | Leaderboard 728×90 |
| ad-slot-2 | After Problem Section | In-Article Fluid |
| ad-slot-3 | Between Features & Stats | Rectangle 300×250 |
| ad-slot-4 | After How It Works | In-Article Fluid |
| ad-slot-5 | After Programs Section | Leaderboard 728×90 |
| ad-slot-6 | After Secrets Vault | In-Article Fluid |

---

## 🚀 Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

Add domains in Vercel Dashboard:
- Primary: `buyhomesmarter.com`
- Redirect: `outsmartyourrealtor.com` → `https://buyhomesmarter.com`

### DNS Records (GoDaddy)
```
A     @    →  76.76.21.21
CNAME www  →  cname.vercel-dns.com
```

---

## 🔮 Next Steps

1. Deploy to Vercel and connect `buyhomesmarter.com`
2. Submit `sitemap.xml` to Google Search Console
3. Apply for Google AdSense at adsense.google.com
4. Add Google Analytics (GA4)
5. Set up `outsmartyourrealtor.com` 301 redirect

---

*© 2025 BuyHomeSmarter.com | Educational platform. Not financial advice.*
