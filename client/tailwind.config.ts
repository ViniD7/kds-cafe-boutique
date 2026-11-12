import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Stitch Modern Editorial Theme
        "espresso-deep": "#120F0D",
        "espresso-surface": "#1A1614",
        "gold-burnished": "#A88F48",
        "gold-bright": "#C2A763",
        "gold-glow": "rgba(194, 167, 99, 0.15)",
        "paper-cream": "#FBF9F5",
        "paper-sand": "#F4EFEB",
        "slate-warm": "#6E675F",
        "border-hairline": "#E5DFD5",
        surface: "#fbf9f5",
        "surface-bright": "#fbf9f5",
        "surface-dim": "#dbdad6",
        "surface-container": "#efeeea",
        "surface-container-low": "#f5f3ef",
        "surface-container-lowest": "#ffffff",
        "surface-container-high": "#eae8e4",
        "surface-container-highest": "#e4e2de",
        "on-surface": "#1b1c1a",
        "on-surface-variant": "#4d4540",
        "secondary-container": "#fee096",
        "on-secondary-container": "#786225",
        "primary-fixed": "#e9e1dd",
        "primary-container": "#1e1b19",
        "on-primary": "#ffffff",
        "on-primary-container": "#89837f",

        // Shadcn tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gold: {
          DEFAULT: "#baa460",
          dark: "#a89250",
          light: "#c2a763",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        "gutter-mobile": "1rem",
        "space-md": "1rem",
        "space-sm": "0.5rem",
        "space-xl": "2.5rem",
        gutter: "1.5rem",
        margin: "3rem",
        "space-lg": "1.5rem",
        "margin-mobile": "1.25rem",
        "space-xs": "0.25rem",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "'Open Sans'", "sans-serif"],
        serif: ["'Playfair Display'", "serif"],
        "headline-lg": ["'Playfair Display'", "serif"],
        "headline-lg-mobile": ["'Playfair Display'", "serif"],
        "headline-sm": ["'Playfair Display'", "serif"],
        "display-lg": ["'Playfair Display'", "serif"],
        "display-lg-mobile": ["'Playfair Display'", "serif"],
        "headline-md": ["'Playfair Display'", "serif"],
        "body-lg": ["'Plus Jakarta Sans'", "sans-serif"],
        "body-md": ["'Plus Jakarta Sans'", "sans-serif"],
        "body-sm": ["'Plus Jakarta Sans'", "sans-serif"],
        "label-lg": ["'Plus Jakarta Sans'", "sans-serif"],
        "label-md": ["'Plus Jakarta Sans'", "sans-serif"],
        "label-sm": ["'Plus Jakarta Sans'", "sans-serif"],
      },
      fontSize: {
        "headline-lg": ["40px", { lineHeight: "48px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-lg-mobile": ["28px", { lineHeight: "36px", letterSpacing: "0em", fontWeight: "600" }],
        "headline-sm": ["22px", { lineHeight: "30px", fontWeight: "500" }],
        "display-lg": ["56px", { lineHeight: "64px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "display-lg-mobile": ["38px", { lineHeight: "46px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-md": ["28px", { lineHeight: "36px", fontWeight: "500" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["15px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["13px", { lineHeight: "20px", fontWeight: "400" }],
        "label-lg": ["14px", { lineHeight: "20px", letterSpacing: "0.04em", fontWeight: "600" }],
        "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.06em", fontWeight: "600" }],
        "label-sm": ["10px", { lineHeight: "14px", letterSpacing: "0.08em", fontWeight: "700" }],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

