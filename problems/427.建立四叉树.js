/*
 * @lc app=leetcode.cn id=427 lang=javascript
 *
 * [427] 建立四叉树
 */

// @lc code=start
/**
 * // Definition for a QuadTree node.
 * function Node(val,isLeaf,topLeft,topRight,bottomLeft,bottomRight) {
 *    this.val = val;
 *    this.isLeaf = isLeaf;
 *    this.topLeft = topLeft;
 *    this.topRight = topRight;
 *    this.bottomLeft = bottomLeft;
 *    this.bottomRight = bottomRight;
 * };
 */

/**
 * @param {number[][]} grid
 * @return {Node}
 */
function construct(grid) {
  // 递归 + 二维前缀和优化
  const n = grid.length
  const pre = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0))
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      pre[i][j] =
        pre[i - 1][j] + pre[i][j - 1] - pre[i - 1][j - 1] + grid[i - 1][j - 1]
    }
  }
  return dfs(pre, 0, 0, n, n)
}

const dfs = (pre, r0, c0, r1, c1) => {
  const sum = getSum(pre, r0, c0, r1, c1)
  if (sum === 0) {
    return new Node(false, true)
  } else if (sum === (r1 - r0) * (c1 - c0)) {
    return new Node(true, true)
  }

  const rm = (r1 + r0) >> 1
  const cm = (c1 + c0) >> 1
  return new Node(
    true,
    false,
    dfs(pre, r0, c0, rm, cm),
    dfs(pre, r0, cm, rm, c1),
    dfs(pre, rm, c0, r1, cm),
    dfs(pre, rm, cm, r1, c1)
  )
}

const getSum = (pre, r0, c0, r1, c1) => {
  return pre[r1][c1] - pre[r1][c0] - pre[r0][c1] + pre[r0][c0]
}

// function construct(grid) {
//   const dfs = (grid, r0, c0, r1, c1) => {
//     let same = true
//     for (let r = r0; r < r1; r += 1) {
//       for (let c = c0; c < c1; c += 1) {
//         if (grid[r0][c0] !== grid[r][c]) {
//           same = false
//           break
//         }
//       }
//       if (!same) {
//         break
//       }
//     }
//     if (same) {
//       // val：储存叶子结点所代表的区域的值 1 对应 True，0 对应 False；
//       return new Node(grid[r0][c0] === 1, true)
//     }
//     const rm = (r0 + r1) >> 1
//     const cm = (c0 + c1) >> 1
//     const ret = new Node(
//       true,
//       false,
//       dfs(grid, r0, c0, rm, cm),
//       dfs(grid, r0, cm, rm, c1),
//       dfs(grid, rm, c0, r1, cm),
//       dfs(grid, rm, cm, r1, c1)
//     )
//     return ret
//   }
//   return dfs(grid, 0, 0, grid.length, grid.length)
// }
// @lc code=end

function Node(val, isLeaf, topLeft, topRight, bottomLeft, bottomRight) {
  this.val = val
  this.isLeaf = isLeaf
  this.topLeft = topLeft
  this.topRight = topRight
  this.bottomLeft = bottomLeft
  this.bottomRight = bottomRight
}

const res1 = construct([
  [0, 1],
  [1, 0],
])

const res2 = construct([
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
])
