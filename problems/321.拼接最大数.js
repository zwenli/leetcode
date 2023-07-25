/*
 * @lc app=leetcode.cn id=321 lang=javascript
 *
 * [321] 拼接最大数
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[]}
 */
var maxNumber = function (nums1, nums2, k) {
  // 最大或最小不是关键，重点是从两个数组选取k个元素
  // 可以分解为两个子问题，分别是从nums1取x个元素，从nums2取y个元素
  // 其中x + y = k。从数组中选取x个元素，并保持最大或最下，我们是能解决的（见402）
  // 因此我们只需要解决这两个子问题，然后将两个结果合并即可。
  const m = nums1.length
  const n = nums2.length
  let curMaxSub = new Array(k).fill(0)
  // k <= m + n
  // 0 < x < m, 0 < y < n, x + y = k
  let start = Math.max(0, k - n)
  let end = Math.min(m, k)

  for (let i = start; i <= end; i++) {
    const sub1 = MaxSubsequence(nums1, i)
    const sub2 = MaxSubsequence(nums2, k - i)
    const maxSub = merge(sub1, sub2)
    if (compare(maxSub, 0, curMaxSub, 0) > 0) {
      curMaxSub = maxSub
    }
  }
  return curMaxSub
}

const MaxSubsequence = function (nums, k) {
  const n = nums.length
  const stack = []
  let remain = n - k
  for (let i = 0; i < n; i++) {
    while (remain && stack.length && stack[stack.length - 1] < nums[i]) {
      stack.pop()
      remain -= 1
    }
    stack.push(nums[i])
  }
  while (remain && stack.length) {
    stack.pop()
    remain -= 1
  }
  return stack
}

const merge = function (sub1, sub2) {
  const x = sub1.length
  const y = sub2.length
  if (x === 0) return sub2
  if (y === 0) return sub1
  const mergeLength = x + y
  const merged = new Array(mergeLength).fill(0)
  let index1 = 0
  let index2 = 0
  for (let i = 0; i < mergeLength; i++) {
    if (compare(sub1, index1, sub2, index2) > 0) {
      merged[i] = sub1[index1]
      index1 += 1
    } else {
      merged[i] = sub2[index2]
      index2 += 1
    }
  }
  return merged
}

const compare = function (sub1, index1, sub2, index2) {
  const x = sub1.length
  const y = sub2.length
  while (index1 < x && index2 < y) {
    const diff = sub1[index1] - sub2[index2]
    if (diff !== 0) return diff
    index1 += 1
    index2 += 1
  }
  // 说明其中一个（or两个）序列已经遍历完成
  // 此时有剩余的序列更大
  return (x - index1) - (y - index2)
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = maxNumber([3, 4, 6, 5], [9, 1, 2, 5, 8, 3], 5)
assert.deepEqual(res1, [9, 8, 6, 5, 3])

const res2 = maxNumber([6, 7], [6, 0, 4], 5)
assert.deepEqual(res2, [6, 7, 6, 0, 4])

const res3 = maxNumber([3, 9], [8, 9], 3)
assert.deepEqual(res3, [9, 8, 9])
