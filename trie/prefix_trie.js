class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;

    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }

    node.isEnd = true;
  }

  search(word) {
    let node = this.root;

    for (const char of word) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char);
    }

    return node.isEnd;
  }

  startsWith(prefix) {
    let node = this.root;

    for (const char of prefix) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char);
    }

    return true;
  }
}

const trie = new Trie();
trie.insert("apple");

console.log(trie);

console.log(trie.search("apple")); // true
console.log(trie.search("dash")); // false
console.log(trie.search("app")); // false

console.log(trie.startsWith("dog")); // false
console.log(trie.startsWith("app")); // true

trie.insert("dash");
console.log(trie);
