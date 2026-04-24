import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote_products',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductsSearch': {
          import: './src/components/ProductsSearch.tsx',
          dontAppendStylesToHead: true,
        },
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: 5175,
    strictPort: true,
  },
  build: {
    target: 'esnext',
    cssCodeSplit: false,
  },
})
