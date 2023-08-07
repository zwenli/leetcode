/*
 * @lc app=leetcode.cn id=2650 lang=javascript
 *
 * [2650] 设计可取消函数
 *
 * 有时候你会有一个长时间运行的任务，并且你可能希望在它完成之前取消它。
 * 为了实现这个目标，请你编写一个名为 cancellable 的函数，它接收一个生成器对象，
 * 并返回一个包含两个值的数组：一个 取消函数 和一个 promise 对象。
 *
 * 你可以假设生成器函数只会生成 promise 对象。你的函数负责将 promise 对象解析的值传回生成器。
 * 如果 promise 被拒绝，你的函数应将该错误抛回给生成器。
 *
 * 如果在生成器完成之前调用了取消回调函数，则你的函数应该将错误抛回给生成器。
 * 该错误应该是字符串 "Cancelled"（而不是一个 Error 对象）。
 * 如果错误被捕获，则返回的 promise 应该解析为下一个生成或返回的值。
 * 否则，promise 应该被拒绝并抛出该错误。不应执行任何其他代码。
 *
 * 当生成器完成时，您的函数返回的 promise 应该解析为生成器返回的值。
 * 但是，如果生成器抛出错误，则返回的 promise 应该拒绝并抛出该错误。
 *
 */

// @lc code=start
/**
 * @template T
 * @param {Generator<Promise<any>, T, unknown>} generator
 * @return {[() => void, Promise<T>]}
 */
function cancellable(generator) {
  let cancel = () => {}
  const p = new Promise((resolve, reject) => {
    const run = (ret, fnName = 'next') => {
      try {
        const { done, value } = generator[fnName](ret)
        if (done) {
          // 当生成器完成时，您的函数返回的 promise 应该解析为生成器返回的值。
          return resolve(value)
        }
        value
          .then((val) => {
            // 将 promise 对象解析的值传回生成器
            run(val)
          })
          .catch((err) => {
            // promise 被拒绝，你的函数应将该错误抛回给生成器。
            run(err, 'throw')
          })
      } catch (errorByGenerator) {
        // 生成器抛出错误，则返回的 promise 应该拒绝并抛出该错误

        reject(errorByGenerator)
      }
    }
    cancel = (msg = 'Cancelled') => {
      // 在生成器完成之前调用了取消回调函数，则你的函数应该将错误抛回给生成器。
      // 该错误应该是字符串 "Cancelled"（而不是一个 Error 对象）。
      run(msg, 'throw')
    }
    run(null)
  })
  return [cancel, p]
}

// @lc code=end
