/*
 * @lc app=leetcode.cn id=475 lang=javascript
 *
 * [475] 供暖器
 */

// @lc code=start
/**
 * @param {number[]} houses
 * @param {number[]} heaters
 * @return {number}
 */

var findRadius = function (houses, heaters) {
  // 排序 + 双指针
  houses.sort((a, b) => a - b)
  heaters.sort((a, b) => a - b)
  const m = houses.length
  const n = heaters.length
  let ans = 0
  // i 对应 houses 房屋的下标
  // j 对应 hearts 供暖器的下标
  for (let i = 0, j = 0; i < m; i++) {
    // 当前房屋和最近供暖器的距离
    let curDistance = Math.abs(houses[i] - heaters[j])
    while (j < n - 1 && Math.abs(houses[i] - heaters[j + 1]) <= curDistance) {
      // 当前房屋和当前供暖器的距离 大于等于 下一个供暖器的距离
      // 更新j的下标，和当前最短距离
      j += 1
      curDistance = Math.abs(houses[i] - heaters[j])
    }
    ans = Math.max(ans, curDistance)
  }
  return ans
}

// var findRadius = function (houses, heaters) {
//   // 排序 + 二叉搜索
//   // time complexity O((m+n)logn): heaters排序O(nlogn)，使用二分查找对每个房屋
//   //  寻找距离最近的供暖器，每次二分查找O(logn)，有m个房子，因此需要O(mlogn)
//   // 1. 对供暖器数字进行排序
//   // 2. 对每个房屋house，在有序数组heaters中找到最大下标i，使得 hearts[i] <= house,
//   //    特别地，当hearts[0]>house时，i = -1。
//   //    得出下标i后，令j = i + 1，j满足 house < hearts[j]。
//   //    特别地，当hearts[n-1] <= house 时，j = n，n为heaters的长度
//   // 3. 得出i,j后，取两个供暖器和房屋距离的最小值，即为该房屋所需供暖器的最小加热半径。
//   //    特别需要注意i，j下标越界的情况，设置对应距离为正无穷
//   heaters.sort((a, b) => a - b)
//   let ans = 0
//   for (const house of houses) {
//     const i = binarySearch(heaters, house)
//     const j = i + 1
//     const leftDistance = i < 0 ? Number.MAX_VALUE : house - heaters[i]
//     const rightDistance =
//       j >= heaters.length ? Number.MAX_VALUE : heaters[j] - house
//     ans = Math.max(ans, Math.min(leftDistance, rightDistance))
//   }
//   return ans
// }

// var binarySearch = function (nums, target) {
//   // 找到最大的left, 使得 nums[left] <= target
//   let left = 0
//   let right = nums.length - 1
//   if (nums[left] > target) return -1
//   while (left < right) {
//     // 加一防止mid恒等于left，出现死循环
//     const mid = ((right - left + 1) >> 1) + left
//     if (nums[mid] > target) {
//       right = mid - 1
//     } else {
//       left = mid
//     }
//   }
//   return left
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = findRadius([1, 2, 3], [2])
assert.equal(res1, 1)

const res2 = findRadius([1, 2, 3, 4], [1, 4])
assert.equal(res2, 1)

const res3 = findRadius([1, 5], [2])
assert.equal(res3, 3)
