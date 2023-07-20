/*
 * @lc app=leetcode.cn id=581 lang=javascript
 *
 * [581] 最短无序连续子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function (nums) {
  // nums 可以分成三段子数组， numsa, numsb, numsc
  // 当对numsb进行排序后，整个数组就变成有序的，numsa, numsc是不会改变的。
  // 现在假设numsb在nums的区间为[left, right]
  // 对于numsa中，每一个数字nums[i] 都小于等于 [i+1, n- 1]区间的值
  // 同理对于 numsc中，每个数字nums[i] 都大于 [0, i- 1]区间的值。
  const n = nums.length
  let minn = Infinity // [i+1, n-1]区间内最小值。
  let left = -1
  let maxn = -Infinity // [0, i-1]区间内最大值。
  let right = -1

  for (let i = 0; i < n; i++) {
    // 从小到大枚举
    if (maxn > nums[i]) {
      right = i
    } else {
      maxn = nums[i]
    }

    // 通过从大到小枚举
    if (minn < nums[n - i - 1]) {
      // 说明n - i - 1 不是在 numsa 区间内的
      // 最后就是所求的left
      left = n - i - 1
    } else {
      // 说明存在更小的值，更新
      minn = nums[n - i - 1]
    }
  }

  return right === -1 ? 0 : right - left + 1
}

// var findUnsortedSubarray = function (nums) {
//   // time complexity O(nlogn)
//   // space complexity O(n)
//   const sorted = Array.from(nums).sort((a, b) => a - b)
//   const n = nums.length
//   let l = 0
//   let r = n - 1
//   // 找到左右两端第一个不同的地方，[i,j]区间就是所求子数组
//   while (l <= r) {
//     if (sorted[l] === nums[l]) l++
//   }
//   while (l <= r) {
//     if (sorted[r] === nums[r]) r--
//   }
//   return r - l + 1
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15])
assert.equal(res1, 5)

const res2 = findUnsortedSubarray([1, 2, 3, 4])
assert.equal(res2, 0)

const res3 = findUnsortedSubarray([1])
assert.equal(res3, 0)
