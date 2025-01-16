/*
 * @lc app=leetcode.cn id=2424 lang=javascript
 *
 * [2424] 最长上传前缀
 */

// @lc code=start
class LUPrefix {
  /**
   * @param {number} n
   */
  constructor(n) {
    this.uf = new UnionFind(n + 1)
  }
  /**
   * @param {number} video
   * @return {void}
   */
  upload(video) {
    this.uf.union(video, video - 1)
  }
  /**
   * @return {number}
   */
  longest() {
    const uf = this.uf
    return uf.getSize(uf.find(0)) - 1
  }
}

class UnionFind {
  constructor(n) {
    this.parent = new Array(n).fill(0).map((item, index) => index)
    this.size = new Array(n).fill(1)
  }
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x])
    }
    return this.parent[x]
  }
  union(x, y) {
    const px = this.find(x)
    const py = this.find(y)
    if (px === py) return
    this.parent[px] = py
    this.size[py] += this.size[px]
    this.size[px] = 0
  }
  getSize(x) {
    return this.size[x]
  }
}
/**
 * Your LUPrefix object will be instantiated and called as such:
 * var obj = new LUPrefix(n)
 * obj.upload(video)
 * var param_2 = obj.longest()
 */
// @lc code=end
