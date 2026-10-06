import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#F7F7F3",
          subtle: "#EFEFEA",
          muted: "#E6E5E0",
        },
        charcoal: {
          950: "#151817",
          900: "#1A1D1C",
          800: "#2B2F2D",
          700: "#3E4441",
          600: "#68716C",
          500: "#86908A",
          400: "#A3ACA6",
          300: "#C6CCC8",
          200: "#E5E7EB",
          100: "#F1F3F1",
          50: "#F7F9F7",
        },
        emerald: {
          950: "#022C22",
          900: "#064E3B",
          800: "#047857",
          700: "#059669",
          600: "#10B981",
          200: "#A7F3D0",
          100: "#D1FAE5",
          50: "#F0FDF4",
        },
        amber: {
          900: "#78350F",
          800: "#92400E",
          700: "#B45309",
          600: "#D97706",
          100: "#FEF3C7",
          50: "#FFFBEB",
        },
      },
      fontFamily: {
        display: [
          "var(--font-inter-tight)",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        sans: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        strong: "650",
        bold: "700",
        extrabold: "750",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(21, 24, 23, 0.03), 0 1px 2px 0 rgba(21, 24, 23, 0.02)",
        card: "0 4px 12px -2px rgba(21, 24, 23, 0.04), 0 2px 4px -1px rgba(21, 24, 23, 0.02)",
        hover: "0 12px 24px -4px rgba(21, 24, 23, 0.06), 0 4px 6px -2px rgba(21, 24, 23, 0.02)",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
