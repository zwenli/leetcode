/*
 * @lc app=leetcode.cn id=491 lang=javascript
 *
 * [491] 递增子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var findSubsequences = function (nums) {
  // 递归 + 哈希
  // time complexity O(2^n * n): 递归的时间复杂度为O(2^n)，添加答案所需的时间复杂度为O(n)
  // space complexity O(n): 临时数组的空间为O(n)，递归栈的空间也是为O(n)，哈希表空间也是为O(n)
  const res = []
  dfs(0, [])
  return res
  function dfs(index, sequence) {
    // 只要长度大于等于2，都是所求答案
    if (sequence.length > 1) {
      res.push([...sequence])
    }
    // used只用用这一层递归，记录使用过的数字，遇到重复的就跳过
    // 下一层递归会重新设置新的set，所以不影响下一层加新的重复元素。
    const used = new Set()
    for (let i = index; i < nums.length; i++) {
      if (used.has(nums[i])) continue
      if (sequence.length === 0 || nums[i] >= sequence[sequence.length - 1]) {
        used.add(nums[i])
        sequence.push(nums[i])
        dfs(i + 1, sequence)
        sequence.pop()
      }
    }
  }
}

// var findSubsequences = function (nums) {
//   // 递归 + 剪枝
//   // time complexity O(2^n * n): 递归的时间复杂度为O(2^n)，添加答案所需的时间复杂度为O(n)
//   // space complexity O(n): 临时数组的空间为O(n)，递归栈的空间也是为O(n)
//   // 如果保证不重复，需要给「不选择」做一个限定条件，
//   // 只有当当前的元素不等于上一个选择的元素的时候，才考虑不选择当前元素，直接递归后面的元素。
//   // 因为如果有两个相同元素，会考虑有如下四种情况：
//   // 1. 前者被选，后者被选
//   // 2. 前者被选，后者不被选
//   // 3. 前者不被选，后者被选
//   // 4. 前者不被选，后者不被选
//   // 2和3这两种情况其实是等价的，我们这样限制之后，舍弃了第2种，保留了第3种，于是达到了去重的目的。
//   const res = []
//   if (!nums || nums.length < 2) return res
//   const sequence = []
//   dfs(0, Number.MIN_SAFE_INTEGER)
//   return res
//   function dfs(index, last) {
//     if (index === nums.length) {
//       if (sequence.length >= 2) {
//         res.push([...sequence])
//       }
//       return
//     }
//     // 当前元素大于等于上一个元素，考虑选择当前元素
//     if (nums[index] >= last) {
//       sequence.push(nums[index])
//       dfs(index + 1, nums[index])
//       sequence.pop()
//     }
//     // 当前元素不等于上一个选择元素时，才考虑不选择当前元素
//     if (nums[index] !== last) {
//       dfs(index + 1, last)
//     }
//   }
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = findSubsequences([4, 6, 7, 7])
assert.deepEqual(res1, [
  [4, 6],
  [4, 6, 7],
  [4, 6, 7, 7],
  [4, 7],
  [4, 7, 7],
  [6, 7],
  [6, 7, 7],
  [7, 7],
])

const res2 = findSubsequences([4, 4, 3, 2, 1])
assert.deepEqual(res2, [[4, 4]])
