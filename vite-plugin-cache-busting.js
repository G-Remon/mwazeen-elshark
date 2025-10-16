// plugin مخصص لتحسين cache busting
export default function cacheBustingPlugin() {
  return {
    name: 'cache-busting',
    generateBundle(options, bundle) {
      // إضافة timestamp إلى أسماء الملفات في التطوير
      if (process.env.NODE_ENV !== 'production') {
        const timestamp = Date.now()
        for (const [fileName, chunk] of Object.entries(bundle)) {
          if (fileName.endsWith('.js')) {
            chunk.fileName = chunk.fileName.replace('.js', `-${timestamp}.js`)
          }
        }
      }
    }
  }
}