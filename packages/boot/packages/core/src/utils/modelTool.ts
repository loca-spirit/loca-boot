export function getPropByPath(obj: any, path: string, strict: boolean) {
	let tempObj = obj
	path = path.replace(/\[(\w+)\]/g, '.$1')
	path = path.replace(/^\./, '')

	const keyArr = path.split('.')
	let i = 0
	for (const len = keyArr.length; i < len - 1; ++i) {
		if (!tempObj && !strict) {
			break
		}
		const key = keyArr[i]
		if (key in tempObj) {
			tempObj = tempObj[key]
		} else {
			if (strict) {
				throw new Error('please transfer a valid prop path to form item!')
			}
			break
		}
	}
	return {
		o: tempObj,
		k: keyArr[i],
		v: tempObj ? tempObj[keyArr[i]] : null
	}
}

export function getValueByPath(object: any, prop: string) {
	prop = prop || ''
	const paths = prop.split('.')
	let current = object
	let result = null
	for (let i = 0, j = paths.length; i < j; i++) {
		const path = paths[i]
		if (!current) {
			break
		}

		if (i === j - 1) {
			result = current[path]
			break
		}
		current = current[path]
	}
	return result
}

export function setValueByPath(object: any, prop: string, value: any) {
	prop = prop || ''
	const paths = prop.split('.')
	let current = object
	for (let i = 0, j = paths.length; i < j; i++) {
		const path = paths[i]
		if (!current) {
			break
		}

		if (i === j - 1) {
			current[path] = value
			break
		}
		current = current[path]
	}
}
