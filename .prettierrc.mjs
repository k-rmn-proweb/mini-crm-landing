/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss"],
  // Tailwind v4 has no JS config file — point the plugin at the stylesheet.
  tailwindStylesheet: "./src/app/globals.css",
};

export default config;
