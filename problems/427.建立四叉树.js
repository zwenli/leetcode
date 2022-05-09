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
  const dfs = (grid, r0, c0, r1, c1) => {
    let same = true
    for (let r = r0; r < r1; r += 1) {
      for (let c = c0; c < c1; c += 1) {
        if (grid[r0][c0] !== grid[r][c]) {
          same = false
          break
        }
      }
      if (!same) {
        break
      }
    }
    if (same) {
      // val：储存叶子结点所代表的区域的值 1 对应 True，0 对应 False；
      return new Node(grid[r0][c0] === 1, true)
    }
    const rm = (r0 + r1) >> 1
    const cm = (c0 + c1) >> 1
    const ret = new Node(
      true,
      false,
      dfs(grid, r0, c0, rm, cm),
      dfs(grid, r0, cm, rm, c1),
      dfs(grid, rm, c0, r1, cm),
      dfs(grid, rm, cm, r1, c1)
    )
    return ret
  }
  return dfs(grid, 0, 0, grid.length, grid.length)
}
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
