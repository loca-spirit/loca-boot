import { compPackage } from './paths'

export const target = 'es5'

export const getCompPackage = () => {
  const {
    version,
    dependencies = {},
    peerDependencies = {},
  } = require(compPackage)
  return {
    version,
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  }
}

export const generateExternal = (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getCompPackage()

  const packages: string[] = peerDependencies

  if (options.full) {
    packages.push(...dependencies)
  }

  return (id: string) => {
    return packages.some(
      (pkg) => id === pkg || (options.full && id.startsWith(`${pkg}/`))
    )
  }
}

export const generatePaths = (isEsBuild = false) => {
  const pathsEs = [

  ]
  let paths = [

  ]

  return (id: string) => {
    if (isEsBuild) {
      paths = pathsEs
    }
    for (const [oldPath, newPath] of paths) {
      // 如果遇到绝对路径是 @arco-design/web-vue 的，则替换成es目录。
      if (isEsBuild) {
        if (id === oldPath) {
          return id.replace(oldPath, newPath)
        }
      } else {
        if (id.startsWith(oldPath)) {
          return id.replace(oldPath, newPath)
        }
      }
    }

    return ''
  }
}
