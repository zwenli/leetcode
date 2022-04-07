/*
 * @lc app=leetcode.cn id=204 lang=javascript
 *
 * [204] 计数质数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
function countPrimes(n) {
  // 埃氏筛 
  // time complexity O(nlogn)
  const isPrime = new Array(n).fill(1); // 质数为1，否为0
  let ans = 0
  for (let i = 2; i < n; i += 1) {
    if (isPrime[i]) {
      ans += 1;
      // 如果i为质数，那么大于i的i的倍数2i,3i,...一定不是质数
      // 直接从i*i开始标记，因为2i,3i..这些数一定在i之前的就被其他其他数的倍数标记过了
      for (let j = i * i; j < n; j += i) {
        isPrime[j] = 0;
      }
    }
  }
  return ans
}
// function countPrimes(n) {
//   // 枚举 timeout
//   // time complexity O(n^(3/2))
//   function isPrime(x) {
//     for (let i = 2; i * i <= x; i += 1) {
//       if (x % i === 0) return false
//     }
//     return true
//   }
//   let ans = 0
//   for (let i = 2; i < n; i += 1) {
//     ans += Number(isPrime(i))
//   }
//   return ans
// }
// @lc code=end

const assert = require('assert').strict

const res1 = countPrimes(10)
assert.equal(res1, 4)

const res2 = countPrimes(0)
assert.equal(res2, 0)

const res3 = countPrimes(1)
assert.equal(res3, 0)

const res4 = countPrimes(2)
assert.equal(res4, 0)
