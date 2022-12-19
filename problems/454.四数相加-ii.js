/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
/*
 * @lc app=leetcode.cn id=454 lang=javascript
 *
 * [454] 四数相加 II
 */

// @lc code=start
/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @param {number[]} D
 * @return {number}
 */
function fourSumCount(A, B, C, D) {
  // 分组 + 哈希
  // time complexity O(n^2): 两数相加的时间复杂度为O(n^2)，两次两数相加
  // space complexity O(n^2): 最坏情况a+b的值都是不相等的
  // A + B = - (C + D)
  // 核心是分组降低循环的时间复杂度，分成1+3为O(n^3)，2+2最优
  let res = 0
  const countAB = new Map()
  A.forEach((u) => {
    B.forEach((v) => {
      countAB.set(u + v, (countAB.get(u + v) ?? 0) + 1)
    })
  })
  C.forEach((u) => {
    D.forEach((v) => {
      if (countAB.has(-(u + v))) {
        res += countAB.get(-(u + v))
      }
    })
  })
  return res
}
// function fourSumCount(A, B, C, D) {
//   // 回溯
//   // 此解会超时
//   let res = 0
//   const nums = [A, B, C, D]
//   const queue = []
//   backtrack(0)
//   return res
//   function backtrack(index) {
//     if (index === 4) {
//       const total = queue.reduce((pre, cur) => pre + cur, 0)
//       if (total === 0) res += 1
//       return
//     }
//     const currentNum = nums[index]
//     for (const num of currentNum) {
//       queue.push(num)
//       backtrack(index + 1)
//       queue.pop()
//     }
//   }
// }
// @lc code=end

fourSumCount([1, 2], [-2, -1], [-1, 2], [0, 2]) // 2
