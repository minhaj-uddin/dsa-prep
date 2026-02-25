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
      let idx = ch.charCodeAt(0) - 97;
      if (!node.children[idx]) {
        node.children[idx] = new TrieNode();
      }
      node = node.children[idx];
    }
    node.isEnd = true;
  }

  allPrefixesExist(word) {
    let node = this.root;
    for (let ch of word) {
      let idx = ch.charCodeAt(0) - 97;
      node = node.children[idx];

      // if the prefix is missing or not marked as end
      if (!node || !node.isEnd) {
        return false;
      }
    }
    return true;
  }
}

const longestPrefix = (words) => {
  if (!words || words.length === 0) return "";

  let result = "";
  const trie = new Trie();

  // insert all words into the trie
  for (let word of words) {
    trie.insert(word);
  }

  // Check each word
  for (let word of words) {
    // Update if current word is longer
    const isLonger = word.length > result.length;
    // Same length but lexicographically smaller
    const IsLexicoSmaller = word.length === result.length && word < result;
    // if all prefixes exist
    if ((isLonger || IsLexicoSmaller) && trie.allPrefixesExist(word)) {
      result = word;
    }
  }

  return result;
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
