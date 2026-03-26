import { resolve } from "node:path";
import { defineConfig } from "vite";
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        home: resolve(__dirname, "pages/home.html"),
        writeDiary: resolve(__dirname, "pages/writeDiary.html"),
        diaryLists: resolve(__dirname, "pages/diaryLists.html"),
        calender: resolve(__dirname, "pages/calender.html"),
      },
    },
  },
});
