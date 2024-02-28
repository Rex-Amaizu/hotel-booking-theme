import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        ms: "600px",
        md: "768px",
        lg: "976px",
        sl: "1280px",
        xl: "1440px",
      },
      fontSize: {
        ss: "0.5rem",
        sxs: "0.375rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        smBoxWhite: "0px 4px 4px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
