/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
/*
 * @lc app=leetcode.cn id=327 lang=javascript
 *
 * [327] 区间和的个数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */

function countRangeSum(nums, lower, upper) {
  // 树状数组
  // https://leetcode.cn/problems/count-of-range-sum/solution/by-ac_oier-b36o/

  // 由于区间和的定义是子数组的元素和，容易想到「前缀和」来快速求解。
  // 对于每个nums[i]，需要统计每个以nums[i]为右端点的合法子数组个数（合法
  // 子数组是指区间和值范围为 [lower,upper] 的子数组）。
  // 可以从左往右处理nums，假设处理到位置k，同时下表[0,k]的前缀和为s，那么以
  // nums[k]为右端点的合法子数组个数，等价于在下标[0,k-1]中前缀和范围在
  // [s-upper, s-lower]的数的个数。

  let allNumbers = []
  let s = 0
  allNumbers.push(s)
  for (const num of nums) {
    s += num
    allNumbers.push(s)
    allNumbers.push(s - lower)
    allNumbers.push(s - upper)
  }
  allNumbers = Array.from(new Set(allNumbers.sort((a, b) => a - b)))
  const values = new Map()
  let idx = 0
  allNumbers.forEach((num) => values.set(num, ++idx))

  s = 0
  let ans = 0
  const bit = new BIT(values.size)
  bit.add(values.get(s), 1)
  for (const num of nums) {
    s += num
    const left = values.get(s - upper)
    const right = values.get(s - lower)
    ans += bit.range(left, right)
    bit.add(values.get(s), 1)
  }
  return ans
}
class BIT {
  constructor(size) {
    this.size = size
    this.tree = new Array(size + 1).fill(0)
  }
  lowbit(x) {
    return x & -x
  }
  add(i, v) {
    while (i <= this.size) {
      this.tree[i] += v
      i += this.lowbit(i)
    }
  }
  query(i) {
    let sum = 0
    while (i > 0) {
      sum += this.tree[i]
      i -= this.lowbit(i)
    }
    return sum
  }
  range(l, r) {
    return this.query(r) - this.query(l - 1)
  }
}

// function countRangeSum(nums, lower, upper) {
//   // 归并排序
//   if (!nums || !nums.length) return 0;
//   // 构建前缀和数组
//   const sums = new Array(nums.length + 1).fill(0);
//   for (let i = 0; i < nums.length; i += 1) {
//     sums[i + 1] = nums[i] + sums[i];
//   }
//   return mergeSort(sums, 0, sums.length - 1, lower, upper);
//   function mergeSort(sums, left, right) {
//     if (left === right) return 0;
//     const mid = (left + right) >> 1;
//     let count = mergeSort(sums, left, mid, lower, upper)
//       + mergeSort(sums, mid + 1, right, lower, upper);
//     // TODO: 下面两部可以合并成一次循环完成
//     // https://leetcode.com/problems/count-of-range-sum/discuss/77990/Share-my-solution
//     // 统计下标对
//     for (let i = left, l = mid + 1, r = mid + 1; i <= mid; i += 1) {
//       while (l <= right && sums[l] < sums[i] + lower) l += 1;
//       while (r <= right && sums[r] <= sums[i] + upper) r += 1;
//       count += r - l;
//     }
//     const cache = new Array(right - left + 1);
//     let c = 0;
//     let i = left;
//     let j = mid + 1;
//     // 合并两个有序数组
//     while (i <= mid || j <= right) {
//       if (i > mid) {
//         cache[c++] = sums[j++];
//       } else if (j > right) {
//         cache[c++] = sums[i++];
//       } else {
//         cache[c++] = sums[i] < sums[j] ? sums[i++] : sums[j++];
//       }
//     }
//     for (let p = 0; p < cache.length; p += 1) {
//       sums[left + p] = cache[p];
//     }
//     return count;
//   }
// }
// function countRangeSum(nums, lower, upper) {
//   // 暴力解法，会超时
//   // time complexity O(n^2): 两层循环
//   // space complexity O(1):
//   let ans = 0;
//   for (let i = 0; i < nums.length; i += 1) {
//     let sum = 0;
//     for (let j = i; j < nums.length; j += 1) {
//       sum += nums[j];
//       if (sum >= lower && sum <= upper) {
//         ans += 1;
//       }
//     }
//   }
//   return ans;
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = countRangeSum([-2, 5, -1], -2, 2)
assert.equal(res1, 3)

const res2 = countRangeSum([0], 0, 0)
assert.equal(res2, 1)

const res3 = countRangeSum([0, -3, -3, 1, 1, 2], 3, 5)
assert.equal(res3, 2)

/**

1. 暴力，两层循环，用来理解题意
2. 归并排序
   设preSum为前缀和，则问题等价于求所有下标对(i,j), 满足
     preSum[j] - preSum[i] ∈ [lower, upper]
     PS: preSum[j+1] - preSum[j] = nums[j]
         preSum[1] - preSum[0] = nums[0]
         preSum[0] = 0;
   设存在两个有序数组n1, n2，找出所有下标对(i,j)，满足
     n2[j] - n1[i] ∈ [lower, upper]
   在已只两个数组有序的清空下，在n2中维护两个指针l和r，都指向n2的初始位置。
   随后，考察n1的第一个元素。首先，不断地将指针l向右移动，直到n2[l]>=n1[0]+lower
   为止，此时l及其右边的元素均大于n1[0] + lower；随后，再不断将指针r向右移动，
   直到n2[r] > n1[0] + upper 为止，此时r左边的元素均小于等于1[0] + upper。
   故区间[l,r)中的所有下标都满足
     n2[j] - n1[i] ∈ [lower, upper]
   接下来，我们考察n1的第二个元素。由于n1是递增的，不难发现 l,r只可能向右移动。
   因此，我们不断地进行上述过程，并对于n1中的每一个下标，都记录相应的区间 [l,r)的大小。
   最终，我们就统计得到了满足条件的下标对(i,j)的数量。
   href: https://leetcode-cn.com/problems/count-of-range-sum/solution/qu-jian-he-de-ge-shu-by-leetcode-solution/

3. 其他高级解法
 */
