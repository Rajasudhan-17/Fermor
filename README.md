# Fermor — Financial Clarity, Reimagined

Fermor is an interactive financial clarity experience built as part of the **Frontend Developer Assignment for Fermor**. Rather than presenting a conventional, complex fintech analytics dashboard, this prototype guides users through an intuitive 4-stage financial journey: **SEE → UNDERSTAND → DECIDE → GROW**.

The homepage helps users move from understanding their current financial health to exploring real-world choices, testing spending/savings scenarios, and visualizing their potential long-term net worth trajectory.

---

## 1. Project Overview

### What is Fermor?
Fermor is designed to help people understand, act, and grow financially. Managing personal finances often creates friction, confusion, and anxiety due to fragmented banking apps and complex spreadsheets. Fermor replaces visual noise with calm, editorial precision.

### Target Experience
The homepage is built for individuals seeking clarity on their financial standing—whether they are early-career builders, mid-career planners, or debt-payoff focused.

### Core Experience Framework
The application architecture strictly follows a 4-stage narrative flow:

1. **SEE (Health Standing Overview)**: Understand where you stand today via a unified 0–100 Financial Health Index, net worth breakdown, and liquidity metrics.
2. **UNDERSTAND (Pillars & Root Drivers)**: Discover the root causes behind your score across five core financial pillars (Spending, Savings, Investments, Debt, Goals).
3. **DECIDE (Interactive Simulator)**: Experiment with monthly savings allocations and model the real-time impact of major purchases (laptops, vehicles, trips, custom inputs).
4. **GROW (Future Trajectory)**: Visualize compounded 1, 3, 5, and 20-year net worth horizons comparing your baseline path against simulated choices.

---

## 2. Design Approach

This prototype adopts a **Swiss-inspired, editorial fintech design system**:

- **Editorial Typography**: Typography carries the visual hierarchy rather than unnecessary lines, bright backgrounds, or decorative icons.
- **Warm Canvas**: A warm paper-like off-white background (`#F7F7F3`) creates a calm, human-designed surface.
- **Restrained Palette**: Deep muted forest green (`#064E3B` / `#047857`) is reserved exclusively for primary actions, positive financial states, and key emphasis.
- **Generous Whitespace**: Built around an 8px spatial system to give complex financial information breathing room.
- **Low Noise**: Avoids purple AI gradients, neon colors, glassmorphism, or cartoon stock art.

*Note: This visual system represents a frontend interpretation created specifically for the Fermor assignment.*

---

## 3. Design Principles

### 01 — Clarity Over Complexity
Financial information should be digestible at a glance. Critical metrics use dominant, tight-tracked typography alongside plain-language explanations.

### 02 — Information Hierarchy Without Clutter
Visual importance is established through font weight and size contrast rather than piling cards inside cards or adding colorful borders.

### 03 — Calm Visual Language
Finance can be stressful. The interface uses muted tones and generous whitespace to instill confidence rather than urgency or anxiety.

### 04 — Progressive Disclosure
Overview metrics appear first. Deep-dive factor analyses, root causes, and recommendations expand only when the user chooses to explore them.

### 05 — Interaction Over Decoration
Every animation, slider, button, and chart exists to help users test hypotheses and understand outcomes.

---

## 4. Homepage Experience & Component Mapping

The codebase is organized into modular React components representing each stage of the user journey:

