// DFS Solution: Recursive approach
const rightSideViewDFS = (root) => {
  const result = [];
  dfs(root, 0, result);
  return result;
};

const dfs = (node, level, result) => {
  if (!node) return;

  if (level >= result.length) {
    result.push(node.val);
  }

  if (node.right) dfs(node.right, level + 1, result);
  if (node.left) dfs(node.left, level + 1, result);
};

// BFS Solution: Iterative approach
const rightSideViewBFS = (root) => {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length) {
    let count = 0;
    const qSize = queue.length;

    while (count < qSize) {
      count++; // Increment count
      const current = queue.shift();

      if (count === qSize) {
        result.push(current.val);
      }

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  return result;
};

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const buildTree = (arr) => {
  if (!arr.length) return null;

  let root = new TreeNode(arr[0]);
  let queue = [root];
  let i = 1;

  while (i < arr.length) {
    let current = queue.shift();

    if (arr[i] !== null && arr[i] !== undefined) {
      current.left = new TreeNode(arr[i]);
      queue.push(current.left);
    }
    i++;

    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
      current.right = new TreeNode(arr[i]);
      queue.push(current.right);
    }
    i++;
  }

  return root;
};

const root = buildTree([1, 2, 3, 5, null, null, 6]);
console.log(rightSideViewDFS(root));
console.log(rightSideViewBFS(root));
