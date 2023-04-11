/**
 * 剑指 Offer 51. 数组中的逆序对
 * 在数组中的两个数字，如果前面一个数字大于后面的数字，
 * 则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。
 * 例子1
 *  输入: [7,5,6,4]
 *  输出: 5
 * 
 * 此题和 315. 计算右侧小于当前元素的个数 类似
 */

function reversePairs(nums) {
  // 树状数组
  // time complexity O(nlogn): 排序时间复杂度为O(nlogn)，树状数组单点更新，区间查询的复杂度为O(logn)
  // space complexity O(n): 树状数组，rankMap，unique的空间均为O(n)
  const n = nums.length
  // 离散化
  const unique = Array.from(new Set(nums)).sort((a, b) => a - b)
  const rankMap = {}
  for (let i = 0; i < unique.length; i++) {
    rankMap[unique[i]] = i + 1
  }

  let bit = new BIT(n)
  let ans = 0
  // 从右往左填充数据
  for (let i = n - 1; i >= 0; i--) {
    const rank = rankMap[nums[i]]
    bit.add(rank, 1)
    ans += bit.query(rank - 1)
  }

  return ans
}

class BIT {
  constructor(size) {
    this.size = size
    this.tree = new Array(size + 1).fill(0)
  }
  add(i, delta) {
    while (i <= this.size) {
      this.tree[i] += delta
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
  range(left, right) {
    return this.query(right) - this.query(left - 1)
  }
  lowbit(x) {
    return x & -x
  }
}
