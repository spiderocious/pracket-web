import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@ui$/, replacement: path.resolve(__dirname, 'src/shared/ui/index.ts') },
      { find: '@ui', replacement: path.resolve(__dirname, 'src/shared/ui') },
      { find: '@app', replacement: path.resolve(__dirname, 'src') },
      { find: '@features', replacement: path.resolve(__dirname, 'src/features') },
      { find: '@shared', replacement: path.resolve(__dirname, 'src/shared') },
    ],
  },
})
