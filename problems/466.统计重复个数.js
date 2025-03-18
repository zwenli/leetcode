/*
 * @lc app=leetcode.cn id=466 lang=javascript
 *
 * [466] 统计重复个数
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {number} n1
 * @param {string} s2
 * @param {number} n2
 * @return {number}
 */
var getMaxRepetitions = function (s1, n1, s2, n2) {
  // https://leetcode.cn/problems/count-the-repetitions/solutions/208874/tong-ji-zhong-fu-ge-shu-by-leetcode-solution/?envType=problem-list-v2&envId=dynamic-programming
  // 题目其实是求通过重复字符串s1的n1次组成的新字符串中，可以包含多少个由重复字符串s2的n2次组成的新字符串。
  // 这个算法的核心是找到循环节，避免完全遍历n1次。
  let s1cnt = 0 // 已遍历s1的次数
  let s2cnt = 0 // 已完成的s2匹配次数
  let index = 0 // 当前在s2中的匹配位置
  const recall = new Map() // 记录指针位置与循环位置的映射关系
  let preLoop = [0, 0] // 前导部分
  let inLoop = [0, 0] // 循环部分
  while (true) {
    s1cnt++
    for (const ch of s1) {
      if (ch === s2.charAt(index)) {
        index += 1
        if (index === s2.length) {
          index = 0
          s2cnt++
        }
      }
    }
    // 还没找到循环节，所有的s1就已经用完
    if (s1cnt === n1) {
      // s2cnt 表示的是在所有s1中成功匹配了多少个完整的s2字符串
      // 题目要求的是s2重复n2次后的字符串能够被包含多少次
      // 因此需要将 s2cnt / n2 向下取整，得到结果
      return Math.floor(s2cnt / n2)
    }
    // 出现了之前的index，说明找到了循环节
    if (recall.has(index)) {
      const [s1cntPrime, s2cntPrime] = recall.get(index)
      // 循环前的独立部分，当时已消耗的s1和s2的匹配次数
      preLoop = [s1cntPrime, s2cntPrime]
      // 循环部分，单个循环消耗的s1和s2的匹配次数
      inLoop = [s1cnt - s1cntPrime, s2cnt - s2cntPrime]
      break
    } else {
      recall.set(index, [s1cnt, s2cnt])
    }
  }
  // ans 存储的是 重复n1次s1的字符串 包含的 s2 的数量，考虑的之前的 preLoop 和 inLoop
  // n1 - preLoop[0] 扣除掉前导部分消耗的 s1 的数量
  // Math.floor((n1 - preLoop[0]) / inLoop[0]) 计算剩余部分包含多少个完整的循环
  // Math.floor((n1 - preLoop[0]) / inLoop[0]) * inLoop[1] 计算剩余部分包含的完整循环所消耗的 s2 的数量
  // 最后将两部分相加得到最终结果
  let ans = preLoop[1] + Math.floor((n1 - preLoop[0]) / inLoop[0]) * inLoop[1]
  // 末尾还剩下一些 s1，暴力进行匹配
  const rest = (n1 - preLoop[0]) % inLoop[0]
  for (let i = 0; i < rest; i++) {
    for (const ch of s1) {
      if (ch === s2.charAt(index)) {
        index++
        if (index === s2.length) {
          ans++
          index = 0
        }
      }
    }
  }
  // S1 包含 ans 个 s2，那么就包含 ans / n2 个 S2
  return Math.floor(ans / n2)
}
// @lc code=end
