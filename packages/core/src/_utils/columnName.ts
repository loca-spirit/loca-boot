// 驼峰 → 蛇形
export function camelToSnake(str: string) {
  return str
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '')
}

// 蛇形 → 驼峰
export function snakeToCamel(str: string) {
  return str.replace(/(_\w)/g, (match) => match[1].toUpperCase())
}
