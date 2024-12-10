import { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

const customRouterPlugin: Plugin = (options, app) => {
  return {
    name: 'custom-router-plugin',
    clientAppEnhanceFiles: path.resolve(__dirname, './enhanceApp.js'),
  }
}

export default customRouterPlugin
