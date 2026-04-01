function thirdMax(nums: number[]): number {
  let max1: number | null = null
  let max2: number | null = null
  let max3: number | null = null

  for (const x of nums) {
    if (max1 !== null && x === max1) continue
    if (max2 !== null && x === max2) continue
    if (max3 !== null && x === max3) continue

    if (max1 === null || x > max1) {
      max3 = max2
      max2 = max1
      max1 = x
    } else if (max2 === null || x > max2) {
      max3 = max2
      max2 = x
    } else if (max3 === null || x > max3) {
      max3 = x
    }
  }

  return max3 === null ? (max1 as number) : max3
}
