/**
 * 头条面试题
 * 请实现如下函数，可以批量请求数据，所有的URL地址在urls参数中，同时可以通过max参数
 * 控制请求的并发量，当所有请求结束之后，需要执行callback回调函数。发请求的参数可以
 * 直接使用fetch即可。
 */

// async function sendRequest(urls, max, cb = () => {}) {
//   while (urls.length) {
//     const promises = urls.splice(0, max).map(url => fetch(url))
//     await Promise.allSettled(promises)
//   }
//   cb();
// }

// mock
function fetch(url) {
  console.log('send request: ', url)
  return Promise.resolve()
}

const bus = {
  callbacks: {},
  on(event, cb) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = []
    }
    this.callbacks[event].push(cb)
  },
  off(event, cb) {
    if (!this.callbacks[event]) {
      return
    }
    if (!cb) {
      delete this.callbacks[event]
      return
    }
    const index = this.callbacks[event].findIndex(i === cb)
    if (index > -1) {
      this.callbacks[event].splice(index, 1)
    }
  },
  emit(event, ...args) {
    if (!this.callbacks[event]) {
      return
    }
    this.callbacks[event].map(cb => cb.apply(this, args))
  }
}
async function sendRequest(urls, max, cb = () => {}) {
  let size = 0
  async function send() {
    if (size >= max) return;
    try {
      size += 1;
      send();
      await fetch(urls.shift())
    } finally {
      size -= 1
      bus.emit('done')
    }
  }
  bus.on('done', () => {
    if (!urls.length && !size) {
      cb()
      return
    }
    if (urls.length && size < max) {
      send();
      return;
    }
  })
  send()
}



function genUrls() {
  const base = 'http://localhost:333/test/'
  const urls = []
  for (let i = 0; i <= 15; i += 1) {
    urls.push(base + i)
  }
  return urls
}
sendRequest(genUrls(), 10, () => { console.log('send request done') })