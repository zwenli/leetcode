/*
 * @lc app=leetcode.cn id=468 lang=javascript
 *
 * [468] 验证IP地址
 */

// @lc code=start
/**
 * @param {string} IP
 * @return {string}
 */

function validIPAddress(IP) {
  // time complexity O(1): 时间复杂度是常量
  // space complexity O(1): 占用的空间复杂度是常量
  return isIPv4(IP) ? 'IPv4' : isIPv6(IP) ? 'IPv6' : 'Neither'
  function isIPv4(IP) {
    const arr = IP.split('.')
    if (arr.length !== 4) return false
    const reg = /^([0-9]|([1-9][\d]{0,2}))$/
    for (let str of arr) {
      if (!reg.test(str)) return false
      const num = Number(str)
      if (num < 0 || num > 255) return false
    }
    return true
  }
  function isIPv6(IP) {
    const arr = IP.split(':')
    if (arr.length !== 8) return false
    const reg = /^[\da-fA-F]{1,4}$/
    for (const str of arr) {
      if (!reg.test(str)) return false
    }
    return true
  }
}

// function validIPAddress(IP) {
//   // 正则
//   // time complexity O(1): 时间复杂度是常量
//   // space complexity O(1): 占用的空间复杂度是常量
//   // 个｜十｜100-199｜200-249|250-255
//   const chunkIPv4 = '([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])'
//   const regIPv4 = new RegExp(`^${new Array(4).fill(chunkIPv4).join('.')}$`)
//   const chunkIPv6 = '([\\da-fA-F]{1,4})'
//   const regIPv6 = new RegExp(`^${new Array(8).fill(chunkIPv6).join(':')}$`)
//   if (IP.indexOf('.') > -1) {
//     return regIPv4.test(IP) ? 'IPv4' : 'Neither'
//   } else if (IP.indexOf(':') > -1) {
//     return regIPv6.test(IP) ? 'IPv6' : 'Neither'
//   } else {
//     return 'Neither'
//   }
// }
// @lc code=end

const assert = require('assert').strict

const res1 = validIPAddress('172.16.254.1')
assert.equal(res1, 'IPv4')

const res2 = validIPAddress('2001:0db8:85a3:0:0:8A2E:0370:7334')
assert.equal(res2, 'IPv6')

const res3 = validIPAddress('256.256.256.256')
assert.equal(res3, 'Neither')

const res4 = validIPAddress('2001:0db8:85a3:0:0:8A2E:0370:7334:')
assert.equal(res4, 'Neither')

const res5 = validIPAddress('1e1.4.5.6')
assert.equal(res5, 'Neither')

const res6 = validIPAddress('01.01.01.01')
assert.equal(res6, 'Neither')

const res7 = validIPAddress('20EE:Fb8:85a3:0:0:8A2E:0370:7334')
assert.equal(res7, 'IPv6')

const res8 = validIPAddress('192.0.0.1')
assert.equal(res8, 'IPv4')

/**
1. 分步处理
2. 正则处理，但性能不是最优的
 */
