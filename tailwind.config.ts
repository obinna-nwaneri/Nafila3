import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          50: "#f5f7ff",
          100: "#e6ebff",
          200: "#c3cdff",
          300: "#96a6ff",
          400: "#5f73ff",
          500: "#394dff",
          600: "#2939db",
          700: "#1f2cb0",
          800: "#1c2b8b",
          900: "#1c2a6f"
        }
      }
    }
  },
  plugins: [],
};

export default config;
