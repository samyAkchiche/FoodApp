import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.SPOONACULAR_API_KEY

  if (!apiKey) {
    console.warn(
      '\n[foodapp] SPOONACULAR_API_KEY is not set. Copy .env.example to .env and add your key,\n' +
        'otherwise recipe requests will fail with a 401 from the Spoonacular API.\n'
    )
  }

  // In production /api/spoonacular is handled by netlify/functions/spoonacular.js.
  // Locally we proxy it straight to Spoonacular so the key stays server-side.
  const proxy = {
    '/api/spoonacular': {
      target: 'https://api.spoonacular.com',
      changeOrigin: true,
      rewrite: (path) => {
        const url = path.replace(/^\/api\/spoonacular/, '')
        const separator = url.includes('?') ? '&' : '?'
        return `${url}${separator}apiKey=${apiKey ?? ''}`
      },
    },
  }

  return {
    plugins: [react()],
    server: { proxy },
    preview: { proxy },
  }
})
