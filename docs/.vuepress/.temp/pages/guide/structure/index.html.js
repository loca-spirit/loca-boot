import comp from "/Users/shuaimeng/Workspace/loca-boot/docs/.vuepress/.temp/pages/guide/structure/index.html.vue"
const data = JSON.parse("{\"path\":\"/guide/structure/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"permalink\":\"/guide/structure/\",\"gitInclude\":[]},\"headers\":[{\"level\":2,\"title\":\"文档部分 docs\",\"slug\":\"文档部分-docs\",\"link\":\"#文档部分-docs\",\"children\":[{\"level\":3,\"title\":\"README.md\",\"slug\":\"readme-md\",\"link\":\"#readme-md\",\"children\":[]},{\"level\":3,\"title\":\"guide\",\"slug\":\"guide\",\"link\":\"#guide\",\"children\":[]},{\"level\":3,\"title\":\".vuepress\",\"slug\":\"vuepress\",\"link\":\"#vuepress\",\"children\":[]},{\"level\":3,\"title\":\"config.ts\",\"slug\":\"config-ts\",\"link\":\"#config-ts\",\"children\":[]},{\"level\":3,\"title\":\"client.ts\",\"slug\":\"client-ts\",\"link\":\"#client-ts\",\"children\":[]},{\"level\":3,\"title\":\"configs\",\"slug\":\"configs\",\"link\":\"#configs\",\"children\":[]}]},{\"level\":2,\"title\":\"SDK代码部分 packages\",\"slug\":\"sdk代码部分-packages\",\"link\":\"#sdk代码部分-packages\",\"children\":[{\"level\":3,\"title\":\"sdk-lib-template-tools\",\"slug\":\"sdk-lib-template-tools\",\"link\":\"#sdk-lib-template-tools\",\"children\":[]},{\"level\":3,\"title\":\"sdk-lib-templateXXX\",\"slug\":\"sdk-lib-templatexxx\",\"link\":\"#sdk-lib-templatexxx\",\"children\":[]}]}],\"readingTime\":{\"minutes\":4.05,\"words\":1214},\"filePathRelative\":\"guide/structure.md\",\"excerpt\":\"<p>SDK Template 由以下两部分组成：<code>Docs文档部分</code>和<code>SDK代码部分</code>。</p>\\n\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
