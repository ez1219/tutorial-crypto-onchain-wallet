import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server'

// https://vite.dev/config/
export default defineConfig({
  plugins: [UnoCSS(), react(), mockDevServerPlugin()],
  server: {
    proxy: {
      '^/api': 'http://example.com/',
    },
  },
})
