import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),],
  build: {
    rollupOptions: {
      external: [
        'lodash/padStart',
        'lodash/padEnd',
        'lodash/debounce',
        'lodash/isEqual',
        'memoize-one',
        '@ctrl/tinycolor',
        'rc-notification',
      ],
      
    },
    
  },
})


