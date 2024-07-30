import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth-btn-linear-gradient': 'linear-gradient(to bottom, #4C38C2 100%, #2F2188 100%, #FFFFFF 30%)',
        'create-task-linear-gradient': 'linear-gradient(to bottom, #4C38C2 100%, #2F2188 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
