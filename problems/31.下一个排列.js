/*
 * @lc app=leetcode.cn id=31 lang=javascript
 *
 * [31] 下一个排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums) {
  /**
   * time complexity O(n): 三次循环，n为nums的长度
   * space complexity O(1): 两个指针，常量级别
   */
  let i = nums.length - 2
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i -= 1
  }
  if (i >= 0) {
    let j = nums.length - 1
    while (j >= i + 1 && nums[i] >= nums[j]) {
      j -= 1
    }
    swap(nums, i, j)
  }
  reverse(nums, i + 1)

  function swap(nums, i, j) {
    const temp = nums[i]
    nums[i] = nums[j]
    nums[j] = temp
  }
  function reverse(nums, start) {
    let i = start
    let j = nums.length - 1
    while (i < j) {
      swap(nums, i, j)
      i += 1
      j -= 1
    }
  }
}
// @lc code=end

const assert = require('assert').strict

const param1 = [1, 2, 3]
nextPermutation(param1)
assert.deepEqual(param1, [1, 3, 2])

const param2 = [3, 2, 1]
nextPermutation(param2)
assert.deepEqual(param2, [1, 2, 3])

const param3 = [1, 1, 5]
nextPermutation(param3)
assert.deepEqual(param3, [1, 5, 1])

const param4 = [4, 5, 2, 6, 3, 1]
nextPermutation(param4)
assert.deepEqual(param4, [4, 5, 3, 1, 2, 6])

/**

解法：

思路找出尽量靠近右边的「较小数」， 然后在右边找出尽量比「较小数」
小的「较大数」，交换两个数字，然后对右边的序列进行翻转

具体解法，对于长度为n的数组a：
1. 从后往前找第一个顺序对(i, i + 1)，满足a[i] < a[i + 1]，
这样「较小数」即为a[i]，此时[i + 1, n)必然是降序序列
2. 如果找到了顺序对，那么在区间[i + 1, n)中从后往前查找第一个
元素j满足a[i]<a[j]。这样「较大数」即为a[j]。交换a[i]和a[j]
3. 有无执行步骤2，区间[i+1, n）都必然是降序的。直接使用双指针
反转区间[i+1, n)使其变为升序，而无需在对该区间进行排序。

 */
