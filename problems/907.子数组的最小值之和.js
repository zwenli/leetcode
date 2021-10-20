/*
 * @lc app=leetcode.cn id=907 lang=javascript
 *
 * [907] 子数组的最小值之和
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */

// function sumSubarrayMins(arr) {
//   // 单调栈
//   // time complexity O(n):
//   // space complexity O(n)
//   const MOD = 10 ** 9 + 7
//   const n = arr.length
//   const stack = []
//   let ans = 0
//   let dot = 0 // 栈元素的点积
//   for (let j = 0; j < n; j += 1) {
//     let count = 1
//     while (stack.length && stack[stack.length - 1][0] > arr[j]) {
//       const node = stack.pop()
//       count += node[1]
//       dot -= node[0] * node[1]
//     }
//     stack.push([arr[j], count]) // [val, count]
//     dot += arr[j] * count
//     ans = (ans + dot) % MOD
//   }
//   return ans
// }

function sumSubarrayMins(arr) {
  // 前驱 / 后继数组
  // time complexity O(n):
  // space complexity O(n)
  const n = arr.length
  const pStack = [] // [val, index]
  const nStack = []
  // left is for the distance to previous less element
  const left = new Array(n)
  // right is for the distance to next less element
  const right = new Array(n)
  for (let i = 0; i < n; i += 1) {
    left[i] = i + 1
    right[i] = n - i
  }
  for (let i = 0; i < n; i += 1) {
    // for previous less
    while (pStack.length && pStack[pStack.length - 1][0] > arr[i]) {
      pStack.pop()
    }
    left[i] = pStack.length === 0 ? i + 1 : i - pStack[pStack.length - 1][1]
    pStack.push([arr[i], i])
    // for next less
    while (nStack.length && nStack[nStack.length - 1][0] > arr[i]) {
      const node = nStack.pop()
      right[node[1]] = i - node[1]
    }
    nStack.push([arr[i], i])
    
  }
  const MOD = 10 ** 9 + 7
  let ans = 0
  for (let i = 0; i < n; i += 1) {
    ans = (ans + arr[i] * left[i] * right[i]) % MOD
  }
  return ans;
}

// function sumSubarrayMins(arr) {
//   // 会超时
//   const MOD = 10 ** 9 + 7
//   const n = arr.length
//   let ans = 0
//   for (let i = 0; i < n; i += 1) {
//     let min;
//     for (let j = i; j < n; j += 1) {
//       if (i === j) {
//         min = arr[j]
//       } else {
//         min = Math.min(min, arr[j])
//       }
//       ans = (ans + min) % MOD
//     }
//   }
//   return ans
// }

// function sumSubarrayMins(arr) {
//   const MOD = 10 ** 9 + 7
//   const n = arr.length
//   const dp = new Array(n).fill(0).map(() => new Array(n).fill(0))
//   let ans = 0
//   for (let i = 0; i < n; i += 1) {
//     for (let j = i; j < n; j += 1) {
//       if (i === j) {
//         dp[i][j] = arr[j]
//       } else {
//         dp[i][j] = Math.min(dp[i][j - 1], arr[j])
//       }
//       ans = (ans + dp[i][j]) % MOD
//     }
//   }
//   return ans
// }
// @lc code=end

const assert = require('assert').strict

const res1 = sumSubarrayMins([3, 1, 2, 4])
assert.equal(res1, 17)

const res2 = sumSubarrayMins([11, 81, 94, 43, 3])
assert.equal(res2, 444)

const param3 = [28910,8292,1341,3613,10761,4998,15437,29247,9806,29715,959,15673,22296,27969,20108,26732,3381,13957,22091,16160,9807,25821,17886,1041,13760,23546,12567,4972,14541,16569,7201,18970,15552,28599,11186,25595,26540,23628,21088,16351,2023,16117,4118,10989,7046,14858,4161,25699,2514,25765,2787,29142,16161,462,2253,29926,1706,19154,1097,29559,24332,12378,16213,8011,14139,20564,26047,28678,19911,5785,28047,22399,21303,4350,19436,11467,1076,3518,17066,17994,28631,26978,5123,8474,15718,7372,12159,5952,27524,13961,27096,5049,11182,28742,20017,17409,11056,26417,17896,2978,19308,23415,25139,8883,29695]
const res3 = sumSubarrayMins(param3)
assert.equal(res3, 9960945)


/**
解法：
1. dp 会超时

2. 前驱 / 后继数组
https://leetcode.com/problems/sum-of-subarray-minimums/discuss/178876/stack-solution-with-very-detailed-explanation-step-by-step

3. 单调栈
https://leetcode-cn.com/problems/sum-of-subarray-minimums/solution/zi-shu-zu-de-zui-xiao-zhi-zhi-he-by-leetcode/

 */
