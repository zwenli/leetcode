/*
 * @lc app=leetcode.cn id=368 lang=javascript
 *
 * [368] 最大整除子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */

function largestDivisibleSubset(nums) {
  // dp
  nums.sort((a, b) => a - b)
  const n = nums.length
  const f = new Array(n)
  const g = new Array(n)
  for (let i = 0; i < n; i += 1) {
    let len = 1
    let prev = i
    for (let j = 0; j < i; j += 1) {
      if (nums[i] % nums[j] === 0 && f[j] + 1 > len) {
        len = f[j] + 1
        prev = j
      }
    }
    f[i] = len
    g[i] = prev
  }
  let max = -1
  let idx = -1
  for (let i = 0; i < n; i += 1) {
    if (f[i] > max) {
      max = f[i]
      idx = i
    }
  }
  let ans = []
  while (ans.length < max) {
    ans.unshift(nums[idx])
    idx = g[idx]
  }
  return ans
}
// @lc code=end

const assert = require('assert').strict

const res1 = largestDivisibleSubset([1, 2, 3])
assert.deepEqual(res1, [1, 2]) // [1,3]

const res2 = largestDivisibleSubset([1, 2, 4, 8])
assert.deepEqual(res2, [1, 2, 4, 8])

const res3 = largestDivisibleSubset([1, 2, 4, 8, 16])
assert.deepEqual(res3, [1, 2, 4, 8, 16])

/**

相似题目：300

TODO

a能整除b，记 a|b
b能整除c，记 b|c
根据整除关系具有传递性可知，a能整除c，即 a|c
   b = x * a;
   c = y * b;
=> c = x * y * a; // x，y都是正整数
可知：
- 如果整数a是整除子集S1的最小整数b的一个约数（a|b）,那么可以将a添加进S1中得到一个更大的整除子集；
- 如果整数c是整除子集S2的最大整数d的一个倍数（d|c）,那么可以将c添加进S2中得到一个最大的整除子集；

 */
