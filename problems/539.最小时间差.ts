function findMinDifference(timePoints: string[]): number {
  const n = timePoints.length
  if (n > 1440) return 0

  const toMin = (t: string) => {
    const [h, m] = t.split(':').map(Number)
    return h * 60 + m
  }

  const mins = timePoints.map(toMin).sort((a, b) => a - b)
  let res = Infinity
  for (let i = 1; i < n; i++) {
    if (mins[i] === mins[i - 1]) return 0
    res = Math.min(res, mins[i] - mins[i - 1])
  }
  // 考虑环绕（最后到第一个，跨天）
  res = Math.min(res, mins[0] + 1440 - mins[n - 1])
  return res
}
