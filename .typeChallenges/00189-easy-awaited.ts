// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
]

// @ts-expect-error
type error = MyAwaited<number>


// ============= Your Code Here =============
type MyAwaited<T extends PromiseLike<any | PromiseLike<any>>> =
  T extends PromiseLike<infer U>
    ? U extends PromiseLike<any>
      ? MyAwaited<U>
      : U
    : never

/**
 * 使用了两层条件类型判断
 * 
 * 首先是判断T 是否可以赋值给 PromiseLike<infer U>，其中 infer U 是一个类型变量，用于推断 T 的具体类型。
 * 如果 T 可以赋值给 PromiseLike<infer U>，则进入第一个条件分支：
 * U extends PromiseLike<any> ? MyAwaited<U> : U
 * 它首先判断 U 是否可以赋值给 PromiseLike<any>，如果是，则递归调用 MyAwaited 类型，并传入 U 作为类型参数。
 * 这样可以处理嵌套的异步操作，直到获取到最终的返回值。
 * 如果 U 不是 PromiseLike<any> 类型，则直接返回 U。
 * 如果 T 不能赋值给 PromiseLike<infer U>，则返回 never 类型。
 *
 * PromiseLike 就等价于下面的 Thenable | Promise
 */


// type Thenable<T> = {
//   then: (onfulfilled: (arg: T) => any) => any
// }
// type MyAwaited<T extends Thenable<any> | Promise<any>> = T extends Promise<infer R>
//   ? R extends Promise<any>
//     ? MyAwaited<R>
//     : R
//   : T extends Thenable<infer U> ? U : never
