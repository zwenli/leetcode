/*
 * @lc app=leetcode.cn id=406 lang=javascript
 *
 * [406] 根据身高重建队列
 */

// @lc code=start
/**
 * @param {number[][]} people
 * @return {number[][]}
 */
// var reconstructQueue = function (people) {
//   // 先排序再插队
//   // h降序 k升序
//   // 原因是，按照h进行降序排序，对于每个元素，在其之前的元素的个数，就是大于等于他的元素的数量，
//   // 而按照k正向排序，我们希望 k 大的尽量在后面，减少插入操作的次数。
//   // PS1: h升序，k降序也可以，思路变成「插空」
//   // PS2: 这类二维数组的问题，都可以尝试先升后降/先降后升排序 后再解决问题。
//   // time complexity O(n^2): 排序的时间复杂度为O(nlogn)，需要O(n^2)的时间遍历每个人并将他们放入队列中。
//   // space complexity O(logn): 排序所需要的栈空间
//   people.sort((a, b) => {
//     if (a[0] === b[0]) {
//       // k升序
//       return a[1] - b[1]
//     }
//     // h降序
//     return b[0] - a[0]
//   })

//   const res = []
//   for (const p of people) {
//     if (res.length <= p[1]) {
//       res.push(p)
//     } else {
//       res.splice(p[1], 0, p)
//     }
//   }
//   return res
// }

var reconstructQueue = function (people) {
  // 二分查找 + 树状数组
  // time complexity O(n(logn)^2): 遍历people的时间复杂度为O(n),
  //  每次二分查后需要操作树状数组，复杂度均为O(logn)
  // space complexit O(n): 答案和树状数组所需空间都为O(n)
  // href: https://leetcode.cn/problems/queue-reconstruction-by-height/solution/by-ac_oier-fda2/
  
  // 采用这中排序逻辑的好处有：在从前往后处理people[i]时，
  // 可以将直接将其放置在「当前空位序列（从左往后统计的，不算已被放置的位置）」中的people[i][1]+1位
  // (预留了前面的people[i]个位置给后面的数)
  people.sort((a, b) => {
    // h升序
    if (a[0] !== b[0]) return a[0] - b[0]
    // k降序
    return b[1] - a[1]
  })
  

  const n = people.length
  const bit = new BIT(n)
  let ans = new Array(n).fill(null)

  for (const p of people) {
    const k = p[1]
    let l = 1
    let r = n
    // 通过二分查找快速找出k+1所在的位置
    while (l < r) {
      const mid = (r + l) >> 1
      // 如果在[1,x]范围内有k+1个0，
      // 等价于有x - (k + 1)个1
      // 这样就转换成区间查询的问题了
      if (mid - bit.query(mid) >= k + 1) {
        // 0的数量大于等于k + 1, 往左边收缩
        // 因为存在等于的情况，需要包含mid
        r = mid
      } else {
        // 0的数量小于k + 1, 往右边收缩
        // 不需要包含mid
        l = mid + 1
      }
    }

    ans[r - 1] = p
    // 使用新位置后，需要进行标记，涉及单点修改
    bit.add(r, 1)
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
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = reconstructQueue([
  [7, 0],
  [4, 4],
  [7, 1],
  [5, 0],
  [6, 1],
  [5, 2],
])
assert.deepEqual(res1, [
  [5, 0],
  [7, 0],
  [5, 2],
  [6, 1],
  [4, 4],
  [7, 1],
])

const res2 = reconstructQueue([
  [6, 0],
  [5, 0],
  [4, 0],
  [3, 2],
  [2, 2],
  [1, 4],
])
assert.deepEqual(res2, [
  [4, 0],
  [5, 0],
  [2, 2],
  [3, 2],
  [1, 4],
  [6, 0],
])
