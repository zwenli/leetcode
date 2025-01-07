// ============= Test Cases =============
import type { Alike, Expect } from './test-utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'description' >, Expected>>,
]

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}


// ============= Your Code Here =============
// 简洁明了
// type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> & Readonly<Pick<T, K>>

// 这里使用了 TypeScript 的映射类型中的 as 子句
// as P extends K ? never : P 的意思是，如果 P 是 K 的一部分，则将该键映射为 never（即删除该键），否则保留该键。
// 这种方式直接在映射过程中排除了 K 中的键，使得这些键不会出现在第一个对象类型中，然后再通过交叉类型 & 将 K 中的键作为只读属性添加回来.
type MyReadonly2<T, K extends keyof T = keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
} & {
  readonly [P in K]: T[P]
}

// 此解法不能正确处理可选属性
// type MyExclude<T, U> = T extends U ? never : T
// type MyReadonly2<T, K extends keyof T = keyof T> = {
//   [P in MyExclude<keyof T, K>]: T[P]
// } & {
//   readonly [P in K]: T[P]
// }
