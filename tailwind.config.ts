/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      typography: (theme: (arg0: string) => any) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme("colors.pink.500"),
              textDecoration: "none",
              "&:hover": {
                color: theme("colors.pink.600"),
              },
            },
            h2: {
              color: theme("colors.pink.500"),
              textDecoration: "none",
            },
            strong: {
              color: theme("colors.pink.500"),
              textDecoration: "none",
            },
          },
        },
      }),
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("@tailwindcss/typography"),
  ],
};
export default config;
