import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'

/**
 * GitHub Pages ne connaît pas les routes React : /Portfolio/projets renverrait
 * une 404. On copie index.html en 404.html pour que GitHub serve l'app,
 * qui affiche ensuite la bonne page.
 */
function githubPagesSpaFallback(): Plugin {
  return {
    name: 'github-pages-spa-fallback',
    apply: 'build',
    closeBundle() {
      const dist = resolve(__dirname, 'dist')
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/Portfolio/',
  plugins: [react(), githubPagesSpaFallback()],
})
