function construct2DArray(
  original: number[],
  m: number,
  n: number,
): number[][] {
  if (m * n !== original.length) return []
  const ans = new Array(m).fill(0).map(() => new Array(n).fill(0))
  for (let i = 0; i < original.length; i++) {
    ans[Math.floor(i / n)][i % n] = original[i]
  }
  return ans
}
