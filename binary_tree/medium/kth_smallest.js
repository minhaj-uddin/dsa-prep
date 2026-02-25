// Recursive Solution
const kthSmallest = (root, k) => {
  let count = 0;
  let result = null;

  const inorder = (node) => {
    if (!node || result !== null) return;

    inorder(node.left);

    count++;
    if (count === k) {
      result = node.val;
      return;
    }

    inorder(node.right);
  };

  inorder(root);
  return result;
};

// Iterative Solution
const kthSmallest2 = (root, k) => {
  const stack = [];
  let current = root;

  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop();
    k--; // Decrement k for each visited node

    if (k === 0) return current.val;

    current = current.right;
  }
};
