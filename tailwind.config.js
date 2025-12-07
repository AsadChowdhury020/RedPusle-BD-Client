import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {},
  },

  daisyui: {
    themes: ["bloodbank-light", "bloodbank-dark"],
  },

  plugins: [daisyui],
};