```text
┌────────────────────────────────────────────────────────────────────────┐
│ Navbar (Brand Logo, Compact Nav, Scenario Profile Switcher, Simulator) │
├────────────────────────────────────────────────────────────────────────┤
│ HeroSection (Headline, Copy, Animated 0 → 78 Score Dial, Metric Grid)  │
├────────────────────────────────────────────────────────────────────────┤
│ FinancialHealthSection (Pre-Pillar Summary, 5 De-densified Pillars)    │
├────────────────────────────────────────────────────────────────────────┤
│ SavingsDecisionSimulator (Monthly Savings Slider, Purchase Scenarios)  │
├────────────────────────────────────────────────────────────────────────┤
│ FutureYouProductStory (TODAY → 5 YR Timeline, 4-Stage Stepper, Alex)   │
├────────────────────────────────────────────────────────────────────────┤
│ FinancialHealthOverview (Stage 1 SEE — Net Worth & Cashflow Overview)  │
├────────────────────────────────────────────────────────────────────────┤
│ ScoreDriversSection (Stage 2 UNDERSTAND — Root Cause Analysis Drawer)  │
├────────────────────────────────────────────────────────────────────────┤
│ DecisionSimulatorSection (Stage 3 DECIDE — Advanced Parameters Slider) │
├────────────────────────────────────────────────────────────────────────┤
│ FutureTrajectorySection (Stage 4 GROW — 20-Year Recharts Curve)        │
├────────────────────────────────────────────────────────────────────────┤
│ FermorFeaturesSection (Why Fermor Grid & Preset Profile Selector)      │
├────────────────────────────────────────────────────────────────────────┤
│ Footer (Legal Disclaimer, Platform Architecture, Navigation Links)     │
└────────────────────────────────────────────────────────────────────────┘
```

### Key Sections Summary:
- **`HeroSection.tsx`**: Presents the core headline *"Know where you stand financially."*, primary CTA (*"Explore your finances"*), and an animated Financial Health Card (`0 → 78`).
- **`FinancialHealthSection.tsx`**: Displays the *"How is your money doing?"* summary box followed by 5 de-densified pillars (Spending, Savings, Investments, Debt, Goals) with expandable *"Understand your score →"* panels.
- **`SavingsDecisionSimulator.tsx`**: Features a monthly savings slider (`₹1,000` to `₹10,000`) with 1/3/5-year growth timelines and a Big Purchase Scenario Simulator (Laptop, Phone, Trip, Vehicle, Custom).
- **`FutureYouProductStory.tsx`**: Renders the connected `TODAY → 1 YEAR → 3 YEARS → 5 YEARS` trajectory curve, the 4-stage product philosophy stepper (`01 SEE`, `02 UNDERSTAND`, `03 DECIDE`, `04 GROW`), and the *"Meet Alex"* demo profile.
- **`FutureTrajectorySection.tsx`**: Compares baseline vs. simulated net worth curves over 5, 10, and 20 years using Recharts with milestone flags.

---

## 5. Key Functional Interactions

| Interaction | What It Does | How It Works | Purpose |
|---|---|---|---|
| **Viewport Score Count-up** | Animates overall health score from `0 → 78` upon scroll. | Uses Framer Motion `animate(0, 78)` triggered by `useInView`. | Creates a lively initial entry point. |
| **Pillar Expand / Collapse** | Toggles in-depth factor analysis for any financial pillar. | Local React state toggles `AnimatePresence` height animation. | Prevents cognitive overload via progressive disclosure. |
| **Monthly Savings Slider** | Recalculates 1, 3, and 5-year savings accumulation. | Slider `onChange` reactively updates timeline values and Recharts curve. | Demonstrates compounding impact of small monthly shifts. |
| **Purchase Scenario Engine** | Models liquid drawdown and emergency fund impact for purchases. | Evaluates purchase cost against `₹3,50,000` baseline savings and `₹38,000` expenses. | Helps users evaluate major spending decisions before buying. |
| **Custom Purchase Input** | Accepts custom rupee amounts with live input validation. | Cleans and parses numeric strings; validates bounds and errors. | Allows arbitrary scenario testing. |
| **Demo Profile Switcher** | Switches between 3 preset personas (Alex 32, Maya 26, David 41). | Updates global profile state and recalculates health index deltas. | Demonstrates platform behavior across diverse financial situations. |
| **Time Horizon Toggle** | Switches trajectory view between 5, 10, and 20 years. | Filters Recharts dataset and updates milestone cards. | Enables short vs. long-term financial planning. |
| **Mobile Navigation Drawer** | Toggles full-screen mobile menu. | Framer Motion height drawer triggered by hamburger button. | Ensures touch-friendly mobile navigation. |

---

## 6. Product & Engineering Decisions

### 01 — Start with Understanding Before Asking for Action
Users cannot make informed decisions without knowing where they stand. Placing the Financial Health Index and 5 Pillars before the Decision Simulator establishes a clear baseline.

