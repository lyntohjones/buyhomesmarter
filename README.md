# BuyHomeSmarter.com — Landing Page

## 🏠 Project Overview

**Primary Domain:** `buyhomesmarter.com`  
**Viral Redirect:** `outsmartyourrealtor.com → buyhomesmarter.com`  
**Mission:** A buyer-first home purchasing platform for Canada 🇨🇦 and USA 🇺🇸 that exposes hidden fees, unlocks grants, and teaches insider negotiation tactics that real estate agents and banks don't want buyers to know.

---

## ✅ What's Built

### Landing Page (`index.html`)
A full, high-converting single-page marketing site with 11 sections:

| # | Section | Key Feature |
|---|---|---|
| 1 | **Sticky Navbar** | Country toggle (🇨🇦/🇺🇸), smooth scroll nav, hamburger mobile menu |
| 2 | **Hero** | Typewriter headline, animated stat counters, floating comparison cards |
| 3 | **Trust Bar** | Official source logos: CMHC, HUD, CFPB, Ratehub, Fannie Mae, VA, USDA |
| 4 | **Problem Section** | 3 dramatic problem cards: Banks vs Agents vs Closing Fees |
| 5 | **Features Grid** | 6 tool cards with hover effects and gold glow |
| 6 | **Impact Stats** | Animated counters: 2,624 DPA programs, $40K FHSA, $60K HBP, 50% HUD discount |
| 7 | **How It Works** | 3-step process: Enter info → Get plan → Buy smart |
| 8 | **Programs Section** | 🇨🇦/🇺🇸 tab switcher with 4+4 grant/program cards |
| 9 | **Negotiation Playbook** | 4-phase battle plan cards with tactic lists |
| 10 | **Insider Secrets Vault** | 10 accordion secrets that unlock on click |
| 11 | **Country Compare** | Canada vs USA side-by-side comparison |
| 12 | **Final CTA** | Pulsing gold button, feature checklist, domain display |
| 13 | **Footer** | 4-column with official resource links |

---

## 📁 File Structure

```
/
├── index.html              # Main landing page (55KB — full content, 6 AdSense slots)
├── css/
│   └── style.css           # Full design system + AdSense CSS (43KB)
├── js/
│   └── main.js             # All JS: typewriter, counters, animations (19KB)
├── vercel.json             # Vercel config: routes, security headers, caching
├── package.json            # Project metadata
├── .gitignore              # Git ignores
├── robots.txt              # SEO: allow bots, sitemap reference
├── sitemap.xml             # SEO sitemap for Google Search Console
├── CLAUDE_CODE_PROMPT.txt  # Full deployment prompt for Claude Code
└── README.md               # This file
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#0f0c29` → `#302b63` gradient |
| Gold | `#FFD700` |
| Text Primary | `#FFFFFF` |
| Cards | `rgba(255,255,255,0.04)` glassmorphism |
| Font | Inter (Google Fonts) |
| Border | `rgba(255,255,255,0.1)` |

---

## ⚡ JavaScript Features

- **Typewriter effect** — cycles through 4 headlines (45ms per char)
- **Animated counters** — easeOutExpo animation on scroll trigger
- **Scroll reveal** — Intersection Observer for all sections + staggered cards
- **Country toggle** — persisted to localStorage, switches all content
- **Accordion secrets** — click to expand/collapse with keyboard support
- **Mobile hamburger menu** — full-screen overlay
- **Parallax** — hero orbs move on scroll (performance optimized)
- **Scroll progress bar** — gold gradient at top of page
- **Scroll-to-top button** — appears after 400px scroll
- **Active nav tracking** — highlights current section link
- **Card tilt** — subtle 3D on hover (desktop only)

---

## 🇨🇦 Canada Content

- FHSA: $40,000/person ($80K/couple)
- RRSP Home Buyers' Plan: $60,000/person ($120K/couple)
- Land Transfer Rebates: ON $4K, BC $8K, Toronto $4,475
- GST Exemption: Up to $50,000 on new builds
- Insider: Provincial credit unions bypass B-20 stress test

## 🇺🇸 USA Content

