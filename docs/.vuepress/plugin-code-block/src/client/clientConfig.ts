import { defineClientConfig } from '@vuepress/client'
import Previewer from './components/Previewer.vue'
import Example from './components/Example.vue'
import SourceCode from './components/SourceCode.vue'
import SourceCodeItem from './components/SourceCodeItem.vue'

import './styles/index.scss'

export default defineClientConfig({
  enhance({ app }) {
    // @ts-ignore
    app.component('VmiPreviewer', Previewer)
    // @ts-ignore
    app.component('VmiExample', Example)
    // @ts-ignore
    app.component('VmiSourceCode', SourceCode)
    // @ts-ignore
    app.component('VmiSourceCodeItem', SourceCodeItem)
  },
})
