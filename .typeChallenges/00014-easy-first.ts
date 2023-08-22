// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]


// ============= Your Code Here =============
type First<T extends any[]> = T extends [infer F, ...infer R] ? F : never
/**
  infer 关键字用于从条件类型中推断出类型变量。
  在这里 `T extends [infer F, ...infer R]`，T是否可以被解构为一个元素类型为infer F的数组第一个元素，以及剩余元素类型为infer R的数组。
  如果条件成立，说明T是一个非空数组。
  如果条件不成立，说明T是一个空数组。
 */

// type First<T extends any[]> = T extends [] ? never : T[0]
/**
 * 这里是通过 `T extends []` 推断 T 是否为空数组，如果为空数组，则返回 never，否则返回第一个元素
 */

// type First<T extends any[]> = T['length'] extends 0 ? never : T[0]
/**
 * 这里是通过 `T['length'] extends 0` 推断 T 数组长度是否为0，如果为空数组，则返回 never，否则返回第一个元素
 */