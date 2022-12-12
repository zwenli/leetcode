/*
 * @lc app=leetcode.cn id=378 lang=javascript
 *
 * [378] 有序矩阵中第 K 小的元素
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */

// TODO: 归并排序，先做题目 23.合并k个升序链表

var kthSmallest = function (matrix, k) {
  // 二分查找, point: 寻找单调性
  // time complexity O(nlog(right-left))
  // space complexity O(1)
  // 解法：
  // 1. 找出矩阵中的最小值left，最大值right，则第k个小的元素必定在 left ~ right 之间
  // 2. mid = (right + left) >> 1, 在矩阵中找出小于等于mid的元素数量count
  // 3. 若 count 大于（等于）k，表明k在左上部分且可能包含mid，即left = left,right = mid,
  //    又保证了 k 在 left~right 之间
  // 4. 若 count 小于 k，表明k在左下部分且不包含mid，即left = mid + 1, right = right,
  //    又保证了 k 在 left~right 之间
  // 5. 因为每次循环都保证了k在 left~right 之间，当left == right时，第k小的元素即是right
  const n = matrix.length
  let left = matrix[0][0]
  let right = matrix[n - 1][n - 1]
  while (left < right) {
    // 每次循环都保证第k小的元素在left~right之间，当left==right，第k小的数就是right
    const mid = ((right - left) >> 1) + left
    // 找出矩阵中小于等于mid的元素数量
    const count = countLessOrEqual(mid)
    if (count >= k) {
      // 第k小的元素在左上部分，可能包含mid
      right = mid
    } else {
      // 第k小的元素在右下部分，不包含mid
      left = mid + 1
    }
  }
  return right

  function countLessOrEqual(num) {
    // 以列为单位找，找到每一列最后一个<=num的数即知道每一列有多少个数<=num
    let count = 0
    let r = n - 1
    let c = 0
    while (r >= 0 && c < n) {
      if (matrix[r][c] <= num) {
        // 第c列有r+1个元素 <= num
        count += r + 1
        c += 1
      } else {
        // 第c列目前的元素大于num，需要继续在当前列往上找
        r -= 1
      }
    }
    return count
  }
}
// var kthSmallest = function (matrix, k) {
//   // 直接排序
//   // time complexity O(nlogn)
//   // space complexity O(n^2)
//   matrix = matrix.flat().sort((a, b) => a - b)
//   return matrix[k - 1]
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = kthSmallest(
  [
    [1, 5, 9],
    [10, 11, 13],
    [12, 13, 15],
  ],
  8
)
assert.equal(res1, 13)

const res2 = kthSmallest([[-5]], 1)
assert.equal(res2, -5)
