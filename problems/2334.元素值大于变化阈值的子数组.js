/*
 * @lc app=leetcode.cn id=2334 lang=javascript
 *
 * [2334] 元素值大于变化阈值的子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
var validSubarraySize = function (nums, threshold) {
  // 单调栈
  // https://leetcode.com/problems/subarray-with-elements-greater-than-varying-threshold/solutions/2259285/c-o-n-solution-using-monotonic-stacks/?envType=problem-list-v2&envId=union-find
  const n = nums.length
  const stack = []
  const prevS = new Array(n).fill(-1)
  const nextS = new Array(n).fill(-1)
  // 从左到右遍历，找到每个元素的下一个较小元素
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && nums[i] < nums[stack[stack.length - 1]]) {
      nextS[stack[stack.length - 1]] = i
      stack.pop()
    }
    stack.push(i)
  }
  stack.length = 0
  // 从右到左遍历，找到每个元素的前一个较小元素
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && nums[i] < nums[stack[stack.length - 1]]) {
      prevS[stack[stack.length - 1]] = i
      stack.pop()
    }
    stack.push(i)
  }
  for (let i = 0; i < n; i++) {
    // 计算以 nums[i] 为 最小值的子数组的长度 len
    // 剔除前一个后一个比nums[i]的较小元素，这样就保证 nums[i] 在子数组中是最小
    const l = prevS[i]
    const r = nextS[i] === -1 ? n : nextS[i]
    const len = r - l - 1 
    if (nums[i] > threshold / len) return len
  }
  return -1
}

// var validSubarraySize = function (nums, threshold) {
//   // https://leetcode.cn/problems/subarray-with-elements-greater-than-varying-threshold/solutions/1658410/by-endlesscheng-j6pp/?envType=problem-list-v2&envId=union-find
//   const n = nums.length
//   const uf = new UnionFind(n + 1)
//   const vec = Array.from(nums, (v, i) => [v, i])
//   vec.sort((a, b) => b[0] - a[0])
//   for (const [v, i] of vec) {
//     const j = uf.find(i + 1)
//     uf.union(i, j)
//     const k = uf.getSize(j)
//     if (v > threshold / k) return k
//   }
//   return -1
// }

// class UnionFind {
//   constructor(n) {
//     this.parent = new Array(n)
//     this.size = new Array(n)
//     this.rank = new Array(n)
//     for (let i = 0; i < n; i++) {
//       this.parent[i] = i
//       this.size[i] = 0
//       this.rank[i] = 0
//     }
//   }
//   find(x) {
//     if (this.parent[x] !== x) {
//       this.parent[x] = this.find(this.parent[x])
//     }
//     return this.parent[x]
//   }
//   union(x, y) {
//     const px = this.find(x)
//     const py = this.find(y)
//     if (px === py) return
//     if (this.rank[px] > this.rank[py]) {
//       this.parent[py] = px
//       this.size[px] += this.size[py] + 1
//     } else if (this.rank[px] < this.rank[py]) {
//       this.parent[px] = py
//       this.size[py] += this.size[px] + 1
//     } else {
//       this.parent[px] = py
//       this.size[py] += this.size[px] + 1
//       this.rank[py] += 1
//     }
//   }
//   getSize(x) {
//     return this.size[this.find(x)]
//   }
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = validSubarraySize([1, 3, 4, 3, 1], 6)
assert.equal(res1, 3)
