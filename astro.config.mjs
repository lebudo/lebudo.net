import { defineConfig } from "astro/config";
import remarkBreaks from "remark-breaks";

// https://astro.build/config
export default defineConfig({
  site: "https://lebudo.net",
  output: "static",
  markdown: {
    remarkPlugins: [remarkBreaks],
  },
  build: {
    format: "file",
  },
});
