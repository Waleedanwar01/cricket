import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import postcssPlugin from "@tailwindcss/postcss";

const config = {
  plugins: [tailwindcss, autoprefixer, postcssPlugin],
};

export default config;
