/**
 * 节流函数
 * @param {function} func
 * @param {?number} wait
 * @param {?{leading ?: boolean, trailing ?: boolean}} options
 * @description
 * 函数节流指的是某个函数在一定时间间隔内（例如 3 秒）只执行一次，
 * 在这 3 秒内 无视后来产生的函数调用请求，也不会延长时间间隔。
 * #### 对 options
 * * 配置是否需要响应事件刚开始的那次回调（ leading 参数，false 时忽略）
 * * 配置是否需要响应事件结束后的那次回调（ trailing 参数，false 时忽略）
 * 配置 { leading: false } 时，事件刚开始的那次回调不执行；
 * 配置 { trailing: false } 时，事件结束后的那次回调不执行，不过需要注意的是，这两者不能同时配置。
 *
 * 即节流函数有三种调用方式，默认（有头有尾），设置{ leading: false }，和设置{ trailing: false }
 */
function throttle(func, wait, options) {
  let timeout
  let context
  let args
  let result
  let previous = 0
  if (!options) options = {}
  const later = function () {
    // 当设置 { leading: false } 时
    // 每次触发回调函数后设置 previous 为 0，即表示重置为 第一次执行
    // 否则设置为当前时间
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    // 执行函数
    result = Reflect.apply(func, context, args)
    // 这里是为了防止内存泄露
    if (!timeout) context = args = null
  }
  const throttled = function () {
    // 记录当前触发时间
    const now = Date.now()

    // 第一次执行时（此时 previous 为 0，之后为上一次的时间戳）
    // 并且设置了 { leading: false }（表示第一次回调不执行）
    // 此时 previous 为当前值，表示刚执行过，本次就不需要执行了
    if (!previous && options.leading === false) previous = now

    context = this
    args = arguments
    // 距离下次触发 func 还需要等待的时间
    const remaining = wait - (now - previous)

    // 要么是到了间隔时间了，随即触发方法（remaining <= 0）
    // 要么是没有传入 { leading: false }，且第一次触发回调，即立即触发回调
    // 此时 previous 为 0，wait - (now - previous) 也满足 <= 0
    // 之后会把 previous 设置为 now
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        // 存在定时器，需要清空
        clearTimeout(timeout)
        // clearTimeout 并不会 设置 timeout 设置为 null， 还需要手动清除下
        timeout = null
      }
      // 设置 previous 为当前时间
      previous = now
      // 执行 func 函数
      result = Reflect.apply(func, context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      // 最后一次需要触发的情况
      // 如果存在定时器，则不会进入此分支
      // 如果 设置了 { trailing : false }，即最后一次不用触发，也不会进入此分支
      // 间隔 remaining ms 后，触发 later 函数
      timeout = setTimeout(later, remaining)
    }
    return result
  }

  // 手动取消
  throttled.cancel = function () {
    clearTimeout(timeout)
    previous = 0
    timeout = context = args = null
  }
  // 返回包装过的 throttled 函数
  return throttled
}

// function throttle(func, wait) {
//   let previous = 0
//   return function(...args) {
//     const now = Date.now()
//     if (now - previous > wait) {
//       previous = now
//       Reflect.apply(func, this, args)
//     }
//   }
// }
