import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'

  return {
    plugins: [
      react({
        jsxRuntime: 'automatic',
        jsxImportSource: 'react',
      }),
      mode === 'analyze' &&
        visualizer({
          filename: 'dist/stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true
        })
    ].filter(Boolean),

    build: {
      target: 'esnext',
      minify: 'terser',
      cssMinify: true,
      sourcemap: !isProduction,
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: true,
          pure_funcs: isProduction
            ? ['console.log', 'console.info', 'console.debug', 'console.warn']
            : [],
          dead_code: true,
          unused: true,
          booleans_as_integers: false,
          join_vars: true,
          reduce_vars: true,
          loops: true,
          toplevel: true,
          top_retain: null,
          typeofs: false,
          unsafe: false,
          unsafe_arrows: false,
          unsafe_comps: false,
          unsafe_Function: false,
          unsafe_math: false,
          unsafe_symbols: false,
          unsafe_methods: false,
          unsafe_proto: false,
          unsafe_regexp: false,
          unsafe_undefined: false,
          conditionals: true,
          comparisons: true,
          evaluate: true,
          booleans: true,
          passes: 3,
          global_defs: {}
        },
        mangle: {
          safari10: true,
          properties: false,
          toplevel: true
        },
        format: {
          comments: false,
          beautify: false,
          preamble: null
        },
        ecma: 2020,
        keep_classnames: false,
        keep_fnames: false,
        module: false,
        nameCache: null,
        safari10: true,
        toplevel: true
      },

      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) return 'vendor-react'
              if (id.includes('firebase')) return 'vendor-firebase'
              if (id.includes('framer-motion')) return 'vendor-animation'
              if (id.includes('react-router')) return 'vendor-router'
              return 'vendor-other'
            }
          },
          chunkFileNames: isProduction
            ? 'assets/js/[name]-[hash:8].js'
            : 'assets/js/[name].js',
          entryFileNames: isProduction
            ? 'assets/js/[name]-[hash:8].js'
            : 'assets/js/[name].js',
          assetFileNames: (assetInfo) => {
            const extType = assetInfo.name.split('.').at(1)
            const basePath = isProduction ? '[name]-[hash:8][extname]' : '[name][extname]'
            if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) return `assets/images/${basePath}`
            if (/css/i.test(extType)) return `assets/css/${basePath}`
            if (/woff2?|eot|ttf|otf/i.test(extType)) return `assets/fonts/${basePath}`
            return `assets/${basePath}`
          }
        }
      },

      assetsInlineLimit: 4096,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000,
      modulePreload: {
        polyfill: true
      }
    },

    server: {
      port: 3000,
      host: true,
      open: true,
      cors: true,
      hmr: {
        overlay: false
      }
    },

    preview: {
      port: 4173,
      host: true
    },

    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@pages': '/src/pages',
        '@assets': '/src/assets',
        '@utils': '/src/utils',
        '@hooks': '/src/hooks'
      }
    },

    css: {
      devSourcemap: !isProduction,
      modules: {
        localsConvention: 'camelCase'
      }
    },

    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      __PRODUCTION__: JSON.stringify(isProduction)
    },

    base: './',

    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
      exclude: []
    }
  }
})
