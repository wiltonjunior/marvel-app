import path from "path"
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr' 
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: "**/*.svg",
      svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "ES2022" 
  },
})
