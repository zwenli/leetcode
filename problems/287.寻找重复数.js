/*
 * @lc app=leetcode.cn id=287 lang=javascript
 *
 * [287] 寻找重复数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// var findDuplicate = function (nums) {
//   // 二分查找，
//   // [1,3,4,2,2]
//   // | 1 | 2 | 3 | 4 | nums
//   // | 1 | 3 | 4 | 5 | cnt
//   // 对于目标target来说，满足
//   // i < target, cnt[i] <= i
//   // i >= target, cnt[i] > i
//   // 利用此单调性，可以进行二分查找
//   const n = nums.length
//   let left = 1
//   let right = n - 1
  
//   while (left < right) {
//     const mid = (left + right) >> 1
//     let cnt = 0
//     for (let i = 0; i < n; i++) {
//       cnt += nums[i] <= mid
//     }
//     if (cnt > mid) {
//       right = mid
//     } else {
//       left = mid + 1
//     }
//   }
  
//   return right
// }

var findDuplicate = function (nums) {
  // 快慢指针
  // 具体题解可参考这个：https://leetcode.cn/problems/find-the-duplicate-number/solution/287xun-zhao-zhong-fu-shu-by-kirsche/
  // 将数组当成特殊的链表，假设当前下标为i，即节点为nums[i]，同时nums[i]的值指向下一个节点
  // 以[1,3,4,2,2]，则可抽象成
  //                ↓ - |
  // 0 -> 1 -> 3 -> 2 -> 4
  // 按题意，此特殊的链表必定是存在环的，用快慢指针即可找出环入口
  // 相关题目为 142
  let slow = 0
  let fast = 0
  do {
    slow = nums[slow] // 等于 slow = slow.next
    fast = nums[nums[fast]] // fast = fast.next.next
  } while (slow !== fast)
  fast = 0
  while (slow !== fast) {
    slow = nums[slow]
    fast = nums[fast]
  }
  return slow
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = findDuplicate([1, 3, 4, 2, 2])
assert.equal(res1, 2)

const res2 = findDuplicate([3, 1, 3, 4, 2])
assert.equal(res2, 3)
