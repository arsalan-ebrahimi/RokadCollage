import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  base: './', // relative paths so the file opens from anywhere (file:// or desktop)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist-single',
    sourcemap: false,
    cssCodeSplit: false,
    assetsInlineLimit: 100000000, // inline images as data URIs where possible
  },
})
