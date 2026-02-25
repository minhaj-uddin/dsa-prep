class TrieNode {
  constructor() {
    this.isEnd = false;
    this.children = new Array(26).fill(null);
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let ch of word) {
      const idx = ch.charCodeAt(0) - 97;
      if (!node.children[idx]) {
        node.children[idx] = new TrieNode();
      }
      node = node.children[idx];
    }
    node.isEnd = true;
  }

  longestPrefix() {
    let result = "";

    const dfs = (node, path) => {
      if (
        path.length > result.length ||
        (path.length === result.length && path < result)
      ) {
        result = path;
      }

      for (let i = 0; i < 26; i++) {
        const child = node.children[i];
        if (child && child.isEnd) {
          dfs(child, path + String.fromCharCode(i + 97));
        }
      }
    };

    dfs(this.root, "");
    return result;
  }
}

const longestPrefix = (words) => {
  if (!words || words.length === 0) return "";

  const trie = new Trie();

  for (let word of words) {
    trie.insert(word);
  }

  return trie.longestPrefix();
};

const words = [
  "p",
  "pr",
  "pro",
  "probl",
  "problem",
  "pros",
  "process",
  "processor",
];
// ["ab", "a", "abc", "abd"];
console.log(longestPrefix(words));
