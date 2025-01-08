// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>,
]

type X1 = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type X2 = { a: string } | { b: number }

type Expected1 = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}

type Expected2 = { readonly a: string } | { readonly b: number }


// ============= Your Code Here =============
// case 1 fail
// type DeepReadonly<T> = T extends never
//   ? T // base case
//   : { readonly [K in keyof T]: DeepReadonly<T[K]> } // 递归

// keyof T[K] extends never ? T[K] : DeepReadonly<T[K]}：这是一个条件类型（Conditional Type），用于判断 T[K] 是否是一个对象类型。
// keyof T[K]：获取 T[K] 的所有键的联合类型。
// extends never：如果 keyof T[K] 是 never 类型，说明 T[K] 没有键，即 T[K] 不是一个对象类型（例如，基本类型、函数等）.
// ? T[K]：如果 T[K] 不是对象类型，则直接返回 T[K]，保持其类型不变.
// : DeepReadonly<T[K]>：如果 T[K] 是对象类型，则递归地应用 DeepReadonly 类型，将其所有嵌套属性也转换为只读类型.
type DeepReadonly<T> = {
  readonly [K in keyof T]: keyof T[K] extends never
    ? T[K]
    : DeepReadonly<T[K]>
}
