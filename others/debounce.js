/**
 * 节流throttle和防抖debounce
 * 函数防抖和函数节流都是防止某一时间频繁触发
 * 
 * 结合应用场景

debounce

search搜索联想，用户在不断输入值时，用防抖来节约请求资源。
window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次

throttle

鼠标不断点击触发，mousedown(单位时间内只触发一次)
监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断

作者：薄荷前端
链接：https://juejin.im/post/5b8de829f265da43623c4261
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */

/**
 * 防抖debounce
 * 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
 * point：n秒内又触发会重新计时
 */

function debounce(fun, delay) {
  return function(...args) {
    const that = this
    clearTimeout(fun.id)
    fun.id = setTimeout(function () {
      fun.call(that, ...args)
    }, delay)
  }
}

function mockAjax(value) {
  console.log(value)
}

let debounceAjax = debounce(mockAjax, 300)

for (let i = 0; i < 10; i++) {
  debounceAjax(i)
}


/**
 * 节流throttle
 * 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
 * point: 单位时间，只能一次生效
 */

function throttle(fun, delay) {
  let last = +new Date()
  return function(...args) {
    const that = this
    let now = +new Date()
    if (now > last + delay) {
      fun.apply(that, args)
      last = now
    }
  }
}

function mockApi(value) {
  console.log(value)
}

const throttleApi = throttle(mockApi, 300)

void async function() {
  for (let i = 0; i < 10; i++) {
    await new Promise((resolve) => {
      setTimeout(() => {
        throttleApi(i)
        resolve()
      }, 100)
    })
  }
}()
