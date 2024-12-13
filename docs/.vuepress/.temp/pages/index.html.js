import comp from "/Users/shuaimeng/Workspace/loca-boot/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"permalink\":\"/\",\"home\":true,\"heroText\":\"ModelBase\",\"tagline\":\"What is ModelBase\",\"actions\":[{\"text\":\"快速上手\",\"link\":\"/guide/start/\",\"type\":\"primary\"}],\"features\":[{\"title\":\"诞生\",\"details\":\"ModelBase诞生于2017年，是一个被后端团队不断锤炼出来的一个小工具，目标是想一行代码来解决前端处理数据的痛苦的方式。\"},{\"title\":\"Typescript\",\"details\":\"基于Typescript创建的模型管理工具。\"}],\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.3,\"words\":89},\"filePathRelative\":\"../README.md\",\"excerpt\":\"\"}")
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
