class TrieNode {
  constructor() {
    this.children = new Map();
    this.word = null;
  }
}

class WordDictionary {
  buildTrie = (words) => {
    const root = new TrieNode();
    for (const word of words) {
      let node = root;
      for (const ch of word) {
        if (!node.children.has(ch)) {
          node.children.set(ch, new TrieNode());
        }
        node = node.children.get(ch);
      }
      node.word = word;
    }
    return root;
  };

  findWords(board, words) {
    const result = [];
    const root = this.buildTrie(words);
    const ROWS = board.length;
    const COLS = board[0].length;
    const DIRECTIONS = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    const dfs = (r, c, node) => {
      const char = board[r][c];
      const nextNode = node.children.get(char);
      if (!nextNode) return;

      // Found a word
      if (nextNode.word !== null) {
        result.push(nextNode.word);
        nextNode.word = null;
      }

      // Mark visited
      board[r][c] = "#";

      for (const [dr, dc] of DIRECTIONS) {
        const nextRow = r + dr;
        const nextCol = c + dc;
        if (
          nextRow >= 0 &&
          nextRow < ROWS &&
          nextCol >= 0 &&
          nextCol < COLS &&
          board[nextRow][nextCol] !== "#"
        ) {
          dfs(nextRow, nextCol, nextNode);
        }
      }

      // Restore board
      board[r][c] = char;

      // Trie pruning (important optimization)
      if (nextNode.children.size === 0) {
        node.children.delete(char);
      }
    };

    // Start DFS from every cell
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        // Early DFS skip if char not in Trie
        if (root.children.has(board[r][c])) {
          dfs(r, c, root);
        }
      }
    }

    return result;
  }
}

const board = [
  ["o", "a", "c", "n"],
  ["e", "t", "a", "e"],
  ["i", "h", "k", "r"],
  ["i", "f", "e", "v"],
];

const words = ["oath", "pea", "cake", "eat", "rain", "take"];

const wd = new WordDictionary();
const foundWords = wd.findWords(board, words);
console.log("Words found:", foundWords);
