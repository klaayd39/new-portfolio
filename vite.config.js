import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Some deps (e.g. lottie-react) ship a UMD "browser" build whose
    // default-export interop doesn't unwrap cleanly through esbuild's
    // dependency pre-bundling. Preferring the pure ESM build avoids that.
    mainFields: ['module', 'browser', 'main'],
  },
})
