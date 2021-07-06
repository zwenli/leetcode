/* eslint-disable no-restricted-syntax */
/**

https://www.geeksforgeeks.org/bloom-filters-introduction-and-python-implementation/

根据 C++ 代码的JS实现
4 sample hash functions (k = 4) and the size of bit array is 100.
 */

/** hash1 */
function h1(s, size) {
  let hash = 0;
  for (const c of s) {
    hash += c.charCodeAt(0);
    hash %= size;
  }
  return hash;
}

/** hash2 */
function h2(s, size) {
  let hash = 1;
  for (let i = 0; i < s.length; i += 1) {
    hash += 19 ** i * s.charCodeAt(i);
    hash %= size;
  }
  return hash % size;
}

/** hash3 */
function h3(s, size) {
  let hash = 7;
  for (let i = 0; i < s.length; i += 1) {
    hash = (hash * 31 + s.charCodeAt(i)) % size;
  }
  return hash % size;
}

/** hash4 */
function h4(s, size) {
  let hash = 3;
  const P = 7;
  for (let i = 0; i < s.length; i += 1) {
    hash = hash * P + s.charCodeAt(0) * (P ** i);
    hash %= size;
  }
  return hash;
}

class BloomFilter {
  constructor(size) {
    this.size = size;
    this.array = new Uint8Array(size).fill(0);
  }

  lookup(s) {
    const a = h1(s, this.size);
    const b = h2(s, this.size);
    const c = h3(s, this.size);
    const d = h4(s, this.size);
    if (this.array[a] && this.array[b] && this.array[c] && this.array[d]) {
      return true;
    }
    return false;
  }

  insert(s) {
    if (this.lookup(s)) {
      console.log(`${s} is Probably already present.`);
      return;
    }
    const a = h1(s, this.size);
    const b = h2(s, this.size);
    const c = h3(s, this.size);
    const d = h4(s, this.size);
    this.array[a] = 1;
    this.array[b] = 1;
    this.array[c] = 1;
    this.array[d] = 1;
    console.log(`${s} inserted`);
  }
}

const testFilter = new BloomFilter(100);
const strArr = ['abound', 'abounds', 'abundance',
  'abundant', 'accessable', 'bloom',
  'blossom', 'bolster', 'bonny',
  'bonus', 'bonuses', 'coherent',
  'cohesive', 'colorful', 'comely',
  'comfort', 'gems', 'generosity',
  'generous', 'generously', 'genial',
  'bluff', 'cheater', 'hate',
  'war', 'humanity', 'racism',
  'hurt', 'nuke', 'gloomy',
  'facebook', 'geeksforgeeks', 'twitter'];
for (let i = 0; i < strArr.length; i += 1) {
  testFilter.insert(strArr[i]);
}
