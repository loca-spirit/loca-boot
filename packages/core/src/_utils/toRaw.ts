export function toRaw<T = any>(observed: T): T {
  const raw = observed && (observed as any).__v_raw
  return raw ? toRaw(raw) : (observed as any)?.__target__ ? (observed as any).__target__ : (observed as any)
}
