class TrieNode {
  constructor() {
    this.isWord = false;
    this.children = new Array(26).fill(null);
  }
}

function countDistinct(s) {
  let root = new TrieNode();
  let count = 0;

  for (let i = 0; i < s.length; i++) {
    let node = root;

    for (let j = i; j < s.length; j++) {
      let index = s.charCodeAt(j) - 97;
      if (!node.children[index]) {
        node.children[index] = new TrieNode();
        node.isWord = true;
        count++;
      }
      node = node.children[index];
    }
  }

  return count;
}

const input = "abcd";
const count = countDistinct(input);
console.log(count);
