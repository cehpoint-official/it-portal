/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        400: "400px",
      },
      colors: {
        signup_bg: "#EFF0F0",
        signup_2bg: "#f5fafa",
        singup_btn: "#FD345E",
        signup_txt: "#625369",
      },
    },
  },
  plugins: [
    require("postcss-import"),
    require("tailwindcss/nesting")(require("postcss-nesting")),
    require("autoprefixer"),
    require("tailwindcss"),
  ],
};
