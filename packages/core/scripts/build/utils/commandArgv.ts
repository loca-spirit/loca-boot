export function getCompName() {
  const argvs = process.argv || []
  const compNameArgv = argvs.find((item) => /--comp=\w+/.test(item))

  if (compNameArgv && /--comp=\w+/.test(compNameArgv)) {
    return compNameArgv.split('=')[1]
  }
  return ''
}
