/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs/promises';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log(env)

  return {
    plugins: [react()],
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      // loader: "tsx",
      // include: /src\/.*\.[tj]sx?$/,
      exclude: [],
    },
    server: {
      port: 3005,
      host: true,
      strictPort: true,
      watch: {
        usePolling: true
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          {
            name: 'load-js-files-as-jsx',
            setup(build) {
              build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
                loader: 'jsx',
                contents: await fs.readFile(args.path, 'utf8'),
              }));
            },
          },
        ],
      },
    },
    resolve: {
      alias: {
        'src': "/src",
        "components": "/src/components"
      }
    },
  }
})
