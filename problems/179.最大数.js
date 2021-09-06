/*
 * @lc app=leetcode.cn id=179 lang=javascript
 *
 * [179] 最大数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {string}
 */

function largestNumber(nums) {
  // 贪心
  // time complexity O(nlogn): 排序时间复杂度为O(nlogn)
  // space complexity O(logn): 排序需要O(logn)的栈空间
  const ans = nums.sort((a, b) => {
    const sa = String(a)
    const sb = String(b)
    return sb + sa - (sa + sb)
  }).join('')
  return ans[0] === '0' ? '0' : ans;
}
// @lc code=end

const assert = require('assert').strict

const res1 = largestNumber([10, 2])
assert.equal(res1, '210')

const res2 = largestNumber([3, 30, 34, 5, 9])
assert.equal(res2, '9534330')

const res3 = largestNumber([1])
assert.equal(res3, '1')

const res4 = largestNumber([10])
assert.equal(res4, '10')

const res6 = largestNumber([0, 0])
assert.equal(res6, '0')

/**

解法：
可用贪心的解法
对于相邻数字a和b，
如果拼接结果ab大于ba，那么认为a应该放在b的前面。

证明过程看：
https://leetcode-cn.com/problems/largest-number/solution/gong-shui-san-xie-noxiang-xin-ke-xue-xi-vn86e/
另外一个是官方的：
https://leetcode-cn.com/problems/largest-number/solution/zui-da-shu-by-leetcode-solution-sid5/

1. 通过自定义排序
sa，sb分别为a，b的字符串，那么对比如下：
(sb + sa) - (sa + sb)

2. 通过优先队列

 */
