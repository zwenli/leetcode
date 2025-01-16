/*
 * @lc app=leetcode.cn id=1720 lang=javascript
 *
 * [1720] 解码异或后的数组
 */

// @lc code=start
/**
 * @param {number[]} encoded
 * @param {number} first
 * @return {number[]}
 */
var decode = function (encoded, first) {1
  let ans = [first]
  for (let i = 0; i < encoded.length; i++) {
    // a ^ b = c 可以转化为 b = a ^ c
    // 这是因为异或运算是可逆的，即 a ^ b ^ a = b。
    ans.push(ans[i] ^ encoded[i])
  }
  return ans
}
// @lc code=end
