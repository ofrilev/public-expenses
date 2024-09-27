import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/app/",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {},
    },
  },
});
