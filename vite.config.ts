import path from "path"
import basicSsl from "@vitejs/plugin-basic-ssl"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  // Browsers only expose navigator.geolocation in a secure context, and a LAN
  // IP over http is not one — the address picker cannot find you on a phone
  // without this. The cert is self-signed, so accept the warning once.
  plugins: [react(), tailwindcss(), basicSsl()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
