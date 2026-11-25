import postcssGlobalData from "@csstools/postcss-global-data";
import postcssCustomMedia from "postcss-custom-media";

// Rend les breakpoints de src/styles/breakpoints.css disponibles
// dans tous les fichiers CSS, sous la forme @media (--mobile).
export default {
  plugins: [
    postcssGlobalData({ files: ["src/styles/breakpoints.css"] }),
    postcssCustomMedia(),
  ],
};
