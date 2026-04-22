function canMeasureWater(x: number, y: number, target: number): boolean {
  if (target === 0) return true
  if (x + y < target) return false
  if (x === 0) return target === y
  if (y === 0) return target === x
  
  let a = Math.abs(x), b = Math.abs(y)
  while (b !== 0) {
    const t = a % b
    a = b
    b = t
  }
  const g = a
  return target % g === 0
}
