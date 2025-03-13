import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { analyzer } from 'vite-bundle-analyzer'


export default defineConfig({
  base: "/app/",
  server: {
    host:"expensify",
    port:5173,
  },
  plugins: [react(), analyzer()],
  build: {
    rollupOptions: {
      output: {},
    },
  },
});
