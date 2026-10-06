# Fermor — Financial Clarity Homepage

A responsive homepage concept for Fermor, a financial platform designed to help people understand their financial position, explore decisions, and plan toward future goals. This project was built for the Frontend Developer Assignment.

## Product and design decisions

The experience is organized around a simple progression: **see your position, understand what affects it, explore a decision, and consider its longer-term impact**. Financial information is presented with a restrained editorial style: clear typography, deliberate spacing, quiet colors, and compact data visualizations.

The homepage includes:

- A product introduction and financial health snapshot.
- Five financial health pillars with expandable explanations and next steps.
- Savings and purchase simulators with live updates.
- A demo profile selector that updates the standing, score drivers, and projections.
- Financial score drivers and an interactive life-event simulator.
- A net worth trajectory chart with selectable time horizons.
- A product overview, fictional demo profile, and footer.

The interface adapts across mobile, tablet, and desktop layouts. The financial data and profiles are fictional demo content; calculations run in the browser and are illustrative, not connected to financial accounts or a live backend.

## Technology

- Next.js 14 with React 18 and TypeScript
- Tailwind CSS
- Recharts for financial visualizations
- Framer Motion for small interface transitions
- Lucide React icons
- Inter and Inter Tight via `next/font`

## Requirements

- Node.js 18.17 or newer
- npm

No environment variables or external services are required for local development.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```

## Build for production

```bash
npm run build
npm start
```

The project can be deployed to Vercel by importing the repository and using the default Next.js build settings. No additional environment configuration is needed.

## Project structure

```text
src/
  app/             App Router page, layout, and global styles
  components/
    layout/        Navigation and footer
    sections/      Homepage sections and interactive experiences
    ui/            Shared controls, cards, badges, and score gauge
  data/            Fictional demo profiles
  types/           Financial data and simulation types
  utils/           Financial calculations and formatting
```
