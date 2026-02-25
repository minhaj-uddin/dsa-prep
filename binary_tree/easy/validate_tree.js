// DFS Recursive Traversal
const isValidBST = (root) => {
  if (!root) return true;
  return dfs(root, -Infinity, Infinity);
};

const dfs = (node, min, max) => {
  if (node.value <= min || node.value >= max) {
    return false;
  }

  if (node.left) {
    if (!dfs(node.lefft, min, node.value)) {
      return false;
    }
  }

  if (node.right) {
    if (!dfs(node.right, node.value, max)) {
      return false;
    }
  }

  return true;
};

// Iterative In-order traversal
const isValidBST2 = (root) => {
  const stack = [];
  let prev = -Infinity;
  let current = root;

  while (stack.length || current) {
    while (current) {
      stack.push(current);
      current = current.left;
    }

    // Visit last FIFO node
    current = stack.pop();

    if (current.value <= prev) return false;
    prev = current.value;

    current = current.right;
  }

  return true;
};