### 02 — Plain Language Alongside Financial Metrics
Rather than presenting raw financial numbers in isolation, every metric is paired with contextual explanations (e.g., *"4.4 months of essential expenses covered in liquid reserve"*).

### 03 — Interactive Scenarios Over Static Rules
Financial advice often feels rigid. Allowing users to adjust sliders and model purchases turns passive reading into active exploration.

### 04 — De-densified Pillar Cards
Earlier layouts crammed category names, scores, amounts, and descriptions into a single horizontal row. The refactored pillar design uses clear vertical hierarchy with a thin progress indicator and an explicit *"Understand your score →"* expander.

### 05 — Deterministic Hydration-Safe Formatter
To prevent Next.js React hydration mismatches between Node.js server rendering and client browser locales (`6,00,000` vs `600,000`), a deterministic currency utility (`formatINR`) formats numbers consistently across environments.

---

## 7. Visual Design System

### Typography System (`next/font/google`)
- **Display Typeface**: `Inter Tight` (`Inter_Tight`) for display headings, section titles, card headers, and dominant tabular metrics (`tabular-nums`).
- **Body Typeface**: `Inter` (`Inter`) for body copy, navigation links, buttons, and sub-labels.

```text
Hero Headline:      72px Desktop / 52px Tablet / 40px Mobile | Weight: 750 | Line-height: 0.98 | Tracking: -0.045em
Section Heading:    52px Desktop / 42px Tablet / 32px Mobile | Weight: 700 | Line-height: 1.02 | Tracking: -0.04em
Card Heading:       24–28px                                  | Weight: 600 | Line-height: 1.08 | Tracking: -0.025em
Body Copy:          17–19px                                  | Weight: 400 | Line-height: 1.6
Navigation:         15–16px                                  | Weight: 500
Financial Metrics:  32–48px (Tabular Numerals)               | Weight: 700 | Tracking: -0.04em
Eyebrows / Labels:  11–13px (Uppercase)                          | Weight: 600 | Tracking: 0.06em
```

### Color Palette

| Token | Hex Code | Usage |
|---|---|---|
| **Canvas** | `#F7F7F3` | Warm Swiss off-white background surface |
| **Card Surface** | `#FFFFFF` | Primary content container |
| **Primary Text** | `#151817` | Dominant charcoal text for high editorial contrast |
| **Secondary Text** | `#68716C` | Muted gray-green text for descriptions and metadata |
| **Primary Accent** | `#047857` / `#064E3B` | Deep forest green for CTAs, positive status, and emphasis |
| **Soft Accent** | `#F0FDF4` | Subtle green surface tint for highlight cards |
| **Neutral Border** | `#E5E7EB` | Soft 1px card and section borders |
| **Warning State** | `#D97706` / `#FEF3C7` | Restrained amber for opportunity areas |

---

## 8. Responsive Design Strategy

- **Desktop (1440px / 1280px)**: Multi-column grid layouts, large financial visualization cards, side-by-side impact analysis.
- **Tablet (1024px / 768px)**: Intelligently collapses multi-column grids to 2-column layouts; preserves chart aspect ratios.
- **Mobile (430px / 390px)**: Stacks content vertically; transforms horizontal navigation into a touch-friendly drawer; sets slider touch targets to min 44px height; ensures no horizontal overflow (`overflow-x-hidden`).

---

## 9. Accessibility & Motion

