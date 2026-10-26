import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// /api requests in development go to the contact-form server (npm run server, port 3001)
export default defineConfig({ plugins: [react()], server: { proxy: { '/api': 'http://localhost:3001' } } })
