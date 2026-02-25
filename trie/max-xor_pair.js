class TrieNode {
  constructor() {
    this.children = [null, null];
    this.value = null;
  }
}

class Trie {
  constructor(maxBit) {
    this.root = new TrieNode();
    this.maxBit = maxBit;
  }

  insert(num) {
    let node = this.root;
    for (let bit = this.maxBit; bit >= 0; bit--) {
      const b = (num >> bit) & 1;
      if (!node.children[b]) {
        node.children[b] = new TrieNode();
      }
      node = node.children[b];
    }
    node.value = num;
  }

  getMaxXorPair(num) {
    let node = this.root;
    let xor = 0;

    for (let bit = this.maxBit; bit >= 0; bit--) {
      const b = (num >> bit) & 1;
      const opposite = b ^ 1;

      if (node.children[opposite]) {
        xor |= 1 << bit;
        node = node.children[opposite];
      } else {
        node = node.children[b];
      }
    }

    return [num, node.value, xor];
  }
}

function findMaximumXORPair(nums) {
  const maxBit = Math.floor(Math.log2(Math.max(...nums)));
  const trie = new Trie(maxBit);

  for (let num of nums) trie.insert(num);

  let best = [0, 0, 0];

  for (let num of nums) {
    const pair = trie.getMaxXorPair(num);
    if (pair[2] > best[2]) best = pair;
  }

  return {
    num1: best[0],
    num2: best[1],
    maxXor: best[2],
  };
}

const nums = [3, 10, 5, 25, 2, 8];
const result = findMaximumXORPair(nums);
console.log(result);
