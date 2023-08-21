// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
const tupleNumber = [1, 2, 3, 4] as const
const tupleMix = [1, '2', 3, '4'] as const

type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1; '2': '2'; 3: 3; '4': '4' }>>,
]

// type MTupleType = (typeof tuple)[number]

// error case 这里提示我们要限制元素的属性类型仅能为string | number
// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>

// ============= Your Code Here =============
type TupleToObject<T extends readonly (string | number)[]> = {
  [K in T[number]]: K
}

// 假如T的元素类型为 ["Alice", "Bob", "Charlie"]
// 那么 T[number] 为 "Alice" | "Bob" | "Charlie"
