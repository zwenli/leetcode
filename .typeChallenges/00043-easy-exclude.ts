// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
]


// ============= Your Code Here =============
type MyExclude<T, U> = T extends U ? never : T
/**
 * 条件类型 T extends U ? never : T 的作用是判断类型 T 是否可以赋值给类型 U。
 * 如果可以赋值，则返回 never 类型；否则返回 T 类型。
 * 换句话说，MyExclude<T, U>将从 T 中排除能够赋值给 U 的类型。
 * 
 * PS: T 类型是多个类型的组合，T extends U 可以理解为取出T类型中的各个类型看是否可以赋值给类型 U。
 * 
 * never 类型表示那些永远不会发生的值的类型， 通常用于表示以下几种情况：
 * 1. 函数返回类型：当一个函数永远不会返回时，可以将其返回类型标注为 never。例如，一个抛出异常的函数的返回类型可以是 never。
 * 2. 永不为真的条件类型分支：在条件类型中，使用 never 可以表示某些分支永远不会被选中。
 * 3. 永远无法实例化的类：如果一个类的构造函数始终会抛出异常或进入无限循环，那么该类的实例类型可以被标注为 never。
 */
