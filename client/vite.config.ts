import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  /*
   * За замовчуванням '/' — сайт лежить у корені домену.
   * Для GitHub Pages без власного домену адреса має вигляд
   * b-eng-s.github.io/SkillSprint/, тоді потрібен BASE_PATH=/SkillSprint/.
   * Увага: у такому разі абсолютні шляхи '/assets/...' у коді
   * доведеться перевести на import.meta.env.BASE_URL — їх 64.
   */
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Форма заявки б'є у /api, який проксі віддає Express-серверу,
      // щоб X-Api-Key жив тільки на бекенді.
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
})
