import { resolve } from 'path'
import { getCompName } from './commandArgv'

// root
export const root = resolve(__dirname, '..', '..', '..')
export const projectTsconfig = resolve(root, '..', '..', 'tsconfig.json')
export const srcRoot = resolve(root, 'src')
export const compRoot = resolve(root, 'src', getCompName())

// output
export const output = resolve(root, 'dist')
export const outputEsm = resolve(root, 'es')
export const outputCjs = resolve(root, 'lib')

// package
export const compPackage = resolve(root, 'package.json')
