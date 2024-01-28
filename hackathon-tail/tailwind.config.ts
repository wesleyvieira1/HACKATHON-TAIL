import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        'moisesai-color':'#00DAEB'
      },
      keyframes:{
        slideDown:{
          "0%":{transform : 'translateY(-50px)', opacity : "0" },
          "100%":{transform : 'translateY(0px)', opacity : "1" }
        }
      },
      animation: {
        "slide-down" : "slideDown 0.5s ease-in-out 500ms",
      }
    },
  },
  plugins: [],
};
export default config;
