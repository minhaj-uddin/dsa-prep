// Recursive Solution
const kthLargest = (root, k) => {
  let count = 0;
  let result = null;

  const reverseInorder = (node) => {
    if (!node || result !== null) return;

    reverseInorder(node.right);

    count++;
    if (count === k) {
      result = node.val;
      return;
    }

    reverseInorder(node.left);
  };

  reverseInorder(root);
  return result;
};

// Iterative SOlution
const kthLargest2 = (root, k) => {
  const stack = [];
  let current = root;

  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.right;
    }

    current = stack.pop();
    k--; // Decrement k for each visited node

    if (k === 0) return current.val;

    current = current.left;
  }
};
