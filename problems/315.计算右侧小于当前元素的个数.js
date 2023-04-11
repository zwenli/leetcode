/*
 * @lc app=leetcode.cn id=315 lang=javascript
 *
 * [315] 计算右侧小于当前元素的个数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */

class BinaryIndexedTree {
  constructor(size) {
    this.size = size
    this.tree = new Array(size + 1).fill(0)
  }
  add(index, delta) {
    while (index <= this.size) {
      this.tree[index] += delta
      index += this.lowbit(index)
    }
  }
  query(index) {
    let sum = 0
    while (index > 0) {
      sum += this.tree[index]
      index -= this.lowbit(index)
    }
    return sum
  }
  lowbit(x) {
    return x & -x
  }
}
var countSmaller = function (nums) {
  // 树状数组
  const n = nums.length
  // 重点在于如何抽象出这个关系
  // “计算右侧小于当前元素的个数”我们可以“从后向前一个一个填”。
  // 因为涉及大小关系，所以要排个序，并且给出序号。这一步操作也叫“离散化”。
  // 数组从小到大排序，索引从1开始计数。
  const uniques = Array.from(new Set(nums)).sort((a, b) => a - b)
  const rankMap = {}
  let index = 1
  for (const num of uniques) {
    rankMap[num] = index
    index += 1
  }

  const res = new Array(n).fill(0)
  const bit = new BinaryIndexedTree(uniques.length)
  for (let i = n - 1; i >= 0; i--) {
    // 从后往前填表
    // 找出数字所对应的排名。
    const rank = rankMap[nums[i]]
    // 更新对应的计数
    bit.add(rank, 1)
    // 找出小于当前排名的计数和，即查询[0, rank - 1]
    res[i] = bit.query(rank - 1)
  }
  return res
}

// var countSmaller = function (nums) {
//   // 线段树
//   const n = nums.length
//   // 绝对数值转秩次【rank从0开始】
//   // eg: nums [5, 2, 6, 1]
//   // 则 uniques = [1,2,5,6]
//   //    rankMap = {1: 0, 2: 1, 5: 2, 6: 3}
//   const uniques = Array.from(new Set(nums)).sort((a, b) => a - b)
//   const rankMap = {}
//   for (let i = 0; i < uniques.length; i++) {
//     rankMap[uniques[i]] = i
//   }
//   // 构建线段树
//   const tree = new ST(Object.keys(rankMap).length)
//   const ans = new Array(n).fill(0)
//   for (let i = n - 1; i >= 0; i--) {
//     const rank = rankMap[nums[i]] // 当前值的排名
//     tree.add(rank, 1) // 单点更新+1
//     ans[i] = tree.rangeSum(0, rank - 1) // 查询 当前排名之前 的元素有多少个
//   }
//   return ans
// }

// class ST {
//   constructor(n) {
//     this.n = n
//     this.tree = new Array(n * 2).fill(0)
//   }
//   add(i, delta) {
//     i += this.n // 原数组下标转换到线段树下标
//     while (i > 0) {
//       this.tree[i] += delta
//       i >>= 1
//     }
//   }
//   rangeSum(i, j) {
//     i += this.n
//     j += this.n
//     let sum = 0
//     while (i <= j) {
//       if ((i & 1) === 1) {
//         // 右子节点
//         sum += this.tree[i]
//         i += 1
//       }
//       if ((j & 1) === 0) {
//         sum += this.tree[j]
//         j -= 1
//       }
//       i >>= 1
//       j >>= 1
//     }
//     return sum
//   }
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = countSmaller([5, 2, 6, 1])
assert.deepEqual(res1, [2, 1, 1, 0])

const res2 = countSmaller([-1])
assert.deepEqual(res2, [0])

const res3 = countSmaller([-1, -1])
assert.deepEqual(res3, [0, 0])
