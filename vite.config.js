import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// base './' keeps assets working on any GitHub Pages repo subpath
export default defineConfig({ base: './', plugins: [react()] })
