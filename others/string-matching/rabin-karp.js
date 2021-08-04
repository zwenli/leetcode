// function search(pat, txt) {
//   const M = pat.length
//   const N = txt.length
//   const Q = longRandomPrime()
//   const R = 256
//   let RM = 1 // R^(M-1)%Q
//   for (let i = 1; i <= M - 1; i += 1) {
//     RM = (R * RM) % Q
//   }
//   const patHash = hash(pat, M)

//   let txtHash = hash(txt, M)

//   if (patHash === txtHash && check(0)) return 0
//   for (let i = M; i < N; i += 1) {
//     txtHash = (txtHash + Q - ((txt.charCodeAt(i - M) * RM) % Q)) % Q // 加上Q防止负数
//     txtHash = (txtHash * R + txt.charCodeAt(i)) % Q
//     if (patHash === txtHash) {
//       if (check(i - M + 1)) return i - M + 1
//     }
//   }
//   return -1

//   function hash(key, M) {
//     let h = 0
//     for (let j = 0; j < M; j += 1) {
//       h = (h * R + key.charCodeAt(j)) % Q
//     }
//     return h
//   }
//   // 蒙特卡洛算法，总是返回true，有失败的概率
//   // function check(i) {
//   //   return true;
//   // }
//   // 拉斯维加斯算法，速度慢，但保证了准确行
//   function check(i) {
//     for (let j = 0; j < M; j += 1) {
//       if (pat.charCodeAt(j) !== txt.charCodeAt(i + j)) {
//         return false
//       }
//     }
//     return true
//   }
//   function longRandomPrime() {
//     return 993 // 随机一个很大的素数，这里先写死
//   }
// }

class RabinKrap {
  pat // 模式串
  patHash // 模式串的hash值
  M // 模式串的长度
  Q // 一个很大的质数
  R = 256 // 字母表的大小
  RM // R^(M-1)%Q

  /**
   * 构造函数
   * @param {string} pat 模式串
   */
  constructor(pat) {
    this.pat = pat
    this.M = pat.length
    this.Q = this.longRandomPrime()
    this.RM = 1
    for (let i = 1; i <= this.M - 1; i += 1) {
      this.RM = (this.RM * this.R) % this.Q
    }
    this.patHash = this.hash(this.pat, this.M)
  }

  /**
   * 拉斯维加斯算法，检查模式串与txt[i, i+M-1]的匹配
   * 速度慢但保证准确性。
   * @param {number} i
   * @returns number
   */
  check(txt, i) {
    for (let j = 0; j < this.M; j += 1) {
      if (this.pat.charCodeAt(j) !== txt.charCodeAt(i + j)) {
        return false
      }
    }
    return true
  }

  /**
   * 查找函数
   * @param {number} txt
   * @returns number
   */
  search(txt) {
    const N = txt.length
    let txtHash = this.hash(txt, this.M)
    if (this.patHash === txtHash && this.check(txt, 0)) return 0
    for (let i = this.M; i < N; i += 1) {
      txtHash = (txtHash + this.Q - ((txt.charCodeAt(i - this.M) * this.RM) % this.Q)) % this.Q
      txtHash = (txtHash * this.R + txt.charCodeAt(i)) % this.Q
      if (this.patHash === txtHash && this.check(txt, i - this.M + 1)) {
        return i - this.M + 1
      }
    }
    return -1
  }
  /**
   * 哈希函数
   * @param {*} key 字符串
   * @param {*} M
   * @returns
   */
  hash(key, M) {
    let h = 0
    for (let j = 0; j < M; j += 1) {
      h = (h * this.R + key.charCodeAt(j)) % this.Q
    }
    return h
  }
  /**
   * 随机返回一个质数
   * @returns number
   */
  longRandomPrime() {
    return 993
  }
}

function search(pat, txt) {
  return new RabinKrap(pat).search(txt)
}

const assert = require('assert').strict

const res1 = search('abcabx', 'abcabcabx')
assert.equal(res1, 3)
