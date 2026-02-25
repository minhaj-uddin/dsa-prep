const findMaximumXOR = (nums) => {
  let maxXor = 0;
  let mask = 0;

  for (let bit = 31; bit >= 0; bit--) {
    mask |= 1 << bit;
    const prefixes = new Set();

    for (let num of nums) {
      prefixes.add(num & mask);
    }

    const candidate = maxXor | (1 << bit);

    for (let prefix of prefixes) {
      if (prefixes.has(prefix ^ candidate)) {
        maxXor = candidate;
        break;
      }
    }
  }

  return maxXor;
};

///////////////////////////////

class TrieNode {
  constructor() {
    this.left = null; // represents bit 0
    this.right = null; // represents bit 1
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(num) {
    let node = this.root;
    for (let bit = 31; bit >= 0; bit--) {
      const currBit = (num >> bit) & 1;

      if (currBit === 0) {
        if (!node.left) node.left = new TrieNode();
        node = node.left;
      } else {
        if (!node.right) node.right = new TrieNode();
        node = node.right;
      }
    }
  }

  getMaxXor(num) {
    let node = this.root;
    let maxXor = 0;

    for (let bit = 31; bit >= 0; bit--) {
      const currBit = (num >> bit) & 1;

      if (currBit === 0) {
        if (node.right) {
          maxXor |= 1 << bit;
          node = node.right;
        } else {
          node = node.left;
        }
      } else {
        if (node.left) {
          maxXor |= 1 << bit;
          node = node.left;
        } else {
          node = node.right;
        }
      }
    }

    return maxXor;
  }
}

function findMaximumXOR(nums) {
  const trie = new Trie();

  for (let num of nums) {
    trie.insert(num);
  }

  let result = 0;
  for (let num of nums) {
    result = Math.max(result, trie.getMaxXor(num));
  }

  return result;
}

const nums = [3, 10, 5, 25, 2, 8];
const result = findMaximumXOR(nums);
console.log(result);
