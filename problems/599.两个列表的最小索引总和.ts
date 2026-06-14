/*
 * @lc app=leetcode.cn id=599 lang=typescript
 *
 * [599] 两个列表的最小索引总和
 */

// @lc code=start
function findRestaurant(list1: string[], list2: string[]): string[] {
  const idx = new Map<string, number>()
  for (const [i, s] of list1.entries()) {
    idx.set(s, i)
  }
  const res: string[] = []
  let indexSum = Infinity
  for (let i = 0; i < list2.length; i++) {
    if (!idx.has(list2[i])) continue
    const j = idx.get(list2[i])!
    if (i + j < indexSum) {
      res.length = 0
      res.push(list2[i])
      indexSum = i + j
    } else if (i + j === indexSum) {
      res.push(list2[i])
    }
  }
  return res
};
// @lc code=end
