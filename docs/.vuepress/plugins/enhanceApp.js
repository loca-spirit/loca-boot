export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    if (to.path.endsWith('.html')) {
      const noHtmlPath = to.path.replace(/\.html$/, '')
      next({ path: noHtmlPath, query: to.query, hash: to.hash })
    } else {
      next()
    }
  })
}
