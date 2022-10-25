/**
 * 防抖函数
 * @param {Function} func
 * @param {?number} wait
 * @param {?boolean} immediate
 * @description 触发事件，但必须是在wait ms后才执行，如果在 wait 时间内又触发事件，
 * 那么以新的时间为准，wait ms后才执行。即触发事件 wait ms 内不再触发事件，才执行函数。
 * immediate 为 true，表示立即执行。表示事件触发后立即执行函数，然后等待 wait ms后，才可以重新触发执行。
 *
 * 防抖 debounce 强调某个函数在一定时间内，无法触发多少次，都只执行最后一次。每次触发重新计时
 * 节流 throttle 强调某个函数在一定时间间隔内只执行一次，在这时间内无视后来产生的函数调用请求，也不会延长时间间隔。
 */
function debounce(func, wait, immediate) {
  let context
  let args
  let previous
  let timeout
  let result

  const later = function () {
    const passed = Date.now() - previous
    if (wait > passed) {
      // 间隔时间不超过wait，继续等待
      timeout = setTimeout(later, wait - passed)
    } else {
      // 清空timeout，之后就可以继续执行
      timeout = null
      if (!immediate) {
        // 非立即执行，在这里才开始执行函数
        result = Reflect.apply(func, context, args)
      }
      if (!timeout) context = args = null
    }
  }
  const debounced = function () {
    // 保存原函数指向的this
    context = this
    args = [].concat(arguments)
    // 每次触发，重新记录新时间
    previous = Date.now()
    if (!timeout) {
      // 设置定时器，满足wait ms 后，会清空定时器
      timeout = setTimeout(later, wait)
      if (immediate) {
        // 立即执行，先执行，等到停止触发wait ms后，才可以重新触发执行
        result = Reflect.apply(func, context, args)
      }
    }
    return result
  }

  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = context = args = null
  }

  return debounced
}
