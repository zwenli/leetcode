/*
 * @lc app=leetcode.cn id=535 lang=javascript
 *
 * [535] TinyURL 的加密与解密
 */

// @lc code=start
/**
 * Encodes a URL to a shortened URL.
 *
 * @param {string} longUrl
 * @return {string}
 */

const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
const prefix = 'http://tinyurl.com/'
const k = 6
const tiny2Origin = new Map()
const origin2Tiny = new Map()

function encode(longUrl) {
  const cs = new Array(k)
  while (!origin2Tiny.has(longUrl)) {
    // 生成k=6的随机字符串
    for (let i = 0; i < k; i++) cs[i] = str[Math.floor(str.length * Math.random())]
    // 拼接短url
    const cur = prefix + cs.join('')
    // 检查短url是否重复
    if (tiny2Origin.has(cur)) continue
    // 存储映射关系，双向映射
    tiny2Origin.set(cur, longUrl)
    origin2Tiny.set(longUrl, cur)
  }
  return origin2Tiny.get(longUrl)
};

/**
 * Decodes a shortened URL to its original URL.
 *
 * @param {string} shortUrl
 * @return {string}
 */
function decode(shortUrl) {
  return tiny2Origin.get(shortUrl)
};

/**
 * Your functions will be called as such:
 * decode(encode(url));
 */
// @lc code=end
