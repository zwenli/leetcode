/*
 * @lc app=leetcode.cn id=2649 lang=javascript
 *
 * [2649] 嵌套数组生成器

 */

// @lc code=start
/**
 * @typedef MultidimensionalArray
 * @type {(MultidimensionalArray | number)[]}
 * @param {MultidimensionalArray} arr
 * @return {Generator<number, void, unknown>}
 */
function* inorderTraversal(arr) {
  // 递归处理
  for (const item of arr) {
    if (Array.isArray(item)) {
      // yield* 表达式用于委托给另一个generator 或可迭代对象。
      yield* inorderTraversal(item)
    } else {
      yield item
    }
  }
};

// 另一种是先拍平再yield，
// arr.flat(Infinity);yeild item
// 但没上面的好，
// @lc code=end
