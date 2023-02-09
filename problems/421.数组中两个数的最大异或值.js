/*
 * @lc app=leetcode.cn id=421 lang=javascript
 *
 * [421] 数组中两个数的最大异或值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

const HIGH_BIT = 30
class TrieNode {
  constructor() {
    this.left = null // 左子节点表示为0
    this.right = null // 右子节点表示为1
  }
}
class Trie {
  constructor() {
    // 由于字典树中每个节点最多只有两个子节点，分别表示0和1，
    // 因此本体中的字典树等于一个二叉树
    this.root = new TrieNode()
  }
  add(num) {
    let cur = this.root
    for (let k = HIGH_BIT; k >= 0; k--) {
      let bit = (num >> k) & 1
      if (bit === 0) {
        if (!cur.left) {
          cur.left = new TrieNode()
        }
        cur = cur.left
      } else {
        if (!cur.right) {
          cur.right = new TrieNode()
        }
        cur = cur.right
      }
    }
  }
  // 获取num对应最大异或值
  check(num) {
    let x = 0
    let cur = this.root
    for (let k = HIGH_BIT; k >= 0; k--) {
      const bit = (num >> k) & 1
      if (bit === 0) {
        // ai 的第 k 个二进制位为 0，应当往表示 1 的子节点 right 走
        if (cur.right) {
          x = (x << 1) + 1
          cur = cur.right
        } else {
          x = x << 1
          cur = cur.left
        }
      } else {
        // ai 的第 k 个二进制位为 1，应当往表示 0 的子节点 left 走
        if (cur.left) {
          x = (x << 1) + 1
          cur = cur.left
        } else {
          x = x << 1
          cur = cur.right
        }
      }
    }
    return x
  }
}

function findMaximumXOR(nums) {
  // Trie 字典树
  const trie = new Trie()
  for (const num of nums) {
    trie.add(num)
  }
  let ans = 0
  for (const num of nums) {
    ans = Math.max(ans, trie.check(num))
  }
  return ans
}

// var findMaximumXOR = function (nums) {
//   // 哈希表
//   // time complexity O(n): O(n*31) = O(n)
//   // space complexity O(n): 哈希表所需空间
//   // 若 x = ai ^ aj, 那么 ai = x ^ aj
//   // 要使得x最大（1尽可能多，从高位向低位匹配），
//   // 已知x和aj，找到是否有ai
//   // 用pre^k(x)表示x从最高位第30位到第k位为止二进制的数
//   // pre^k(x) = pre^k(ai) ^ pre^k(aj)
//   // 由于pre^k(x)是已知的，因此将所有pre^k(aj)存放在哈希表中，
//   // 随后枚举i，并计算pre^k(x) ^ pre^k(aj)。
//   // 如果出现在哈希表中，说明第k位二进制可以取到1，否则只能为0
//   let x = 0
//   for (let k = 30; k >= 0; k--) {
//     // 所有aj的前缀pre^k(aj)保存在哈希中
//     const seen = new Set()
//     for (const num of nums) {
//       // 只保留最高位开始到第k位的二进制部分
//       seen.add(num >> k)
//     }

//     // 目前的x包含从最高位开始到第 k+1 个二进制位为止的部分
//     // 将x 的第 k 个二进制位置为 1，值为 (x << 1) + 1
//     const xNext = (x << 1) + 1
//     let found = false

//     for (const num of nums) {
//       if (seen.has(xNext ^ (num >> k))) {
//         found = true
//       }
//     }

//     if (found) {
//       x = xNext
//     } else {
//       // 没有找到满足 pre^k(x) ^ pre^k(aj)的，
//       // x 的第 k 个二进制位置只能为0，值为 x << 1
//       x = xNext - 1
//     }
//   }
//   return x
// }
// var findMaximumXOR = function (nums) {
//   // 会超时
//   const n = nums.length
//   let ans = 0
//   for (let i = 0; i < n - 1; i++) {
//     for (let j = i + 1; j < n; j++) {
//       ans = Math.max(ans, nums[i] ^ nums[j])
//     }
//   }
//   return ans
// }
// @lc code=end
const assert = require('node:assert').strict

const res1 = findMaximumXOR([3, 10, 5, 25, 2, 8])
assert.equal(res1, 28)

const res2 = findMaximumXOR([14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70])
assert.equal(res2, 127)
