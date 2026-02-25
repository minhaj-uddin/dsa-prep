class TrieNode {
  constructor() {
    this.children = new Map();
    this.prefixCount = 0;
    this.wordCount = 0;
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
      node.prefixCount++;
    }

    node.wordCount++;
  }

  countWordsEqualTo(word) {
    let node = this.root;

    for (const char of word) {
      if (!node.children.has(char)) {
        return 0;
      }
      node = node.children.get(char);
    }

    return node.wordCount;
  }

  countWordsStartingWith(prefix) {
    let node = this.root;

    for (const char of prefix) {
      if (!node.children.has(char)) {
        return 0;
      }
      node = node.children.get(char);
    }

    return node.prefixCount;
  }

  erase(word) {
    if (this.countWordsEqualTo(word) === 0) return;

    let node = this.root;

    for (const char of word) {
      const next = node.children.get(char);
      next.prefixCount--;

      // Optional memory optimization:
      if (next.prefixCount === 0) {
        node.children.delete(char);
        return;
      }

      node = next;
    }

    node.wordCount--;
  }
}

const trie = new Trie();

trie.insert("apple");
trie.insert("apple");
trie.insert("app");

console.log(trie.countWordsEqualTo("apple")); // 2
console.log(trie.countWordsStartingWith("app")); // 3

trie.erase("apple");

console.log(trie.countWordsEqualTo("apple")); // 1
console.log(trie.countWordsStartingWith("app")); // 2
