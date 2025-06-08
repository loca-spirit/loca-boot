import fs from 'fs'
import { compPackage } from './paths'

export const target = 'es6'

export const getCompPackage = async () => {
  const { version, dependencies = {}, peerDependencies = {} } = JSON.parse(fs.readFileSync(compPackage, 'utf-8'))
  return {
    version,
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  }
}

export const generateExternal = async (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = await getCompPackage()

  const packages: string[] = peerDependencies

  if (options.full) {
    packages.push(...dependencies)
  }

  return (id: string) => {
    return packages.some((pkg) => id === pkg || (options.full && id.startsWith(`${pkg}/`)))
  }
}

export const generatePaths = (isEsBuild = false) => {
  const pathsEs = []
  let paths = []

  return (id: string) => {
    if (isEsBuild) {
      paths = pathsEs
    }
    for (const [oldPath, newPath] of paths as [string, string][]) {
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
