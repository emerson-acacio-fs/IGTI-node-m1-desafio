export function sortObj<T, K extends keyof T>(
  obj: T[],
  key: K,
  order: 'asc' | 'desc' = 'asc',
): T[] {
  if (order === 'desc') {
    return obj.sort((a, b) => (b[key] < a[key] ? -1 : 1))
  }
  return obj.sort((a, b) => (b[key] > a[key] ? -1 : 1))
}
