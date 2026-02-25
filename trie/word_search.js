class TrieNode {
  constructor() {
    this.children = Array(26).fill(null);
    this.isEnd = false;
  }
}

class WordDictionary {
  constructor() {
    this.root = new TrieNode();
  }

  getIndex(char) {
    return char.charCodeAt(0) - "a".charCodeAt(0);
  }

  addWord(word) {
    let node = this.root;
    for (const char of word) {
      const idx = this.getIndex(char);
      if (node.children[idx] === null) {
        node.children[idx] = new TrieNode();
      }
      node = node.children[idx];
    }
    node.isEnd = true;
  }

  search(word) {
    return this.dfs(word, 0, this.root);
  }

  dfs(word, index, root) {
    let node = root;

    for (let i = index; i < word.length; i++) {
      const char = word[i];
      if (char === ".") {
        for (const child of node.children) {
          if (child !== null && this.dfs(word, i + 1, child)) {
            return true;
          }
        }
        return false;
      } else {
        const idx = this.getIndex(char);
        if (node.children[idx] === null) {
          return false;
        }
        node = node.children[idx];
      }
    }
    return node.isEnd;
  }
}
