// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'
import fs from 'fs'

export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@use 'src/styles/_variables.scss' as *;`,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@svg': path.resolve(__dirname, './public'),
    },
  },

  server: {
    // host: '0.0.0.0', // Cho phép truy cập từ thiết bị khác (điện thoại)
    // port: 5173,

    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, '.cert/key.pem')),
    //   cert: fs.readFileSync(path.resolve(__dirname, '.cert/cert.pem')),
    // },

    proxy: {
      '/api': {
        target: 'https://localhost:7151', // Backend ASP.NET
        changeOrigin: true,
        secure: false, // Cho phép SSL tự ký
      },
    },
   
  },
})
