class TrieNode {
  children: TrieNode[]
  sum: number
  constructor() {
    this.children = new Array(26).fill(null)
    this.sum = 0
  }
}

class MapSum {
  root: TrieNode
  map: Map<string, number>
  constructor() {
    this.root = new TrieNode()
    this.map = new Map()
  }

  insert(key: string, val: number): void {
    const delta = val - (this.map.get(key) ?? 0)
    this.map.set(key, val)
    
    let node = this.root
    for (const ch of key) {
      const idx = ch.charCodeAt(0) - 97
      if (!node.children[idx]) {
        node.children[idx] = new TrieNode()
      }
      node = node.children[idx]
      node.sum += delta
    }
  }

  sum(prefix: string): number {
    let node = this.root
    for (const ch of prefix) {
      const idx = ch.charCodeAt(0) - 97
      if (!node.children[idx]) return 0
      node = node.children[idx]
    }
    return node.sum
  }
}
