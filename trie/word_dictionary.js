class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

class WordDictionary {
  constructor() {
    this.root = new TrieNode();
  }

  addWord(word) {
    let node = this.root;

    for (let char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }

    node.isEnd = true;
  }

  search(word) {
    const dfs = (index, node) => {
      if (index === word.length) {
        return node.isEnd;
      }

      const char = word[index];

      if (char === ".") {
        for (let child of node.children.values()) {
          if (dfs(index + 1, child)) {
            return true;
          }
        }
        return false;
      } else {
        if (!node.children.has(char)) return false;
        return dfs(index + 1, node.children.get(char));
      }
    };

    return dfs(0, this.root);
  }
}

const wd = new WordDictionary();
wd.addWord("dad");
wd.addWord("had");
wd.addWord("bad");
wd.search("h.d");
