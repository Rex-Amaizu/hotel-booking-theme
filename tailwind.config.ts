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
        sms: "365px",
        sm: "480px",
        smx: "515px",
        xms: "540px",
        ms: "600px",
        msx: "650px",
        mdx: "720px",
        md: "768px",
        lg: "976px",
        ls: "1150px",
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
      zIndex: {
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
      },
      borderWidth: {
        DEFAULT: "1px",
        "0.5": "0.5px",
        "1": "1px",
        "0": "0",
        "2": "2px",
        "3": "3px",
        "4": "4px",
        "6": "6px",
        "8": "8px",
        "9": "2px solid #425c5a",
      },
      borderRadius: {
        "50g": "50%",
      },
    },
  },
  plugins: [],
};
export default config;
