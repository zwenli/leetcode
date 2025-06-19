/*
 * @lc app=leetcode.cn id=898 lang=javascript
 *
 * [898] 子数组按位或操作
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
function subarrayBitwiseORs(arr) {
  // 结果集合：存储所有可能的按位或结果
  const ans = new Set()
  // 当前可能值集合：存储以当前元素结尾的子数组的所有可能或值
  let cur = new Set([0])  // 初始值0用于处理空子数组的情况
  
  // 遍历数组中的每个元素
  for (const x of arr) {
    const next = new Set()
    
    // 生成新的可能或值：当前元素与之前所有可能值的或操作
    for (const y of cur) {
      next.add(x | y)
    }
    // 包含当前元素自身（单个元素的子数组情况）
    next.add(x)
    
    // 更新当前可能值集合
    cur = next
    
    // 将当前所有可能值加入最终结果集
    for (let v of cur) {
      ans.add(v)
    }
  }

  return ans.size
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = subarrayBitwiseORs([1, 1, 2])
assert.equal(res1, 3)

const res2 = subarrayBitwiseORs([1, 2, 4])
assert.equal(res2, 6)
