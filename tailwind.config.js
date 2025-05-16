/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "375px",
      sm: "768px",
      md: "992px",
      lg: "1200px",
      xl: "1600px",
    },
    extend: {
      fontSize: {
        display1: ["56px", { lineHeight: "72px", letterSpacing: "-0.0316em" }],
        display2: ["40px", { lineHeight: "52px", letterSpacing: "-0.0282em" }],
        title1: ["36px", { lineHeight: "48px", letterSpacing: "-0.0272em" }],
        title2: ["28px", { lineHeight: "38px", letterSpacing: "-0.0236em" }],
        title3: ["24px", { lineHeight: "32px", letterSpacing: "-0.0232em" }],
        heading1: ["22px", { lineHeight: "30px", letterSpacing: "-0.0176em" }],
        heading2: ["20px", { lineHeight: "28px", letterSpacing: "-0.012em" }],
        headline1: ["18px", { lineHeight: "26px", letterSpacing: "-0.002em" }],
        headline2: ["17px", { lineHeight: "24px", letterSpacing: "0em" }],
        body1: ["16px", { lineHeight: "24px", letterSpacing: "0.0057em" }],
        body1Reading: [
          "16px",
          { lineHeight: "28px", letterSpacing: "0.0057em" },
        ],
        body2: ["15px", { lineHeight: "22px", letterSpacing: "0.0069em" }],
        body2Reading: [
          "15px",
          { lineHeight: "26px", letterSpacing: "0.0069em" },
        ],
        label1: ["14px", { lineHeight: "20px", letterSpacing: "0.0145em" }],
        label1Reading: [
          "14px",
          { lineHeight: "20px", letterSpacing: "0.0145em" },
        ],
        label2: ["12px", { lineHeight: "18px", letterSpacing: "0.0156em" }],
        caption1: ["12px", { lineHeight: "16px", letterSpacing: "0.0137em" }],
        caption2: ["10px", { lineHeight: "14px", letterSpacing: "0.0137em" }],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
