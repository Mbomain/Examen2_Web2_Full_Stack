import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', 
    port: process.env.PORT || 5000,  
    proxy: {
      '/patrimoines': {
        target: process.env.REACT_APP_API_URL || 'http://localhost:5000',  
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
