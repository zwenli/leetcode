/*
 * @lc app=leetcode.cn id=2635 lang=javascript
 *
 * [2635] 转换数组中的每个元素

 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {(n: number, i: number) => any} fn
 * @return {number[]}
 */
function map(arr, fn) {
  const res = new Array(arr.length)
  for (let i = 0; i < arr.length; i++) {
    res[i] = fn(arr[i], i)
  }
  return res
}
// @lc code=end
