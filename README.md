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

## Screenshots

<img width="1917" height="970" alt="image" src="https://github.com/user-attachments/assets/09f07650-0ea8-476c-899d-5bbb58ad9b32" />
<img width="1917" height="968" alt="image" src="https://github.com/user-attachments/assets/090a29fd-3c41-4e6d-b072-4c1f684622b6" />
<img width="1917" height="965" alt="image" src="https://github.com/user-attachments/assets/a559d137-6623-4d9d-8326-e13c1c68cdd6" />
<img width="1917" height="966" alt="image" src="https://github.com/user-attachments/assets/8159ecec-9b26-48c7-8a10-e7bb2d12eb43" />
<img width="1917" height="972" alt="image" src="https://github.com/user-attachments/assets/748d701e-f6f5-483c-9512-ac81bb3444c4" />
<img width="1917" height="896" alt="image" src="https://github.com/user-attachments/assets/718f5c24-e1df-4119-b0ac-c09e5ace8917" />
<img width="1917" height="971" alt="image" src="https://github.com/user-attachments/assets/ad86eb16-d851-4404-9bba-d9f569a1cd96" />
<img width="1917" height="318" alt="image" src="https://github.com/user-attachments/assets/5e395308-b718-4dce-acb7-3495a8c6683a" />
<img width="1917" height="792" alt="image" src="https://github.com/user-attachments/assets/203024fd-3571-4edf-982d-81cf4468a00e" />
<img width="1917" height="721" alt="image" src="https://github.com/user-attachments/assets/91261e2c-ec8b-4143-a37c-aaad3e3998aa" />
<img width="1917" height="901" alt="image" src="https://github.com/user-attachments/assets/b9283321-158b-46bd-a774-b199157b57db" />
<img width="1917" height="970" alt="image" src="https://github.com/user-attachments/assets/3b07eaea-08af-4364-b838-bbffd1a44432" />
<img width="1917" height="963" alt="image" src="https://github.com/user-attachments/assets/763ccba6-6807-465b-a78d-213e4a3db44a" />
<img width="1917" height="405" alt="image" src="https://github.com/user-attachments/assets/c83bcba9-5609-46b6-95a8-83975bf0b99a" />
<img width="1917" height="966" alt="image" src="https://github.com/user-attachments/assets/f4b2bca0-5822-4456-96e4-ca5b12aea23b" />
<img width="1917" height="392" alt="image" src="https://github.com/user-attachments/assets/2e99d406-c736-49e6-b804-640e9025413d" />
<img width="1917" height="970" alt="image" src="https://github.com/user-attachments/assets/53a35db6-dced-4430-a237-77646853035e" />
<img width="1917" height="853" alt="image" src="https://github.com/user-attachments/assets/b55ffe54-a00c-42da-93bf-42d57688e494" />


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
