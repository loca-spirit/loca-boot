import type { App } from '@vuepress/core'
import type { PageCodeDep, PageCodeDepsHelper } from '../utils/index.js'
import { setCache, isCacheChange } from '../utils/index.js'

/**
 * Generate component path to components map temp file
 */
export const prepareVmiComponents = async (
  app: App,
  store: PageCodeDepsHelper
) => {
  const map = new Map<string, PageCodeDep>()
  for (const page of app.pages) {
    for (const comp of store.get(page.filePath)) {
      comp.isGenerateIframe && map.set(comp.compPath, comp)
    }
  }

  const content = `\
import { defineAsyncComponent } from 'vue'

export const components = {\
${[...map.values()]
  .map(
    ({ compHash, compPath }) => `
  // path: ${compPath}
  ${JSON.stringify(compHash)}: defineAsyncComponent(() => import(${
      compHash ? `/* webpackChunkName: "${compHash}" */` : ''
    }${JSON.stringify(compPath)})),`
  )
  .join('')}
}
`

  const writeTempPath = 'internal/pagesVmiComponents.js'
  if (isCacheChange(writeTempPath, content)) {
    setCache(writeTempPath, content)
    await app.writeTemp(writeTempPath, content)
  }
}
