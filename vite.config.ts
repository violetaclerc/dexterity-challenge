import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // Generate more readable class names in development
      generateScopedName: process.env.NODE_ENV === 'development' 
        ? '[name]__[local]' 
        : '[hash:base64:5]'
    }
  }
})
