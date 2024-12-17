import { fs, path } from '@vuepress/utils'
import type { App } from 'vuepress'
import type { Plugin } from 'vite'
const iframePath = path.resolve(__dirname, '../../client-iframe/app.ts')

export const vitePageIframe = (app: App): Plugin => {
  return {
    name: '@bfehub/vuepress-plugin-code-block:iframe',
    async config(config) {
      if (config.build?.ssr) return

      const input = config.build?.rollupOptions?.input
      const inputs: string[] = []

      if (typeof input === 'string') {
        inputs.push(input)
      } else if (typeof input === 'object') {
        inputs.push(...Object.values(input))
      } else if (Array.isArray(input)) {
        inputs.push(...(input as any[]))
      }
      inputs.push(app.dir.temp('vite-root/-iframe.html'))

      config.build.rollupOptions.input = inputs

      await app.writeTemp(
        'vite-root/-iframe.html',
        fs
          .readFileSync(
            app.env.isBuild
              ? app.options.templateBuild
              : app.options.templateDev
          )
          .toString()
          .replace(
            /<\/body>/,
            `\
<script type="module">
import '${iframePath}'
</script>
</body>`
          )
      )
    },
    generateBundle(_, bundle) {
      // Make sure app chunk is first
      Object.entries(bundle).forEach(([key, val]) => {
        if (val.type === 'chunk' && val.name !== 'app' && val.isEntry) {
          delete bundle[key]
          bundle[key] = val
        }
      })
    },
  }
}
