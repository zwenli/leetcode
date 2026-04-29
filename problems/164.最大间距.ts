export default function maximumGap(nums: number[]): number {
  const n = nums.length
  if (n < 2) return 0

  let min = Infinity
  let max = -Infinity
  for (const v of nums) {
    if (v < min) min = v
    if (v > max) max = v
  }
  if (min === max) return 0

  const bucketSize = Math.max(1, Math.floor((max - min) / (n - 1)))
  const bucketCount = Math.floor((max - min) / bucketSize) + 1

  const bucketMin = new Array<number>(bucketCount).fill(Infinity)
  const bucketMax = new Array<number>(bucketCount).fill(-Infinity)
  const used = new Array<boolean>(bucketCount).fill(false)

  for (const v of nums) {
    const idx = Math.floor((v - min) / bucketSize)
    bucketMin[idx] = Math.min(bucketMin[idx], v)
    bucketMax[idx] = Math.max(bucketMax[idx], v)
    used[idx] = true
  }

  let prev = min
  let maxGap = 0
  for (let i = 0; i < bucketCount; i++) {
    if (!used[i]) continue
    maxGap = Math.max(maxGap, bucketMin[i] - prev)
    prev = bucketMax[i]
  }

  return maxGap
}
