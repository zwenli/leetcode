/**
 * @descrption https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/387
 * 实现 Promise.retry，成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject
 * @param {Promise<any>} promiseFn 
 * @param {number?} times 
 * @returns 
 */
Promise.retry = function retry(promiseFn, times = 3) {
  return new Promise(async (resolve, reject) => {
    while (times--) {
      try {
        const res = await promiseFn()
        return resolve(res)
      } catch (err) {
        if (!times) {
          return reject(err)
        }
      }
    }
  })
}

function mockFn() {
  return new Promise((resolve, reject) => {
    const n = Math.random()
    setTimeout(() => {
      console.log('n:', n)
      return n >= 0.9 ? resolve(n) : reject(n)
    }, 1000)
  })
}

Promise.retry(mockFn, 5)
  .then((res) => {
    console.log('promise success:', res)
  })
  .catch((err) => {
    console.log('promise error:', err)
  })
