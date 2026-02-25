class TrieNode {
  constructor() {
    this.children = [null, null];
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
  }

  getMaxXor(num) {
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

    return xor;
  }
}

const getMaxBit = (nums) => {
  let max = 0;
  for (let num of nums) max = Math.max(max, num);
  return Math.floor(Math.log2(max));
};

function findMaximumXOR(nums) {
  const maxBit = getMaxBit(nums);
  const trie = new Trie(maxBit);

  for (let num of nums) {
    trie.insert(num);
  }

  let ans = 0;
  for (let num of nums) {
    ans = Math.max(ans, trie.getMaxXor(num));
  }

  return ans;
}

const nums = [3, 10, 5, 25, 2, 8];
const result = findMaximumXOR(nums);
console.log(result);