- NACA: $0 down, $0 closing, no PMI, no min credit
- VA Loans: 0% down, no PMI for veterans
- USDA: 0% down rural/suburban
- 2,624 DPA Programs averaging $18,000
- Good Neighbor Next Door: 50% off HUD homes

---

## 🚀 Deployment

### Vercel (already connected)

1. Push to GitHub → Vercel auto-deploys
2. Add custom domain in Vercel Dashboard:
   - `buyhomesmarter.com` → A record `76.76.21.21`
   - `outsmartyourrealtor.com` → Redirect to `buyhomesmarter.com`
3. SSL auto-issued by Vercel

### DNS Setup (GoDaddy)

**For buyhomesmarter.com:**
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

**For outsmartyourrealtor.com:**
```
GoDaddy → Domain Settings → Forwarding
Forward to: https://buyhomesmarter.com
Type: Permanent (301)
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| Desktop (1100px+) | Full 3-column grids, side-by-side hero |
| Tablet (768–1100px) | 2-column grids, stacked hero |
| Mobile (<640px) | 1-column, hamburger menu, all CTAs full-width |

---

## 🔗 Key Entry Points

| URL | Content |
|---|---|
| `buyhomesmarter.com` | Full landing page |
| `outsmartyourrealtor.com` | Redirects to buyhomesmarter.com |
| `#features` | Features grid |
| `#programs` | Grant finder |
| `#negotiate` | Negotiation playbook |
| `#secrets` | Insider secrets vault |
| `#how-it-works` | 3-step process |
| `#platform` | Final CTA / app entry |

---

## 📊 SEO

- Full Open Graph tags
- Twitter Card metadata
- Canonical URL set to `https://buyhomesmarter.com`
- Semantic HTML (section, nav, footer, h1→h4 hierarchy)
- Alt text on all icons
- Page title + meta description optimized for "first time home buyer" keywords

---

## 💰 Google AdSense Integration

Six ad slots are pre-configured throughout the page. **To activate:**

### Step 1 — Replace Publisher ID
Find and replace `ca-pub-XXXXXXXXXXXXXXXXX` with your real AdSense Publisher ID in **two places**:
1. `index.html` → `<head>` section (the `<script>` tag)
2. All 6 `<ins class="adsbygoogle">` elements (each has `data-ad-client=`)

### Step 2 — Replace Ad Slot IDs
Each `<ins>` tag has `data-ad-slot="XXXXXXXXXX"` — replace each with the unique Ad Unit ID from your AdSense dashboard (create 6 separate ad units).

### Ad Slot Map

| Slot ID | Type | Position | Best Format |
|---|---|---|---|
| `ad-slot-1` | Leaderboard | Below Trust Bar | 728×90 / Responsive |
| `ad-slot-2` | In-Article | After Problem Section | Fluid / In-Article |
| `ad-slot-3` | Rectangle | Between Features & Stats | 300×250 / Responsive |
| `ad-slot-4` | In-Article | After How It Works | Fluid / In-Article |
| `ad-slot-5` | Leaderboard | After Programs Section | 728×90 / Responsive |
| `ad-slot-6` | In-Article | After Secrets Vault | Fluid / In-Article |

### AdSense Policy Notes
- The "Advertisement" label above each ad is required by Google policy ✅
- Ads are not placed inside hero section (policy: no ads above the fold on first view) ✅
- Ads do not interfere with navigation or CTAs ✅
- All slots use `aria-label="Advertisement"` for accessibility ✅

---

## 🔮 Recommended Next Steps

1. **Connect to full app** — Link "Open Platform Free" button to your full HomeAdvantage tool
2. **Add Google Analytics 4** — Replace `if (typeof gtag)` hooks in main.js
3. **Email capture** — Add a simple email signup above footer ("Get the weekly buyer tip")
4. **Social proof** — Add testimonials section once users start using the platform
5. **Blog/Content** — Add `/blog` route on Next.js version with SEO articles
6. **A/B test CTAs** — Try "Outsmart Your Realtor →" vs "Analyze My Budget Free →"

---

*© 2025 BuyHomeSmarter.com | Educational platform. Not financial advice.*
