import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Monte001/',
  server: {
    port: 8080,  // ora Vite parte su localhost:8080
  }
});
