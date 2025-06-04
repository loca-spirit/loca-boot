export function toRaw<T>(observed: T): T {
  const raw = observed && (observed as any).__v_raw
  return raw ? toRaw(raw) : (observed as any)?.__target__ ? (observed as any).__target__ : (observed as any)
}

function isObject(val: any) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false
}

function isObjectObject(o: any) {
  return isObject(o) === true && Object.prototype.toString.call(o) === '[object Object]'
}

function isPlainObject(o: any) {
  if (isObjectObject(o) === false) {
    return false
  }

  // If has modified constructor
  const ctor = o.constructor
  if (typeof ctor !== 'function') {
    return false
  }

  // If has modified prototype
  const prot = ctor.prototype
  if (isObjectObject(prot) === false) {
    return false
  }

  // If constructor does not have an Object-specific method
  if (!prot.hasOwnProperty('isPrototypeOf')) {
    return false
  }

  // Most likely a plain Object
  return true
}

export const ModelTool = {
  isPlainObject,
}
