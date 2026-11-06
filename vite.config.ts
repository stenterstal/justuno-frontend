import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  server: {
    // Same-origin API like production, so other devices on the network (with --host) work too
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})
