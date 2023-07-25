// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<string, MyReturnType<() => string>>>,
  Expect<Equal<123, MyReturnType<() => 123>>>,
  Expect<Equal<ComplexObject, MyReturnType<() => ComplexObject>>>,
  Expect<Equal<Promise<boolean>, MyReturnType<() => Promise<boolean>>>>,
  Expect<Equal<() => 'foo', MyReturnType<() => () => 'foo'>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn1>>>
]

type ComplexObject = {
  a: [12, 'foo']
  bar: 'hello'
  prev(): number
}

const fn = (v: boolean) => (v ? 1 : 2)
const fn1 = (v: boolean, w: any) => (v ? 1 : 2)

// ============= Your Code Here =============
// 在TypeScript中，infer关键字用于从函数参数或泛型类型中推断出类型。
// 它通常与条件类型一起使用，用于提取和操作类型信息。
// 请注意，infer关键字只能在条件类型中使用，并且只能用于推断单个类型。
type MyReturnType<T extends Function> =
  T extends (...args: any[]) => infer R
    ? R
    : never