- **Semantic HTML**: Built using `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>`.
- **Keyboard Navigation**: Interactive elements include visible focus rings (`focus-visible:ring-2 focus-visible:ring-emerald-800`).
- **Accessible Controls**: Sliders feature explicit ARIA attributes (`aria-label`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`).
- **Reduced Motion**: Styled with `@media (prefers-reduced-motion: reduce)` to disable heavy animations for users with motion sensitivity.

---

## 10. Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** | App Router framework and static site generation |
| **React 18** | UI component architecture and interactive state management |
| **TypeScript 5** | End-to-end type safety and strict component props |
| **Tailwind CSS 3** | Utility-first styling and custom design tokens |
| **Lucide React** | Consistent, restrained iconography suite |
| **Framer Motion 11** | Smooth UI transitions, score dials, and accordion drawers |
| **Recharts 2** | Responsive line and area financial charts |
| **Vercel** | Production hosting and edge deployment |

---

## 11. Repository Project Structure

```text
fermor-homepage/
├── src/
│   ├── app/
│   │   ├── globals.css          # Centralized typography system and CSS tokens
│   │   ├── layout.tsx           # Root layout with Inter Tight & Inter Google Fonts
│   │   └── page.tsx             # Main page orchestrating the 4-stage experience
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Compact navigation bar & mobile drawer
│   │   │   └── Footer.tsx       # Platform disclaimer and navigation
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx                 # Hero & animated health dial
│   │   │   ├── FinancialHealthSection.tsx      # Pre-pillar summary & 5 pillars
│   │   │   ├── SavingsDecisionSimulator.tsx    # Savings slider & purchase scenario engine
│   │   │   ├── FutureYouProductStory.tsx       # 5-Yr timeline, 4-stage stepper, Alex
│   │   │   ├── FinancialHealthOverview.tsx     # Stage 1 SEE standing
│   │   │   ├── ScoreDriversSection.tsx         # Stage 2 UNDERSTAND drivers
│   │   │   ├── DecisionSimulatorSection.tsx    # Stage 3 DECIDE parameter engine
│   │   │   ├── FutureTrajectorySection.tsx     # Stage 4 GROW 20-yr Recharts curve
│   │   │   └── FermorFeaturesSection.tsx       # Platform advantage & profile switcher
│   │   └── ui/
│   │       ├── Button.tsx       # Framer Motion animated buttons
│   │       ├── Card.tsx         # Editorial card surfaces
│   │       ├── Badge.tsx        # Financial status badges
│   │       ├── Slider.tsx       # Accessible range slider
│   │       ├── Toggle.tsx       # Switch toggle primitive
│   │       └── ScoreGauge.tsx   # Radial SVG score gauge
│   ├── data/
│   │   └── mockData.ts          # Realistic demo profiles (Alex, Maya, David)
│   ├── types/
│   │   └── finance.ts           # TypeScript definitions for metrics & params
│   └── utils/
│       └── financeCalculations.ts # Deterministic INR formatting & simulation math
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 12. Getting Started & Local Setup

### Prerequisites
- Node.js v18.0.0 or higher
- npm v9.0.0 or higher

### Installation & Execution

1. **Clone the repository**:
   ```bash
   git clone https://github.com/username/fermor-homepage.git
   cd fermor-homepage
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

---

## 13. Demo Data & Financial Disclaimer

The financial figures, health scores, score drivers, and multi-year projections presented in this interface are **illustrative demo values** created for demonstration purposes as part of this frontend assignment. 

*They do not represent actual Fermor customer data, binding financial accounts, or guaranteed investment outcomes.*

---

## 14. Why I Designed It This Way

### 01 — Understanding Before Action
I chose to place the overall Financial Health Index and 5 Pillars before any simulation controls so users first understand their baseline standing before being prompted to make decisions.

### 02 — Plain Language Alongside Numbers
Financial dashboards often overwhelm users with raw tables. I paired every number with conversational context (e.g., *"4.4 months of essential expenses covered"*).

### 03 — Turning Choices Into Interactive Experiments
Static advice feels preachy. Providing interactive sliders for monthly savings and big purchases allows users to test hypotheses safely.

### 04 — De-densified Information Architecture
By replacing dense single-line horizontal rows with structured vertical pillars and expandable *"Understand your score →"* drawers, users can digest information without cognitive fatigue.

### 05 — Restrained Palette & Typography Hierarchy
Using warm off-white canvas surfaces (`#F7F7F3`), tight Inter Tight display typography, and deep forest green (`#047857`) ensures the product feels editorial, trustworthy, and calm.

---

## 15. Trade-offs & Scope Boundaries

- **Scope**: Developed for a 2-day assignment, focusing on polished frontend product execution, interaction design, and visual polish rather than live backend infrastructure.
- **Frontend State**: Calculations use deterministic client-side mathematical models rather than live banking APIs.
- **Demo Profiles**: User profiles are stored in structured mock objects (`mockData.ts`) to enable instant scenario switching without database latency.

---

