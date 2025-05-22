/*
 * @lc app=leetcode.cn id=229 lang=javascript
 *
 * [229] 多数元素 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function (nums) {
  // 摩尔投票法
  // 题解：https://leetcode.cn/problems/majority-element-ii/solutions/1058790/qiu-zhong-shu-ii-by-leetcode-solution-y1rn/?envType=problem-list-v2&envId=hash-table
  // 对于这类找出其中所有出现超过[n/k]次的元素，根据摩尔投票法的结论，其元素最多k-1个
  // 本题k为3，所以超过[n/3]次的元素最多为2个
  // PS：找到三个不同的元素就进行抵消。
  const t = Math.floor(nums.length / 3)
  let num1 = 0
  let num2 = 0
  let vote1 = 0
  let vote2 = 0

  for (const num of nums) {
    if (vote1 > 0 && num === num1) {
      //如果该元素为第一个元素，则计数加1
      vote1++
    } else if (vote2 > 0 && num === num2) {
      //如果该元素为第二个元素，则计数加1
      vote2++
    } else if (vote1 === 0) {
      // 选择第一个元素
      num1 = num
      vote1++
    } else if (vote2 === 0) {
      // 选择第二个元素
      num2 = num
      vote2++
    } else {
      //如果三个元素均不相同，则相互抵消1次
      vote1--
      vote2--
    }
  }

  let cnt1 = 0
  let cnt2 = 0
  for (const num of nums) {
    if (vote1 > 0 && num === num1) {
      cnt1++
    } else if (vote2 > 0 && num === num2) {
      cnt2++
    }
  }
  // 检测元素出现的次数是否满足要求
  let ans = []
  if (vote1 > 0 && cnt1 > t) ans.push(num1)
  if (vote2 > 0 && cnt2 > t) ans.push(num2)
  return ans
}

// var majorityElement = function (nums) {
//   // 哈希
//   const t = Math.floor(nums.length / 3)
//   const map = new Map()
//   let res = new Set()
//   for (const num of nums) {
//     if (!map.has(num)) map.set(num, 0)
//     const count = map.get(num) + 1
//     map.set(num, count)
//     if (count > t) res.add(num)
//   }

//   return Array.from(res)
// }
// @lc code=end
