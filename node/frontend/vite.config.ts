import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import replace from '@rollup/plugin-replace';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [replace({
    IBHUB: 'https://ibhub.fly.dev',
    POCKETBASE : 'https://ibhub-pocketbase.fly.dev/'
  }),svelte()],
  build: {
    outDir:"public",
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
})
